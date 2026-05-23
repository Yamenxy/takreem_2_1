document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sparkle-canvas");
  const ctx = canvas.getContext("2d");
  let sparkles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const mouse = {
    x: undefined,
    y: undefined,
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    for (let i = 0; i < 2; i++) {
      sparkles.push(new Sparkle(mouse.x, mouse.y));
    }
  });

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsl(${Math.random() * 50 + 190}, 100%, 80%)`;
      this.life = 100;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
      this.life--;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function handleSparkles() {
    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
      if (sparkles[i].life < 1) {
        sparkles.splice(i, 1);
        i--;
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleSparkles();
    requestAnimationFrame(animate);
  }

  animate();

  // --- Staggered Animations ---
  const heroElements = [
    document.querySelector(".hero__badge"),
    document.querySelector(".hero h1"),
    document.querySelector(".hero__lead"),
    document.querySelector(".hero__supervisor"),
  ];

  const nameCards = document.querySelectorAll(".name-card");
  const messageCard = document.querySelector(".message__card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  heroElements.forEach((el) => {
    if (el) observer.observe(el);
  });

  nameCards.forEach((card) => {
    observer.observe(card);
  });

  if (messageCard) {
    observer.observe(messageCard);
  }
});
