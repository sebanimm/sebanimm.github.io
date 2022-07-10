function onlyOneInput (input) {

    const checkboxes = document.getElementsByName("symbol_check");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    })

    input.checked = true;
}

function numberMaxLength(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}
  