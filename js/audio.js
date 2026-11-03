// ระบบเสียงเอฟเฟกต์และการอ่านคำศัพท์ ใช้ความสามารถของเบราว์เซอร์เท่านั้น
(() => {
  'use strict';
  let audioContext = null;
  const supportsSpeech = typeof window.SpeechSynthesisUtterance === 'function'
    && typeof window.speechSynthesis?.speak === 'function';

  function context() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      if (!audioContext) audioContext = new AudioContextClass();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      return audioContext;
    } catch (_error) { return null; }
  }

  function beep(frequency, at, duration, kind = 'sine', volume = 0.055) {
    const ctx = context();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + at);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + at);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + at + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + at);
      osc.stop(ctx.currentTime + at + duration + 0.03);
    } catch (_error) { /* หากเสียงเล่นไม่ได้ เกมยังเล่นต่อได้ */ }
  }

  function tap() { beep(660, 0, 0.10, 'sine', 0.035); }
  function retry() { beep(392, 0, 0.13, 'sine', 0.027); beep(330, 0.13, 0.15, 'sine', 0.022); }
  function cheer() {
    // โน้ตไล่สูงเป็นเสียงเชียร์โดยไม่ต้องดาวน์โหลดไฟล์เสียง
    [523, 659, 784, 1047].forEach((freq, i) => beep(freq, i * 0.11, 0.27, 'triangle', 0.052));
    beep(1318, 0.49, 0.40, 'sine', 0.04);
  }

  function utter(text, rate = 0.82) {
    const message = new SpeechSynthesisUtterance(text);
    message.lang = 'en-US';
    message.rate = rate;
    message.pitch = 1.07;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.toLowerCase() === 'en-us') || voices.find(v => v.lang.toLowerCase().startsWith('en'));
    if (preferred) message.voice = preferred;
    return message;
  }

  function speak(word) {
    if (!supportsSpeech) return false;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter(word === 'TV' ? 'T V' : word));
      return true;
    } catch (_error) { return false; }
  }

  function celebrateAndSpeak(word) {
    cheer();
    if (!supportsSpeech) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter('Yay! Great job!', 0.95));
      window.speechSynthesis.speak(utter(word === 'TV' ? 'T V' : word));
    } catch (_error) { /* การอ่านไม่รองรับไม่ควรขัดขวางเกม */ }
  }

  function stopSpeech() {
    if (supportsSpeech) {
      try { window.speechSynthesis.cancel(); } catch (_error) { /* ปลอดภัย */ }
    }
  }

  window.GameAudio = { supportsSpeech, tap, retry, cheer, speak, celebrateAndSpeak, stopSpeech };
})();
