window.onload = function () {
    //所有图片的父容器
    var slider = document.querySelector('.sliders');
    console.log(slider);
    //左侧按钮
    var prevBtn = document.querySelector('.prev');
    //右侧按钮
    var nextBtn = document.querySelector('.next');
    //所有的导航按钮
    var navBtns = document.querySelectorAll('.navs span');
    console.log(navBtns);
    //当前显示的第几张图
    var len = navBtns.length;
    console.log(len);
    var current = 0 ;
    //每次要运动的left值
    var oneSize = -860 ;
    //控制导航按钮的对应显示
    var index = 0;

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

    //导航按钮切换图片
    //应用闭包代替自定义属性,找到index.
    for(let i =0; i < len ;++i ){
        (function (i){
            navBtns[i].onclick = function (){
                current = index = i;
                showSliderItems();
            }
        })(i)
    }

    //切换上一张
    prevBtn.onclick = function (){
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

    //切换下一张
    nextBtn.onclick = function (){
        if ( current === len ) {
            current =0 ;
            slider.style.left = 0 ;
        }
        current++;
        index++;
        if (index===len) {
            index =  0;
        }
        
        showSliderItems();
        
    }
}