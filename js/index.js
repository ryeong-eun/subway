$(document).ready(function () {
    
    const $nav = $(".header .nav ul");
    const $header = $(".header")
    const $submenu = $(".header .submenu")

    // 반응형 모바일 베스트서브웨이 
    const $left_list = $(".best-content .best-area .left ul li");
    const $center_content = $(".best-content .best-area .center .center-content")
    const $right_circle =$(".best-content .best-area .right .circle");


    $nav.mouseover(function () {
        $submenu.addClass("on")
        $header.addClass("on")
    }).mouseout(function(){
        $submenu.removeClass("on")
        $header.removeClass("on")
    })

    $submenu.mouseover(function(){
        $submenu.addClass("on")
        $header.addClass("on")
    }).mouseout(function(){
        $submenu.removeClass("on")
        $header.removeClass("on")
    })



    // 메인비주얼 swiper
    const swiper = new Swiper(".main-slide",{
        loop:true,
        autoplay: true,
        pagination:{
            el: ".swiper-pagination",
            type: "progressbar"
        }
    })

    // 슬라이드가 더 추가 되었을때 자동으로 전체 숫자 추가
    // 만약 9보다 크다면 0을 뺀다
    if(swiper.realIndex+1 > 9){
        $(".swiper-index span").eq(1).text((swiper.slides.length -2));
    }else{
        $(".swiper-index span").eq(1).text("0"+(swiper.slides.length -2));
    }
    swiper.on("slideChange",function(){
        console.log(swiper.realIndex)
        if(swiper.realIndex+1 > 9){
            $(".swiper-index span").eq(0).text((swiper.realIndex+1));
        }else{
            $(".swiper-index span").eq(0).text("0"+(swiper.realIndex+1));
        }
    })

    // 공지사항
    const swiper2 = new Swiper(".notice-swiper",{
        loop:true,
        autoplay: true,
        direction: "vertical",
        navigation:{
            nextEl: ".btn-next",
            prevEl: ".btn-prev"
        }
    })

    // 인기메뉴
    const swiper3 = new Swiper(".popular-area",{
        loop:true,
        direction: "vertical",
        autoplay: true,
    })

    // 이벤트
    const $event_list = $(".event-list ul li")
    const $event_img = $(".event-img img")

    $("a").click(function(e){
        e.preventDefault();
    })

    $event_list.click(function(){
        let i = $(this).index()+2;
        // alert(i)
        $event_img.attr("src","images/event"+"-"+i+".jpg")
    })

    // 서브웨이 메뉴
    const $sub_menu_slide = $(".subway-menu-content .menu-content")
    const $sub_menu_nav = $(".subway-menu-content ul li");
    $sub_menu_slide.eq(0).show()
    $sub_menu_nav.eq(0).addClass("on")

    const swiper4 = new Swiper(".menu-content",{
        // 모바일 우선이라서 모바일 기준
        loop: false,
        autoplay: {
            delay: 2000,
        },
        slidesPerView: "2",
        spaceBetween: 10,
        grid:{
            rows: 2
        },
        // 반응형
        breakpoints:{
            767:{
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                slidesPerView: "4",
                spaceBetween: 20,
                grid:{
                    rows: 1
                }
            },
            1024:{
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                slidesPerView: "4",
                spaceBetween: 50,
                grid:{
                    rows: 1
                }
            }
        },
        navigation:{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        // 슬라이더가 불러올 떄마다 새로고침을 해주는 역할 > display:none > block 변경되었을때 먹통되는 것을 방지
        observer:true,
        observeParents:true
    })
    $sub_menu_nav.click(function(){
        let i = $(this).index();
        $sub_menu_nav.removeClass("on").eq(i).addClass("on")
        $sub_menu_slide.hide().eq(i).show()
        // 탭 메뉴클릭할때마다 제품 순서가 처음으로 가는 코드
        swiper4[i].slideTp(0,100)
    })

    // sns
    const $tab_nav = $(".subway-sns-content .content-wrap > ul li");
    const $tab_list = $(".subway-sns-content .tab-content")
    $tab_list.eq(0).show();
    $tab_nav.eq(0).addClass("on")
    // 모바일
    let idx = 0;
    $tab_nav.click(function(){
        let i = $(this).index();
        $tab_list.hide().eq(i).show()
        $tab_nav.removeClass("on").eq(i).addClass("on")
        // 모바일
        idx = i;
    })
    
    $(".tab-content a").click(function(e){
        $(".tab-content a").unbind();
    })


    
    // 이벤트
    let myswiper = null;
    let ww = $(window).width();
    // console.log(ww)

    function initswiper(){
        if(ww < 751 && myswiper == null){
            myswiper = new Swiper(".event-img",{
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                pagination:{
                    el: ".swiper-pagination",
                    clickable: true
                }
            })
        }else if(ww >750 && myswiper != null){
            myswiper.destroy();
            myswiper = null
        }
    }

    // 반응형  모바일 sns
    let swiper5 = null;
    function initswiper2(){
        if(ww < 751 && swiper5 == null){
            swiper5 = new Swiper(".tab-content",{
                loop: true,
                navigation:{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                pagination:{
                    el: ".swiper-pagination",
                    clickable: true,
                    
                }
            })
        }else if(ww >750 && swiper5 != null){
            // 탭메뉴로 구성되어 swiper가 3개라서
            swiper5[0].destroy();
            swiper5[1].destroy();
            swiper5[2].destroy();
            swiper5 = null
            $tab_list.eq(idx).show()
        }

    }

    // 모바일 베스트서브웨이
    let swiper6 = null
    function initswiper3(){
        if(ww < 751 && swiper6 == null){
            swiper6 = new Swiper(".right",{
                loop: true,
                // autoplay: {
                //     delay: 2000,
                // },
                
                navigation:{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
            })
            // 아래 글씨도 같이 바뀌기
            $right_circle.addClass("on")
            $left_list.removeClass("on").eq(0).addClass("on")
            $center_content.hide().eq(0).show()
            swiper6.slideTo(swiper6.realIndex+1)
            // 현재 슬라이드 숫자 가져오는 거
            swiper6.on("slideChange", function(){
                $center_content.hide().eq(swiper6.realIndex).show()
                // 페이지 줄였다 늘려도 똑같은 메뉴 보이기
                $left_list.removeClass("on").eq(swiper6.realIndex).addClass("on")
            })
            
        }else if(ww >750 && swiper6 != null){
            // 페이지 줄였다 늘려도 똑같은 메뉴 보이기
            $right_circle.removeClass("on").eq(swiper6.realIndex).addClass("on")
            swiper6.destroy();
            swiper6 = null
        }
    }


    // 현재창 사이즈 실시간 변경
    initswiper()
    initswiper2()
    initswiper3()
    $(window).resize(function(){
        ww = $(window).width();
        // console.log(ww)
        initswiper()
        // sns 모바일
        initswiper2()
        // 베스트서브웨이
        initswiper3()
    })

    // 반응형
    // 햄버거
    $(".hamburger i, .m-nav > i").click(function(){
        $(".m-nav").toggleClass("on")
    })


    // 햄버거 서브
    // 0부터 시작 그래서 -1
    let prev = -1;
    const $m_nav = $(".m-nav .menu > ul > li")

    $m_nav.click(function(){
        // alert()
        let i = $(this).index();
        // 서브 길이값 구하기
        const ul_height = $(this).find("ul li").length *30+"px";
        // alert(ul_height)


        $m_nav.removeClass("on")
        if(prev == i){
            $(this).removeClass("on")
            // 다른 서브 클릭시 자동으로 닫히기
            $m_nav.find("ul").css("height","")
            prev = -1;
        }else{
            $(this).toggleClass("on")
            // 다른 서브 클릭시 자동으로 닫히기
            $m_nav.find("ul").css("height","")
            // 서브 나오기
            $m_nav.eq(i).find("ul").css("height", ul_height)
            prev = i
        }


        // 다른 서브 클릭시 자동으로 닫히기
        // $m_nav.find("ul").css("height","")
        // 서브 나오기
        // $m_nav.eq(i).find("ul").css("height", ul_height)

        // 아이콘 
        // $(this).toggleClass("on")
    })



    // 베스트서브웨이
    
    $right_circle.eq(0).addClass("on")
    $left_list.eq(0).addClass("on")
    $left_list.click(function(e){
        e.preventDefault();
        let i = $(this).index();
        $left_list.removeClass("on").eq(i).addClass("on")
        $center_content.hide().eq(i).show();
        $right_circle.removeClass("on").eq(i).addClass("on")

    })
});