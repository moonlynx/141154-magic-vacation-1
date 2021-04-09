import SeaCalfScene from "../helpers/2d/SeaCalfScene";
import CrocodileScene from "../helpers/2d/CrocodileScene";

function showResultScreen(result) {
  let results = document.querySelectorAll(`.screen--result`);

  let resultScene;

  if (results.length) {
    [].slice.call(results).forEach(function (el) {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });
    let targetEl = [].slice.call(results).filter(function (el) {
      return el.getAttribute(`id`) === result;
    });
    targetEl[0].classList.add(`screen--show`);
    targetEl[0].classList.remove(`screen--hidden`);
  
    switch (result) {
      case "result":
        document.querySelector('#titleResultOpacity').beginElement();
        resultScene = new SeaCalfScene(document.getElementById('result1-bg'));
        resultScene.play();
      break;
      case "result2":
        document.querySelector('#titleResult2Opacity').beginElement();
      break;
      case "result3":
        document.querySelector('#titleResult3Opacity').beginElement();
        resultScene = new CrocodileScene(document.getElementById('result3-bg'));
        resultScene.play();
      break;
    }
  }
}

export default (result) => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let playBtn = document.querySelector(`.js-play`);

  if (typeof result === 'string') {
    showResultScreen(result)
  } else {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        showResultScreen(target);
      });
    }
    
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
