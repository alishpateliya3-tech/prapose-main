// ==============================
// SCENE BASED NAVIGATION (NO SCROLL)
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  const scenes = document.querySelectorAll(".scene");
  const nextButtons = document.querySelectorAll(".next-btn");

  let isAnimating = false; // prevent double clicks

  // Disable scroll completely
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  // Function to show a scene
  function showScene(sceneNumber) {
    if (isAnimating) return;
    isAnimating = true;

    const currentScene = document.querySelector(".scene.active");
    const nextScene = document.querySelector(".scene-" + sceneNumber);

    if (!nextScene) {
      isAnimating = false;
      return;
    }

    // Animate out current scene
    if (currentScene) {
      currentScene.classList.remove("active");
      currentScene.style.opacity = "0";
    }

    // Small delay for smooth transition
    setTimeout(() => {
      scenes.forEach(scene => {
        scene.style.display = "none";
      });

      nextScene.style.display = "flex";
      nextScene.classList.add("active");
      nextScene.style.opacity = "1";

      // allow next click after animation
      setTimeout(() => {
        isAnimating = false;
      }, 800);

    }, 500);
  }

  // Button click handler
  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      const nextSceneNumber = button.getAttribute("data-next");
      if (nextSceneNumber) {
        showScene(nextSceneNumber);
      }
    });
  });

  // Optional: final buttons actions
  const yesBtn = document.querySelector(".yes-btn");
  const waitBtn = document.querySelector(".wait-btn");

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      alert("💗 That made me smile. Thank you.");
    });
  }

  if (waitBtn) {
    waitBtn.addEventListener("click", () => {
      alert("🌸 Take your time. I respect that.");
    });
  }

});
