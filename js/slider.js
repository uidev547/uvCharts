$(function(){
      $("#slides").slidesjs({
        width: 800,
        height: 400,
        navigation : false,
       	play: {
   	      active: true,
   	      effect: "slide",
   	      interval: 5000,
   	      auto: true,
   	      swap: true,
   	      pauseOnHover: true,
   	      restartDelay: 2500
   	    }
	});
});