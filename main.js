const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('checkbox');
const body = document.body;

// --- THEME LOGIC ---
const applyTheme = (theme) => {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
    themeToggle.checked = false;
  }
};

const toggleTheme = () => {
  const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
};

themeToggle.addEventListener('change', toggleTheme);

// On page load, apply saved theme or OS preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
});


// --- LOTTO LOGIC ---
const getNumberColor = (number) => {
  if (number <= 10) return '#fbc400'; // Yellow
  if (number <= 20) return '#69c8f2'; // Blue
  if (number <= 30) return '#ff7272'; // Red
  if (number <= 40) return '#aaa'; // Gray
  return '#b0d840'; // Green
};

generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = '';
  const numbers = new Set();
  while(numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  sortedNumbers.forEach(number => {
    const ball = document.createElement('div');
    ball.className = 'lotto-ball';
    ball.style.backgroundColor = getNumberColor(number);
    ball.textContent = number;
    lottoNumbersContainer.appendChild(ball);
  });
});
