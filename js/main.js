window.addEventListener("load", function() {
  //closest
  !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
  //скрытие виджета spikmi
  //получение объекта spikmi
  function spikmiInit() {
    return document.querySelector(".a18622da_e04c_41fc_b6ea_82a9b5417c40_6bd79e10_5bb8_4d3b_a208_ccc01b469bf4_root");
  };//end spikmiInit

  function hideSpikmi () {
  const spikmi = spikmiInit();
  const footer = document.querySelector(".js-footer");
  let footerY  = footer.getBoundingClientRect().top;
  let footerHeight = footer.offsetHeight;
  let windowHeight = document.documentElement.clientHeight;
  windowHeight = windowHeight - footerHeight;
  footerY = footerY - windowHeight;

  if (footerY<=footerHeight) {
    spikmi.style.display = "none";
  }
  else {
    spikmi.style.display = "block";
  }
  };//end hideSpikmi

  setTimeout(hideSpikmi, 1500);

  document.onscroll = function () {
  hideSpikmi();
  };

  //модальные окна
  //отключение прокрутки при всплытии модального окна
  const body   = document.body;
  let offsetTop;

  function noScroll (modal) {
    offsetTop          = window.pageYOffset;
    let scrollBarWidth = window.innerWidth-body.offsetWidth;

    modal.style.overflowY ="scroll";
    body.style.overflowY = "hidden";
    body.style.top = "-"+offsetTop+"px";
    body.style.right = scrollBarWidth+"px";
    body.style.position = "fixed";

    const spikmi       = spikmiInit();
    let position = window.getComputedStyle(spikmi).right;
    if (position == "0px") {
      spikmi.style.right = scrollBarWidth+"px";
    }
  };

  function scroll (modal) {
    let scrollBarWidth = window.innerWidth-body.offsetWidth;

    modal.style.overflowY="hidden"
    body.style.position = "static";
    body.style.right = "0px";
    body.style.overflowY ="scroll";
    window.scroll(0, offsetTop);

    const spikmi = spikmiInit();
    let position = window.getComputedStyle(spikmi).right;
    if (position == scrollBarWidth+"px") {
      spikmi.style.right = "0px";
    }
  };
  //debounce
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
  //открытие и закрытие модальных окон
  let openBtns   = document.querySelectorAll(".js-open-modal");
  let closeBtns  = document.querySelectorAll(".js-close-modal");
  let closeModal = document.querySelectorAll(".modal");
  let modalContent = document.querySelectorAll(".modal__content");
  let modalAnimationTime = 300;

  let animOpen = debounce(function animationOpen(time, modalObj) {
  let opacity = 0;

  let interval = setInterval (function (){
    modalObj.classList.add("active");
    opacity += 0.04;
    modalObj.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(interval);
      modalObj.style.opacity = 1;
    }
  }, time/25);//end setInterval
}, modalAnimationTime);//end debounce

let animClose = debounce(function animationClose (time, modalObj) {
  let opacity = 1;

  let interval = setInterval (function () {
    opacity -= 0.04;
    modalObj.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(interval);
      modalObj.style.opacity = 0;
      modalObj.classList.remove("active");
    };
  }, time/25);//end setInterval
}, modalAnimationTime);//end debounce

  function openModal () {
    for(let i=0; i<openBtns.length; i++){
        openBtns[i].addEventListener("click", function (event) {
          event.preventDefault();
          let modalId = this.getAttribute("data-modal");
          let modal   = document.querySelector(".modal[data-modal='"+modalId+"']");
          animOpen(modalAnimationTime, modal);
          noScroll(modal);
        });//end addEventListener
    };//end for
  };//end openModal

  setTimeout(openModal, 1000);

  for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      animClose(modalAnimationTime, modal);
      scroll(modal);
    });//end addEventListener
  };

  for(let i=0; i<closeModal.length; i++){
    closeModal[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      animClose(modalAnimationTime, modal);
      scroll(modal);
    }, false);//end addEventListener
  };

  for(let i=0; i<modalContent.length; i++){
    modalContent[i].addEventListener("click", function (event) {
      event.stopPropagation();
    });//end addEventListener
  };

  // отключение анимации кнопки internet explorer
  let buttons = document.querySelectorAll("button");
  for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function (event){
    event.preventDefault();
  });//end addEventListener
  }//end for

  //слайдер
  function slider(sliderId) {
    let sliderInner = document.querySelector(sliderId);
    let nextBtn     = sliderInner.parentNode.querySelector(".js-btn-next");
    let prevBtn     = sliderInner.parentNode.querySelector(".js-btn-prev");
    let i           = 0;

    sliderInner = sliderInner.children;

    nextBtn.onclick = function () {
      sliderInner[i].style.opacity = "0";
      i++;
      if(i==sliderInner.length) {
        i=0;
      }
      sliderInner[i].style.opacity = "1";
    };

    prevBtn.onclick = function () {
      sliderInner[i].style.opacity = "0";
      i--;
      if(i==-1) {
        i = sliderInner.length-1;
      };
      sliderInner[i].style.opacity = "1";
    };

  };//end slider function
  //slider 1
  slider(".js-slider-1");
  //slider 2
  slider(".js-slider-2");
  //slider 3
  slider(".js-slider-3");
  //slider 4
  slider(".js-slider-4");

  //яндекс карты отложенная загрузка и мобильная карта
  function yandexMap () {
  let script      = document.createElement("script");
  let firstScript = document.querySelector("script");

  script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=";
  firstScript.parentNode.insertBefore(script,firstScript);

  script.addEventListener("load", function () {
  //изменение центра карты при изменении размера окна
        function setCenter (myMap) {
      let windowWidth = window.innerWidth;

      function center (windowWIdth) {
        if(windowWidth <= 992&&windowWidth > 768) {
          myMap.setCenter([41.24452892817815,69.16605567752941]);
        }
        if(windowWidth <= 768) {
          myMap.setCenter([41.24479615429822,69.16872715770823]);
        }
        if(windowWidth > 992) {
          myMap.setCenter([41.24449630624949,69.1649516601672]);
        }
      };//end center

        center();

        window.onresize = function () {
          windowWidth = window.innerWidth;
          center(windowWidth);
        };
    };//end setCenter
    //инициализация карты
  ymaps.ready(init);

  function init() {
      let myMap = new ymaps.Map("js-map", {
              center: [41.24449630624949,69.1649516601672],
              zoom: 17,
              controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'trafficControl', 'geolocationControl']
          }, {
              searchControlProvider: 'yandex#search'
          });
          myMap.geoObjects.add(new ymaps.Placemark([41.24479615429822,69.16872715770823], {
              balloonContent: 'MediaStore<br>Пн - Вс 9:00 - 17:00<br>Без выходных',
              iconCaption: 'Абу Сахий'
          }, {
              preset: 'islands#greenDotIconWithCaption',
              iconColor: '#ed4544'
          }));
          setCenter(myMap);
    }
    });
  };//end yandexMap
  //тайм аут создания карты
  setTimeout(yandexMap, 1500);
//отправка форм на сервер
function ajaxPost(params, form) {
  let request = new XMLHttpRequest ();

  request.onreadystatechange = function () {
    if(request.readyState == 4 && request.status ==200) {
    let modal   = document.querySelector(".modal[data-modal='thanks']");
    animOpen(modalAnimationTime, modal);
    noScroll(modal);
    form.querySelector("input[name=user_name]").value = "";
    form.querySelector("input[name=user_phone]").value = "";
    if (form.classList.contains("question__form") == true) {
      userMessage = form.querySelector("textarea[name=user_message]").value = "";
    }
   }
  }

  request.open("POST" ,"../mailer/mail.php");
  request.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
  request.send(params);
}//end ajaxPost function

let forms = document.querySelectorAll("form");
for(let i=0; i<forms.length; i++) {
  forms[i].addEventListener("submit", function (event) {
    event.preventDefault();
    let form        = event.target;
    let userName    = form.querySelector("input[name=user_name]").value;
    let userPhone   = form.querySelector("input[name=user_phone]").value;
    let userMessage = "";
    if (userPhone == "+998(__)-___-__-__") {
      return false;
    }

    if (form.classList.contains("question__form") == true) {
      userMessage = form.querySelector("textarea[name=user_message]").value;
    }

    let params = "user_name="+userName+"&"+"user_phone="+userPhone+"&"+"user_message="+userMessage;

    ajaxPost(params, form);

    if(form.closest(".js-modal").hasAttribute("data-modal") == true) {
    let modal = form.closest(".modal");
    animClose(modalAnimationTime, modal);
    scroll(form.closest(".js-modal"));
    }
  });//end addEventListener
  }//end for
  // маска ввода в input телефона.
function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}
function mask(event) {
    var matrix = this.defaultValue,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
        return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
}
  let inputs = document.querySelectorAll("input[type=tel]");
  for(let i=0; i<inputs.length; i++) {
    inputs[i].addEventListener("focus", function (event) {
      let input = event.target;
      input.setAttribute("value","+998(__)-___-__-__");
    });//end addEventListener
    inputs[i].addEventListener("blur", function (event) {
      let input = event.target;
      input.removeAttribute("value");
    });//end addEventListener
    inputs[i].addEventListener("input", mask, false);
  }//end for
});

