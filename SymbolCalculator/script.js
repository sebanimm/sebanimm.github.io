const openModalButtons = document.querySelector(".result-icon");
const closeModalButtons = document.querySelector("#close");
const overlay = document.getElementById("overlay");
const modal = document.querySelector(".modal");

const mesoError = document.getElementById("error-1");
const symbolLvError = document.getElementById("error-2");
const symbolNumError = document.getElementById("error-3");

function openModal() {
    if (modal == null) {
        return;
    }
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal() {
    if (modal == null) {
        return;
    }
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

// 심볼 체크 한개만 되도록 하는 함수
function onlyOneInput(input) {
    const checkboxes = document.getElementsByName("symbol-check");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    input.checked = true;
}

// input 글자 수 제한하는 함수
function numberMaxLength(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

let symType = 0;

// 심볼마다 있는 값을 받는 함수 (1 ~ 8)
function getValue(checkbox) {
    if (checkbox.checked) {
        symType = parseInt(checkbox.value);
    }

    if (symType === 0) {
        alert("심볼을 선택해주세요.");
    }
}

// 심볼 계산하는 함수
function symbolCalculate() {
    let errorCheck = 0;

    symbolLvError.innerText = ``;
    symbolNumError.innerText = ``;
    mesoError.innerText = ``;
    // userSymLv : 유저가 가진(입력한) 심볼의 레벨
    let userSymLv = document.getElementById("level-input").value;
    // userMeso100M : 유저가 가진(입력한) 메소 (단위 : 억)
    let userMeso100M = document.getElementById("meso-input-100M").value;
    // userMeso10K : 유저가 가진(입력한) 메소 (단위 : 만)
    let userMeso10K = document.getElementById("meso-input-10K").value;
    // userSymNumber : 유저가 가진(입력한) 심볼의 갯수
    let userSymNumber = document.getElementById("number-input").value;

    // defaultMeso : 심볼 레벨업때 필요한 메소 (기본)
    // needMeso : 만렙까지 드는 메소
    // needMeso100M : 만렙까지 드는 메소 (단위 : 억)
    // needMeso10K : 만렙까지 드는 메소 (단위 : 만)
    // lvUpMeso : 심볼 레벨업 할 때 마다 늘어나는 메소
    // maxLvMeso : 심볼 1렙에서 만렙까지 드는 총 메소 (고정값)
    // needMesoTotal : 유저의 심볼 레벨에서 만렙까지 드는 메소의 총합 (억 + 만)
    // userMesoTotal : 유저가 가진(입력한) 메소의 총합 (억 + 만)
    // resultMeso100M : 최종적으로 더 필요한 메소 (단위 : 억) -> (필요 메소) - (유저의 메소)
    // resultMeso10K : 최종적으로 더 필요한 메소 (단위 : 만)
    // resultMesoTotal : 최종적으로 더 필요한 메소의 총합 (억 + 만)
    // overMeso100M : 유저가 가진(입력한) 메소가 필요한 메소보다 더 많을때의 초과 메소 (단위 : 억)
    // overMeso10K : 유저가 가진(입력한) 메소가 필요한 메소보다 더 많을때의 초과 메소 (단위 : 만)
    // overMesoTotal : 유저가 가진(입력한) 메소가 필요한 메소보다 더 많을때의 초과 메소의 총합 (억 + 만)

    let needMeso = 0;
    let needMeso100M = 0;
    let needMeso10K = 0;

    // 소멸의 여로 심볼 업그레이드 비용
    function firstArcSymNeedMeso() {
        const defaultMeso = 3_110_000;
        const lvUpMeso = 3_960_000 + defaultMeso;
        const maxLvMeso = 811_490_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    // 츄츄 아일랜드 심볼 업그레이드 비용
    function secondArcSymNeedMeso() {
        const defaultMeso = 6_220_000;
        const lvUpMeso = 4_620_000 + defaultMeso;
        const maxLvMeso = 995_980_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    // 레헬른 심볼 업그레이드 비용
    function thirdArcSymNeedMeso() {
        const defaultMeso = 9_330_000;
        const lvUpMeso = 5_280_000 + defaultMeso;
        const maxLvMeso = 1_180_470_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    // 아르카나 ~ 에스페라 심볼 업그레이드 비용
    function otherArcSymsNeedMeso() {
        const defaultMeso = 11_196_000;
        const maxLvMeso = 1_341_324_000 + defaultMeso;
        const lvUpMeso = 59_40_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    // 세르니움 심볼 업그레이드 비용
    function firstAutSymNeedMeso() {
        const defaultMeso = 96_900_000;
        const maxLvMeso = 5_836_500_000 + defaultMeso;
        const lvUpMeso = 88_500_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    // 호텔 아르크스 심볼 업그레이드 비용
    function secondAutSymNeedMeso() {
        const defaultMeso = 106_600_000;
        const maxLvMeso = 6_417_500_000 + defaultMeso;
        const lvUpMeso = 97_300_000;

        for (let i = 1; i < userSymLv; i++) {
            needMeso += lvUpMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100_000_000);
        needMeso10K = Math.floor(needMeso / 10000 - needMeso100M * 10000);

        if (needMeso10K < 0) {
            needMeso10K += 10000;
            needMeso100M -= 1;
        }

        const needMesoTotal = needMeso100M * 10000 + needMeso10K;
        let resultMeso100M = needMeso100M - userMeso100M;
        let resultMeso10K = needMeso10K - userMeso10K;

        if (resultMeso10K < 0) {
            resultMeso10K += 10000;
            resultMeso100M -= 1;
        }

        const userMesoTotal =
            parseInt(userMeso100M * 10000) + parseInt(userMeso10K);
        const resultMesoTotal = resultMeso100M * 10000 + resultMeso10K;
        const overMesoTotal = needMesoTotal - userMesoTotal;
        let overMeso100M = Math.ceil(overMesoTotal / 10000);

        const overMeso10K = overMeso100M * 10000 - overMesoTotal;
        if (overMeso100M < 0) {
            overMeso100M = -overMeso100M;
        }

        const result = document.getElementById("result-meso");

        if (userMesoTotal < 0 || userMeso10K < 0) {
            errorCheck += 1;
            mesoError.innerText = `메소는 음수가 될 수 없담!`;
            openModal();
        } else {
            if (resultMesoTotal > 0) {
                if (resultMeso100M > 0) {
                    result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
                } else {
                    result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
                }
            } else if (resultMesoTotal === 0) {
                result.innerText = `메소는 딱 남아 떨어진담!`;
            } else {
                if (overMeso100M === 0) {
                    result.innerText = `메소는 충분히 많담! ${overMeso10K}만 메소나 남는담!`;
                } else {
                    result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
                }
            }
        }
    }

    let needSymNumber = 0;

    // 아케인 심볼 업그레이드 필요 갯수
    function arcSymNeedNumber() {
        const maxSymNumber = 2679;

        for (let i = 1; i < userSymLv; i++) {
            needSymNumber = needSymNumber + (i ** 2 + 11);
        }

        const overSymNumber = userSymNumber - (maxSymNumber - needSymNumber);

        needSymNumber = maxSymNumber - needSymNumber - userSymNumber;

        const numberResult = document.getElementById("result-number");

        if (userSymLv <= 0 || userSymLv >= 20) {
            errorCheck += 1;
            if (userSymLv <= 0) {
                symbolLvError.innerText = `심볼의 레벨은 음수나 0이 될 수 없담!`;
                openModal();
            } else {
                symbolLvError.innerText = `아케인 심볼은 20레벨이 최대 레벨이담!`;
                openModal();
            }
        } else if (needSymNumber > 0) {
            numberResult.innerText = `더 필요한 심볼의 갯수는 ${needSymNumber}개담!`;
        } else if (needSymNumber === 0) {
            numberResult.innerText = `심볼은 최대치담!`;
        } else {
            numberResult.innerText = `심볼이 ${overSymNumber}개나 남는담! 값을 너무 많이 넣은 것 같담..`;
        }

        if (userSymNumber < 0) {
            errorCheck += 1;
            symbolNumError.innerText = `심볼의 갯수는 음수가 될 수 없담!`;
            openModal();
        }
    }

    // 어센틱 심볼 업그레이드 필요 갯수
    function autSymNeedNumber() {
        const maxSymNumber = 4565;

        for (let i = 1; i < userSymLv; i++) {
            needSymNumber = needSymNumber + (9 * i ** 2 + 20 * i);
        }

        const overSymNumber = userSymNumber - (maxSymNumber - needSymNumber);

        needSymNumber = maxSymNumber - needSymNumber - userSymNumber;

        const numberResult = document.getElementById("result-number");

        if (userSymLv <= 0 || userSymLv >= 11) {
            errorCheck += 1;
            if (userSymLv <= 0) {
                symbolLvError.innerText = `심볼의 레벨은 음수나 0이 될 수 없담!`;
                openModal();
            } else {
                symbolLvError.innerText = `어센틱 심볼은 11레벨이 최대 레벨이담!`;
                openModal();
            }
        } else if (needSymNumber > 0) {
            numberResult.innerText = `더 필요한 심볼의 갯수는 ${needSymNumber}개담!`;
        } else if (needSymNumber === 0) {
            numberResult.innerText = `심볼은 최대치담!`;
        } else {
            numberResult.innerText = `심볼이 ${overSymNumber}개나 남는담! 값을 너무 많이 넣은 것 같담..`;
        }

        if (userSymNumber < 0) {
            errorCheck += 1;
            symbolNumError.innerText = `심볼의 갯수는 음수가 될 수 없담!`;
            openModal();
        }
    }

    // 심볼의 종류에 따라 다른 함수를 출력 및 오류 검사
    if (1 <= symType && symType <= 6) {
        if (symType === 1) {
            firstArcSymNeedMeso();
        } else if (symType === 2) {
            secondArcSymNeedMeso();
        } else if (symType === 3) {
            thirdArcSymNeedMeso();
        } else {
            otherArcSymsNeedMeso();
        }

        arcSymNeedNumber();
    } else if (7 <= symType && symType <= 8) {
        if (symType === 7) {
            firstAutSymNeedMeso();
        } else {
            secondAutSymNeedMeso();
        }

        autSymNeedNumber();
    } else {
        symbolLvError.innerText = `아직 심볼을 선택하지 않았담!`;
        openModal();
        errorCheck += 1;
    }

    if (errorCheck !== 0) {
        const numberResult = document.getElementById("result-number");
        const mesoResult = document.getElementById("result-meso");

        numberResult.innerText = `오류가 발생했담! 다시 선택해 줘람!`;
        mesoResult.innerText = ``;
    }
}
