(function($){

  var
    $formWrap,
    $regForm,
    $overlay,
    $registerBtn,
    $closeBtn,
    $formResponse,
    $captchaWrap,
    $submitBtn,
    $sucessMsg,
    $errorMsg;

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
      $submitBtn = $( "#btn-submit a" );
      $captchaWrap = $( "#captcha" );
      $successMsg = $( "#success-msg" );
      $errorMsg = $( "#error-msg" );
    },

    initEvents: function(){

      $registerBtn.on( "click", function(e){
        e.preventDefault();
        $( "html,body" ).animate({
          scrollTop: $("body").offset().top
        }, 800);
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

      $submitBtn.on("click", function(e){
        e.preventDefault();
        register.validate()
      });

    },

    showForm: function(){
      $overlay.fadeIn();

      if(!$.cookie("form_sent")){
        $regForm.fadeIn();
      }

      $formWrap.fadeIn();
    },

    hideForm: function(){
      $overlay.fadeOut();
      $formWrap.fadeOut();

      if(!$.cookie("form_sent")){
        $formResponse.fadeOut();
      }

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
        isValid = false,
        captchaResponse = $( "#captcha-response" ).val(),
        errorClass = "form-error",
        $firstName = $( "#first-name" ),
        $lastName = $( "#last-name" ),
        $emailAddress = $( "#email-address" ),
        $emailConfirm = $( "#email-confirm" ),
        $errorMsg = $( ".error-msg" ),
        $emailWrap = $( ".email" );

      // First Name Form Validation

      if($firstName.val() === ""){
        $firstName.parent().addClass( errorClass );
        isValid = false;
      } else {
        $firstName.parent().removeClass( errorClass );
        isValid = true;
      }

      // Last Name Form Validation

      if($lastName.val() === ""){
        $lastName.parent().addClass( errorClass );
        isValid = false;
      } else {
        $lastName.parent().removeClass( errorClass );
        isValid = true;
      }

      // Email Address Validation

      if( ($emailAddress.val() != $emailConfirm.val()) || $emailAddress.val() === "" || $emailConfirm.val() === ""){
        $emailAddress.parent().addClass( errorClass );
        $emailConfirm.parent().addClass( errorClass );
        isValid = false;
      } else {
        $emailAddress.parent().removeClass( errorClass );
        $emailConfirm.parent().removeClass( errorClass );
        isValid = true;
      }

      // Captcha Form Validation

      if( captchaResponse != captchaAnswer ){
        $captchaWrap.addClass( errorClass );
        register.updateCaptcha();
        isValid = false;
      } else {
        $captchaWrap.removeClass( errorClass );
        isValid = true;
      }

      if(isValid){
        register.formSuccess();
      } else {
        $errorMsg.fadeIn();
      }

    },

    formSuccess: function(){

      $regForm.fadeOut(300, function(){
        $successMsg.fadeIn();
      });
      $.cookie("form_sent","true");
    },

    formError: function(){
      $regForm.fadeOut(300, function(){
        $errorMsg.fadeIn();
      });
    }

  }

  $(register.init());

})(jQuery);




