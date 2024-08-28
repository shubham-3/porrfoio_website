const buttonsWrapper = document.querySelector(".map");
const slides = document.querySelector(".inner");

buttonsWrapper.addEventListener("click", e => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach(item =>
      item.classList.remove("active")
    );
    if (e.target.classList.contains("first")) {
      slides.style.transform = "translateX(-0%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains("second")) {
      slides.style.transform = "translateX(-33.333333%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains('third')){
      slides.style.transform = "translateX(-66.666666%)";
      e.target.classList.add('active');
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");
  const navCara = document.querySelector(".nav_cara");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;

  const updateNavPosition = () => {
      const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.offsetWidth);
      const navCaraScroll = scrollPercentage * (wrapper.offsetWidth - navCara.offsetWidth);
      navCara.style.transform = `translateX(${navCaraScroll}px)`;
  };

  const dragStart = (e) => { 
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
      if (!isDragging) return;    
      const newScrollLeft = startScrollLeft - (e.pageX - startX);    
      if (newScrollLeft <= 0 || newScrollLeft >= 
          carousel.scrollWidth - carousel.offsetWidth) {
          isDragging = false;
          return;
      }
      carousel.scrollLeft = newScrollLeft;
      updateNavPosition(); // Update nav position while dragging
  };

  const dragStop = () => {
      isDragging = false; 
      carousel.classList.remove("dragging");
  };

  const autoPlay = () => {    
      if (window.innerWidth < 800) return; 
      
      const totalCardWidth = carousel.scrollWidth;
      
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
      
      if (carousel.scrollLeft >= maxScrollLeft) return;
      
      timeoutId = setTimeout(() => {
          carousel.scrollLeft += firstCardWidth;
          updateNavPosition(); // Update nav position on autoplay
      }, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => 
      clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? 
              -firstCardWidth : firstCardWidth;
          updateNavPosition();
      });
  });

  updateNavPosition(); 
});
