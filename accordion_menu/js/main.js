/*
// step1
$(function(){
	$(".sub").hide();

	$(".main").click(function(e){
		e.preventDefault();
		$(".main").removeClass("on");
		$(this).addClass("on");
		$(".sub").hide();
		$(this).next().show();
	});
});
*/


/*
// step2
$(function(){
	$(".sub").hide();

	$(".main").click(function(e){
		e.preventDefault();
		$(".main").removeClass("on");
		$(this).addClass("on");
		$(".sub").slideUp(300);
		$(this).next().slideDown(300);
	});
});
*/


// step3
$(function(){
	$(".sub").hide();

	$(".main").click(function(e){
		e.preventDefault();
		if($(this).hasClass("on") == false){
			$(".main").removeClass("on");
			$(this).addClass("on");
			$(".sub").slideUp(300);
			$(this).next().slideDown(300);
		}else{
			$(this).removeClass("on");
			$(this).next().slideUp(300);
		}
	});
});