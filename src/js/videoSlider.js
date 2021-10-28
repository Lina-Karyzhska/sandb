const observer = lozad(); 

observer.observe();
const timeouts = [];

const changeSlide = (timeout) => {
    timeouts.push(setTimeout(() => {
        $('.video-slider').slick("slickNext");
    }, timeout))
}

const setVideoSize = (video) => {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const k = windowHeight / windowWidth;

    video.css("height", `${windowHeight}px`);
    video.css("width", `auto`)

    // if (k > 1.8) {
    //     video.css("height", `${windowHeight}px`);
    //     video.css("width", `auto`)
    // } else {
    //     video.css("width", `${windowWidth}px`); 
    //     video.css("height", `auto`);
    // }
}

const checkWarningScreen = (video) => {
    if ($(window).width() < 740) {
        if (video) setVideoSize(video);
        $(".use-phones").removeClass("use-phones__visible");
        $(".for-you").css("display", "block");
    } else {
        $(".use-phones").addClass("use-phones__visible");
        $(".for-you").css("display", "none");
    }
}

$(function() {
    $("#sound").on('click', () => {
        let isMuted;
        [...$('.video-slider__item__video')].forEach(el => {
            isMuted = el.muted;
            el.muted = !el.muted;
        });

        if (isMuted) {
            $(".sound__active").addClass("sound_block");
            $(".sound__muted").removeClass("sound_block");
        } else {
            $(".sound__active").removeClass("sound_block");
            $(".sound__muted").addClass("sound_block");
        }
    })
    
    let timeout;
    $(window).resize(() => {
      clearTimeout(timeout);
         timeout = setTimeout(() => checkWarningScreen(videos), 100)
     });
    
    $('.video-slider').on('init', () => {
        const videos = $('.video-slider__item__video');
        [...videos].forEach((video, index) => {
            if (index !== 1) {
                video.pause();
                video.currentTime = '0';
            } else {
                $(video).on('loadedmetadata', () => {
                    changeSlide(video.duration * 1000);
                })
            }
        })

        if(videos) {
            checkWarningScreen(videos)
            
            [...videos].forEach(el => {
                $(el).on( "loadedmetadata", () => {
                    checkWarningScreen(videos)
                });
            });
        }
    });

    $(".video-slider").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
        verticalSwiping: true,
        zIndex: 0,
        dots: true,
        appendDots: '#vido-slider__dots',
        vertical: true,
        dotsClass: 'video-slider__dots-list',
    });
    
    $('.video-slider').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        const videos = $('.video-slider__item__video');
        videos[currentSlide + 1].pause();
        videos[currentSlide + 1].currentTime = '0';
        videos[nextSlide + 1].play();
        clearTimeout(timeouts[timeouts.length - 1])
        changeSlide(videos[nextSlide + 1].duration * 1000);
    });
})
