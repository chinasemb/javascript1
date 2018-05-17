window.onload = function name(params) {
    var slider = document.querySelector(".sliders");
    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");
    var navBtns = document.querySelectorAll(".navs span");

    var current = 0 ;
    var index = 0 ;
    var oneSize = -860 ;
    var len = navBtns.length ;

    //函数的封装
    function showSliderItems(params) {
        for (let i = 0; i < len; i++) {
            
            navBtns[i].classList.remove("active");
        }
        navBtns[index].classList.add("active");

        mTween({
            el: slider ,
            attrs : {
                left : current * oneSize 
            }
        })
    }
    //下一张
    nextBtn.onclick = function name(params) {
        if ( current === len ) {
            current = 0 ;
            slider.style.left = 0 ;
        }
        current ++ ;
        index ++ ;
        if ( index === len ) {
            index = 0 ;
        }
        showSliderItems () ;
    }
    //上一张
    prevBtn.onclick = function name(params) {
        if ( current === 0 ) {
            current = len ;
            slider.style.left = current * oneSize ;
        }
        current -- ;
        index -- ;
        if ( index < 0 ) {
            index = len - 1 ;
        }
        showSliderItems () ;
    }
    //点击按钮切换图片
    for (let i = 0; i < len; i++) {
        (function name(i) {
            navBtns[i].onclick = function name(params) {
                current = index = i ;
                showSliderItems () ;
            }
        })(i)
        
    }
}