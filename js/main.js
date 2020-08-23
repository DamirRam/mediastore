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
        modal.querySelector(".modal__content").classList.add("active");
        noScroll(modal);
      });//end addEventListener
  };//end for

  for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener("click", function (event) {
      let modal = this.closest(".modal");
      this.closest(".modal__content").classList.remove("active");
      modal.classList.remove("active");
      scroll(modal);
    });//end addEventListener
  };
  // отключение анимации кнопки с internet explorer
  let buttons = document.querySelectorAll("button");
  for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function (event){
    event.preventDefault();
    console.log("click");
  });//end addEventListener
  }//end for
});
