export default class StringBuilder {
    constructor(node, properties) {
        let text = node.textContent.trim();
        let property = properties.property;
        let wordClass = properties.wordClass;
        let letterClass = properties.letterClass;
        let spans = [];

        this._activateClass = properties.activateClass;
        this._element = node;
        this._delay = properties.delay;

        text = text.split(' ').filter((element) => {
            return element !== ``;
        });

        text = text.map(word => {
            word = this.prepareWord(word, letterClass);
            spans = spans.concat(word);

            return this.createElement(word, wordClass);
        });

        node.innerText = '';

        text.forEach((element) => {
            node.appendChild(element);
        });

        spans.forEach((span, index) => {
            let duration = 600;
            let delay = this._delay;

            if (index % 5 == 0) {
                delay += 200;
            } else if (index % 3 == 0) {
                delay += 0;

            } else if (index % 2 == 0) {
                delay += 100;
            } else {
                delay += 0;
            }

            span.style.transition = `${property} ${duration}ms ease ${delay}ms`;
        });
    }

    prepareWord(word, letterClass) {
        word = Array.from(word);

        word = word.map((letter) => {
            return this.createElement(letter, letterClass);
        })

        return word;
    }

    createElement(text, cl) {
        let span = document.createElement('span');

        if (cl) {
            span.classList.add(cl);
        }

        if (typeof text === 'string') {
            span.innerText = text;

        } else if (typeof text === 'object') {
            text.forEach((element) => {
                span.appendChild(element);
            });
        }
        
        return span;
    }

    runAnimation() {
        if (this._element) {
            setTimeout(() => {
                this._element.classList.add(this._activateClass)
            }, 300);
        }
      }
    
    destroyAnimation() {
        if (this._element) {
            this._element.classList.remove(this._activateClass);
        }
    }
}
