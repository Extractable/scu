$(function() {
    /**
     * Modernizer Fallbacks
     */
    if (!Modernizr.objectfit) {
        $('.image_fit').each(function() {
            let $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container
                    .css('backgroundImage', 'url(' + imgUrl + ')')
                    .addClass('compat-object-fit');
            }
        });
    }

    /**
     * Form Masking
     */
    $('.js-phone-mask').mask('(999) 999-9999');
    $('.js-zip-mask').mask("99999");

    //Reset Form(s)
    $('.reset').on('click', function(e) {
        var form = $(this).closest('form');
        $(form)[0].reset();
        e.preventDefault();
    });

});
