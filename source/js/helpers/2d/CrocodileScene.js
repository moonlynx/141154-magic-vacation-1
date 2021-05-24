import Animation from './Animation.js';
import Scene from './Scene.js';
import easing from '../utils/easing.js';

const IMAGES = {
  crocodile: `./img/result3/crocodile.png`,
  drop: `./img/result3/drop.png`,
  flamingo: `./img/result3/flamingo.png`,
  key: `./img/result3/key.png`,
  leaf: `./img/result3/leaf.png`,
  saturn: `./img/result3/saturn.png`,
  snowflake: `./img/result3/snowflake.png`,
  watermelon: `./img/result3/watermelon.png`
};

const OBJECTS = {
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 25,
    opacity: 0,
    transforms: {
      translateY: 0
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 55,
    y: 50,
    size: 110,
    opacity: 1,
    transforms: {
      rotate: 30,
      translateX: 45
    }
  },
  drop: {
    imageId: `drop`,
    x: 45,
    y: 62,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      rotate: 0
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
    }
  },
};

export default class CrocodileScene extends Scene {
  constructor(canvas) {
    super({
      canvas,
      objects: OBJECTS,
      images: IMAGES,
    });

    this._DELAY_START = 0;

    this.initEventListeners();
    this.configure();
  }

  afterInit() {
    this.objects.crocodile.before = () => {
      let key = this.objects.key;
      let s = this.size;
      let w = s * key.size * 0.01;

      this.ctx.save();
      this.ctx.arc(s * key.x * 0.01, s * key.y * 0.01 - w * 0.35, w * 0.5, -0.5 * Math.PI, 0.27 * Math.PI);
      this.ctx.moveTo(s * key.x * 0.01, s * key.y * 0.01 - w * 0.35);
      this.ctx.lineTo(s * key.x * 0.01 + w * 0.33, s * key.y * 0.01 + w * 0.03);
      this.ctx.lineTo(s * key.x * 0.01 + w * 0.54, s * key.y * 0.01 + w * 1.1);
      this.ctx.lineTo(s * key.x * 0.01 - w * 2, s * key.y * 0.01 + w * 1.1);
      this.ctx.lineTo(s * key.x * 0.01 - w , s * key.y * 0.01 - w * 0.5);
      this.ctx.closePath();
      this.ctx.clip();
    }

    this.objects.crocodile.after = () => {
      this.ctx.restore();
    }
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.draw();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initSnowflakeAnimations();
    this.initLeafAnimations();
    this.initSaturnAnimations();
    this.initCrocodileAnimations();
    this.initKeyAnimations();
  }

  initCrocodileAnimations() {
    let o = this.objects.crocodile;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.size = 110 * progress;
        o.transforms.rotate = 30 * progressReversed;
        o.transforms.translateX = 55 * progressReversed - 6;
        o.transforms.translateY = 8 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 1500,
      easing: easing.easeOutCubic,
      callback: () => {
        this.initDropAnimations();
      }
    }));
  }

  initKeyAnimations() {
    let o = this.objects.key;

    this.animations.push(new Animation({
      func: (progress) => {
        o.size = 25 * 0.5 * (progress + 1);
        o.opacity = progress;
      },
      duration: 500,
      delay: this._DELAY_START + 100,
      easing: easing.easeOutCubic,
    }));
  }

  initDropAnimations() {
    let o = this.objects.drop;
    let animation = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.opacity = 1;
        
        if (progress < 0.3) {
          o.size = 7 * progress * 2.5
          o.transforms.translateY = 13 * progress - 3;

        } else if (progress > 0.7) {
          o.size = 7 * progressReversed * 2.5
          o.opacity = progressReversed * 3
        }

        if (progress > 0.3) {
          o.transforms.translateY = 20 * progress - 5;
        }
      },
      duration: 2000,
      count: 3,
      repeatedDelay: 500,
      delay: this._DELAY_START,
      easing: easing.easeInCubic,
    });
    
    animation.start();
    this.animations.push(animation);
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        let o = this.objects.flamingo;

        o.size = 20 * progress;
        o.transforms.rotate = 50 * (1 - progress);
        o.transforms.translateX = -25 * progress;
        o.transforms.translateY = -12 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 200,
      easing: easing.easeOutCubic,
      callback: () => {
        let animation = new Animation({
          func: (progress) => {
            let o = this.objects.flamingo;
    
            o.transforms.translateY = -12 + 62 * progress;
            o.opacity = (1 - progress);
          },
          duration: 800,
          easing: easing.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initLeafAnimations() {
    let o = this.objects.leaf;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.size = 25 * progress;
        o.transforms.rotate = 50 * progressReversed;
        o.transforms.translateX = 30 * progress;
        o.transforms.translateY = -20 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 200,
      easing: easing.easeOutCubic,
      callback: () => {
        let animation = new Animation({
          func: (progress) => {
            o.transforms.translateY = -20 + 70 * progress;
            o.opacity = (1 - progress);
          },
          duration: 800,
          easing: easing.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initSaturnAnimations() {
    let o = this.objects.saturn;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.size = 20 * progress;
        o.transforms.rotate = 50 * progressReversed;
        o.transforms.translateX = 28 * progress;
        o.transforms.translateY = 20 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 200,
      easing: easing.easeOutCubic,
      callback: () => {
        let animation = new Animation({
          func: (progress) => {
            o.transforms.translateY = 20 + 30 * progress;
            o.opacity = (1 - progress);
          },
          duration: 800,
          easing: easing.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initSnowflakeAnimations() {
    let o = this.objects.snowflake;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.size = 15 * progress;
        o.transforms.rotate = 50 * progressReversed;
        o.transforms.translateX = 20 * progress;
        o.transforms.translateY = 5 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 200,
      easing: easing.easeOutCubic,
      callback: () => {
        let animation = new Animation({
          func: (progress) => {
            o.transforms.translateY = 5 + 45 * progress;
            o.opacity = (1 - progress);
          },
          duration: 800,
          easing: easing.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initWatermelonAnimations() {
    let o = this.objects.watermelon;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        o.size = 20 * progress;
        o.transforms.rotate = 50 * progressReversed;
        o.transforms.translateX = -35 * progress;
        o.transforms.translateY = 20 * progress;
      },
      duration: 1000,
      delay: this._DELAY_START + 200,
      easing: easing.easeOutCubic,
      callback: () => {
        let animation = new Animation({
          func: (progress) => {
            o.transforms.translateY = 20 + 30 * progress;
            o.opacity = (1 - progress);
          },
          duration: 800,
          easing: easing.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }
}
