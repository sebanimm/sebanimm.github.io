function onlyOneSidebar (sidebarInput) {

    const checkboxes = document.getElementsByName("sidebar_icons");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    })

    sidebarInput.checked = true;
}

function quitSidebar (quitBtn) {

    const checkboxes = document.getElementsByName("sidebar_icons");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    })

    quitBtn.checked = false;
}