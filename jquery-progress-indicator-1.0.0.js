 /*!
 * jQuery Progress Indicator v1.0.0
 * https://github.com/tyleteam/jquery-progress-indicator
 *
 * Copyright 2016 Tubloo Co, Ltd. made by hhlee@tyle.io
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: 2016-12-01
 */
(function ($) {
    $.progressIndicator = function(options){
        if(typeof options===undefined){
            options = {};
        }
        // set default
        options = $.extend(true, {
            direction : 'top',
            color: 'rgba(131, 117, 237, 1)',
            easingSpeed : 0.5,
            height: 4,
            enablePercentage : true,
            enableIfOnly : function(){
                return true;
            },
            onStart : function(){
                console.log("onStart");
            },
            onEnd : function(){
                console.log("onEnd");
            },
            onProgress : function(perecent){
                console.log(perecent);
            }
        }, options);

        var wrapperCss = {
            position: 'fixed',
            transition: 'transform '+options.easingSpeed+'s cubic-bezier(.14,.52,.4,.78)',
            background: options.color
        };
        switch(options.direction){
            case 'top':
            case 'bottom':
                if(options.direction === 'top'){
                    wrapperCss.top = 0;
                }else{
                    wrapperCss.bottom = 0;
                }
                wrapperCss.left = 0;
                wrapperCss.transform = 'translate3d(-100%, 0, 0)';
                wrapperCss.width = '100%';
                wrapperCss.height = options.height+'px';
                break;
            case 'left':
            case 'right':
                if(options.direction === 'left'){
                    wrapperCss.left = 0;
                }else{
                    wrapperCss.right = 0;
                }
                wrapperCss.top = 0;
                wrapperCss.transform = 'translate3d(0, -100%, 0)';
                wrapperCss.width = options.height+'px';
                wrapperCss.height = '100%';
        }
        var perCss = {
            position: 'fixed',
            'line-height' : '1em',
            background: 'rgba(255,255,255,0.7)',
            color: '#222',
            padding: '2px 2px',
            'font-size' : '8px'
        };
        if(options.enablePercentage === false){
            perCss.display = 'none';
        }
        switch(options.direction){
            case 'top':
            case 'bottom':
                if(options.direction === 'top'){
                    perCss.top = '100%';
                }else{
                    perCss.bottom = '100%';
                }
                perCss.right = 0;
                break;
            case 'left':
            case 'right':
                if(options.direction === 'left'){
                    perCss.left = '100%';
                }else{
                    perCss.right = '100%';
                }
                perCss.bottom = 0;
        }
        $('body').append(
            $('<div></div>')
            .css(wrapperCss)
            .attr('id', 'progress-indicator')
            .data('direction', options.direction)
            .data('enableIfOnly', options.enableIfOnly)
            .data('onStart', options.onStart)
            .data('onProgress', options.onProgress)
            .data('onEnd', options.onEnd)
            .html(
                $('<div></div>').css(perCss)
            )
        );
        $(window).on('scroll.indicator', function(){
            var $progressDom = $('#progress-indicator');
            if($progressDom.data('enableIfOnly')()===false){
                return false;
            }
            var per = ($(this).scrollTop() / ($(document).outerHeight() - $(this).height())) * 100;
            var transformValue = '';
            switch($progressDom.data('direction')){
                case 'top':
                case 'bottom':
                    transformValue = 'translate3d(-'+(100-per)+'%, 0, 0)';
                    break;
                case 'left':
                case 'right':
                    transformValue = 'translate3d(0, -'+(100-per)+'%, 0)';
            }
            $progressDom.css({
                transform: transformValue
            }).children('div').css({
                // transform: 'translate3d('+(per)+'%, 0, 0)'
            }).text(parseInt(per)+'%');
            if(per == 0){
                $progressDom.data('onStart')();
            }else if(per == 100){
                $progressDom.data('onEnd')();
            }else{
                $progressDom.data('onProgress')(per);
            }
        }).trigger('scroll.indicator');
    };
})(jQuery);