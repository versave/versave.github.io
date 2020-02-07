import canvasExplosion from './modules/canvas-animation';

const canvas = document.getElementById('canvas');

canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

class App {
    constructor() {
        new canvasExplosion(canvas);
        this.jsClass(document.querySelectorAll('.js-class'));
        this.detectScroll();
    };

    jsClass($btns) {
        for (const btn of $btns) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
    
                const $target = document.querySelector(this.dataset.target);
                const type = this.dataset.type;
                const className = this.dataset.class;
    
                switch(type) {
                    case 'add':
                        $target.classList.add(className);
                        break;
                    case 'remove':
                        $target.classList.remove(className);
                        break;
                    default:
                        $target.classList.toggle(className);
                        break;
                }
            });
        }
    };

    detectScroll() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            
            if(scrollTop > 0) {
                this.$select('.header')
                    .classList
                    .add('scrolled');
            } else {
                this.$select('.header')
                    .classList
                    .remove('scrolled');

                this.$select('.nav')
                    .classList
                    .remove('active');
            }
        })
    };

    $select(selector, all = false) {
        if(all) {
            return document.querySelectorAll(selector);
        } else {
            return document.querySelector(selector);
        }
    }
};

new App();