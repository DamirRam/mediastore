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

  setTimeout(hideSpikmi, 1000);

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

  //открытие и закрытие модальных окон
  let openBtns  = document.querySelectorAll(".js-open-modal");
  let closeBtns = document.querySelectorAll(".js-close-modal");

  function openModal () {
    for(let i=0; i<openBtns.length; i++){
        openBtns[i].addEventListener("click", function (event) {
          event.preventDefault();
          let modalId = this.getAttribute("data-modal");
          let modal   = document.querySelector(".modal[data-modal='"+modalId+"']");
          modal.classList.add("active");
          noScroll(modal);
        });//end addEventListener
    };//end for
  };//end openModal

  setTimeout(openModal, 1000);

  for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      modal.classList.remove("active");
      scroll(modal);
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
  //изменение центра карты при именении размера окна
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
//отправка форм на сервер
let forms = document.querySelectorAll("form");
for(let i=0; i<forms.length; i++) {
  forms[i].addEventListener("submit", function (event) {
    event.preventDefault();
    
  });//end addEventListener
}
});
