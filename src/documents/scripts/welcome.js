(function($){

  var
    $popup,
    $overlay,
    $closeBtn,
    cookie,
    timer;


  var welcome = {

    init: function(){
      this.initElements();
      this.initEvents();
    },

    initElements: function(){
      $popup = $( "#welcome-popup" );
      $closeBtn = $( ".js-btn-close" );
      $overlay = $( "#overlay" );
    },

    initEvents: function(){

      // checks if the welcome window has been viewed before
      if (!$.cookie( "welcome_popup" )) {
        setTimeout( function(){
          welcome.showPopup();
        }, 500);
      }

      $closeBtn.on( "click", function(e){
        e.preventDefault();
        welcome.hidePopup();
      });

      $overlay.on( "click", function(e){
        e.preventDefault();
        welcome.hidePopup();
      });

    },

    showPopup: function(){
      $overlay.fadeIn();
      $popup.fadeIn();
    },

    hidePopup: function(){
      $overlay.fadeOut();
      $popup.fadeOut();

      // Sets a cookie so that once the user sees the popup once they won't see it anymore
      $.cookie("welcome_popup", "true", { expires: 1 });
    }

  }

  $(welcome.init());

})(jQuery);