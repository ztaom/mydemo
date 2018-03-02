/* eslint-disable */
var util = {
    checkAllAnimationFinished: function (animations) {
        for (var i = 0; i < animations.length; i++) {
            if (!animations[i].finish) {
                return false;
            }
        }
    },

    addStats: function() {
        var stats = new Stats();
        stats.dom.style.webkitBoxAlign = 'start';
        stats.dom.style.justifyContent = 'flex-start';
        document.body.appendChild(stats.dom);
        return function() {
            return stats.update();
        }
    },

    addSwitch: function() {
        var isCanvas = location.search.indexOf('canvas=1') > 0;
        var switchEl = document.createElement('div');
        var domEl = document.createElement('a');
        var canvasEl = document.createElement('a');
        switchEl.appendChild(domEl);
        switchEl.appendChild(canvasEl);
        switchEl.style.cssText = [
            'position:absolute',
            'width: 100%',
            'left: 0',
            'bottom: 0',
            'z-index: 999',
            'text-align: center',
            'background: rgba(0, 0, 0, 0.5)',
            'padding: 5px 0'
        ].join(';');
        domEl.style.cssText = canvasEl.style.cssText = [
            'display: inline-block',
            'width: 15%',
            'height: 1.5em',
            'front-size: 20px',
            'background: rgba(150, 150, 150, 0.8)',
            'border: 1px solid #909090',
            'box-sizing: border-box',
            'text-align: center',
            'text-decoration: none',
            'cursor: pointer',
            'color: #fff',
            'margin: 0 5px'
        ].join(';');
        domEl.textContent = 'dom';
        canvasEl.textContent = 'canvas';

        function toggle(a, b) {
            var search = location.search.replace(/^\?/, '');
            if (search.indexOf(a + '=1') >= 0) {
                search = search.replace(a + '=1', b + '=1');
            } else if (search.indexOf('&') >= 0){
                search += '&' + b + '=1';
            } else {
                search += b + '=1';
            }
            location.replace('?' + search);
        }

        if (isCanvas) {
            canvasEl.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            canvasEl.style.color = '#f00';
            canvasEl.style.cursor = 'not-allowed';
            domEl.style.borderColor = '#fff';
            domEl.addEventListener('click', function(e) {
                e.preventDefault();
                toggle('canvas', 'dom');
            }); 
        } else {
            domEl.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            domEl.style.color = '#f00';
            domEl.style.cursor = 'not-allowed';
            canvasEl.style.borderColor = '#fff';
            canvasEl.addEventListener('click', function(e) {
                e.preventDefault();
                toggle('dom', 'canvas');
            }); 
        }
        document.body.appendChild(switchEl);
        return isCanvas;
    },

    addCanvasElement: function(isCanvas) {
        var canvasElement = document.createElement(isCanvas ? 'canvas': 'div');
        canvasElement.setAttribute('id', 'canvas');
        canvasElement.style.cssText = 'width: 100%;height: 100%;overflow: hidden;margin: 0;padding: 0;';
        document.body.appendChild(canvasElement);
        return canvasElement;
    }
};
