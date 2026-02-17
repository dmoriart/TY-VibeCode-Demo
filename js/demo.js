/* ===========================
   DEMO PAGE — Interactive Widgets
   =========================== */

// --- Theme Picker ---
const THEMES = [
    { name: 'Cyan', color: '#00f0ff' },
    { name: 'Magenta', color: '#ff00e5' },
    { name: 'Purple', color: '#7c3aed' },
    { name: 'Orange', color: '#ff6b35' },
    { name: 'Green', color: '#22c55e' },
    { name: 'Gold', color: '#eab308' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Blue', color: '#3b82f6' },
];

const swatchContainer = document.getElementById('color-swatches');

THEMES.forEach((theme, index) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (index === 0 ? ' active' : '');
    swatch.style.background = theme.color;
    swatch.style.color = theme.color;
    swatch.title = theme.name;

    swatch.addEventListener('click', () => {
        document.documentElement.style.setProperty('--accent-primary', theme.color);

        // Update active state
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
    });

    swatchContainer.appendChild(swatch);
});

// --- Before / After Toggle ---
const baOptions = document.querySelectorAll('.ba-option');
const baContent = document.getElementById('ba-content');

baOptions.forEach(option => {
    option.addEventListener('click', () => {
        baOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        const mode = option.dataset.mode;
        baContent.className = 'ba-content ' + mode;

        if (mode === 'plain') {
            baContent.innerHTML = `
        <p>Hello World</p>
        <p>This is a basic webpage with no styling.</p>
        <p>Times New Roman. Default everything.</p>
      `;
        } else {
            baContent.innerHTML = `
        <p style="font-size:1.3rem; font-weight:700; background:linear-gradient(135deg, var(--accent-primary), #ff00e5); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
          Hello World ✨
        </p>
        <p style="margin-top:8px; font-size:0.9rem; color:#8888a0;">
          Glassmorphism. Particles. Neon glows. Web Audio synthesis.
        </p>
        <p style="margin-top:4px; font-size:0.85rem; color:#55556a;">
          All from a conversation with AI.
        </p>
      `;
        }
    });
});

// --- Prompt Box Switcher ---
const prompts = {
    snake: `Build me a Snake game with neon graphics. The snake should be cyan and glow. The food should be magenta. Add score tracking with localStorage for high scores. Speed up as the score increases. Make it work on mobile with swipe controls.`,
    music: `Create a drum machine with a 4x4 pad grid. Each pad should trigger a different sound — synthesize them using the Web Audio API, no audio files. Add a step sequencer with 8 steps, a play/stop button, and a tempo slider. Make the pads glow when hit.`,
    meme: `Build a meme generator. Use Canvas to render meme templates (generated backgrounds like galaxy, fire, neon grid). Let users add top and bottom text in Impact font with black outlines. Include a download button that saves the meme as PNG. Also allow uploading custom images.`
};

const promptBox = document.getElementById('prompt-box');

document.getElementById('prompt-snake').addEventListener('click', () => {
    promptBox.value = prompts.snake;
});

document.getElementById('prompt-music').addEventListener('click', () => {
    promptBox.value = prompts.music;
});

document.getElementById('prompt-meme').addEventListener('click', () => {
    promptBox.value = prompts.meme;
});

// --- Code Peek Switcher ---
const codeSnippets = {
    kick: `<span class="comment">// Kick drum — just math, no audio files!</span><br>
<span class="keyword">const</span> <span class="function">osc</span> = ctx.<span class="function">createOscillator</span>();<br>
<span class="keyword">const</span> <span class="function">gain</span> = ctx.<span class="function">createGain</span>();<br>
osc.<span class="attr">type</span> = <span class="string">'sine'</span>;<br>
osc.frequency.<span class="function">setValueAtTime</span>(<span class="number">150</span>, now);<br>
osc.frequency.<span class="function">exponentialRampToValueAtTime</span>(<span class="number">30</span>, now + <span class="number">0.15</span>);<br>
gain.gain.<span class="function">setValueAtTime</span>(<span class="number">1</span>, now);<br>
gain.gain.<span class="function">exponentialRampToValueAtTime</span>(<span class="number">0.001</span>, now + <span class="number">0.3</span>);<br>
osc.<span class="function">connect</span>(gain);<br>
gain.<span class="function">connect</span>(ctx.<span class="attr">destination</span>);<br>
osc.<span class="function">start</span>(now);<br>
osc.<span class="function">stop</span>(now + <span class="number">0.3</span>);`,

    particle: `<span class="comment">// Particle class — each dot on the landing page</span><br>
<span class="keyword">class</span> <span class="function">Particle</span> {<br>
&nbsp;&nbsp;<span class="function">constructor</span>() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.x = Math.<span class="function">random</span>() * canvas.width;<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.y = Math.<span class="function">random</span>() * canvas.height;<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.size = Math.<span class="function">random</span>() * <span class="number">2.5</span>;<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.speedX = (Math.<span class="function">random</span>() - <span class="number">0.5</span>) * <span class="number">0.5</span>;<br>
&nbsp;&nbsp;}<br>
&nbsp;&nbsp;<span class="function">update</span>() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Move + mouse repulsion</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.x += <span class="keyword">this</span>.speedX;<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword">this</span>.y += <span class="keyword">this</span>.speedY;<br>
&nbsp;&nbsp;}<br>
}`,

    snake: `<span class="comment">// Snake movement — wrap-around world</span><br>
<span class="keyword">function</span> <span class="function">tick</span>() {<br>
&nbsp;&nbsp;<span class="keyword">const</span> head = {<br>
&nbsp;&nbsp;&nbsp;&nbsp;x: snake[<span class="number">0</span>].x + direction.x,<br>
&nbsp;&nbsp;&nbsp;&nbsp;y: snake[<span class="number">0</span>].y + direction.y<br>
&nbsp;&nbsp;};<br>
&nbsp;&nbsp;<br>
&nbsp;&nbsp;<span class="comment">// Wrap around edges</span><br>
&nbsp;&nbsp;<span class="keyword">if</span> (head.x < <span class="number">0</span>) head.x = TILE_COUNT - <span class="number">1</span>;<br>
&nbsp;&nbsp;<span class="keyword">if</span> (head.x >= TILE_COUNT) head.x = <span class="number">0</span>;<br>
&nbsp;&nbsp;<br>
&nbsp;&nbsp;<span class="comment">// Check self-collision</span><br>
&nbsp;&nbsp;<span class="keyword">if</span> (snake.<span class="function">some</span>(s => s.x === head.x && s.y === head.y)) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="function">gameOver</span>();<br>
&nbsp;&nbsp;}<br>
}`
};

const codeDisplay = document.getElementById('code-display');

document.getElementById('code-kick').addEventListener('click', () => {
    codeDisplay.innerHTML = codeSnippets.kick;
});

document.getElementById('code-particle').addEventListener('click', () => {
    codeDisplay.innerHTML = codeSnippets.particle;
});

document.getElementById('code-snake').addEventListener('click', () => {
    codeDisplay.innerHTML = codeSnippets.snake;
});

// --- Reaction Time Game ---
const reactionBox = document.getElementById('reaction-box');
const reactionResult = document.getElementById('reaction-result');
const reactionBest = document.getElementById('reaction-best');

let reactionState = 'idle'; // idle, waiting, ready
let reactionTimeout = null;
let reactionStart = 0;
let bestReaction = Infinity;

reactionBox.addEventListener('click', () => {
    if (reactionState === 'idle') {
        // Start waiting
        reactionState = 'waiting';
        reactionBox.textContent = 'Wait for green...';
        reactionBox.style.background = '#cc3333';
        reactionBox.style.borderColor = '#cc3333';
        reactionResult.textContent = '';

        // Random delay 1-4s
        const delay = Math.random() * 3000 + 1000;
        reactionTimeout = setTimeout(() => {
            reactionState = 'ready';
            reactionBox.textContent = 'CLICK NOW!';
            reactionBox.style.background = '#22c55e';
            reactionBox.style.borderColor = '#22c55e';
            reactionStart = performance.now();
        }, delay);
    }
    else if (reactionState === 'waiting') {
        // Clicked too early!
        clearTimeout(reactionTimeout);
        reactionState = 'idle';
        reactionBox.textContent = 'Too early! 😅 Click to retry';
        reactionBox.style.background = 'var(--bg-card)';
        reactionBox.style.borderColor = 'var(--bg-glass-border)';
        reactionResult.textContent = 'Too early!';
        reactionResult.style.color = '#ef4444';
    }
    else if (reactionState === 'ready') {
        // Record time
        const reactionTime = Math.round(performance.now() - reactionStart);
        reactionState = 'idle';
        reactionBox.textContent = 'Click to try again';
        reactionBox.style.background = 'var(--bg-card)';
        reactionBox.style.borderColor = 'var(--bg-glass-border)';

        reactionResult.style.color = 'var(--accent-primary)';
        reactionResult.textContent = `${reactionTime}ms`;

        if (reactionTime < bestReaction) {
            bestReaction = reactionTime;
        }
        reactionBest.textContent = `Best: ${bestReaction}ms`;

        // Fun messages based on time
        if (reactionTime < 200) {
            reactionResult.textContent += ' — Superhuman! 🦸';
        } else if (reactionTime < 250) {
            reactionResult.textContent += ' — Lightning fast! ⚡';
        } else if (reactionTime < 350) {
            reactionResult.textContent += ' — Nice reflexes! 🎯';
        } else if (reactionTime < 500) {
            reactionResult.textContent += ' — Not bad! 👍';
        } else {
            reactionResult.textContent += ' — Were you sleeping? 😴';
        }
    }
});

// --- Nav Toggle ---
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
});
