import IMask from 'imask';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');

    this.eventsListener();
  }


  eventsListener() {
    const phone = document.getElementById('phone');
    const shadow = document.querySelector('.shadow');
    const popupClose = document.querySelector('.popup__close');
    const callBtns = document.querySelectorAll('.ask-call');
    const send = document.getElementById('send');

    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };

    new IMask(phone, maskOptions);

    for (let i = 0; i < callBtns.length; i++) {
      callBtns[i].addEventListener("click", this.togglePopup.bind(this, true), false)
    }

    shadow.addEventListener("click", this.togglePopup.bind(this, false), false);
    popupClose.addEventListener("click", this.togglePopup.bind(this, false), false);
    send.addEventListener("click", this.sendForm.bind(this), false);
  }

  togglePopup(open) {
    open ? this.popup.classList.add("popup--active") : this.popup.classList.remove("popup--active");
  }

  sendForm(e) {
    e.preventDefault();
    const phoneInput = document.getElementById('phone');
    const sended = document.querySelector('.sended');
    const regexp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    let phone = phoneInput.value;

    if (phone.length === 16 && regexp.test(phone)) {
      this.togglePopup(false);

      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/callback", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(`phone=${phone}`);

      phoneInput.style.borderBottomColor = "#909090";
      sended.classList.add("sended--active");

      setTimeout(()=> {
        sended.classList.remove("sended--active");
        phoneInput.value = "";
      }, 2000);
    } else {
      phoneInput.style.borderBottomColor = "Red";
    }
  }
}