const DEFAULT_PAROT_BASE = "http://100.105.231.83:8880";

// Voice IDs exposed by Parot (subset of the available list from /openapi.json).
export type ParotVoice =
  | "af_bella"
  | "af_aoede"
  | "af_nicole"
  | "af_river"
  | "am_michael"
  | "am_liam"
  | "bm_george"
  | "bm_lewis";

type CacheKey = `${ParotVoice}:${string}`;

export class AudioService {
  private audioCtx: AudioContext | null = null;
  private cache: Map<CacheKey, AudioBuffer> = new Map();
  private pendingRequests: Map<CacheKey, Promise<AudioBuffer | null>> = new Map();
  private baseUrl: string;

  constructor() {
    this.baseUrl = (import.meta as any).env?.VITE_PAROT_BASE_URL || DEFAULT_PAROT_BASE;
  }

  private initContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private async fetchFromParot(text: string, voice: ParotVoice): Promise<AudioBuffer | null> {
    const url = `${this.baseUrl.replace(/\/$/, "")}/v1/audio/speech`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: text, voice }),
    });

    if (!resp.ok) {
      let errText = `${resp.status}`;
      try {
        const errJson = await resp.json();
        errText = errJson?.detail?.message || JSON.stringify(errJson);
      } catch {
        errText = await resp.text();
      }
      console.error("Parot TTS failed:", errText);
      return null;
    }

    const arrayBuffer = await resp.arrayBuffer();
    const ctx = this.initContext();
    try {
      // Some browsers require a copy of the buffer for decodeAudioData
      const bufferCopy = arrayBuffer.slice(0);
      const audioBuffer = await ctx.decodeAudioData(bufferCopy);
      return audioBuffer;
    } catch (e) {
      console.error("decodeAudioData failed", e);
      return null;
    }
  }

  /**
   * Fetch audio and prime the cache without playback.
   */
  async prefetch(text: string, voice: ParotVoice): Promise<void> {
    if (!text) return;
    const cacheKey: CacheKey = `${voice}:${text}`;
    if (this.cache.has(cacheKey) || this.pendingRequests.has(cacheKey)) return;

    const fetchPromise = (async () => {
      try {
        const buffer = await this.fetchFromParot(text, voice);
        if (buffer) this.cache.set(cacheKey, buffer);
        return buffer;
      } finally {
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, fetchPromise);
    await fetchPromise;
  }

  async speak(text: string, voice: ParotVoice) {
    if (!text) return;
    const cacheKey: CacheKey = `${voice}:${text}`;
    let buffer = this.cache.get(cacheKey);

    if (!buffer) {
      const pending = this.pendingRequests.get(cacheKey);
      if (pending) buffer = (await pending) || undefined;
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
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  clearCache() {
    this.cache.clear();
    this.pendingRequests.clear();
  }
}

export const audioService = new AudioService();
