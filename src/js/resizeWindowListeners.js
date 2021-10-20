const setVideoSize = (video) => {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const k = windowHeight / windowWidth;

    if (k > 1.8) {
        video.css("height", `${windowHeight}px`);
        video.css("width", `auto`)
    } else {
        video.css("width", `${windowWidth}px`); 
        video.css("height", `auto`);
    }
}

const checkWarningScreen = (video) => {
    if ($(window).width() < 740) {
        setVideoSize(video);
        $(".use-phones").removeClass("use-phones__visible");
        $(".for-you").css("display", "block");
    } else {
        $(".use-phones").addClass("use-phones__visible");
        $(".for-you").css("display", "none");
    }
}

$(function() {
    const video = $(".video-slider__item__video");

    if(video) {
        checkWarningScreen(video)

        let timeout;
        $(window).resize(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => checkWarningScreen(video), 100)
        });
        
        [...video].forEach(el => {
            $(el).on( "loadedmetadata", () => {
                checkWarningScreen(video)
            });
        });
    }
})