
document.addEventListener("DOMContentLoaded", () => {
  const scenes = document.querySelectorAll(".scene");
  const nextButtons = document.querySelectorAll(".next-btn");
  const musicBtn = document.getElementById("musicBtn");
  const moveBtn = document.getElementById("moveBtn");
  const yesBtn = document.querySelector(".yes-btn");
  const modal = document.getElementById("snapModal");

  let isAnimating = false;
  let audio = new Audio("assets/music/bg-music.mp3"); // Ensure this file exists for logic to work
  let isPlaying = false;

  audio.loop = true;

  // Music Toggle
  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      musicBtn.innerText = "🎵";
    } else {
      audio.play().catch(e => console.log("Interaction needed first"));
      musicBtn.innerText = "🔇";
    }
    isPlaying = !isPlaying;
  });

  // Scene Navigation
  function showScene(sceneNumber) {
    if (isAnimating) return;
    isAnimating = true;

    const currentScene = document.querySelector(".scene.active");
    const nextScene = document.querySelector(".scene-" + sceneNumber);

    if (currentScene) {
      currentScene.classList.remove("active");
      currentScene.style.opacity = "0";
    }

    setTimeout(() => {
      // Hide all scenes
      scenes.forEach(s => s.style.display = "none");

      // Show next scene
      if (nextScene) {
        nextScene.style.display = "flex";
        setTimeout(() => {
          nextScene.classList.add("active");
          nextScene.style.opacity = "1";
        }, 50);
      }
      isAnimating = false;
    }, 600);
  }

  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-next");
      showScene(next);
      // Try auto-play music on first interaction
      if (!isPlaying) {
        audio.play().then(() => { isPlaying = true; musicBtn.innerText = "🔇"; }).catch(() => { });
      }
    });
  });

  // MOVING NO BUTTON
  moveBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - moveBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - moveBtn.offsetHeight - 50);
    moveBtn.style.position = "fixed";
    moveBtn.style.left = `${x}px`;
    moveBtn.style.top = `${y}px`;
  });

  // Mobile touch support for moving button
  moveBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent click
    const x = Math.random() * (window.innerWidth - moveBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - moveBtn.offsetHeight);
    moveBtn.style.position = "fixed";
    moveBtn.style.left = `${x}px`;
    moveBtn.style.top = `${y}px`;
  });

  // YES BUTTON -> SHOW MODAL
  yesBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("open");
    }, 10);
    confettiEffect();
  });

});

// Global function to close modal
window.closeModal = function () {
  const modal = document.getElementById("snapModal");
  modal.classList.remove("open");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

// Global function to copy text
window.copySnap = function () {
  const snapText = document.querySelector(".snap-id");
  const originalText = snapText.innerText;

  // Use clipboard API
  navigator.clipboard.writeText("SNAP_ID_HERE").then(() => {
    snapText.innerText = "Copied! ✅";
    setTimeout(() => {
      snapText.innerText = originalText;
    }, 2000);
  });
}

// Confetti Effect
function confettiEffect() {
  // Check if confetti library is loaded
  if (typeof confetti === 'undefined') {
    console.warn("Confetti library not loaded");
    return;
  }

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
