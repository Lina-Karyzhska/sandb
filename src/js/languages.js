$(function() {
    $(".header .languages__button").on("click", () => {
        $(".header  .languages__button").toggleClass("languages__button-active")
        $(".header .languages__list").toggleClass("languages-active")
    })

    $(".header-mobile .languages__button").on("click", () => {
        $(".header-mobile .languages__button").toggleClass("languages__button-active")
        $(".header-mobile .languages__list").toggleClass("languages-active")
    })

    $("body").on("click", (e) => {
        if (typeof e.target.className !== "string" || !e.target.className.includes("languages__button")) {
             $(".languages__button").removeClass("languages__button-active")
            $(".languages__list").removeClass("languages-active")
        }
    })

    $(".navigation-about .languages__button").on("click", () => {
        $(".navigation-about .languages__button").toggleClass("languages__button-active")
        $(".navigation-about .languages__list").toggleClass("languages-active")
    })
})