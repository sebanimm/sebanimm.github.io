const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const description = document.getElementById("description");
const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

function getRound(category) {
  const round = category.getAttribute("id");
  description.innerText = `64명의 후보 중 무작위 ${round}명이 대결합니다.`;
}

let usedImages = [];

function randomImage() {
  let randomNumber1 = Math.floor(Math.random() * 64) + 1;
  let randomNumber2 = Math.floor(Math.random() * 64) + 1;
  const leftImage = document.getElementById("left");
  const rightImage = document.getElementById("right");

  while (1) {
    if (randomNumber1 === randomNumber2) {
      randomNumber2 = Math.floor(Math.random() * 64) + 1;
    } else {
      break;
    }
  }

  leftImage.style.backgroundImage = `url(images/${randomNumber1}.png)`;
  rightImage.style.backgroundImage = `url(images/${randomNumber2}.png)`;
};

const startBtn = document.querySelector(".start");
const overlay = document.getElementById("overlay");

function modalFadeOut() {
  overlay.classList.add("fade-out");
}

startBtn.addEventListener("click", modalFadeOut, randomImage);