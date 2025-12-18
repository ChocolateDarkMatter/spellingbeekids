
import { GoogleGenAI, Modality } from "@google/genai";

// Standard Base64 Decode
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Standard Audio Buffer Decoder for Raw PCM
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class AudioService {
  private audioCtx: AudioContext | null = null;
  private ai: GoogleGenAI;
  private cache: Map<string, AudioBuffer> = new Map();
  private pendingRequests: Map<string, Promise<AudioBuffer | null>> = new Map();

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private initContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Generates audio for text and stores it in cache without playing.
   */
  async prefetch(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore'): Promise<void> {
    if (!text) return;
    const cacheKey = `${voice}:${text}`;
    if (this.cache.has(cacheKey) || this.pendingRequests.has(cacheKey)) return;

    const fetchPromise = (async () => {
      try {
        const response = await this.ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voice },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) return null;

        const ctx = this.initContext();
        const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        this.cache.set(cacheKey, buffer);
        return buffer;
      } catch (e) {
        console.error("Prefetch failed for:", text, e);
        return null;
      } finally {
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, fetchPromise);
    await fetchPromise;
  }

  async speak(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore') {
    if (!text) return;
    const cacheKey = `${voice}:${text}`;
    let buffer = this.cache.get(cacheKey);

    if (!buffer) {
      const pending = this.pendingRequests.get(cacheKey);
      if (pending) {
        buffer = (await pending) || undefined;
      }
    }

    if (!buffer) {
      await this.prefetch(text, voice);
      buffer = this.cache.get(cacheKey);
    }

    if (buffer) {
      const ctx = this.initContext();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
      return new Promise<void>((resolve) => {
        source.onended = () => resolve();
      });
    } else {
      this.fallbackSpeak(text);
    }
  }

  private fallbackSpeak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  clearCache() {
    this.cache.clear();
    this.pendingRequests.clear();
  }
}

export const audioService = new AudioService();
