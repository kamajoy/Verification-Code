(function () {


  var TCaptchabtn = document.getElementById('TCaptchaDx');

  const html =
    '<div class="dx-mark">' +
    '<div id="dx-content">' +
    '<div class="top">' +
    '<div id="dx-refresh"></div>' +
    '<div id="dx-close"></div>' +
    '</div>' +
    '<p class="title">请依次点击文字：' +
    '<span id="random-txt"></span>' +
    '</p>' +
    '<div id="random-img">' +
    '</div>' +
    '</div></div>';
  var linkEle = document.createElement('link');
  var divEle = document.createElement('div');
  linkEle.href = 'css/index.css';
  linkEle.rel = "stylesheet";
  divEle.innerHTML = html;
  document.head.appendChild(linkEle);
  document.body.appendChild(divEle);

  // 点击刷新
  var dx_mark = document.getElementsByClassName('dx-mark')[0];
  var refresh = document.getElementById('dx-refresh');
  var close = document.getElementById('dx-close');
  var img = document.getElementById('random-img');
  refresh.onclick = function () {
    img.innerHTML = '';
    dxRandom();
  };
  close.onclick = function () {
    dx_mark.classList.remove('block');
  };

  function dxRandom() {
    var textArr = [
      [{
        text: '以',
        left: 54,
        right: 108,
        top: 112,
        bottom: 143
      }, {
        text: '验',
        left: 206,
        right: 255,
        top: 48,
        bottom: 102
      }, {
        text: '风',
        left: 132,
        right: 172,
        top: 198,
        bottom: 239
      }, {
        text: '凉',
        left: 240,
        right: 284,
        top: 150,
        bottom: 200

      }],
      [{
        text: '糊',
        left: 63,
        right: 101,
        top: 150,
        bottom: 200
      }, {
        text: '吃',
        left: 171,
        right: 212,
        top: 154,
        bottom: 200
      }, {
        text: '油',
        left: 146,
        right: 197,
        top: 268,
        bottom: 291
      }, {
        text: '取',
        left: 251,
        right: 300,
        top: 101,
        bottom: 138
      }],
      [{
        text: '家',
        left: 72,
        right: 112,
        top: 116,
        bottom: 167
      }, {
        text: '很',
        left: 224,
        right: 268,
        top: 78,
        bottom: 113
      }, {
        text: '买',
        left: 178,
        right: 223,
        top: 239,
        bottom: 271
      }]
    ];
    // 图片随机出现
    var span = document.getElementById('random-txt');
    var index = Math.round(Math.random() * 2 + 1);
    if (sessionStorage.getItem('i')) {
      if (index == sessionStorage.getItem('i')) {
        if (index == 3) {
          index -= 2
        } else if (index == 1) {
          index++
        } else if (index == 2) {
          index++
        };
      };
    };
    sessionStorage.setItem('i', index);
    img.style.backgroundImage = 'url(img/dx/0' + index + '.png)';
    getRandomText(textArr, span, index, img);
  };


  // 从数组中随机获取元素
  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    };
    return shuffled.slice(min);
  };

  function getRandomText(arr, oDiv, index, img) {

    var i = 0; // 点击计数
    var confirm = []; // 保存点击结果
    // 文字随机出现（字数随机，顺序随机）
    var arri = arr[index - 1].length;
    var textL = Math.round(Math.random() * (arri - 2) + 2); // 随机字数
    var randomArr = arr[index - 1]; // 原数组
    var newTextArr = getRandomArrayElements(randomArr, textL); // 随机数组
    var txt = '';
    newTextArr.forEach(function (item, index) {
      if (index == textL - 1) {
        txt += item.text;
      } else {
        txt += item.text + '、';
      };
    });
    oDiv.innerText = txt; // 把文字写入页面

    img.onclick = function (event) {
      if (i == 0) {
        var start = new Date().getTime();
        sessionStorage.setItem('start', start);
      };

      var content = document.getElementById('dx-content');
      var e = event || window.event;
      var left = event.clientX - img.offsetLeft;
      var top = event.clientY - img.offsetTop;
      var num = document.createElement('div');
      num.setAttribute('class', 'num');
      num.innerText = i + 1;
      img.appendChild(num);
      num.style.left = left - num.offsetWidth / 2 + 'px';
      num.style.top = top - num.offsetHeight / 2 + 'px';
      i += 1;
      if (left < newTextArr[i - 1].right && left > newTextArr[i - 1].left) {
        if (top < newTextArr[i - 1].bottom && top > newTextArr[i - 1].top) {
          confirm.push(1);
        } else {
          confirm.push(2);
        };
      } else {
        confirm.push(2);
      }
      if (i > textL - 1) {

        setTimeout(function () {
          if (confirm.indexOf(2) == -1) {
            // alert('校验成功')
            var end = new Date().getTime();
            console.log(end);

            var time = (end - sessionStorage.getItem('start')) / 1000;
            time = time.toFixed(1);

            var dx_success = document.createElement('div');
            if (time <= 2 && time > 0.5) {
              dx_success.innerHTML = '<img src="img/success.png" alt="验证成功">' +
                '<p class="text">验证成功</p>' +
                '<p id="time">只用了' + time + ',这速度快如闪电</p>';
            } else if (time <= 5 && time > 2) {
              dx_success.innerHTML = '<img src="img/success.png" alt="验证成功">' +
                '<p class="text">验证成功</p>' +
                '<p id="time">只用了' + time + 's,这速度简直完美</p>'
            } else {
              dx_success.innerHTML = '<img src="img/success.png" alt="验证成功">' +
                '<p class="text">验证成功</p>'
            }
            dx_success.setAttribute('id', 'success');
            img.appendChild(dx_success);
            setTimeout(function () {
              dx_mark.classList.remove('block');
              img.innerHTML = '';
              i = 0;
            }, 2500);
          } else {
            var dx_err = document.createElement('div');
            dx_err.innerHTML = '<span></span>验证失败，请按提示重新操作';
            dx_err.setAttribute('id', 'dx-err');
            img.appendChild(dx_err);
            setTimeout(function () {
              img.innerHTML = '';
              dxRandom();
            }, 2500);
          };
        }, 10);
      };
    };
  };

  TCaptchabtn.addEventListener('click', function () {
    dx_mark.classList.add('block');
    dxRandom();
  });

})()