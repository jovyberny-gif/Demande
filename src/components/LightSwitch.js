export function renderLightSwitch(container, callbacks) {
  const overlay = document.createElement('div');
  overlay.id = "light-overlay";
  overlay.className = "fixed inset-0 bg-indigo-950 z-[100] flex flex-col items-center transition-colors duration-[2000ms] ease-in-out";
  
  // Create a style element for the swing animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes cord-swing {
      0% { transform: translateY(0) rotate(0deg); }
      20% { transform: translateY(0) rotate(10deg); }
      40% { transform: translateY(0) rotate(-8deg); }
      60% { transform: translateY(0) rotate(5deg); }
      80% { transform: translateY(0) rotate(-2deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    .animate-swing {
      animation: cord-swing 1.5s ease-in-out forwards;
    }
  `;
  document.head.appendChild(style);

  overlay.innerHTML = `
    <!-- The Lamp -->
    <div class="relative flex flex-col items-center w-full mt-0">
      <!-- Wire to ceiling -->
      <div class="w-1 h-12 bg-gray-800"></div>
      
      <!-- Lamp Shade -->
      <div class="relative z-10 w-32 h-16 bg-gray-700 rounded-t-full shadow-lg flex flex-col items-center justify-end overflow-hidden border-b-4 border-gray-600" id="lamp-shade">
         <!-- Bulb (hidden at first) -->
         <div id="bulb" class="w-12 h-6 bg-white rounded-t-full mt-auto opacity-10 transition-opacity duration-[500ms] shadow-[0_-5px_15px_rgba(255,255,255,0.8)]"></div>
      </div>
      
      <!-- The cord wrapper (origin top for swinging) -->
      <div id="cord-wrapper" class="relative cursor-grab flex flex-col items-center group mt-[-5px] z-0 touch-none origin-top">
        <!-- Braided cord look -->
        <div id="cord-line" class="w-[3px] h-36 bg-gradient-to-b from-gray-600 via-gray-400 to-gray-600" style="background-size: 100% 4px;"></div>
        <!-- Handle (looks like a brass/wooden pull knob) -->
        <div class="w-5 h-10 bg-gradient-to-br from-amber-600 to-amber-900 rounded-b-xl rounded-t-sm shadow-[0_4px_6px_rgba(0,0,0,0.5)] border-t-2 border-amber-500"></div>
      </div>
      
      <!-- Glow effect (hidden at first) -->
      <div id="lamp-glow" class="absolute top-[64px] w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,230,0.7)_0%,_rgba(0,0,0,0)_60%)] opacity-0 transition-opacity duration-[1500ms] pointer-events-none z-[-1]"></div>
    </div>
    
    <div id="pull-text" class="mt-16 text-gray-400 font-light tracking-[0.3em] uppercase text-sm animate-pulse pointer-events-none transition-opacity duration-500">
      Tire la corde vers le bas
    </div>
  `;

  container.appendChild(overlay);

  const cordWrapper = overlay.querySelector('#cord-wrapper');
  const cordLine = overlay.querySelector('#cord-line');
  const bulb = overlay.querySelector('#bulb');
  const lampGlow = overlay.querySelector('#lamp-glow');
  const pullText = overlay.querySelector('#pull-text');
  
  let isLightOn = false;
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  const baseHeight = 144; // h-36 in tailwind is 144px
  
  const handleStart = (e) => {
    if (isLightOn) return;
    isDragging = true;
    if (callbacks && callbacks.onGrab) callbacks.onGrab();
    startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    cordLine.style.transition = 'none';
    cordWrapper.classList.remove('animate-swing');
    cordWrapper.classList.replace('cursor-grab', 'cursor-grabbing');
  };
  
  const handleMove = (e) => {
    if (!isDragging) return;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    // Add resistance and stretch factor
    const deltaY = (clientY - startY) * 0.7; 
    
    // Max stretch is 100px before it gets too stiff
    currentY = Math.max(0, Math.min(deltaY, 100));
    
    // Instead of translating the whole wrapper, we stretch the cord height
    cordLine.style.height = `${baseHeight + currentY}px`;
  };
  
  const handleEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    cordWrapper.classList.replace('cursor-grabbing', 'cursor-grab');
    
    if (currentY > 40) {
      // Pulled enough to click!
      isLightOn = true;
      
      // Snap the cord back to original length immediately
      cordLine.style.transition = 'height 0.1s ease-out';
      cordLine.style.height = `${baseHeight}px`;
      
      // Swing!
      cordWrapper.classList.add('animate-swing');
      
      // Visual feedback: click!
      bulb.classList.replace('opacity-10', 'opacity-100');
      lampGlow.classList.replace('opacity-0', 'opacity-100');
      pullText.style.opacity = '0';
      
      // Start music immediately on release
      if (callbacks && callbacks.onTurnOn) callbacks.onTurnOn();
      
      // Fade out indigo overlay
      setTimeout(() => {
        overlay.classList.replace('bg-indigo-950', 'bg-transparent');
      }, 500); 
      
      // Remove overlay completely
      setTimeout(() => {
        overlay.remove();
        style.remove();
      }, 2500);
      
    } else {
      // Didn't pull enough, snap back with a bouncy elasticity
      if (callbacks && callbacks.onCancel) callbacks.onCancel();
      cordLine.style.transition = 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      cordLine.style.height = `${baseHeight}px`;
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
