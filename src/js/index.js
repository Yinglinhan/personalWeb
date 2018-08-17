// require('../css/font.css');
require('../css/mobile.less');
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var part1Height = $('.part1').height(),
    part2Height = $('.part2').height(),
    part3Height = $('.part3').height(),
    part4Height = $('.part4').height();
var oDoc = $(document);
var scroLen;
// console.log(part1Height)
var navBar = $(".horizontal-nav a")
// console.log(navBar)
init()

function init() {
    bindEvent();
    
    // initiAnimation()
}


function bindEvent() {
    oDoc.on('scroll', function () {
        scroLen = $(window).scrollTop();
        // console.log(scroLen);
        // console.log(part1Height+part2Height+part3Height)
        // if (isAndroid){
           
        // }
        changeNav(part1Height, part2Height, part3Height,200);
        // else if (scroLen > 1000) {
        //     $(navBar[1]).html('123')
        // }
    });
    
    navBar.on('tap', function(e) {
        e.preventDefault();
        changgeNavColor(this)
        smoothScroll($(window), $($(e.currentTarget).attr('go')).offset().top, 200);
    });
        
    
    
}

function changeNav(p1, p2, p3,num) {
    if (scroLen <= p1 - num) {
        changgeNavColor(navBar[0]);
    } 
    else if ((scroLen > p1 - num) && (scroLen <= p1 + p2 - num)){
        changgeNavColor(navBar[1])
    }else if (scroLen > (p1 + p2 - num) && (scroLen <= p1 + p2 + + p3 - num)) {
        changgeNavColor(navBar[2])
    }
    else{
        changgeNavColor(navBar[3])
    }
    if ((scroLen > p1 - num) && (scroLen <= p1 + p2 - num)){
        changgeNavColor(navBar[1])}
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



function changgeNavColor(item) {
    navBar.removeClass('active');
    $(item).addClass('active');
}



function swipePic(){
    var swipeBox = $('.swipe-box'),
        photoBox = $('.photo-box'),
        photoContainer = $('.pic-container'),
        boxWidth = swipeBox.width(),
        boxNum = $('.photo-box'),
        childNumArr = [],
        dotsBox = $('.dots'),
        initialNumArr = [],
        num = photoContainer.length;//取得有几个轮播图


    //确定每个项目图片的数量
    photoContainer.forEach(function(ele,index){
        childNumArr.push($(ele).children().length)
    })
    //把当前轮播图宽度设定到每张作品图片上
    photoBox.width(boxWidth);

    //设置作品图片的外部盒子的宽度
    photoContainer.forEach(function(ele,index){
        $(ele).width(boxWidth*childNumArr[index])
    })

    //根据图片数量确定小圆点的数量
    dotsBox.forEach(function(ele,index){
        for ( var i = 0; i < childNumArr[index] - 1; i++){
            if (i === 0){
                $(ele).html('<span class="active"></span>')
            }else{
                $(ele).append('<span></span>')
            }
        }
    })

    //左右滑动的效果
    // var test = []
    photoContainer.forEach(function(ele,index){
        initialNumArr.push(0)
    })
    // test = Array.prototype.slice.call(swipeBox,0);
    // console.log(swipeBox)
    // 向左滑动
    var lock = true;
    swipeBox.on('swipeLeft',function(){
        // initialNum --;
        // alert(initialNum);
        var num = $(this).parent().parent().index()
        
        if (lock){
            lock = false;
            changdot(dotsBox[num],initialNumArr[num],childNumArr[num])
            if (initialNumArr[num] < childNumArr[num]-1){
                
                initialNumArr[num] = initialNumArr[num] + 1
                $(photoContainer[num]).animate({
                    left:$(photoContainer[num]).position().left - boxWidth
                },400,'ease',function(){
                    lock=true;
                })
                
                
            }else{
                $(photoContainer[num]).css('left',0);
                initialNumArr[num] = 0;
                initialNumArr[num] = initialNumArr[num] + 1
                $(photoContainer[num]).animate({
                    left:$(photoContainer[num]).position().left - boxWidth
                },400,'ease',function(){
                    lock = true;
                })
                // changdot(dotsBox[num],1);
                
            }

        }
        
    })
    // 向右滑动
        swipeBox.on('swipeRight',function(){
            // initialNum --;
            // alert(initialNum);
            var num = $(this).parent().parent().index()
            if(lock){
                lock = false;
                changdot2(dotsBox[num],initialNumArr[num],childNumArr[num])
                if (initialNumArr[num] === 0){
                    initialNumArr[num] = childNumArr[num]-2;
                    $(photoContainer[num]).css('left',-(childNumArr[num] - 1)*boxWidth + 'px');
                    $(photoContainer[num]).animate({
                        left:$(photoContainer[num]).position().left + boxWidth
                    },400,'ease',function(){
                        lock = true;
                    });
                    // console.log(1)
                }else{
                    initialNumArr[num] = initialNumArr[num] - 1;
                    $(photoContainer[num]).animate({
                        left:$(photoContainer[num]).position().left + boxWidth
                    },400,'ease',function(){
                        lock = true;
                    });
                    // console.log(initialNumArr[num])
                }
            }
            
        })
    
}
swipePic()

function changdot(dots,num,allNum){
    // console.log(num);
    // var active = $(dots).find('.active');
    // console.log(active)
    
    //     active.removeClass('active');
    //     active.next().addClass('active');
    //     console.log(1)
    console.log(num)
    console.log(allNum)
    if (num < allNum -2){
        num += 1
        $(dots).children().removeClass('active')
        $(dots).children().eq(num).addClass('active')
    }
    // else if(){
    //     num = 0;
    //     $(dots).children().removeClass('active')
    //     $(dots).children().eq(num).addClass('active')
    else if(num - allNum === -2){
        num = 0;
        $(dots).children().removeClass('active')
        $(dots).children().eq(num).addClass('active')
    }else{
        num = 1;
        $(dots).children().removeClass('active')
        $(dots).children().eq(num).addClass('active')
    }
}
function changdot2(dots,num,allNum){
    
    console.log(num)
    console.log(allNum)
    if (num === 0){
        num = allNum - 2
        $(dots).children().removeClass('active')
        $(dots).children().eq(num).addClass('active')
    }else{
        num = num - 1
        $(dots).children().removeClass('active')
        $(dots).children().eq(num).addClass('active')
    }
}