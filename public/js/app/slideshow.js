import Global from './global';


export default class Slideshow extends Global {
  constructor () {
    super();

    this.slideIndex = 1;

    this.showSlides(this.slideIndex);
    this.eventsListener();
  }


  eventsListener() {
    const buttons = document.querySelectorAll('.slideshow__button');
    const dots = document.querySelectorAll('.slideshow__dot');


    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.changeSlide.bind(this), false)
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", this.currentSlide.bind(this), false)
    }
  }

  changeSlide ({target}) {
    const num = +target.dataset.direction;

    this.showSlides(this.slideIndex += num)
  }

  currentSlide({target}) {
    const num = +target.dataset.num;

    this.showSlides(this.slideIndex = +num);
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow__item");
    let dots = document.getElementsByClassName("slideshow__dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex  = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slideshow__dot--active", "");
    }
    slides[this.slideIndex-1].style.display = "flex";
    dots[this.slideIndex-1].className += " slideshow__dot--active";
  }
}