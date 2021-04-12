export default class Timer {
    constructor(opt) {
        let {nodesList, time, endCB} = opt;

        this._STEP = 500;
        this._SPEED = 1000;

        this._fieldMin = nodesList[0];
        this._fieldSec = nodesList[1];
        this._endTime = time;
        this._counterMs = 0;
        this._time = 0;
        this._cb = endCB;
        this._id;
        this._lastTime;
    }

    _tick() {
        this._id = requestAnimationFrame(() => {
            let currentTime = Date.now();
            let timeFrame;

            timeFrame = currentTime - this._lastTime;

            if (timeFrame > this._STEP) { timeFrame = this._STEP; }
            
            this._counterMs += timeFrame;
            this._lastTime = currentTime;

            if (this._counterMs >= this._SPEED) {
                this._time += 1000;
                this._counterMs = 0;

                if (this._time < this._endTime) { 
                    this._tick();
    
                    this._setTime(this._endTime - this._time);
                } else {
                    this._setTime(0);
                    if (this._cb) { this._cb(); }
                }
            } else {
                this._tick();
            }
        });
    }

    _setTime(time) {
        let seconds = ~~(time / 1000);
        let minutes;
        
        minutes = ~~(seconds / 60) % 60;
        seconds = seconds % 60;
        
        if (Number(this._fieldMin.innerText) !== minutes) {
            this._fieldMin.innerText = (minutes < 10) ? "0" + minutes : minutes;
        }
        
        if (Number(this._fieldSec.innerText) !== seconds) {
            this._fieldSec.innerText = (seconds < 10) ? "0" + seconds : seconds;
        }
    }

    start() {
        if (!this.isActive()) {
            this._lastTime = Date.now();
            this._tick();
        }
    }

    restart() {
        this.reset();

        if (!this.isActive()) {
            this.start();
        }
    }

    reset() {
        this._time = 0;
        this._counterMs = 0;
        this._setTime(this._endTime);
    }

    stop() {
        cancelAnimationFrame(this._id);
        this._id = undefined;
    }

    isActive() {
        return !!this._id;
    }
}
