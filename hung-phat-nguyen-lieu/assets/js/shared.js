(function () {
  function syncVh() {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  }

  syncVh();
  window.addEventListener("resize", syncVh, { passive: true });
})();
