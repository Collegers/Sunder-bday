let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    // Mouse Move & Touch Move
    const moveHandler = (e) => {
      let clientX, clientY;
      
      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (!this.holdingPaper) return;

      this.velX = clientX - this.prevX;
      this.velY = clientY - this.prevY;

      if (!this.rotating) {
        this.currentX += this.velX;
        this.currentY += this.velY;
      }

      this.prevX = clientX;
      this.prevY = clientY;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    };

    // Mouse Down & Touch Start
    const startHandler = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ++;
      
      let clientX, clientY;

      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.startX = clientX;
      this.startY = clientY;
      this.prevX = clientX;
      this.prevY = clientY;
    };

    // Mouse Up & Touch End
    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Add event listeners for both touch & mouse
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler, { passive: false });

    paper.addEventListener("mousedown", startHandler);
    paper.addEventListener("touchstart", startHandler, { passive: false });

    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchend", endHandler);
  }
}

// Initialize all .paper elements
document.querySelectorAll(".paper").forEach((paper) => {
  new Paper().init(paper);
});
