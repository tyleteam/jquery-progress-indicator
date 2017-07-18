 /*!
 * jQuery Progress Indicator v1.0.6
 * https://github.com/tyleteam/jquery-progress-indicator
 *
 * Copyright 2016 Tubloo Co, Ltd. made by hhlee@tyle.io
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: 2017-07-18
 */
(function ($) {
    $.progressIndicator = function(options){
        if (typeof options === 'string') {
            // methods
            switch(options) {
                case 'reset' : {
                    $('#progress-indicator').css({
                        transform : 'translate3d(-100%, 0px, 0px)'
                    });
                    break;
                }
            }
            return;
        };
        if(typeof options===undefined){
            options = {};
        }
        // set default
        options = $.extend(true, {
            direction : 'top',
            target : 'body', // selector
            barColor: 'rgb(253, 191, 38)',
            percentageEnabled : false,
            percentageColor: '#222',
            easingSpeed : 0.5,
            height: 4,
            onStart : function(){
                // console.log("onStart");
            },
            onEnd : function(){
                // console.log("onEnd");
            },
            onProgress : function(perecent){
                // console.log(perecent);
            }
        }, options);

        var wrapperCss = {
            position: 'fixed',
            transition: 'transform '+options.easingSpeed+'s cubic-bezier(.14,.52,.4,.78)',
            background: options.barColor
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
            background: 'rgba(255, 255, 255, 0.7)',
            color: options.percentageColor,
            padding: '2px 2px',
            'font-size' : '8px'
        };
        if(options.percentageEnabled === false){
            perCss.display = 'none';
        }
        switch(options.direction){
            case 'top':
            case 'bottom':
                var top = options.height > 9 ? '50%' : '100%';
                if(options.direction === 'top'){
                    perCss.top = top;
                }else{
                    perCss.bottom = top;
                }
                if(options.height > 9){
                    perCss['margin-top'] = '-5px';
                    perCss.padding = '0 3px';
                    perCss.background = 'transparent';
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
            .data('onStart', options.onStart)
            .data('onProgress', options.onProgress)
            .data('onEnd', options.onEnd)
            .html(
                $('<div></div>').css(perCss)
            )
        );
        this.ex = function(){
            var $progressDom = $('#progress-indicator');

            var per = -1;
            var scrollTop = $(window).scrollTop();
            if($(options.target).length ===0){
                return false;
            }
            $(options.target).each(function(){
                if($(this).offset().top > scrollTop){
                    return true; // continue
                }
                per = (scrollTop / ($(this).outerHeight() - $(window).height())) * 100;
            });
            if(per > 100){
                per = -1;
            }
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

        }
        $(window).on('scroll.indicator', this.ex).trigger('scroll.indicator');
    };
})(jQuery);