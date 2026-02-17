/* ===========================
   MEME GENERATOR
   =========================== */

const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const fontSizeSlider = document.getElementById('font-size');
const textColorSelect = document.getElementById('text-color');
const downloadBtn = document.getElementById('download-btn');
const randomBtn = document.getElementById('random-btn');
const uploadInput = document.getElementById('upload-image');
const templateGrid = document.getElementById('template-grid');

// --- Built-in Templates (generated via Canvas) ---
const TEMPLATES = [
    {
        name: 'Galaxy',
        draw: (ctx, w, h) => {
            const grd = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 2);
            grd.addColorStop(0, '#1a0533');
            grd.addColorStop(0.5, '#0d1b3e');
            grd.addColorStop(1, '#000');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
            // Stars
            for (let i = 0; i < 200; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
                ctx.fill();
            }
        }
    },
    {
        name: 'Fire',
        draw: (ctx, w, h) => {
            const grd = ctx.createLinearGradient(0, h, 0, 0);
            grd.addColorStop(0, '#ff0000');
            grd.addColorStop(0.3, '#ff6600');
            grd.addColorStop(0.6, '#ffcc00');
            grd.addColorStop(1, '#1a0a00');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
            // Ember particles
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                const x = Math.random() * w;
                const y = Math.random() * h * 0.7 + h * 0.3;
                ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, ${Math.floor(Math.random() * 150 + 100)}, 0, ${Math.random() * 0.6 + 0.2})`;
                ctx.fill();
            }
        }
    },
    {
        name: 'Neon',
        draw: (ctx, w, h) => {
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, w, h);
            // Neon grid
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y < h; y += 30) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
            // Glow circle
            const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 3);
            grd.addColorStop(0, 'rgba(255, 0, 229, 0.15)');
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
        }
    },
    {
        name: 'Ocean',
        draw: (ctx, w, h) => {
            const grd = ctx.createLinearGradient(0, 0, 0, h);
            grd.addColorStop(0, '#001a33');
            grd.addColorStop(0.4, '#003366');
            grd.addColorStop(0.7, '#0066cc');
            grd.addColorStop(1, '#00ccff');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
            // Waves
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 2;
            for (let wave = 0; wave < 5; wave++) {
                ctx.beginPath();
                const baseY = h * 0.4 + wave * 40;
                for (let x = 0; x <= w; x += 5) {
                    const y = baseY + Math.sin(x * 0.02 + wave) * 15;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        }
    },
    {
        name: 'Sunset',
        draw: (ctx, w, h) => {
            const grd = ctx.createLinearGradient(0, 0, 0, h);
            grd.addColorStop(0, '#0c0c1d');
            grd.addColorStop(0.3, '#2d1b4e');
            grd.addColorStop(0.5, '#c2185b');
            grd.addColorStop(0.7, '#ff6f00');
            grd.addColorStop(1, '#ffab40');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
            // Sun
            ctx.beginPath();
            ctx.arc(w / 2, h * 0.55, 60, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 200, 50, 0.6)';
            ctx.fill();
        }
    },
    {
        name: 'Matrix',
        draw: (ctx, w, h) => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, w, h);
            ctx.font = '14px monospace';
            const chars = '01アイウエオカキクケコ';
            for (let x = 0; x < w; x += 16) {
                for (let y = 0; y < h; y += 18) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    const opacity = Math.random() * 0.5;
                    ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                    ctx.fillText(char, x, y);
                }
            }
        }
    }
];

let currentTemplate = 0;
let customImage = null;

// --- Build Template Grid ---
TEMPLATES.forEach((template, index) => {
    const btn = document.createElement('button');
    btn.className = 'meme-template-btn' + (index === 0 ? ' active' : '');
    btn.title = template.name;

    // Draw mini preview
    const miniCanvas = document.createElement('canvas');
    miniCanvas.width = 80;
    miniCanvas.height = 80;
    const miniCtx = miniCanvas.getContext('2d');
    template.draw(miniCtx, 80, 80);

    const img = document.createElement('img');
    img.src = miniCanvas.toDataURL();
    img.alt = template.name;
    btn.appendChild(img);

    btn.addEventListener('click', () => {
        currentTemplate = index;
        customImage = null;
        document.querySelectorAll('.meme-template-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        drawMeme();
    });

    templateGrid.appendChild(btn);
});

// --- Draw Meme ---
function drawMeme() {
    const w = canvas.width;
    const h = canvas.height;

    // Draw background
    if (customImage) {
        // Draw uploaded image to fill canvas
        const imgRatio = customImage.width / customImage.height;
        const canvasRatio = w / h;
        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
            drawH = h;
            drawW = h * imgRatio;
            drawX = -(drawW - w) / 2;
            drawY = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            drawX = 0;
            drawY = -(drawH - h) / 2;
        }

        ctx.drawImage(customImage, drawX, drawY, drawW, drawH);
    } else {
        TEMPLATES[currentTemplate].draw(ctx, w, h);
    }

    // Draw text
    const fontSize = parseInt(fontSizeSlider.value);
    const colorName = textColorSelect.value;
    const colors = {
        white: '#ffffff',
        yellow: '#ffdd00',
        cyan: '#00f0ff',
        magenta: '#ff00e5',
        lime: '#39ff14'
    };
    const textColor = colors[colorName] || '#ffffff';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    drawMemeText(topTextInput.value.toUpperCase(), w / 2, 20, fontSize, textColor, w - 40);
    ctx.textBaseline = 'bottom';
    drawMemeText(bottomTextInput.value.toUpperCase(), w / 2, h - 20, fontSize, textColor, w - 40);
}

function drawMemeText(text, x, y, fontSize, color, maxWidth) {
    if (!text) return;

    ctx.font = `bold ${fontSize}px Impact, 'Arial Black', sans-serif`;
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = fontSize / 10;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    // Word wrap
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    // Adjust y for multi-line text positioning
    const lineHeight = fontSize * 1.2;
    let startY = y;
    if (ctx.textBaseline === 'bottom') {
        startY = y - (lines.length - 1) * lineHeight;
    }

    lines.forEach((line, i) => {
        const ly = startY + i * lineHeight;
        ctx.strokeText(line, x, ly);
        ctx.fillText(line, x, ly);
    });
}

// --- Event Listeners ---
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);
fontSizeSlider.addEventListener('input', drawMeme);
textColorSelect.addEventListener('change', drawMeme);

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'vibe-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            customImage = img;
            document.querySelectorAll('.meme-template-btn').forEach(b => b.classList.remove('active'));
            drawMeme();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// --- Random Meme ---
const RANDOM_TOP = [
    "WHEN THE WIFI DROPS",
    "ME EXPLAINING",
    "NOBODY:",
    "POV:",
    "WHEN CLAUDE",
    "TEACHER:",
    "MY BRAIN AT 3AM",
    "THAT FEELING WHEN",
    "EXPECTATION:",
    "FIRST DAY VS"
];

const RANDOM_BOTTOM = [
    "DURING THE EXAM",
    "AI TO MY MOM",
    "ABSOLUTELY NOBODY:",
    "YOU JUST VIBE CODED A WEBSITE",
    "WRITES YOUR HOMEWORK",
    "DIDN'T ASSIGN HOMEWORK",
    "SOLVING WORLD HUNGER",
    "YOUR CODE ACTUALLY WORKS",
    "VS REALITY",
    "LAST DAY OF SCHOOL"
];

randomBtn.addEventListener('click', () => {
    topTextInput.value = RANDOM_TOP[Math.floor(Math.random() * RANDOM_TOP.length)];
    bottomTextInput.value = RANDOM_BOTTOM[Math.floor(Math.random() * RANDOM_BOTTOM.length)];
    currentTemplate = Math.floor(Math.random() * TEMPLATES.length);
    customImage = null;

    document.querySelectorAll('.meme-template-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentTemplate);
    });

    drawMeme();
});

// --- Nav Toggle ---
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
});

// --- Init ---
drawMeme();
