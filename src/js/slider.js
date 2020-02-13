'use strict';
import $ from 'jquery';

$(function(){

  var sld_wrap = '#slider',
  	sld = '.sld_fade',
  	sld_pre = 'sld',
  	sld_time = 4000,
  	sld_wait = 5000;

  $.fn.slide_fade = function(){
  	return this.each(function(i, elem) {
  		var sldnum = parseInt($(this).data('sldnum'));
  		//$(sld).not('#' + sld_pre + sldnum).fadeOut(sld_time);
  		//$('#' + sld_pre + sldnum).fadeIn(sld_time);
      //$(sld).removeClass('fadein, fadeout');
      $(sld).not('#' + sld_pre + sldnum).addClass('fadeout');
      $('#' + sld_pre + sldnum).removeClass('fadeout');
  		var sld_timer = setTimeout(function(){
  			sldnum++;
  			if(sldnum > $(sld).length){ sldnum = 1; }
  			$(sld_wrap).data('sldnum', sldnum);
  			$(sld_wrap).slide_fade();
  		}, sld_wait);
  	});
  };

  $(window).load(function() {
  	$(sld_wrap).data('sldnum', 1).slide_fade();
  });

});
