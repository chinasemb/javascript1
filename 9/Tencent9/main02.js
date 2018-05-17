window.onload=  function () {

    console.log(2);
    var slider = document.querySelector(".sliders");
    console.log(slider);
    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");
    var navBtns = document.querySelectorAll(".navs span");
    var oneSize = -860 ;
    var current = 0 , len = navBtns.length ;
    var index = 0 ;

    //单个显示每个图片
    function showSliderItems(params) {
        for (let i = 0; i < len; i++) {
            navBtns[i].classList.remove("active");
        }
        navBtns[index].classList.add("active");
        mTween({
            el43: slider,
            attrs: {
                left: current * oneSize
            }

        })
    }

    //导航按钮控制的图片切换
    for (let i = 0; i < len; i++) {
        (function (i) {
            navBtns[i].onclick = function () {
                current = index = i ;
                showSliderItems();
            }
        })(i);
        
    }
    

    //上一张
    prevBtn.onclick= function () {
        if( current ===0 ){
            current = len ;
            slider.style.left = current * oneSize ;
        }
        current--;
        index--;
        if(index<0){
            index = len -1  ;
        }
        showSliderItems();
    }


    //下一张
    nextBtn.onclick = function () {
        if (current === len) {
            current = 0 ;
            slider.style.left = 0 ; 
        }
        current++ ;
        index++ ;
        if (index === len) {
            index = 0 ;
        }
        showSliderItems() ;
    }
}