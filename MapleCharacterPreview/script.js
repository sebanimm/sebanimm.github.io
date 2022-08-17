const characters = document.getElementsByName("character");

function highlightCharacter(highlighted) {
  characters.forEach((character) => {
    character.style.filter = "brightness(50%)";
  });

  highlighted.style.filter = "brightness(100%)";
}

function clearHighlight() {
  characters.forEach((character) => {
    character.style.filter = "brightness(100%)";
  });
}

characters.forEach((character) => {
  character.addEventListener("mouseleave", clearHighlight);
});
