export default class Animation {
    constructor ({ element }) {
        this.element = element

        this.createObserver()

        this.animateOut()
    }

    createObserver () {
        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // console.log('animateIn')
                    this.animateIn()
                } else {
                    // console.log('animateOut')
                    this.animateOut()
                }
            })
        })

        this.observer.observe(this.element)
        // console.log(this.observer)
    }

    animateIn () {}

    animateOut () {}
}
