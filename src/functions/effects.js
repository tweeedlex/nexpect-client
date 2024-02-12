export const darknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".darkness-effect-block");
  effectBlock.style.display = "flex";
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    if (next) {
      next();
    }
  }, timeout);
};

export const releaseDarknessEffect = (next, timeout) => {
  const effectBlock = document.querySelector(".effect-block");
  effectBlock.style.display = "flex";
  effectBlock.classList.add("darkness");

  setTimeout(() => {
    if (next) {
      next();
    }

    effectBlock.style.opacity = 0;
    setTimeout(() => {
      effectBlock.style.display = "none";
    }, 500);
  }, timeout);
};
