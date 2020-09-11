export default () => {
    let lastItem = document.querySelector('.rules__list li:last-child');
    let btnGo = document.querySelector('.rules__link');

    lastItem.addEventListener('animationend', () => {
        btnGo.classList.add('active');
    });
}