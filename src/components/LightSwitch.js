export function renderLightSwitch(container, onTurnOn) {
  const overlay = document.createElement('div');
  overlay.id = "light-overlay";
  overlay.className = "fixed inset-0 bg-black z-[100] flex flex-col items-center transition-colors duration-[2000ms] ease-in-out";
  
  overlay.innerHTML = `
    <!-- The Lamp -->
    <div class="relative flex flex-col items-center w-full mt-0">
      <!-- Wire to ceiling -->
      <div class="w-1 h-12 bg-gray-800"></div>
      
      <!-- Lamp Shade -->
      <div class="relative z-10 w-32 h-16 bg-gray-700 rounded-t-full shadow-lg flex flex-col items-center justify-end overflow-hidden" id="lamp-shade">
         <!-- Bulb (hidden at first) -->
         <div id="bulb" class="w-12 h-4 bg-white rounded-t-full mt-auto opacity-10 transition-opacity duration-[500ms]"></div>
      </div>
      
      <!-- The cord -->
      <div id="cord-wrapper" class="relative cursor-grab flex flex-col items-center group mt-[-10px] z-0 touch-none">
        <div id="cord-line" class="w-1 h-32 bg-gray-600 transition-colors group-hover:bg-gray-500"></div>
        <div class="w-5 h-8 bg-gray-500 rounded-full -mt-1 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:bg-gray-400"></div>
      </div>
      
      <!-- Glow effect (hidden at first) -->
      <div id="lamp-glow" class="absolute top-[64px] w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.8)_0%,_rgba(0,0,0,0)_60%)] opacity-0 transition-opacity duration-[1500ms] pointer-events-none z-[-1]"></div>
    </div>
    
    <div id="pull-text" class="mt-16 text-gray-400 font-light tracking-[0.3em] uppercase text-sm animate-pulse pointer-events-none transition-opacity duration-500">
      Tire la corde vers le bas
    </div>
  `;

  container.appendChild(overlay);

  const cordWrapper = overlay.querySelector('#cord-wrapper');
  const bulb = overlay.querySelector('#bulb');
  const lampGlow = overlay.querySelector('#lamp-glow');
  const pullText = overlay.querySelector('#pull-text');
  
  let isLightOn = false;
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  
  const handleStart = (e) => {
    if (isLightOn) return;
    isDragging = true;
    startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    cordWrapper.style.transition = 'none';
    cordWrapper.classList.replace('cursor-grab', 'cursor-grabbing');
  };
  
  const handleMove = (e) => {
    if (!isDragging) return;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;
    
    // Only allow pulling down, up to max 120px
    currentY = Math.max(0, Math.min(deltaY, 120));
    cordWrapper.style.transform = `translateY(${currentY}px)`;
  };
  
  const handleEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    cordWrapper.classList.replace('cursor-grabbing', 'cursor-grab');
    cordWrapper.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    if (currentY > 50) {
      // Pulled enough to click!
      isLightOn = true;
      cordWrapper.style.transform = 'translateY(0px)';
      
      // Visual feedback: click!
      bulb.classList.replace('opacity-10', 'opacity-100');
      lampGlow.classList.replace('opacity-0', 'opacity-100');
      pullText.style.opacity = '0';
      
      // Start music immediately on release
      onTurnOn();
      
      // Fade out black overlay
      setTimeout(() => {
        overlay.classList.replace('bg-black', 'bg-transparent');
      }, 500); // short wait for the lamp to "light up" the room before fading background
      
      // Remove overlay completely
      setTimeout(() => {
        overlay.remove();
      }, 2500);
      
    } else {
      // Didn't pull enough, snap back
      cordWrapper.style.transform = 'translateY(0px)';
      currentY = 0;
    }
  };

  cordWrapper.addEventListener('mousedown', handleStart);
  cordWrapper.addEventListener('touchstart', handleStart, { passive: true });
  
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: true });
  
  window.addEventListener('mouseup', handleEnd);
  window.addEventListener('touchend', handleEnd);
}
