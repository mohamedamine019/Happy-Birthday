// DOM Elements
const letterContainer = document.getElementById('letterContainer');
const countdownTimer = document.getElementById('countdownTimer');
const countdownNumber = document.getElementById('countdownNumber');
const imageSlideshow = document.getElementById('imageSlideshow');
const currentSlide = document.getElementById('currentSlide');
const slideDots = document.getElementById('slideDots');
const celebrations = document.getElementById('celebrations');
const balloons = document.getElementById('balloons');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const galleryButton = document.getElementById('galleryButton');
const photoGallery = document.getElementById('photoGallery');
const closeGallery = document.getElementById('closeGallery');
const galleryMainImage = document.getElementById('galleryMainImage');
const galleryCaption = document.getElementById('galleryCaption');
const galleryThumbnails = document.getElementById('galleryThumbnails');
const floatingHearts = document.getElementById('floatingHearts');
const backgroundCanvas = document.getElementById('backgroundCanvas');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');

// State
let currentImageIndex = 0;
let slideshowTimer = null;
let musicPlaying = false;

// Image data (replace with actual images)
const images = [
  { src: 'photo1.jpg', alt: 'Birthday memory 1', caption: '' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 2', caption: 'Beach day last summer' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 3', caption: 'New Year\'s celebration' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 4', caption: 'Coffee shop meetup' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 5', caption: 'Concert night' },
];

// Gallery photos (replace with actual photos)
const galleryPhotos = [
  { src: 'photo1.jpg', alt: 'Birthday memory 1', caption: 'That time we went hiking' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 2', caption: 'Beach day last summer' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 3', caption: 'New Year\'s celebration' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 4', caption: 'Coffee shop meetup' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 5', caption: 'Concert night' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 6', caption: 'Road trip adventure' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 7', caption: 'Movie night' },
  { src: 'placeholder.jpg', alt: 'Birthday memory 8', caption: 'Dinner celebration' },
];

// Balloon colors
const balloonColors = [
  'linear-gradient(to bottom, #f472b6, #db2777)',
  'linear-gradient(to bottom, #c084fc, #a855f7)',
  'linear-gradient(to bottom, #60a5fa, #3b82f6)',
  'linear-gradient(to bottom, #4ade80, #22c55e)',
  'linear-gradient(to bottom, #facc15, #eab308)',
  'linear-gradient(to bottom, #f87171, #ef4444)',
  'linear-gradient(to bottom, #818cf8, #6366f1)'
];

// Initialize
function init() {
  setupEventListeners();
  setupBackgroundEffects();
}

// Event Listeners
function setupEventListeners() {
  // Letter click
  letterContainer.addEventListener('click', handleLetterClick);
  
  // Yes button
  yesButton.addEventListener('click', () => {
    window.location.href = 'message.html';
    console.log(document.getElementById('yesButton')); // Should log the button element
  }); 
  
  // Gallery button
  galleryButton.addEventListener('click', openGallery);
  
  // Close gallery
  closeGallery.addEventListener('click', closeGalleryHandler);
  
  // Music controls
  musicToggle.addEventListener('click', toggleMusic);
  volumeControl.addEventListener('value', updateVolume);
}

// Letter click handler
function handleLetterClick() {
  letterContainer.classList.add('hidden');
  startMusic();
  startCountdown();
}

// Start countdown
function startCountdown() {
  countdownTimer.classList.remove('hidden');
  let count = 3;
  countdownNumber.textContent = count;
  
  const countInterval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(countInterval);
      countdownTimer.classList.add('hidden');
      startSlideshow();
    } else {
      countdownNumber.textContent = count;
    }
  }, 1000);
}

// Start slideshow
function startSlideshow() {
  imageSlideshow.classList.remove('hidden');
  
  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slide-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    slideDots.appendChild(dot);
  });
  
  // Set first slide
  updateSlide();
  
  // Start timer
  slideshowTimer = setInterval(() => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      clearInterval(slideshowTimer);
      endSlideshow();
    } else {
      updateSlide();
    }
  }, 3000);
}

// Update slide
function updateSlide() {
  // Update image and caption
  currentSlide.src = images[currentImageIndex].src;
  currentSlide.alt = images[currentImageIndex].alt;
  const caption = imageSlideshow.querySelector('.slide-caption');
  caption.textContent = images[currentImageIndex].caption;
  
  // Update dots
  const dots = slideDots.querySelectorAll('.slide-dot');
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
  
  // Apply random transition effect
  const effects = [
    { opacity: 0, transform: 'scale(1.1)' },
    { opacity: 0, transform: 'translateX(100px)' },
    { opacity: 0, transform: 'translateY(100px) rotate(5deg)' },
    { opacity: 0, filter: 'blur(10px)' },
    { opacity: 0, transform: 'scale(0.5) rotate(-10deg)' }
  ];
  
  const randomEffect = effects[Math.floor(Math.random() * effects.length)];
  
  // Apply effect
  currentSlide.style.opacity = '0';
  currentSlide.style.transform = randomEffect.transform || '';
  currentSlide.style.filter = randomEffect.filter || '';
  
  setTimeout(() => {
    currentSlide.style.transition = 'all 1s ease';
    currentSlide.style.opacity = '1';
    currentSlide.style.transform = 'none';
    currentSlide.style.filter = 'none';
  }, 50);
}

// Go to specific slide
function goToSlide(index) {
  if (index === currentImageIndex) return;
  
  clearInterval(slideshowTimer);
  currentImageIndex = index;
  updateSlide();
  
  // Restart timer
  slideshowTimer = setInterval(() => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      clearInterval(slideshowTimer);
      endSlideshow();
    } else {
      updateSlide();
    }
  }, 3000);
}

// End slideshow
function endSlideshow() {
  imageSlideshow.classList.add('hidden');
  startCelebrations();
}

// Start celebrations
function startCelebrations() {
  celebrations.classList.remove('hidden');
  createBalloons();
  startConfetti();
  startFloatingHearts();
}

// Create balloons
function createBalloons() {
  for (let i = 0; i < 7; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${5 + i * 15}%`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    balloon.style.animationDuration = `${11 + Math.random() * 5}s`;
    
    const balloonInner = document.createElement('div');
    balloonInner.classList.add('balloon-inner');
    balloonInner.style.background = balloonColors[i % balloonColors.length];
    
    const balloonShine = document.createElement('div');
    balloonShine.classList.add('balloon-shine');
    
    const balloonString = document.createElement('div');
    balloonString.classList.add('balloon-string');
    
    balloonInner.appendChild(balloonShine);
    balloon.appendChild(balloonInner);
    balloon.appendChild(balloonString);
    balloons.appendChild(balloon);
  }
}

// Start confetti
function startConfetti() {
  const duration = 8 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#540d6e', '#ee4266', '#ffd23f', '#3bceac', '#0ead69'],
    });
  }, 250);
  
  // Launch fireworks after confetti
  setTimeout(() => {
    const fireworksInterval = setInterval(() => {
      launchFireworks();
    }, 800);
    
    setTimeout(() => clearInterval(fireworksInterval), 5000);
  }, duration);
}

// Launch fireworks
function launchFireworks() {
  const randomX = Math.random();
  const randomY = Math.random() * 0.5;
  
  function fire(particleRatio, opts) {
    confetti({
      ...opts,
      origin: { x: randomX, y: randomY },
      particleCount: Math.floor(200 * particleRatio)
    });
  }
  
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    decay: 0.8,
    scalar: 0.8,
    ticks: 100,
    colors: ['#ff0a54', '#ffd23f', '#3bceac', '#0ead69', '#ee4266']
  });
  fire(0.2, {
    spread: 60,
    startVelocity: 50,
    decay: 0.8,
    scalar: 1.2,
    ticks: 100,
    colors: ['#ff0a54', '#ffd23f', '#3bceac', '#0ead69', '#ee4266']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.9,
    scalar: 0.8,
    ticks: 100,
    colors: ['#ff0a54', '#ffd23f', '#3bceac', '#0ead69', '#ee4266']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.9,
    scalar: 1.2,
    ticks: 100,
    colors: ['#ff0a54', '#ffd23f', '#3bceac', '#0ead69', '#ee4266']
  });
}

// Start floating hearts
function startFloatingHearts() {
  // Create initial hearts
  for (let i = 0; i < 20; i++) {
    createHeart(i * 100);
  }
  
  // Add new hearts periodically
  setInterval(() => {
    createHeart(0);
  }, 2000);
}

// Create a heart
function createHeart(delay) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;
  heart.style.animationDelay = `${delay}ms`;
  heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
  
  const colors = [
    'text-pink-400',
    'text-pink-500',
    'text-red-400',
    'text-red-500',
    'text-purple-400',
    'text-purple-500',
  ];
  
  // Convert Tailwind classes to actual colors
  const colorMap = {
    'text-pink-400': '#f472b6',
    'text-pink-500': '#ec4899',
    'text-red-400': '#f87171',
    'text-red-500': '#ef4444',
    'text-purple-400': '#c084fc',
    'text-purple-500': '#a855f7',
  };
  
  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  heart.style.color = colorMap[colorClass];
  
  floatingHearts.appendChild(heart);
  
  // Remove heart after animation completes
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Gallery functions
function openGallery() {
  photoGallery.classList.remove('hidden');
  setupGallery();
}

function closeGalleryHandler() {
  photoGallery.classList.add('hidden');
}

function setupGallery() {
  // Clear thumbnails
  galleryThumbnails.innerHTML = '';
  
  // Set first image
  galleryMainImage.src = galleryPhotos[0].src;
  galleryMainImage.alt = galleryPhotos[0].alt;
  galleryCaption.textContent = galleryPhotos[0].caption;
  
  // Create thumbnails
  galleryPhotos.forEach((photo, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.classList.add('gallery-thumbnail');
    if (index === 0) thumbnail.classList.add('active');
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    
    thumbnail.appendChild(img);
    thumbnail.addEventListener('click', () => {
      // Update active thumbnail
      const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnail.classList.add('active');
      
      // Update main image with animation
      galleryMainImage.style.opacity = '0';
      setTimeout(() => {
        galleryMainImage.src = photo.src;
        galleryMainImage.alt = photo.alt;
        galleryCaption.textContent = photo.caption;
        galleryMainImage.style.opacity = '1';
      }, 300);
    });
    
    galleryThumbnails.appendChild(thumbnail);
  });
  
  // Setup navigation
  const prevButton = photoGallery.querySelector('.gallery-prev');
  const nextButton = photoGallery.querySelector('.gallery-next');
  
  let currentGalleryIndex = 0;
  
  prevButton.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    updateGalleryImage(currentGalleryIndex);
  });
  
  nextButton.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryPhotos.length;
    updateGalleryImage(currentGalleryIndex);
  });
}

function updateGalleryImage(index) {
  // Update active thumbnail
  const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
  thumbnails.forEach((t, i) => {
    if (i === index) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  
  // Update main image with animation
  galleryMainImage.style.opacity = '0';
  setTimeout(() => {
    galleryMainImage.src = galleryPhotos[index].src;
    galleryMainImage.alt = galleryPhotos[index].alt;
    galleryCaption.textContent = galleryPhotos[index].caption;
    galleryMainImage.style.opacity = '1';
  }, 300);
}

// Background effects
function setupBackgroundEffects() {
  const canvas = backgroundCanvas;
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Create particles
  const particles = [];
  const particleCount = 150;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: getRandomColor(),
      alpha: Math.random() * 0.5 + 0.1,
      alphaSpeed: Math.random() * 0.01 + 0.005,
      shape: getRandomShape()
    });
  }
  
  function getRandomColor() {
    const colors = [
      '#ff77e9', // Pink
      '#a5b4fc', // Lavender
      '#7dd3fc', // Light blue
      '#fcd34d', // Yellow
      '#c4b5fd', // Purple
      '#f9a8d4', // Light pink
      '#93c5fd', // Sky blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function getRandomShape() {
    const shapes = ['circle', 'star', 'diamond'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }
  
  // Draw different shapes
  function drawShape(ctx, x, y, size, shape) {
    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'star':
        drawStar(ctx, x, y, 5, size, size/2);
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.fill();
        break;
    }
  }
  
  // Draw a star shape
  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Update alpha (twinkling effect)
      particle.alpha += particle.alphaSpeed;
      if (particle.alpha > 0.8 || particle.alpha < 0.1) {
        particle.alphaSpeed *= -1;
      }
      
      // Draw particle
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      drawShape(ctx, particle.x, particle.y, particle.size, particle.shape);
      ctx.globalAlpha = 1;
      
      // Reset if out of bounds
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.x = Math.random() * canvas.width;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.y = Math.random() * canvas.height;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Music functions
function startMusic() {
  try {
    backgroundMusic.volume = volumeControl.value;
    backgroundMusic.play()
      .then(() => {
        musicPlaying = true;
        updateMusicButton();
      })
      .catch(error => {
        console.log("Autoplay prevented:", error);
      });
  } catch (error) {
    console.log("Music error:", error);
  }
}

function toggleMusic() {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
  } else {
    backgroundMusic.play()
      .then(() => {
        musicPlaying = true;
      })
      .catch(error => {
        console.log("Play prevented:", error);
      });
  }
  updateMusicButton();
}

function updateMusicButton() {
  if (musicPlaying) {
    musicToggle.innerHTML = '<span class="music-icon">♪</span>';
  } else {
    musicToggle.innerHTML = '<span class="music-icon">♪̸</span>';
  }
}

function updateVolume() {
  backgroundMusic.volume = volumeControl.value;
}

// Initialize on load
window.addEventListener('load', init);
