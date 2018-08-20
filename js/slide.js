(function () {
  var btn = document.getElementById('TCaptchaTd');

  function appendEle(link, div, script) {
    const html = "<div class='mark'><div class='content'> <div class='top'><div class='refresh'></div><div class='close'></div></div>" +
      "<p class='title'>请将下方图标,移动到圆形区域内</p>" +
      "<div id='bor'>" +
      "<div id='small'></div>" +
      "<div id='big'></div>" +
      "<div class='moT'>" +
      "<img src='img/success.png' alt='验证成功'>" +
      "<p></p>" +
      "</div>" +
      "<p id='err'>" +
      "<span></span>请将图标拖动至圆形区域</p>" +
      "</div></div></div>";
    var linkEle = document.createElement(link);
    var divEle = document.createElement(div);

    linkEle.href = "css/index.css";
    linkEle.rel = "stylesheet";
    divEle.innerHTML = html;
    document.head.appendChild(linkEle);
    document.body.appendChild(divEle);
  };
  appendEle('link', 'div', 'script');
  var mark = document.getElementsByClassName('mark')[0];
  var refresh = document.getElementsByClassName("refresh")[0];
  var close = document.getElementsByClassName('close')[0];
  refresh.onclick = function () {
    smallRandom("bor", "small");
    bigRandom("bor", "big");
  };
  close.onclick = function () {
    mark.classList.remove('block');
  };

  var left = [0.15, 0.25, 0.35, 0.5, 0.6, 0.65];
  // 让小圆在一定范围随机出现,
  function smallRandom(bor, id, T) {

    // bor为外边框元素id，id为小圆id, T为小圆距离边框顶部的距离(默认50)
    var borDiv = document.getElementById(bor);
    var smallDiv = document.getElementById(id);
    var L = borDiv.offsetWidth * left[parseInt(Math.random() * 6)];
    smallDiv.style.left = L + "px";
    smallDiv.style.top = T ? T : 50 + "px";
  };

  // 让大圆在一定范围随机出现
  function bigRandom(bor, id, T) {
    // bor为外边框元素id，id为大圆id, T位大圆距顶部的距离(默认300)
    var borDiv = document.getElementById(bor);
    var bigDiv = document.getElementById(id);
    var L = borDiv.offsetWidth * left[parseInt(Math.random() * 6)];
    bigDiv.style.left = L + "px";
    bigDiv.style.top = T ? T : 200 + "px";
  };

  function doDrag(small_id, big_id) {
    var time = 0; // 消耗时间
    var start = 0; // 起始时间
    var end = 0; // 结束时间
    var borDiv = document.getElementById("bor");
    var oDiv = document.getElementById(small_id);
    var bigDiv = document.getElementById(big_id);

    // 绑定点击事件到小圆上
    oDiv.onmousedown = function (ev) {
      var smallDiv_left = oDiv.offsetLeft;
      var smallDiv_top = oDiv.offsetTop;

      ev.stopPropagation();
      ev.preventDefault();
      var disX = ev.clientX - this.offsetLeft;
      var disY = ev.clientY - this.offsetTop;

      start = new Date().getTime();
      // 拖拽
      document.onmousemove = function (ev) {

        // 鼠标拖动时的元素的left值和top值
        var L = ev.clientX - disX;
        var T = ev.clientY - disY;
        var R = borDiv.offsetWidth - oDiv.offsetWidth;
        var B = borDiv.offsetHeight - oDiv.offsetHeight;
        if (L <= 0) {
          L = 0;
        };
        if (L >= R) {
          L = R;
        };
        if (T <= 0) {
          T = 0;
        };
        if (T >= B) {
          T = B;
        };
        oDiv.style.top = T + "px";
        oDiv.style.left = L + "px";
      };

      // 释放
      document.onmouseup = function () {
        end = new Date().getTime();
        document.onmouseup = document.onmousemove = null;
        var bigDiv = document.getElementById(big_id);
        var x = Math.abs(
          oDiv.offsetLeft +
          oDiv.offsetWidth / 2 -
          (bigDiv.offsetLeft + bigDiv.offsetWidth / 2)
        );
        var y = Math.abs(
          oDiv.offsetTop -
          oDiv.offsetHeight / 2 -
          (bigDiv.offsetTop - bigDiv.offsetHeight / 2)
        );
        var c = oDiv.offsetWidth / 2 + bigDiv.offsetWidth / 2;

        var moT = document.getElementsByClassName("moT")[0];
        // 相差4px内成功
        if (x * x + y * y < 64) {
          time = (end - start) / 1000;
          time = time.toFixed(1);
          if (time < 1) {
            moT.children[1].innerHTML = "只用了" + time + ",这速度快如闪电";
          } else if (time > 1 && time < 10) {
            moT.children[1].innerHTML = "只用了" + time + "s,这速度简直完美";
          } else if (time > 10) {
            moT.children[1].innerHTML = "验证成功,精准无敌了";
          };
          moT.classList.add('block');
          setTimeout(function () {
            moT.classList.remove('block');
            mark.classList.remove('block');
          }, 3000);
        } else {
          var err = document.getElementById("err");
          setTimeout(function () {
            oDiv.style.left = smallDiv_left + "px";
            oDiv.style.top = smallDiv_top + "px";
          }, 300);
          err.style.opacity = 1;
          setTimeout(function () {
            err.style.opacity = 0;
          }, 1000);
        };
      }
    };
  };

  btn.addEventListener('click', function () {
    mark.classList.add('block');
    smallRandom("bor", "small");
    bigRandom("bor", "big");
  });

  doDrag("small", "big");
})()