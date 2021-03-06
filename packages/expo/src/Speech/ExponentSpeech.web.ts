import { SpeechOptions } from './Speech.types';

export default {
  get name(): string {
    return 'ExponentSpeech';
  },
  async speak(id: string, text: string, options: SpeechOptions): Promise<SpeechSynthesisUtterance> {
    const { SpeechSynthesisUtterance } = global.window;

    const message = new SpeechSynthesisUtterance();

    if ('rate' in options) {
      message.rate = options.rate;
    }
    if ('pitch' in options) {
      message.pitch = options.pitch;
    }
    if ('language' in options) {
      message.lang = options.language;
    }
    if ('volume' in options) {
      message.volume = options.volume;
    }
    if ('_voiceIndex' in options && options._voiceIndex != null) {
      const voices = window.speechSynthesis.getVoices();
      message.voice = voices[Math.min(voices.length - 1, Math.max(0, options._voiceIndex))];
    }
    if ('onStart' in options) {
      message.onstart = options.onStart;
    }
    if ('onDone' in options) {
      message.onend = options.onDone;
    }
    if ('onError' in options) {
      message.onerror = options.onError;
    }
    if ('onPause' in options) {
      message.onpause = options.onPause;
    }
    if ('onResume' in options) {
      message.onresume = options.onResume;
    }
    if ('onMark' in options) {
      message.onmark = options.onMark;
    }
    if ('onBoundary' in options) {
      message.onboundary = options.onBoundary;
    }
    message.text = text;
    window.speechSynthesis.speak(message);

    return message;
  },
  async isSpeaking(): Promise<Boolean> {
    return window.speechSynthesis.speaking;
  },
  async stop(): Promise<void> {
    return window.speechSynthesis.cancel();
  },
  async pause(): Promise<void> {
    return window.speechSynthesis.pause();
  },
  async resume(): Promise<void> {
    return window.speechSynthesis.resume();
  },
};
