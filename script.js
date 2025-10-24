const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const pickBtn = document.getElementById('pick');
const clearBtn = document.getElementById('clear');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    e.preventDefault();
    startPick();
  }
});

pickBtn.addEventListener('click', startPick);
clearBtn.addEventListener('click', clearAll);

function createTags(input) {
  const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());
  tagsEl.innerHTML = '';

  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.textContent = tag;
    tagsEl.appendChild(tagEl);
  });
}

function clearAll() {
  textarea.value = '';
  tagsEl.innerHTML = '';
}

function startPick() {
  const times = 30;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    if (randomTag) {
      highlight(randomTag);
      setTimeout(() => unhighlight(randomTag), 100);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    const finalTag = pickRandomTag();
    if (finalTag) {
      highlight(finalTag);
      burstConfetti(finalTag.getBoundingClientRect());
    }
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  if (!tags.length) return;
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlight(tag) { tag.classList.add('highlight'); }
function unhighlight(tag) { tag.classList.remove('highlight'); }

function burstConfetti(rect) {
  const colors = ['#00f5d4', '#f15bb5', '#fee440', '#00bbf9', '#9b5de5'];
  const amount = 30;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const rotate = Math.random() * 720;
    const size = Math.random() * 8 + 4;

    confetti.style.backgroundColor = color;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 1.5}px`;
    confetti.style.left = `${cx}px`;
    confetti.style.top = `${cy}px`;

    document.body.appendChild(confetti);

    confetti.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`, opacity: 0 }
      ],
      {
        duration: 1200 + Math.random() * 600,
        easing: 'cubic-bezier(0.3, 0, 0.7, 1)',
        fill: 'forwards'
      }
    );

    setTimeout(() => confetti.remove(), 2000);
  }
}
