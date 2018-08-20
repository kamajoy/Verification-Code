window.onload = function () {
  var TCaptcha = document.getElementById('TCaptcha');;
  var script = document.createElement('script');
  TCaptcha.addEventListener('click', function(){
    if (TCaptcha.getAttribute('data-type-verify') == 'word') {
      script.src = 'js/dx.js';
      document.head.appendChild(script);
    } else if (TCaptcha.getAttribute('data-type-verify') == 'slide') {
      script.src = 'js/slide.js';
      document.head.appendChild(script);
    }
  })
  
}