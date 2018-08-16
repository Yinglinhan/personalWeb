// require('../css/font.css');
require('../css/mobile.less');
var part1Height = $('.part1').height(),
    part2Height = $('.part2').height(),
    part3Height = $('.part3').height(),
    part4Height = $('.part4').height();
var oDoc = $(document);
var scroLen;
console.log(part1Height)
var navBar = $(".horizontal-nav a")
// console.log(navBar)
init()

function init() {
    bindEvent();
    
    // initiAnimation()
}
function bindEvent() {
    
    navBar.on('tap', function(e) {
        e.preventDefault();
        navBar.removeClass('active');
        $(this).addClass('active');
        smoothScroll($(window), $($(e.currentTarget).attr('go')).offset().top, 200);
    });
        
    
    
}

//zepto可以平滑移动跳转的函数
function smoothScroll(el, to, duration) {
    if (duration < 0) {
        return;
    }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
}





