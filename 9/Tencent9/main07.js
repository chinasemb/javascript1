window.onload = function (params) {
    var slider = document.querySelector(".sliders");
    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");
    var navBtns = document.querySelectorAll(".navs span");
    
    var current = 0 ,index = 0, len = navBtns.length;
    var oneSize = - 860 ;

    //封装函数
    function showSlidersItem(params) {
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
        if (current === len) {
            current = 0;
            slider.style.left = 0;
        }
        current++;
        index++;
        if (index === len) {
            index = 0;
        };
        showSlidersItem();
    }
    //上一张
    prevBtn.onclick = function (params) {
        if (current === 0) {
            current = len;
            slider.style.left = len * oneSize ;
        }
        current--;
        index--;
        if (index < 0 ) {
            index = len - 1 ;
        };
        showSlidersItem();
    }

    //点击按钮切换图片
    for (let i = 0; i < len; ++ i) {
        (function (i) {
            navBtns[i].onclick = function (params) {
                current = index = i ;
                showSlidersItem () ;
            }
        }
        )(i)
        
    }
}