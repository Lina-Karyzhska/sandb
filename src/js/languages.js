const toggleActive = (selector) => {
    $(`${selector} .languages__button`).toggleClass("languages__button-active");
        $(`${selector} .languages__list`).toggleClass("languages-active");
}

$(function() {
    $(".header .languages__button").on("click", () => {
        toggleActive(".header");
    })

    $(".main__languages .languages__button").on("click", () => {
        toggleActive(".main__languages");
    })

    $(".header-mobile .languages__button").on("click", () => {
        toggleActive(".header-mobile");
    })

    $(".navigation-about .languages__button").on("click", () => {
        toggleActive(".navigation-about");
    });

    $(".footer .languages__button").on("click", () => {
        toggleActive(".footer");
    });

    $("body").on("click", (e) => {
        if (typeof e.target.className !== "string" || !e.target.className.includes("languages__button")) {
             $(".languages__button").removeClass("languages__button-active")
            $(".languages__list").removeClass("languages-active")
        }
    })
})