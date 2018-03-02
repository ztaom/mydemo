import Vue from 'vue';

export function directive(){
    Vue.directive('move', (el, binding) => {
        const noMove = binding.value.noMove;
        if (noMove) {
            document.body.classList.add('noscroll');
            document.getElementsByTagName('html')[0].classList.add('noscroll');
        } else {
            /*eslint no-alert: 0*/
            document.body.classList.remove('noscroll');
            document.getElementsByTagName('html')[0].classList.remove('noscroll');
        }
    });
}