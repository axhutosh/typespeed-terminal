let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function playClicky() {
  const ac = getCtx()
  const t = ac.currentTime

  const bufSize = ac.sampleRate * 0.04
  const buf = ac.createBuffer(1, bufSize, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 6)
  }

  const noise = ac.createBufferSource()
  noise.buffer = buf

  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 3500
  filter.Q.value = 1.2

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.55, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ac.destination)
  noise.start(t)
  noise.stop(t + 0.04)

  const osc = ac.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(1800, t)
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.015)

  const oscGain = ac.createGain()
  oscGain.gain.setValueAtTime(0.08, t)
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015)

  osc.connect(oscGain)
  oscGain.connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.015)
}

function playThocky() {
  const ac = getCtx()
  const t = ac.currentTime

  // compressor to punch harder without clipping
  const compressor = ac.createDynamicsCompressor()
  compressor.threshold.value = -10
  compressor.knee.value = 3
  compressor.ratio.value = 6
  compressor.attack.value = 0.001
  compressor.release.value = 0.08
  compressor.connect(ac.destination)

  // primary deep thud
  const osc = ac.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(220, t)
  osc.frequency.exponentialRampToValueAtTime(48, t + 0.08)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(1.4, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12)

  osc.connect(gain)
  gain.connect(compressor)
  osc.start(t)
  osc.stop(t + 0.12)

  // second harmonic for body
  const osc2 = ac.createOscillator()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(110, t)
  osc2.frequency.exponentialRampToValueAtTime(38, t + 0.07)

  const gain2 = ac.createGain()
  gain2.gain.setValueAtTime(0.7, t)
  gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1)

  osc2.connect(gain2)
  gain2.connect(compressor)
  osc2.start(t)
  osc2.stop(t + 0.1)

  // noise burst for tactile attack click
  const bufSize = ac.sampleRate * 0.06
  const buf = ac.createBuffer(1, bufSize, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3)
  }

  const noise = ac.createBufferSource()
  noise.buffer = buf

  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900

  const nGain = ac.createGain()
  nGain.gain.setValueAtTime(0.65, t)
  nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)

  noise.connect(filter)
  filter.connect(nGain)
  nGain.connect(compressor)
  noise.start(t)
  noise.stop(t + 0.06)
}

export function playKeystroke(type) {
  try {
    if (type === 'clicky') playClicky()
    else if (type === 'thocky') playThocky()
  } catch (e) {
    // silently fail if audio context blocked
  }
}

export function resumeAudio() {
  try {
    if (ctx && ctx.state === 'suspended') ctx.resume()
  } catch {}
}