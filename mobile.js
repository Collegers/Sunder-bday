let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener(
      "touchmove",
      (e) => {
        if (!this.holdingPaper) return;
        e.preventDefault(); // Prevent default scrolling

        const touch = e.touches[0];

        this.velX = touch.clientX - this.prevTouchX;
        this.velY = touch.clientY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevTouchX = touch.clientX;
        this.prevTouchY = touch.clientY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      },
      { passive: false }
    );

    paper.addEventListener("touchstart", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;
    });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = document.querySelectorAll(".paper");
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
