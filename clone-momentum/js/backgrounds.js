const images = [
  "0.png",
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
];

const chosenImg = images[Math.floor(Math.random() * images.length)];

const bg = document.createElement("img");

bg.src = `img/${chosenImg}`;

document.body.appendChild(bg);
