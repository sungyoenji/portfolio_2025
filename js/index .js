// header blur
$(document).ready(function () {
  const header = $("#header")[0];
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(header).addClass("blurred");
    } else {
      $(header).removeClass("blurred");
    }
  });
});

// 배경 blur 애니메이션
const blurs = document.querySelectorAll('.blur');
const floats = [];

blurs.forEach((el, i) => {
  const size = parseFloat(getComputedStyle(el).getPropertyValue('--size')) || 300;
  const x = parseFloat(getComputedStyle(el).getPropertyValue('--left')) || 0;
  const y = parseFloat(getComputedStyle(el).getPropertyValue('--top')) || 0;

  floats.push({
    el,
    baseX: x,
    baseY: y,
    speed: 0.0001 + Math.random() * 0.001,
    radius: 130 + Math.random() * 100,
  });
});

let lastTimestamp = null;
let totalElapsed = 0;

function animate(currentTime) {
  if (!lastTimestamp) lastTimestamp = currentTime;
  const delta = currentTime - lastTimestamp;
  lastTimestamp = currentTime;
  totalElapsed += delta;

  floats.forEach((float, i) => {
    const x = float.baseX + Math.cos(totalElapsed * float.speed + i) * float.radius;
    const y = float.baseY + Math.sin(totalElapsed * float.speed + i) * float.radius;
    const rotate = Math.sin(totalElapsed * 0.0005 + i) * 15;

    float.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// AOS init
AOS.init({
  duration: 1200,
});

// IntersectionObserver로 fade 효과
document.addEventListener("DOMContentLoaded", function () {
  const fadeUpElements = document.querySelectorAll('.fade-left, .fade-up, .fade-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.6 });

  fadeUpElements.forEach(element => {
    observer.observe(element);
  });
});

// 텍스트 애니메이션
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".slide-up, .slide-down").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0.3, y: el.classList.contains("slide-up") ? 50 : -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none reset",
          once: true,
          markers: false,
        },
      });
  });
});

// 디자인 작업 메뉴
window.setActive = function(target) {
  document.querySelectorAll('.menu li a').forEach(el => el.classList.remove('on'));
  target.classList.add('on');

  const category = target.parentElement.id;
  const items = document.querySelectorAll('.desing_wrap_inner .list_item');

  items.forEach(item => {
    if (category === 'All') {
      item.style.display = 'block';
    } else {
      item.style.display = item.classList.contains(category) ? 'block' : 'none';
    }
  });
};


// GLightbox init
const lightbox = GLightbox({
  selector: '.glightbox'
});
