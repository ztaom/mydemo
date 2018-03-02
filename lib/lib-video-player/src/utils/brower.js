export default function userBrowser(){  
  var browserName = navigator.userAgent.toLowerCase(); 

  if(/msie/i.test(browserName) && !/opera/.test(browserName)){   
    return 'IE'
  }else if(/firefox/i.test(browserName)){  
    return 'Firefox'
  }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){  
    return 'Chrome'
  }else if(/opera/i.test(browserName)){  
    return 'Opera'  
  }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){  
    return 'Safari'  
  }else{  
    return 'unKnow'  
  }  
}  