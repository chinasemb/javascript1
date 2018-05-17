window.onload = function () {
    var slider = document.querySelector(".sliders");
    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");

    var navBtns = document.querySelectorAll(".navs span");
    var index = 0 ;
    var current = 0 ;
    var len = navBtns.length ;
    var oneSize = - 860 ;


    function showSliderItems(params) {
        for (let i = 0; i < len; i++) {
            navBtns[i].classList.remove("active");
        }
        navBtns[index].classList.add("active");
        mTween({
            el: slider,
            attrs: {
                left: current * oneSize
            }
        })
    }

    //下一张
    nextBtn.onclick = function (params) {
        if ( current === len ) {
            current = 0 ;
            slider.style.left = 0 ;
        }
        current++;
        index++;
        if (index === len) {
            index = 0
        }
        showSliderItems() ;
    }
    //上一张
    prevBtn.onclick = function (params) {
        if ( current === 0 ) {
            current = len ;
            slider.style.left = current * oneSize ;
        }
        current--;
        index--;
        if ( index < 0 ) {
            index = len - 1 ;
        }
        showSliderItems() ;
    }

    //点击按钮切换图片
    for (let i = 0; i < len; i++) {
        (function (i) {
            navBtns[i].onclick = function (params) {
                current = index = i ;
                showSliderItems() ;
            }
        })(i)
        
    }

}