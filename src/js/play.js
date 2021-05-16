require('../css/play.css');
require('../css/play_head.css');
require('../css/controls.css');
require('../css/walkman.css');
require('../css/progress_bar.css');
require('../css/playback.css')

import next from '../assets/skip_next.svg';
import previous from '../assets/skip_previous.svg';

import playIcoOff from '../assets/play_arrow.svg';
import playIcoOn from '../assets/play_arrow_on.svg';

import pauseIcoOff from '../assets/pause.svg';
import pauseIcoOn from '../assets/pause_on.svg';

import randomIcoOff from '../assets/random.svg';
import randomIcoOn from '../assets/random_on.svg';

import repeatIcoOff from '../assets/repeat.svg';
import repeatIcoOn from '../assets/repeat_on.svg';

import k7Ico from '../assets/k7_icon.svg';

import anime from 'animejs/lib/anime.es.js';

export default class play{
    constructor(k7){
        this.k7 = k7
        $(".btn_k7_menu").attr("src", k7Ico);
        $("#btn_ico_back").attr("src", previous);
        $("#btn_ico_play").attr("src", playIcoOn);
        $("#btn_ico_pause").attr("src", pauseIcoOff);
        $("#btn_ico_next").attr("src", next);
        $("#btn_repeat").attr("src", repeatIcoOff);
        $("#btn_shuffle").attr("src", randomIcoOff);

        var that = this
        var repeatEnabled = false
        var randomEnabled = false

        $("#btn_play_pause").on("mousedown", () => {
            that.Play_Pause_mouse_down()
        })

        $("#btn_play_pause").on("mouseup mouseleave", () => {
            that.Play_Pause_mouse_up()
        })

        $("#btn_back").on("mousedown", (e) => {
            that.Prev_Next_mouse_down(e)
        })

        $("#btn_back").on("mouseup mouseleave", (e) => {
            that.Prev_Next_mouse_up(e)
        })

        $("#btn_next").on("mousedown", (e) => {
            that.Prev_Next_mouse_down(e)
        })

        $("#btn_next").on("mouseup mouseleave", (e) => {
            that.Prev_Next_mouse_up(e)
        })

        $("#btn_repeat").on("click", ()=> {
            if(repeatEnabled){
                repeatEnabled = false
                $("#btn_repeat").attr("src", repeatIcoOff);
            }else{
                repeatEnabled = true
                $("#btn_repeat").attr("src", repeatIcoOn);
            }
        })

        $("#btn_shuffle").on("click", ()=> {
            if(randomEnabled){
                randomEnabled = false
                $("#btn_shuffle").attr("src", randomIcoOff);
            }else{
                randomEnabled = true
                $("#btn_shuffle").attr("src", randomIcoOn);
            }
        })
        
    }

    Play_Pause_mouse_down(){
        $("#btn_play_pause").addClass("is_pressed") 
        //Using transitions here because anime.js sucks at animating box shadow
        $("#btn_play_pause").css({
            "transition": "0ms",
            "box-shadow": "0px 1px 1px rgba(0, 0, 0, 0.25),inset 0px 13px 10px #4F5159, inset 0px -1px 1px #4F5159"
        });
        $("#btn_play_pause_circle").css({
            "transition": "0ms",
            "box-shadow": "0px 0px 0px #8B8E98, 0px -6px 12px #6E717C, 0px 6px 10px #54565F, 0px 3px 3px #393B41, inset 0px 6px 8px #5B5E67, inset 0px -6px 8px #787B87"
        });
        $("#btn_ico_play").attr("src", playIcoOff);
        $("#btn_ico_pause").attr("src", pauseIcoOff);
    }

    Play_Pause_mouse_up(){
        if($("#btn_play_pause").hasClass("is_pressed")){
            $("#btn_play_pause").removeClass("is_pressed") 
            $("#btn_play_pause").css({
                "transition": "400ms",
                "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px #4F5159, inset 0px 1px 1px #8B8E98"
            });  
            $("#btn_play_pause_circle").css({
                "transition": "400ms",
                "box-shadow": "0px -3px 3px #8B8E98, 0px -6px 12px #6E717C, 0px 6px 10px #54565F, 0px 3px 3px #393B41, inset 0px 6px 8px #5B5E67, inset 0px -6px 8px #787B87"
            });
            if($("#screen_playing").hasClass("is_playing")){
                $("#screen_playing").removeClass("is_playing") 
                $("#btn_ico_play").attr("src", playIcoOff);
                $("#btn_ico_pause").attr("src", pauseIcoOn);
                this.k7.pause()
            }else{
                $("#screen_playing").addClass("is_playing") 
                $("#btn_ico_play").attr("src", playIcoOn);
                $("#btn_ico_pause").attr("src", pauseIcoOff);
                this.k7.play()
            }
        }
    }

    Prev_Next_mouse_down(event){
        $("#"+event.currentTarget.id).addClass("is_pressed") 
        //Using transitions here because anime.js sucks at animating box shadow
        $("#"+event.currentTarget.id).css({
            "transition": "0ms",
            "box-shadow": "0px 1px 1px rgba(0, 0, 0, 0.25),inset 0px 13px 10px #4F5159, inset 0px -1px 1px #4F5159"
        });
        $("#"+event.currentTarget.children[0].id).css({
            "transition": "0ms",
            "box-shadow": "0px 0px 0px #8B8E98, 0px -6px 12px #6E717C, 0px 6px 10px #54565F, 0px 3px 3px #393B41, inset 0px 6px 8px #5B5E67, inset 0px -6px 8px #787B87"
        });
        if(event.currentTarget.id=="btn_next"){
            this.k7.switchk7(false)
        }else{
            this.k7.switchk7(true)
        }
    }

    Prev_Next_mouse_up(event){
        if($("#"+event.currentTarget.id).hasClass("is_pressed")){
            $("#"+event.currentTarget.id).removeClass("is_pressed") 
            $("#"+event.currentTarget.id).css({
                "transition": "400ms",
                "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px #4F5159, inset 0px 1px 1px #8B8E98"
            });  
            $("#"+event.currentTarget.children[0].id).css({
                "transition": "400ms",
                "box-shadow": "0px -3px 3px #8B8E98, 0px -6px 12px #6E717C, 0px 6px 10px #54565F, 0px 3px 3px #393B41, inset 0px 6px 8px #5B5E67, inset 0px -6px 8px #787B87"
            });
        }
    }
}