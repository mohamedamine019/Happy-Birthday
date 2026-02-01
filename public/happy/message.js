// DOM Elements
const messageCard = document.getElementById('messageCard');
const handwritingText = document.getElementById('handwritingText');
const backgroundCanvas = document.getElementById('backgroundCanvas');
const floatingHearts = document.getElementById('floatingHearts');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');

// State
let musicPlaying = true;

// Initialize
function init() {
  setupEventListeners();
  setupBackgroundEffects();
  startHandwritingEffect();
  startFloatingHearts();
  startMusic();
}

// Event Listeners
function setupEventListeners() {
  // Music controls
  musicToggle.addEventListener('click', toggleMusic);
  volumeControl.addEventListener('change', updateVolume);
}

// Handwriting effect
function startHandwritingEffect() {
  const text = "Wishing you a day filled with love, joy, and all the wonderful things you deserve. Happy Birthday! May this year bring you endless happiness and unforgettable memories. Cheers to you on your special day! Lest I forget, I love you as much as the effort you put into creating this site, and we will have a share in what is permissible.";
  let currentIndex = 0;
  
  function writeNextChar() {
    if (currentIndex < text.length) {
      handwritingText.textContent += text[currentIndex];
      currentIndex++;
      
      // Random delay for natural effect
      const randomDelay = Math.random() * 100 + 50;
      setTimeout(writeNextChar, randomDelay);
    } else {
      // Add blinking cursor at the end
      const cursor = document.createElement('span');
      cursor.classList.add('cursor');
      cursor.innerHTML = '|';
      handwritingText.appendChild(cursor);
      
      // Animate cursor
      let visible = true;
      setInterval(() => {
        visible = !visible;
        cursor.style.opacity = visible ? 1 : 0;
      }, 500);
    }
  }
  
  // Start after a delay
  setTimeout(writeNextChar, 2000);
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
  
  // Convert Tailwind classes to actual colors
  const colorMap = {
    'text-pink-400': '#f472b6',
    'text-pink-500': '#ec4899',
    'text-red-400': '#f87171',
    'text-red-500': '#ef4444',
    'text-purple-400': '#c084fc',
    'text-purple-500': '#a855f7',
  };
  
  const colors = Object.values(colorMap);
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  floatingHearts.appendChild(heart);
  
  // Remove heart after animation completes
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
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
        musicPlaying = false;
        updateMusicButton();
      });
  } catch (error) {
    console.log("Music error:", error);
    musicPlaying = false;
    updateMusicButton();
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
/* // Add this to your init function
function init() {
  // Existing code...
  
  // Check if we should open the wishlist from URL hash
  if (window.location.hash === '#wishlist') {
    // We're on message.html, so we need to redirect to index.html with the hash
    const wishlistLink = document.querySelector('.wishlist-link');
    if (wishlistLink) {
      wishlistLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html?openWishlist=true';
      });
    }
  }
}

// Add this to script.js to handle the URL parameter
window.addEventListener('load', function() {
  // Check URL parameters for wishlist
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('openWishlist') === 'true') {
    // Wait for everything to load first
    setTimeout(() => {
      // If we're on the celebrations page, open the wishlist
      if (!celebrations.classList.contains('hidden')) {
        openWishlist();
      } else {
        // Otherwise, we need to simulate the flow to get to celebrations
        if (!letterContainer.classList.contains('hidden')) {
          handleLetterClick();
        }
        // Skip countdown and slideshow
        countdownTimer.classList.add('hidden');
        imageSlideshow.classList.add('hidden');
        // Show celebrations and open wishlist
        celebrations.classList.remove('hidden');
        createBalloons();
        startConfetti();
        startFloatingHearts();
        setTimeout(openWishlist, 500);
      }
    }, 1000);
  }
}); */