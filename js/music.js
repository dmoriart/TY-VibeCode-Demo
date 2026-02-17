/* ===========================
   BEAT PAD — Web Audio Synthesizer
   =========================== */

// --- Audio Context ---
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// --- Sound Definitions ---
// Each pad produces sound using Web Audio API oscillators and noise
const PADS = [
    { name: 'Kick', emoji: '🥁', key: '1', color: 'cyan', type: 'kick' },
    { name: 'Snare', emoji: '🪘', key: '2', color: 'magenta', type: 'snare' },
    { name: 'Hi-Hat', emoji: '🔔', key: '3', color: 'yellow', type: 'hihat' },
    { name: 'Clap', emoji: '👏', key: '4', color: 'orange', type: 'clap' },
    { name: 'Tom', emoji: '🎯', key: 'Q', color: 'purple', type: 'tom' },
    { name: 'Rim', emoji: '🔊', key: 'W', color: 'green', type: 'rim' },
    { name: 'Cowbell', emoji: '🐄', key: 'E', color: 'red', type: 'cowbell' },
    { name: 'Crash', emoji: '💥', key: 'R', color: 'blue', type: 'crash' },
    { name: 'Bass', emoji: '🎸', key: 'A', color: 'magenta', type: 'bass' },
    { name: 'Synth', emoji: '🎹', key: 'S', color: 'cyan', type: 'synth' },
    { name: 'Zap', emoji: '⚡', key: 'D', color: 'yellow', type: 'zap' },
    { name: 'Blip', emoji: '🛸', key: 'F', color: 'purple', type: 'blip' },
    { name: 'Sub', emoji: '🌊', key: 'Z', color: 'blue', type: 'sub' },
    { name: 'Noise', emoji: '📻', key: 'X', color: 'orange', type: 'noise' },
    { name: 'Perc', emoji: '🎶', key: 'C', color: 'green', type: 'perc' },
    { name: 'FX', emoji: '✨', key: 'V', color: 'red', type: 'fx' },
];

// --- Sound Synthesizers ---
function createNoise(ctx, duration) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    return source;
}

function playSound(type) {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    switch (type) {
        case 'kick': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
            break;
        }
        case 'snare': {
            // Noise part
            const noise = createNoise(ctx, 0.15);
            const noiseGain = ctx.createGain();
            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 1000;
            noiseGain.gain.setValueAtTime(0.8, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + 0.15);
            // Tone part
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
            oscGain.gain.setValueAtTime(0.6, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
            break;
        }
        case 'hihat': {
            const noise = createNoise(ctx, 0.05);
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 6000;
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + 0.05);
            break;
        }
        case 'clap': {
            for (let i = 0; i < 3; i++) {
                const noise = createNoise(ctx, 0.03);
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 2000;
                filter.Q.value = 0.5;
                gain.gain.setValueAtTime(0.6, now + i * 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.015 + 0.03);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(now + i * 0.015);
                noise.stop(now + i * 0.015 + 0.03);
            }
            // Tail
            const tailNoise = createNoise(ctx, 0.1);
            const tailGain = ctx.createGain();
            const tailFilter = ctx.createBiquadFilter();
            tailFilter.type = 'bandpass';
            tailFilter.frequency.value = 2500;
            tailGain.gain.setValueAtTime(0.4, now + 0.045);
            tailGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            tailNoise.connect(tailFilter);
            tailFilter.connect(tailGain);
            tailGain.connect(ctx.destination);
            tailNoise.start(now + 0.045);
            tailNoise.stop(now + 0.15);
            break;
        }
        case 'tom': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
            break;
        }
        case 'rim': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.02);
            break;
        }
        case 'cowbell': {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'square';
            osc2.type = 'square';
            osc1.frequency.setValueAtTime(545, now);
            osc2.frequency.setValueAtTime(815, now);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.15);
            osc2.stop(now + 0.15);
            break;
        }
        case 'crash': {
            const noise = createNoise(ctx, 0.4);
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 4000;
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + 0.4);
            break;
        }
        case 'bass': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, now);
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
            break;
        }
        case 'synth': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, now);
            filter.frequency.exponentialRampToValueAtTime(500, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
            break;
        }
        case 'zap': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(1500, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
            break;
        }
        case 'blip': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(800, now + 0.05);
            osc.frequency.setValueAtTime(600, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
            break;
        }
        case 'sub': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(50, now);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
            break;
        }
        case 'noise': {
            const noise = createNoise(ctx, 0.2);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            noise.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
            noise.stop(now + 0.2);
            break;
        }
        case 'perc': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
        }
        case 'fx': {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(3000, now + 0.3);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
            break;
        }
    }
}

// --- Build Pad Grid ---
const padGrid = document.getElementById('pad-grid');

PADS.forEach((pad, index) => {
    const el = document.createElement('div');
    el.className = 'pad';
    el.dataset.color = pad.color;
    el.dataset.index = index;
    el.innerHTML = `
    <span class="pad-emoji">${pad.emoji}</span>
    <span class="pad-label">${pad.name}</span>
  `;

    el.addEventListener('mousedown', () => triggerPad(index));
    el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        triggerPad(index);
    }, { passive: false });

    padGrid.appendChild(el);
});

function triggerPad(index) {
    playSound(PADS[index].type);

    // Visual feedback
    const el = padGrid.children[index];
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 150);
}

// Keyboard shortcuts
const keyMap = {};
PADS.forEach((pad, index) => {
    keyMap[pad.key.toLowerCase()] = index;
});

document.addEventListener('keydown', (e) => {
    const index = keyMap[e.key.toLowerCase()];
    if (index !== undefined && !e.repeat) {
        triggerPad(index);
    }
});

// --- Sequencer ---
const STEPS = 8;
const SEQ_INSTRUMENTS = ['kick', 'snare', 'hihat', 'clap', 'tom', 'bass', 'synth', 'cowbell'];
const SEQ_LABELS = ['Kick', 'Snare', 'HiHat', 'Clap', 'Tom', 'Bass', 'Synth', 'Cow'];

// Sequencer state: 2D array [instrument][step]
let seqGrid = SEQ_INSTRUMENTS.map(() => new Array(STEPS).fill(false));
let seqPlaying = false;
let seqStep = 0;
let seqInterval = null;
let bpm = 120;

// Build sequencer UI
const seqGridEl = document.getElementById('sequencer-grid');

SEQ_INSTRUMENTS.forEach((inst, row) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'seq-row';

    const label = document.createElement('span');
    label.className = 'seq-label';
    label.textContent = SEQ_LABELS[row];
    rowEl.appendChild(label);

    const stepsEl = document.createElement('div');
    stepsEl.className = 'seq-steps';

    for (let col = 0; col < STEPS; col++) {
        const step = document.createElement('div');
        step.className = 'seq-step';
        step.dataset.row = row;
        step.dataset.col = col;

        step.addEventListener('click', () => {
            seqGrid[row][col] = !seqGrid[row][col];
            step.classList.toggle('on', seqGrid[row][col]);
        });

        stepsEl.appendChild(step);
    }

    rowEl.appendChild(stepsEl);
    seqGridEl.appendChild(rowEl);
});

// Sequencer controls
const playBtn = document.getElementById('seq-play');
const stopBtn = document.getElementById('seq-stop');
const clearBtn = document.getElementById('seq-clear');
const tempoSlider = document.getElementById('tempo-slider');
const tempoDisplay = document.getElementById('tempo-display');

playBtn.addEventListener('click', () => {
    if (seqPlaying) return;
    seqPlaying = true;
    playBtn.textContent = '▶ Playing...';
    seqStep = 0;
    seqTick();
    const interval = (60 / bpm) * 1000 / 2; // 8th notes
    seqInterval = setInterval(seqTick, interval);
});

stopBtn.addEventListener('click', stopSequencer);

function stopSequencer() {
    seqPlaying = false;
    playBtn.textContent = '▶ Play';
    clearInterval(seqInterval);
    // Clear current indicators
    document.querySelectorAll('.seq-step.current').forEach(el => el.classList.remove('current'));
}

clearBtn.addEventListener('click', () => {
    stopSequencer();
    seqGrid = SEQ_INSTRUMENTS.map(() => new Array(STEPS).fill(false));
    document.querySelectorAll('.seq-step.on').forEach(el => el.classList.remove('on'));
});

tempoSlider.addEventListener('input', () => {
    bpm = parseInt(tempoSlider.value);
    tempoDisplay.textContent = `${bpm} BPM`;

    // Restart if playing
    if (seqPlaying) {
        clearInterval(seqInterval);
        const interval = (60 / bpm) * 1000 / 2;
        seqInterval = setInterval(seqTick, interval);
    }
});

function seqTick() {
    // Clear previous current
    document.querySelectorAll('.seq-step.current').forEach(el => el.classList.remove('current'));

    // Highlight current step
    SEQ_INSTRUMENTS.forEach((inst, row) => {
        const stepEl = seqGridEl.querySelectorAll('.seq-row')[row]
            .querySelectorAll('.seq-step')[seqStep];
        stepEl.classList.add('current');

        if (seqGrid[row][seqStep]) {
            playSound(inst);
        }
    });

    seqStep = (seqStep + 1) % STEPS;
}

// --- Nav Toggle ---
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
});
