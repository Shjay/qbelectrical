'use strict'

var index = {

	service_btn: document.getElementsByClassName('service_btn'),

	init: function(){

		var wSize = document.documentElement.clientWidth;

		index.setEvent();
		index.setDocument();

	},

	setEvent: function(){

		for(var key in index.service_btn){
			if(!isNaN(key)){
				index.service_btn[key].onmouseenter = index.onmouseenter_serviceBtn;
				index.service_btn[key].onmouseleave = index.onmouseleave_serviceBtn;
			}
		}

	},

	setDocument: function(){

	},

	onmouseenter_serviceBtn: function(){
		var service_icon = this.getElementsByClassName('service_icon')[0];
		var service_desc = this.getElementsByClassName('service_desc')[0];

		var imgSrc = service_icon.getElementsByTagName('img')[0].getAttribute('src');
		var replaceImg = imgSrc.replace('_g', '_w');

		service_icon.getElementsByTagName('img')[0].setAttribute('src', replaceImg);
		service_desc.getElementsByTagName('p')[0].setAttribute('class', 'w_font');

	},

	onmouseleave_serviceBtn: function(){

		var service_icon = this.getElementsByClassName('service_icon')[0];
		var service_desc = this.getElementsByClassName('service_desc')[0];

		var imgSrc = service_icon.getElementsByTagName('img')[0].getAttribute('src');
		var replaceImg = imgSrc.replace('_w', '_g');

		service_icon.getElementsByTagName('img')[0].setAttribute('src', replaceImg);
		service_desc.getElementsByTagName('p')[0].setAttribute('class', 'lg_font');

	}

}

window.addEventListener('resize', function(event){
	index.setDocument();
});

$(function(){

	$(window).resize(function(){
		resizeWindow();
	});

	$(window).scroll(function() {
		setServiceMenu();
	});

	$('#top_menu li a[href*="#"]:not([href="#"])').click(function() {

		var wSize = $(window).innerWidth();
		var plusPaddingTop = 0;
		if(wSize > 767){
			plusPaddingTop = 0;
		}else{
			plusPaddingTop = 60;
		}


		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top-plusPaddingTop
				}, 1000);
				return false;
			}
		}
	});

	$('#home_btn').click(function(){

		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});
	//Set some specific divisions height size
	var resizeWindow = function(){
		var wSize = $(window).innerWidth();

		if(wSize > 767){
			//content picture div of about us set height with height of content sescription 
			var s1_descHeight = $("#section1 .cont_desc").css("height");
			$("#section1 .cont_pic").css("height", s1_descHeight);

			var descH = $("#slide2 .cont_desc").css("height");

			//set height size of Expertise slide picture div
			var slideObjs = $('.slide').not('#slide1');
			for(var i=0; i<slideObjs.length; i++){
				var slideObj = slideObjs[i].getElementsByClassName('content')[0];

				slideObj.getElementsByClassName('cont_pic')[0].style.height = descH;
			}

		}else{
			$("#section1 .cont_pic").css("height", '200px');
			$(".slide .cont_pic").css('height', '200px');
		}
		setArrows();
	}

	//click service menu on the bottom.
	$('.service_btn').click(function(){
		$('html, body').animate({
			scrollTop: $('#section2').offset().top-0
		}, 1000);

		var curSlide = $('#section2').attr('data-value');
		var toSlide = parseInt($(this).attr('data-value'));
		
		var maxSlide = $('.slide').length;
		
		for(var i = 1; i<maxSlide+1; i++){

			if(i > toSlide){	//less than target slide -> left

				$('#slide'+i).attr('class', 'slide left_slide');

			}else if (i == toSlide){	//target slide -> cur

				$('#slide'+i).attr('class', 'slide cur_slide');

			}else{	//more than target slide -> right

				$('#slide'+i).attr('class', 'slide right_slide');

			}
		}
		$("#section2").attr('data-value', $(this).attr('data-value'));
		setArrows();
		//setSlidePage("right_arrow", $(this).attr('data-value'));

	});

	//Section2 - slide arrow click event
	$(".arrows").click(function(){
		//clicked arrow (left or right)
		var this_id = $(this).attr('id');
		//current slide
		var cur_slide = $("#section2").attr('data-value');

		setSlidePage(this_id, cur_slide);

	});

	//Contact us button is clicked
	$('.contact_btn').click(function(){

		var wSize = $(window).innerWidth();
		var plusPaddingTop = 0;
		if(wSize > 767){
			plusPaddingTop = 40;
		}else{
			plusPaddingTop = 60;
		}

		$('html, body').animate({
			scrollTop: $('#section3').offset().top-plusPaddingTop
		}, 1000);
	});	
	
	//Send button is clicked
	$("#send_btn").click(function(){

		mail_proc();

	});

	var setSlidePage = function(this_id, cur_slide){

		var pre_slide = parseInt(cur_slide)-1;
		var next_slide = parseInt(cur_slide)+1;
		//get max slide counts
		var max_slide = $(".slide").length;

		if(this_id == 'left_arrow'){	//when left_arrow is clicked

			$("#slide"+pre_slide).attr('class', 'slide cur_slide').dequeue();
			$("#slide"+cur_slide).removeClass().addClass(' slide slideOutRight animated')
				.delay(1000)
				.queue(function() { 
					$(this).attr('class', 'slide right_slide').dequeue();
				});
			

			//plus 1 from section2 datavalue 
			$("#section2").attr('data-value', pre_slide);


		}else{	//when right_arrow is clicked

			$("#slide"+next_slide).removeClass().addClass(' slide slideInRight animated')
				.delay(1000)
				.queue(function() { 
					$("#slide"+cur_slide).attr('class', 'slide left_slide').dequeue();
					$(this).attr('class', 'slide cur_slide').dequeue();
				});
			
			//plus 1 from section2 datavalue 
			$("#section2").attr('data-value', next_slide);

		}

		setArrows();
	}

	var setArrows = function(){

		var wSize = $(window).innerWidth();
		var cur_slide = $("#section2").attr('data-value');
		
		if(wSize > 767){
		
			if(cur_slide== '1') 
				$('#left_arrow').css('display', 'none');
			else 
				$('#left_arrow').css('display', 'block');

			if(cur_slide == '4') 
				$('#right_arrow').css('display', 'none');
			else
				$('#right_arrow').css('display', 'block');
		}else{

			$('#right_arrow').css('display', 'none');
			$('#left_arrow').css('display', 'none');
		}

	}

	var setServiceMenu = function(){

		var wSize = $(window).innerWidth();

		if(wSize > 767){
		   if(($(window).scrollTop()) + $(window).height() == $(document).height()) {
		       $('.service_menu').css('bottom', '50px');
		   }else{
		   		$('.service_menu').css('bottom', '0px');
		   }
		}

	}

	var mail_check = function (v, n) {
		var regEmail = /\w{2,}[@][\w\-]{2,}([.]([\w\-]{2,})){1,3}$/;
		var tmps = new Array();
		if(v.indexOf(',') > -1) {
			tmps = v.split(',');
		}
		else if(v.indexOf(';') > -1) {
			tmps = v.split(';');
		}
		else {
			tmps.push(v);
		}
		for(var i=0; i<tmps.length; i++) {
			if(tmps[i].indexOf('<') > -1 && tmps[i].indexOf('>') > -1) {
				tmps[i] = tmps[i].substring(tmps[i].indexOf('<')+1, tmps[i].indexOf('>'));
			}
			if(!regEmail.test(tmps[i])) {
				return false;
			}
		}
		if(n == 1 && tmps.length != 1) {
			return false;
		}
		return true;
	}

	var mail_proc = function () {
		if(!document.getElementById('f_name').value) {
			alert('Check your name.');
			document.getElementById('f_name').focus();
			return false;
		}
		if(!document.getElementById('f_email').value) {
			alert('Check your email.');
			document.getElementById('f_email').focus();
			return false;
		}
		if(!mail_check(document.getElementById('f_email').value, 1)) {
			alert('Your email is not available.');
			document.getElementById('f_email').focus();
			return false;
		}
		if(!document.getElementById('msg').value) {
			alert('Your message is empty.');
			document.getElementById('msg').focus();
			return false;
		}
		$('#frm').submit();
		return false;
	}

	resizeWindow();
	setArrows();
	setServiceMenu();
});

























