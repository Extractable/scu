$(function() {
    
    /**
     * Basic Form Validation
     */
    $('.formSubmit').on('click', function(e) {
        var form = $(this).closest('form');

        var isValid = true;

        //Clear all errors on click
        $('.form-error', form).hide();
        $('.js-validate', form).attr('aria-invalid', 'false');
        $('.js-radio-validate', form).attr('aria-invalid', 'false'); //reset aria invalid

        //Validate Fields
        $('.js-validate', form).each(function() {
            if($.trim($(this).val()) == ''){
                var $thisId = $(this).attr('id');
                isValid = false;

                $(this).prev().addClass('has-error');
                $(this).next().show();
                $(this).attr({
                    'aria-invalid' : 'true',
                    'aria-describedby' : $thisId + '-error'
                });
            } else {
                $(this).prev().removeClass('has-error');
                $(this).next().hide();
                $(this).attr({
                    'aria-invalid' : 'false',
                    'aria-describedby' : ''
                });
            }
        });

        //Radio Buttons
        var radioCheck = true;
        $('.js-radio-validate', form).each(function() {
            //Validate field groups by name
            var radioName = $(this).attr("name");
            if($("input:radio[name="+radioName+"]:checked").length == 0){
                radioCheck = false;

                $(this).next().addClass('has-error'); //Add error class to label
                $(this).parents('.field').children('.form-error').show(); //Display the error message
                $(this).attr({ // Update the fields
                    'aria-invalid' : 'true',
                    'aria-describedby' : radioName + '-error'
                });
            }else {
                $(this).next().removeClass('has-error'); //Add error class to label
                $(this).parents('.field').children('.form-error').hide(); //Display the error message
                $(this).attr({ // Update the fields
                    'aria-invalid' : 'false',
                    'aria-describedby' : ''
                });
            }
        });

        //Validate Email Address
        var validEmail = true;
        var properEmail = true;
        var $emailError = $('#email-error-valid', form);
        var emailField = $('.js-email', form);
        $(emailField).filter(function(e){
            var emil = $('.js-email', form).val();
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if( !emailReg.test( emil ) ) {
                validEmail = false;
            } else {
                validEmail = true;
            }
        });

        if( validEmail == false  || $('.js-email', form).val() == '' ) {
            $(emailField).prev().addClass('has-error');
            $(emailField).next().show();
            $('#email').addClass('has-error').attr({
                'aria-invalid' : 'true',
                'aria-describedby' : 'email-error'
            });
            properEmail = false;
        } else {
            $(emailField).prev().removeClass('has-error');
            $(emailField).next().hide();
            $('#email').removeClass('has-error').attr({
                'aria-invalid' : 'false',
                'aria-describedby' : ''
            });
            properEmail = true;
        }

        //Submit the data OR jump to first error
        if ( isValid == false  || properEmail == false || radioCheck == false ) {
            $('.form [aria-invalid="true"]:first', form).focus();
            e.preventDefault();
        } else {
            //Allow form to be submitted
            //console.log('submit form');
            e.preventDefault();
        }

    });

    /**
     * Alphabet characters only
     */
     /*
    $(".alpha").keypress(function(e){
        var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -";
        var code;
        if (window.event) {
            code = e.keyCode;
        } else {
            code = e.which;
        }

        var char = keychar = String.fromCharCode(code);
        if (arr.indexOf(char) == -1)
            return false;
    });
    */

    $(".alpha").keypress(function(e){
    	var keyCode = e.which;
	    /*
	    Allowed
	    65-90 - (A-Z)
	    97-122 - (a-z)
	    8 - (backspace)
	    32 - (space)
	    45 - (dash)
	    0 - (tab)
	    */
	    // Not allow special
	    if( !( (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode == 8 || keyCode == 32 || keyCode == 45 || keyCode == 0 ) ) {
	    	e.preventDefault();
	    }
  	});

    /**
     * Phone Number Masking
     */
    $('.js-phone-mask').mask('(999) 999-9999');
    $('.js-zip-mask').mask("99999");
});
