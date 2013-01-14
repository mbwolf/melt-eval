(function($){

  var
    $formWrap,
    $regForm,
    $overlay,
    $registerBtn,
    $closeBtn,
    $formResponse,
    $captchaWrap,
    $submitBtn;

  var register = {

    init: function(){
      this.initElements();
      this.initEvents();
      this.updateCaptcha();
    },

    initElements: function(){
      $formWrap = $( "#register-form" );
      $regForm = $( "#register-form form" );
      $overlay = $( "#overlay" );
      $registerBtn = $( "#btn-register a" );
      $closeBtn = $( ".js-btn-close" );
      $formResponse = $( ".form-response" );
      $submitBtn = $( "#btn-submit" );
      $captchaWrap = $( "#captcha" );
    },

    initEvents: function(){

      $registerBtn.on( "click", function(e){
        e.preventDefault();
        register.showForm();
      });

      $overlay.on( "click", function(e){
        e.preventDefault();
        register.hideForm();
      });

      $closeBtn.on( "click", function(e){
        e.preventDefault();
        register.hideForm();
      });

      $submitBtn.on( "click", function(e){
        e.preventDefault();
        register.validate();
      });

      $captchaWrap.find( "input" ).on("blur", register.validate);

    },

    showForm: function(){
      $overlay.fadeIn();
      $regForm.fadeIn();
      $formWrap.fadeIn();
    },

    hideForm: function(){
      $overlay.fadeOut();
      $formWrap.fadeOut();
      $formResponse.fadeOut();
    },

    updateCaptcha: function(){

      var
        $num1 = $( ".num1" ),
        $num2 = $( ".num2" ),
        random1 = Math.floor((Math.random()*10)+1),
        random2 = Math.floor((Math.random()*10)+1);
        captchaAnswer = random1 + random2;

      $num1.html(random1);
      $num2.html(random2);

      return captchaAnswer;

    },

    validate: function(){

      var
        emailAddress = $( "#email-address" ).val(),
        emailConfirm = $( "#email-confirm" ).val(),
        captchaResponse = $( "#captcha-response" ).val();

      if(emailAddress != emailConfirm){

      }

      if(captchaResponse != captchaAnswer){
        $captchaWrap.addClass( "form-error" );
        register.updateCaptcha();
        return false;

      } else {
        $captchaWrap.removeClass( "form-error" );
        return true;

      }

    },

    sendForm: function(){

      var
        $successMsg = $( "#success-msg" ),
        $errorMsg = $( "#error-msg" );

      if(isValid){
        $regForm.fadeOut(300, function(){
          $successMsg.fadeIn();
        });
      } else {

      }

    }

  }

  $(function(){
    register.init();
  });

})(jQuery);




