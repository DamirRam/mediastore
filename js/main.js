window.addEventListener("load", function() {
  //closest
  !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
  //модальные окна
  //отключение прокрутки при всплытии модального окна
  let body = document.body;
  let offsetTop;

  function noScroll (modal) {
    offsetTop          = window.pageYOffset;
    let scrollBarWidth = window.innerWidth-body.offsetWidth;
    modal.style.overflowY ="scroll";
    body.style.overflowY = "hidden";
    body.style.top = "-"+offsetTop+"px";
    body.style.right = scrollBarWidth+"px";
    body.style.position = "fixed";
  };

  function scroll (modal) {
    modal.style.overflowY="hidden"
    body.style.position = "static";
    body.style.right = "0px";
    body.style.right = "0px";
    body.style.overflowY ="scroll";
    window.scroll(0, offsetTop);
  };

  //открытие и закрытие модальных окон
  let openBtns  = document.querySelectorAll(".js-open-modal");
  let closeBtns = document.querySelectorAll(".js-close-modal");

  for(let i=0; i<openBtns.length; i++){
      openBtns[i].addEventListener("click", function (event) {
        event.preventDefault();
        let modalId = this.getAttribute("data-modal");
        let modal   = document.querySelector(".modal[data-modal='"+modalId+"']");
        modal.classList.add("active");
        noScroll(modal);
      });//end addEventListener
  };//end for

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
});
