export const darknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".effect-block");
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    effectBlock.classList.remove("darkness");
    if (next) {
      next();
    }
  }, timeout);
};

export const releaseDarknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".effect-block");
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    effectBlock.style.opacity = 0;
    if (next) {
      next();
    }
  }, timeout);
};
