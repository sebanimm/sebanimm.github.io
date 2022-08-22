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

let round = 64;

function getRound(category) {
  round = category.getAttribute("id");
  description.innerText = `64명의 후보 중 무작위 ${round}명이 대결합니다.`;
}

let chosenRound;

const imgInfo = [
  "윈드브레이커",
  "스우",
  "루시드",
  "데미안",
  "하얀 마법사",
  "윌",
  "진 힐라",
  "제논",
  "검은 마법사",
  "시그너스",
  "반 레온",
  "하딘",
  "아인",
  "라이언",
  "퀘이그",
  "에드",
  "샤렌 4세",
  "세렌",
  "칼라일",
  "제른 다르모어(애런)",
  "제로(알파)",
  "제로(베타)",
  "아델",
  "엔젤릭버스터",
  "아란",
  "아크메이지(불,독)",
  "아크메이지(썬,콜)",
  "아크",
  "배틀메이지",
  "비숍",
  "블래스터",
  "보우마스터",
  "카데나",
  "캐논슈터",
  "캡틴",
  "다크나이트",
  "데몬어벤져",
  "데몬슬레이어",
  "듀얼블레이드",
  "은월",
  "에반",
  "플레임위자드",
  "히어로",
  "호영",
  "일리움",
  "카인",
  "카이저",
  "키네시스",
  "라라",
  "루미너스",
  "신궁",
  "메카닉",
  "메르세데스",
  "미하일",
  "나이트로드",
  "나이트워커",
  "팔라딘",
  "패스파인더",
  "팬텀",
  "섀도어",
  "소울마스터",
  "스트라이커",
  "바이퍼",
  "와일드헌터",
];

const imgNum = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63,
];

const rightImg = document.querySelector("#right > .image");
const leftImg = document.querySelector("#left > .image");
const rightImgName = document.querySelector("#right > .name");
const leftImgName = document.querySelector("#left > .name");
const progress = document.querySelector(".title > h2 > p");

let currentRound;
let count = 0;
let currentProgress;

function checkProgress() {
  currentProgress = imgNum.length;

  if (currentProgress === 1) {
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 2) {
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 4) {
    currentRound = 4;
    count = 0;
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 8) {
    currentRound = 8;
    count = 0;
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 16) {
    currentRound = 16;
    count = 0;
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 32) {
    currentRound = 32;
    count = 0;
    i = 0;
    shuffle(imgNum);
  } else if (currentProgress === 64) {
    currentRound = 64;
    i = 0;
    shuffle(imgNum);
  }

  count += 1;
}

const winner = document.getElementById("winner");
const winnerImg = document.querySelector("#winner > div");
const winnerName = document.querySelector("#winner > p");

function showWinner() {
  versus.classList.add("hidden");
  rightImg.classList.add("hidden");
  leftImg.classList.add("hidden");
  rightImgName.classList.add("hidden");
  leftImgName.classList.add("hidden");
  winner.classList.remove("hidden");
  winnerImg.style.backgroundImage = `url(images/${imgNum[0]}.png)`;
  winnerName.classList.remove("hidden");
  winnerName.innerText = `승자 : ${imgInfo[imgNum[0]]}`;
}

function shuffle(imgInfo) {
  for (let index = imgInfo.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = imgInfo[index];
    imgInfo[index] = imgInfo[randomPosition];
    imgInfo[randomPosition] = temporary;
  }
}

shuffle(imgNum);
let i;

function showImages() {
  checkProgress();
  leftImgNumber = imgNum[i];
  rightImgNumber = imgNum[i + 1];

  leftImg.style.backgroundImage = `url(images/${leftImgNumber}.png)`;
  rightImg.style.backgroundImage = `url(images/${rightImgNumber}.png)`;
  leftImgName.innerText = `${imgInfo[leftImgNumber]}`;
  rightImgName.innerText = `${imgInfo[rightImgNumber]}`;

  if (currentProgress === 2) {
    progress.innerText = `결승전`;
  } else if (currentProgress === 1) {
    progress.innerText = `우승`;
    showWinner();
  } else {
    progress.innerText = `${currentRound}강중 ${count}/${currentRound / 2}`;
  }
}

let leftImgNumber;
let rightImgNumber;

function chooseLeft() {
  imgNum.splice(i + 1, 1);
  i++;
  showImages();
}

function chooseRight() {
  imgNum.splice(i, 1);
  i++;
  showImages();
}

const startBtn = document.querySelector(".start");
const overlay = document.getElementById("overlay");
const versus = document.querySelector("#versus");

function modalFadeOut() {
  overlay.classList.add("fade-out");
  startBtn.style.cursor = "default";
  versus.classList.remove("hidden");
  imgNum.splice(`${round}`, 63);
  showImages();
}

startBtn.addEventListener("click", modalFadeOut);
leftImg.addEventListener("click", chooseLeft);
rightImg.addEventListener("click", chooseRight);
