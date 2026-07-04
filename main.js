import { slides, phrases } from './src/data.js';
import { renderEnvelope } from './src/components/Envelope.js';
import { renderSlide } from './src/components/Slide.js';
import { renderQuestion } from './src/components/Question.js';
import { renderSuccess } from './src/components/Success.js';
import { initParticles } from './src/components/Particles.js';
import { renderLightSwitch } from './src/components/LightSwitch.js';

const app = document.getElementById('app');
let currentSlide = 0;
const bgMusic = new Audio('/music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

function handleOpen() {
  if (bgMusic.paused) {
    bgMusic.volume = 0.5;
    bgMusic.currentTime = 0;
    bgMusic.play().catch(err => console.log("La musique n'a pas pu se lancer :", err));
  }
  renderCurrentSlide();
}

function handleNext() {
  currentSlide++;
  if (currentSlide < slides.length) {
    renderCurrentSlide();
  } else {
    renderQuestion(app, phrases, handleSuccess);
  }
}

function handlePrev() {
  if (currentSlide > 0) {
    currentSlide--;
    renderCurrentSlide();
  }
}

function handleSuccess() {
  renderSuccess(handleRestart);
}

function handleRestart() {
  currentSlide = 0;
  // Remove all hearts from the DOM
  document.querySelectorAll('.heart').forEach(h => h.remove());
  bgMusic.pause();
  bgMusic.currentTime = 0;
  startApp();
}

function renderCurrentSlide() {
  renderSlide(app, slides[currentSlide], currentSlide, slides.length, handleNext, handlePrev);
}

function startApp() {
  preloadAssets();
  renderEnvelope(app, handleOpen);
  // Add the light switch overlay on top of the envelope
  renderLightSwitch(app, {});
}

function preloadAssets() {
  const images = ['/love.png', '/photo1.jpg', '/photo2.jpg'];
  const videos = ['/video1.mp4', '/video2.mp4', '/video3.mp4', '/video-success.mp4'];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  videos.forEach(src => {
    const vid = document.createElement('video');
    vid.preload = 'auto';
    vid.src = src;
  });
}

// Start the application
startApp();
initParticles();
