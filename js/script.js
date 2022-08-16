window.addEventListener("scroll", () => {
  let header = document.querySelector(".top-menu");
  header.classList.toggle("sticky", window.scrollY > 0);
});

let typed = new Typed(".auto-type", {
  strings: [
    "프로그래머",
    "웹 개발자",
    "프론트엔드 개발자",
    "소프트웨어 개발자",
  ],
  typeSpeed: 120,
  backSpeed: 120,
  loop: true,
});
