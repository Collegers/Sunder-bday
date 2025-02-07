let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentX = 0;
    this.currentY = 0;
    this.startX = 0;
    this.startY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.moving = false;
    this.animationFrame = null;
    
    this.init();
  }

  move() {
    if (!this.moving) return;
    
    this.currentX += this.velX;
    this.currentY += this.velY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    this.animationFrame = requestAnimationFrame(() => this.move());
  }

  start(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.moving = true;
    this.paper.style.zIndex = highestZ++;
    
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

    this.velX = 0;
    this.velY = 0;

    document.addEventListener("mousemove", this.moveHandler);
    document.addEventListener("touchmove", this.moveHandler, { passive: false });
    
    this.animationFrame = requestAnimationFrame(() => this.move());
  }

  moveHandler = (e) => {
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    this.velX = (clientX - this.startX) * 0.4; // Reduce movement speed slightly
    this.velY = (clientY - this.startY) * 0.4;

    this.startX = clientX;
    this.startY = clientY;
  };

  end() {
    this.holdingPaper = false;
    this.moving = false;
    cancelAnimationFrame(this.animationFrame);

    document.removeEventListener("mousemove", this.moveHandler);
    document.removeEventListener("touchmove", this.moveHandler);
  }

  init() {
    this.paper.addEventListener("mousedown", (e) => this.start(e));
    this.paper.addEventListener("touchstart", (e) => this.start(e), { passive: false });

    window.addEventListener("mouseup", () => this.end());
    window.addEventListener("touchend", () => this.end());
  }
}

// Initialize all .paper elements
document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));
