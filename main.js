/*///////////////////////////////////////////////////////////*/
/*//////////////////// DECLARE VARIABLES ////////////////////*/
/*///////////////////////////////////////////////////////////*/
let easyMode = document.getElementById("easy_mode");
let hardMode = document.getElementById("hard_mode");
let newColor = document.getElementById("new_color");
let section = document.getElementById("section");
let headerRGBH1 = document.getElementById("header_rgb");
let popup = document.getElementById("popup_container");
let popupWrong = document.getElementById("popup_container_wrong");
let coloredDivs;
let headerRGB = '';
let checking = false;
let score = 0;
let wrongScore = 0;
let scoreDiv = document.getElementById("score");
let mode = "easy";

/*///////////////////////////////////////////////////////////*/
/*//////////////////// DECLARE FUNCTIONS ////////////////////*/
/*///////////////////////////////////////////////////////////*/
function createRGBDivs(mode) {
    let elems = "";
    let rndNum = Math.floor(Math.random() * 6);
    for (let i = 0; i < 6; i++){
        let r, g, b;
        if (mode == "easy") {
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
            r = r % 50 == 0 ? r : r + (50 - (r % 50));
            g = g % 50 == 0 ? g : g + (50 - (g % 50));
            b = b % 50 == 0 ? b : b + (50 - (b % 50));
            r = r > 255 ? 250 : r;
            g = g > 255 ? 250 : g;
            b = b > 255 ? 250 : b; 
        } else {
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        }
        let rgb = `rgb(${r},${g},${b})`;
        let rgbText = `RGB( ${r}, ${g}, ${b} )`;
        if (i == rndNum) {
            headerRGB = rgb;
            headerRGBH1.innerHTML = rgbText;
        }
        elems += `<div 
        id="div_${i}" 
        class="colored_divs"
        style="background: ${rgb}"
        onclick="checkIfCorrect('${rgb}')"
        ></div>`;
    }
    section.innerHTML = elems
    coloredDivs = document.querySelectorAll('.colored_divs')
}

function newColors() {
    section.innerHTML = "";
    createRGBDivs(mode);
}

function easyModeFn() {
    hardMode.style.backgroundColor = "white";
    hardMode.style.color = "black";
    easyMode.style.backgroundColor = "blue";
    easyMode.style.color = "white";
    mode = "easy"
    createRGBDivs(mode);
}

function hardModeFn() { 
    easyMode.style.backgroundColor = "white";
    easyMode.style.color = "black";
    hardMode.style.backgroundColor = "blue";
    hardMode.style.color = "white";
    mode = "hard"
    createRGBDivs(mode);
}

function showCongratsOrSad(correct) {
    if(checking) return
    checking = true;
    if (correct) {
        popup.style.visibility = "visible";
        popup.style.opacity = 1;
        scoreDiv.innerHTML = `Incorrect: ${wrongScore} - Correct: ${++score}`;
        setTimeout(() => {
            popup.style.opacity = 0;
            popup.style.visibility = "hidden";
            checking = false;
            newColors();
        }, 700);
    } else {
        popupWrong.style.visibility = "visible";
        popupWrong.style.opacity = 1;
        scoreDiv.innerHTML = `Incorrect: ${++wrongScore} - Correct: ${score}`;
        setTimeout(() => {
            popupWrong.style.opacity = 0;
            popupWrong.style.visibility = "hidden";
            checking = false;
        }, 700);
    }
    
}

function checkIfCorrect(RGB) {
    if (RGB == headerRGB) {
        showCongratsOrSad(true);
    } else {
        showCongratsOrSad(false);
    }
}
/*///////////////////////////////////////////////////////////*/
/*//////////////////// CALLING FUNCTIONS ////////////////////*/
/*///////////////////////////////////////////////////////////*/
createRGBDivs('easy');
newColor.addEventListener("click", newColors)
easyMode.addEventListener("click", easyModeFn);
hardMode.addEventListener("click", hardModeFn);