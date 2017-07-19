/**
 * Created by wangZhi on 2016/8/15.
 */
/*-----------------------------首页 start-----------------------------*/
/*-------------------搜索框focus和blur特效封装-------------------*/
function searchFocus( inputSearch ) {
    var _searchInput = $(inputSearch);
    var d_Value = _searchInput.val(); //获取到它的默认值
    //获取焦点时
    _searchInput.focus(function () {
        //$(this)同等于我们的$('.search input.txt')
        if ( $(this).val() == d_Value ) {
            $(this).val('');    //当前输入框的值设置为空
        }
    });
    //失去焦点时
    _searchInput.blur(function () {
        if ( $(this).val() =='' ) {
            $(this).val( d_Value ); //给它赋它的初始值
        }
    });
}
/*-------------------二级导航显示隐藏封装-------------------*/
function subNavShow( subNavShow ) {
    var _MainNavLi = $(subNavShow);
    _MainNavLi.hover(function () {
        $(this).addClass('hover');//给li添加hover样式
        $(this).find('.menu').show();//显示menu盒子
    }, function () {
        $(this).removeClass('hover');//给li移除hover样式
        $(this).find('.menu').hide();//隐藏menu盒子
    });
}
/*-------------------广告banner图轮播封装-------------------*/
function bannerAdv( advImgList , btnLi ) {
    var _index = 0;//初始化序列
    var _picImg = $(advImgList);
    var _tabBtn = $(btnLi);
    var timer = null;
    _picImg.eq(0).show().siblings('div').hide();
    _tabBtn.hover(function () {
        _index = $(this).index();//获取当前li序列号
        bannerChange();
        clearInterval(timer);
    }, function () {
        autoPlay();
    });
    autoPlay();/*调用和执行*/
    function autoPlay() {
        timer = setInterval(function () {
            _index++;
            if ( _index > _tabBtn.length - 1 )_index = 0;
            bannerChange();
        },5000);

    }/*构建自动播函数*/
    function bannerChange() {
        _tabBtn.eq(_index).addClass('hover').siblings().removeClass('hover');
        _picImg.eq(_index).fadeIn('slow').siblings('div').fadeOut('slow');
    }
}
/*-------------------路线推荐 图片文字滑动效果封装-------------------*/
function hoverPicTxt( selImgList ) {
    var _selImgListLi = $(selImgList);
    _selImgListLi.hover(function () {
        $(this).find('p').animate({
            'height':'41px'
        }, 200);
    }, function () {
        $(this).find('p').animate({
            'height':'0'
        }, 200);
    });
}
/*-------------------第一部分轮播图效果封装-------------------*/
function picBannerLeft( scrollBtn , scrollCon , scrollTxt ) {
    var scrollBtnLi = $(scrollBtn);
    var scrolCon = $(scrollCon);
    var scrollTxtLi = $(scrollTxt);
    var _index = 0;//定义了序列号变量
    var timer = null;
    scrollBtnLi.hover(function(){
        clearInterval(timer);//清除定时器
        _index=$(this).index();//获取当前的序列号
        $(this).addClass("hover").siblings().removeClass("hover");//当前li添加 class="hover" 其它li移除
        scrolCon.animate({left:"-"+_index*339+"px"},1000);
        scrollTxtLi.eq(_index).show().siblings().hide();//序列相同的li显示，其它的隐藏
    },function(){
        autoPlay2();
    });
    autoPlay2();
    /*自动轮播*/
    function autoPlay2(){
        timer=setInterval(function(){
            _index++;//序列号加1
            if(_index==5){_index=0;}
            if(_index<=4){
                scrollBtnLi.eq(_index).addClass("hover").siblings().removeClass("hover");//当前li添加 class="hover" 其它li移除
                scrolCon.animate({left:"-"+_index*339+"px"},1000);
                scrollTxtLi.eq(_index).show().siblings().hide();
                if(_index==4){_index=-1;}
            }else{_index=-1;}//这个地方要不要
        },3000);
    }
}
/*-------------------第一、三、五部分选项卡切换效果封装-------------------*/
function tabPicChange( selBut , imgCon , Con ) {
    /*把通用代码设置成一个方法，然后传参去调用*/
    var _index = 0;
    $(selBut).mouseover(function () {
        _index = $(this).index();
        $(this).addClass('hover').siblings().removeClass('hover');
        $(imgCon).eq(_index).show().siblings().hide();
        $(Con).eq(_index).show().siblings().hide();
    });
}
/*-------------------第五部分品牌滑动效果封装-------------------*/
function slideToggle( part5Comm ) {
    $(part5Comm).hover(function () {
        $(this).find('p').stop().slideDown();
    }, function () {
        $(this).find('p').stop().slideUp();
    });
}
/*-------------------底部横幅广告二维码效果封装-------------------*/
function AdvHover( obj , popImg) {
    var imgWx = $(obj);
    var imgErm = $(popImg);
    imgWx.hover(function () {
        showQr();
    }, function () {
        hideQr();
    });
    function showQr() {
        imgErm.show();
    }
    function hideQr() {
        imgErm.hide();
    }
}
/*-----------------------------首页 end-----------------------------*/

/*-----------------------------内页-category start-----------------------------*/
/*-------------------图片轮播效果封装-------------------*/
function bannerPic( obj , prevBtn , nextBtn , animated , dlPic , imgPic ) {
    var click_num = 0;//点击次数
    var picLongDiv = $(animated);
    var lenPic = $(dlPic).length;//获取dl个数
    var imgWidth = $(imgPic).width();
    var btnImg = $(obj);
    var timer = null;
    //左切换按钮效果
    $(prevBtn).click(function () {
        click_num--;
        if ( click_num < 0 ) {
            click_num = lenPic - 3;
        }
        picLongDiv.animate({
            'left' : -( imgWidth + 18 ) * click_num + 'px'
        }, 1000);
    });
    //右切换按钮效果
    $(nextBtn).click(function () {
        bannerChange();
    });
    btnImg.hover(function () {
        clearInterval(timer);
    }, function () {
        autoPlay();
    });
    autoPlay();
    function autoPlay() {
        timer = setInterval(function () {
            bannerChange();
        },3000);
    }
    function bannerChange() {
        click_num++;//点击次数加1
        if ( click_num > lenPic - 3 ) {
            click_num = 0;
        }
        picLongDiv.animate({
            'left' : -( imgWidth + 18 ) * click_num + 'px'
        }, 1000);
    }
}
/*-------------------内页第一部分左边图片切换效果封装-------------------*/
function bannerChangeP1( webAdvBtn , webAdvConImg , txtDD ) {
    var web_index=0;
    var up_click=0;
    var sjs=0;
    var arrylist=null;
    $(webAdvBtn).click(function(){
        web_index=$(this).index();//获取当前点击li的序列号，赋给变量 web_index;
        $(this).addClass("hover").siblings().removeClass("hover");//当前点击的加上 class="hover" 其它 li 移除class="hover"
        $(webAdvConImg).eq(up_click).css("z-index","3");//把移走的那张图片调到最上面
        $(webAdvConImg).eq(web_index).css("z-index","2")
        //文字动画效果
        $(txtDD).eq(web_index).show().siblings().hide();
        sjs=getRandom(4)-1;
        arrylist=[{"top":"-270px"},{"right":"-361px"},{"bottom":"-270px"},{"left":"-361px"}];

        if(up_click==web_index){}else{//当前面点击的序列号和现在点击的序列号不相等时，就执行
            $(webAdvConImg).eq(up_click).stop(true,true).animate(arrylist[sjs],500,function(){
                //$(".webAdvcon img").eq(0).css({"top":"0px","z-index":"0"});
                $(webAdvConImg).eq(up_click).removeAttr("style");
                up_click=web_index;//保存发前按扭点击对应的序列号
            });
        }
    });
    //随机函数，获到到 0-n之间的整数
    function getRandom(n){
        return Math.floor(Math.random()*n+1)
    }
}
/*-----------------------------内页-category end-----------------------------*/

/*-----------------------------内页-qianzDetails start-----------------------------*/
/*-------------------滚动监听效果封装-------------------*/
function scrollNavQz( webQzNav , webQzCon ) {
    var webQzScrollHeight = $(webQzCon).height();
    var _index = 0;
    $(webQzNav).mouseover(function () {
        _index = $(this).index();//获取到对应序列号
        $(this).addClass('hover').siblings('span').removeClass('hover');
        $(webQzCon).stop(true,true).animate({
            scrollTop : webQzScrollHeight * (_index-1) + 'px'
        },500);
    });
}
/*-----------------------------内页-qianzDetails end-----------------------------*/