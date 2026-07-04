export function renderLightSwitch(container, onTurnOn) {
  // We'll create a temporary full-screen black overlay with a pull cord
  const overlay = document.createElement('div');
  overlay.id = "light-overlay";
  overlay.className = "fixed inset-0 bg-black z-[100] flex flex-col items-center transition-opacity duration-1000 ease-in-out";
  
  overlay.innerHTML = `
    <!-- The cord -->
    <div id="cord-wrapper" class="relative cursor-pointer flex flex-col items-center group h-48 mt-0 transition-transform duration-300 active:translate-y-8">
      <div class="w-1 h-32 bg-gray-600 transition-all duration-300 group-hover:bg-gray-400"></div>
      <div class="w-4 h-8 bg-gray-400 rounded-full -mt-1 shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:bg-gray-200 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all"></div>
    </div>
    
    <div class="mt-12 text-gray-500 font-light tracking-[0.3em] uppercase text-sm animate-pulse pointer-events-none">
      Allume la lumière
    </div>
  `;

  container.appendChild(overlay);

  const cord = overlay.querySelector('#cord-wrapper');
  
  let isLightOn = false;
  
  cord.addEventListener('click', () => {
    if (isLightOn) return;
    isLightOn = true;
    
    // Add a flash effect (optional, or just fade to transparent)
    overlay.classList.remove('bg-black');
    overlay.classList.add('bg-transparent');
    overlay.innerHTML = ''; // remove cord and text
    
    setTimeout(() => {
      overlay.remove();
      onTurnOn();
    }, 1000); // wait for fade out
  });
}
