window.addEventListener("load", function () {
  //модальные окна
  //отключение прокрутки при всплытии модального окна
  var body = document.body;
  var offsetTop;

  function noScroll(modal) {
    offsetTop = window.pageYOffset;
    var scrollBarWidth = window.innerWidth - body.offsetWidth;
    modal.style.overflowY = "scroll";
    body.style.overflowY = "hidden";
    body.style.top = "-" + offsetTop + "px";
    body.style.right = scrollBarWidth + "px";
    body.style.position = "fixed";
  }

  function scroll(modal) {
    modal.style.overflowY = "hidden";
    body.style.position = "static";
    body.style.right = "0px";
    body.style.right = "0px";
    body.style.overflowY = "scroll";
    window.scroll(0, offsetTop);
  }

  //открытие и закрытие модальных окон
  var openBtns = document.querySelectorAll(".js-open-modal");
  var closeBtns = document.querySelectorAll(".js-close-modal");

  var _loop = function _loop(i) {
    openBtns[i].addEventListener("click", function (event) {
      event.preventDefault();
      var modalId = openBtns[i].getAttribute("data-modal");
      var modal = document.querySelector(
        ".modal[data-modal='" + modalId + "']"
      );
      modal.classList.add("active");
      modal.querySelector(".modal__content").classList.add("active");
      noScroll(modal);
    }); //end addEventListener
  };


  for (var i = 0; i < openBtns.length; i++) {
    _loop(i);
  } //end for

  var _loop2 = function _loop2(_i) {
    closeBtns[_i].addEventListener("click", function (event) {
      var modal = closeBtns[_i].closest(".modal");
      closeBtns[_i].closest(".modal__content").classList.remove("active");
      modal.classList.remove("active");
      scroll(modal);
    }); //end addEventListener
  };

  for (var _i = 0; _i < closeBtns.length; _i++) {
    _loop2(_i);
  } //скрытие виджета spikme
});
