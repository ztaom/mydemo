function rainPeach(id){
    const NUMBER_OF_LEAVES = 30;   
    function init()   
    {   
        var container = document.getElementById(id);
        for (var i = 0; i < NUMBER_OF_LEAVES; i++)    
        {   
            container.appendChild(createALeaf());   
        }   
    }   
    function randomInteger(low, high)   
    {   
        return low + Math.floor(Math.random() * (high - low));   
    }   
      
    function randomFloat(low, high)   
    {   
        return low + Math.random() * (high - low);   
    } 
    function pixelValue(value)   
    {   
        return value + 'rem';   
    }  
    function durationValue(value)   
    {   
        return value + 's';   
    }   
    function createALeaf()   
    {    
        var leafDiv = document.createElement('div');   
        var image = document.createElement('img');
        var leafRate = Math.random() * 1.2;
      
        image.src = '//g.alicdn.com/ku/app-upstatic/0.0.6/static/img/huaban' + randomInteger(1, 5) + '.png';
        image.style.width = leafRate * 1+'rem'
        image.style.height = leafRate * 1+'rem'
      
        leafDiv.style.top = "-1rem";
        leafDiv.className = 'hbdiv'
      
        leafDiv.style.left = pixelValue(randomInteger(0, 18.75));   
      
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';   
      
        leafDiv.style.webkitAnimationName = 'fade, drop';   
        image.style.webkitAnimationName = spinAnimationName;   
      
        var fadeAndDropDuration = durationValue(randomFloat(5, 11));   
      
        var spinDuration = durationValue(randomFloat(4, 8));   
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;   
      
        var leafDelay = durationValue(randomFloat(0, 5));   
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;   
      
        image.style.webkitAnimationDuration = spinDuration;   
      
        leafDiv.appendChild(image);   
      
        return leafDiv;   
    }  
    window.addEventListener('load', init, false);
    init()
}
function rainBlossom(parentObj,isHor){
    const NUMBER_OF_LEAVES = 50;
    
    function init()
    {
        var container = document.getElementById(parentObj);
        for (var i = 0; i < NUMBER_OF_LEAVES; i++)
        {
            container.appendChild(createALeaf());
        }
    }

    function randomInteger(low, high)
    {
        return low + Math.floor(Math.random() * (high - low));
    }
    
    function randomFloat(low, high)
    {
        return low + Math.random() * (high - low);
    }

    function durationValue(value)
    {
        return value + 's';
    }
    
    function createALeaf()
    {
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');
        var leafRate = Math.random() * 1.2;
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
        var fadeAndDropDuration;
        var spinDuration;
        
        image.src = '//g.alicdn.com/ku/app-upstatic/0.0.6/static/img/huaban' + randomInteger(1, 5) + '.png';
        image.style.width = leafRate * 2.5+'rem';
        image.style.height = leafRate * 2.5+'rem';

        leafDiv.className = 'hbdiv';
        
        if(isHor){
            leafDiv.style.top = randomInteger(0, 33)+'rem';
            leafDiv.style.left = '-5rem';
            fadeAndDropDuration = durationValue(randomFloat(1, 3));
            spinDuration = durationValue(randomFloat(1, 2));
            leafDiv.style.webkitAnimationName = 'fade, flyBlossoms';
        }else{
            leafDiv.style.top = "-2.5rem";
            leafDiv.style.left = randomInteger(0, 18)+'rem';
            fadeAndDropDuration = durationValue(randomFloat(5, 11));
            spinDuration = durationValue(randomFloat(4, 8));
            leafDiv.style.webkitAnimationName = 'fade, drop';
        }

        image.style.webkitAnimationName = spinAnimationName;

        
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        image.style.webkitAnimationDuration = spinDuration;
        leafDiv.appendChild(image);
        return leafDiv;
    }

    init();
}