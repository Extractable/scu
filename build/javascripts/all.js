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
/*!
 * Datepicker for Bootstrap v1.9.0 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(c,d){return function(){return d!==b&&a.fn.datepicker.deprecated(d),this[c].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;c<d;c++)if(0<=this[c].valueOf()-b&&this[c].valueOf()-b<864e5)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a.data(b,"datepicker",this),this._events=[],this._secondaryEvents=[],this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInput=this.element.is("input"),this.inputField=this.isInput?this.element:this.element.find("input"),this.component=!!this.element.hasClass("date")&&this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"),this.component&&0===this.component.length&&(this.component=!1),this.isInline=!this.component&&this.element.is("div"),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.o.calendarWeeks&&this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return Number(b)+1}),this._process_options({startDate:this._o.startDate,endDate:this._o.endDate,daysOfWeekDisabled:this.o.daysOfWeekDisabled,daysOfWeekHighlighted:this.o.daysOfWeekHighlighted,datesDisabled:this.o.datesDisabled}),this._allow_update=!1,this.setViewMode(this.o.startView),this._allow_update=!0,this.fillDow(),this.fillMonths(),this.update(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(b){return a.each(r.viewModes,function(c,d){if(b===c||-1!==a.inArray(b,d.names))return b=c,!1}),b},_resolveDaysOfWeek:function(b){return a.isArray(b)||(b=b.split(/[,\s]*/)),a.map(b,Number)},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;return a(c).length>0}catch(a){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView),e.minViewMode=this._resolveViewName(e.minViewMode),e.maxViewMode=this._resolveViewName(e.maxViewMode),e.startView=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,e.startView)),!0!==e.multidate&&(e.multidate=Number(e.multidate)||!1,!1!==e.multidate&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);e.startDate!==-1/0&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-1/0),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=this._resolveDaysOfWeek(e.daysOfWeekDisabled||[]),e.daysOfWeekHighlighted=this._resolveDaysOfWeek(e.daysOfWeekHighlighted||[]),e.datesDisabled=e.datesDisabled||[],a.isArray(e.datesDisabled)||(e.datesDisabled=e.datesDisabled.split(",")),e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var h=String(e.orientation).toLowerCase().split(/\s+/g),i=e.orientation.toLowerCase();if(h=a.grep(h,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},i&&"auto"!==i)if(1===h.length)switch(h[0]){case"top":case"bottom":e.orientation.y=h[0];break;case"left":case"right":e.orientation.x=h[0]}else i=a.grep(h,function(a){return/^left|right$/.test(a)}),e.orientation.x=i[0]||"auto",i=a.grep(h,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=i[0]||"auto";else;if(e.defaultViewDate instanceof Date||"string"==typeof e.defaultViewDate)e.defaultViewDate=r.parseDate(e.defaultViewDate,g,e.language,e.assumeNearbyYear);else if(e.defaultViewDate){var j=e.defaultViewDate.year||(new Date).getFullYear(),k=e.defaultViewDate.month||0,l=e.defaultViewDate.day||1;e.defaultViewDate=c(j,k,l)}else e.defaultViewDate=d()},_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};!0===this.o.showOnFocus&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.inputField.length?this._events=[[this.inputField,b],[this.component,{click:a.proxy(this.show,this)}]]:this._events=[[this.element,{click:a.proxy(this.show,this),keydown:a.proxy(this.keydown,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[this.picker,".prev, .next",{click:a.proxy(this.navArrowsClick,this)}],[this.picker,".day:not(.disabled)",{click:a.proxy(this.dayCellClick,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{"mousedown touchstart":a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.isInline||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,viewMode:this.viewMode,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){if(!(this.inputField.is(":disabled")||this.inputField.prop("readonly")&&!1===this.o.enableOnReadonly))return this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this},hide:function(){return this.isInline||!this.picker.is(":visible")?this:(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.setViewMode(this.o.startView),this.o.forceParse&&this.inputField.val()&&this.setValue(),this._trigger("hide"),this)},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){if(!a)return a;var b=new Date(a.getTime()+6e4*a.getTimezoneOffset());return b.getTimezoneOffset()!==a.getTimezoneOffset()&&(b=new Date(a.getTime()+6e4*b.getTimezoneOffset())),b},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&c(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate())},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return a!==b?new Date(a):null},clearDates:function(){this.inputField.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.setDates.apply(this,a.map(b,this._utc_to_local)),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy","Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),setValue:function(){var a=this.getFormattedDate();return this.inputField.val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){return this._process_options({datesDisabled:a}),this.update(),this},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=a(this.o.container),e=d.width(),f="body"===this.o.container?a(document).scrollTop():d.scrollTop(),g=d.offset(),h=[0];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==Number(b)&&h.push(Number(b))});var i=Math.max.apply(Math,h)+this.o.zIndexOffset,j=this.component?this.component.parent().offset():this.element.offset(),k=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),m=j.left-g.left,n=j.top-g.top;"body"!==this.o.container&&(n+=f),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(m-=b-l)):j.left<0?(this.picker.addClass("datepicker-orient-left"),m-=j.left-10):m+b>e?(this.picker.addClass("datepicker-orient-right"),m+=l-b):this.o.rtl?this.picker.addClass("datepicker-orient-right"):this.picker.addClass("datepicker-orient-left");var o,p=this.o.orientation.y;if("auto"===p&&(o=-f+n-c,p=o<0?"bottom":"top"),this.picker.addClass("datepicker-orient-"+p),"top"===p?n-=c+parseInt(this.picker.css("padding-top")):n+=k,this.o.rtl){var q=e-(m+l);this.picker.css({top:n,right:q,zIndex:i})}else this.picker.css({top:n,left:m,zIndex:i});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.inputField.val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.o.updateViewDate&&(this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate),d?(this.setValue(),this.element.change()):this.dates.length&&String(b)!==String(this.dates)&&d&&(this._trigger("changeDate"),this.element.change()),!this.dates.length&&b.length&&(this._trigger("clearDate"),this.element.change()),this.fill(),this},fillDow:function(){if(this.o.showWeekDays){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',-1!==a.inArray(b,this.o.daysOfWeekDisabled)&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)}},fillMonths:function(){for(var a,b=this._utc_to_local(this.viewDate),c="",d=0;d<12;d++)a=b&&b.getMonth()===d?" focused":"",c+='<span class="month'+a+'">'+q[this.o.language].monthsShort[d]+"</span>";this.picker.find(".datepicker-months td").html(c)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],f=this.viewDate.getUTCFullYear(),g=this.viewDate.getUTCMonth(),h=d();return b.getUTCFullYear()<f||b.getUTCFullYear()===f&&b.getUTCMonth()<g?c.push("old"):(b.getUTCFullYear()>f||b.getUTCFullYear()===f&&b.getUTCMonth()>g)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&e(b,h)&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),this.dateWithinRange(b)||c.push("disabled"),this.dateIsDisabled(b)&&c.push("disabled","disabled-date"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i){for(var j,k,l,m="",n=e/10,o=this.picker.find(c),p=Math.floor(f/e)*e,q=p+9*n,r=Math.floor(this.viewDate.getFullYear()/n)*n,s=a.map(this.dates,function(a){return Math.floor(a.getUTCFullYear()/n)*n}),t=p-n;t<=q+n;t+=n)j=[d],k=null,t===p-n?j.push("old"):t===q+n&&j.push("new"),-1!==a.inArray(t,s)&&j.push("active"),(t<g||t>h)&&j.push("disabled"),t===r&&j.push("focused"),i!==a.noop&&(l=i(new Date(t,0,1)),l===b?l={}:"boolean"==typeof l?l={enabled:l}:"string"==typeof l&&(l={classes:l}),!1===l.enabled&&j.push("disabled"),l.classes&&(j=j.concat(l.classes.split(/\s+/))),l.tooltip&&(k=l.tooltip)),m+='<span class="'+j.join(" ")+'"'+(k?' title="'+k+'"':"")+">"+t+"</span>";o.find(".datepicker-switch").text(p+"-"+q),o.find("td").html(m)},fill:function(){var e,f,g=new Date(this.viewDate),h=g.getUTCFullYear(),i=g.getUTCMonth(),j=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,k=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,m=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,n=q[this.o.language].today||q.en.today||"",o=q[this.o.language].clear||q.en.clear||"",p=q[this.o.language].titleFormat||q.en.titleFormat,s=d(),t=(!0===this.o.todayBtn||"linked"===this.o.todayBtn)&&s>=this.o.startDate&&s<=this.o.endDate&&!this.weekOfDateIsDisabled(s);if(!isNaN(h)&&!isNaN(i)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(g,p,this.o.language)),this.picker.find("tfoot .today").text(n).css("display",t?"table-cell":"none"),this.picker.find("tfoot .clear").text(o).css("display",!0===this.o.clearBtn?"table-cell":"none"),this.picker.find("thead .datepicker-title").text(this.o.title).css("display","string"==typeof this.o.title&&""!==this.o.title?"table-cell":"none"),this.updateNavArrows(),this.fillMonths();var u=c(h,i,0),v=u.getUTCDate();u.setUTCDate(v-(u.getUTCDay()-this.o.weekStart+7)%7);var w=new Date(u);u.getUTCFullYear()<100&&w.setUTCFullYear(u.getUTCFullYear()),w.setUTCDate(w.getUTCDate()+42),w=w.valueOf();for(var x,y,z=[];u.valueOf()<w;){if((x=u.getUTCDay())===this.o.weekStart&&(z.push("<tr>"),this.o.calendarWeeks)){var A=new Date(+u+(this.o.weekStart-x-7)%7*864e5),B=new Date(Number(A)+(11-A.getUTCDay())%7*864e5),C=new Date(Number(C=c(B.getUTCFullYear(),0,1))+(11-C.getUTCDay())%7*864e5),D=(B-C)/864e5/7+1;z.push('<td class="cw">'+D+"</td>")}y=this.getClassNames(u),y.push("day");var E=u.getUTCDate();this.o.beforeShowDay!==a.noop&&(f=this.o.beforeShowDay(this._utc_to_local(u)),f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),!1===f.enabled&&y.push("disabled"),f.classes&&(y=y.concat(f.classes.split(/\s+/))),f.tooltip&&(e=f.tooltip),f.content&&(E=f.content)),y=a.isFunction(a.uniqueSort)?a.uniqueSort(y):a.unique(y),z.push('<td class="'+y.join(" ")+'"'+(e?' title="'+e+'"':"")+' data-date="'+u.getTime().toString()+'">'+E+"</td>"),e=null,x===this.o.weekEnd&&z.push("</tr>"),u.setUTCDate(u.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").html(z.join(""));var F=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",G=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?F:h).end().find("tbody span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===h&&G.eq(b.getUTCMonth()).addClass("active")}),(h<j||h>l)&&G.addClass("disabled"),h===j&&G.slice(0,k).addClass("disabled"),h===l&&G.slice(m+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var H=this;a.each(G,function(c,d){var e=new Date(h,c,1),f=H.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),!1!==f.enabled||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,h,j,l,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,h,j,l,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,h,j,l,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a,b,c=new Date(this.viewDate),d=c.getUTCFullYear(),e=c.getUTCMonth(),f=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,g=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,h=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,i=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,j=1;switch(this.viewMode){case 4:j*=10;case 3:j*=10;case 2:j*=10;case 1:a=Math.floor(d/j)*j<=f,b=Math.floor(d/j)*j+j>h;break;case 0:a=d<=f&&e<=g,b=d>=h&&e>=i}this.picker.find(".prev").toggleClass("disabled",a),this.picker.find(".next").toggleClass("disabled",b)}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h;e=a(b.target),e.hasClass("datepicker-switch")&&this.viewMode!==this.o.maxViewMode&&this.setViewMode(this.viewMode+1),e.hasClass("today")&&!e.hasClass("day")&&(this.setViewMode(0),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("month")||e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),f=1,1===this.viewMode?(h=e.parent().find("span").index(e),g=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(h)):(h=0,g=Number(e.text()),this.viewDate.setUTCFullYear(g)),this._trigger(r.viewModes[this.viewMode-1].e,this.viewDate),this.viewMode===this.o.minViewMode?this._setDate(c(g,h,f)):(this.setViewMode(this.viewMode-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&this._focused_from.focus(),delete this._focused_from},dayCellClick:function(b){var c=a(b.currentTarget),d=c.data("date"),e=new Date(d);this.o.updateViewDate&&(e.getUTCFullYear()!==this.viewDate.getUTCFullYear()&&this._trigger("changeYear",this.viewDate),e.getUTCMonth()!==this.viewDate.getUTCMonth()&&this._trigger("changeMonth",this.viewDate)),this._setDate(e)},navArrowsClick:function(b){var c=a(b.currentTarget),d=c.hasClass("prev")?-1:1;0!==this.viewMode&&(d*=12*r.viewModes[this.viewMode].navStep),this.viewDate=this.moveMonth(this.viewDate,d),this._trigger(r.viewModes[this.viewMode].e,this.viewDate),this.fill()},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(!0===this.o.multidate||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):!1===this.o.multidate?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),(!b&&this.o.updateViewDate||"view"===b)&&(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate"),this.inputField.trigger("change"),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),c=(c+12)%12;else{for(var j=0;j<i;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void(40!==a.keyCode&&27!==a.keyCode||(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"))&&this._trigger("changeYear",this.viewDate):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"))&&this._trigger("changeMonth",this.viewDate):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?(38!==a.keyCode&&40!==a.keyCode||(b*=4),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&(38!==a.keyCode&&40!==a.keyCode||(b*=4),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}d&&(this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.inputField.trigger("change"))},setViewMode:function(a){this.viewMode=a,this.picker.children("div").hide().filter(".datepicker-"+r.viewModes[this.viewMode].clsName).show(),this.updateNavArrows(),this._trigger("changeViewMode",new Date(this.viewDate))}};var l=function(b,c){a.data(b,"datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,this.keepEmptyValues=c.keepEmptyValues,delete c.keepEmptyValues,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a.data(b,"datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},clearDates:function(){a.each(this.pickers,function(a,b){b.clearDates()})},dateUpdated:function(c){if(!this.updating){this.updating=!0;var d=a.data(c.target,"datepicker");if(d!==b){var e=d.getUTCDate(),f=this.keepEmptyValues,g=a.inArray(c.target,this.inputs),h=g-1,i=g+1,j=this.inputs.length;if(-1!==g){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b!==d&&f||b.setUTCDate(e)}),e<this.dates[h])for(;h>=0&&e<this.dates[h];)this.pickers[h--].setUTCDate(e);else if(e>this.dates[i])for(;i<j&&e>this.dates[i];)this.pickers[i++].setUTCDate(e);this.updateDates(),delete this.updating}}}},destroy:function(){a.map(this.pickers,function(a){a.destroy()}),a(this.inputs).off("changeDate",this.dateUpdated),delete this.element.data().datepicker},remove:f("destroy","Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keepEmptyValues:!1,keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-1/0,startView:0,todayBtn:!1,todayHighlight:!1,updateViewDate:!0,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&#x00AB;",rightArrow:"&#x00BB;"},showWeekDays:!0},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={viewModes:[{names:["days","month"],clsName:"days",e:"changeMonth"},{names:["months","year"],clsName:"months",e:"changeYear",navStep:1},{names:["years","decade"],clsName:"years",e:"changeDecade",navStep:10},{names:["decades","century"],clsName:"decades",e:"changeCentury",navStep:100},{names:["centuries","millennium"],clsName:"centuries",e:"changeMillennium",navStep:1e3}],validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\0").split("\0"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(c,e,f,g){function h(a,b){return!0===b&&(b=10),a<100&&(a+=2e3)>(new Date).getFullYear()+b&&(a-=100),a}function i(){var a=this.slice(0,j[n].length),b=j[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!c)return b;if(c instanceof Date)return c;if("string"==typeof e&&(e=r.parseFormat(e)),e.toValue)return e.toValue(c,e,f);var j,l,m,n,o,p={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},s={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(c in s&&(c=s[c]),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(c)){for(j=c.match(/([\-+]\d+)([dmwy])/gi),c=new Date,n=0;n<j.length;n++)l=j[n].match(/([\-+]\d+)([dmwy])/i),m=Number(l[1]),o=p[l[2].toLowerCase()],c=k.prototype[o](c,m);return k.prototype._zero_utc_time(c)}j=c&&c.match(this.nonpunctuation)||[];var t,u,v={},w=["yyyy","yy","M","MM","m","mm","d","dd"],x={yyyy:function(a,b){return a.setUTCFullYear(g?h(b,g):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;b<0;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};x.yy=x.yyyy,x.M=x.MM=x.mm=x.m,x.dd=x.d,c=d();var y=e.parts.slice();if(j.length!==y.length&&(y=a(y).filter(function(b,c){return-1!==a.inArray(c,w)}).toArray()),j.length===y.length){var z;for(n=0,z=y.length;n<z;n++){if(t=parseInt(j[n],10),l=y[n],isNaN(t))switch(l){case"MM":u=a(q[f].months).filter(i),t=a.inArray(u[0],q[f].months)+1;break;case"M":u=a(q[f].monthsShort).filter(i),t=a.inArray(u[0],q[f].monthsShort)+1}v[l]=t}var A,B;for(n=0;n<w.length;n++)(B=w[n])in v&&!isNaN(v[B])&&(A=new Date(c),x[B](A,v[B]),isNaN(A)||(c=A))}return c},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),c.toDisplay)return c.toDisplay(b,c,d);var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;g<=h;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},
headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">'+o.templates.leftArrow+'</th><th colspan="5" class="datepicker-switch"></th><th class="next">'+o.templates.rightArrow+"</th></tr></thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.9.0",a.fn.datepicker.deprecated=function(a){var b=window.console;b&&b.warn&&b.warn("DEPRECATED: "+a)},a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});
var gj={};gj.widget=function(){var a=this;a.xhr=null,a.generateGUID=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},a.mouseX=function(a){if(a){if(a.pageX)return a.pageX;if(a.clientX)return a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);if(a.touches&&a.touches.length)return a.touches[0].pageX;if(a.changedTouches&&a.changedTouches.length)return a.changedTouches[0].pageX;if(a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length)return a.originalEvent.touches[0].pageX;if(a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches.length)return a.originalEvent.touches[0].pageX}return null},a.mouseY=function(a){if(a){if(a.pageY)return a.pageY;if(a.clientY)return a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);if(a.touches&&a.touches.length)return a.touches[0].pageY;if(a.changedTouches&&a.changedTouches.length)return a.changedTouches[0].pageY;if(a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length)return a.originalEvent.touches[0].pageY;if(a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches.length)return a.originalEvent.touches[0].pageY}return null}},gj.widget.prototype.init=function(a,b){var c,d,e;this.attr("data-type",b),d=$.extend(!0,{},this.getHTMLConfig()||{}),$.extend(!0,d,a||{}),e=this.getConfig(d,b),this.attr("data-guid",e.guid),this.data(e);for(c in e)gj[b].events.hasOwnProperty(c)&&(this.on(c,e[c]),delete e[c]);for(plugin in gj[b].plugins)gj[b].plugins.hasOwnProperty(plugin)&&gj[b].plugins[plugin].configure(this,e,d);return this},gj.widget.prototype.getConfig=function(a,b){var c,d,e,f;c=$.extend(!0,{},gj[b].config.base),d=a.hasOwnProperty("uiLibrary")?a.uiLibrary:c.uiLibrary,gj[b].config[d]&&$.extend(!0,c,gj[b].config[d]),e=a.hasOwnProperty("iconsLibrary")?a.iconsLibrary:c.iconsLibrary,gj[b].config[e]&&$.extend(!0,c,gj[b].config[e]);for(f in gj[b].plugins)gj[b].plugins.hasOwnProperty(f)&&($.extend(!0,c,gj[b].plugins[f].config.base),gj[b].plugins[f].config[d]&&$.extend(!0,c,gj[b].plugins[f].config[d]),gj[b].plugins[f].config[e]&&$.extend(!0,c,gj[b].plugins[f].config[e]));return $.extend(!0,c,a),c.guid||(c.guid=this.generateGUID()),c},gj.widget.prototype.getHTMLConfig=function(){var a=this.data(),b=this[0].attributes;return b.width&&(a.width=b.width.value),b.height&&(a.height=b.height.value),b.value&&(a.value=b.value.value),b.align&&(a.align=b.align.value),a&&a.source&&(a.dataSource=a.source,delete a.source),a},gj.widget.prototype.createDoneHandler=function(){var a=this;return function(b){"string"==typeof b&&JSON&&(b=JSON.parse(b)),gj[a.data("type")].methods.render(a,b)}},gj.widget.prototype.createErrorHandler=function(){return function(a){a&&a.statusText&&"abort"!==a.statusText&&alert(a.statusText)}},gj.widget.prototype.reload=function(a){var b,c,d=this.data(),e=this.data("type");return void 0===d.dataSource&&gj[e].methods.useHtmlDataSource(this,d),$.extend(d.params,a),$.isArray(d.dataSource)?(c=gj[e].methods.filter(this),gj[e].methods.render(this,c)):"string"==typeof d.dataSource?(b={url:d.dataSource,data:d.params},this.xhr&&this.xhr.abort(),this.xhr=$.ajax(b).done(this.createDoneHandler()).fail(this.createErrorHandler())):"object"==typeof d.dataSource&&(d.dataSource.data||(d.dataSource.data={}),$.extend(d.dataSource.data,d.params),b=$.extend(!0,{},d.dataSource),"json"===b.dataType&&"object"==typeof b.data&&(b.data=JSON.stringify(b.data)),b.success||(b.success=this.createDoneHandler()),b.error||(b.error=this.createErrorHandler()),this.xhr&&this.xhr.abort(),this.xhr=$.ajax(b)),this},gj.documentManager={events:{},subscribeForEvent:function(a,b,c){if(gj.documentManager.events[a]&&0!==gj.documentManager.events[a].length){if(gj.documentManager.events[a][b])throw"Event "+a+' for widget with guid="'+b+'" is already attached.';gj.documentManager.events[a].push({widgetId:b,callback:c})}else gj.documentManager.events[a]=[{widgetId:b,callback:c}],$(document).on(a,gj.documentManager.executeCallbacks)},executeCallbacks:function(a){var b=gj.documentManager.events[a.type];if(b)for(var c=0;c<b.length;c++)b[c].callback(a)},unsubscribeForEvent:function(a,b){var c=!1,d=gj.documentManager.events[a];if(d)for(var e=0;e<d.length;e++)d[e].widgetId===b&&(d.splice(e,1),c=!0,0===d.length&&($(document).off(a),delete gj.documentManager.events[a]));if(!c)throw'The "'+a+'" for widget with guid="'+b+"\" can't be removed."}},gj.core={messages:{"en-us":{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthShortNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekDaysMin:["S","M","T","W","T","F","S"],weekDaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],am:"AM",pm:"PM",ok:"Ok",cancel:"Cancel",titleFormat:"mmmm yyyy"}},parseDate:function(a,b,c){var d,e,f,g,h=0,i=0,j=1,k=0,l=0;if(a&&"string"==typeof a){if(/^\d+$/.test(a))g=new Date(a);else if(a.indexOf("/Date(")>-1)g=new Date(parseInt(a.substr(6),10));else if(a){for(f=b.split(/[\s,-\.\/\/\:]+/),e=a.split(/[\s]+/),e.length!=f.length&&(e=a.split(/[\s,-\.\/\/\:]+/)),d=0;d<f.length;d++)["d","dd"].indexOf(f[d])>-1?j=parseInt(e[d],10):["m","mm"].indexOf(f[d])>-1?i=parseInt(e[d],10)-1:"mmm"===f[d]?i=gj.core.messages[c||"en-us"].monthShortNames.indexOf(e[d]):"mmmm"===f[d]?i=gj.core.messages[c||"en-us"].monthNames.indexOf(e[d]):["yy","yyyy"].indexOf(f[d])>-1?(h=parseInt(e[d],10),"yy"===f[d]&&(h+=2e3)):["h","hh","H","HH"].indexOf(f[d])>-1?k=parseInt(e[d],10):["M","MM"].indexOf(f[d])>-1&&(l=parseInt(e[d],10));g=new Date(h,i,j,k,l)}}else"number"==typeof a?g=new Date(a):a instanceof Date&&(g=a);return g},formatDate:function(a,b,c){var d,e,f="",g=b.split(/[\s,-\.\/\/\:]+/),h=b.split(/s+|M+|H+|h+|t+|T+|d+|m+|y+/);for(h=h.splice(1,h.length-2),i=0;i<g.length;i++)switch(d=h[i]||"",g[i]){case"s":f+=a.getSeconds()+d;break;case"ss":f+=gj.core.pad(a.getSeconds())+d;break;case"M":f+=a.getMinutes()+d;break;case"MM":f+=gj.core.pad(a.getMinutes())+d;break;case"H":f+=a.getHours()+d;break;case"HH":f+=gj.core.pad(a.getHours())+d;break;case"h":e=a.getHours()>12?a.getHours()%12:a.getHours(),f+=e+d;break;case"hh":e=a.getHours()>12?a.getHours()%12:a.getHours(),f+=gj.core.pad(e)+d;break;case"tt":f+=(a.getHours()>=12?"pm":"am")+d;break;case"TT":f+=(a.getHours()>=12?"PM":"AM")+d;break;case"d":f+=a.getDate()+d;break;case"dd":f+=gj.core.pad(a.getDate())+d;break;case"ddd":f+=gj.core.messages[c||"en-us"].weekDaysShort[a.getDay()]+d;break;case"dddd":f+=gj.core.messages[c||"en-us"].weekDays[a.getDay()]+d;break;case"m":f+=a.getMonth()+1+d;break;case"mm":f+=gj.core.pad(a.getMonth()+1)+d;break;case"mmm":f+=gj.core.messages[c||"en-us"].monthShortNames[a.getMonth()]+d;break;case"mmmm":f+=gj.core.messages[c||"en-us"].monthNames[a.getMonth()]+d;break;case"yy":f+=a.getFullYear().toString().substr(2)+d;break;case"yyyy":f+=a.getFullYear()+d}return f},pad:function(a,b){for(a=String(a),b=b||2;a.length<b;)a="0"+a;return a},center:function(a){var b=$(window).width()/2-a.width()/2,c=$(window).height()/2-a.height()/2;a.css("position","absolute"),a.css("left",b>0?b:0),a.css("top",c>0?c:0)},isIE:function(){return!!navigator.userAgent.match(/Trident/g)||!!navigator.userAgent.match(/MSIE/g)},setChildPosition:function(a,b){var c=a.getBoundingClientRect(),d=gj.core.height(a,!0),e=gj.core.height(b,!0),f=gj.core.width(a,!0),g=gj.core.width(b,!0),h=window.scrollY||window.pageYOffset||0,i=window.scrollX||window.pageXOffset||0;c.top+d+e>window.innerHeight&&c.top>e?b.style.top=Math.round(c.top+h-e-3)+"px":b.style.top=Math.round(c.top+h+d+3)+"px",c.left+g>document.body.clientWidth?b.style.left=Math.round(c.left+i+f-g)+"px":b.style.left=Math.round(c.left+i)+"px"},height:function(a,b){var c,d=window.getComputedStyle(a);return"border-box"===d.boxSizing?(c=parseInt(d.height,10),gj.core.isIE()&&(c+=parseInt(d.paddingTop||0,10)+parseInt(d.paddingBottom||0,10),c+=parseInt(d.borderTopWidth||0,10)+parseInt(d.borderBottomWidth||0,10))):(c=parseInt(d.height,10),c+=parseInt(d.paddingTop||0,10)+parseInt(d.paddingBottom||0,10),c+=parseInt(d.borderTopWidth||0,10)+parseInt(d.borderBottomWidth||0,10)),b&&(c+=parseInt(d.marginTop||0,10)+parseInt(d.marginBottom||0,10)),c},width:function(a,b){var c,d=window.getComputedStyle(a);return"border-box"===d.boxSizing?c=parseInt(d.width,10):(c=parseInt(d.width,10),c+=parseInt(d.paddingLeft||0,10)+parseInt(d.paddingRight||0,10),c+=parseInt(d.borderLeftWidth||0,10)+parseInt(d.borderRightWidth||0,10)),b&&(c+=parseInt(d.marginLeft||0,10)+parseInt(d.marginRight||0,10)),c},addClasses:function(a,b){var c,d;if(b)for(d=b.split(" "),c=0;c<d.length;c++)a.classList.add(d[c])},position:function(a){for(var b,c,d=0,e=0,f=gj.core.height(a),g=gj.core.width(a);a;)"BODY"==a.tagName?(b=a.scrollLeft||document.documentElement.scrollLeft,c=a.scrollTop||document.documentElement.scrollTop,d+=a.offsetLeft-b,e+=a.offsetTop-c):(d+=a.offsetLeft-a.scrollLeft,e+=a.offsetTop-a.scrollTop),a=a.offsetParent;return{top:e,left:d,bottom:e+f,right:d+g}},setCaretAtEnd:function(a){var b;if(a)if(b=a.value.length,document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-b),c.moveStart("character",b),c.moveEnd("character",0),c.select()}else(a.selectionStart||"0"==a.selectionStart)&&(a.selectionStart=b,a.selectionEnd=b,a.focus())},getScrollParent:function(a){return null==a?null:a.scrollHeight>a.clientHeight?a:gj.core.getScrollParent(a.parentNode)}},gj.picker={messages:{"en-us":{}}},gj.picker.methods={initialize:function(a,b,c){var d,e=c.createPicker(a,b),f=a.parent('div[role="wrapper"]');d="bootstrap"===b.uiLibrary?$('<span class="input-group-addon">'+b.icons.rightIcon+"</span>"):"bootstrap4"===b.uiLibrary?$('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">'+b.icons.rightIcon+"</button></span>"):$(b.icons.rightIcon),d.attr("role","right-icon"),0===f.length?(f=$('<div role="wrapper" />').addClass(b.style.wrapper),a.wrap(f)):f.addClass(b.style.wrapper),f=a.parent('div[role="wrapper"]'),b.width&&f.css("width",b.width),a.val(b.value).addClass(b.style.input).attr("role","input"),b.fontSize&&a.css("font-size",b.fontSize),"bootstrap"===b.uiLibrary||"bootstrap4"===b.uiLibrary?"small"===b.size?(f.addClass("input-group-sm"),a.addClass("form-control-sm")):"large"===b.size&&(f.addClass("input-group-lg"),a.addClass("form-control-lg")):"small"===b.size?f.addClass("small"):"large"===b.size&&f.addClass("large"),d.on("click",function(b){e.is(":visible")?a.close():a.open()}),f.append(d),!0!==b.footer&&(a.on("blur",function(){a.timeout=setTimeout(function(){a.close()},500)}),e.mousedown(function(){return clearTimeout(a.timeout),a.focus(),!1}),e.on("click",function(){clearTimeout(a.timeout),a.focus()}))}},gj.picker.widget=function(a,b){var c=this,d=gj.picker.methods;return c.destroy=function(){return d.destroy(this)},a},gj.picker.widget.prototype=new gj.widget,gj.picker.widget.constructor=gj.picker.widget,gj.picker.widget.prototype.init=function(a,b,c){return gj.widget.prototype.init.call(this,a,b),this.attr("data-"+b,"true"),gj.picker.methods.initialize(this,this.data(),gj[b].methods),this},gj.picker.widget.prototype.open=function(a){var b=this.data(),c=$("body").find('[role="picker"][guid="'+this.attr("data-guid")+'"]');return c.show(),c.closest('div[role="modal"]').show(),b.modal?gj.core.center(c):(gj.core.setChildPosition(this[0],c[0]),this.focus()),clearTimeout(this.timeout),gj[a].events.open(this),this},gj.picker.widget.prototype.close=function(a){var b=$("body").find('[role="picker"][guid="'+this.attr("data-guid")+'"]');return b.hide(),b.closest('div[role="modal"]').hide(),gj[a].events.close(this),this},gj.picker.widget.prototype.destroy=function(a){var b=this.data(),c=this.parent(),d=$("body").find('[role="picker"][guid="'+this.attr("data-guid")+'"]');return b&&(this.off(),d.parent('[role="modal"]').length>0&&d.unwrap(),d.remove(),this.removeData(),this.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-"+a),this.removeClass(),c.children('[role="right-icon"]').remove(),this.unwrap()),this},gj.dialog={plugins:{},messages:{}},gj.dialog.config={base:{autoOpen:!0,closeButtonInHeader:!0,closeOnEscape:!0,draggable:!0,height:"auto",locale:"en-us",maxHeight:void 0,maxWidth:void 0,minHeight:void 0,minWidth:void 0,modal:!1,resizable:!1,scrollable:!1,title:void 0,uiLibrary:void 0,width:300,style:{modal:"gj-modal",content:"gj-dialog-md",header:"gj-dialog-md-header gj-unselectable",headerTitle:"gj-dialog-md-title",headerCloseButton:"gj-dialog-md-close",body:"gj-dialog-md-body",footer:"gj-dialog-footer gj-dialog-md-footer"}},bootstrap:{style:{modal:"modal",content:"modal-content gj-dialog-bootstrap",header:"modal-header",headerTitle:"modal-title",headerCloseButton:"close",body:"modal-body",footer:"gj-dialog-footer modal-footer"}},bootstrap4:{style:{modal:"modal",content:"modal-content gj-dialog-bootstrap4",header:"modal-header",headerTitle:"modal-title",headerCloseButton:"close",body:"modal-body",footer:"gj-dialog-footer modal-footer"}}},gj.dialog.events={initialized:function(a){a.trigger("initialized")},opening:function(a){a.trigger("opening")},opened:function(a){a.trigger("opened")},closing:function(a){a.trigger("closing")},closed:function(a){a.trigger("closed")},drag:function(a){a.trigger("drag")},dragStart:function(a){a.trigger("dragStart")},dragStop:function(a){a.trigger("dragStop")},resize:function(a){a.trigger("resize")},resizeStart:function(a){a.trigger("resizeStart")},resizeStop:function(a){a.trigger("resizeStop")}},gj.dialog.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"dialog"),gj.dialog.methods.localization(this),gj.dialog.methods.initialize(this),gj.dialog.events.initialized(this),this},localization:function(a){var b=a.data();void 0===b.title&&(b.title=gj.dialog.messages[b.locale].DefaultTitle)},getHTMLConfig:function(){var a=gj.widget.prototype.getHTMLConfig.call(this),b=this[0].attributes;return b.title&&(a.title=b.title.value),a},initialize:function(a){var b,c,d,e=a.data();a.addClass(e.style.content),gj.dialog.methods.setSize(a),e.closeOnEscape&&$(document).keyup(function(b){27===b.keyCode&&a.close()}),c=a.children('div[data-role="body"]'),0===c.length?(c=$('<div data-role="body"/>').addClass(e.style.body),a.wrapInner(c)):c.addClass(e.style.body),b=gj.dialog.methods.renderHeader(a),d=a.children('div[data-role="footer"]').addClass(e.style.footer),a.find('[data-role="close"]').on("click",function(){a.close()}),gj.draggable&&(e.draggable&&gj.dialog.methods.draggable(a,b),e.resizable&&gj.dialog.methods.resizable(a)),e.scrollable&&e.height&&(a.addClass("gj-dialog-scrollable"),a.on("opened",function(){a.children('div[data-role="body"]').css("height",e.height-b.outerHeight()-(d.length?d.outerHeight():0))})),gj.core.center(a),e.modal&&a.wrapAll('<div data-role="modal" class="'+e.style.modal+'"/>'),e.autoOpen&&a.open()},setSize:function(a){var b=a.data();b.width&&a.css("width",b.width),b.height&&a.css("height",b.height)},renderHeader:function(a){var b,c,d,e=a.data();return b=a.children('div[data-role="header"]'),0===b.length&&(b=$('<div data-role="header" />'),a.prepend(b)),b.addClass(e.style.header),c=b.find('[data-role="title"]'),0===c.length&&(c=$('<h4 data-role="title">'+e.title+"</h4>"),b.append(c)),c.addClass(e.style.headerTitle),d=b.find('[data-role="close"]'),0===d.length&&e.closeButtonInHeader?(d=$('<button type="button" data-role="close" title="'+gj.dialog.messages[e.locale].Close+'"><span>×</span></button>'),d.addClass(e.style.headerCloseButton),b.append(d)):d.length>0&&!1===e.closeButtonInHeader?d.hide():d.addClass(e.style.headerCloseButton),b},draggable:function(a,b){a.appendTo("body"),b.addClass("gj-draggable"),a.draggable({handle:b,start:function(){a.addClass("gj-unselectable"),gj.dialog.events.dragStart(a)},stop:function(){a.removeClass("gj-unselectable"),gj.dialog.events.dragStop(a)}})},resizable:function(a){var b={drag:gj.dialog.methods.resize,start:function(){a.addClass("gj-unselectable"),gj.dialog.events.resizeStart(a)},stop:function(){this.removeAttribute("style"),a.removeClass("gj-unselectable"),gj.dialog.events.resizeStop(a)}};a.append($('<div class="gj-resizable-handle gj-resizable-n"></div>').draggable($.extend(!0,{horizontal:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-e"></div>').draggable($.extend(!0,{vertical:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-s"></div>').draggable($.extend(!0,{horizontal:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-w"></div>').draggable($.extend(!0,{vertical:!1},b))),a.append($('<div class="gj-resizable-handle gj-resizable-ne"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-nw"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-sw"></div>').draggable($.extend(!0,{},b))),a.append($('<div class="gj-resizable-handle gj-resizable-se"></div>').draggable($.extend(!0,{},b)))},resize:function(a,b){var c,d,e,f,g,h,i,j,k=!1;return c=$(this),d=c.parent(),e=gj.core.position(this),offset={top:b.top-e.top,left:b.left-e.left},f=d.data(),c.hasClass("gj-resizable-n")?(g=d.height()-offset.top,i=d.offset().top+offset.top):c.hasClass("gj-resizable-e")?h=d.width()+offset.left:c.hasClass("gj-resizable-s")?g=d.height()+offset.top:c.hasClass("gj-resizable-w")?(h=d.width()-offset.left,j=d.offset().left+offset.left):c.hasClass("gj-resizable-ne")?(g=d.height()-offset.top,i=d.offset().top+offset.top,h=d.width()+offset.left):c.hasClass("gj-resizable-nw")?(g=d.height()-offset.top,i=d.offset().top+offset.top,h=d.width()-offset.left,j=d.offset().left+offset.left):c.hasClass("gj-resizable-se")?(g=d.height()+offset.top,h=d.width()+offset.left):c.hasClass("gj-resizable-sw")&&(g=d.height()+offset.top,h=d.width()-offset.left,j=d.offset().left+offset.left),g&&(!f.minHeight||g>=f.minHeight)&&(!f.maxHeight||g<=f.maxHeight)&&(d.height(g),i&&d.css("top",i),k=!0),h&&(!f.minWidth||h>=f.minWidth)&&(!f.maxWidth||h<=f.maxWidth)&&(d.width(h),j&&d.css("left",j),k=!0),k&&gj.dialog.events.resize(d),k},open:function(a,b){var c;return gj.dialog.events.opening(a),a.css("display","block"),a.closest('div[data-role="modal"]').css("display","block"),c=a.children('div[data-role="footer"]'),c.length&&c.outerHeight()&&a.children('div[data-role="body"]').css("margin-bottom",c.outerHeight()),void 0!==b&&a.find('[data-role="title"]').html(b),gj.dialog.events.opened(a),a},close:function(a){return a.is(":visible")&&(gj.dialog.events.closing(a),a.css("display","none"),a.closest('div[data-role="modal"]').css("display","none"),gj.dialog.events.closed(a)),a},isOpen:function(a){return a.is(":visible")},content:function(a,b){var c=a.children('div[data-role="body"]');return void 0===b?c.html():c.html(b)},destroy:function(a,b){var c=a.data();return c&&(!1===b?a.remove():(a.close(),a.off(),a.removeData(),a.removeAttr("data-type"),a.removeClass(c.style.content),a.find('[data-role="header"]').removeClass(c.style.header),a.find('[data-role="title"]').removeClass(c.style.headerTitle),a.find('[data-role="close"]').remove(),a.find('[data-role="body"]').removeClass(c.style.body),a.find('[data-role="footer"]').removeClass(c.style.footer))),a}},gj.dialog.widget=function(a,b){var c=this,d=gj.dialog.methods;return c.open=function(a){return d.open(this,a)},c.close=function(){return d.close(this)},c.isOpen=function(){return d.isOpen(this)},c.content=function(a){return d.content(this,a)},c.destroy=function(a){return d.destroy(this,a)},$.extend(a,c),"dialog"!==a.attr("data-type")&&d.init.call(a,b),a},gj.dialog.widget.prototype=new gj.widget,gj.dialog.widget.constructor=gj.dialog.widget,gj.dialog.widget.prototype.getHTMLConfig=gj.dialog.methods.getHTMLConfig,function(a){a.fn.dialog=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.dialog.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.dialog.widget(this,a)}}}(jQuery),gj.dialog.messages["en-us"]={Close:"Close",DefaultTitle:"Dialog"},gj.draggable={plugins:{}},gj.draggable.config={base:{handle:void 0,vertical:!0,horizontal:!0,containment:void 0}},gj.draggable.methods={init:function(a){var b,c,d=this;return gj.widget.prototype.init.call(this,a,"draggable"),c=this.data(),d.attr("data-draggable","true"),b=gj.draggable.methods.getHandleElement(d),b.on("touchstart mousedown",function(a){var e=gj.core.position(d[0]);d[0].style.top=e.top+"px",d[0].style.left=e.left+"px",d[0].style.position="fixed",d.attr("draggable-dragging",!0),d.removeAttr("draggable-x").removeAttr("draggable-y"),gj.documentManager.subscribeForEvent("touchmove",d.data("guid"),gj.draggable.methods.createMoveHandler(d,b,c)),gj.documentManager.subscribeForEvent("mousemove",d.data("guid"),gj.draggable.methods.createMoveHandler(d,b,c))}),gj.documentManager.subscribeForEvent("mouseup",d.data("guid"),gj.draggable.methods.createUpHandler(d)),gj.documentManager.subscribeForEvent("touchend",d.data("guid"),gj.draggable.methods.createUpHandler(d)),gj.documentManager.subscribeForEvent("touchcancel",d.data("guid"),gj.draggable.methods.createUpHandler(d)),d},getHandleElement:function(a){var b=a.data("handle");return b&&b.length?b:a},createUpHandler:function(a){return function(b){"true"===a.attr("draggable-dragging")&&(a.attr("draggable-dragging",!1),gj.documentManager.unsubscribeForEvent("mousemove",a.data("guid")),gj.documentManager.unsubscribeForEvent("touchmove",a.data("guid")),gj.draggable.events.stop(a,{x:a.mouseX(b),y:a.mouseY(b)}))}},createMoveHandler:function(a,b,c){return function(b){var d,e,f,g,h,i;"true"===a.attr("draggable-dragging")&&(d=Math.round(a.mouseX(b)),e=Math.round(a.mouseY(b)),h=a.attr("draggable-x"),i=a.attr("draggable-y"),h&&i?(f=c.horizontal?d-parseInt(h,10):0,g=c.vertical?e-parseInt(i,10):0,gj.draggable.methods.move(a[0],c,f,g,d,e)):gj.draggable.events.start(a,d,e),a.attr("draggable-x",d),a.attr("draggable-y",e))}},move:function(a,b,c,d,e,f){var g,h,i,j=gj.core.position(a),k=j.top+d,l=j.left+c;b.containment&&(g=gj.core.position(b.containment),h=g.top+gj.core.height(b.containment)-gj.core.height(a),i=g.left+gj.core.width(b.containment)-gj.core.width(a),k>g.top&&k<h?(g.top>=f||g.bottom<=f)&&(k=j.top):k=k<=g.top?g.top+1:h-1,l>g.left&&l<i?(g.left>=e||g.right<=e)&&(l=j.left):l=l<=g.left?g.left+1:i-1),!1!==gj.draggable.events.drag($(a),l,k,e,f)&&(a.style.top=k+"px",a.style.left=l+"px")},destroy:function(a){return"true"===a.attr("data-draggable")&&(gj.documentManager.unsubscribeForEvent("mouseup",a.data("guid")),a.removeData(),a.removeAttr("data-guid").removeAttr("data-type").removeAttr("data-draggable"),a.removeAttr("draggable-x").removeAttr("draggable-y").removeAttr("draggable-dragging"),a[0].style.top="",a[0].style.left="",a[0].style.position="",a.off("drag").off("start").off("stop"),gj.draggable.methods.getHandleElement(a).off("mousedown")),a}},gj.draggable.events={drag:function(a,b,c,d,e){return a.triggerHandler("drag",[{left:b,top:c},{x:d,y:e}])},start:function(a,b,c){a.triggerHandler("start",[{x:b,y:c}])},stop:function(a,b){a.triggerHandler("stop",[b])}},gj.draggable.widget=function(a,b){var c=this,d=gj.draggable.methods;return a.destroy||(c.destroy=function(){return d.destroy(this)}),$.extend(a,c),"true"!==a.attr("data-draggable")&&d.init.call(a,b),a},gj.draggable.widget.prototype=new gj.widget,gj.draggable.widget.constructor=gj.draggable.widget,function(a){a.fn.draggable=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.draggable.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.draggable.widget(this,a)}}}(jQuery),gj.droppable={plugins:{}},gj.droppable.config={hoverClass:void 0},gj.droppable.methods={init:function(a){var b=this;return gj.widget.prototype.init.call(this,a,"droppable"),b.attr("data-droppable","true"),gj.documentManager.subscribeForEvent("mousedown",b.data("guid"),gj.droppable.methods.createMouseDownHandler(b)),gj.documentManager.subscribeForEvent("mousemove",b.data("guid"),gj.droppable.methods.createMouseMoveHandler(b)),gj.documentManager.subscribeForEvent("mouseup",b.data("guid"),gj.droppable.methods.createMouseUpHandler(b)),b},createMouseDownHandler:function(a){return function(b){a.isDragging=!0}},createMouseMoveHandler:function(a){return function(b){if(a.isDragging){var c=a.data("hoverClass"),d={x:a.mouseX(b),y:a.mouseY(b)},e=gj.droppable.methods.isOver(a,d);e!=a.isOver&&(e?(c&&a.addClass(c),gj.droppable.events.over(a,d)):(c&&a.removeClass(c),gj.droppable.events.out(a))),a.isOver=e}}},createMouseUpHandler:function(a){return function(b){var c={left:a.mouseX(b),top:a.mouseY(b)};a.isDragging=!1,gj.droppable.methods.isOver(a,c)&&gj.droppable.events.drop(a)}},isOver:function(a,b){var c=a.offset().top,d=a.offset().left;return b.x>d&&b.x<d+a.outerWidth(!0)&&b.y>c&&b.y<c+a.outerHeight(!0)},destroy:function(a){return"true"===a.attr("data-droppable")&&(gj.documentManager.unsubscribeForEvent("mousedown",a.data("guid")),gj.documentManager.unsubscribeForEvent("mousemove",a.data("guid")),gj.documentManager.unsubscribeForEvent("mouseup",a.data("guid")),a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-droppable"),a.off("drop").off("over").off("out")),a}},gj.droppable.events={drop:function(a,b,c){a.trigger("drop",[{top:c,left:b}])},over:function(a,b){a.trigger("over",[b])},out:function(a){a.trigger("out")}},gj.droppable.widget=function(a,b){var c=this,d=gj.droppable.methods;return c.isOver=!1,c.isDragging=!1,c.destroy=function(){return d.destroy(this)},c.isOver=function(a){return d.isOver(this,a)},$.extend(a,c),"true"!==a.attr("data-droppable")&&d.init.call(a,b),a},gj.droppable.widget.prototype=new gj.widget,gj.droppable.widget.constructor=gj.droppable.widget,function(a){a.fn.droppable=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.droppable.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.droppable.widget(this,a)}}}(jQuery),gj.grid={plugins:{},messages:{}},gj.grid.config={base:{dataSource:void 0,columns:[],autoGenerateColumns:!1,defaultColumnSettings:{hidden:!1,width:void 0,sortable:!1,type:"text",title:void 0,field:void 0,align:void 0,cssClass:void 0,headerCssClass:void 0,tooltip:void 0,icon:void 0,events:void 0,format:"mm/dd/yyyy",decimalDigits:void 0,tmpl:void 0,stopPropagation:!1,renderer:void 0,filter:void 0},mapping:{dataField:"records",totalRecordsField:"total"},params:{},paramNames:{sortBy:"sortBy",direction:"direction"},uiLibrary:"materialdesign",iconsLibrary:"materialicons",selectionType:"single",selectionMethod:"basic",autoLoad:!0,notFoundText:void 0,width:void 0,minWidth:void 0,headerRowHeight:"fixed",bodyRowHeight:"autogrow",fontSize:void 0,primaryKey:void 0,locale:"en-us",defaultIconColumnWidth:70,defaultCheckBoxColumnWidth:70,style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-md",loadingCover:"gj-grid-loading-cover",loadingText:"gj-grid-loading-text",header:{cell:void 0,sortable:"gj-cursor-pointer gj-unselectable"},content:{rowSelected:"gj-grid-md-select"}},icons:{asc:"▲",desc:"▼"}},bootstrap:{style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-bootstrap gj-grid-bootstrap-3 table table-bordered table-hover",content:{rowSelected:"active"}},iconsLibrary:"glyphicons",defaultIconColumnWidth:34,defaultCheckBoxColumnWidth:36},bootstrap4:{style:{wrapper:"gj-grid-wrapper",table:"gj-grid gj-grid-bootstrap gj-grid-bootstrap-4 table table-bordered table-hover",content:{rowSelected:"active"}},defaultIconColumnWidth:42,defaultCheckBoxColumnWidth:44},materialicons:{icons:{asc:'<i class="gj-icon arrow-upward" />',desc:'<i class="gj-icon arrow-downward" />'}},fontawesome:{icons:{asc:'<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>',desc:'<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>'}},glyphicons:{icons:{asc:'<span class="glyphicon glyphicon-sort-by-alphabet" />',desc:'<span class="glyphicon glyphicon-sort-by-alphabet-alt" />'}}},gj.grid.events={beforeEmptyRowInsert:function(a,b){return a.triggerHandler("beforeEmptyRowInsert",[b])},dataBinding:function(a,b){return a.triggerHandler("dataBinding",[b])},dataBound:function(a,b,c){return a.triggerHandler("dataBound",[b,c])},rowDataBound:function(a,b,c,d){return a.triggerHandler("rowDataBound",[b,c,d])},cellDataBound:function(a,b,c,d,e){return a.triggerHandler("cellDataBound",[b,c,d,e])},rowSelect:function(a,b,c,d){return a.triggerHandler("rowSelect",[b,c,d])},rowUnselect:function(a,b,c,d){return a.triggerHandler("rowUnselect",[b,c,d])},rowRemoving:function(a,b,c,d){return a.triggerHandler("rowRemoving",[b,c,d])},destroying:function(a){return a.triggerHandler("destroying")},columnHide:function(a,b){return a.triggerHandler("columnHide",[b])},columnShow:function(a,b){return a.triggerHandler("columnShow",[b])},initialized:function(a){return a.triggerHandler("initialized")},dataFiltered:function(a,b){return a.triggerHandler("dataFiltered",[b])}},gj.grid.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"grid"),gj.grid.methods.initialize(this),this.data("autoLoad")&&this.reload(),this},getConfig:function(a,b){var c=gj.widget.prototype.getConfig.call(this,a,b);return gj.grid.methods.setDefaultColumnConfig(c.columns,c.defaultColumnSettings),c},setDefaultColumnConfig:function(a,b){var c,d;if(a&&a.length)for(d=0;d<a.length;d++)c=$.extend(!0,{},b),$.extend(!0,c,a[d]),a[d]=c},getHTMLConfig:function(){var a=gj.widget.prototype.getHTMLConfig.call(this);return a.columns=[],this.find("thead > tr > th").each(function(){var b=$(this),c=b.text(),d=gj.widget.prototype.getHTMLConfig.call(b);d.title=c,d.field||(d.field=c),d.events&&(d.events=gj.grid.methods.eventsParser(d.events)),a.columns.push(d)}),a},eventsParser:function(events){var result={},list,i,key,func,position;for(list=events.split(","),i=0;i<list.length;i++)(position=list[i].indexOf(":"))>0&&(key=$.trim(list[i].substr(0,position)),func=$.trim(list[i].substr(position+1,list[i].length)),result[key]=eval("window."+func));return result},initialize:function(a){var b=a.data(),c=a.parent('div[data-role="wrapper"]');gj.grid.methods.localization(b),0===c.length?(c=$('<div data-role="wrapper" />').addClass(b.style.wrapper),a.wrap(c)):c.addClass(b.style.wrapper),b.width&&a.parent().css("width",b.width),b.minWidth&&a.css("min-width",b.minWidth),b.fontSize&&a.css("font-size",b.fontSize),"autogrow"===b.headerRowHeight&&a.addClass("autogrow-header-row"),"fixed"===b.bodyRowHeight&&a.addClass("fixed-body-rows"),a.addClass(b.style.table),"checkbox"===b.selectionMethod&&b.columns.splice(gj.grid.methods.getColumnPositionNotInRole(a),0,{title:"",width:b.defaultCheckBoxColumnWidth,align:"center",type:"checkbox",role:"selectRow",events:{click:function(b){gj.grid.methods.setSelected(a,b.data.id,$(this).closest("tr"))}},headerCssClass:"gj-grid-select-all",stopPropagation:!0}),0===a.children("tbody").length&&a.append($("<tbody/>")),gj.grid.methods.renderHeader(a),gj.grid.methods.appendEmptyRow(a,"&nbsp;"),gj.grid.events.initialized(a)},localization:function(a){a.notFoundText||(a.notFoundText=gj.grid.messages[a.locale].NoRecordsFound)},renderHeader:function(a){var b,c,d,e,f,g,h,i,j;for(b=a.data(),c=b.columns,d=b.style.header,e=a.children("thead"),0===e.length&&(e=$("<thead />"),a.prepend(e)),f=$('<tr data-role="caption" />'),i=0;i<c.length;i+=1)g=$('<th data-field="'+(c[i].field||"")+'" />'),c[i].width?g.attr("width",c[i].width):"checkbox"===c[i].type&&g.attr("width",b.defaultIconColumnWidth),g.addClass(d.cell),c[i].headerCssClass&&g.addClass(c[i].headerCssClass),g.css("text-align",c[i].align||"left"),"checkbox"===b.selectionMethod&&"multiple"===b.selectionType&&"checkbox"===c[i].type&&"selectRow"===c[i].role?(j=g.find('input[data-role="selectAll"]'),0===j.length&&(j=$('<input type="checkbox" data-role="selectAll" />'),g.append(j),j.checkbox({uiLibrary:b.uiLibrary})),j.off("click").on("click",function(){this.checked?a.selectAll():a.unSelectAll()})):(h=$('<div data-role="title"/>').html(void 0===c[i].title?c[i].field:c[i].title),g.append(h),c[i].sortable&&(h.addClass(d.sortable),h.on("click",gj.grid.methods.createSortHandler(a,c[i])))),c[i].hidden&&g.hide(),f.append(g);e.empty().append(f)},createSortHandler:function(a,b){return function(){var c,d={};a.count()>0&&(c=a.data(),d[c.paramNames.sortBy]=b.field,b.direction="asc"===b.direction?"desc":"asc",d[c.paramNames.direction]=b.direction,a.reload(d))}},updateHeader:function(a){var b,c,d=a.data(),e=d.params[d.paramNames.sortBy],f=d.params[d.paramNames.direction];a.find('thead tr th [data-role="sorticon"]').remove(),e&&(position=gj.grid.methods.getColumnPosition(a.data("columns"),e),position>-1&&(c=a.find("thead tr th:eq("+position+') div[data-role="title"]'),b=$('<div data-role="sorticon" class="gj-unselectable" />').append("desc"===f?d.icons.desc:d.icons.asc),c.after(b)))},useHtmlDataSource:function(a,b){var c,d,e,f,g=[],h=a.find('tbody tr[data-role != "empty"]');for(c=0;c<h.length;c++){for(e=$(h[c]).find("td"),f={},d=0;d<e.length;d++)f[b.columns[d].field]=$(e[d]).html();g.push(f)}b.dataSource=g},startLoading:function(a){var b,c,d,e,f,g,h;gj.grid.methods.stopLoading(a),h=a.data(),0!==a.outerHeight()&&(b=a.children("tbody"),e=b.outerWidth(!1),f=b.outerHeight(!1),g=Math.abs(a.parent().offset().top-b.offset().top),c=$('<div data-role="loading-cover" />').addClass(h.style.loadingCover).css({width:e,height:f,top:g}),d=$('<div data-role="loading-text">'+gj.grid.messages[h.locale].Loading+"</div>").addClass(h.style.loadingText),d.insertAfter(a),c.insertAfter(a),d.css({top:g+f/2-d.outerHeight(!1)/2,left:e/2-d.outerWidth(!1)/2}))},stopLoading:function(a){a.parent().find('div[data-role="loading-cover"]').remove(),a.parent().find('div[data-role="loading-text"]').remove()},appendEmptyRow:function(a,b){var c,d,e,f;c=a.data(),d=$('<tr data-role="empty"/>'),e=$("<td/>").css({width:"100%","text-align":"center"}),e.attr("colspan",gj.grid.methods.countVisibleColumns(a)),f=$("<div />").html(b||c.notFoundText),e.append(f),d.append(e),gj.grid.events.beforeEmptyRowInsert(a,d),a.append(d)},autoGenerateColumns:function(a,b){var c,d,e,f,g=a.data();if(g.columns=[],b.length>0){for(c=Object.getOwnPropertyNames(b[0]),f=0;f<c.length;f++)d=b[0][c[f]],e="text",d&&("number"==typeof d?e="number":d.indexOf("/Date(")>-1&&(e="date")),g.columns.push({field:c[f],type:e});gj.grid.methods.setDefaultColumnConfig(g.columns,g.defaultColumnSettings)}gj.grid.methods.renderHeader(a)},loadData:function(a){var b,c,d,e,f,g,h,i;for(b=a.data(),c=a.getAll(),gj.grid.events.dataBinding(a,c),e=c.length,gj.grid.methods.stopLoading(a),b.autoGenerateColumns&&gj.grid.methods.autoGenerateColumns(a,c),g=a.children("tbody"),"checkbox"===b.selectionMethod&&"multiple"===b.selectionType&&a.find('thead input[data-role="selectAll"]').prop("checked",!1),g.children("tr").not('[data-role="row"]').remove(),0===e&&(g.empty(),gj.grid.methods.appendEmptyRow(a)),h=g.children("tr"),f=h.length,d=0;d<f;d++){if(!(d<e)){g.find('tr[data-role="row"]:gt('+(d-1)+")").remove();break}i=h.eq(d),gj.grid.methods.renderRow(a,i,c[d],d)}for(d=f;d<e;d++)gj.grid.methods.renderRow(a,null,c[d],d);gj.grid.events.dataBound(a,c,b.totalRecords)},getId:function(a,b,c){return b&&a[b]?a[b]:c},renderRow:function(a,b,c,d){var e,f,g,h,i;for(h=a.data(),b&&0!==b.length?(i="update",b.removeClass(h.style.content.rowSelected).removeAttr("data-selected").off("click")):(i="create",b=$('<tr data-role="row"/>'),a.children("tbody").append(b)),e=gj.grid.methods.getId(c,h.primaryKey,d+1),b.attr("data-position",d+1),"checkbox"!==h.selectionMethod&&b.on("click",gj.grid.methods.createRowClickHandler(a,e)),g=0;g<h.columns.length;g++)"update"===i?(f=b.find("td:eq("+g+")"),gj.grid.methods.renderCell(a,f,h.columns[g],c,e)):(f=gj.grid.methods.renderCell(a,null,h.columns[g],c,e),b.append(f));gj.grid.events.rowDataBound(a,b,e,c)},renderCell:function(a,b,c,d,e,f){var g,h;if(b&&0!==b.length?(g=b.find('div[data-role="display"]'),f="update"):(b=$("<td/>"),g=$('<div data-role="display" />'),c.align&&b.css("text-align",c.align),c.cssClass&&b.addClass(c.cssClass),b.append(g),f="create"),gj.grid.methods.renderDisplayElement(a,g,c,d,e,f),"update"===f&&(b.off(),g.off()),c.events)for(h in c.events)c.events.hasOwnProperty(h)&&b.on(h,{id:e,field:c.field,record:d},gj.grid.methods.createCellEventHandler(c,c.events[h]));return c.hidden&&b.hide(),gj.grid.events.cellDataBound(a,g,e,c,d),b},createCellEventHandler:function(a,b){return function(c){a.stopPropagation&&c.stopPropagation(),b.call(this,c)}},renderDisplayElement:function(a,b,c,d,e,f){var g,h;"checkbox"===c.type&&gj.checkbox?"create"===f?(h=$('<input type="checkbox" />').val(e).prop("checked",!!d[c.field]),c.role&&h.attr("data-role",c.role),b.append(h),h.checkbox({uiLibrary:a.data("uiLibrary")}),"selectRow"===c.role?h.on("click",function(){return!1}):h.prop("disabled",!0)):b.find('input[type="checkbox"]').val(e).prop("checked",!!d[c.field]):"icon"===c.type?"create"===f&&(b.append($("<span/>").addClass(c.icon).css({cursor:"pointer"})),"bootstrap"===a.data().uiLibrary&&b.children("span").addClass("glyphicon"),c.stopPropagation=!0):c.tmpl?(g=c.tmpl,c.tmpl.replace(/\{(.+?)\}/g,function(a,b){g=g.replace(a,gj.grid.methods.formatText(d[b],c))}),b.html(g)):c.renderer&&"function"==typeof c.renderer?(g=c.renderer(d[c.field],d,b.parent(),b,e,a))&&b.html(g):(d[c.field]=gj.grid.methods.formatText(d[c.field],c),!c.tooltip&&d[c.field]&&b.attr("title",d[c.field]),b.html(d[c.field])),c.tooltip&&"create"===f&&b.attr("title",c.tooltip)},formatText:function(a,b){return a=a&&["date","time","datetime"].indexOf(b.type)>-1?gj.core.formatDate(gj.core.parseDate(a,b.format),b.format):void 0===a||null===a?"":a.toString(),b.decimalDigits&&a&&(a=parseFloat(a).toFixed(b.decimalDigits)),a},setRecordsData:function(a,b){var c=[],d=0,e=a.data();return $.isArray(b)?(c=b,d=b.length):e&&e.mapping&&$.isArray(b[e.mapping.dataField])&&(c=b[e.mapping.dataField],(d=b[e.mapping.totalRecordsField])&&!isNaN(d)||(d=0)),a.data("records",c),a.data("totalRecords",d),c},createRowClickHandler:function(a,b){return function(){gj.grid.methods.setSelected(a,b,$(this))}},selectRow:function(a,b,c,d){var e;return c.addClass(b.style.content.rowSelected),c.attr("data-selected","true"),"checkbox"===b.selectionMethod&&(e=c.find('input[type="checkbox"][data-role="selectRow"]'),e.length&&!e.prop("checked")&&e.prop("checked",!0),"multiple"===b.selectionType&&a.getSelections().length===a.count(!1)&&a.find('thead input[data-role="selectAll"]').prop("checked",!0)),gj.grid.events.rowSelect(a,c,d,a.getById(d))},unselectRow:function(a,b,c,d){var e;if("true"===c.attr("data-selected"))return c.removeClass(b.style.content.rowSelected),"checkbox"===b.selectionMethod&&(e=c.find('td input[type="checkbox"][data-role="selectRow"]'),e.length&&e.prop("checked")&&e.prop("checked",!1),"multiple"===b.selectionType&&a.find('thead input[data-role="selectAll"]').prop("checked",!1)),c.removeAttr("data-selected"),gj.grid.events.rowUnselect(a,c,d,a.getById(d))},setSelected:function(a,b,c){var d=a.data();return c&&c.length||(c=gj.grid.methods.getRowById(a,b)),c&&("true"===c.attr("data-selected")?gj.grid.methods.unselectRow(a,d,c,b):("single"===d.selectionType&&c.siblings('[data-selected="true"]').each(function(){var b=$(this),c=gj.grid.methods.getId(b,d.primaryKey,b.data("position"));gj.grid.methods.unselectRow(a,d,b,c)}),gj.grid.methods.selectRow(a,d,c,b))),a},selectAll:function(a){var b=a.data();return a.find('tbody tr[data-role="row"]').each(function(){var c=$(this),d=c.data("position"),e=a.get(d),f=gj.grid.methods.getId(e,b.primaryKey,d);gj.grid.methods.selectRow(a,b,c,f)}),a.find('thead input[data-role="selectAll"]').prop("checked",!0),a},unSelectAll:function(a){var b=a.data();return a.find("tbody tr").each(function(){var c=$(this),d=c.data("position"),e=a.get(d),f=gj.grid.methods.getId(e,b.primaryKey,d);gj.grid.methods.unselectRow(a,b,c,f),c.find('input[type="checkbox"][data-role="selectRow"]').prop("checked",!1)}),a.find('thead input[data-role="selectAll"]').prop("checked",!1),a},getSelected:function(a){var b,c,d,e=null;return b=a.find('tbody>tr[data-selected="true"]'),b.length>0&&(d=$(b[0]).data("position"),c=a.get(d),e=gj.grid.methods.getId(c,a.data().primaryKey,d)),e},getSelectedRows:function(a){a.data();return a.find('tbody>tr[data-selected="true"]')},getSelections:function(a){var b,c,d=[],e=a.data(),f=gj.grid.methods.getSelectedRows(a);return 0<f.length&&f.each(function(){b=$(this).data("position"),c=a.get(b),d.push(gj.grid.methods.getId(c,e.primaryKey,b))}),d},getById:function(a,b){var c,d=null,e=a.data("primaryKey"),f=a.data("records");if(e){for(c=0;c<f.length;c++)if(f[c][e]==b){d=f[c];break}}else d=a.get(b);return d},getRecVPosById:function(a,b){var c,d=b,e=a.data();if(e.primaryKey)for(c=0;c<e.dataSource.length;c++)if(e.dataSource[c][e.primaryKey]==b){d=c;break}return d},getRowById:function(a,b){var c,d,e=a.getAll(!1),f=a.data("primaryKey"),g=void 0;if(f){for(d=0;d<e.length;d++)if(e[d][f]==b){c=d+1;break}}else c=b;return c&&(g=a.children("tbody").children('tr[data-position="'+c+'"]')),g},getByPosition:function(a,b){return a.getAll(!1)[b-1]},getColumnPosition:function(a,b){var c,d=-1;for(c=0;c<a.length;c++)if(a[c].field===b){d=c;break}return d},getColumnInfo:function(a,b){var c,d={},e=a.data();for(c=0;c<e.columns.length;c+=1)if(e.columns[c].field===b){d=e.columns[c];break}return d},getCell:function(a,b,c){var d,e,f=null;return d=gj.grid.methods.getColumnPosition(a.data("columns"),c),d>-1&&(e=gj.grid.methods.getRowById(a,b),f=e.find("td:eq("+d+') div[data-role="display"]')),f},setCellContent:function(a,b,c,d){var e,f=gj.grid.methods.getCell(a,b,c);f&&(f.empty(),"object"==typeof d?f.append(d):(e=gj.grid.methods.getColumnInfo(a,c),gj.grid.methods.renderDisplayElement(a,f,e,a.getById(b),b,"update")))},clone:function(a){var b=[];return $.each(a,function(){b.push(this.clone())}),b},getAll:function(a){return a.data("records")},countVisibleColumns:function(a){var b,c,d;for(b=a.data().columns,c=0,d=0;d<b.length;d++)!0!==b[d].hidden&&c++;return c},clear:function(a,b){var c=a.data();return a.xhr&&a.xhr.abort(),a.children("tbody").empty(),c.records=[],gj.grid.methods.stopLoading(a),gj.grid.methods.appendEmptyRow(a,b?c.notFoundText:"&nbsp;"),gj.grid.events.dataBound(a,[],0),a},render:function(a,b){return b&&(gj.grid.methods.setRecordsData(a,b),gj.grid.methods.updateHeader(a),gj.grid.methods.loadData(a)),a},filter:function(a){var b,c,d=a.data(),e=d.dataSource.slice();d.params[d.paramNames.sortBy]&&(c=gj.grid.methods.getColumnInfo(a,d.params[d.paramNames.sortBy]),e.sort(c.sortable.sorter?c.sortable.sorter(c.direction,c):gj.grid.methods.createDefaultSorter(c.direction,c.field)));for(b in d.params)d.params[b]&&!d.paramNames[b]&&(c=gj.grid.methods.getColumnInfo(a,b),e=$.grep(e,function(a){var e=a[b]||"",f=d.params[b]||"";return c&&"function"==typeof c.filter?c.filter(e,f):e.toUpperCase().indexOf(f.toUpperCase())>-1}));return gj.grid.events.dataFiltered(a,e),e},createDefaultSorter:function(a,b){return function(c,d){var e=(c[b]||"").toString(),f=(d[b]||"").toString();return"asc"===a?e.localeCompare(f):f.localeCompare(e)}},destroy:function(a,b,c){return a.data()&&(gj.grid.events.destroying(a),gj.grid.methods.stopLoading(a),a.xhr&&a.xhr.abort(),a.off(),!1===c&&a.parent('div[data-role="wrapper"]').length>0&&a.unwrap(),a.removeData(),!1===b?a.remove():a.removeClass().empty(),a.removeAttr("data-type")),a},showColumn:function(a,b){var c,d=a.data(),e=gj.grid.methods.getColumnPosition(d.columns,b);return e>-1&&(a.find("thead>tr").each(function(){$(this).children("th").eq(e).show()}),$.each(a.find("tbody>tr"),function(){$(this).children("td").eq(e).show()}),d.columns[e].hidden=!1,c=a.find('tbody > tr[data-role="empty"] > td'),c&&c.length&&c.attr("colspan",gj.grid.methods.countVisibleColumns(a)),gj.grid.events.columnShow(a,d.columns[e])),a},hideColumn:function(a,b){var c,d=a.data(),e=gj.grid.methods.getColumnPosition(d.columns,b);return e>-1&&(a.find("thead>tr").each(function(){$(this).children("th").eq(e).hide()}),$.each(a.find("tbody>tr"),function(){$(this).children("td").eq(e).hide()}),d.columns[e].hidden=!0,c=a.find('tbody > tr[data-role="empty"] > td'),c&&c.length&&c.attr("colspan",gj.grid.methods.countVisibleColumns(a)),gj.grid.events.columnHide(a,d.columns[e])),a},isLastRecordVisible:function(){return!0},addRow:function(a,b){var c=a.data();return c.totalRecords=a.data("totalRecords")+1,gj.grid.events.dataBinding(a,[b]),c.records.push(b),$.isArray(c.dataSource)&&c.dataSource.push(b),1===c.totalRecords&&a.children("tbody").empty(),gj.grid.methods.isLastRecordVisible(a)&&gj.grid.methods.renderRow(a,null,b,a.count()-1),gj.grid.events.dataBound(a,[b],c.totalRecords),a},updateRow:function(a,b,c){var d,e=gj.grid.methods.getRowById(a,b),f=a.data();return f.records[e.data("position")-1]=c,$.isArray(f.dataSource)&&(d=gj.grid.methods.getRecVPosById(a,b),f.dataSource[d]=c),gj.grid.methods.renderRow(a,e,c,e.index()),a},removeRow:function(a,b){var c,d=a.data(),e=gj.grid.methods.getRowById(a,b);return gj.grid.events.rowRemoving(a,e,b,a.getById(b)),$.isArray(d.dataSource)&&(c=gj.grid.methods.getRecVPosById(a,b),d.dataSource.splice(c,1)),a.reload(),a},count:function(a,b){return b?a.data().totalRecords:a.getAll().length},getColumnPositionByRole:function(a,b){var c,d,e=a.data("columns");for(c=0;c<e.length;c++)if(e[c].role===b){d=c;break}return d},getColumnPositionNotInRole:function(a){var b,c=0,d=a.data("columns");for(b=0;b<d.length;b++)if(!d[b].role){c=b;break}return c}},gj.grid.widget=function(a,b){var c=this,d=gj.grid.methods;return c.reload=function(a){return d.startLoading(this),gj.widget.prototype.reload.call(this,a)},c.clear=function(a){return d.clear(this,a)},c.count=function(a){return d.count(this,a)},c.render=function(b){return d.render(a,b)},c.destroy=function(a,b){return d.destroy(this,a,b)},c.setSelected=function(a){return d.setSelected(this,a)},c.getSelected=function(){return d.getSelected(this)},c.getSelections=function(){return d.getSelections(this)},c.selectAll=function(){return d.selectAll(this)},c.unSelectAll=function(){return d.unSelectAll(this)},c.getById=function(a){return d.getById(this,a)},c.get=function(a){return d.getByPosition(this,a)},c.getAll=function(a){return d.getAll(this,a)},c.showColumn=function(a){return d.showColumn(this,a)},c.hideColumn=function(a){return d.hideColumn(this,a)},c.addRow=function(a){return d.addRow(this,a)},c.updateRow=function(a,b){return d.updateRow(this,a,b)},c.setCellContent=function(a,b,c){d.setCellContent(this,a,b,c)},c.removeRow=function(a){return d.removeRow(this,a)},$.extend(a,c),"grid"!==a.attr("data-type")&&d.init.call(a,b),a},gj.grid.widget.prototype=new gj.widget,gj.grid.widget.constructor=gj.grid.widget,gj.grid.widget.prototype.getConfig=gj.grid.methods.getConfig,gj.grid.widget.prototype.getHTMLConfig=gj.grid.methods.getHTMLConfig,function(a){a.fn.grid=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.grid.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.grid.widget(this,a)}}}(jQuery),gj.grid.plugins.fixedHeader={config:{base:{fixedHeader:!1,height:300}},private:{init:function(a){var b=a.data(),c=a.children("tbody"),d=a.children("thead"),e=b.height-d.outerHeight()-(a.children("tfoot").outerHeight()||0);a.addClass("gj-grid-scrollable"),c.css("width",d.outerWidth()),c.height(e)},refresh:function(a){var b,c,d=(a.data(),a.children("tbody")),e=a.children("thead"),f=a.find('tbody tr[data-role="row"] td'),g=a.find('thead tr[data-role="caption"] th');for(a.children("tbody").height()<gj.grid.plugins.fixedHeader.private.getRowsHeight(a)?d.css("width",e.outerWidth()+gj.grid.plugins.fixedHeader.private.getScrollBarWidth()+(navigator.userAgent.toLowerCase().indexOf("firefox")>-1?1:0)):d.css("width",e.outerWidth()),b=0;b<g.length;b++)c=$(g[b]).outerWidth(),0===b&&gj.core.isIE()&&(c-=1),$(f[b]).attr("width",c)},getRowsHeight:function(a){var b=0;return a.find("tbody tr").each(function(){b+=$(this).height()}),b},getScrollBarWidth:function(){var a=document.createElement("p");a.style.width="100%",a.style.height="200px";var b=document.createElement("div");b.style.position="absolute",b.style.top="0px",b.style.left="0px",b.style.visibility="hidden",b.style.width="200px",b.style.height="150px",b.style.overflow="hidden",b.appendChild(a),document.body.appendChild(b);var c=a.offsetWidth;b.style.overflow="scroll";var d=a.offsetWidth;return c==d&&(d=b.clientWidth),document.body.removeChild(b),c-d}},public:{},events:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.fixedHeader.public);a.data();c.fixedHeader&&(a.on("initialized",function(){gj.grid.plugins.fixedHeader.private.init(a)}),a.on("dataBound",function(){gj.grid.plugins.fixedHeader.private.refresh(a)}),a.on("resize",function(){gj.grid.plugins.fixedHeader.private.refresh(a)}))}},gj.grid.plugins.expandCollapseRows={config:{base:{detailTemplate:void 0,keepExpandedRows:!0,expandedRows:[],icons:{expandRow:'<i class="gj-icon chevron-right" />',collapseRow:'<i class="gj-icon chevron-down" />'}},fontawesome:{icons:{expandRow:'<i class="fa fa-angle-right" aria-hidden="true"></i>',collapseRow:'<i class="fa fa-angle-down" aria-hidden="true"></i>'}},glyphicons:{icons:{expandRow:'<span class="glyphicon glyphicon-chevron-right" />',collapseRow:'<span class="glyphicon glyphicon-chevron-down" />'}}},private:{expandDetail:function(a,b,c){var d=b.closest("tr"),e=$('<tr data-role="details" />'),f=$('<td colspan="'+gj.grid.methods.countVisibleColumns(a)+'" />'),g=$('<div data-role="display" />'),h=a.data(),i=d.data("position"),j=a.get(i),k=gj.grid.plugins.expandCollapseRows;void 0===typeof c&&(c=gj.grid.methods.getId(j,h.primaryKey,j)),e.append(f.append(g.append(d.data("details")))),e.insertAfter(d),b.children('div[data-role="display"]').empty().append(h.icons.collapseRow),a.updateDetails(d),k.private.keepSelection(a,c),k.events.detailExpand(a,e.find("td>div"),c)},collapseDetail:function(a,b,c){var d=b.closest("tr"),e=d.next('tr[data-role="details"]'),f=a.data(),g=gj.grid.plugins.expandCollapseRows;void 0===typeof c&&(c=gj.grid.methods.getId(record,f.primaryKey,record)),e.remove(),b.children('div[data-role="display"]').empty().append(f.icons.expandRow),g.private.removeSelection(a,c),g.events.detailCollapse(a,e.find("td>div"),c)},keepSelection:function(a,b){var c=a.data();c.keepExpandedRows&&($.isArray(c.expandedRows)?-1==c.expandedRows.indexOf(b)&&c.expandedRows.push(b):c.expandedRows=[b])},removeSelection:function(a,b){var c=a.data();c.keepExpandedRows&&$.isArray(c.expandedRows)&&c.expandedRows.indexOf(b)>-1&&c.expandedRows.splice(c.expandedRows.indexOf(b),1)},updateDetailsColSpan:function(a){var b=a.find('tbody > tr[data-role="details"] > td');b&&b.length&&b.attr("colspan",gj.grid.methods.countVisibleColumns(a))}},public:{collapseAll:function(){var a,b=this,c=b.data();return void 0!==c.detailTemplate&&(a=gj.grid.methods.getColumnPositionByRole(b,"expander"),b.find('tbody tr[data-role="row"]').each(function(){gj.grid.plugins.expandCollapseRows.private.collapseDetail(b,$(this).find("td:eq("+a+")"))})),void 0!==c.grouping&&b.find('tbody tr[role="group"]').each(function(){gj.grid.plugins.grouping.private.collapseGroup(c,$(this).find("td:eq(0)"))}),b},expandAll:function(){var a,b=this,c=b.data();return void 0!==c.detailTemplate&&(a=gj.grid.methods.getColumnPositionByRole(b,"expander"),b.find('tbody tr[data-role="row"]').each(function(){gj.grid.plugins.expandCollapseRows.private.expandDetail(b,$(this).find("td:eq("+a+")"))})),void 0!==c.grouping&&b.find('tbody tr[role="group"]').each(function(){gj.grid.plugins.grouping.private.expandGroup(c,$(this).find("td:eq(0)"))}),b},updateDetails:function(a){var b=this,c=a.data("details"),d=c.html(),e=b.get(a.data("position"));return e&&d&&(c.html().replace(/\{(.+?)\}/g,function(a,c){var f=gj.grid.methods.getColumnInfo(b,c);d=d.replace(a,gj.grid.methods.formatText(e[c],f))}),c.html(d)),b}},events:{detailExpand:function(a,b,c){a.triggerHandler("detailExpand",[b,c])},detailCollapse:function(a,b,c){a.triggerHandler("detailCollapse",[b,c])}},configure:function(a){var b,c=a.data();$.extend(!0,a,gj.grid.plugins.expandCollapseRows.public),void 0!==c.detailTemplate&&(b={title:"",width:c.defaultIconColumnWidth,align:"center",stopPropagation:!0,cssClass:"gj-cursor-pointer gj-unselectable",tmpl:c.icons.expandRow,role:"expander",events:{click:function(b){var c=$(this),d=gj.grid.plugins.expandCollapseRows.private;"details"===c.closest("tr").next().attr("data-role")?d.collapseDetail(a,c,b.data.id):d.expandDetail(a,$(this),b.data.id)}}},c.columns=[b].concat(c.columns),a.on("rowDataBound",function(a,b,d,e){b.data("details",$(c.detailTemplate))}),a.on("columnShow",function(b,c){gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(a)}),a.on("columnHide",function(b,c){gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(a)}),a.on("rowRemoving",function(b,c,d,e){gj.grid.plugins.expandCollapseRows.private.collapseDetail(a,c.children("td").first(),d)}),a.on("dataBinding",function(){a.collapseAll()}),a.on("pageChanging",function(){a.collapseAll()}),a.on("dataBound",function(){var b,c,d,e,f=a.data();if(f.keepExpandedRows&&$.isArray(f.expandedRows))for(b=0;b<f.expandedRows.length;b++)(d=gj.grid.methods.getRowById(a,f.expandedRows[b]))&&d.length&&(e=gj.grid.methods.getColumnPositionByRole(a,"expander"),(c=d.children("td:eq("+e+")"))&&c.length&&gj.grid.plugins.expandCollapseRows.private.expandDetail(a,c))}))}},gj.grid.plugins.inlineEditing={renderers:{editManager:function(a,b,c,d,e,f){var g=f.data(),h=$(g.inlineEditing.editButton).attr("key",e),i=$(g.inlineEditing.deleteButton).attr("key",e),j=$(g.inlineEditing.updateButton).attr("key",e).hide(),k=$(g.inlineEditing.cancelButton).attr("key",e).hide();h.on("click",function(a){f.edit($(this).attr("key"))}),i.on("click",function(a){f.removeRow($(this).attr("key"))}),j.on("click",function(a){f.update($(this).attr("key"))}),k.on("click",function(a){f.cancel($(this).attr("key"))}),d.empty().append(h).append(i).append(j).append(k)}}},gj.grid.plugins.inlineEditing.config={base:{defaultColumnSettings:{editor:void 0,editField:void 0,mode:"readEdit"},inlineEditing:{mode:"click",managementColumn:!0,managementColumnConfig:{width:300,role:"managementColumn",align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}},bootstrap:{inlineEditing:{managementColumnConfig:{width:200,role:"managementColumn",align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}},bootstrap4:{inlineEditing:{managementColumnConfig:{width:280,role:"managementColumn",align:"center",renderer:gj.grid.plugins.inlineEditing.renderers.editManager,cssClass:"gj-grid-management-column"}}}},gj.grid.plugins.inlineEditing.private={localization:function(a){"bootstrap"===a.uiLibrary?(a.inlineEditing.editButton='<button role="edit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Edit+"</button>",a.inlineEditing.deleteButton='<button role="delete" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Delete+"</button>",a.inlineEditing.updateButton='<button role="update" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Update+"</button>",a.inlineEditing.cancelButton='<button role="cancel" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> '+gj.grid.messages[a.locale].Cancel+"</button>"):(a.inlineEditing.editButton='<button role="edit" class="gj-button-md"><i class="gj-icon pencil" /> '+gj.grid.messages[a.locale].Edit.toUpperCase()+"</button>",a.inlineEditing.deleteButton='<button role="delete" class="gj-button-md"><i class="gj-icon delete" /> '+gj.grid.messages[a.locale].Delete.toUpperCase()+"</button>",a.inlineEditing.updateButton='<button role="update" class="gj-button-md"><i class="gj-icon check-circle" /> '+gj.grid.messages[a.locale].Update.toUpperCase()+"</button>",a.inlineEditing.cancelButton='<button role="cancel" class="gj-button-md"><i class="gj-icon cancel" /> '+gj.grid.messages[a.locale].Cancel.toUpperCase()+"</button>")},editMode:function(a,b,c,d){var e,f,g,h,i,j=a.data();if("edit"!==b.attr("data-mode"))if(c.editor){if(gj.grid.plugins.inlineEditing.private.updateOtherCells(a,c.mode),e=b.find('div[data-role="display"]').hide(),f=b.find('div[data-role="edit"]').show(),0===f.length&&(f=$('<div data-role="edit" />'),b.append(f)),h=d[c.editField||c.field],g=f.find("input, select, textarea").first(),g.length)switch(c.type){case"checkbox":g.prop("checked",h);break;case"dropdown":g=g.dropdown("value",h);break;default:g.val(h)}else{if("function"==typeof c.editor)c.editor(f,h,d),g=f.find("input, select, textarea").first();else if(i="object"==typeof c.editor?c.editor:{},i.uiLibrary=j.uiLibrary,i.iconsLibrary=j.iconsLibrary,i.fontSize=a.css("font-size"),i.showOnFocus=!1,"checkbox"===c.type&&gj.checkbox)g=$('<input type="checkbox" />').prop("checked",h),f.append(g),g.checkbox(i);else if("date"===c.type&&gj.datepicker||"time"===c.type&&gj.timepicker||"datetime"===c.type&&gj.datetimepicker){switch(g=$('<input type="text" width="100%"/>'),f.append(g),c.format&&(i.format=c.format),c.type){case"date":g=g.datepicker(i);break;case"time":g=g.timepicker(i);break;case"datetime":g=g.datetimepicker(i)}g.value&&g.value(e.html())}else"dropdown"===c.type&&gj.dropdown?(g=$('<select type="text" width="100%"/>'),f.append(g),i.dataBound=function(a){var b=$(this).dropdown();c.editField?b.value(d[c.editField]):b.value(d[c.field])},g=g.dropdown(i)):(g=$('<input type="text" value="'+h+'" class="gj-width-full"/>'),"materialdesign"===j.uiLibrary&&g.addClass("gj-textbox-md").css("font-size",a.css("font-size")),f.append(g));"command"!==j.inlineEditing.mode&&"editOnly"!==c.mode&&(g=f.find("input, select, textarea").first(),g.on("keyup",function(d){13!==d.keyCode&&27!==d.keyCode||gj.grid.plugins.inlineEditing.private.displayMode(a,b,c)}))}"INPUT"===g.prop("tagName").toUpperCase()&&"TEXT"===g.prop("type").toUpperCase()?gj.core.setCaretAtEnd(g[0]):g.focus(),b.attr("data-mode","edit")}else"managementColumn"===c.role&&(b.find('[role="edit"]').hide(),b.find('[role="delete"]').hide(),b.find('[role="update"]').show(),b.find('[role="cancel"]').show())},displayMode:function(a,b,c,d){var e,f,g,h,i,j,k;"editOnly"!==c.mode&&("edit"===b.attr("data-mode")&&(e=b.find('div[data-role="edit"]'),f=b.find('div[data-role="display"]'),g=e.find("input, select, textarea").first(),"SELECT"===g[0].tagName.toUpperCase()&&g[0].selectedIndex>-1?(h=g[0].options[g[0].selectedIndex].innerHTML,i=g[0].value):h="INPUT"===g[0].tagName.toUpperCase()&&"CHECKBOX"===g[0].type.toUpperCase()?g[0].checked:g.val(),k=b.parent().data("position"),j=a.get(k),!0!==d&&h!==j[c.field]&&(j[c.field]="date"===c.type?gj.core.parseDate(h,c.format):h,c.editField&&(j[c.editField]=i||h),"editOnly"!==c.mode&&(gj.grid.methods.renderDisplayElement(a,f,c,j,gj.grid.methods.getId(j,a.data("primaryKey"),k),"update"),0===b.find("span.gj-dirty").length&&b.prepend($('<span class="gj-dirty" />'))),gj.grid.plugins.inlineEditing.events.cellDataChanged(a,b,c,j,h),gj.grid.plugins.inlineEditing.private.updateChanges(a,c,j,h)),e.hide(),f.show(),b.attr("data-mode","display")),"managementColumn"===c.role&&(b.find('[role="update"]').hide(),b.find('[role="cancel"]').hide(),b.find('[role="edit"]').show(),b.find('[role="delete"]').show()))},updateOtherCells:function(a,b){var c=a.data();"command"!==c.inlineEditing.mode&&"editOnly"!==b&&a.find('div[data-role="edit"]:visible').parent("td").each(function(){var b=$(this),d=c.columns[b.index()];gj.grid.plugins.inlineEditing.private.displayMode(a,b,d)})},updateChanges:function(a,b,c,d){var e,f,g,h=a.data();h.guid||(h.guid=gj.grid.plugins.inlineEditing.private.generateGUID()),h.primaryKey&&(e=JSON.parse(sessionStorage.getItem("gj.grid."+h.guid)),e?f=e.filter(function(a){return a[h.primaryKey]===c[h.primaryKey]}):e=[],f&&1===f.length?f[0][b.field]=d:(g={},g[h.primaryKey]=c[h.primaryKey],h.primaryKey!==b.field&&(g[b.field]=d),e.push(g)),sessionStorage.setItem("gj.grid."+h.guid,JSON.stringify(e)))},generateGUID:function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}},gj.grid.plugins.inlineEditing.public={getChanges:function(){return JSON.parse(sessionStorage.getItem("gj.grid."+this.data().guid))},edit:function(a){var b,c=this.getById(a),d=gj.grid.methods.getRowById(this,a).children("td"),e=this.data("columns");for(b=0;b<d.length;b++)gj.grid.plugins.inlineEditing.private.editMode(this,$(d[b]),e[b],c);return this},update:function(a){var b,c=this.getById(a),d=gj.grid.methods.getRowById(this,a).children("td"),e=this.data("columns");for(b=0;b<d.length;b++)gj.grid.plugins.inlineEditing.private.displayMode(this,$(d[b]),e[b],!1);return gj.grid.plugins.inlineEditing.events.rowDataChanged(this,a,c),this},cancel:function(a){var b,c=(this.getById(a),gj.grid.methods.getRowById(this,a).children("td")),d=this.data("columns");for(b=0;b<c.length;b++)gj.grid.plugins.inlineEditing.private.displayMode(this,$(c[b]),d[b],!0);return this}},gj.grid.plugins.inlineEditing.events={cellDataChanged:function(a,b,c,d,e,f){a.triggerHandler("cellDataChanged",[b,c,d,e,f])},rowDataChanged:function(a,b,c){a.triggerHandler("rowDataChanged",[b,c])}},gj.grid.plugins.inlineEditing.configure=function(a,b,c){var d=a.data();$.extend(!0,a,gj.grid.plugins.inlineEditing.public),c.inlineEditing&&(a.on("dataBound",function(){a.find("span.gj-dirty").remove()}),a.on("rowDataBound",function(b,c,d,e){a.cancel(d)})),"command"===d.inlineEditing.mode?(gj.grid.plugins.inlineEditing.private.localization(d),b.inlineEditing.managementColumn&&d.columns.push(b.inlineEditing.managementColumnConfig)):a.on("cellDataBound",function(b,c,e,f,g){f.editor&&("editOnly"===f.mode?gj.grid.plugins.inlineEditing.private.editMode(a,c.parent(),f,g):c.parent("td").on("dblclick"===d.inlineEditing.mode?"dblclick":"click",function(){gj.grid.plugins.inlineEditing.private.editMode(a,c.parent(),f,g)}))})},gj.grid.plugins.optimisticPersistence={config:{base:{optimisticPersistence:{localStorage:void 0,sessionStorage:void 0}}},private:{applyParams:function(a){var b,c=a.data(),d={};b=JSON.parse(sessionStorage.getItem("gj.grid."+c.guid)),b&&b.optimisticPersistence&&$.extend(d,b.optimisticPersistence),b=JSON.parse(localStorage.getItem("gj.grid."+c.guid)),b&&b.optimisticPersistence&&$.extend(d,b.optimisticPersistence),$.extend(c.params,d)},saveParams:function(a){var b,c,d=a.data(),e={optimisticPersistence:{}};if(d.optimisticPersistence.sessionStorage){for(b=0;b<d.optimisticPersistence.sessionStorage.length;b++)c=d.optimisticPersistence.sessionStorage[b],e.optimisticPersistence[c]=d.params[c];e=$.extend(!0,JSON.parse(sessionStorage.getItem("gj.grid."+d.guid)),e),sessionStorage.setItem("gj.grid."+d.guid,JSON.stringify(e))}if(d.optimisticPersistence.localStorage){for(e={optimisticPersistence:{}},b=0;b<d.optimisticPersistence.localStorage.length;b++)c=d.optimisticPersistence.localStorage[b],e.optimisticPersistence[c]=d.params[c];e=$.extend(!0,JSON.parse(localStorage.getItem("gj.grid."+d.guid)),e),localStorage.setItem("gj.grid."+d.guid,JSON.stringify(e))}}},configure:function(a,b,c){b.guid&&(b.optimisticPersistence.localStorage||b.optimisticPersistence.sessionStorage)&&(gj.grid.plugins.optimisticPersistence.private.applyParams(a),a.on("dataBound",function(b){gj.grid.plugins.optimisticPersistence.private.saveParams(a)}))}},gj.grid.plugins.pagination={config:{base:{style:{pager:{panel:"",stateDisabled:"",activeButton:""}},paramNames:{page:"page",limit:"limit"},pager:{limit:10,sizes:[5,10,20,100],leftControls:void 0,rightControls:void 0}},bootstrap:{style:{pager:{panel:"",stateDisabled:""}}},bootstrap4:{style:{pager:{panel:"btn-toolbar",stateDisabled:""}}},glyphicons:{icons:{first:'<span class="glyphicon glyphicon-step-backward"></span>',previous:'<span class="glyphicon glyphicon-backward"></span>',next:'<span class="glyphicon glyphicon-forward"></span>',last:'<span class="glyphicon glyphicon-step-forward"></span>',refresh:'<span class="glyphicon glyphicon-refresh"></span>'}},materialicons:{icons:{first:'<i class="gj-icon first-page" />',previous:'<i class="gj-icon chevron-left" />',next:'<i class="gj-icon chevron-right" />',last:'<i class="gj-icon last-page" />',refresh:'<i class="gj-icon refresh" />'}},fontawesome:{icons:{first:'<i class="fa fa-fast-backward" aria-hidden="true"></i>',previous:'<i class="fa fa-backward" aria-hidden="true"></i>',next:'<i class="fa fa-forward" aria-hidden="true"></i>',last:'<i class="fa fa-fast-forward" aria-hidden="true"></i>',refresh:'<i class="fa fa-refresh" aria-hidden="true"></i>'}}},private:{init:function(a){var b,c,d,e,f,g,h,i,j,k;if(d=a.data(),d.pager)for(d.params[d.paramNames.page]||(d.params[d.paramNames.page]=1),d.params[d.paramNames.limit]||(d.params[d.paramNames.limit]=d.pager.limit),gj.grid.plugins.pagination.private.localization(d),b=$('<tr data-role="pager"/>'),c=$("<th/>"),b.append(c),f=$('<div data-role="display" />').addClass(d.style.pager.panel).css({float:"left"}),g=$('<div data-role="display" />').addClass(d.style.pager.panel).css({float:"right"}),c.append(f).append(g),h=$("<tfoot />").append(b),a.append(h),gj.grid.plugins.pagination.private.updatePagerColSpan(a),i=gj.grid.methods.clone(d.pager.leftControls),$.each(i,function(){f.append(this)}),j=gj.grid.methods.clone(d.pager.rightControls),$.each(j,function(){g.append(this)}),e=a.find("tfoot [data-role]"),k=0;k<e.length;k++)gj.grid.plugins.pagination.private.initPagerControl($(e[k]),a)},localization:function(a){"bootstrap"===a.uiLibrary?gj.grid.plugins.pagination.private.localizationBootstrap(a):"bootstrap4"===a.uiLibrary?gj.grid.plugins.pagination.private.localizationBootstrap4(a):gj.grid.plugins.pagination.private.localizationMaterialDesign(a)},localizationBootstrap:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.first||b.First)+"</button>").attr("title",b.FirstPageTooltip).attr("data-role","page-first"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous"),$("<div>"+b.Page+"</div>"),$('<input data-role="page-number" class="form-control input-sm" type="text" value="0">'),$("<div>"+b.Of+"</div>"),$('<div data-role="page-label-last">0</div>'),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.last||b.Last)+"</button>").attr("title",b.LastPageTooltip).attr("data-role","page-last"),$('<button type="button" class="btn btn-default btn-sm">'+(a.icons.refresh||b.Refresh)+"</button>").attr("title",b.Refresh).attr("data-role","page-refresh"),$('<select data-role="page-size" class="form-control input-sm" width="60"></select>')]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$("<div>"+b.DisplayingRecords+"</div>"),$('<div data-role="record-first">0</div>'),$("<div>-</div>"),$('<div data-role="record-last">0</div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="record-total">0</div>')])},localizationBootstrap4:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.first||b.First)+"</button>").attr("title",b.FirstPageTooltip).attr("data-role","page-first"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous"),$("<div>"+b.Page+"</div>"),$('<div class="input-group"><input data-role="page-number" class="form-control form-control-sm" type="text" value="0"></div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="page-label-last">0</div>'),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.last||b.Last)+"</button>").attr("title",b.LastPageTooltip).attr("data-role","page-last"),$('<button class="btn btn-default btn-sm gj-cursor-pointer">'+(a.icons.refresh||b.Refresh)+"</button>").attr("title",b.Refresh).attr("data-role","page-refresh"),$('<select data-role="page-size" class="form-control input-sm" width="60"></select>')]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$("<div>"+b.DisplayingRecords+"&nbsp;</div>"),$('<div data-role="record-first">0</div>'),$("<div>-</div>"),$('<div data-role="record-last">0</div>'),$("<div>"+b.Of+"</div>"),$('<div data-role="record-total">0</div>')])},localizationMaterialDesign:function(a){var b=gj.grid.messages[a.locale];void 0===a.pager.leftControls&&(a.pager.leftControls=[]),void 0===a.pager.rightControls&&(a.pager.rightControls=[$('<span class="">'+b.RowsPerPage+"</span>"),$('<select data-role="page-size" class="gj-grid-md-limit-select" width="52"></select></div>'),$('<span class="gj-md-spacer-32">&nbsp;</span>'),$('<span data-role="record-first" class="">0</span>'),$('<span class="">-</span>'),$('<span data-role="record-last" class="">0</span>'),$('<span class="gj-grid-mdl-pager-label">'+b.Of+"</span>"),$('<span data-role="record-total" class="">0</span>'),$('<span class="gj-md-spacer-32">&nbsp;</span>'),$('<button class="gj-button-md">'+(a.icons.previous||b.Previous)+"</button>").attr("title",b.PreviousPageTooltip).attr("data-role","page-previous").addClass(a.icons.first?"gj-button-md-icon":""),$('<span class="gj-md-spacer-24">&nbsp;</span>'),$('<button class="gj-button-md">'+(a.icons.next||b.Next)+"</button>").attr("title",b.NextPageTooltip).attr("data-role","page-next").addClass(a.icons.first?"gj-button-md-icon":"")])},initPagerControl:function(a,b){var c=b.data();switch(a.data("role")){case"page-size":c.pager.sizes&&0<c.pager.sizes.length?(a.show(),$.each(c.pager.sizes,function(){a.append($("<option/>").attr("value",this.toString()).text(this.toString()))}),a.change(function(){var a=parseInt(this.value,10);c.params[c.paramNames.limit]=a,gj.grid.plugins.pagination.private.changePage(b,1),gj.grid.plugins.pagination.events.pageSizeChange(b,a)}),a.val(c.params[c.paramNames.limit]),gj.dropdown&&a.dropdown({uiLibrary:c.uiLibrary,iconsLibrary:c.iconsLibrary,fontSize:a.css("font-size"),style:{presenter:"btn btn-default btn-sm"}})):a.hide();break;case"page-refresh":a.on("click",function(){b.reload()})}},reloadPager:function(a,b){var c,d,e,f,g,h,i,j;if(h=a.data(),h.pager){for(c=0===b?0:parseInt(h.params[h.paramNames.page],10),d=parseInt(h.params[h.paramNames.limit],10),e=Math.ceil(b/d),f=0===c?0:d*(c-1)+1,g=f+d>b?b:f+d-1,i=a.find("TFOOT [data-role]"),j=0;j<i.length;j++)gj.grid.plugins.pagination.private.reloadPagerControl($(i[j]),a,c,e,f,g,b);gj.grid.plugins.pagination.private.updatePagerColSpan(a)}},reloadPagerControl:function(a,b,c,d,e,f,g){var h;switch(a.data("role")){case"page-first":gj.grid.plugins.pagination.private.assignPageHandler(b,a,1,c<2);break;case"page-previous":gj.grid.plugins.pagination.private.assignPageHandler(b,a,c-1,c<2);break;case"page-number":a.val(c).off("change").on("change",gj.grid.plugins.pagination.private.createChangePageHandler(b,c));break;case"page-label-last":a.text(d);break;case"page-next":gj.grid.plugins.pagination.private.assignPageHandler(b,a,c+1,d===c);break;case"page-last":gj.grid.plugins.pagination.private.assignPageHandler(b,a,d,d===c);break;case"page-button-one":h=1===c?1:c==d?c-2:c-1,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"page-button-two":h=1===c?2:c==d?d-1:c,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"page-button-three":h=1===c?c+2:c==d?c:c+1,gj.grid.plugins.pagination.private.assignButtonHandler(b,a,c,h,d);break;case"record-first":a.text(e);break;case"record-last":a.text(f);break;case"record-total":a.text(g)}},assignPageHandler:function(a,b,c,d){var e=a.data().style.pager;d?b.addClass(e.stateDisabled).prop("disabled",!0).off("click"):b.removeClass(e.stateDisabled).prop("disabled",!1).off("click").on("click",function(){gj.grid.plugins.pagination.private.changePage(a,c)})},assignButtonHandler:function(a,b,c,d,e){var f=a.data().style.pager;d<1||d>e?b.hide():(b.show().off("click").text(d),d===c?b.addClass(f.activeButton):b.removeClass(f.activeButton).on("click",function(){gj.grid.plugins.pagination.private.changePage(a,d)}))},createChangePageHandler:function(a,b){return function(){var b=(a.data(),parseInt(this.value,10));gj.grid.plugins.pagination.private.changePage(a,b)}},changePage:function(a,b){var c=a.data();!1===gj.grid.plugins.pagination.events.pageChanging(a,b)||isNaN(b)||(a.find('TFOOT [data-role="page-number"]').val(b),c.params[c.paramNames.page]=b),a.reload()},updatePagerColSpan:function(a){var b=a.find('tfoot > tr[data-role="pager"] > th');b&&b.length&&b.attr("colspan",gj.grid.methods.countVisibleColumns(a))},isLastRecordVisible:function(a){var b=!0,c=a.data(),d=parseInt(c.params[c.paramNames.limit],10),e=parseInt(c.params[c.paramNames.page],10),f=a.count();return d&&e&&(b=(e-1)*d+f===c.totalRecords),b}},public:{getAll:function(a){var b,c,d,e=this.data();return $.isArray(e.dataSource)?a?e.dataSource:e.params[e.paramNames.limit]&&e.params[e.paramNames.page]?(b=parseInt(e.params[e.paramNames.limit],10),c=parseInt(e.params[e.paramNames.page],10),d=(c-1)*b,e.records.slice(d,d+b)):e.records:e.records}},events:{pageSizeChange:function(a,b){a.triggerHandler("pageSizeChange",[b])},pageChanging:function(a,b){a.triggerHandler("pageChanging",[b])}},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.pagination.public);a.data();c.pager&&(gj.grid.methods.isLastRecordVisible=gj.grid.plugins.pagination.private.isLastRecordVisible,a.on("initialized",function(){gj.grid.plugins.pagination.private.init(a)}),a.on("dataBound",function(b,c,d){gj.grid.plugins.pagination.private.reloadPager(a,d)}),a.on("columnShow",function(){gj.grid.plugins.pagination.private.updatePagerColSpan(a)}),a.on("columnHide",function(){gj.grid.plugins.pagination.private.updatePagerColSpan(a)}))}},gj.grid.plugins.responsiveDesign={config:{base:{resizeCheckInterval:500,responsive:!1,showHiddenColumnsAsDetails:!1,defaultColumn:{priority:void 0,minWidth:250},style:{rowDetailItem:""}},bootstrap:{style:{rowDetailItem:"col-lg-4"}}},private:{orderColumns:function(a){var b=[];if(a.columns&&a.columns.length){for(i=0;i<a.columns.length;i++)b.push({position:i,field:a.columns[i].field,minWidth:a.columns[i].width||a.columns[i].minWidth||a.defaultColumn.minWidth,priority:a.columns[i].priority||0});b.sort(function(a,b){var c=0;return a.priority<b.priority?c=-1:a.priority>b.priority&&(c=1),c})}return b},updateDetails:function(a){var b,c,d,e,f,g,h,i,j;for(b=a.find('tbody > tr[data-role="row"]'),c=a.data(),d=0;d<b.length;d++){for(f=$(b[d]),g=f.data("details"),e=0;e<c.columns.length;e++)i=c.columns[e],h=g&&g.find('div[data-id="'+i.field+'"]'),c.columns[e].hidden?(j="<b>"+(i.title||i.field)+"</b>: {"+i.field+"}",h&&h.length?h.empty().html(j):(h=$('<div data-id="'+i.field+'"/>').html(j),h.addClass(c.style.rowDetailItem),g&&g.length||(g=$('<div class="row"/>')),g.append(h))):h&&h.length&&h.remove();a.updateDetails(f)}}},public:{oldWidth:void 0,resizeCheckIntervalId:void 0,makeResponsive:function(){var a,b,c=0,d=this.data(),e=gj.grid.plugins.responsiveDesign.private.orderColumns(d);for(a=0;a<e.length;a++)b=this.find("thead>tr>th:eq("+e[a].position+")"),b.is(":visible")&&e[a].minWidth<b.width()&&(c+=b.width()-e[a].minWidth);if(c)for(a=0;a<e.length;a++)b=this.find("thead>tr>th:eq("+e[a].position+")"),!b.is(":visible")&&e[a].minWidth<=c&&(this.showColumn(e[a].field),c-=b.width());for(a=e.length-1;a>=0;a--)b=this.find("thead>tr>th:eq("+e[a].position+")"),b.is(":visible")&&e[a].priority&&e[a].minWidth>b.outerWidth()&&this.hideColumn(e[a].field);return this}},events:{resize:function(a,b,c){a.triggerHandler("resize",[b,c])}},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.responsiveDesign.public),b.responsive&&(a.on("initialized",function(){a.makeResponsive(),a.oldWidth=a.width(),a.resizeCheckIntervalId=setInterval(function(){var b=a.width();b!==a.oldWidth&&gj.grid.plugins.responsiveDesign.events.resize(a,b,a.oldWidth),a.oldWidth=b},b.resizeCheckInterval)}),a.on("destroy",function(){a.resizeCheckIntervalId&&clearInterval(a.resizeCheckIntervalId)}),a.on("resize",function(){a.makeResponsive()})),b.showHiddenColumnsAsDetails&&gj.grid.plugins.expandCollapseRows&&(a.on("dataBound",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("columnHide",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("columnShow",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}),a.on("rowDataBound",function(){gj.grid.plugins.responsiveDesign.private.updateDetails(a)}))}},gj.grid.plugins.toolbar={config:{base:{toolbarTemplate:void 0,title:void 0,style:{toolbar:"gj-grid-md-toolbar"}},bootstrap:{style:{toolbar:"gj-grid-bootstrap-toolbar"}},bootstrap4:{style:{toolbar:"gj-grid-bootstrap-4-toolbar"}}},private:{init:function(a){var b,c,d;b=a.data(),c=a.prev('div[data-role="toolbar"]'),(void 0!==b.toolbarTemplate||void 0!==b.title||c.length>0)&&(0===c.length&&(c=$('<div data-role="toolbar"></div>'),a.before(c)),c.addClass(b.style.toolbar),0===c.children().length&&b.toolbarTemplate&&c.append(b.toolbarTemplate),d=c.find('[data-role="title"]'),0===d.length&&(d=$('<div data-role="title"/>'),c.prepend(d)),b.title&&d.text(b.title),b.minWidth&&c.css("min-width",b.minWidth))}},public:{title:function(a){var b=this.parent().find('div[data-role="toolbar"] [data-role="title"]');return void 0!==a?(b.text(a),this):b.text()}},configure:function(a){$.extend(!0,a,gj.grid.plugins.toolbar.public),a.on("initialized",function(){gj.grid.plugins.toolbar.private.init(a)}),a.on("destroying",function(){a.prev('[data-role="toolbar"]').remove()})}},gj.grid.plugins.resizableColumns={config:{base:{resizableColumns:!1}},private:{init:function(a,b){var c,d,e,f,g,h;if(c=a.find('thead tr[data-role="caption"] th'),c.length){for(e=0;e<c.length-1;e++)d=$(c[e]),f=$('<div class="gj-grid-column-resizer-wrapper" />'),h=parseInt(d.css("padding-right"),10)+3,g=$('<span class="gj-grid-column-resizer" />').css("margin-right","-"+h+"px"),g.draggable({start:function(){a.addClass("gj-unselectable"),a.addClass("gj-grid-resize-cursor")},stop:function(){a.removeClass("gj-unselectable"),a.removeClass("gj-grid-resize-cursor"),this.style.removeProperty("top"),this.style.removeProperty("left"),this.style.removeProperty("position")},drag:gj.grid.plugins.resizableColumns.private.createResizeHandle(a,d,b.columns[e])}),d.append(f.append(g));for(e=0;e<c.length;e++)d=$(c[e]),d.attr("width")||d.attr("width",d.outerWidth())}},createResizeHandle:function(a,b,c){var d=a.data();return function(e,f){var g,h,i,j,k,l,m=parseInt(b.attr("width"),10),n=gj.core.position(this),o={top:f.top-n.top,left:f.left-n.left};if(m||(m=b.outerWidth()),o.left&&(k=m+o.left,c.width=k,b.attr("width",k),h=b[0].cellIndex,j=b[0].parentElement.children[h+1],l=parseInt($(j).attr("width"),10)-o.left,j.setAttribute("width",l),d.resizableColumns))for(i=a[0].tBodies[0].children,g=0;g<i.length;g++)i[g].cells[h].setAttribute("width",k),j=i[g].cells[h+1],j.setAttribute("width",l)}}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.resizableColumns.public),b.resizableColumns&&gj.draggable&&a.on("initialized",function(){gj.grid.plugins.resizableColumns.private.init(a,b)})}},gj.grid.plugins.rowReorder={config:{base:{rowReorder:!1,rowReorderColumn:void 0,orderNumberField:void 0,style:{targetRowIndicatorTop:"gj-grid-row-reorder-indicator-top",targetRowIndicatorBottom:"gj-grid-row-reorder-indicator-bottom"}}},private:{init:function(a){var b,c,d,e=a.find('tbody tr[data-role="row"]');for(a.data("rowReorderColumn")&&(c=gj.grid.methods.getColumnPosition(a.data("columns"),a.data("rowReorderColumn"))),b=0;b<e.length;b++)d=$(e[b]),void 0!==c?d.find("td:eq("+c+")").on("mousedown",gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(a,d)):d.on("mousedown",gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(a,d))},createRowMouseDownHandler:function(a,b){return function(c){var d,e,f=a.clone(),g=a.data("columns");for(a.addClass("gj-unselectable"),$("body").append(f),f.attr("data-role","draggable-clone").css("cursor","move"),f.children("thead").remove().children("tfoot").remove(),f.find('tbody tr:not([data-position="'+b.data("position")+'"])').remove(),e=f.find("tbody tr td"),d=0;d<e.length;d++)g[d].width&&e[d].setAttribute("width",g[d].width);f.draggable({stop:gj.grid.plugins.rowReorder.private.createDragStopHandler(a,b)}),f.css({position:"absolute",top:b.offset().top,left:b.offset().left,width:b.width(),zIndex:1}),"true"===b.attr("data-droppable")&&b.droppable("destroy"),b.siblings('tr[data-role="row"]').each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable({over:gj.grid.plugins.rowReorder.private.createDroppableOverHandler(b),out:gj.grid.plugins.rowReorder.private.droppableOut})}),f.trigger("mousedown")}},createDragStopHandler:function(a,b){return function(c,d){$('table[data-role="draggable-clone"]').draggable("destroy").remove(),a.removeClass("gj-unselectable"),b.siblings('tr[data-role="row"]').each(function(){var c,e,f,g,h,i=$(this),j=i.data("position"),k=b.data("position"),l=a.data();if(i.droppable("isOver",d)){for(j<k?i.before(b):i.after(b),l.records.splice(j-1,0,l.records.splice(k-1,1)[0]),c=i.parent().find('tr[data-role="row"]'),f=0;f<c.length;f++)$(c[f]).attr("data-position",f+1);if(l.orderNumberField){for(f=0;f<l.records.length;f++)l.records[f][l.orderNumberField]=f+1;for(f=0;f<c.length;f++)e=$(c[f]),h=gj.grid.methods.getId(e,l.primaryKey,e.attr("data-position")),g=gj.grid.methods.getByPosition(a,e.attr("data-position")),a.setCellContent(h,l.orderNumberField,g[l.orderNumberField])}}i.removeClass("gj-grid-top-border"),i.removeClass("gj-grid-bottom-border"),i.droppable("destroy")})}},createDroppableOverHandler:function(a){return function(b){var c=$(this);c.data("position")<a.data("position")?c.addClass("gj-grid-top-border"):c.addClass("gj-grid-bottom-border")}},droppableOut:function(){$(this).removeClass("gj-grid-top-border"),$(this).removeClass("gj-grid-bottom-border")}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.rowReorder.public),b.rowReorder&&gj.draggable&&gj.droppable&&a.on("dataBound",function(){gj.grid.plugins.rowReorder.private.init(a)})}},gj.grid.plugins.export={config:{base:{}},public:{getCSV:function(a){var b,c,d="",e="",f=this.data().columns,g=this.getAll(a);if(g.length){for(b=0;b<f.length;b++)gj.grid.plugins.export.public.isColumnApplicable(f[b])&&(d+='"'+(f[b].title||f[b].field).replace(/<[^>]+>/g," ")+'",');for(e+=d.slice(0,d.length-1)+"\r\n",b=0;b<g.length;b++){for(d="",c=0;c<f.length;c++)gj.grid.plugins.export.public.isColumnApplicable(f[c])&&(d+='"'+g[b][f[c].field]+'",');e+=d.slice(0,d.length-1)+"\r\n"}}return e},downloadCSV:function(a,b){var c=document.createElement("a");return document.body.appendChild(c),c.download=a||"griddata.csv",window.navigator.userAgent.indexOf("Edge")>-1?c.href=URL.createObjectURL(new Blob([this.getCSV(b)],{type:"text/csv;charset=utf-8;"})):c.href="data:text/csv;charset=utf-8,"+escape(this.getCSV(b)),c.click(),document.body.removeChild(c),this},isColumnApplicable:function(a){return!0!==a.hidden&&!a.role}},configure:function(a){$.extend(!0,a,gj.grid.plugins.export.public)}},gj.grid.plugins.columnReorder={config:{base:{columnReorder:!1,dragReady:!1,style:{targetRowIndicatorTop:"gj-grid-row-reorder-indicator-top",targetRowIndicatorBottom:"gj-grid-row-reorder-indicator-bottom"}}},private:{init:function(a){var b,c,d=a.find("thead tr th");for(b=0;b<d.length;b++)c=$(d[b]),c.on("mousedown",gj.grid.plugins.columnReorder.private.createMouseDownHandler(a,c)),c.on("mousemove",gj.grid.plugins.columnReorder.private.createMouseMoveHandler(a,c)),c.on("mouseup",gj.grid.plugins.columnReorder.private.createMouseUpHandler(a,c))},createMouseDownHandler:function(a){return function(b){a.timeout=setTimeout(function(){a.data("dragReady",!0)},100)}},createMouseUpHandler:function(a){return function(b){clearTimeout(a.timeout),a.data("dragReady",!1)}},createMouseMoveHandler:function(a,b){return function(c){var d,e;a.data("dragReady")&&(a.data("dragReady",!1),d=a.clone(),e=b.index(),a.addClass("gj-unselectable"),$("body").append(d),d.attr("data-role","draggable-clone").css("cursor","move"),d.find("thead tr th:eq("+e+")").siblings().remove(),d.find('tbody tr[data-role != "row"]').remove(),d.find("tbody tr td:nth-child("+(e+1)+")").siblings().remove(),d.find("tfoot").remove(),d.draggable({stop:gj.grid.plugins.columnReorder.private.createDragStopHandler(a,b)}),d.css({position:"absolute",top:b.offset().top,left:b.offset().left,width:b.width(),zIndex:1}),"true"===b.attr("data-droppable")&&b.droppable("destroy"),b.siblings("th").each(function(){var c=$(this);"true"===c.attr("data-droppable")&&c.droppable("destroy"),c.droppable({over:gj.grid.plugins.columnReorder.private.createDroppableOverHandler(a,b),out:gj.grid.plugins.columnReorder.private.droppableOut})}),d.trigger("mousedown"))}},createDragStopHandler:function(a,b){return function(c,d){$('table[data-role="draggable-clone"]').draggable("destroy").remove(),a.removeClass("gj-unselectable"),b.siblings("th").each(function(){var c=$(this),e=a.data(),f=gj.grid.methods.getColumnPosition(e.columns,c.data("field")),g=gj.grid.methods.getColumnPosition(e.columns,b.data("field"));c.removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),c.closest("table").find('tbody tr[data-role="row"] td:nth-child('+(c.index()+1)+")").removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),c.droppable("isOver",d)&&(f<g?c.before(b):c.after(b),gj.grid.plugins.columnReorder.private.moveRowCells(a,g,f),e.columns.splice(f,0,e.columns.splice(g,1)[0])),c.droppable("destroy")})}},moveRowCells:function(a,b,c){var d,e,f=a.find('tbody tr[data-role="row"]');for(d=0;d<f.length;d++)e=$(f[d]),c<b?e.find("td:eq("+c+")").before(e.find("td:eq("+b+")")):e.find("td:eq("+c+")").after(e.find("td:eq("+b+")"))},createDroppableOverHandler:function(a,b){return function(c){var d=$(this),e=a.data();gj.grid.methods.getColumnPosition(e.columns,d.data("field"))<gj.grid.methods.getColumnPosition(e.columns,b.data("field"))?(d.addClass("gj-grid-left-border"),a.find('tbody tr[data-role="row"] td:nth-child('+(d.index()+1)+")").addClass("gj-grid-left-border")):(d.addClass("gj-grid-right-border"),a.find('tbody tr[data-role="row"] td:nth-child('+(d.index()+1)+")").addClass("gj-grid-right-border"))}},droppableOut:function(){var a=$(this);a.removeClass("gj-grid-left-border").removeClass("gj-grid-right-border"),a.closest("table").find('tbody tr[data-role="row"] td:nth-child('+(a.index()+1)+")").removeClass("gj-grid-left-border").removeClass("gj-grid-right-border")}},public:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.columnReorder.public),b.columnReorder&&a.on("initialized",function(){gj.grid.plugins.columnReorder.private.init(a)})}},gj.grid.plugins.headerFilter={config:{base:{defaultColumnSettings:{filterable:!0},headerFilter:{type:"onenterkeypress"}}},private:{init:function(a){var b,c,d,e=a.data(),f=$('<tr data-role="filter"/>');for(b=0;b<e.columns.length;b++)c=$("<th/>"),e.columns[b].filterable&&(d=$('<input data-field="'+e.columns[b].field+'" class="gj-width-full" />'),"onchange"===e.headerFilter.type?d.on("input propertychange",function(b){gj.grid.plugins.headerFilter.private.reload(a,$(this))}):(d.on("keypress",function(b){13==b.which&&gj.grid.plugins.headerFilter.private.reload(a,$(this))}),d.on("blur",function(b){gj.grid.plugins.headerFilter.private.reload(a,$(this))})),c.append(d)),e.columns[b].hidden&&c.hide(),f.append(c);a.children("thead").append(f)},reload:function(a,b){var c={};c[b.data("field")]=b.val(),a.reload(c)}},public:{},events:{},configure:function(a,b,c){$.extend(!0,a,gj.grid.plugins.headerFilter.public);a.data();c.headerFilter&&a.on("initialized",function(){gj.grid.plugins.headerFilter.private.init(a)})}},gj.grid.plugins.grouping={config:{base:{paramNames:{groupBy:"groupBy",groupByDirection:"groupByDirection"},grouping:{groupBy:void 0,direction:"asc"},icons:{expandGroup:'<i class="gj-icon plus" />',collapseGroup:'<i class="gj-icon minus" />'}},fontawesome:{icons:{expandGroup:'<i class="fa fa-plus" aria-hidden="true"></i>',collapseGroup:'<i class="fa fa-minus" aria-hidden="true"></i>'}},glyphicons:{icons:{expandGroup:'<span class="glyphicon glyphicon-plus" />',collapseGroup:'<span class="glyphicon glyphicon-minus" />'}}},private:{init:function(a){var b,c=a.data();b=void 0,a.on("rowDataBound",function(d,e,f,g){if(b!==g[c.grouping.groupBy]||1===e[0].rowIndex){var h=gj.grid.methods.countVisibleColumns(a)-1,i=$('<tr role="group" />'),j=$('<td class="gj-text-align-center gj-unselectable gj-cursor-pointer" />');j.append('<div data-role="display">'+c.icons.collapseGroup+"</div>"),j.on("click",gj.grid.plugins.grouping.private.createExpandCollapseHandler(c)),i.append(j),i.append('<td colspan="'+h+'"><div data-role="display">'+c.grouping.groupBy+": "+g[c.grouping.groupBy]+"</div></td>"),i.insertBefore(e),b=g[c.grouping.groupBy]}e.show()}),c.params[c.paramNames.groupBy]=c.grouping.groupBy,c.params[c.paramNames.groupByDirection]=c.grouping.direction},grouping:function(a,b){var c=a.data();b.sort(gj.grid.methods.createDefaultSorter(c.grouping.direction,c.grouping.groupBy))},createExpandCollapseHandler:function(a){return function(b){var c=$(this),d=gj.grid.plugins.grouping.private;"row"===c.closest("tr").next(":visible").data("role")?d.collapseGroup(a,c):d.expandGroup(a,c)}},collapseGroup:function(a,b){var c=b.children('div[data-role="display"]');b.closest("tr").nextUntil('[role="group"]').hide(),c.empty().append(a.icons.expandGroup)},expandGroup:function(a,b){var c=b.children('div[data-role="display"]');b.closest("tr").nextUntil('[role="group"]').show(),c.empty().append(a.icons.collapseGroup)}},public:{},configure:function(a){var b,c=a.data();$.extend(!0,a,gj.grid.plugins.grouping.public),c.grouping&&c.grouping.groupBy&&(b={title:"",width:c.defaultIconColumnWidth,align:"center",stopPropagation:!0,cssClass:"gj-cursor-pointer gj-unselectable"},c.columns=[b].concat(c.columns),a.on("initialized",function(){gj.grid.plugins.grouping.private.init(a)}),a.on("dataFiltered",function(b,c){gj.grid.plugins.grouping.private.grouping(a,c)}))}},gj.grid.messages["en-us"]={First:"First",Previous:"Previous",Next:"Next",Last:"Last",Page:"Page",FirstPageTooltip:"First Page",PreviousPageTooltip:"Previous Page",NextPageTooltip:"Next Page",LastPageTooltip:"Last Page",Refresh:"Refresh",Of:"of",DisplayingRecords:"Displaying records",RowsPerPage:"Rows per page:",Edit:"Edit",Delete:"Delete",Update:"Update",Cancel:"Cancel",NoRecordsFound:"No records found.",Loading:"Loading..."},gj.tree={plugins:{}},gj.tree.config={base:{params:{},autoLoad:!0,selectionType:"single",cascadeSelection:!1,dataSource:void 0,primaryKey:void 0,textField:"text",childrenField:"children",hasChildrenField:"hasChildren",imageCssClassField:"imageCssClass",imageUrlField:"imageUrl",imageHtmlField:"imageHtml",disabledField:"disabled",width:void 0,border:!1,uiLibrary:"materialdesign",iconsLibrary:"materialicons",autoGenId:1,autoGenFieldName:"autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a",indentation:24,style:{wrapper:"gj-unselectable",list:"gj-list gj-list-md",item:void 0,active:"gj-list-md-active",leafIcon:void 0,border:"gj-tree-md-border"},icons:{expand:'<i class="gj-icon chevron-right" />',collapse:'<i class="gj-icon chevron-down" />'}},bootstrap:{style:{wrapper:"gj-unselectable gj-tree-bootstrap-3",list:"gj-list gj-list-bootstrap list-group",item:"list-group-item",active:"active",border:"gj-tree-bootstrap-border"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapper:"gj-unselectable gj-tree-bootstrap-4",list:"gj-list gj-list-bootstrap",item:"list-group-item",active:"active",border:"gj-tree-bootstrap-border"},icons:{expand:'<i class="gj-icon plus" />',collapse:'<i class="gj-icon minus" />'}},materialicons:{style:{expander:"gj-tree-material-icons-expander"}},fontawesome:{style:{expander:"gj-tree-font-awesome-expander"},icons:{expand:'<i class="fa fa-plus" aria-hidden="true"></i>',collapse:'<i class="fa fa-minus" aria-hidden="true"></i>'}},glyphicons:{style:{expander:"gj-tree-glyphicons-expander"},icons:{expand:'<span class="glyphicon glyphicon-plus" />',collapse:'<span class="glyphicon glyphicon-minus" />'}}},gj.tree.events={initialized:function(a){a.triggerHandler("initialized")},dataBinding:function(a){a.triggerHandler("dataBinding")},dataBound:function(a){a.triggerHandler("dataBound")},select:function(a,b,c){return a.triggerHandler("select",[b,c])},unselect:function(a,b,c){return a.triggerHandler("unselect",[b,c])},expand:function(a,b,c){return a.triggerHandler("expand",[b,c])},collapse:function(a,b,c){return a.triggerHandler("collapse",[b,c])},enable:function(a,b){return a.triggerHandler("enable",[b])},disable:function(a,b){return a.triggerHandler("disable",[b])},destroying:function(a){return a.triggerHandler("destroying")},nodeDataBound:function(a,b,c,d){return a.triggerHandler("nodeDataBound",[b,c,d])}},gj.tree.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"tree"),gj.tree.methods.initialize.call(this),this.data("autoLoad")&&this.reload(),this},initialize:function(){var a=this.data(),b=$('<ul class="'+a.style.list+'"/>');this.empty().addClass(a.style.wrapper).append(b),a.width&&this.width(a.width),a.border&&this.addClass(a.style.border),gj.tree.events.initialized(this)},useHtmlDataSource:function(a,b){b.dataSource=[]},render:function(a,b){var c;return b&&("string"==typeof b&&JSON&&(b=JSON.parse(b)),c=a.data(),c.records=b,c.primaryKey||gj.tree.methods.genAutoId(c,c.records),gj.tree.methods.loadData(a)),a},filter:function(a){return a.data().dataSource},genAutoId:function(a,b){var c;for(c=0;c<b.length;c++)b[c][a.autoGenFieldName]=a.autoGenId++,b[c][a.childrenField]&&b[c][a.childrenField].length&&gj.tree.methods.genAutoId(a,b[c][a.childrenField])},loadData:function(a){var b,c=a.data("records"),d=a.children("ul");for(gj.tree.events.dataBinding(a),d.off().empty(),b=0;b<c.length;b++)gj.tree.methods.appendNode(a,d,c[b],1);gj.tree.events.dataBound(a)},appendNode:function(a,b,c,d,e){var f,g,h,i,j,k=a.data(),l=k.primaryKey?c[k.primaryKey]:c[k.autoGenFieldName];if(g=$('<li data-id="'+l+'" data-role="node" />').addClass(k.style.item),$wrapper=$('<div data-role="wrapper" />'),$expander=$('<span data-role="expander" data-mode="close"></span>').addClass(k.style.expander),$display=$('<span data-role="display">'+c[k.textField]+"</span>"),hasChildren=void 0!==c[k.hasChildrenField]&&"true"===c[k.hasChildrenField].toString().toLowerCase(),disabled=void 0!==c[k.disabledField]&&"true"===c[k.disabledField].toString().toLowerCase(),k.indentation&&$wrapper.append('<span data-role="spacer" style="width: '+k.indentation*(d-1)+'px;"></span>'),disabled?gj.tree.methods.disableNode(a,g):($expander.on("click",gj.tree.methods.expanderClickHandler(a)),$display.on("click",gj.tree.methods.displayClickHandler(a))),$wrapper.append($expander),$wrapper.append($display),g.append($wrapper),e?b.find("li:eq("+(e-1)+")").before(g):b.append(g),k.imageCssClassField&&c[k.imageCssClassField]?(i=$('<span data-role="image"><span class="'+c[k.imageCssClassField]+'"></span></span>'),i.insertBefore($display)):k.imageUrlField&&c[k.imageUrlField]?(i=$('<span data-role="image"></span>'),i.insertBefore($display),j=$('<img src="'+c[k.imageUrlField]+'"></img>'),j.attr("width",i.width()).attr("height",i.height()),i.append(j)):k.imageHtmlField&&c[k.imageHtmlField]&&(i=$('<span data-role="image">'+c[k.imageHtmlField]+"</span>"),i.insertBefore($display)),c[k.childrenField]&&c[k.childrenField].length||hasChildren){if($expander.empty().append(k.icons.expand),h=$("<ul />").addClass(k.style.list).addClass("gj-hidden"),g.append(h),c[k.childrenField]&&c[k.childrenField].length)for(f=0;f<c[k.childrenField].length;f++)gj.tree.methods.appendNode(a,h,c[k.childrenField][f],d+1)}else k.style.leafIcon?$expander.addClass(k.style.leafIcon):$expander.html("&nbsp;");gj.tree.events.nodeDataBound(a,g,c.id,c)},expanderClickHandler:function(a){return function(b){var c=$(this),d=c.closest("li");"close"===c.attr("data-mode")?a.expand(d):a.collapse(d)}},expand:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=a.data(),h=b.attr("data-id"),i=b.children("ul");if(!1!==gj.tree.events.expand(a,b,h)&&i&&i.length&&(i.show(),f.attr("data-mode","open"),f.empty().append(g.icons.collapse),c))for(d=b.find("ul>li"),e=0;e<d.length;e++)gj.tree.methods.expand(a,$(d[e]),c);return a},collapse:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=a.data(),h=b.attr("data-id"),i=b.children("ul");if(!1!==gj.tree.events.collapse(a,b,h)&&i&&i.length&&(i.hide(),f.attr("data-mode","close"),f.empty().append(g.icons.expand),c))for(d=b.find("ul>li"),e=0;e<d.length;e++)gj.tree.methods.collapse(a,$(d[e]),c);return a},expandAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.expand(a,$(c[b]),!0);return a},collapseAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.collapse(a,$(c[b]),!0);return a},displayClickHandler:function(a){return function(b){var c=$(this),d=c.closest("li"),e=a.data().cascadeSelection;"true"===d.attr("data-selected")?gj.tree.methods.unselect(a,d,e):("single"===a.data("selectionType")&&gj.tree.methods.unselectAll(a),gj.tree.methods.select(a,d,e))}},selectAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.select(a,$(c[b]),!0);return a},select:function(a,b,c){var d,e,f=a.data();if("true"!==b.attr("data-selected")&&!1!==gj.tree.events.select(a,b,b.attr("data-id"))&&(b.addClass(f.style.active).attr("data-selected","true"),c))for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.select(a,$(e[d]),c)},unselectAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.unselect(a,$(c[b]),!0);return a},unselect:function(a,b,c){var d,e;a.data();if("true"===b.attr("data-selected")&&!1!==gj.tree.events.unselect(a,b,b.attr("data-id"))&&(b.removeClass(a.data().style.active).removeAttr("data-selected"),c))for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.unselect(a,$(e[d]),c)},getSelections:function(a){var b,c,d,e=[],f=a.children("li");if(f&&f.length)for(b=0;b<f.length;b++)c=$(f[b]),"true"===c.attr("data-selected")?e.push(c.attr("data-id")):c.has("ul")&&(d=gj.tree.methods.getSelections(c.children("ul")),d.length&&(e=e.concat(d)));return e},getDataById:function(a,b,c){var d,e=a.data(),f=void 0;for(d=0;d<c.length;d++){if(e.primaryKey&&c[d][e.primaryKey]==b){f=c[d];break}if(c[d][e.autoGenFieldName]==b){f=c[d];break}if(c[d][e.childrenField]&&c[d][e.childrenField].length&&(f=gj.tree.methods.getDataById(a,b,c[d][e.childrenField])))break}return f},getDataByText:function(a,b,c){var d,e=void 0,f=a.data();for(d=0;d<c.length;d++){if(b===c[d][f.textField]){e=c[d];break}if(c[d][f.childrenField]&&c[d][f.childrenField].length&&(e=gj.tree.methods.getDataByText(a,b,c[d][f.childrenField])))break}return e},getNodeById:function(a,b){var c,d,e=void 0,f=a.children("li");if(f&&f.length)for(c=0;c<f.length;c++){if(d=$(f[c]),b==d.attr("data-id")){e=d;break}if(d.has("ul")&&(e=gj.tree.methods.getNodeById(d.children("ul"),b)))break}return e},getNodeByText:function(a,b){var c,d,e=void 0,f=a.children("li");if(f&&f.length)for(c=0;c<f.length;c++){if(d=$(f[c]),b===d.find('>[data-role="wrapper"]>[data-role="display"]').text()){e=d;break}if(d.has("ul")&&(e=gj.tree.methods.getNodeByText(d.children("ul"),b)))break}return e},addNode:function(a,b,c,d){var e,f,g=a.data();return c&&c.length?("li"===c[0].tagName.toLowerCase()&&(0===c.children("ul").length&&(c.find('[data-role="expander"]').empty().append(g.icons.collapse),c.append($("<ul />").addClass(g.style.list))),c=c.children("ul")),f=a.getDataById(c.parent().data("id")),f[g.childrenField]||(f[g.childrenField]=[]),f[g.childrenField].push(b)):(c=a.children("ul"),a.data("records").push(b)),e=c.parentsUntil('[data-type="tree"]',"ul").length+1,g.primaryKey||gj.tree.methods.genAutoId(g,[b]),gj.tree.methods.appendNode(a,c,b,e,d),a},remove:function(a,b){return gj.tree.methods.removeDataById(a,b.attr("data-id"),a.data("records")),b.remove(),a},removeDataById:function(a,b,c){var d,e=a.data();for(d=0;d<c.length;d++){if(e.primaryKey&&c[d][e.primaryKey]==b){c.splice(d,1);break}if(c[d][e.autoGenFieldName]==b){c.splice(d,1);break}c[d][e.childrenField]&&c[d][e.childrenField].length&&gj.tree.methods.removeDataById(a,b,c[d][e.childrenField])}},update:function(a,b,c){var d=a.data(),e=a.getNodeById(b);a.getDataById(b);return c,e.find('>[data-role="wrapper"]>[data-role="display"]').html(c[d.textField]),gj.tree.events.nodeDataBound(a,e,b,c),a},getChildren:function(a,b,c){var d,e,f=[],c=void 0===c||c;for(e=c?b.find("ul li"):b.find(">ul>li"),d=0;d<e.length;d++)f.push($(e[d]).data("id"));return f},enableAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.enableNode(a,$(c[b]),!0);return a},enableNode:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=b.find('>[data-role="wrapper"]>[data-role="display"]'),c=void 0===c||c;if(b.removeClass("disabled"),f.on("click",gj.tree.methods.expanderClickHandler(a)),g.on("click",gj.tree.methods.displayClickHandler(a)),gj.tree.events.enable(a,b),c)for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.enableNode(a,$(e[d]),c)},disableAll:function(a){var b,c=a.find("ul>li");for(b=0;b<c.length;b++)gj.tree.methods.disableNode(a,$(c[b]),!0);return a},disableNode:function(a,b,c){var d,e,f=b.find('>[data-role="wrapper"]>[data-role="expander"]'),g=b.find('>[data-role="wrapper"]>[data-role="display"]'),c=void 0===c||c;if(b.addClass("disabled"),f.off("click"),g.off("click"),gj.tree.events.disable(a,b),c)for(e=b.find("ul>li"),d=0;d<e.length;d++)gj.tree.methods.disableNode(a,$(e[d]),c)},destroy:function(a){return a.data()&&(gj.tree.events.destroying(a),a.xhr&&a.xhr.abort(),a.off(),a.removeData(),a.removeAttr("data-type"),a.removeClass().empty()),a},pathFinder:function(a,b,c,d){var e,f=!1;for(e=0;e<b.length;e++){if(b[e].id==c){f=!0;break}if(gj.tree.methods.pathFinder(a,b[e][a.childrenField],c,d)){d.push(b[e].data[a.textField]),f=!0;break}}return f}},gj.tree.widget=function(a,b){var c=this,d=gj.tree.methods;return c.reload=function(a){return gj.widget.prototype.reload.call(this,a)},c.render=function(a){return d.render(this,a)},c.addNode=function(a,b,c){return d.addNode(this,a,b,c)},c.removeNode=function(a){return d.remove(this,a)},c.updateNode=function(a,b){return d.update(this,a,b)},c.destroy=function(){return d.destroy(this)},c.expand=function(a,b){return d.expand(this,a,b)},c.collapse=function(a,b){return d.collapse(this,a,b)},c.expandAll=function(){return d.expandAll(this)},c.collapseAll=function(){return d.collapseAll(this)},c.getDataById=function(a){return d.getDataById(this,a,this.data("records"))},c.getDataByText=function(a){return d.getDataByText(this,a,this.data("records"))},c.getNodeById=function(a){return d.getNodeById(this.children("ul"),a)},c.getNodeByText=function(a){return d.getNodeByText(this.children("ul"),a)},c.getAll=function(){return this.data("records")},c.select=function(a){return d.select(this,a)},c.unselect=function(a){return d.unselect(this,a)},c.selectAll=function(){return d.selectAll(this)},c.unselectAll=function(){return d.unselectAll(this)},c.getSelections=function(){return d.getSelections(this.children("ul"))},c.getChildren=function(a,b){return d.getChildren(this,a,b)},c.parents=function(a){var b=[],c=this.data();return d.pathFinder(c,c.records,a,b),b.reverse()},c.enable=function(a,b){return d.enableNode(this,a,b)},c.enableAll=function(){return d.enableAll(this)},c.disable=function(a,b){return d.disableNode(this,a,b)},c.disableAll=function(){return d.disableAll(this)},$.extend(a,c),"tree"!==a.attr("data-type")&&d.init.call(a,b),a},gj.tree.widget.prototype=new gj.widget,gj.tree.widget.constructor=gj.tree.widget,function(a){a.fn.tree=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.tree.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.tree.widget(this,a)}}}(jQuery),gj.tree.plugins.checkboxes={config:{base:{checkboxes:void 0,checkedField:"checked",cascadeCheck:!0}},private:{dataBound:function(a){var b;a.data("cascadeCheck")&&(b=a.find('li[data-role="node"]'),$.each(b,function(){var a=$(this),b=a.find('[data-role="checkbox"] input[type="checkbox"]').checkbox("state");"checked"===b&&(gj.tree.plugins.checkboxes.private.updateChildrenState(a,b),gj.tree.plugins.checkboxes.private.updateParentState(a,b))}))},nodeDataBound:function(a,b,c,d){var e,f,g,h,i;0===b.find('> [data-role="wrapper"] > [data-role="checkbox"]').length&&(e=a.data(),f=b.find('> [data-role="wrapper"] > [data-role="expander"]'),g=$('<input type="checkbox"/>'),h=$('<span data-role="checkbox"></span>').append(g),i=void 0!==d[e.disabledField]&&"true"===d[e.disabledField].toString().toLowerCase(),g=g.checkbox({uiLibrary:e.uiLibrary,iconsLibrary:e.iconsLibrary,change:function(c,e){gj.tree.plugins.checkboxes.events.checkboxChange(a,b,d,g.state())}}),i&&g.prop("disabled",!0),d[e.checkedField]&&g.state("checked"),g.on("click",function(a){var b=g.closest("li"),c=g.state();e.cascadeCheck&&(gj.tree.plugins.checkboxes.private.updateChildrenState(b,c),gj.tree.plugins.checkboxes.private.updateParentState(b,c))}),f.after(h))},updateParentState:function(a,b){var c,d,e,f,g,h;c=a.parent("ul").parent("li"),1===c.length&&(d=a.parent("ul").parent("li").find('> [data-role="wrapper"] > [data-role="checkbox"] input[type="checkbox"]'),e=a.siblings().find('> [data-role="wrapper"] > span[data-role="checkbox"] input[type="checkbox"]'),f="checked"===b,g="unchecked"===b,h="indeterminate",$.each(e,function(){var a=$(this).checkbox("state");f&&"checked"!==a&&(f=!1),g&&"unchecked"!==a&&(g=!1)}),f&&!g&&(h="checked"),!f&&g&&(h="unchecked"),d.checkbox("state",h),gj.tree.plugins.checkboxes.private.updateParentState(c,d.checkbox("state")))},updateChildrenState:function(a,b){var c=a.find('ul li [data-role="wrapper"] [data-role="checkbox"] input[type="checkbox"]');c.length>0&&$.each(c,function(){$(this).checkbox("state",b)})},update:function(a,b,c){var d=b.find('[data-role="checkbox"] input[type="checkbox"]').first();$(d).checkbox("state",c),a.data().cascadeCheck&&(gj.tree.plugins.checkboxes.private.updateChildrenState(b,c),gj.tree.plugins.checkboxes.private.updateParentState(b,c))}},public:{getCheckedNodes:function(){var a=[],b=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(b,function(){var b=$(this);"checked"===b.checkbox("state")&&a.push(b.closest("li").data("id"))}),a},checkAll:function(){var a=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(a,function(){$(this).checkbox("state","checked")}),this},uncheckAll:function(){var a=this.find('li [data-role="checkbox"] input[type="checkbox"]');return $.each(a,function(){$(this).checkbox("state","unchecked")}),this},check:function(a){return gj.tree.plugins.checkboxes.private.update(this,a,"checked"),this},uncheck:function(a){return gj.tree.plugins.checkboxes.private.update(this,a,"unchecked"),this}},events:{checkboxChange:function(a,b,c,d){return a.triggerHandler("checkboxChange",[b,c,d])}},configure:function(a){a.data("checkboxes")&&gj.checkbox&&($.extend(!0,a,gj.tree.plugins.checkboxes.public),a.on("nodeDataBound",function(b,c,d,e){gj.tree.plugins.checkboxes.private.nodeDataBound(a,c,d,e)}),a.on("dataBound",function(){gj.tree.plugins.checkboxes.private.dataBound(a)}),a.on("enable",function(a,b){b.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop("disabled",!1)}),a.on("disable",function(a,b){b.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop("disabled",!0)}))}},gj.tree.plugins.dragAndDrop={config:{base:{dragAndDrop:void 0,style:{dragEl:"gj-tree-drag-el gj-tree-md-drag-el",dropAsChildIcon:"gj-cursor-pointer gj-icon plus",dropAbove:"gj-tree-drop-above",dropBelow:"gj-tree-drop-below"}},bootstrap:{style:{dragEl:"gj-tree-drag-el gj-tree-bootstrap-drag-el",dropAsChildIcon:"glyphicon glyphicon-plus",dropAbove:"drop-above",dropBelow:"drop-below"}},bootstrap4:{style:{dragEl:"gj-tree-drag-el gj-tree-bootstrap-drag-el",dropAsChildIcon:"gj-cursor-pointer gj-icon plus",dropAbove:"drop-above",dropBelow:"drop-below"}}},private:{nodeDataBound:function(a,b){var c=b.children('[data-role="wrapper"]'),d=b.find('>[data-role="wrapper"]>[data-role="display"]');c.length&&d.length&&(d.on("mousedown",gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler(a)),d.on("mousemove",gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler(a,b,d)),d.on("mouseup",gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler(a)))},createNodeMouseDownHandler:function(a){return function(b){a.data("dragReady",!0)}},createNodeMouseUpHandler:function(a){return function(b){a.data("dragReady",!1)}},createNodeMouseMoveHandler:function(a,b,c){return function(d){if(a.data("dragReady")){var e,f,g,h,i=a.data();a.data("dragReady",!1),e=c.clone().wrap('<div data-role="wrapper"/>').closest("div").wrap('<li class="'+i.style.item+'" />').closest("li").wrap('<ul class="'+i.style.list+'" />').closest("ul"),$("body").append(e),e.attr("data-role","draggable-clone").addClass("gj-unselectable").addClass(i.style.dragEl),e.find('[data-role="wrapper"]').prepend('<span data-role="indicator" />'),e.draggable({drag:gj.tree.plugins.dragAndDrop.private.createDragHandler(a,b,c),stop:gj.tree.plugins.dragAndDrop.private.createDragStopHandler(a,b,c)}),f=c.parent(),g=c.offset().top,g-=parseInt(f.css("border-top-width"))+parseInt(f.css("margin-top"))+parseInt(f.css("padding-top")),h=c.offset().left,h-=parseInt(f.css("border-left-width"))+parseInt(f.css("margin-left"))+parseInt(f.css("padding-left")),h-=e.find('[data-role="indicator"]').outerWidth(!0),e.css({position:"absolute",top:g,left:h,width:c.outerWidth(!0)}),"true"===c.attr("data-droppable")&&c.droppable("destroy"),gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c).each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable()}),gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b).each(function(){var a=$(this);"true"===a.attr("data-droppable")&&a.droppable("destroy"),a.droppable()}),e.trigger("mousedown")}}},getTargetDisplays:function(a,b,c){return a.find('[data-role="display"]').not(c).not(b.find('[data-role="display"]'))},getTargetWrappers:function(a,b){return a.find('[data-role="wrapper"]').not(b.find('[data-role="wrapper"]'))},createDragHandler:function(a,b,c){var d=gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c),e=gj.tree.plugins.dragAndDrop.private.getTargetWrappers(a,b),f=a.data();return function(a,b,c){var g=$(this),h=!1;d.each(function(){var a,b=$(this);if(b.droppable("isOver",c))return a=g.find('[data-role="indicator"]'),f.style.dropAsChildIcon?a.addClass(f.style.dropAsChildIcon):a.text("+"),h=!0,!1;g.find('[data-role="indicator"]').removeClass(f.style.dropAsChildIcon).empty()}),e.each(function(){var a,b=$(this);!h&&b.droppable("isOver",c)?(a=b.position().top+b.outerHeight()/2,c.y<a?b.addClass(f.style.dropAbove).removeClass(f.style.dropBelow):b.addClass(f.style.dropBelow).removeClass(f.style.dropAbove)):b.removeClass(f.style.dropAbove).removeClass(f.style.dropBelow)})}},createDragStopHandler:function(a,b,c){var d=gj.tree.plugins.dragAndDrop.private.getTargetDisplays(a,b,c),e=gj.tree.plugins.dragAndDrop.private.getTargetWrappers(a,b),f=a.data();return function(c,g){var h,i,j,k,l=!1;$(this).draggable("destroy").remove(),d.each(function(){var c,d=$(this);if(d.droppable("isOver",g))return i=d.closest("li"),j=b.parent("ul").parent("li"),c=i.children("ul"),0===c.length&&(c=$("<ul />").addClass(f.style.list),i.append(c)),!1!==gj.tree.plugins.dragAndDrop.events.nodeDrop(a,b.data("id"),i.data("id"),c.children("li").length+1)&&(c.append(b),h=a.getDataById(b.data("id")),gj.tree.methods.removeDataById(a,b.data("id"),f.records),k=a.getDataById(c.parent().data("id")),void 0===k[f.childrenField]&&(k[f.childrenField]=[]),k[f.childrenField].push(h),gj.tree.plugins.dragAndDrop.private.refresh(a,b,i,j)),l=!0,!1;d.droppable("destroy")}),l||e.each(function(){var c,d,e,k=$(this);if(k.droppable("isOver",g))return i=k.closest("li"),j=b.parent("ul").parent("li"),c=g.y<k.position().top+k.outerHeight()/2,e=b.data("id"),d=i.prevAll('li:not([data-id="'+e+'"])').length+(c?1:2),!1!==gj.tree.plugins.dragAndDrop.events.nodeDrop(a,e,i.parent("ul").parent("li").data("id"),d)&&(h=a.getDataById(b.data("id")),gj.tree.methods.removeDataById(a,b.data("id"),f.records),a.getDataById(i.parent().data("id"))[f.childrenField].splice(i.index()+(c?0:1),0,h),c?b.insertBefore(i):b.insertAfter(i),gj.tree.plugins.dragAndDrop.private.refresh(a,b,i,j)),!1;k.droppable("destroy")})}},refresh:function(a,b,c,d){var e=a.data();gj.tree.plugins.dragAndDrop.private.refreshNode(a,c),gj.tree.plugins.dragAndDrop.private.refreshNode(a,d),gj.tree.plugins.dragAndDrop.private.refreshNode(a,b),b.find('li[data-role="node"]').each(function(){gj.tree.plugins.dragAndDrop.private.refreshNode(a,$(this))}),c.children('[data-role="wrapper"]').removeClass(e.style.dropAbove).removeClass(e.style.dropBelow)},refreshNode:function(a,b){var c=b.children('[data-role="wrapper"]'),d=c.children('[data-role="expander"]'),e=c.children('[data-role="spacer"]'),f=b.children("ul"),g=a.data(),h=b.parentsUntil('[data-type="tree"]',"ul").length;f.length&&f.children().length?f.is(":visible")?d.empty().append(g.icons.collapse):d.empty().append(g.icons.expand):d.empty(),c.removeClass(g.style.dropAbove).removeClass(g.style.dropBelow),e.css("width",g.indentation*(h-1))}},public:{},events:{nodeDrop:function(a,b,c,d){return a.triggerHandler("nodeDrop",[b,c,d])}},configure:function(a){$.extend(!0,a,gj.tree.plugins.dragAndDrop.public),a.data("dragAndDrop")&&gj.draggable&&gj.droppable&&a.on("nodeDataBound",function(b,c){gj.tree.plugins.dragAndDrop.private.nodeDataBound(a,c)})}},gj.tree.plugins.lazyLoading={config:{base:{paramNames:{parentId:"parentId"},lazyLoading:!1}},private:{nodeDataBound:function(a,b,c,d){var e=a.data(),f=b.find('> [data-role="wrapper"] > [data-role="expander"]');d.hasChildren&&f.empty().append(e.icons.expand)},createDoneHandler:function(a,b){return function(c){var d,e,f,g=a.data();if("string"==typeof c&&JSON&&(c=JSON.parse(c)),c&&c.length){for(f=b.children("ul"),0===f.length&&(f=$("<ul />").addClass(g.style.list),b.append(f)),d=0;d<c.length;d++)a.addNode(c[d],f);e=b.find('>[data-role="wrapper"]>[data-role="expander"]'),e.attr("data-mode","open"),e.empty().append(g.icons.collapse),gj.tree.events.dataBound(a)}}},expand:function(a,b,c){var d,e=a.data(),f={},g=b.find(">ul>li");g&&g.length||"string"==typeof e.dataSource&&(f[e.paramNames.parentId]=c,d={url:e.dataSource,data:f},a.xhr&&a.xhr.abort(),a.xhr=$.ajax(d).done(gj.tree.plugins.lazyLoading.private.createDoneHandler(a,b)).fail(a.createErrorHandler()))}},public:{},events:{},configure:function(a,b,c){c.lazyLoading&&(a.on("nodeDataBound",function(b,c,d,e){gj.tree.plugins.lazyLoading.private.nodeDataBound(a,c,d,e)}),a.on("expand",function(b,c,d){gj.tree.plugins.lazyLoading.private.expand(a,c,d)}))}},gj.checkbox={plugins:{}},gj.checkbox.config={base:{uiLibrary:"materialdesign",iconsLibrary:"materialicons",style:{wrapperCssClass:"gj-checkbox-md",spanCssClass:void 0}},bootstrap:{style:{wrapperCssClass:"gj-checkbox-bootstrap"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapperCssClass:"gj-checkbox-bootstrap gj-checkbox-bootstrap-4"},iconsLibrary:"materialicons"},materialicons:{style:{iconsCssClass:"gj-checkbox-material-icons",spanCssClass:"gj-icon"}},glyphicons:{style:{iconsCssClass:"gj-checkbox-glyphicons",spanCssClass:""}},fontawesome:{style:{iconsCssClass:"gj-checkbox-fontawesome",spanCssClass:"fa"}}},gj.checkbox.methods={init:function(a){var b=this;return gj.widget.prototype.init.call(this,a,"checkbox"),b.attr("data-checkbox","true"),gj.checkbox.methods.initialize(b),b},initialize:function(a){var b,c,d=a.data();d.style.wrapperCssClass&&(b=$('<label class="'+d.style.wrapperCssClass+" "+d.style.iconsCssClass+'"></label>'),a.attr("id")&&b.attr("for",a.attr("id")),a.wrap(b),c=$("<span />"),d.style.spanCssClass&&c.addClass(d.style.spanCssClass),a.parent().append(c))},state:function(a,b){return b?("checked"===b?(a.prop("indeterminate",!1),a.prop("checked",!0)):"unchecked"===b?(a.prop("indeterminate",!1),a.prop("checked",!1)):"indeterminate"===b&&(a.prop("checked",!0),a.prop("indeterminate",!0)),gj.checkbox.events.change(a,b),a):b=a.prop("indeterminate")?"indeterminate":a.prop("checked")?"checked":"unchecked"},toggle:function(a){return"checked"==a.state()?a.state("unchecked"):a.state("checked"),a},destroy:function(a){return"true"===a.attr("data-checkbox")&&(a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-checkbox"),a.off(),a.next("span").remove(),a.unwrap()),a}},gj.checkbox.events={change:function(a,b){return a.triggerHandler("change",[b])}},gj.checkbox.widget=function(a,b){var c=this,d=gj.checkbox.methods;return c.toggle=function(){return d.toggle(this)},c.state=function(a){return d.state(this,a)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-checkbox")&&d.init.call(a,b),a},gj.checkbox.widget.prototype=new gj.widget,gj.checkbox.widget.constructor=gj.checkbox.widget,function(a){a.fn.checkbox=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.checkbox.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.checkbox.widget(this,a)}}}(jQuery),gj.editor={plugins:{},messages:{}},gj.editor.config={base:{height:300,width:void 0,uiLibrary:"materialdesign",iconsLibrary:"materialicons",locale:"en-us",buttons:void 0,style:{wrapper:"gj-editor gj-editor-md",buttonsGroup:"gj-button-md-group",button:"gj-button-md",buttonActive:"active"}},bootstrap:{style:{wrapper:"gj-editor gj-editor-bootstrap",buttonsGroup:"btn-group",button:"btn btn-default gj-cursor-pointer",buttonActive:"active"}},bootstrap4:{style:{wrapper:"gj-editor gj-editor-bootstrap",buttonsGroup:"btn-group",button:"btn btn-outline-secondary gj-cursor-pointer",buttonActive:"active"}},materialicons:{icons:{bold:'<i class="gj-icon bold" />',italic:'<i class="gj-icon italic" />',strikethrough:'<i class="gj-icon strikethrough" />',underline:'<i class="gj-icon underlined" />',listBulleted:'<i class="gj-icon list-bulleted" />',listNumbered:'<i class="gj-icon list-numbered" />',indentDecrease:'<i class="gj-icon indent-decrease" />',indentIncrease:'<i class="gj-icon indent-increase" />',alignLeft:'<i class="gj-icon align-left" />',alignCenter:'<i class="gj-icon align-center" />',alignRight:'<i class="gj-icon align-right" />',alignJustify:'<i class="gj-icon align-justify" />',undo:'<i class="gj-icon undo" />',redo:'<i class="gj-icon redo" />'}},fontawesome:{icons:{bold:'<i class="fa fa-bold" aria-hidden="true"></i>',italic:'<i class="fa fa-italic" aria-hidden="true"></i>',strikethrough:'<i class="fa fa-strikethrough" aria-hidden="true"></i>',underline:'<i class="fa fa-underline" aria-hidden="true"></i>',listBulleted:'<i class="fa fa-list-ul" aria-hidden="true"></i>',listNumbered:'<i class="fa fa-list-ol" aria-hidden="true"></i>',indentDecrease:'<i class="fa fa-indent" aria-hidden="true"></i>',indentIncrease:'<i class="fa fa-outdent" aria-hidden="true"></i>',alignLeft:'<i class="fa fa-align-left" aria-hidden="true"></i>',alignCenter:'<i class="fa fa-align-center" aria-hidden="true"></i>',alignRight:'<i class="fa fa-align-right" aria-hidden="true"></i>',alignJustify:'<i class="fa fa-align-justify" aria-hidden="true"></i>',undo:'<i class="fa fa-undo" aria-hidden="true"></i>',redo:'<i class="fa fa-repeat" aria-hidden="true"></i>'}}},gj.editor.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"editor"),this.attr("data-editor","true"),gj.editor.methods.initialize(this),this},initialize:function(a){var b,c,d,e,f,g=this,h=a.data();if(a.hide(),"wrapper"!==a[0].parentElement.attributes.role&&(d=document.createElement("div"),d.setAttribute("role","wrapper"),a[0].parentNode.insertBefore(d,a[0]),d.appendChild(a[0])),gj.editor.methods.localization(h),$(d).addClass(h.style.wrapper),h.width&&$(d).width(h.width),e=$(d).children('div[role="body"]'),0===e.length&&(e=$('<div role="body"></div>'),$(d).append(e),a[0].innerText&&(e[0].innerHTML=a[0].innerText)),e.attr("contenteditable",!0),e.on("keydown",function(b){var c=event.keyCode||event.charCode;!1===gj.editor.events.changing(a)&&8!==c&&46!==c&&b.preventDefault()}),e.on("mouseup keyup mouseout cut paste",function(b){g.updateToolbar(a,f),gj.editor.events.changed(a),a.html(e.html())}),f=$(d).children('div[role="toolbar"]'),0===f.length){f=$('<div role="toolbar"></div>'),e.before(f);for(var i in h.buttons){b=$("<div />").addClass(h.style.buttonsGroup);for(var j in h.buttons[i])c=$(h.buttons[i][j]),c.on("click",function(){gj.editor.methods.executeCmd(a,e,f,$(this))}),b.append(c);f.append(b)}}e.height(h.height-gj.core.height(f[0],!0))},localization:function(a){var b=gj.editor.messages[a.locale];void 0===a.buttons&&(a.buttons=[['<button type="button" class="'+a.style.button+'" title="'+b.bold+'" role="bold">'+a.icons.bold+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.italic+'" role="italic">'+a.icons.italic+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.strikethrough+'" role="strikethrough">'+a.icons.strikethrough+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.underline+'" role="underline">'+a.icons.underline+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.listBulleted+'" role="insertunorderedlist">'+a.icons.listBulleted+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.listNumbered+'" role="insertorderedlist">'+a.icons.listNumbered+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.indentDecrease+'" role="outdent">'+a.icons.indentDecrease+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.indentIncrease+'" role="indent">'+a.icons.indentIncrease+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.alignLeft+'" role="justifyleft">'+a.icons.alignLeft+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignCenter+'" role="justifycenter">'+a.icons.alignCenter+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignRight+'" role="justifyright">'+a.icons.alignRight+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.alignJustify+'" role="justifyfull">'+a.icons.alignJustify+"</button>"],['<button type="button" class="'+a.style.button+'" title="'+b.undo+'" role="undo">'+a.icons.undo+"</button>",'<button type="button" class="'+a.style.button+'" title="'+b.redo+'" role="redo">'+a.icons.redo+"</button>"]])},updateToolbar:function(a,b){var c=a.data();$buttons=b.find("[role]").each(function(){var a=$(this),b=a.attr("role");b&&document.queryCommandEnabled(b)&&"true"===document.queryCommandValue(b)?a.addClass(c.style.buttonActive):a.removeClass(c.style.buttonActive)})},executeCmd:function(a,b,c,d){b.focus(),document.execCommand(d.attr("role"),!1),gj.editor.methods.updateToolbar(a,c)},content:function(a,b){var c=a.parent().children('div[role="body"]');return void 0===b?c.html():c.html(b)},destroy:function(a){var b;return"true"===a.attr("data-editor")&&(b=a.parent(),b.children('div[role="body"]').remove(),b.children('div[role="toolbar"]').remove(),a.unwrap(),a.removeData(),a.removeAttr("data-guid"),a.removeAttr("data-editor"),a.off(),a.show()),a}},gj.editor.events={changing:function(a){return a.triggerHandler("changing")},changed:function(a){return a.triggerHandler("changed")}},gj.editor.widget=function(a,b){var c=this,d=gj.editor.methods;return c.content=function(a){return d.content(this,a)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-editor")&&d.init.call(a,b),a},gj.editor.widget.prototype=new gj.widget,gj.editor.widget.constructor=gj.editor.widget,function(a){a.fn.editor=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.editor.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.editor.widget(this,a)}}}(jQuery),gj.editor.messages["en-us"]={bold:"Bold",italic:"Italic",strikethrough:"Strikethrough",underline:"Underline",listBulleted:"List Bulleted",listNumbered:"List Numbered",indentDecrease:"Indent Decrease",indentIncrease:"Indent Increase",alignLeft:"Align Left",alignCenter:"Align Center",alignRight:"Align Right",alignJustify:"Align Justify",undo:"Undo",redo:"Redo"},gj.dropdown={plugins:{}},gj.dropdown.config={base:{dataSource:void 0,textField:"text",valueField:"value",selectedField:"selected",width:void 0,maxHeight:"auto",placeholder:void 0,fontSize:void 0,uiLibrary:"materialdesign",iconsLibrary:"materialicons",icons:{dropdown:'<i class="gj-icon arrow-dropdown" />',dropup:'<i class="gj-icon arrow-dropup" />'},style:{wrapper:"gj-dropdown gj-dropdown-md gj-unselectable",list:"gj-list gj-list-md gj-dropdown-list-md",active:"gj-list-md-active"}},bootstrap:{style:{wrapper:"gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable",presenter:"btn btn-default",list:"gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group",item:"list-group-item",active:"active"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapper:"gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable",presenter:"btn btn-outline-secondary",list:"gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group",item:"list-group-item",active:"active"}},materialicons:{style:{expander:"gj-dropdown-expander-mi"}},fontawesome:{icons:{dropdown:'<i class="fa fa-caret-down" aria-hidden="true"></i>',dropup:'<i class="fa fa-caret-up" aria-hidden="true"></i>'},style:{expander:"gj-dropdown-expander-fa"}},glyphicons:{icons:{dropdown:'<span class="caret"></span>',dropup:'<span class="dropup"><span class="caret" ></span></span>'},style:{expander:"gj-dropdown-expander-glyphicons"}}},gj.dropdown.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"dropdown"),this.attr("data-dropdown","true"),gj.dropdown.methods.initialize(this),this},getHTMLConfig:function(){var a=gj.widget.prototype.getHTMLConfig.call(this),b=this[0].attributes;return b.placeholder&&(a.placeholder=b.placeholder.value),a},initialize:function(a){var b=a.data(),c=a.parent('div[role="wrapper"]'),d=$('<span role="display"></span>'),e=$('<span role="expander">'+b.icons.dropdown+"</span>").addClass(b.style.expander),f=$('<button role="presenter" type="button"></button>').addClass(b.style.presenter),g=$('<ul role="list" class="'+b.style.list+'"></ul>').attr("guid",a.attr("data-guid"));0===c.length?(c=$('<div role="wrapper" />').addClass(b.style.wrapper),a.wrap(c)):c.addClass(b.style.wrapper),b.fontSize&&f.css("font-size",b.fontSize),f.on("click",function(b){g.is(":visible")?gj.dropdown.methods.close(a,g):gj.dropdown.methods.open(a,g)}),f.on("blur",function(b){setTimeout(function(){gj.dropdown.methods.close(a,g)},500)}),f.append(d).append(e),a.hide(),a.after(f),$("body").append(g),g.hide(),a.reload()},setListPosition:function(a,b,c){var d,e,f,g,h=a.getBoundingClientRect(),i=window.scrollY||window.pageYOffset||0;window.scrollX||window.pageXOffset;b.style.overflow="",b.style.overflowX="",b.style.height="",gj.core.setChildPosition(a,b),d=gj.core.height(b,!0),g=b.getBoundingClientRect(),e=gj.core.height(a,!0),"auto"===c.maxHeight?h.top<g.top?h.top+d+e>window.innerHeight&&(f=window.innerHeight-h.top-e-3):h.top-d-3>0?b.style.top=Math.round(h.top+i-d-3)+"px":(b.style.top=i+"px",f=h.top-3):!isNaN(c.maxHeight)&&c.maxHeight<d&&(f=c.maxHeight),f&&(b.style.overflow="scroll",b.style.overflowX="hidden",b.style.height=f+"px")},useHtmlDataSource:function(a,b){var c,d,e=[],f=a.find("option");for(c=0;c<f.length;c++)d={},d[b.valueField]=f[c].value,d[b.textField]=f[c].innerHTML,d[b.selectedField]=a[0].value===f[c].value,e.push(d);b.dataSource=e},filter:function(a){var b,c,d=a.data();if(d.dataSource){if("string"==typeof d.dataSource[0])for(b=0;b<d.dataSource.length;b++)c={},c[d.valueField]=d.dataSource[b],c[d.textField]=d.dataSource[b],d.dataSource[b]=c}else d.dataSource=[];return d.dataSource},render:function(a,b){var c=[],d=a.data(),e=a.parent(),f=$("body").children('[role="list"][guid="'+a.attr("data-guid")+'"]'),g=e.children('[role="presenter"]'),h=(g.children('[role="expander"]'),g.children('[role="display"]'));if(a.data("records",b),a.empty(),f.empty(),b&&b.length)if($.each(b,function(){var b,e=this[d.valueField],g=this[d.textField],h=this[d.selectedField]&&"true"===this[d.selectedField].toString().toLowerCase();b=$('<li value="'+e+'"><div data-role="wrapper"><span data-role="display">'+g+"</span></div></li>"),b.addClass(d.style.item),b.on("click",function(b){gj.dropdown.methods.select(a,e)}),f.append(b),a.append('<option value="'+e+'">'+g+"</option>"),h&&c.push(e)}),0===c.length)a.prepend('<option value=""></option>'),a[0].selectedIndex=0,d.placeholder&&(h[0].innerHTML='<span class="placeholder">'+d.placeholder+"</span>");else for(i=0;i<c.length;i++)gj.dropdown.methods.select(a,c[i]);return d.width&&(e.css("width",d.width),g.css("width",d.width)),d.fontSize&&f.children("li").css("font-size",d.fontSize),gj.dropdown.events.dataBound(a),a},open:function(a,b){var c=a.data(),d=a.parent().find('[role="expander"]'),e=a.parent().find('[role="presenter"]'),f=gj.core.getScrollParent(a[0]);b.css("width",gj.core.width(e[0])),b.show(),gj.dropdown.methods.setListPosition(e[0],b[0],c),d.html(c.icons.dropup),f&&(c.parentScrollHandler=function(){gj.dropdown.methods.setListPosition(e[0],b[0],c)},gj.dropdown.methods.addParentsScrollListener(f,c.parentScrollHandler))},close:function(a,b){var c=a.data(),d=a.parent().find('[role="expander"]'),e=gj.core.getScrollParent(a[0]);d.html(c.icons.dropdown),e&&c.parentScrollHandler&&gj.dropdown.methods.removeParentsScrollListener(e,c.parentScrollHandler),b.hide()},addParentsScrollListener:function(a,b){var c=gj.core.getScrollParent(a.parentNode);a.addEventListener("scroll",b),c&&gj.dropdown.methods.addParentsScrollListener(c,b)},removeParentsScrollListener:function(a,b){var c=gj.core.getScrollParent(a.parentNode);a.removeEventListener("scroll",b),c&&gj.dropdown.methods.removeParentsScrollListener(c,b)},select:function(a,b){var c=a.data(),d=$("body").children('[role="list"][guid="'+a.attr("data-guid")+'"]'),e=d.children('li[value="'+b+'"]'),f=a.next('[role="presenter"]').find('[role="display"]'),g=gj.dropdown.methods.getRecordByValue(a,b);return d.children("li").removeClass(c.style.active),g?(e.addClass(c.style.active),a[0].value=b,f[0].innerHTML=g[c.textField]):(c.placeholder&&(f[0].innerHTML='<span class="placeholder">'+c.placeholder+"</span>"),a[0].value=""),gj.dropdown.events.change(a),gj.dropdown.methods.close(a,d),a},getRecordByValue:function(a,b){var c,d=a.data(),e=void 0;for(c=0;c<d.records.length;c++)if(d.records[c][d.valueField]===b){e=d.records[c];break}return e},value:function(a,b){return void 0===b?a.val():(gj.dropdown.methods.select(a,b),a)},destroy:function(a){var b=a.data(),c=a.parent('div[role="wrapper"]');return b&&(a.xhr&&a.xhr.abort(),a.off(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-dropdown"),a.removeClass(),c.length>0&&(c.children('[role="presenter"]').remove(),c.children('[role="list"]').remove(),a.unwrap()),a.show()),a}},gj.dropdown.events={change:function(a){return a.triggerHandler("change")},dataBound:function(a){return a.triggerHandler("dataBound")}},gj.dropdown.widget=function(a,b){var c=this,d=gj.dropdown.methods;return c.value=function(a){return d.value(this,a)},c.enable=function(){return d.enable(this)},c.disable=function(){return d.disable(this)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-dropdown")&&d.init.call(a,b),a},gj.dropdown.widget.prototype=new gj.widget,gj.dropdown.widget.constructor=gj.dropdown.widget,gj.dropdown.widget.prototype.getHTMLConfig=gj.dropdown.methods.getHTMLConfig,function(a){a.fn.dropdown=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.dropdown.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.dropdown.widget(this,a)}}}(jQuery),gj.datepicker={plugins:{}},gj.datepicker.config={base:{showOtherMonths:!1,selectOtherMonths:!0,width:void 0,minDate:void 0,maxDate:void 0,format:"mm/dd/yyyy",uiLibrary:"materialdesign",iconsLibrary:"materialicons",value:void 0,weekStartDay:0,disableDates:void 0,disableDaysOfWeek:void 0,calendarWeeks:!1,keyboardNavigation:!0,locale:"en-us",icons:{rightIcon:'<i class="gj-icon">event</i>',previousMonth:'<i class="gj-icon chevron-left"></i>',nextMonth:'<i class="gj-icon chevron-right"></i>'},fontSize:void 0,size:"default",modal:!1,header:!1,footer:!1,showOnFocus:!0,showRightIcon:!0,style:{modal:"gj-modal",wrapper:"gj-datepicker gj-datepicker-md gj-unselectable",input:"gj-textbox-md",calendar:"gj-picker gj-picker-md datepicker gj-unselectable",footer:"",button:"gj-button-md"}},bootstrap:{style:{wrapper:"gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-picker gj-picker-bootstrap datepicker gj-unselectable",footer:"modal-footer",button:"btn btn-default"},iconsLibrary:"glyphicons",showOtherMonths:!0},bootstrap4:{style:{wrapper:"gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group",input:"form-control",calendar:"gj-picker gj-picker-bootstrap datepicker gj-unselectable",footer:"modal-footer",button:"btn btn-default"},showOtherMonths:!0},fontawesome:{icons:{rightIcon:'<i class="fa fa-calendar" aria-hidden="true"></i>',previousMonth:'<i class="fa fa-chevron-left" aria-hidden="true"></i>',nextMonth:'<i class="fa fa-chevron-right" aria-hidden="true"></i>'}},glyphicons:{icons:{rightIcon:'<span class="glyphicon glyphicon-calendar"></span>',previousMonth:'<span class="glyphicon glyphicon-chevron-left"></span>',nextMonth:'<span class="glyphicon glyphicon-chevron-right"></span>'}}},gj.datepicker.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"datepicker"),this.attr("data-datepicker","true"),gj.datepicker.methods.initialize(this,this.data()),this},initialize:function(a,b){var c,d,e=a.parent('div[role="wrapper"]');0===e.length?(e=$('<div role="wrapper" />').addClass(b.style.wrapper),a.wrap(e)):e.addClass(b.style.wrapper),e=a.parent('div[role="wrapper"]'),b.width&&e.css("width",b.width),a.val(b.value).addClass(b.style.input).attr("role","input"),b.fontSize&&a.css("font-size",b.fontSize),"bootstrap"===b.uiLibrary||"bootstrap4"===b.uiLibrary?"small"===b.size?(e.addClass("input-group-sm"),a.addClass("form-control-sm")):"large"===b.size&&(e.addClass("input-group-lg"),a.addClass("form-control-lg")):"small"===b.size?e.addClass("small"):"large"===b.size&&e.addClass("large"),b.showRightIcon&&(d="bootstrap"===b.uiLibrary?$('<span class="input-group-addon">'+b.icons.rightIcon+"</span>"):"bootstrap4"===b.uiLibrary?$('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">'+b.icons.rightIcon+"</button></span>"):$(b.icons.rightIcon),d.attr("role","right-icon"),d.on("click",function(c){$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]').is(":visible")?gj.datepicker.methods.close(a):gj.datepicker.methods.open(a,b)}),e.append(d)),b.showOnFocus&&a.on("focus",function(){gj.datepicker.methods.open(a,b)}),c=gj.datepicker.methods.createCalendar(a,b),!0!==b.footer&&(a.on("blur",function(){a.timeout=setTimeout(function(){gj.datepicker.methods.close(a)},500)}),c.mousedown(function(){return clearTimeout(a.timeout),document.activeElement!==a[0]&&a.focus(),!1}),c.on("click",function(){clearTimeout(a.timeout),document.activeElement!==a[0]&&a.focus()})),b.keyboardNavigation&&$(document).on("keydown",gj.datepicker.methods.createKeyDownHandler(a,c,b))},createCalendar:function(a,b){var c,d,e,f,g,h=$('<div role="calendar" type="month"/>').addClass(b.style.calendar).attr("guid",a.attr("data-guid"));return b.fontSize&&h.css("font-size",b.fontSize),c=gj.core.parseDate(b.value,b.format,b.locale),!c||isNaN(c.getTime())?c=new Date:a.attr("day",c.getFullYear()+"-"+c.getMonth()+"-"+c.getDate()),h.attr("month",c.getMonth()),h.attr("year",c.getFullYear()),gj.datepicker.methods.renderHeader(a,h,b,c),d=$('<div role="body" />'),h.append(d),b.footer&&(e=$('<div role="footer" class="'+b.style.footer+'" />'),f=$('<button class="'+b.style.button+'">'+gj.core.messages[b.locale].cancel+"</button>"),f.on("click",function(){a.close()}),e.append(f),g=$('<button class="'+b.style.button+'">'+gj.core.messages[b.locale].ok+"</button>"),g.on("click",function(){var c,d,e=h.attr("selectedDay");e?(d=e.split("-"),c=new Date(d[0],d[1],d[2],h.attr("hour")||0,h.attr("minute")||0),gj.datepicker.methods.change(a,h,b,c)):a.close()}),e.append(g),h.append(e)),h.hide(),$("body").append(h),b.modal&&(h.wrapAll('<div role="modal" class="'+b.style.modal+'"/>'),gj.core.center(h)),h},renderHeader:function(a,b,c,d){var e,f,g;c.header&&(e=$('<div role="header" />'),g=$('<div role="year" />').on("click",function(){gj.datepicker.methods.renderDecade(a,b,c),g.addClass("selected"),f.removeClass("selected")}),g.html(gj.core.formatDate(d,"yyyy",c.locale)),e.append(g),f=$('<div role="date" class="selected" />').on("click",function(){gj.datepicker.methods.renderMonth(a,b,c),f.addClass("selected"),g.removeClass("selected")}),f.html(gj.core.formatDate(d,"ddd, mmm dd",c.locale)),e.append(f),b.append(e))},updateHeader:function(a,b,c){a.find('[role="header"] [role="year"]').removeClass("selected").html(gj.core.formatDate(c,"yyyy",b.locale)),a.find('[role="header"] [role="date"]').addClass("selected").html(gj.core.formatDate(c,"ddd, mmm dd",b.locale)),a.find('[role="header"] [role="hour"]').removeClass("selected").html(gj.core.formatDate(c,"HH",b.locale)),a.find('[role="header"] [role="minute"]').removeClass("selected").html(gj.core.formatDate(c,"MM",b.locale))},createNavigation:function(a,b,c,d){var e,f,g=$("<thead/>");for(f=$('<div role="navigator" />'),f.append($("<div>"+d.icons.previousMonth+"</div>").on("click",gj.datepicker.methods.prev(a,d))),f.append($('<div role="period"></div>').on("click",gj.datepicker.methods.changePeriod(a,d))),f.append($("<div>"+d.icons.nextMonth+"</div>").on("click",gj.datepicker.methods.next(a,d))),b.append(f),e=$('<tr role="week-days" />'),d.calendarWeeks&&e.append("<th><div>&nbsp;</div></th>"),i=d.weekStartDay;i<gj.core.messages[d.locale].weekDaysMin.length;i++)e.append("<th><div>"+gj.core.messages[d.locale].weekDaysMin[i]+"</div></th>");for(i=0;i<d.weekStartDay;i++)e.append("<th><div>"+gj.core.messages[d.locale].weekDaysMin[i]+"</div></th>");g.append(e),c.append(g)},renderMonth:function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=b.children('[role="body"]'),t=$("<table/>"),u=$("<tbody/>"),v=gj.core.messages[c.locale].titleFormat;for(s.off().empty(),gj.datepicker.methods.createNavigation(a,s,t,c),g=parseInt(b.attr("month"),10),h=parseInt(b.attr("year"),10),b.attr("type","month"),v=v.replace("mmmm",gj.core.messages[c.locale].monthNames[g]).replace("yyyy",h),b.find('div[role="period"]').text(v),i=new Array(31,28,31,30,31,30,31,31,30,31,30,31),h%4==0&&1900!=h&&(i[1]=29),j=i[g],k=(new Date(h,g,1).getDay()+7-c.weekStartDay)%7,d=0,$row=$("<tr />"),n=gj.datepicker.methods.getPrevMonth(g,h),l=1;l<=k;l++)f=i[n.month]-k+l,r=new Date(n.year,n.month,f),c.calendarWeeks&&1===l&&$row.append('<td class="calendar-week"><div>'+gj.datepicker.methods.getWeekNumber(r)+"</div></td>"),p=$('<td class="other-month" />'),c.showOtherMonths&&(q=$("<div>"+f+"</div>"),p.append(q),c.selectOtherMonths&&gj.datepicker.methods.isSelectable(c,r)?(p.addClass("gj-cursor-pointer").attr("day",f).attr("month",n.month).attr("year",n.year),q.on("click",gj.datepicker.methods.dayClickHandler(a,b,c,r)),q.on("mousedown",function(a){a.stopPropagation()})):p.addClass("disabled")),$row.append(p),d++;for(l>1&&u.append($row),m=new Date,l=1;l<=j;l++)r=new Date(h,g,l),0==d&&($row=$("<tr>"),c.calendarWeeks&&$row.append('<td class="calendar-week"><div>'+gj.datepicker.methods.getWeekNumber(r)+"</div></td>")),p=$('<td day="'+l+'" month="'+g+'" year="'+h+'" />'),h===m.getFullYear()&&g===m.getMonth()&&l===m.getDate()?p.addClass("today"):p.addClass("current-month"),q=$("<div>"+l+"</div>"),gj.datepicker.methods.isSelectable(c,r)?(p.addClass("gj-cursor-pointer"),q.on("click",gj.datepicker.methods.dayClickHandler(a,b,c,r)),q.on("mousedown",function(a){a.stopPropagation()})):p.addClass("disabled"),p.append(q),$row.append(p),7==++d&&(u.append($row),d=0);for(o=gj.datepicker.methods.getNextMonth(g,h),l=1;0!=d;l++)r=new Date(o.year,o.month,l),p=$('<td class="other-month" />'),c.showOtherMonths&&(q=$("<div>"+l+"</div>"),c.selectOtherMonths&&gj.datepicker.methods.isSelectable(c,r)?(p.addClass("gj-cursor-pointer").attr("day",l).attr("month",o.month).attr("year",o.year),q.on("click",gj.datepicker.methods.dayClickHandler(a,b,c,r)),q.on("mousedown",function(a){a.stopPropagation()})):p.addClass("disabled"),p.append(q)),$row.append(p),7==++d&&(u.append($row),d=0);t.append(u),s.append(t),b.attr("selectedDay")&&(e=b.attr("selectedDay").split("-"),r=new Date(e[0],e[1],e[2],b.attr("hour")||0,b.attr("minute")||0),b.find('tbody td[day="'+e[2]+'"][month="'+e[1]+'"]').addClass("selected"),gj.datepicker.methods.updateHeader(b,c,r))},renderYear:function(a,b,c){var d,e,f,g,h=b.find('>[role="body"]>table'),i=h.children("tbody");for(h.children("thead").hide(),d=parseInt(b.attr("year"),10),b.attr("type","year"),b.find('div[role="period"]').text(d),i.empty(),e=0;e<3;e++){for($row=$("<tr />"),f=4*e;f<=4*e+3;f++)g=$("<div>"+gj.core.messages[c.locale].monthShortNames[f]+"</div>"),g.on("click",gj.datepicker.methods.selectMonth(a,b,c,f)),$cell=$("<td></td>").append(g),$row.append($cell);i.append($row)}},renderDecade:function(a,b,c){var d,e,f,g,h,i=b.find('>[role="body"]>table'),j=i.children("tbody");for(i.children("thead").hide(),d=parseInt(b.attr("year"),10),e=d-d%10,b.attr("type","decade"),b.find('div[role="period"]').text(e+" - "+(e+9)),j.empty(),f=e-1;f<=e+10;f+=4){for($row=$("<tr />"),g=f;g<=f+3;g++)h=$("<div>"+g+"</div>"),h.on("click",gj.datepicker.methods.selectYear(a,b,c,g)),$cell=$("<td></td>").append(h),$row.append($cell);j.append($row)}},renderCentury:function(a,b,c){var d,e,f,g,h,i=b.find('>[role="body"]>table'),j=i.children("tbody");for(i.children("thead").hide(),d=parseInt(b.attr("year"),10),e=d-d%100,b.attr("type","century"),b.find('div[role="period"]').text(e+" - "+(e+99)),j.empty(),f=e-10;f<e+100;f+=40){for($row=$("<tr />"),g=f;g<=f+30;g+=10)h=$("<div>"+g+"</div>"),h.on("click",gj.datepicker.methods.selectDecade(a,b,c,g)),$cell=$("<td></td>").append(h),$row.append($cell);j.append($row)}},getWeekNumber:function(a){var b=new Date(a.valueOf());b.setDate(b.getDate()+6),b=new Date(Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())),b.setUTCDate(b.getUTCDate()+4-(b.getUTCDay()||7));var c=new Date(Date.UTC(b.getUTCFullYear(),0,1));return Math.ceil(((b-c)/864e5+1)/7)},getMinDate:function(a){var b;return a.minDate&&("string"==typeof a.minDate?b=gj.core.parseDate(a.minDate,a.format,a.locale):"function"==typeof a.minDate?"string"==typeof(b=a.minDate())&&(b=gj.core.parseDate(b,a.format,a.locale)):"function"==typeof a.minDate.getMonth&&(b=a.minDate)),b},getMaxDate:function(a){var b;return a.maxDate&&("string"==typeof a.maxDate?b=gj.core.parseDate(a.maxDate,a.format,a.locale):"function"==typeof a.maxDate?"string"==typeof(b=a.maxDate())&&(b=gj.core.parseDate(b,a.format,a.locale)):"function"==typeof a.maxDate.getMonth&&(b=a.maxDate)),b},isSelectable:function(a,b){var c,d=!0,e=gj.datepicker.methods.getMinDate(a),f=gj.datepicker.methods.getMaxDate(a);if(e&&b<e?d=!1:f&&b>f&&(d=!1),d){if(a.disableDates)if($.isArray(a.disableDates))for(c=0;c<a.disableDates.length;c++)a.disableDates[c]instanceof Date&&a.disableDates[c].getTime()===b.getTime()?d=!1:"string"==typeof a.disableDates[c]&&gj.core.parseDate(a.disableDates[c],a.format,a.locale).getTime()===b.getTime()&&(d=!1);else a.disableDates instanceof Function&&(d=a.disableDates(b));$.isArray(a.disableDaysOfWeek)&&a.disableDaysOfWeek.indexOf(b.getDay())>-1&&(d=!1)}return d},getPrevMonth:function(a,b){return date=new Date(b,a,1),date.setMonth(date.getMonth()-1),{month:date.getMonth(),year:date.getFullYear()}},getNextMonth:function(a,b){return date=new Date(b,a,1),date.setMonth(date.getMonth()+1),{month:date.getMonth(),year:date.getFullYear()}},prev:function(a,b){return function(){var c,d,e,f,g,h=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');switch(e=parseInt(h.attr("year"),10),h.attr("type")){case"month":d=parseInt(h.attr("month"),10),c=gj.datepicker.methods.getPrevMonth(d,e),h.attr("month",c.month),h.attr("year",c.year),gj.datepicker.methods.renderMonth(a,h,b);break;case"year":h.attr("year",e-1),gj.datepicker.methods.renderYear(a,h,b);break;case"decade":f=e-e%10,h.attr("year",f-10),gj.datepicker.methods.renderDecade(a,h,b);break;case"century":g=e-e%100,h.attr("year",g-100),gj.datepicker.methods.renderCentury(a,h,b)}}},next:function(a,b){return function(){var c,d,e,f,g,h=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');switch(e=parseInt(h.attr("year"),10),h.attr("type")){case"month":d=parseInt(h.attr("month"),10),c=gj.datepicker.methods.getNextMonth(d,e),h.attr("month",c.month),h.attr("year",c.year),gj.datepicker.methods.renderMonth(a,h,b);break;case"year":h.attr("year",e+1),gj.datepicker.methods.renderYear(a,h,b);break;case"decade":f=e-e%10,h.attr("year",f+10),gj.datepicker.methods.renderDecade(a,h,b);break;case"century":g=e-e%100,h.attr("year",g+100),gj.datepicker.methods.renderCentury(a,h,b)}}},changePeriod:function(a,b){return function(c){var d=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');switch(d.attr("type")){case"month":gj.datepicker.methods.renderYear(a,d,b);break;case"year":gj.datepicker.methods.renderDecade(a,d,b);break;case"decade":gj.datepicker.methods.renderCentury(a,d,b)}}},dayClickHandler:function(a,b,c,d){return function(e){return e&&e.stopPropagation(),gj.datepicker.methods.selectDay(a,b,c,d),!0!==c.footer&&!1!==c.autoClose&&gj.datepicker.methods.change(a,b,c,d),a}},change:function(a,b,c,d){var e=(d.getDate(),d.getMonth()),f=d.getFullYear(),g=gj.core.formatDate(d,c.format,c.locale);b.attr("month",e),b.attr("year",f),a.val(g),gj.datepicker.events.change(a),"none"!==window.getComputedStyle(b[0]).display&&gj.datepicker.methods.close(a)},selectDay:function(a,b,c,d){var e=d.getDate(),f=d.getMonth(),g=d.getFullYear();b.attr("selectedDay",g+"-"+f+"-"+e),b.find("tbody td").removeClass("selected"),b.find('tbody td[day="'+e+'"][month="'+f+'"]').addClass("selected"),gj.datepicker.methods.updateHeader(b,c,d),gj.datepicker.events.select(a,"day")},selectMonth:function(a,b,c,d){return function(e){b.attr("month",d),gj.datepicker.methods.renderMonth(a,b,c),gj.datepicker.events.select(a,"month")}},selectYear:function(a,b,c,d){return function(e){b.attr("year",d),gj.datepicker.methods.renderYear(a,b,c),gj.datepicker.events.select(a,"year")}},selectDecade:function(a,b,c,d){return function(e){b.attr("year",d),gj.datepicker.methods.renderDecade(a,b,c),gj.datepicker.events.select(a,"decade")}},open:function(a,b){var c,d=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');switch(a.val()?a.value(a.val()):(c=new Date,d.attr("month",c.getMonth()),d.attr("year",c.getFullYear())),d.attr("type")){case"month":gj.datepicker.methods.renderMonth(a,d,b);break;case"year":gj.datepicker.methods.renderYear(a,d,b);break;case"decade":gj.datepicker.methods.renderDecade(a,d,b);break;case"century":gj.datepicker.methods.renderCentury(a,d,b)}d.show(),d.closest('div[role="modal"]').show(),b.modal?gj.core.center(d):(gj.core.setChildPosition(a[0],d[0]),document.activeElement!==a[0]&&a.focus()),clearTimeout(a.timeout),gj.datepicker.events.open(a)},close:function(a){var b=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');b.hide(),b.closest('div[role="modal"]').hide(),gj.datepicker.events.close(a)},createKeyDownHandler:function(a,b,c){return function(d){var e,f,g,h,i,j,d=d||window.event;"none"!==window.getComputedStyle(b[0]).display&&(j=gj.datepicker.methods.getActiveCell(b),"38"==d.keyCode?(h=j.index(),i=j.closest("tr").prev("tr").find("td:eq("+h+")"),i.is("[day]")||(gj.datepicker.methods.prev(a,c)(),i=b.find("tbody tr").last().find("td:eq("+h+")"),i.is(":empty")&&(i=b.find("tbody tr").last().prev().find("td:eq("+h+")"))),i.is("[day]")&&(i.addClass("focused"),j.removeClass("focused"))):"40"==d.keyCode?(h=j.index(),i=j.closest("tr").next("tr").find("td:eq("+h+")"),i.is("[day]")||(gj.datepicker.methods.next(a,c)(),i=b.find("tbody tr").first().find("td:eq("+h+")"),i.is("[day]")||(i=b.find("tbody tr:eq(1)").find("td:eq("+h+")"))),i.is("[day]")&&(i.addClass("focused"),j.removeClass("focused"))):"37"==d.keyCode?(i=j.prev("td[day]:not(.disabled)"),0===i.length&&(i=j.closest("tr").prev("tr").find("td[day]").last()),0===i.length&&(gj.datepicker.methods.prev(a,c)(),i=b.find("tbody tr").last().find("td[day]").last()),i.length>0&&(i.addClass("focused"),j.removeClass("focused"))):"39"==d.keyCode?(i=j.next("[day]:not(.disabled)"),0===i.length&&(i=j.closest("tr").next("tr").find("td[day]").first()),0===i.length&&(gj.datepicker.methods.next(a,c)(),i=b.find("tbody tr").first().find("td[day]").first()),i.length>0&&(i.addClass("focused"),j.removeClass("focused"))):"13"==d.keyCode?(g=parseInt(j.attr("day"),10),e=parseInt(j.attr("month"),10),f=parseInt(j.attr("year"),10),gj.datepicker.methods.dayClickHandler(a,b,c,new Date(f,e,g))()):"27"==d.keyCode&&a.close())}},getActiveCell:function(a){var b=a.find("td[day].focused");return 0===b.length&&(b=a.find("td[day].selected"),0===b.length&&(b=a.find("td[day].today"),0===b.length&&(b=a.find("td[day]:not(.disabled)").first()))),b},value:function(a,b){var c,d,e=a.data();return void 0===b?a.val():(d=gj.core.parseDate(b,e.format,e.locale),d&&d.getTime()?(c=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]'),gj.datepicker.methods.dayClickHandler(a,c,e,d)()):a.val(""),a)},destroy:function(a){var b=a.data(),c=a.parent(),d=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');return b&&(a.off(),d.parent('[role="modal"]').length>0&&d.unwrap(),d.remove(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-datepicker"),a.removeClass(),c.children('[role="right-icon"]').remove(),a.unwrap()),a}},gj.datepicker.events={change:function(a){return a.triggerHandler("change")},select:function(a,b){return a.triggerHandler("select",[b])},open:function(a){return a.triggerHandler("open")},close:function(a){return a.triggerHandler("close")}},gj.datepicker.widget=function(a,b){var c=this,d=gj.datepicker.methods;return c.value=function(a){return d.value(this,a)},c.destroy=function(){return d.destroy(this)},c.open=function(){return d.open(this,this.data())},c.close=function(){return d.close(this)},$.extend(a,c),"true"!==a.attr("data-datepicker")&&d.init.call(a,b),a},gj.datepicker.widget.prototype=new gj.widget,gj.datepicker.widget.constructor=gj.datepicker.widget,function(a){a.fn.datepicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.datepicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.datepicker.widget(this,a)}}}(jQuery),gj.timepicker={plugins:{}},gj.timepicker.config={base:{width:void 0,modal:!0,header:!0,footer:!0,format:"HH:MM",uiLibrary:"materialdesign",value:void 0,mode:"ampm",locale:"en-us",size:"default",icons:{rightIcon:'<i class="gj-icon clock" />'},style:{modal:"gj-modal",wrapper:"gj-timepicker gj-timepicker-md gj-unselectable",input:"gj-textbox-md",clock:"gj-picker gj-picker-md timepicker",footer:"",button:"gj-button-md"}},bootstrap:{style:{wrapper:"gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group",input:"form-control",clock:"gj-picker gj-picker-bootstrap timepicker",footer:"modal-footer",button:"btn btn-default"},iconsLibrary:"glyphicons"},bootstrap4:{style:{wrapper:"gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group",input:"form-control border",clock:"gj-picker gj-picker-bootstrap timepicker",footer:"modal-footer",button:"btn btn-default"}}},gj.timepicker.methods={init:function(a){return gj.picker.widget.prototype.init.call(this,a,"timepicker"),this},initialize:function(){},initMouse:function(a,b,c,d){a.off(),a.on("mousedown",gj.timepicker.methods.mouseDownHandler(b,c)),a.on("mousemove",gj.timepicker.methods.mouseMoveHandler(b,c,d)),a.on("mouseup",gj.timepicker.methods.mouseUpHandler(b,c,d))},createPicker:function(a){var b,c=a.data(),d=$('<div role="picker" />').addClass(c.style.clock).attr("guid",a.attr("data-guid")),e=$('<div role="hour" />'),f=$('<div role="minute" />'),g=$('<div role="header" />'),h=$('<div role="mode" />'),i=$('<div role="body" />'),j=$('<button class="'+c.style.button+'">'+gj.core.messages[c.locale].ok+"</button>"),k=$('<button class="'+c.style.button+'">'+gj.core.messages[c.locale].cancel+"</button>"),l=$('<div role="footer" class="'+c.style.footer+'" />');return b=gj.core.parseDate(c.value,c.format,c.locale),!b||isNaN(b.getTime())?b=new Date:a.attr("hours",b.getHours()),gj.timepicker.methods.initMouse(i,a,d,c),c.header&&(e.on("click",function(){gj.timepicker.methods.renderHours(a,d,c)}),f.on("click",function(){gj.timepicker.methods.renderMinutes(a,d,c)}),g.append(e).append(":").append(f),"ampm"===c.mode&&(h.append($('<span role="am">'+gj.core.messages[c.locale].am+"</span>").on("click",function(){var b=gj.timepicker.methods.getHour(d);d.attr("mode","am"),$(this).addClass("selected"),$(this).parent().children('[role="pm"]').removeClass("selected"),b>=12&&d.attr("hour",b-12),c.modal||(clearTimeout(a.timeout),a.focus())})),h.append("<br />"),h.append($('<span role="pm">'+gj.core.messages[c.locale].pm+"</span>").on("click",function(){var b=gj.timepicker.methods.getHour(d);d.attr("mode","pm"),$(this).addClass("selected"),$(this).parent().children('[role="am"]').removeClass("selected"),b<12&&d.attr("hour",b+12),c.modal||(clearTimeout(a.timeout),a.focus())})),g.append(h)),d.append(g)),d.append(i),c.footer&&(k.on("click",function(){a.close()}),l.append(k),j.on("click",gj.timepicker.methods.setTime(a,d)),l.append(j),d.append(l)),d.hide(),$("body").append(d),c.modal&&(d.wrapAll('<div role="modal" class="'+c.style.modal+'"/>'),gj.core.center(d)),d},getHour:function(a){return parseInt(a.attr("hour"),10)||0},getMinute:function(a){return parseInt(a.attr("minute"),10)||0},setTime:function(a,b){return function(){var c=gj.timepicker.methods.getHour(b),d=gj.timepicker.methods.getMinute(b),e=b.attr("mode"),f=new Date(0,0,0,12===c&&"am"===e?0:c,d),g=a.data(),h=gj.core.formatDate(f,g.format,g.locale);a.value(h),a.close()}},getPointerValue:function(a,b,c){var d,e,f=256,g=Math.atan2(f/2-a,f/2-b)/Math.PI*180;switch(g<0&&(g=360+g),c){case"ampm":return d=12-Math.round(12*g/360),0===d?12:d;case"24hr":return e=Math.sqrt(Math.pow(f/2-a,2)+Math.pow(f/2-b,2)),d=12-Math.round(12*g/360),0===d&&(d=12),e<f/2-32&&(d=12===d?0:d+12),d;case"minutes":return d=Math.round(60-60*g/360),60===d?0:d}},updateArrow:function(a,b,c,d){var e,f,g=b.mouseX(a),h=b.mouseY(a),i=window.scrollY||window.pageYOffset||0,j=window.scrollX||window.pageXOffset||0;e=a.target.getBoundingClientRect(),"hours"==d.dialMode?(f=gj.timepicker.methods.getPointerValue(g-j-e.left,h-i-e.top,d.mode),c.attr("hour","ampm"===d.mode&&"pm"===c.attr("mode")&&f<12?f+12:f)):"minutes"==d.dialMode&&(f=gj.timepicker.methods.getPointerValue(g-j-e.left,h-i-e.top,"minutes"),c.attr("minute",f)),gj.timepicker.methods.update(b,c,d)},update:function(a,b,c){var d,e,f,g,h,i;d=gj.timepicker.methods.getHour(b),e=gj.timepicker.methods.getMinute(b),f=b.find('[role="arrow"]'),"hours"==c.dialMode&&(0==d||d>12)&&"24hr"===c.mode?f.css("width","calc(50% - 52px)"):f.css("width","calc(50% - 20px)"),"hours"==c.dialMode?f.css("transform","rotate("+(30*d-90).toString()+"deg)"):f.css("transform","rotate("+(6*e-90).toString()+"deg)"),f.show(),g="ampm"===c.mode&&d>12?d-12:0==d?12:d,i=b.find('[role="body"] span'),i.removeClass("selected"),i.filter(function(a){return"hours"==c.dialMode?parseInt($(this).text(),10)==g:parseInt($(this).text(),10)==e}).addClass("selected"),c.header&&(h=b.find('[role="header"]'),h.find('[role="hour"]').text(g),h.find('[role="minute"]').text(gj.core.pad(e)),"ampm"===c.mode&&(d>=12?(h.find('[role="pm"]').addClass("selected"),h.find('[role="am"]').removeClass("selected")):(h.find('[role="am"]').addClass("selected"),h.find('[role="pm"]').removeClass("selected"))))},mouseDownHandler:function(a,b){return function(b){a.mouseMove=!0}},mouseMoveHandler:function(a,b,c){return function(d){a.mouseMove&&gj.timepicker.methods.updateArrow(d,a,b,c)}},mouseUpHandler:function(a,b,c){return function(d){gj.timepicker.methods.updateArrow(d,a,b,c),a.mouseMove=!1,c.modal||(clearTimeout(a.timeout),a.focus()),"hours"==c.dialMode?setTimeout(function(){gj.timepicker.events.select(a,"hour"),gj.timepicker.methods.renderMinutes(a,b,c)},1e3):"minutes"==c.dialMode&&(!0!==c.footer&&!1!==c.autoClose&&gj.timepicker.methods.setTime(a,b)(),gj.timepicker.events.select(a,"minute"))}},renderHours:function(a,b,c){var d,e=b.find('[role="body"]');clearTimeout(a.timeout),e.empty(),d=$('<div role="dial"></div>'),d.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>'),d.append('<span role="hour" style="transform: translate(54px, -93.5307px);">1</span>'),d.append('<span role="hour" style="transform: translate(93.5307px, -54px);">2</span>'),d.append('<span role="hour" style="transform: translate(108px, 0px);">3</span>'),d.append('<span role="hour" style="transform: translate(93.5307px, 54px);">4</span>'),d.append('<span role="hour" style="transform: translate(54px, 93.5307px);">5</span>'),d.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">6</span>'),d.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">7</span>'),d.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">8</span>'),d.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">9</span>'),d.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">10</span>'),d.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">11</span>'),d.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">12</span>'),"24hr"===c.mode&&(d.append('<span role="hour" style="transform: translate(38px, -65.8179px);">13</span>'),d.append('<span role="hour" style="transform: translate(65.8179px, -38px);">14</span>'),d.append('<span role="hour" style="transform: translate(76px, 0px);">15</span>'),d.append('<span role="hour" style="transform: translate(65.8179px, 38px);">16</span>'),d.append('<span role="hour" style="transform: translate(38px, 65.8179px);">17</span>'),d.append('<span role="hour" style="transform: translate(4.65366e-15px, 76px);">18</span>'),d.append('<span role="hour" style="transform: translate(-38px, 65.8179px);">19</span>'),d.append('<span role="hour" style="transform: translate(-65.8179px, 38px);">20</span>'),d.append('<span role="hour" style="transform: translate(-76px, 9.30732e-15px);">21</span>'),d.append('<span role="hour" style="transform: translate(-65.8179px, -38px);">22</span>'),d.append('<span role="hour" style="transform: translate(-38px, -65.8179px);">23</span>'),d.append('<span role="hour" style="transform: translate(-1.3961e-14px, -76px);">00</span>')),e.append(d),b.find('[role="header"] [role="hour"]').addClass("selected"),b.find('[role="header"] [role="minute"]').removeClass("selected"),c.dialMode="hours",gj.timepicker.methods.update(a,b,c)},renderMinutes:function(a,b,c){var d=b.find('[role="body"]');clearTimeout(a.timeout),d.empty(),$dial=$('<div role="dial"></div>'),$dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="arrow-begin"></div><div class="arrow-end"></div></div>'),$dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">5</span>'),$dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">10</span>'),$dial.append('<span role="hour" style="transform: translate(108px, 0px);">15</span>'),$dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">20</span>'),$dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">25</span>'),$dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">30</span>'),$dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">35</span>'),$dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">40</span>'),$dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">45</span>'),$dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">50</span>'),$dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">55</span>'),$dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">00</span>'),d.append($dial),b.find('[role="header"] [role="hour"]').removeClass("selected"),b.find('[role="header"] [role="minute"]').addClass("selected"),c.dialMode="minutes",gj.timepicker.methods.update(a,b,c)},open:function(a){var b,c,d=a.data(),e=$("body").find('[role="picker"][guid="'+a.attr("data-guid")+'"]');return b=a.value()?gj.core.parseDate(a.value(),d.format,d.locale):new Date,c=b.getHours(),"ampm"===d.mode&&e.attr("mode",c>12?"pm":"am"),e.attr("hour",c),e.attr("minute",b.getMinutes()),gj.timepicker.methods.renderHours(a,e,d),gj.picker.widget.prototype.open.call(a,"timepicker"),a},value:function(a,b){a.data();return void 0===b?a.val():(a.val(b),gj.timepicker.events.change(a),a)}},gj.timepicker.events={change:function(a){return a.triggerHandler("change")},select:function(a,b){return a.triggerHandler("select",[b])},open:function(a){return a.triggerHandler("open")},close:function(a){return a.triggerHandler("close")}},gj.timepicker.widget=function(a,b){var c=this,d=gj.timepicker.methods;return c.mouseMove=!1,c.value=function(a){return d.value(this,a)},c.destroy=function(){return gj.picker.widget.prototype.destroy.call(this,"timepicker")},c.open=function(){return gj.timepicker.methods.open(this)},c.close=function(){return gj.picker.widget.prototype.close.call(this,"timepicker")},$.extend(a,c),"true"!==a.attr("data-timepicker")&&d.init.call(a,b),a},gj.timepicker.widget.prototype=new gj.picker.widget,gj.timepicker.widget.constructor=gj.timepicker.widget,function(a){a.fn.timepicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.timepicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.timepicker.widget(this,a)}}}(jQuery),gj.datetimepicker={plugins:{},messages:{"en-us":{}}},gj.datetimepicker.config={base:{datepicker:gj.datepicker.config.base,timepicker:gj.timepicker.config.base,uiLibrary:"materialdesign",value:void 0,format:"HH:MM mm/dd/yyyy",width:void 0,modal:!1,footer:!1,size:"default",locale:"en-us",icons:{},style:{calendar:"gj-picker gj-picker-md datetimepicker gj-unselectable"}},bootstrap:{style:{calendar:"gj-picker gj-picker-bootstrap datetimepicker gj-unselectable"},iconsLibrary:"glyphicons"},bootstrap4:{style:{calendar:"gj-picker gj-picker-bootstrap datetimepicker gj-unselectable"}}},gj.datetimepicker.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"datetimepicker"),this.attr("data-datetimepicker","true"),gj.datetimepicker.methods.initialize(this),this},getConfig:function(a,b){var c=gj.widget.prototype.getConfig.call(this,a,b);return uiLibrary=a.hasOwnProperty("uiLibrary")?a.uiLibrary:c.uiLibrary,gj.datepicker.config[uiLibrary]&&$.extend(!0,c.datepicker,gj.datepicker.config[uiLibrary]),gj.timepicker.config[uiLibrary]&&$.extend(!0,c.timepicker,gj.timepicker.config[uiLibrary]),iconsLibrary=a.hasOwnProperty("iconsLibrary")?a.iconsLibrary:c.iconsLibrary,gj.datepicker.config[iconsLibrary]&&$.extend(!0,c.datepicker,gj.datepicker.config[iconsLibrary]),gj.timepicker.config[iconsLibrary]&&$.extend(!0,c.timepicker,gj.timepicker.config[iconsLibrary]),c},initialize:function(a){var b,c,d,e,f,g,h,i,j=a.data();j.datepicker.uiLibrary=j.uiLibrary,j.datepicker.iconsLibrary=j.iconsLibrary,j.datepicker.width=j.width,j.datepicker.format=j.format,j.datepicker.locale=j.locale,j.datepicker.modal=j.modal,j.datepicker.footer=j.footer,j.datepicker.style.calendar=j.style.calendar,j.datepicker.value=j.value,j.datepicker.size=j.size,j.datepicker.autoClose=!1,gj.datepicker.methods.initialize(a,j.datepicker),a.on("select",function(c,d){var e,f;"day"===d?gj.datetimepicker.methods.createShowHourHandler(a,b,j)():"minute"===d&&b.attr("selectedDay")&&!0!==j.footer&&(selectedDay=b.attr("selectedDay").split("-"),e=new Date(selectedDay[0],selectedDay[1],selectedDay[2],b.attr("hour")||0,b.attr("minute")||0),f=gj.core.formatDate(e,j.format,j.locale),a.val(f),gj.datetimepicker.events.change(a),gj.datetimepicker.methods.close(a))}),a.on("open",function(){var a=b.children('[role="header"]');a.find('[role="calendarMode"]').addClass("selected"),a.find('[role="clockMode"]').removeClass("selected")}),b=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]'),f=j.value?gj.core.parseDate(j.value,j.format,j.locale):new Date,b.attr("hour",f.getHours()),b.attr("minute",f.getMinutes()),j.timepicker.uiLibrary=j.uiLibrary,j.timepicker.iconsLibrary=j.iconsLibrary,j.timepicker.format=j.format,j.timepicker.locale=j.locale,j.timepicker.header=!0,j.timepicker.footer=j.footer,j.timepicker.size=j.size,j.timepicker.mode="24hr",j.timepicker.autoClose=!1,c=$('<div role="header" />'),d=$('<div role="date" class="selected" />'),d.on("click",gj.datetimepicker.methods.createShowDateHandler(a,b,j)),d.html(gj.core.formatDate(new Date,"ddd, mmm dd",j.locale)),c.append(d),g=$('<div role="switch"></div>'),h=$('<i class="gj-icon selected" role="calendarMode">event</i>'),h.on("click",gj.datetimepicker.methods.createShowDateHandler(a,b,j)),g.append(h),e=$('<div role="time" />'),e.append($('<div role="hour" />').on("click",gj.datetimepicker.methods.createShowHourHandler(a,b,j)).html(gj.core.formatDate(new Date,"HH",j.locale))),e.append(":"),e.append($('<div role="minute" />').on("click",gj.datetimepicker.methods.createShowMinuteHandler(a,b,j)).html(gj.core.formatDate(new Date,"MM",j.locale))),g.append(e),i=$('<i class="gj-icon" role="clockMode">clock</i>'),i.on("click",gj.datetimepicker.methods.createShowHourHandler(a,b,j)),g.append(i),c.append(g),b.prepend(c)},createShowDateHandler:function(a,b,c){return function(d){var e=b.children('[role="header"]');e.find('[role="calendarMode"]').addClass("selected"),e.find('[role="date"]').addClass("selected"),e.find('[role="clockMode"]').removeClass("selected"),e.find('[role="hour"]').removeClass("selected"),e.find('[role="minute"]').removeClass("selected"),gj.datepicker.methods.renderMonth(a,b,c.datepicker)}},createShowHourHandler:function(a,b,c){return function(){var d=b.children('[role="header"]');d.find('[role="calendarMode"]').removeClass("selected"),d.find('[role="date"]').removeClass("selected"),d.find('[role="clockMode"]').addClass("selected"),d.find('[role="hour"]').addClass("selected"),d.find('[role="minute"]').removeClass("selected"),gj.timepicker.methods.initMouse(b.children('[role="body"]'),a,b,c.timepicker),gj.timepicker.methods.renderHours(a,b,c.timepicker)}},createShowMinuteHandler:function(a,b,c){return function(){var d=b.children('[role="header"]');d.find('[role="calendarMode"]').removeClass("selected"),d.find('[role="date"]').removeClass("selected"),d.find('[role="clockMode"]').addClass("selected"),d.find('[role="hour"]').removeClass("selected"),d.find('[role="minute"]').addClass("selected"),gj.timepicker.methods.initMouse(b.children('[role="body"]'),a,b,c.timepicker),gj.timepicker.methods.renderMinutes(a,b,c.timepicker)}},close:function(a){var b=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');b.hide(),b.closest('div[role="modal"]').hide()},value:function(a,b){var c,d,e,f=a.data();return void 0===b?a.val():(d=gj.core.parseDate(b,f.format,f.locale),d?(c=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]'),gj.datepicker.methods.dayClickHandler(a,c,f,d)(),e=d.getHours(),"ampm"===f.mode&&c.attr("mode",e>12?"pm":"am"),c.attr("hour",e),c.attr("minute",d.getMinutes()),a.val(b)):a.val(""),a)},destroy:function(a){var b=a.data(),c=a.parent(),d=$("body").find('[role="calendar"][guid="'+a.attr("data-guid")+'"]');return b&&(a.off(),d.parent('[role="modal"]').length>0&&d.unwrap(),d.remove(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-datetimepicker"),a.removeClass(),c.children('[role="right-icon"]').remove(),a.unwrap()),a}},gj.datetimepicker.events={change:function(a){return a.triggerHandler("change")}},gj.datetimepicker.widget=function(a,b){var c=this,d=gj.datetimepicker.methods;return c.mouseMove=!1,c.value=function(a){return d.value(this,a)},c.open=function(){gj.datepicker.methods.open(this,this.data().datepicker)},c.close=function(){gj.datepicker.methods.close(this)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-datetimepicker")&&d.init.call(a,b),a},gj.datetimepicker.widget.prototype=new gj.widget,gj.datetimepicker.widget.constructor=gj.datetimepicker.widget,gj.datetimepicker.widget.prototype.getConfig=gj.datetimepicker.methods.getConfig,function(a){a.fn.datetimepicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.datetimepicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.datetimepicker.widget(this,a)}}}(jQuery),gj.slider={plugins:{},messages:{"en-us":{}}},gj.slider.config={base:{min:0,max:100,width:void 0,uiLibrary:"materialdesign",value:void 0,icons:{},style:{wrapper:"gj-slider gj-slider-md",progress:void 0,track:void 0}},bootstrap:{style:{wrapper:"gj-slider gj-slider-bootstrap gj-slider-bootstrap-3",progress:"progress-bar",track:"progress"}},bootstrap4:{style:{wrapper:"gj-slider gj-slider-bootstrap gj-slider-bootstrap-4",progress:"progress-bar",track:"progress"}}},gj.slider.methods={init:function(a){return gj.widget.prototype.init.call(this,a,"slider"),this.attr("data-slider","true"),gj.slider.methods.initialize(this,this.data()),this},initialize:function(a,b){var c,d,e,f;a[0].style.display="none","wrapper"!==a[0].parentElement.attributes.role?(c=document.createElement("div"),c.setAttribute("role","wrapper"),a[0].parentNode.insertBefore(c,a[0]),c.appendChild(a[0])):c=a[0].parentElement,b.width&&(c.style.width=b.width+"px"),gj.core.addClasses(c,b.style.wrapper),d=a[0].querySelector('[role="track"]'),null==d&&(d=document.createElement("div"),d.setAttribute("role","track"),c.appendChild(d)),gj.core.addClasses(d,b.style.track),e=a[0].querySelector('[role="handle"]'),null==e&&(e=document.createElement("div"),e.setAttribute("role","handle"),c.appendChild(e)),f=a[0].querySelector('[role="progress"]'),null==f&&(f=document.createElement("div"),f.setAttribute("role","progress"),c.appendChild(f)),gj.core.addClasses(f,b.style.progress),b.value||(b.value=b.min),gj.slider.methods.value(a,b,b.value),gj.documentManager.subscribeForEvent("mouseup",a.data("guid"),gj.slider.methods.createMouseUpHandler(a,e,b)),e.addEventListener("mousedown",gj.slider.methods.createMouseDownHandler(e,b)),gj.documentManager.subscribeForEvent("mousemove",a.data("guid"),gj.slider.methods.createMouseMoveHandler(a,d,e,f,b)),e.addEventListener("click",function(a){a.stopPropagation()}),c.addEventListener("click",gj.slider.methods.createClickHandler(a,d,e,b))},createClickHandler:function(a,b,c,d){return function(e){var f,g,h,i,j;"true"!==c.getAttribute("drag")&&(f=gj.core.position(a[0].parentElement),g=(new gj.widget).mouseX(e)-f.left,h=gj.core.width(c)/2,i=gj.core.width(b)/(d.max-d.min),j=Math.round((g-h)/i)+d.min,gj.slider.methods.value(a,d,j))}},createMouseUpHandler:function(a,b,c){return function(c){"true"===b.getAttribute("drag")&&(b.setAttribute("drag","false"),gj.slider.events.change(a))}},createMouseDownHandler:function(a,b){return function(b){a.setAttribute("drag","true")}},createMouseMoveHandler:function(a,b,c,d,e){return function(d){var f,g,h,i,j,k,l;"true"===c.getAttribute("drag")&&(f=gj.core.position(a[0].parentElement),g=(new gj.widget).mouseX(d)-f.left,h=gj.core.width(b),i=gj.core.width(c)/2,j=h/(e.max-e.min),k=(e.value-e.min)*j,g>=i&&g<=h+i&&(g>k+j/2||g<k-j/2)&&(l=Math.round((g-i)/j)+e.min,gj.slider.methods.value(a,e,l)))}},value:function(a,b,c){var d,e,f,g;return void 0===c?a[0].value:(a[0].setAttribute("value",c),b.value=c,e=a.parent().children('[role="track"]')[0],d=gj.core.width(e)/(b.max-b.min),f=a.parent().children('[role="handle"]')[0],f.style.left=(c-b.min)*d+"px",g=a.parent().children('[role="progress"]')[0],g.style.width=(c-b.min)*d+"px",gj.slider.events.slide(a,c),a)},destroy:function(a){var b=a.data(),c=a.parent();return b&&(c.children('[role="track"]').remove(),c.children('[role="handle"]').remove(),c.children('[role="progress"]').remove(),a.unwrap(),a.off(),a.removeData(),a.removeAttr("data-type").removeAttr("data-guid").removeAttr("data-slider"),a.removeClass(),a.show()),a}},gj.slider.events={change:function(a){return a.triggerHandler("change")},slide:function(a,b){return a.triggerHandler("slide",[b])}},gj.slider.widget=function(a,b){var c=this,d=gj.slider.methods;return c.value=function(a){return d.value(this,this.data(),a)},c.destroy=function(){return d.destroy(this)},$.extend(a,c),"true"!==a.attr("data-slider")&&d.init.call(a,b),a},gj.slider.widget.prototype=new gj.widget,gj.slider.widget.constructor=gj.slider.widget,function(a){a.fn.slider=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.slider.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.slider.widget(this,a)}}}(jQuery),gj.colorpicker={plugins:{},messages:{"en-us":{}}},gj.colorpicker.config={base:{uiLibrary:"materialdesign",value:void 0,icons:{rightIcon:'<i class="gj-icon">event</i>'},style:{modal:"gj-modal",wrapper:"gj-colorpicker gj-colorpicker-md gj-unselectable",input:"gj-textbox-md",picker:"gj-picker gj-picker-md colorpicker gj-unselectable",footer:"",button:"gj-button-md"}},bootstrap:{style:{}},bootstrap4:{style:{}}},gj.colorpicker.methods={init:function(a){return gj.picker.widget.prototype.init.call(this,a,"colorpicker"),gj.colorpicker.methods.initialize(this),this},initialize:function(a){},createPicker:function(a,b){var c=$('<div role="picker" />').addClass(b.style.picker).attr("guid",a.attr("data-guid"));return c.html("test"),c.hide(),$("body").append(c),c},open:function(a){return a.val()&&a.value(a.val()),gj.picker.widget.prototype.open.call(a,"colorpicker")}},gj.colorpicker.events={change:function(a){return a.triggerHandler("change")},select:function(a){return a.triggerHandler("select")},open:function(a){return a.triggerHandler("open")},close:function(a){return a.triggerHandler("close")}},gj.colorpicker.widget=function(a,b){var c=this,d=gj.colorpicker.methods;return c.value=function(a){return d.value(this,a)},c.destroy=function(){return gj.picker.widget.prototype.destroy.call(this,"colorpicker")},c.open=function(){return d.open(this)},c.close=function(){return gj.picker.widget.prototype.close.call(this,"colorpicker")},$.extend(a,c),"true"!==a.attr("data-colorpicker")&&d.init.call(a,b),a},gj.colorpicker.widget.prototype=new gj.picker.widget,gj.colorpicker.widget.constructor=gj.colorpicker.widget,function(a){a.fn.colorpicker=function(a){var b;if(this&&this.length){if("object"!=typeof a&&a){if(b=new gj.colorpicker.widget(this,null),b[a])return b[a].apply(this,Array.prototype.slice.call(arguments,1));throw"Method "+a+" does not exist."}return new gj.colorpicker.widget(this,a)}}}(jQuery);
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-objectfit-setclasses !*/

!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),h.push((o?"":"no-")+a.join("-"))}}function i(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){return!!~(""+e).indexOf(n)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?f(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function d(){var e=n.body;return e||(e=l(w?"svg":"body"),e.fake=!0),e}function m(e,t,r,o){var i,s,a,f,u="modernizr",p=l("div"),c=d();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=o?o[r]:u+(r+1),p.appendChild(a);return i=l("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=f,_.offsetHeight):p.parentNode.removeChild(p),!!s}function v(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),m("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return t}function y(e,n,o,i){function f(){p&&(delete P.style,delete P.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=v(e,o);if(!r(u,"undefined"))return u}for(var p,c,d,m,y,g=["modernizr","tspan","samp"];!P.style&&g.length;)p=!0,P.modElem=l(g.shift()),P.style=P.modElem.style;for(d=e.length,c=0;d>c;c++)if(m=e[c],y=P.style[m],a(m,"-")&&(m=s(m)),P.style[m]!==t){if(i||r(o,"undefined"))return f(),"pfx"==n?m:!0;try{P.style[m]=o}catch(h){}if(P.style[m]!=y)return f(),"pfx"==n?m:!0}return f(),!1}function g(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?y(a,n,o,i):(a=(e+" "+j.join(s+" ")+s).split(" "),u(a,n,t))}var h=[],C=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",b=S._config.usePrefixes?x.split(" "):[];S._cssomPrefixes=b;var E=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+n}return!1};S.atRule=E;var j=S._config.usePrefixes?x.toLowerCase().split(" "):[];S._domPrefixes=j;var z={elem:l("modernizr")};Modernizr._q.push(function(){delete z.elem});var P={style:z.elem.style};Modernizr._q.unshift(function(){delete P.style}),S.testAllProps=g;var N=S.prefixed=function(e,n,t){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=s(e)),n?g(e,n,t):g(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),o(),i(h),delete S.addTest,delete S.addAsyncTest;for(var T=0;T<Modernizr._q.length;T++)Modernizr._q[T]();e.Modernizr=Modernizr}(window,document);
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));
/**
 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
 * @license MIT
 */

!function(t,e){"use strict";function r(t){t=t.split(" ");for(var e={},r=t.length,n=[];r--;)e.hasOwnProperty(t[r])||(e[t[r]]=1,n.unshift(t[r]));return n.join(" ")}var n="file:"===t.location.protocol,i=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),o=Array.prototype.forEach||function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;var r,n=this.length>>>0;for(r=0;n>r;++r)r in this&&t.call(e,this[r],r,this)},a={},l=0,s=[],u=[],c={},f=function(t){return t.cloneNode(!0)},p=function(t,e){u[t]=u[t]||[],u[t].push(e)},d=function(t){for(var e=0,r=u[t].length;r>e;e++)!function(e){setTimeout(function(){u[t][e](f(a[t]))},0)}(e)},v=function(e,r){if(void 0!==a[e])a[e]instanceof SVGSVGElement?r(f(a[e])):p(e,r);else{if(!t.XMLHttpRequest)return r("Browser does not support XMLHttpRequest"),!1;a[e]={},p(e,r);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===i.readyState){if(404===i.status||null===i.responseXML)return r("Unable to load SVG file: "+e),n&&r("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),r(),!1;if(!(200===i.status||n&&0===i.status))return r("There was a problem injecting the SVG: "+i.status+" "+i.statusText),!1;if(i.responseXML instanceof Document)a[e]=i.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var t;try{var o=new DOMParser;t=o.parseFromString(i.responseText,"text/xml")}catch(l){t=void 0}if(!t||t.getElementsByTagName("parsererror").length)return r("Unable to parse SVG file: "+e),!1;a[e]=t.documentElement}d(e)}},i.open("GET",e),i.overrideMimeType&&i.overrideMimeType("text/xml"),i.send()}},h=function(e,n,a,u){var f=e.getAttribute("data-src")||e.getAttribute("src");if(!/\.svg/i.test(f))return void u("Attempted to inject a file with a non-svg extension: "+f);if(!i){var p=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(p?(e.setAttribute("src",p),u(null)):a?(e.setAttribute("src",a+"/"+f.split("/").pop().replace(".svg",".png")),u(null)):u("This browser does not support SVG and no PNG fallback was defined."))}-1===s.indexOf(e)&&(s.push(e),e.setAttribute("src",""),v(f,function(i){if("undefined"==typeof i||"string"==typeof i)return u(i),!1;var a=e.getAttribute("id");a&&i.setAttribute("id",a);var p=e.getAttribute("title");p&&i.setAttribute("title",p);var d=[].concat(i.getAttribute("class")||[],"injected-svg",e.getAttribute("class")||[]).join(" ");i.setAttribute("class",r(d));var v=e.getAttribute("style");v&&i.setAttribute("style",v);var h=[].filter.call(e.attributes,function(t){return/^data-\w[\w\-]*$/.test(t.name)});o.call(h,function(t){t.name&&t.value&&i.setAttribute(t.name,t.value)});var g,m,b,y,A,w={clipPath:["clip-path"],"color-profile":["color-profile"],cursor:["cursor"],filter:["filter"],linearGradient:["fill","stroke"],marker:["marker","marker-start","marker-mid","marker-end"],mask:["mask"],pattern:["fill","stroke"],radialGradient:["fill","stroke"]};Object.keys(w).forEach(function(t){g=t,b=w[t],m=i.querySelectorAll("defs "+g+"[id]");for(var e=0,r=m.length;r>e;e++){y=m[e].id,A=y+"-"+l;var n;o.call(b,function(t){n=i.querySelectorAll("["+t+'*="'+y+'"]');for(var e=0,r=n.length;r>e;e++)n[e].setAttribute(t,"url(#"+A+")")}),m[e].id=A}}),i.removeAttribute("xmlns:a");for(var x,S,k=i.querySelectorAll("script"),j=[],G=0,T=k.length;T>G;G++)S=k[G].getAttribute("type"),S&&"application/ecmascript"!==S&&"application/javascript"!==S||(x=k[G].innerText||k[G].textContent,j.push(x),i.removeChild(k[G]));if(j.length>0&&("always"===n||"once"===n&&!c[f])){for(var M=0,V=j.length;V>M;M++)new Function(j[M])(t);c[f]=!0}var E=i.querySelectorAll("style");o.call(E,function(t){t.textContent+=""}),e.parentNode.replaceChild(i,e),delete s[s.indexOf(e)],e=null,l++,u(i)}))},g=function(t,e,r){e=e||{};var n=e.evalScripts||"always",i=e.pngFallback||!1,a=e.each;if(void 0!==t.length){var l=0;o.call(t,function(e){h(e,n,i,function(e){a&&"function"==typeof a&&a(e),r&&t.length===++l&&r(l)})})}else t?h(t,n,i,function(e){a&&"function"==typeof a&&a(e),r&&r(1),t=null}):r&&r(0)};"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=g:"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof t&&(t.SVGInjector=g)}(window,document);
//# sourceMappingURL=svg-injector.map.js
;
