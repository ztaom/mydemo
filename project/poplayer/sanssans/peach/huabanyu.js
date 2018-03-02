
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
      
        image.src = 'http://static.youku.com/h5/html/taohua/img/huaban' + randomInteger(1, 5) + '.png';
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