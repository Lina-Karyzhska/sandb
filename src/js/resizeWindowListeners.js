const setVideoSize = (video) => {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const k = windowHeight / windowWidth;

    console.log(k > 1.8);
    
    if (k > 1.8) {
        video.css("height", `${windowHeight}px`);
        video.css("width", `auto`)
    } else {
        video.css("width", `${windowWidth}px`); 
        video.css("height", `auto`);
    }
}

const checkWorningScreen = (video) => {
    if ($(window).width() < 768) {
        setVideoSize(video)
        $(".warning").removeClass("warning__visible");
    } else {
        $(".warning").addClass("warning__visible");
    }
}

$(function() {
    const video = $(".video-slider__item__video");

    if(video) {
        checkWorningScreen(video)

        let timeout;
        $(window).resize(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => checkWorningScreen(video), 100)
        });
        
        [...video].forEach(el => {
            $(el).on( "loadedmetadata", function(event){
                console.log( this.duration);
            });
        });
    }
})