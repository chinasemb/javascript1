window.onload= function() {

    var slider = document.querySelector(".sliders");
    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");
    console.log(nextBtn);
    var navBtns = document.querySelectorAll(".navs span");

    var  len = navBtns.length,current = 0 ;
    var index = 0 ;
    var oneSize = -860 ;
    console.log(1);

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
    nextBtn.onclick  = function (params) {
        console.log(1);
        if ( current === len ) {
            current = 0 ;
            slider.style.left = 0 ;
        }
        current++ ;
        index++ ;

        if ( index === len ) {
            index = 0 ;
        }

        showSliderItems() ;
    }
    //上一张
    prevBtn.onclick  = function (params) {
        console.log(1);
        if ( current === 0 ) {
            current = len ;
            slider.style.left = current * oneSize ;
        }
        current-- ;
        index-- ;

        if ( index < 0 ) {
            index = len - 1  ;
        }

        showSliderItems() ;
    }

    //点击导航按钮切换图片
    for (let i = 0; i < len; i++) {
        (function (i) {
            navBtns[i].onclick = function () {
                current = index = i ;
                showSliderItems() ;
            }
        })(i)
        
    }
}