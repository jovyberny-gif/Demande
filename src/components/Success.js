import confetti from 'canvas-confetti';

export function renderSuccess(onRestart) {
  // Confetti explosion
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
    colors: ['#ffffff', '#d1d5db', '#6b7280', '#111827']
  });

  const mainGif = document.getElementById('main-gif');
  const question = document.getElementById('question');
  const buttonsContainer = document.getElementById('buttons-container');

  const videoHtml = `<video src="/video-success.mp4" autoplay loop muted playsinline class="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mb-10 shadow-2xl relative z-10 border-4 border-white"></video>`;
  mainGif.outerHTML = videoHtml;
  
  question.innerHTML = "Je savais que tu dirais oui ! ❤️<br><span class='text-2xl mt-4 block font-normal'>J'ai hâte de te voir !</span>";
  question.className = "text-4xl text-primary font-bold pop-in relative z-10";
  
  buttonsContainer.innerHTML = `
    <button id="restart-btn" class="bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-10 py-4 text-lg font-bold cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] mt-4">
      Retour au début 🔄
    </button>
  `;
  
  document.getElementById('restart-btn').addEventListener('click', onRestart);

  createHearts();
}

function createHearts() {
  const intervalId = setInterval(() => {
    // Stop creating hearts if the user restarted (the question element will be gone)
    if (!document.getElementById('question')) {
      clearInterval(intervalId);
      return;
    }
    
    const heart = document.createElement('div');
    heart.classList.add('heart', 'absolute', '-top-10', 'z-0', 'fall');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, 5000);
  }, 100);
}
