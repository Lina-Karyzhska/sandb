$(function() {
    $("#about").on("click", () => {
        const about = $(".navigation-about");
        if (about.hasClass("_active")) {
            $(".video-slider").removeClass("_blur");
            about.removeClass("navigation-about_opacity")
            const isForYou = $(".navigation-footer_with-bg").hasClass("for-you__navigation-footer");
            if (isForYou) {
                $(".navigation-footer_with-bg").addClass("navigation-footer_with-bg_bg");
            }
            setTimeout(() => {
                if (!isForYou) {
                    $(".navigation-footer_with-bg").addClass("navigation-footer_with-bg_bg");
                }
                about.removeClass("_active");
            }, 300)
        } else {
            about.addClass("_active navigation-about_opacity");
            $(".video-slider").addClass("_blur");
            $(".navigation-footer_with-bg").removeClass("navigation-footer_with-bg_bg");

        }
    })
})