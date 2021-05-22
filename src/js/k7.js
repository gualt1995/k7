require('../css/k7.css')

import anime from 'animejs/lib/anime.es.js';
import reel from '../assets/reel.png';
import door from '../assets/door.svg';
import doorBackground from '../assets/door_background.svg';


export default class k7{
    constructor(){
        $(".k7_reel").attr("src", reel);
        $(".door_background").attr("src", doorBackground);
        $(".door").attr("src", door);

        setTimeout(() => {this.Setk7()}, 100);

        $(window).on("resize", () => {
            this.Setk7()
        })  

        this.reelRotate = anime({
            targets: '.k7_reel',
            rotate: "360deg",
            loop: true,
            duration: 2000,
            autoplay: false,
            easing: 'linear'
        });
    }

    Setk7(){
        console.log($(".screen_playing").height())
        console.log($(".frame_walkman").height())
        var walkman_height = $(".frame_walkman").height()
        var screen_height = $(".screen_playing").height()
        this.k7_default_transform = screen_height - walkman_height
        anime({
            targets: ".k7",
            duration: 0,
            translateY: this.k7_default_transform,
        })
    }

    openk7hatch(){
        anime.remove('.door, .k7');
        var timeline = anime.timeline();
        this.reelRotate.pause();
        timeline.add({
            targets: ".door",
            rotateX: -25,
            duration: 400,
            easing: 'easeOutBack',
        },0)
        timeline.add({
            targets: ".k7",
            translateY: [
                { value: this.k7_default_transform - 220, duration: 400, easing: "easeOutInBack"},
            ],
            rotate: [
                { value: 10, duration: 200, delay: 200, easing: "linear"},
            ]
        },200)
    }

    closek7hatch(){
        anime.remove('.door, .k7');
        var timeline = anime.timeline();
        timeline.add({
            targets: ".k7",
            duration: 550,
            rotate: 0,
            easing: "easeOutInBack",
            translateY: this.k7_default_transform,
            complete: () => {
                this.reelRotate.play();
            }
        },0)
        timeline.add({
            targets: ".door",
            rotateX: 0,
            duration: 400,
            easing: 'easeOutBack',

        },450)
    }

    switchk7(next){
        this.closek7hatch()
        if(next){
            var animeStart = "150%"
            var animeEnd = "-150%"
        }else{
            var animeStart = "-150%"
            var animeEnd = "150%"
        }
        anime({
            targets: ".k7",
            scale:[
                { value: 0.9, duration: 150, delay: 0 },
                { value: 1, duration: 150, delay: 300 }
            ],
            translateX:[
                { value: animeStart, duration: 200, delay: 100 },
                { value: animeEnd, duration: 0},
                { value: "0%", duration: 200},
            ],
            translateY: [
                { value: this.k7_default_transform , duration: 200, easing: "linear"},
            ],
            rotate: [
                { value: 0 , duration: 200, easing: "linear"},
            ],
            easing: 'linear',
        })
    }

    play(){
        this.closek7hatch()
    }

    pause(){
        this.openk7hatch()
    }
}


