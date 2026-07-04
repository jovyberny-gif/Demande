export function initParticles() {
  const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.classList.add('pointer-events-none', 'fixed', 'z-50', 'rounded-full', 'mix-blend-screen', 'animate-particle', 'shadow-[0_0_8px_rgba(255,255,255,0.8)]');
    
    const size = Math.random() * 6 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const colors = ['bg-white', 'bg-cyan-400', 'bg-fuchsia-400', 'bg-blue-500'];
    particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    particle.style.left = `${x - size/2}px`;
    particle.style.top = `${y - size/2}px`;
    
    const tx = (Math.random() - 0.5) * 80;
    const ty = Math.random() * 60 + 20; // falling down slightly
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) particle.remove();
    }, 1000);
  };

  let lastTime = 0;
  
  const handleMove = (e) => {
    const now = Date.now();
    if (now - lastTime < 40) return; // limit spawning rate
    lastTime = now;
    
    let x, y;
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    
    createParticle(x, y);
    if (Math.random() > 0.3) {
        createParticle(x + (Math.random()-0.5)*15, y + (Math.random()-0.5)*15);
    }
  };

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: true });
}
