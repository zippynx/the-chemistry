const verdicts = [
  {
    max: 20,
    msg: "A difficult match. Sometimes opposites create the strongest stories."
  },
  {
    max: 40,
    msg: "There’s a spark worth exploring. It may simply need time to grow."
  },
  {
    max: 60,
    msg: "A balanced connection with genuine potential."
  },
  {
    max: 80,
    msg: "Strong chemistry and emotional harmony shine through."
  },
  {
    max: 100,
    msg: "An exceptional match. Rare, effortless, and deeply connected."
  }
];

function getVerdict(pct) {
  return verdicts.find(v => pct <= v.max)?.msg || verdicts[verdicts.length - 1].msg;
}

function animateCount(el, target, duration) {
  const start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    el.textContent = Math.round(ease * target) + '%';
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

document.getElementById('calculate').addEventListener('click', function () {
  const yourName  = document.getElementById('your-name').value.trim();
  const crushName = document.getElementById('crush-name').value.trim();

  if (!yourName || !crushName) {
    const empty = !yourName
      ? document.getElementById('your-name')
      : document.getElementById('crush-name');
    empty.focus();
    empty.style.borderBottomColor = '#8B1A2B';
    setTimeout(() => empty.style.borderBottomColor = '', 1200);
    return;
  }

  const pct = Math.floor(Math.random() * 101);

  document.getElementById('name-a').textContent = yourName;
  document.getElementById('name-b').textContent = crushName;
  document.getElementById('result-verdict').textContent = getVerdict(pct);

  const panel = document.getElementById('result-panel');
  panel.classList.remove('visible');
  void panel.offsetWidth;
  panel.classList.add('visible');

  document.getElementById('result-percentage').textContent = '0%';
  animateCount(document.getElementById('result-percentage'), pct, 1400);

  setTimeout(() => {
    document.getElementById('progress-fill').style.width = pct + '%';
  }, 80);
});

document.getElementById('try-again').addEventListener('click', function () {
  document.getElementById('result-panel').classList.remove('visible');
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('your-name').value = '';
  document.getElementById('crush-name').value = '';
  document.getElementById('your-name').focus();
});

['your-name', 'crush-name'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('calculate').click();
  });
});