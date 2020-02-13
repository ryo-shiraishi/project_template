'use strict';
import $ from 'jquery';

$(function(){

  /* =====================
    easing
  ===================== */
  jQuery.easing['jswing'] = jQuery.easing['swing'];
  jQuery.extend( jQuery.easing, {
    def: 'easeOutExpo',
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });


  /* =====================
    header
  ===================== */
  var spmenuTrigger = $('.l-header__button'),
      spmenu = $('.l-spmenu');

  spmenuTrigger.on('click', function(){
    if( !checkSpmenuTrigger() ) {
      toggleSpmenuTrigger(true);
      spmenuTrigger.addClass('is-active');
      spmenu.addClass('is-active');
    } else {
      toggleSpmenuTrigger(false);
      spmenuTrigger.removeClass('is-active');
      spmenu.removeClass('is-active');
    }
  });

  function checkSpmenuTrigger() {
    return $('#l-header__button__check').prop("checked");
  }

  function toggleSpmenuTrigger(boolean) {
    $('#l-header__button__check').prop("checked", boolean);
  }

  $(window).on('scroll', function(){
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();
    if( scrollTop > windowHeight ) {
      $('.l-header__brand').addClass('is-active');
    } else {
      $('.l-header__brand').removeClass('is-active');
    }
  });

  /* =====================
    anchor link
  ===================== */
  var urlHash = location.hash;
  if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      scrollToAnker(urlHash) ;
    }, 50);
  }

  $('a[href^="#"]').click(function() {
    var href= $(this).attr("href");
    var hash = href == "#" || href == "" ? 'html' : href;
    scrollToAnker(hash);
    if( checkSpmenuTrigger() ) {
      spmenuTrigger.removeClass('is-active');
      spmenu.removeClass('is-active');
      toggleSpmenuTrigger(false);
    }
    return false;
  });

  function scrollToAnker(hash) {
    var speed = 1000;
    var target = $(hash);
    var position = target.offset().top - 40;
    $('body,html').animate({scrollTop:position}, speed, 'easeOutExpo');
  }

  /* =====================
    form checkbox
  ===================== */
  $('.mwform-checkbox-field label').on('click', function(){
    var myself = $(this);
    if( $(this).find('input').prop('checked') ) {
      myself.addClass('is_active');
    } else {
      myself.removeClass('is_active');
    }
  });

  /* =====================
    inview setting
  ===================== */
  $(window).load(function(){
    $(".js-effect").each(function(){
      var pos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > pos - windowHeight + windowHeight/5){
        $(this).addClass("is-active");
      } else {
        $(this).removeClass("is-active");
      }
    });
  });
  $(window).scroll(function (){
    $(".js-effect").each(function(){
      var pos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > pos - windowHeight + windowHeight/5){
        $(this).addClass("is-active");
      } else {
        $(this).removeClass("is-active");
      }
    });
  });

  var pathname = $('body').data('tmpdir');

  function loadImages(imgs){
	   return Promise.all(imgs.map(e => new Promise((x, y) => Object.assign(new Image, {src: e, onload: x, onerror: y}))))
  }

  $(window).on('load', function(){
    loadImages([
    	pathname + "/img/01.png",
    	pathname + "/img/02.png",
      pathname + "/img/03.png",
      pathname + "/img/04.png",
      pathname + "/img/service01.png",
      pathname + "/img/service02.png",
      pathname + "/img/service03.png",
      pathname + "/img/service04.png"
    ]).then(
      setTimeout(function(){
        $('.loading').addClass('is-active');
        $('.load').addClass('is-active');
      }, 1500)
    ).catch(
      e => console.log("err")
    );
  });

  /***

  Modal

  ***/
  var scrollPosition;

  $('[data-modal-tgt]').each(function(){
    $(this).on('click', function(){
      var tgt = $(this).data('modal-tgt');
      var modal = $('[data-modal="' + tgt + '"]').addClass('is-active');
    })
  })

  $('.modal__screen').on('click', function(){
    var tgt = $(this).prev();
    tgt.removeClass('is-active');
    //$('body').removeClass('is-fixed').css({'top': 0});
    //window.scrollTo( 0 , scrollPosition );
  });

  $('.modal__close').on('click', function(){
    var tgt = $(this).parents('.modal');
    tgt.removeClass('is-active');
    //$('body').removeClass('is-fixed').css({'top': 0});
    //window.scrollTo( 0 , scrollPosition );
  });


  /* =====================
    news
  ===================== */
  $('.news__list__content').each(function(){
    $(this).on('click', function(){
      var index = $(this).data('post');
      $('[data-toggle="' + index + '"]').slideToggle(200);
      $('[data-post="' + index + '"]').toggleClass('is-active');
    });
  });


  /***

  Scroll FadeIn

  ***/
  $(window).on('load', function(){
    $('.fadein').each(function(){
      scrollIn($(this));
    });
  });
  $(window).scroll(function (){
    $('.fadein').each(function(){
      scrollIn($(this));
    });
  });

  function scrollIn($elm){
    var elemPos = $elm.offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100){
      $elm.addClass('scrollin');
    }
  }

  /****
  file preview
  ****/

  $('#myImage').on('change', function (e) {
    console.log('hogehgoegheogh');
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#preview").attr('src', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  });


});
