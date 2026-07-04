export function renderEnvelope(container, onOpen) {
  container.innerHTML = `
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
      <button id="open-btn" class="pop-in bg-gradient-to-r from-primary to-secondary text-white border-none rounded-full px-14 py-5 text-xl font-bold cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]" style="animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards;">
        Lis moi ❤️
      </button>
    </div>
  `;

  document.getElementById('open-btn').addEventListener('click', onOpen);
  document.getElementById('envelope-icon').addEventListener('click', onOpen);
}
