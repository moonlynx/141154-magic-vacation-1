import throttle from 'lodash/throttle';
import { CompressedTextureLoader } from 'three';
import StringBuilder from './string-builder';

const INTRO_ID = 0;
const STORY_ID = 1;
const PRIZES_ID = 2;
const RULES_ID = 3;

const P1_ICON_PATH = "img/prize1.svg";
const P2_ICON_PATH = "img/prize2.svg";

export default class FullPageScroll {
  constructor() {
    const introTitle = document.querySelector('.intro__title');
    const introDate = document.querySelector('.intro__date');

    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.overlapElement = document.querySelector(`.bg_overlap`);
    
    this.introTitle = new StringBuilder(introTitle, {
        wordClass: 'text--word',
        activateClass: 'active__title',
        property: 'transform',
        delay: 0
    });

    this.introDate = new StringBuilder(introDate, {
      wordClass: 'text--word',
      activateClass: 'active__title',
      property: 'transform',
      delay: 700
    });

    this.activeScreen = 0;
    this.prevActiveScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    let rulesBtn;
    let p1Icon;
    let p2Icon;

    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);

    if (this.prevActiveScreen === INTRO_ID) {
      this.introTitle.destroyAnimation();
      this.introDate.destroyAnimation();
    }

    if (this.activeScreen === INTRO_ID) {
      this.introTitle.runAnimation();
      this.introDate.runAnimation();
    }

    if (this.activeScreen === PRIZES_ID) {
      p1Icon = document.querySelector('.prizes__item--journeys img');
      p2Icon = document.querySelector('.prizes__item--cases img');

      if (p1Icon.src !== P1_ICON_PATH) {
        p1Icon.src = P1_ICON_PATH;
      }

      if (p2Icon.src !== P2_ICON_PATH) {
        p2Icon.src = P2_ICON_PATH;
      }
    }

    if (this.prevActiveScreen === RULES_ID) {
      rulesBtn = document.querySelector('.rules__link');
      if (rulesBtn.classList.contains('active')) {
        rulesBtn.classList.remove('active');
      }
    }

    if (this.prevActiveScreen === STORY_ID  && this.activeScreen === PRIZES_ID) {
      this.overlapElement.classList.add(`active`);
    } else {
      this.overlapElement.classList.remove(`active`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
