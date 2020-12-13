export default class TextAnimation {
    constructor(opt) {
        let {node, start, end, fps, duration, endCB} = opt;

        this._STEP = 1000 / (fps ? fps : 24);
        this._SPEED = 1000;

        this._field = node;
        this._duration = duration ? duration : 1000;
        this._cb = endCB;
        this._time = 0;
        this._id;
        this._lastTime;
        this._currentNumber;
        this._delta;
        this._start;
        this._end;

        if (start <= end) {
            this._start = start;
            this._end = end;

        } else {
            this._start = end;
            this._end = start;
        }

        this._delta = ~~((this._end - this._start) / (this._duration / this._STEP));
        this._currentNumber = this._start;

        if (this._delta < 1) { this._delta = 1; }
    }

    _tick() {
        this._id = requestAnimationFrame(() => {
            let currentTime = Date.now();
            let timeFrame;

            timeFrame = currentTime - this._lastTime;

            if (timeFrame > this._STEP) { timeFrame = this._STEP; }
            
            this._time += timeFrame;
            this._lastTime = currentTime;

            if (this._time < this._STEP) {
                this._tick();

            } else {
                this._time = 0;
                this._currentNumber += this._delta;

                if (this._currentNumber < this._end) {
                    this._field.innerText = this._currentNumber;
                    this._tick();

                } else {
                    this._field.innerText = this._end;
                    if (this._cb) { this._cb(); }
                }
            }
        });
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
        this._currentNumber = this._start;
        this._field.innerText = this._currentNumber;
    }

    stop() {
        cancelAnimationFrame(this._id);
        this._id = undefined;
    }

    isActive() {
        return !!this._id;
    }
}
