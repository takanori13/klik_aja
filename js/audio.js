/* Audio sintetis kecil: musik ambient dan efek klik tanpa file eksternal. */
(() => {
  let context = null, master = null, musicOn = false, musicTimer = null, noteIndex = 0;
  const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 392];
  function setup() {
    if (context) { if (context.state === "suspended") context.resume(); return true; }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    context = new AudioCtx(); master = context.createGain(); master.gain.value = .12; master.connect(context.destination);
    return true;
  }
  function tone(freq, duration = .12, type = "sine", volume = .18) {
    if (!setup()) return;
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = type; osc.frequency.value = freq; gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    osc.connect(gain); gain.connect(master); osc.start(); osc.stop(context.currentTime + duration);
  }
  function startMusic() {
    if (!setup()) return false;
    if (musicOn) return true;
    musicOn = true;
    const play = () => {
      if (!musicOn || !context) return;
      tone(melody[noteIndex++ % melody.length], .65, "sine", .035);
    };
    play(); musicTimer = setInterval(play, 720); return true;
  }
  function stopMusic() { musicOn = false; clearInterval(musicTimer); musicTimer = null; }
  function toggleMusic() { if (musicOn) stopMusic(); else if (!startMusic()) return false; return musicOn; }
  window.BirthdayAudio = {
    startMusic, stopMusic, toggleMusic, get musicOn() { return musicOn; },
    pop() { tone(660, .08, "sine", .12); tone(880, .06, "triangle", .07); },
    chime() { [523.25, 659.25, 783.99].forEach((f, i) => setTimeout(() => tone(f, .3, "sine", .12), i * 100)); },
    blow() { tone(180, .22, "triangle", .09); },
    setMuted(muted) { if (master) master.gain.setTargetAtTime(muted ? 0 : .12, context.currentTime, .04); }
  };
})();
