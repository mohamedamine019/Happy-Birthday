import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-0NMkyI8UJrIAWSOO5jEHL4pTkWJEKhI",
  authDomain: "happy-birthday-31260.firebaseapp.com",
  projectId: "happy-birthday-31260",
  storageBucket: "happy-birthday-31260.appspot.com",
  messagingSenderId: "995717808962",
  appId: "1:995717808962:web:6d8d6e1d298b775573bedb",
  measurementId: "G-MK9QCC1SW9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const backgroundCanvas = document.getElementById('backgroundCanvas');
const floatingHearts = document.getElementById('floatingHearts');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');
const wishesGrid = document.getElementById('wishesGrid');
const noWishesMessage = document.getElementById('noWishesMessage');

// State
let musicPlaying = false;
// Initialize
function init() {
  setupEventListeners();
  setupBackgroundEffects();
  startFloatingHearts();
  loadWishes();
}

// Event Listeners
function setupEventListeners() {
  // Music controls
  musicToggle.addEventListener('click', toggleMusic);
  volumeControl.addEventListener('change', updateVolume);
}

// Load wishes from Firestore
function loadWishes() {
  const wishesQuery = query(
    collection(db, "wishes"),
    orderBy("timestamp", "desc")
  );

  onSnapshot(wishesQuery, (snapshot) => {
    const wishes = [];
    snapshot.forEach((doc) => {
      wishes.push({ id: doc.id, ...doc.data() });
    });

    renderWishes(wishes);
  });
}

// Render wishes to the DOM
function renderWishes(wishes) {
  wishesGrid.innerHTML = '';

  if (wishes.length === 0) {
    noWishesMessage.style.display = 'block';
    return;
  }

  noWishesMessage.style.display = 'none';

  wishes.forEach((wish) => {
    const wishCard = createWishCard(wish);
    wishesGrid.appendChild(wishCard);
  });
}

// Create wish card element
function createWishCard(wish) {
  const card = document.createElement('div');
  card.classList.add('wish-card');
  card.style.backgroundColor = wish.bgColor || '#ec4899';

  card.innerHTML = `
    <div class="wish-card-header">
      <div class="wish-card-name">${escapeHTML(wish.name)}</div>
      <div class="wish-card-relationship">${escapeHTML(wish.relationship)}</div>
    </div>
    <div class="wish-card-body">
      <img src="./images/rose.webp" alt="Beautiful Rose" class="wish-card-rose">
      ${escapeHTML(wish.message).replace(/\n/g, '<br>')}
    </div>
    <div class="wish-card-date">
      ${wish.timestamp?.toDate ? wish.timestamp.toDate().toLocaleString() : ''}
    </div>
  `;

  return card;
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start floating hearts animation
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

// Create a single heart element
function createHeart(delay) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;
  heart.style.animationDelay = `${delay}ms`;
  heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
  
  const colors = ['#f472b6', '#ec4899', '#f87171', '#ef4444', '#c084fc', '#a855f7'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  floatingHearts.appendChild(heart);
  
  // Remove heart after animation completes
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Background particle effects
function setupBackgroundEffects() {
  const canvas = backgroundCanvas;
  const ctx = canvas.getContext('2d');
  
  function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
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
    const colors = ['#ff77e9', '#a5b4fc', '#7dd3fc', '#fcd34d', '#c4b5fd', '#f9a8d4', '#93c5fd'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function getRandomShape() {
    const shapes = ['circle', 'star', 'diamond'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }
  
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
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      particle.alpha += particle.alphaSpeed;
      if (particle.alpha > 0.8 || particle.alpha < 0.1) {
        particle.alphaSpeed *= -1;
      }
      
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      drawShape(ctx, particle.x, particle.y, particle.size, particle.shape);
      ctx.globalAlpha = 1;
      
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

// Music control functions
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