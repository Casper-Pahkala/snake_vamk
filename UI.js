
var nightMode = localStorage.getItem('nightMode');

console.log(nightMode);
const themeSlider = document.getElementById('themeSlider');

if (nightMode == 1) {
    themeSlider.checked = nightMode;
    themeToNight();
} else {
    themeToLight();
}

themeSlider.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        themeToNight();
    } else {
        themeToLight();
    }
})  

function themeToNight() {
    localStorage.setItem('nightMode', 1);
    document.body.style.backgroundColor = 'rgb(48, 48, 48)';
    document.getElementsByClassName('heading')[0].style.color = 'whitesmoke';
    document.getElementsByClassName('score')[0].style.color = 'whitesmoke';
    document.getElementsByClassName('score')[1].style.color = 'whitesmoke';
    document.getElementsByClassName('night-mode-text')[0].style.color = 'whitesmoke';
    document.getElementsByClassName('snake-board')[0].style.borderColor = 'antiquewhite';
}

function themeToLight() {
    localStorage.setItem('nightMode', 2);
    document.body.style.backgroundColor = '#E7DECC';
    document.getElementsByClassName('heading')[0].style.color = 'rgb(48, 48, 48)';
    document.getElementsByClassName('score')[0].style.color = 'rgb(48, 48, 48)';
    document.getElementsByClassName('score')[1].style.color = 'rgb(48, 48, 48)';
    document.getElementsByClassName('night-mode-text')[0].style.color = 'rgb(48, 48, 48)';
    document.getElementsByClassName('snake-board')[0].style.borderColor = 'rgb(48, 48, 48)';
}