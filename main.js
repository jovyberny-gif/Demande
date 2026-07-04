const app = document.getElementById('app');

const slides = [
  {
    text: "Tu es absolument magnifique, à tel point que j'ai du mal à détacher mon regard de toi. Et par-dessus tout, tu as une voix incroyable... une de ces voix douces et apaisantes que je pourrais écouter parler pendant des heures sans jamais me lasser. ✨",
    media: "/photo1.jpg",
    type: "img"
  },
  {
    text: "J'adore ton mood et l'énergie incroyable que tu dégages. 💫 À chaque fois que tu es là, tu apportes une ambiance tellement positive et rafraîchissante. C'est contagieux, et ça me donne juste envie de passer tout mon temps avec toi pour partager cette belle énergie.",
    media: "/video1.mp4",
    type: "video"
  },
  {
    text: "Au-delà de tout le reste, j'admire vraiment ton intelligence. 🧠💡 Tu as une façon de penser et de voir les choses qui me fascine. J'adore nos discussions, car tu me pousses toujours à réfléchir différemment, et c'est super rare de trouver quelqu'un d'aussi brillant et stimulant.",
    media: "/photo2.jpg",
    type: "img"
  },
  {
    text: "Et puis, tu es sûrement l'un de mes meilleurs 'red flags' dans le monde des animes que j'aime le plus 🚩😂. J'adore aussi tellement le fait que tu aimes jouer aux mêmes jeux que ton copain, c'est un détail qui me plaît énormément ! Tu es ce petit mélange parfait de folie et de charme auquel je ne peux tout simplement pas résister.",
    media: "/video2.mp4",
    type: "video"
  },
  {
    text: "Si tu me dis oui, je ferai vraiment de mon mieux pour toujours être là pour toi, pour te soutenir et te faire sourire chaque jour. Et si c'est non, pas grave du tout, on continuera notre vie comme si de rien n'était, sans aucune pression 😌. Mais j'espérais quand même te poser cette petite question...",
    media: "/video3.mp4",
    type: "video"
  }
];

let currentSlide = 0;
let noClickCount = 0;

const phrases = [
  "Non",
  "Tu es sûre ?",
  "Vraiment sûre ??",
  "Réfléchis bien !",
  "Allez s'il te plaît !",
  "Mon cœur va se briser...",
  "Je vais pleurer...",
  "Tu me fais de la peine 🥺",
  "D'accord, j'arrête de demander...",
  "Je plaisante, dis OUI ! ❤️"
];

function renderProgress() {
  return `
    <div class="flex gap-2 mb-6">
      ${slides.map((_, i) => `
        <div class="h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-primary' : (i < currentSlide ? 'w-4 bg-primary/50' : 'w-4 bg-gray-200/50')}"></div>
      `).join('')}
    </div>
  `;
}

function renderSlide() {
  const slide = slides[currentSlide];
  const mediaElement = slide.type === 'video' 
    ? `<video src="${slide.media}" autoplay loop muted playsinline class="w-full max-w-[280px] md:max-w-md aspect-square object-cover rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:mr-8 border-4 border-white/50 shrink-0"></video>`
    : `<img src="${slide.media}" alt="Media" class="w-full max-w-[280px] md:max-w-md aspect-square object-cover rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:mr-8 border-4 border-white/50 shrink-0">`;

  app.innerHTML = `
    <div class="glass-card w-full max-w-5xl rounded-[2.5rem] p-6 md:p-12 pop-in flex flex-col relative overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute -top-32 -right-32 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
      <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
      
      <div class="relative z-10 flex flex-col items-center">
        ${renderProgress()}
        
        <div class="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full gap-8 md:gap-12 mt-4">
          ${mediaElement}
          
          <div class="flex flex-col items-center md:items-start text-center md:text-left flex-1 justify-center py-4">
            <h2 class="text-xl md:text-2xl text-gray-900 leading-relaxed font-semibold mb-10">
              ${slide.text}
            </h2>
            
            <div class="flex flex-col sm:flex-row gap-4 w-full mt-auto">
              ${currentSlide > 0 ? `
              <button id="prev-btn" class="bg-white/80 text-gray-600 border-none rounded-full px-6 py-4 text-lg font-bold cursor-pointer shadow-lg transition-all hover:bg-gray-100 backdrop-blur-md flex-1">
                Précédent
              </button>
              ` : ''}
              <button id="next-btn" class="bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-6 py-4 text-lg font-bold cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex-[2]">
                ${currentSlide === slides.length - 1 ? 'Une dernière chose...' : 'Suivant ❤️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('next-btn').addEventListener('click', () => {
    currentSlide++;
    if (currentSlide < slides.length) {
      renderSlide();
    } else {
      renderQuestion();
    }
  });

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide--;
      renderSlide();
    });
  }
}

function renderQuestion() {
  app.innerHTML = `
    <div class="glass-card w-full max-w-3xl rounded-[3rem] p-8 md:p-16 pop-in flex flex-col items-center relative overflow-hidden text-center">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/50 to-transparent"></div>
      
      <img src="/love.png" alt="Love Kanji" class="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mb-10 shadow-2xl relative z-10 border-4 border-white bg-white" id="main-gif">
      
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

  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  noBtn.addEventListener('click', () => {
    noClickCount++;
    
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const currentPaddingTop = parseFloat(window.getComputedStyle(yesBtn).paddingTop);
    const currentPaddingLeft = parseFloat(window.getComputedStyle(yesBtn).paddingLeft);
    
    yesBtn.style.fontSize = `${currentSize * 1.2}px`;
    yesBtn.style.padding = `${currentPaddingTop * 1.2}px ${currentPaddingLeft * 1.2}px`;
    
    if (noClickCount < phrases.length) {
      noBtn.innerText = phrases[noClickCount];
    } else {
      noBtn.innerText = "OUI !"; 
      noBtn.className = "bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-12 py-4 text-xl font-bold cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all active:scale-95 hover:scale-105";
      noBtn.addEventListener('click', success);
    }
  });

  yesBtn.addEventListener('click', success);
}

function success() {
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
  
  document.getElementById('restart-btn').addEventListener('click', () => {
    currentSlide = 0;
    noClickCount = 0;
    // Remove all hearts
    document.querySelectorAll('.heart').forEach(h => h.remove());
    renderEnvelope();
  });

  createHearts();
}

function createHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart', 'absolute', '-top-10', 'z-0', 'fall');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }, 100);
}

function renderEnvelope() {
  app.innerHTML = `
    <div class="flex flex-col items-center justify-center w-full max-w-3xl pop-in p-8 text-center min-h-[80vh]">
      <div class="relative group cursor-pointer" id="envelope-icon">
        <div class="absolute inset-0 bg-gray-400 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div class="text-[10rem] md:text-[14rem] drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4 mb-12 relative z-10 animate-[bounce_3s_infinite]">
          💌
        </div>
      </div>
      <h1 class="text-4xl md:text-5xl text-gray-100 mb-12 font-bold tracking-tight text-glow pop-in" style="animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards;">
        J'ai quelque chose pour toi...
      </h1>
      <button id="open-btn" class="pop-in bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-14 py-5 text-xl font-bold cursor-pointer shadow-[0_15px_30px_rgba(255,64,129,0.3)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,64,129,0.4)]" style="animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards;">
        Lis moi ❤️
      </button>
    </div>
  `;

  document.getElementById('open-btn').addEventListener('click', renderSlide);
  document.getElementById('envelope-icon').addEventListener('click', renderSlide);
}

// Start the app with the envelope
renderEnvelope();
