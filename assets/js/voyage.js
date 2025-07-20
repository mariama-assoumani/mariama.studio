document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("#mainVideo");
  const marker = document.querySelector(".video-marker");
  const timeline = document.querySelector(".video-timeline");
  const cursor = document.querySelector(".cursor");
  const cursorText = document.querySelector(".cursor p ");

  let isPlaying = false;

  video.addEventListener("timeupdate", function () {
    const percentage = (video.currentTime / video.duration) * 100;
    const timelineWidth = timeline.offsetWidth;
    marker.style.left = (percentage / 100) * timelineWidth - 1 + "px";
  });

  timeline.addEventListener("click", function (e) {
    e.stopPropagation();
    const rect = timeline.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    video.currentTime = percentage * video.duration;
    marker.style.left = (percentage / 100) * timelineWidth - 1 + "px";
  });

  document.addEventListener("click", function (e) {
    if (!timeline.contains(e.target)) {
      if (isPlaying) {
        video.pause();
        cursorText.textContent = "Play";
      } else {
        video.play();
        cursorText.textContent = "Pause";
      }
      isPlaying = !isPlaying;
    }
  });

  // Bouton pour quitter
  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  const quitButton = document.querySelector(".quit button");

  quitButton.addEventListener("click", function (e) {
    e.stopPropagation();

    setTimeout(() => {
      window.location.href = "propos.html";
    }, 800);
  });

  // Disparition du vidéo-player
  const decorations = [cursor, document.querySelector(".quit"), timeline];

  let inactivityTimer;

  function showDecorations() {
    decorations.forEach((el) => el.classList.remove("hidden"));
  }

  function hideDecorations() {
    decorations.forEach((el) => el.classList.add("hidden"));
  }

  function resetInactivityTimer() {
    showDecorations();
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      hideDecorations();
    }, 2000); // durée avant disparition
  }

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    resetInactivityTimer();
  });

  resetInactivityTimer();
});
