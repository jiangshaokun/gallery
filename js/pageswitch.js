(function ($) {
    var defaults = {
        'container': '#container',//容器
        'sections': '.section',//子容器
        'easing': 'ease',//特效方式，ease-in,ease-out,linear
        'duration': 1000,//每次动画执行的时间
        'pagination': true,//是否显示分页
        'loop': false,//是否循环
        'keyboard': true,//是否支持键盘
        'direction': 'vertical',//滑动的方向 horizontal,vertical,
        'onpageSwitch': function (pagenum) {
        }
    };

    var win = $(window),
        container, sections;

    var opts = {},
        canScroll = true;

    var iIndex = 0;

    var arrElement = [];

    var SP = $.fn.switchPage = function (options) {
        opts = $.extend({}, defaults, options || {});

        container = $(opts.container),
            sections = container.find(opts.sections);

        sections.each(function () {
            arrElement.push($(this));
        });

        return this.each(function () {
            if (opts.direction == "horizontal") {
                initLayout();
            }

            if (opts.pagination) {
                initPagination();
            }

            if (opts.keyboard) {
                keyDown();
            }
        });
    }

    //滚轮向上滑动事件
    SP.moveSectionUp = function () {
        if (iIndex === 0) {
            return;
        }
        if (iIndex) {
            iIndex--;
        } else if (opts.loop) {
            iIndex = arrElement.length - 1;
        }
        scrollPage(arrElement[iIndex]);
        next_bg(iIndex);
    };

    //滚轮向下滑动事件
    SP.moveSectionDown = function () {
        if (iIndex === arrElement.length - 1) {
            return;
        }
        if (iIndex < (arrElement.length - 1)) {
            iIndex++;
        } else if (opts.loop) {
            iIndex = 0;
        }
        scrollPage(arrElement[iIndex]);
        next_bg(iIndex);
    };
    //自定义 按钮点击滚屏
    var btn = $('#next');
    btn.click(function (event) {
        console.log(iIndex);
        if (iIndex === arrElement.length - 1) {
            if (iIndex < (arrElement.length - 1)) {
                iIndex++;
            } else if (opts.loop) {
                iIndex = 0;
            }
            scrollPage(arrElement[iIndex]);
            next_bg(iIndex);
        } else {
            /* Act on the event */
            SP.moveSectionDown();
        }
    });

    //私有方法
    //页面滚动事件
    function scrollPage(element) {
        $(".nav li a.active").removeClass('active');
        $(".nav li a[index='"+iIndex+"']").addClass('active');
        var dest = element.position();
        if (typeof dest === 'undefined') {
            return;
        }
        initEffects(dest, element);
    }

    //重写鼠标滑动事件

    $(".section").on("mousewheel DOMMouseScroll", MouseWheelHandler);
    function MouseWheelHandler(e) {
        $(".section").off("mousewheel DOMMouseScroll", MouseWheelHandler);
        e.preventDefault();
        var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        console.log(value);
        var delta = Math.max(-1, Math.min(1, value));
        if (canScroll) {
            if (delta < 0) {
                console.log('Down');
                SP.moveSectionDown();
            } else{
                console.log('Up');
                SP.moveSectionUp();
            }
        }
        setTimeout(function(){
            $(".section").on("mousewheel DOMMouseScroll", MouseWheelHandler);
        },opts.duration);
    }

    //横向布局初始化
    function initLayout() {
        var length = sections.length,
            width = (length * 100) + "%",
            cellWidth = (100 / length).toFixed(2) + "%";
        container.width(width).addClass("left");
        sections.width(cellWidth).addClass("left");
    }

    //初始化分页
    function initPagination() {
        var length = sections.length;
        if (length) {

        }
        var pageHtml = '<ul id="pages"><li class="active"></li>';
        for (var i = 1; i < length; i++) {
            pageHtml += '<li></li>';
        }
        pageHtml += '</ul>';
        $("body").append(pageHtml);
    }

    //分页事件
    function paginationHandler() {
        var pages = $("#pages li");
        pages.eq(iIndex).addClass("active").siblings().removeClass("active");
    }

    //是否支持css的某个属性
    function isSuportCss(property) {
        var body = $("body")[0];
        for (var i = 0; i < property.length; i++) {
            if (property[i] in body.style) {
                return true;
            }
        }
        return false;
    }

    //渲染效果
    function initEffects(dest, element) {
        var transform = ["-webkit-transform", "-ms-transform", "-moz-transform", "transform"],
            transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition"];

        canScroll = false;
        if (isSuportCss(transform) && isSuportCss(transition)) {
            var traslate = "";
            if (opts.direction == "horizontal") {
                traslate = "-" + dest.left + "px, 0px, 0px";
            } else {
                traslate = "0px, -" + dest.top + "px, 0px";
            }
            container.css({
                "transition": "all " + opts.duration + "ms " + opts.easing,
                "transform": "translate3d(" + traslate + ")"
            });
            container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function () {
                canScroll = true;
            });
        } else {
            var cssObj = (opts.direction == "horizontal") ? {left: -dest.left} : {top: -dest.top};
            container.animate(cssObj, opts.duration, function () {
                canScroll = true;
            });
        }
        element.addClass("active").siblings().removeClass("active");
        if (opts.pagination) {
            paginationHandler();
        }
    }

    //窗口Resize
    var resizeId;
    win.resize(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(function () {
            reBuild();
        }, 500);
    });

    function reBuild() {
        //var currentHeight = win.height(),
        //    currentWidth = win.width();

        //var element = arrElement[iIndex];
        /*		if(opts.direction == "horizontal"){
         var offsetLeft = element.offset().left;
         if(Math.abs(offsetLeft)>currentWidth/2 && iIndex <(arrElement.length-1)){
         iIndex ++;
         }
         }else{
         var offsetTop = element.offset().top;
         if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
         iIndex ++;
         }
         }*/
        if (iIndex) {
            paginationHandler();
            var cuerrentElement = arrElement[iIndex],
                dest = cuerrentElement.position();
            initEffects(dest, cuerrentElement);
        }
    }

    //绑定键盘事件
    function keyDown() {
        var keydownId;
        win.keydown(function (e) {
            clearTimeout(keydownId);
            keydownId = setTimeout(function () {
                var keyCode = e.keyCode;
                if (keyCode == 37 || keyCode == 38) {
                    SP.moveSectionUp();
                } else if (keyCode == 39 || keyCode == 40) {
                    SP.moveSectionDown();
                }
            }, 150);
        });
    }

    //自定义 页面内容显示效果
    var nav_li_a = $(".nav li a");
    nav_li_a.click(function (e) {
        /* Act on the event */
        $(".nav li a.active").removeClass('active');
        //$(this).addClass('active');
        var nav_index = $(this).attr('index');
        iIndex = nav_index;
        console.log(iIndex);
        paginationHandler();
        next_bg(iIndex);
        scrollPage(arrElement[iIndex]);
    });

    function next_bg(iIndex) {
        if (iIndex == 1) {
            $("#next").css({
                'backgroundPosition': '0' + ' -60px',
                'width': '60px',
                'height': '60px'
            });
        }
        else if (iIndex == arrElement.length - 1) {
            $("#next").css({
                'backgroundPosition': '-60px' + ' 0',
                'width': '80px',
                'height': '80px'
            });
        } else {
            $("#next").css({
                'backgroundPosition': '0' + ' 0',
                'width': '60px',
                'height': '60px'
            });
        }

        if (iIndex == 0) {
            $('.nav_bg').css('width', '0');
            $('.nav li a.nav_link').css({
                'margin': '3.125rem' + ' 0',
                'fontSize': '1.875rem',
                'opacity': '0.7'
            });
            $('#index_link').css({
                'margin': '2.5rem' + ' auto',
                'opacity': '0.7'
            });
        } else {
            $('.nav_bg').css('width', '100%');
            $('.nav li a.nav_link').css({
                'margin': '1.25rem' + ' 0',
                'fontSize': '1.5rem',
                'opacity': '1'
            });
            $('#index_link').css({
                'margin': '0.625rem' + ' auto',
                'opacity': '1'
            });
        }
    }

    //自定义 隐藏loading页面
    var load = $('.loading_wrap');
    load.on("mousewheel DOMMouseScroll", null);
    var hide_load = setTimeout(function () {
        load.animate({
                "height": 0
            },
            500, function () {
                /* stuff to do after animation is complete */
                load.css({
                    'display': 'none'
                });

                clearTimeout(hide_load);

            });
    }, 500);

})(jQuery);