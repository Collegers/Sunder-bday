let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentX = 0;
    this.currentY = 0;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.init();
  }

  disableScroll() {
    document.body.style.overflow = "hidden"; // 🔥 Disable scrolling
    document.body.style.touchAction = "none"; // 🔥 Prevent touch gestures
  }

  enableScroll() {
    document.body.style.overflow = ""; // 🔥 Re-enable scrolling
    document.body.style.touchAction = ""; // 🔥 Reset touch gestures
  }

  start(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    this.disableScroll(); // Prevent scrolling while dragging

    this.paper.style.zIndex = highestZ++;
    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Store offset from touch/mouse position to element's current position
    this.offsetX = clientX - this.currentX;
    this.offsetY = clientY - this.currentY;

    document.addEventListener("mousemove", this.moveHandler);
    document.addEventListener("touchmove", this.moveHandler, { passive: false });
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

    // Move the paper directly under the touch/mouse
    this.currentX = clientX - this.offsetX;
    this.currentY = clientY - this.offsetY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  };

  end() {
    this.holdingPaper = false;
    this.enableScroll(); // Re-enable scrolling

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
