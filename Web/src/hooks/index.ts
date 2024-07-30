export function ModifyTransition(ModifyPageTransition: (value: number) => void) {
    ModifyPageTransition(50)
}

export function CompleteTransition(ModifyPageTransition: (value: number) => void) {
    ModifyPageTransition(100)
    ScrollToTop()
    setTimeout(() => {
        ModifyPageTransition(0)
    }, 500);
}

function ScrollToTop() {
    window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0
    })
}