export function renderQuestion(container, phrases, onSuccess) {
  container.innerHTML = `
    <div class="glass-card w-full max-w-3xl rounded-[3rem] p-8 md:p-16 pop-in flex flex-col items-center relative overflow-hidden text-center">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/50 to-transparent"></div>
      
      <img src="/love.png" alt="Love Kanji" class="w-48 h-48 md:w-64 md:h-64 object-contain mb-10 drop-shadow-2xl relative z-10" id="main-gif">
      
      <h1 id="question" class="text-3xl md:text-4xl text-gray-800 mb-12 leading-relaxed font-bold relative z-10 text-glow">
        Alors, veux-tu être ma copine ? 🥰
      </h1>
      
      <div class="flex flex-col sm:flex-row gap-6 items-center justify-center relative w-full z-10" id="buttons-container">
        <button id="yes-btn" class="bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-12 py-4 text-xl font-bold cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          Oui !
        </button>
        <button id="no-btn" class="bg-white/80 text-gray-600 border-none rounded-full px-10 py-4 text-lg font-bold cursor-pointer shadow-lg transition-all hover:bg-gray-100 backdrop-blur-md">
          Non
        </button>
      </div>
    </div>
  `;

  let noClickCount = 0;
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  noBtn.addEventListener('click', () => {
    noClickCount++;
    
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const currentPaddingTop = parseFloat(window.getComputedStyle(yesBtn).paddingTop);
    const currentPaddingLeft = parseFloat(window.getComputedStyle(yesBtn).paddingLeft);
    
    // Capping sizes to prevent breaking mobile layouts
    const maxSize = window.innerWidth < 768 ? 40 : 70;
    const maxPadTop = window.innerWidth < 768 ? 24 : 40;
    const maxPadLeft = window.innerWidth < 768 ? 48 : 80;

    const newSize = Math.min(currentSize * 1.2, maxSize);
    const newPadTop = Math.min(currentPaddingTop * 1.2, maxPadTop);
    const newPadLeft = Math.min(currentPaddingLeft * 1.2, maxPadLeft);
    
    yesBtn.style.fontSize = `${newSize}px`;
    yesBtn.style.padding = `${newPadTop}px ${newPadLeft}px`;
    
    if (noClickCount < phrases.length) {
      noBtn.innerText = phrases[noClickCount];
    } else {
      noBtn.innerText = "OUI !"; 
      noBtn.className = "bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-12 py-4 text-xl font-bold cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all active:scale-95 hover:scale-105";
      noBtn.addEventListener('click', onSuccess);
    }
  });

  yesBtn.addEventListener('click', onSuccess);
}
