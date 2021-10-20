const timeouts = [];

const changeSlide = (timeout) => {
    timeouts.push(setTimeout(() => {
        $('.video-slider').slick("slickNext");
    }, timeout))
}

$(function() {
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
        console.log(currentSlide, nextSlide, videos[nextSlide + 1].duration);
        videos[currentSlide + 1].pause();
        videos[currentSlide + 1].currentTime = '0';
        videos[nextSlide + 1].play();
        clearTimeout(timeouts[timeouts.length - 1])
        changeSlide(videos[nextSlide + 1].duration * 1000);
    });
})