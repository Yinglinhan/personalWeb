
var scroLen;
var oDoc = $(document);
var part1Height = $('.part1').height(),
    part2Height = $('.part2').height(),
    part3Height = $('.part3').height(),
    part4Height = $('.part4').height();
var horNav = $('.horizontal-nav'),
    verNav = $('.vertical-nav'),
    navVerText = $('.vertical-nav a'),
    navHorText = $('.horizontal-nav a'),
    navHorTextLi = $('.horizontal-nav li');

var menuBox = $('.menu-box > div');
// console.log(menuBox)

$('body').css('overflow', 'hidden');

setDefaultAnimation();

window.onload = function () {
    init();
    $('.mask-layer').fadeOut();
    $('body').css('overflow', 'auto');
}







function init() {
    bindEvent();
    
    initiAnimation()
}



function setDefaultAnimation() {
    $('.logo').css({ 'top': '-100px', 'opacity': 0 });
    $('.three-line').css({'right':'-200px','opacity': 0});
    $('.symbol-mu').css({'left':'-200px','opacity': 0});
    $('.img-box').css({'right':'0','opacity': 0});
    $('.social-links').css({'left':'-200px','opacity': 0});
    $('.top-part').css({'left':'-200px','opacity': 0});
}
function initiAnimation() {
    $('.logo').animate({ 'top': '40px', 'opacity': 1 }, 500, 'swing');
    $('.three-line').delay(500).animate({ 'right': '0px', 'opacity': 1 }, 500, 'swing');
    $('.symbol-mu').animate({ 'left': '0px', 'opacity': 1 }, 500, 'swing');
    $('.img-box').animate({ 'right': '350px', 'opacity': 1 }, 500, 'swing');
    $('.social-links').animate({'left':'0px','opacity': 1},500);
    $('.top-part').animate({'left':'0px','opacity': 1},500);
}

function bindEvent() {
    //绑定屏幕滚动事件 取到滚动距离
    oDoc.on('scroll', function () {
        scroLen = oDoc.scrollTop();
        // console.log(scroLen);
        // console.log(part1Height+part2Height+part3Height)

        changeLogo(part1Height, part2Height, part3Height);
        changeNav();
        changgeSelect(part1Height,part2Height,part3Height)
        if (scroLen > 10000) {
            $('.img-box').hide()
        }else{
            $('.img-box').show()
        }
    });
    //点击竖版导航滚动到到相应的版块
    navVerText.on('click', function () {
        $('html').animate({
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, 500)
        navVerText.attr('class', 'nav-link');
        $(this).addClass('active');
        return false;
    })
    //点击横版导航滚动到相应的版块
    navHorText.on('click', function () {
        $('html').animate({
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, 500)
        navVerText.attr('class', 'nav-link').eq($(this).parent().index()).addClass('active');
        // return false;
    })
    //目录区点击
    menuBox.on('click',function(){
        $(".item-selected").removeClass("item-selected");
        $(this).addClass("item-selected");
        // console.log($(this).attr("target-src"))
        $("iframe").attr('src',$(this).attr("target-src"))
    })
}


//导航logo改变颜色
function changeLogo(p1, p2, p3) {
    if (scroLen > (p1 - 120) && scroLen < (p1 + p2 - 120)) {
        $('.logo').addClass('black');
        navVerText.css({ 'color': '#0E0B2B' });
        // navVerText.attr('class', 'nav-link');
        // navVerText.eq(0).addClass('active');
        
    } else if (scroLen > (p1 + p2 + p3 - 120)) {
        $('.logo').addClass('black');
        navVerText.css({ 'color': '#0E0B2B' })
    }
    else {
        $('.logo').removeClass('black');
        navVerText.css({ 'color': '#FFFFFF' })
    }
}

function changgeSelect(p1,p2,p3){
    if (scroLen < (p1 - 120) ) {
        
        navVerText.attr('class', 'nav-link');
        navVerText.eq(0).addClass('active');
    } else if(scroLen > (p1 - 120) && scroLen < (p1 + p2 - 120)) {
        navVerText.attr('class', 'nav-link');
        navVerText.eq(1).addClass('active');
    }
    else if(scroLen > (p1 + p2- 120) && scroLen < (p1 + p2 + p3 - 120)){
        navVerText.attr('class', 'nav-link');
        navVerText.eq(2).addClass('active');
    }
    else{
        navVerText.attr('class', 'nav-link');
        navVerText.eq(3).addClass('active');
    }
}




function changeNav() {
    if (scroLen > 200) {
        horNav.addClass('disappear');
        verNav.addClass('show');
    } else {
        horNav.removeClass('disappear');
        verNav.removeClass('show');
    }
}