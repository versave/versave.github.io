import canvasExplosion from './modules/canvas-animation';
import { EasingFunctions } from './modules/easing';

const canvas = document.getElementById('canvas');
let dots = 1500;

canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
});

if(window.outerWidth < 768) {
    dots = 500;
}

class App {
    constructor() {
        new canvasExplosion(canvas, dots);
        this.jsClass(document.querySelectorAll('.js-class'));
        this.detectScroll();
        this.scrollToEvent(this.$select('.js-scrollspy', true));
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

                this.$select('.header')
                    .classList
                    .remove('nav-open');
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

    scrollTo(to) {
        if(window.scrollY == to) {
            return;
        }

        const requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        
        const start = window.scrollY || window.pageYOffset
        const time = Date.now()
        const duration = Math.abs(start - to) / 5;
    
        (function step() {
            var dx = Math.min(1, (Date.now() - time) / duration)
            var pos = start + (to - start) * EasingFunctions.easeOutQuart(dx)
    
            window.scrollTo(0, pos)
    
            if (dx < 1) {
                requestAnimationFrame(step)
            }
        })();
    }

    scrollToEvent($elements) {
        const self = this;

        for (const $element of $elements) {
            $element.addEventListener('click', function(e) {
                e.preventDefault();
                
                const $el = this;
                const targetEl = $el.dataset.target || $el.getAttribute('href');
                const $target = document.querySelector(targetEl);
                const offset = 93;

                self.$select('.header').classList.remove('nav-open');
                self.scrollTo($target.offsetTop - offset);
            });
        }
    }
};

new App();