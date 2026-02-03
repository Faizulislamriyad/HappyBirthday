// Create background stars
function createStars() {
  const starsContainer = document.getElementById("stars");
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.width = Math.random() * 3 + 1 + "px";
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.opacity = Math.random() * 0.5 + 0.3;
    starsContainer.appendChild(star);
  }
}

// Create floating background balloons - FIXED to appear on sides
function createFloatingBalloons() {
  const balloonsContainer = document.getElementById("floatingBalloons");
  const colors = ["#ff5e7d", "#4cd964", "#5ac8fa", "#ffde59", "#af52de"];
  const balloonCount = 5;

  // Clear existing balloons
  balloonsContainer.innerHTML = '';

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("floating-balloon");
    
    // Random properties
    const size = Math.random() * 30 + 40;
    const colorIndex = Math.floor(Math.random() * colors.length);
    
    // Position balloons only on the sides (not in center)
    let left, top;
    
    // Determine side: left or right
    const isLeftSide = Math.random() > 0.5;
    
    if (isLeftSide) {
      // Left side (0-30% width)
      left = Math.random() * 30;
    } else {
      // Right side (70-100% width)
      left = Math.random() * 30 + 70;
    }
    
    // Top position (avoid center area)
    top = Math.random() * 80 + 10;
    
    balloon.style.width = size + "px";
    balloon.style.height = size * 1.2 + "px";
    balloon.style.backgroundColor = colors[colorIndex];
    balloon.style.background = `radial-gradient(circle at 30% 30%, ${colors[colorIndex]}, ${darkenColor(colors[colorIndex], 20)})`;
    balloon.style.left = left + "vw";
    balloon.style.top = top + "vh";
    balloon.style.animationDelay = Math.random() * 15 + "s";
    balloon.style.animationDuration = Math.random() * 10 + 20 + "s";
    balloon.style.zIndex = "100";

    // Add pop sound on click
    balloon.addEventListener("click", function (e) {
      e.stopPropagation();
      popBalloon(this);
    });

    // Add hover effect
    balloon.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.1)";
    });
    
    balloon.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });

    balloonsContainer.appendChild(balloon);
  }
}

// Helper function to darken color
function darkenColor(color, percent) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  
  r = Math.floor(r * (100 - percent) / 100);
  g = Math.floor(g * (100 - percent) / 100);
  b = Math.floor(b * (100 - percent) / 100);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Pop balloon function - FIXED
function popBalloon(balloon) {
  const popSound = document.getElementById("popSound");
  
  // Play pop sound
  try {
    popSound.currentTime = 0;
    popSound.volume = 0.7;
    popSound.play().catch(e => console.log("Audio play failed:", e));
  } catch (e) {
    console.log("Sound error:", e);
  }

  // Add popped class
  balloon.classList.add("balloon-popped");
  
  // Create small confetti when balloon pops
  createConfetti(15);

  // Create pop effect particles
  createPopParticles(balloon);

  // Remove balloon after animation
  setTimeout(() => {
    if (balloon.parentNode) {
      balloon.remove();
      // Add a new balloon after some time
      setTimeout(() => {
        if (document.querySelectorAll('.floating-balloon').length < 15) {
          createFloatingBalloons();
        }
      }, 2000);
    }
  }, 500);
}

// Create pop particles effect
function createPopParticles(balloon) {
  const rect = balloon.getBoundingClientRect();
  const colors = ["#ff5e7d", "#4cd964", "#5ac8fa", "#ffde59", "#af52de"];
  const balloonColor = balloon.style.backgroundColor || "#ff5e7d";
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor = balloonColor;
    particle.style.left = (rect.left + rect.width / 2) + "px";
    particle.style.top = (rect.top + rect.height / 2) + "px";
    particle.style.zIndex = "99";
    
    document.body.appendChild(particle);
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 30;
    
    particle.animate([
      { 
        transform: `translate(0, 0) scale(1)`, 
        opacity: 1 
      },
      { 
        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 800,
      easing: "cubic-bezier(0.215, 0.610, 0.355, 1)"
    }).onfinish = () => particle.remove();
  }
}

// Create confetti effect
function createConfetti(count = 200) {
  const colors = ["#ff5e7d", "#4cd964", "#5ac8fa", "#ffde59", "#af52de"];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 10 + "px";
    confetti.style.height = Math.random() * 10 + 10 + "px";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    document.body.appendChild(confetti);

    // Animation
    const animation = confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 3000 + 3000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
      },
    );

    // Remove confetti after animation
    animation.onfinish = () => confetti.remove();
  }
}

// DOM Elements
const lightCandleBtn = document.getElementById("lightCandleBtn");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const candleFlame = document.getElementById("candleFlame");
const cutAnimation = document.getElementById("cutAnimation");
const cake = document.getElementById("cake");

const playPauseBtn = document.getElementById("playPauseBtn");
const volumeSlider = document.getElementById("volumeSlider");
const birthdayMusic = document.getElementById("birthdayMusic");
const candleSound = document.getElementById("candleSound");
const cuttingSound = document.getElementById("cuttingSound");

// Music control
let isPlaying = false;

// Set initial volume
birthdayMusic.volume = volumeSlider.value / 100;

playPauseBtn.addEventListener("click", function () {
  if (isPlaying) {
    birthdayMusic.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    birthdayMusic.play().catch((e) => {
      console.log("Autoplay prevented. User interaction required.");
      // Show a message to user to interact
      alert("Click the play button to start the birthday music!");
    });
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", function () {
  birthdayMusic.volume = this.value / 100;
});

// Candle lighting
lightCandleBtn.addEventListener("click", function () {
  // Light the candle
  candleFlame.classList.add("lit");

  // Play candle lighting sound
  candleSound.currentTime = 0;
  candleSound.volume = 0.6;
  candleSound.play();

  // Create some confetti
  createConfetti(100);

  // Change button text and hide it after delay
  lightCandleBtn.innerHTML = '<i class="fas fa-fire"></i> Candle Lit!';
  lightCandleBtn.disabled = true;
  lightCandleBtn.style.background = "linear-gradient(90deg, #2ecc71, #27ae60)";

  // Hide the button after 1 second
  setTimeout(() => {
    lightCandleBtn.style.opacity = "0";
    lightCandleBtn.style.transform = "translateY(10px)";

    setTimeout(() => {
      lightCandleBtn.style.display = "none";

      // Show the cut cake button
      cutCakeBtn.style.display = "flex";

      // Animate the button appearance
      setTimeout(() => {
        cutCakeBtn.style.opacity = "1";
        cutCakeBtn.style.transform = "translateY(0)";
      }, 10);
    }, 300);
  }, 1000);
});

// Cake cutting - FIXED (Candle won't move)
cutCakeBtn.addEventListener("click", function () {
  // Play cutting sound
  cuttingSound.currentTime = 0;
  cuttingSound.volume = 0.8;
  cuttingSound.play();

  // Show cutting animation
  cutAnimation.classList.add("cake-cut");

  // Split the cake into two parts - FIXED (candle stays in place)
  setTimeout(() => {
    cake.classList.add("cake-split");
    
    // The candle should NOT move with the cake layers
    // Candle remains centered while cake layers split
  }, 500);

  // Create lots of confetti
  createConfetti(300);

  // Change button text and hide it after delay
  cutCakeBtn.innerHTML = '<i class="fas fa-check"></i> Cake Cut!';
  cutCakeBtn.disabled = true;
  cutCakeBtn.style.background = "linear-gradient(90deg, #2ecc71, #27ae60)";

  // Hide the button after 1 second
  setTimeout(() => {
    cutCakeBtn.style.opacity = "0";
    cutCakeBtn.style.transform = "translateY(10px)";

    setTimeout(() => {
      cutCakeBtn.style.display = "none";
    }, 300);
  }, 1000);

  // Show a birthday message after cutting
  setTimeout(() => {
    alert(
      "🎂 The cake has been cut into two pieces! Time to enjoy and celebrate! 🎉",
    );
  }, 1500);
});

// Make header balloons clickable
document.querySelectorAll('.balloons .balloon').forEach(balloon => {
  balloon.addEventListener('click', function() {
    this.classList.add('pop');
    createConfetti(20);
    
    // Play pop sound
    const popSound = document.getElementById("popSound");
    popSound.currentTime = 0;
    popSound.volume = 0.5;
    popSound.play();
    
    // Remove balloon after animation
    setTimeout(() => {
      this.style.visibility = 'hidden';
    }, 500);
  });
});

// Initialize
window.addEventListener("load", function () {
  createStars();
  
  // Create floating balloons with delay
  setTimeout(() => {
    createFloatingBalloons();
  }, 1000);

  // Try to autoplay music after a short delay
  setTimeout(() => {
    birthdayMusic
      .play()
      .then(() => {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      })
      .catch((e) => {
        console.log("Autoplay prevented.");
      });
  }, 1500);

  // Create some initial confetti
  setTimeout(() => {
    createConfetti(50);
  }, 2500);

  // Add a birthday message in the console
  console.log(
    "%c🎂 Happy Birthday Shareqa Shaomi! 🎂",
    "color: #ffde59; font-size: 24px; font-weight: bold;",
  );
  console.log(
    "%cWishing you a day filled with joy, laughter, and wonderful surprises!",
    "color: #ff5e7d; font-size: 16px;",
  );
});

// Ensure balloons work even if user clicks dynamically
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('floating-balloon')) {
    e.preventDefault();
    e.stopPropagation();
    popBalloon(e.target);
  }
});

