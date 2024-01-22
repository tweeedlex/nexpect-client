export const darknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".effect-block");
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    if (next) {
      next();
    }
    effectBlock.classList.remove("darkness");
    effectBlock.style.display = "none";
  }, timeout);
};

export const releaseDarknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".effect-block");
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    if (next) {
      next();
    }
    effectBlock.style.opacity = 0;
    effectBlock.style.display = "none";
  }, timeout);
};
