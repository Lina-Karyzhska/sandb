$(function() {
    $("#about").on("click", () => {
        $(".navigation-about").toggleClass("_active");
        $(".video-slider").toggleClass("_blur");
    })
})