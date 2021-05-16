require('../css/menu.css');
import anime from 'animejs/lib/anime.es.js';

export default class slidemenu{
    constructor(){
        var that = this
        var close_btn_ico = document.getElementById("menu_close_btn_ico");
        var open_btn_ico = document.getElementById("menu_open_btn_ico");

        open_btn_ico.src = require('../assets/chevron_left.svg');
        close_btn_ico.src = require('../assets/close.svg');

        $( ".menu_close_btn" ).on("mouseenter",function() {
            that.shake("menu_close_btn_ico")
        })

        $( ".menu_open_btn" ).on("mouseenter",function() {
            that.shake("menu_open_btn_ico")
        })

        $( ".menu_open_btn" ).on("click",function() {
            that.showMenu()
        })

        $( ".menu_close_btn" ).on("click",function() {
            that.hideMenu()
        })

        $( window ).on("resize",function() {
            that.hideMenu()
        })

        anime({
            targets: ".menu",
            duration: 0,
            translateX: "430px",
        })
    }

    shake(idTarget){
        var xMax = 16;
        anime({
            targets: "#"+idTarget,
            easing: 'easeInOutSine',
            duration: 300,
            rotate: [
                { value: xMax * -1, },
                { value: xMax, },
                { value: xMax/-2, },
                { value: xMax/2, },
                { value: 0 }
            ],
        });
    }

    hideMenu(){
        anime({
            targets: ".menu",
            easing: 'easeOutCirc',
            duration: 300,
            translateX: "min(430px, 100vw)",
        })

        anime({
            targets: ".menu_open_btn",
            easing: 'easeInOutSine',
            duration: 500,
            translateX: 0,
        })
    }

    showMenu(){
        anime({
            targets: ".menu",
            easing: 'easeOutCirc',
            duration: 300,
            translateX: 0,
        })

        anime({
            targets: ".menu_open_btn",
            easing: 'easeInOutSine',
            duration: 100,
            translateX: "150%",
        })
    }
}
