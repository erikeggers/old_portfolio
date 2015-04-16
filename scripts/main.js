$(function(){
  
  function checkWindowSize(){
    if (($(window).width() <= 748)){
      $(".wsky").removeClass('wsky').removeAttr('wsky-animation wsky-animation wsky-offset wsky-duration wsky-delay');
    }
  };
  
  checkWindowSize(); 

});