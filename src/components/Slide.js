export function renderSlide(container, slide, currentSlide, totalSlides, onNext, onPrev) {
  const mediaElement = slide.type === 'video' 
    ? `<video src="${slide.media}" autoplay loop muted playsinline class="w-full max-w-[280px] md:max-w-md aspect-square object-cover rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:mr-8 border-4 border-white/50 shrink-0"></video>`
    : `<img src="${slide.media}" alt="Media" class="w-full max-w-[280px] md:max-w-md aspect-square object-cover rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:mr-8 border-4 border-white/50 shrink-0">`;

  // Attachment Gauge HTML
  const progressPercentage = Math.round(((currentSlide + 1) / totalSlides) * 100);
  const progressBarHtml = `
    <div class="w-full max-w-sm md:max-w-md mb-6">
      <div class="flex justify-between text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
        <span>Niveau d'attachement</span>
        <span>${progressPercentage}%</span>
      </div>
      <div class="h-3 w-full bg-gray-200/50 rounded-full overflow-hidden shadow-inner border border-white/40">
        <div class="h-full bg-gradient-to-r from-gray-400 to-gray-800 rounded-full transition-all duration-1000 ease-out" style="width: ${progressPercentage}%"></div>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="glass-card w-full max-w-5xl rounded-[2.5rem] p-6 md:p-12 pop-in flex flex-col relative overflow-hidden">
      <div class="absolute -top-32 -right-32 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
      <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
      
      <div class="relative z-10 flex flex-col items-center">
        ${progressBarHtml}
        
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
                ${currentSlide === totalSlides - 1 ? 'Une dernière chose...' : 'Suivant ❤️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('next-btn').addEventListener('click', onNext);

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', onPrev);
  }
}
