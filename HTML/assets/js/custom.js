$(document).on('click','.menu_icon', function(){
	$('ul.top-navigation').animate({left:'0px'},300);
	$('body,html').css({overflow:'hidden'});
	//$('.scroller').removeClass('fixPos');
	$('.menu_icon').addClass('open');
	$('.mob-navigation .overlay').addClass('open');
	
});

$(document).on('click','.menu_icon.open,.overlay', function(){
	$('ul.top-navigation').animate({left:'-300px'},100);
	$('.menu_icon').removeClass('open');
	$('.mob-navigation .overlay').removeClass('open');
	setTimeout(function(){
	$('body,html').css({overflow:'visible'});
		}, 1000);
});


$('.custom-file-input').on('change', function() { 
   let fileName = $(this).val().split('\\').pop(); 
   $(this).next('.custom-file-label').addClass("selected").html(fileName); 
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

document.addEventListener("DOMContentLoaded", function(event) {

function OTPInput() {
const inputs = document.querySelectorAll('#otp > *[id]');
for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function(event) { if (event.key==="Backspace" ) { inputs[i].value='' ; if (i !==0) inputs[i - 1].focus(); } else { if (i===inputs.length - 1 && inputs[i].value !=='' ) { return true; } else if (event.keyCode> 47 && event.keyCode < 58) { inputs[i].value=event.key; if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode> 64 && event.keyCode < 91) { inputs[i].value=String.fromCharCode(event.keyCode); if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); } } OTPInput(); });