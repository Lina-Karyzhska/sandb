$(function() {
    $('.video-slider').on('init', (event, slick, currentSlide, nextSlide) => {
        const videos = $('.video-slider__item__video');
        [...videos].forEach((video, index) => {
            if (index !== 0) {
                video.pause();
                video.currentTime = '0';
            }
    })});

    $(".video-slider").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        verticalSwiping: true,
        zIndex: 0,
        dots: true,
        appendDots: '#vido-slider__dots',
        dotsClass: 'video-slider__dots-list',
    });
    
    $('.video-slider').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        const videos = $('.video-slider__item__video');
        setTimeout(() => {
            videos[currentSlide].pause();
        videos[currentSlide].currentTime = '0';
        }, 300)
        videos[nextSlide].play();
    });
})