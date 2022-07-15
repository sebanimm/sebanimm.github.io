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
    let err = 0;

    let symLv = document.getElementById("level-input").value;
    let userMeso10K = document.getElementById("meso-input-10K").value;
    let userMeso100M = document.getElementById("meso-input-100M").value;
    let userSymNumber = document.getElementById("number-input").value;

    // 소멸의 여로 심볼 업그레이드 비용
    function firstArcSymNeedMeso() {
        let defaultMeso = 3110000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const lvUpMeso = 3960000;
        const maxLvMeso = 811490000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    // 츄츄 아일랜드 심볼 업그레이드 비용
    function secondArcSymNeedMeso() {
        let defaultMeso = 6220000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const lvUpMeso = 4620000;
        const maxLvMeso = 995980000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    // 레헬른 심볼 업그레이드 비용
    function thirdArcSymNeedMeso() {
        let defaultMeso = 9330000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const lvUpMeso = 5280000;
        const maxLvMeso = 1180470000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    // 아르카나 ~ 에스페라 심볼 업그레이드 비용
    function otherArcSymsNeedMeso() {
        let defaultMeso = 11196000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const maxLvMeso = 1341324000;
        const lvUpMeso = 5940000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    // 세르니움 심볼 업그레이드 비용
    function firstAutSymNeedMeso() {
        let defaultMeso = 96900000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const lvUpMeso = 88500000;
        const maxLvMeso = 5836500000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    // 호텔 아르크스 심볼 업그레이드 비용
    function secondAutSymNeedMeso() {
        let defaultMeso = 106600000;
        let needMeso = 0;
        let needMeso100M = 0;
        let needMeso10K = 0;
        const lvUpMeso = 97300000;
        const maxLvMeso = 6417500000;

        for (let i = 1; i < symLv; i++) {
            defaultMeso += lvUpMeso;
            needMeso += defaultMeso;
        }

        needMeso = maxLvMeso - needMeso;
        needMeso100M = Math.floor(needMeso / 100000000);
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

        document.querySelector("#result > p:first-child").id = "result-meso";

        const result = document.getElementById("result-meso");

        if (resultMesoTotal > 0) {
            if (resultMeso100M > 0) {
                result.innerText = `더 필요한 메소는 ${resultMeso100M}억 ${resultMeso10K}만 메소담!`;
            } else {
                result.innerText = `더 필요한 메소는 ${resultMeso10K}만 메소담!`;
            }
        } else if (resultMesoTotal === 0) {
            result.innerText = `메소는 딱 남아 떨어진담!`;
        } else {
            result.innerText = `메소는 충분히 많담! ${overMeso100M}억 ${overMeso10K}만 메소나 남는담!`;
        }
        
        if (userMesoTotal < 0) {
            result.innerText = `메소는 음수가 될 수 없담!`;
            err = 1;
        }
    }

    let needSymNumber = 0;

    // 아케인 심볼 업그레이드 필요 갯수
    function arcSymNeedNumber() {
        const maxSymNumber = 2679;

        for (let i = 1; i < symLv; i++) {
            needSymNumber = needSymNumber + (i ** 2 + 11);
        }

        const overSymNumber = userSymNumber - (maxSymNumber - needSymNumber);

        needSymNumber = maxSymNumber - needSymNumber - userSymNumber;

        document.querySelector("#result > p:last-child").id = "result-number";

        const numberResult = document.getElementById("result-number");
        const mesoResult = document.getElementById("result-meso");

        if (symLv <= 0 || symLv >= 20) {
            if (symLv <= 0) {
                mesoResult.innerText = `심볼의 레벨은 음수나 0이 될 수 없담!`;
                numberResult.innerText = ``;
            } else {
                mesoResult.innerText = `아케인 심볼은 20레벨이 최대 레벨이담!`;
                numberResult.innerText = ``;
            }
        } else if (needSymNumber > 0) {
            numberResult.innerText = `더 필요한 심볼의 갯수는 ${needSymNumber}개담!`;
        } else if (needSymNumber === 0) {
            numberResult.innerText = `심볼은 최대치담!`;
        } else {
            numberResult.innerText = `심볼이 ${overSymNumber}개나 남는담! 값을 너무 많이 넣은 것 같담..`;
        }

        if (userSymNumber < 0) {
            numberResult.innerText = ``;
            mesoResult.innerText = `심볼의 갯수는 음수가 될 수 없담!`;
        }
    }

    // 어센틱 심볼 업그레이드 필요 갯수
    function autSymNeedNumber() {
        const maxSymNumber = 4565;

        for (let i = 1; i < symLv; i++) {
            needSymNumber = needSymNumber + (9 * i ** 2 + 20 * i);
        }

        const overSymNumber = userSymNumber - (maxSymNumber - needSymNumber);

        needSymNumber = maxSymNumber - needSymNumber - userSymNumber;

        document.querySelector("#result > p:last-child").id = "result-number";

        const numberResult = document.getElementById("result-number");
        const mesoResult = document.getElementById("result-meso");

        if (symLv <= 0 || symLv >= 11) {
            if (symLv <= 0) {
                mesoResult.innerText = `심볼의 레벨은 음수나 0이 될 수 없담!`;
                numberResult.innerText = ``;
            } else {
                mesoResult.innerText = `어센틱 심볼은 11레벨이 최대 레벨이담!`;
                numberResult.innerText = ``;
            }
        } else if (needSymNumber > 0) {
            numberResult.innerText = `더 필요한 심볼의 갯수는 ${needSymNumber}개담!`;
        } else if (needSymNumber === 0) {
            numberResult.innerText = `심볼은 최대치담!`;
        } else {
            numberResult.innerText = `심볼이 ${overSymNumber}개나 남는담! 값을 너무 많이 넣은 것 같담..`;
        }

        if (userSymNumber < 0) {
            mesoResult.innerText = `심볼의 갯수는 음수가 될 수 없담!`;
            numberResult.innerText = ``;
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
        document.querySelector("#result > p:first-child").id = "result-meso";
        document.querySelector("#result > p:last-child").id = "result-number";

        const mesoResult = document.getElementById("result-meso"); 
        const numberResult = document.getElementById("result-number");

        mesoResult.innerText = `아직 심볼을 선택하지 않았담!`;
        numberResult.innerText = ``;
    }    
    
    if (err === 1) {
        document.querySelector("#result > p:last-child").id = "result-number";

        const numberResult = document.getElementById("result-number");
        
        numberResult.innerText = ``;
    }
}
