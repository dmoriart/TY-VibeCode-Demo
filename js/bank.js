/* ===========================================
   BANK.JS — TY Banking AI Demo
   Interactive logic for bank.html
   =========================================== */

/* ─── Nav Toggle (shared) ─── */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ─── Hero Particle Canvas ─── */
(function initParticles() {
    const canvas = document.getElementById('bank-particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ─── Counter Animations ─── */
function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
}

/* ─── Intersection Observer for animations ─── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger counters
            entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in, .bank-hero-content').forEach(el => observer.observe(el));

// Trigger counters in hero immediately if visible
setTimeout(() => {
    document.querySelectorAll('.bank-hero-stats [data-target]').forEach(animateCounter);
}, 500);

/* ─────────────────────────────────────────────
   FRAUD DETECTION WIDGET
   ───────────────────────────────────────────── */
const TRANSACTIONS = [
    {
        id: 1, name: 'Costa Coffee, Dublin', amount: '€3.50', time: '9:12 AM',
        icon: '☕', riskScore: 4,
        signals: [
            { label: 'Amount', value: 'Normal', status: 'ok' },
            { label: 'Location', value: 'Dublin city centre', status: 'ok' },
            { label: 'Merchant', value: 'Familiar coffee shop', status: 'ok' },
            { label: 'Time', value: 'Morning rush — typical', status: 'ok' },
            { label: 'Velocity', value: 'First transaction today', status: 'ok' },
        ],
        verdict: 'approved', verdictText: '✅ Cleared — completely normal spending behaviour',
    },
    {
        id: 2, name: 'Tesco Express, Cork', amount: '€24.80', time: '2:45 PM',
        icon: '🛒', riskScore: 11,
        signals: [
            { label: 'Amount', value: 'Normal', status: 'ok' },
            { label: 'Location', value: 'Cork — account holder\'s home city', status: 'ok' },
            { label: 'Merchant', value: 'Supermarket — common', status: 'ok' },
            { label: 'Time', value: 'Afternoon — typical', status: 'ok' },
            { label: 'Velocity', value: '2nd transaction today', status: 'warn' },
        ],
        verdict: 'approved', verdictText: '✅ Cleared — minor velocity flag, otherwise normal',
    },
    {
        id: 3, name: 'ATM Withdrawal, Lagos 🇳🇬', amount: '€500', time: '3:17 AM',
        icon: '🏧', riskScore: 91,
        signals: [
            { label: 'Amount', value: '€500 — high for this account', status: 'danger' },
            { label: 'Location', value: '⚠️ Nigeria — never used here before', status: 'danger' },
            { label: 'Merchant', value: 'ATM cash withdrawal', status: 'warn' },
            { label: 'Time', value: '⚠️ 3:17 AM local — unusual', status: 'danger' },
            { label: 'Velocity', value: '⚠️ Same card used in Dublin 4 hours ago', status: 'danger' },
        ],
        verdict: 'fraud', verdictText: '🚨 FLAGGED — Card blocked. SMS alert sent. Human review triggered.',
    },
    {
        id: 4, name: 'Netflix Subscription', amount: '€15.99', time: '12:00 AM',
        icon: '📺', riskScore: 2,
        signals: [
            { label: 'Amount', value: 'Exact same amount every month', status: 'ok' },
            { label: 'Location', value: 'Online — merchant verified', status: 'ok' },
            { label: 'Merchant', value: 'Recurring subscription — whitelisted', status: 'ok' },
            { label: 'Time', value: 'Midnight — standing order time', status: 'ok' },
            { label: 'Velocity', value: 'Recurring monthly charge', status: 'ok' },
        ],
        verdict: 'approved', verdictText: '✅ Auto-cleared — recurring merchant, exact pattern match',
    },
    {
        id: 5, name: 'Crypto Exchange Transfer', amount: '€4,999', time: '11:58 PM',
        icon: '₿', riskScore: 78,
        signals: [
            { label: 'Amount', value: '⚠️ €4,999 — just below €5k reporting threshold', status: 'danger' },
            { label: 'Location', value: 'Online — unregistered exchange', status: 'warn' },
            { label: 'Merchant', value: '⚠️ Cryptocurrency — high risk category', status: 'danger' },
            { label: 'Time', value: '⚠️ Late night — unusual for this user', status: 'warn' },
            { label: 'Velocity', value: '3rd large transfer this week', status: 'danger' },
        ],
        verdict: 'review', verdictText: '⚠️ HELD for human review — multiple high-risk indicators detected',
    },
    {
        id: 6, name: 'Penneys / Primark, Dublin', amount: '€62.50', time: '1:30 PM',
        icon: '👗', riskScore: 8,
        signals: [
            { label: 'Amount', value: 'Normal retail spending', status: 'ok' },
            { label: 'Location', value: 'Dublin — matches user profile', status: 'ok' },
            { label: 'Merchant', value: 'Clothing retail — common', status: 'ok' },
            { label: 'Time', value: 'Saturday afternoon — peak shopping', status: 'ok' },
            { label: 'Velocity', value: 'Normal weekend spending pattern', status: 'ok' },
        ],
        verdict: 'approved', verdictText: '✅ Cleared — fits Saturday shopping profile perfectly',
    },
];

function buildFraudFeed() {
    const feed = document.getElementById('fraud-feed');
    if (!feed) return;
    feed.innerHTML = TRANSACTIONS.map(tx => `
    <div class="fraud-tx" data-id="${tx.id}" role="button" tabindex="0" aria-label="View AI analysis for ${tx.name}">
      <div class="fraud-tx-icon">${tx.icon}</div>
      <div class="fraud-tx-info">
        <div class="fraud-tx-name">${tx.name}</div>
        <div class="fraud-tx-meta">${tx.time} · ${tx.amount}</div>
      </div>
      <div class="fraud-tx-risk risk-${getRiskLevel(tx.riskScore)}">${tx.riskScore}</div>
    </div>
  `).join('');

    feed.querySelectorAll('.fraud-tx').forEach(el => {
        el.addEventListener('click', () => selectTransaction(parseInt(el.dataset.id)));
        el.addEventListener('keydown', e => e.key === 'Enter' && selectTransaction(parseInt(el.dataset.id)));
    });
}

function getRiskLevel(score) {
    if (score < 25) return 'low';
    if (score < 60) return 'medium';
    return 'high';
}

function selectTransaction(id) {
    const tx = TRANSACTIONS.find(t => t.id === id);
    if (!tx) return;

    // Mark active
    document.querySelectorAll('.fraud-tx').forEach(el => el.classList.remove('active'));
    document.querySelector(`.fraud-tx[data-id="${id}"]`)?.classList.add('active');

    // Show panel
    document.getElementById('fraud-placeholder').classList.add('hidden');
    const content = document.getElementById('fraud-content');
    content.classList.remove('hidden');

    // Name
    document.getElementById('fraud-tx-name').textContent = tx.name + ' — ' + tx.amount;

    // Risk meter animation
    const fill = document.getElementById('risk-meter-fill');
    const thumb = document.getElementById('risk-meter-thumb');
    const num = document.getElementById('risk-score-num');
    fill.style.width = '0%';
    num.textContent = '0';
    setTimeout(() => {
        fill.style.width = tx.riskScore + '%';
        thumb.style.left = tx.riskScore + '%';
        fill.className = `risk-meter-fill risk-fill-${getRiskLevel(tx.riskScore)}`;
    }, 100);
    let counter = 0;
    const counterInterval = setInterval(() => {
        counter = Math.min(counter + 2, tx.riskScore);
        num.textContent = counter;
        if (counter >= tx.riskScore) clearInterval(counterInterval);
    }, 20);

    // Signals
    const signalsEl = document.getElementById('fraud-signals');
    signalsEl.innerHTML = tx.signals.map(s => `
    <div class="signal-row signal-${s.status}">
      <span class="signal-label">${s.label}</span>
      <span class="signal-value">${s.value}</span>
      <span class="signal-dot"></span>
    </div>
  `).join('');

    // Verdict
    const verdictEl = document.getElementById('fraud-verdict');
    verdictEl.className = `fraud-verdict verdict-${tx.verdict}`;
    verdictEl.textContent = tx.verdictText;
}

buildFraudFeed();

/* ─────────────────────────────────────────────
   LENDING DECISION WIDGET
   ───────────────────────────────────────────── */
const sliders = {
    income: document.getElementById('income-slider'),
    credit: document.getElementById('credit-slider'),
    debt: document.getElementById('debt-slider'),
    loan: document.getElementById('loan-slider'),
    term: document.getElementById('term-slider'),
};
const displays = {
    income: document.getElementById('income-val'),
    credit: document.getElementById('credit-val'),
    debt: document.getElementById('debt-val'),
    loan: document.getElementById('loan-val'),
    term: document.getElementById('term-val'),
};

function fmt(n) { return '€' + Number(n).toLocaleString('en-IE'); }

function updateLendingDisplay() {
    if (!sliders.income) return;
    const income = parseInt(sliders.income.value);
    const credit = parseInt(sliders.credit.value);
    const debt = parseInt(sliders.debt.value);
    const loan = parseInt(sliders.loan.value);
    const term = parseInt(sliders.term.value);

    displays.income.textContent = fmt(income);
    displays.credit.textContent = credit;
    displays.debt.textContent = fmt(debt);
    displays.loan.textContent = fmt(loan);
    displays.term.textContent = term + ' years';

    // Score calculation
    let score = 0;

    // Income score (0–25)
    score += Math.min(25, (income / 120000) * 25);

    // Credit score (0–35)
    const cNorm = (credit - 300) / 550;
    score += cNorm * 35;

    // Debt-to-income ratio (0–20) — lower is better
    const monthlyIncome = income / 12;
    const dti = debt / monthlyIncome;
    const dtiScore = Math.max(0, 20 - dti * 40);
    score += dtiScore;

    // Loan-to-income ratio (0–20) — lower is better
    const lti = loan / income;
    const ltiScore = Math.max(0, 20 - lti * 3);
    score += ltiScore;

    score = Math.max(0, Math.min(100, Math.round(score)));

    // Monthly repayment estimate (rough annuity formula at ~4% rate)
    const rate = 0.04 / 12;
    const n = term * 12;
    const monthly = Math.round(loan * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1));

    // Decision
    let verdict, label, icon, cardClass;
    if (score >= 65) {
        verdict = 'approved'; label = 'APPROVED'; icon = '✅'; cardClass = 'decision-approved';
    } else if (score >= 45) {
        verdict = 'review'; label = 'CONDITIONALLY APPROVED'; icon = '⚠️'; cardClass = 'decision-review';
    } else {
        verdict = 'declined'; label = 'DECLINED'; icon = '❌'; cardClass = 'decision-declined';
    }

    const card = document.getElementById('lending-decision-card');
    if (card) {
        card.className = `lending-decision-card glass-card ${cardClass}`;
        document.getElementById('verdict-icon').textContent = icon;
        document.getElementById('verdict-label').textContent = label;
        document.getElementById('decision-score-num').textContent = score + ' / 100';
        const fillEl = document.getElementById('decision-score-fill');
        if (fillEl) {
            fillEl.style.width = score + '%';
            fillEl.className = `decision-score-fill score-fill-${verdict}`;
        }
        document.getElementById('monthly-amount').textContent = fmt(monthly) + '/mo';

        // Factors
        const factors = [
            { label: 'Income', ok: income >= 35000, detail: income >= 35000 ? 'Sufficient income level' : 'Income may be too low for this loan' },
            { label: 'Credit Score', ok: credit >= 600, detail: credit >= 700 ? 'Excellent credit history' : credit >= 600 ? 'Acceptable credit' : 'Credit score needs improvement' },
            { label: 'Debt-to-Income', ok: dti < 0.35, detail: dti < 0.35 ? `DTI: ${(dti * 100).toFixed(0)}% — within limits` : `DTI: ${(dti * 100).toFixed(0)}% — too high` },
            { label: 'Loan-to-Income', ok: lti < 5, detail: lti < 5 ? `LTI: ${lti.toFixed(1)}x — acceptable` : `LTI: ${lti.toFixed(1)}x — exceeds 5x limit` },
        ];
        document.getElementById('decision-factors').innerHTML = factors.map(f => `
      <div class="factor-row factor-${f.ok ? 'ok' : 'fail'}">
        <span class="factor-status">${f.ok ? '✓' : '✗'}</span>
        <span class="factor-label">${f.label}</span>
        <span class="factor-detail">${f.detail}</span>
      </div>
    `).join('');
    }
}

Object.values(sliders).forEach(s => s?.addEventListener('input', updateLendingDisplay));
updateLendingDisplay();

/* ─────────────────────────────────────────────
   nCINO PIPELINE STEPPER
   ───────────────────────────────────────────── */
let pipelineStep = 0;
const PIPELINE_STEPS = 6;
const pipSteps = Array.from({ length: PIPELINE_STEPS }, (_, i) => document.getElementById(`pip-step-${i}`));
const pipCounter = document.getElementById('pip-counter');

function updatePipeline() {
    pipSteps.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('active', i === pipelineStep);
        el.classList.toggle('complete', i < pipelineStep);
    });
    if (pipCounter) pipCounter.textContent = `Step ${pipelineStep + 1} of ${PIPELINE_STEPS}`;
}

document.getElementById('pip-next')?.addEventListener('click', () => {
    pipelineStep = (pipelineStep + 1) % PIPELINE_STEPS;
    updatePipeline();
});
document.getElementById('pip-prev')?.addEventListener('click', () => {
    pipelineStep = (pipelineStep - 1 + PIPELINE_STEPS) % PIPELINE_STEPS;
    updatePipeline();
});

// Auto-advance
setInterval(() => {
    pipelineStep = (pipelineStep + 1) % PIPELINE_STEPS;
    updatePipeline();
}, 4000);
updatePipeline();

/* ─────────────────────────────────────────────
   VIBE CODING PROMPT SWITCHER
   ───────────────────────────────────────────── */
const VIBE_PROMPTS = {
    fraud: {
        prompt: "Build me a real-time transaction fraud detector. Flag anything that looks unusual based on amount, location, and spending history. Show the risk score as a colour-coded bar. Make it work on mobile.",
        code: `<span class="comment">// AI wrote all 847 lines of this</span><br>
<span class="keyword">function</span> <span class="function">checkFraud</span>(transaction) {<br>
&nbsp;&nbsp;<span class="keyword">const</span> score = <span class="function">analyseRisk</span>({<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">amount</span>: transaction.amount,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">location</span>: transaction.geo,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="attr">history</span>: <span class="function">getHistory</span>(user)<br>
&nbsp;&nbsp;});<br>
&nbsp;&nbsp;<span class="keyword">return</span> score &gt; <span class="number">0.85</span> ? <span class="string">'FRAUD'</span> : <span class="string">'OK'</span>;<br>
}`,
    },
    loan: {
        prompt: "Create a mortgage calculator that shows whether a bank should approve a loan. Include sliders for income, credit score, existing debts, and loan amount. Calculate the monthly repayment and show a clear decision.",
        code: `<span class="comment">// Mortgage decision engine</span><br>
<span class="keyword">function</span> <span class="function">assessMortgage</span>(applicant) {<br>
&nbsp;&nbsp;<span class="keyword">const</span> lti = applicant.loan / applicant.income;<br>
&nbsp;&nbsp;<span class="keyword">const</span> dti = applicant.monthlyDebt / (applicant.income / <span class="number">12</span>);<br>
&nbsp;&nbsp;<span class="keyword">const</span> score = <span class="function">calculateScore</span>({lti, dti,<br>
&nbsp;&nbsp;&nbsp;&nbsp;creditScore: applicant.credit});<br>
&nbsp;&nbsp;<span class="keyword">return</span> score &gt; <span class="number">65</span> ? <span class="string">'APPROVED'</span> : <span class="string">'DECLINED'</span>;<br>
}`,
    },
    report: {
        prompt: "Generate an automated credit risk report for a portfolio of 200 business loans. Highlight any loans that have missed payments, show revenue trends for each company, and flag early warning signals. Format it as an executive summary.",
        code: `<span class="comment">// Portfolio risk report generator</span><br>
<span class="keyword">async function</span> <span class="function">generateReport</span>(portfolio) {<br>
&nbsp;&nbsp;<span class="keyword">const</span> alerts = portfolio<br>
&nbsp;&nbsp;&nbsp;&nbsp;.<span class="function">filter</span>(loan =&gt; loan.<span class="function">isAtRisk</span>())<br>
&nbsp;&nbsp;&nbsp;&nbsp;.<span class="function">map</span>(loan =&gt; ({<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;company: loan.company,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signal: loan.<span class="function">getEarlyWarning</span>()<br>
&nbsp;&nbsp;&nbsp;&nbsp;}));<br>
&nbsp;&nbsp;<span class="keyword">return</span> <span class="function">formatReport</span>(alerts);<br>
}`,
    },
};

document.querySelectorAll('.vibe-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.prompt;
        const data = VIBE_PROMPTS[key];
        if (!data) return;

        document.querySelectorAll('.vibe-prompt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const promptBox = document.getElementById('vibe-prompt-display');
        const codeOut = document.getElementById('vibe-code-output');
        if (promptBox) promptBox.textContent = data.prompt;
        if (codeOut) codeOut.innerHTML = data.code;
    });
});

/* ─────────────────────────────────────────────
   SCROLL ANIMATIONS — re-trigger for dynamic
   ───────────────────────────────────────────── */
// Re-attach observer to any newly loaded elements
setTimeout(() => {
    document.querySelectorAll('.animate-in:not(.visible)').forEach(el => observer.observe(el));
}, 300);
