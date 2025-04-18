// DOM Elements
const backgroundCanvas = document.getElementById('backgroundCanvas');
const floatingHearts = document.getElementById('floatingHearts');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');
const wishForm = document.getElementById('wishForm');
const colorOptions = document.querySelectorAll('.color-option');
const bgColorInput = document.getElementById('bgColor');
const successMessage = document.getElementById('successMessage');
const writeAnotherBtn = document.getElementById('writeAnotherBtn');

// State
let musicPlaying = false;

// Initialize
function init() {
  setupEventListeners();
  setupBackgroundEffects();
  startFloatingHearts();
}

// Event Listeners
function setupEventListeners() {
  // Music controls
  musicToggle.addEventListener('click', toggleMusic);
  volumeControl.addEventListener('change', updateVolume);
  
  // Color options
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selected class from all options
      colorOptions.forEach(opt => opt.classList.remove('selected'));
      // Add selected class to clicked option
      option.classList.add('selected');
      // Update hidden input value
      bgColorInput.value = option.dataset.color;
    });
  });
  
  // Select first color option by default
  colorOptions[0].classList.add('selected');
  
  // Form submission
  wishForm.addEventListener('submit', handleFormSubmit);
  
  // Write another button
  writeAnotherBtn.addEventListener('click', () => {
    successMessage.classList.add('hidden');
    wishForm.reset();
    colorOptions[0].classList.add('selected');
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const relationship = document.getElementById('relationship').value;
  const message = document.getElementById('message').value;
  const bgColor = bgColorInput.value;
  
  // Create wish object
  const wish = {
    id: Date.now(),
    name,
    relationship,
    message,
    bgColor,
    date: new Date().toISOString()
  };
  
  // Save wish to localStorage
  saveWish(wish);
  
  // Show success message
  successMessage.classList.remove('hidden');
  
  // Play success sound
  playSuccessSound();
}

// Save wish to localStorage
function saveWish(wish) {
  // Get existing wishes
  let wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
  
  // Add new wish
  wishes.push(wish);
  
  // Save back to localStorage
  localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
}

// Play success sound
function playSuccessSound() {
  const successSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLHPM+N2TQwghWLD8/bpfFQgzdPv/0X0kBh1T5//jlEAHFDvH/PbBZw8MK2L3//OqVQwQQOL//8h5GwgkYPf//75yFQohY/j//7xuFAwlZfn//8BxFQolYvb//8J2GQkiXfX//8Z7HAghWvP//8qAHggeV/L//86EIQgdVfH//9GHIwgcU/D//9WMJQgaUe///9iPJwgZT+7//9yUKQgYTe3//+CYKwgXS+z//+OcLQgVSez//+egLwgVR+v//+qkMQgTRur//+2oMwgTROj//++rNQgSQ+j///KvNwgRQef///WzOQgRQOb///e2OwgPP+X///m6PQgPPuX///y+PwgOPeT///7CQQgNPOP////FQwgMO+P////IRQgLOuL////LSQgLOeH////OSwgKOOH////RzQgJN+D////U0AgINt/////X0ggINd/////Z1AgHNN7////d1wgHM97////g2QgGMt3////j3AgFMdz////m3ggFMNz////p4AgEL9v////s4ggELtv////v5QgDLdr////y5wgCLNn////16QgCK9j////47AgCKtf////vuAoCKdb////zvQoCJ9X////2wAoCJtX////5wwoCJdT////8yQoCJNP////1zAoCItL////30goCIdH////51woCH9D////74QoCHs/////3xwoCHc7////6zgoCG87////94AoCGs3////+5QoCGcz/////+wAoCGM0//////QoCF8z//////woCFsz//////AoCFcy//////QoCFMy//////goCE8y//////woCEsz//////AoCEcz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woCEMz//////AoCEMz//////QoCEMz//////goCEMz//////woC');
  successSound.play();
}

// Start floating hearts
function startFloatingHearts() {
  // Create initial hearts
  for (let i = 0; i < 10; i++) {
    createHeart(i * 200);
  }
  
  // Add new hearts periodically
  setInterval(() => {
    createHeart(0);
  }, 3000);
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