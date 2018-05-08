import Global from './global';


export default class Main extends Global {
    constructor () {
        super();

        this.setFooterYear();
        this.eventsListener();
    }


    eventsListener() {

    }

    toggleMenu() {

    }

  setFooterYear() {
        window.document.getElementById('current-year').innerHTML = new Date().getFullYear();
  }
}