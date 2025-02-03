import Component from './Component.js'

export default class AsyncLoad extends Component {
    constructor ({ element }) {
        super({ element })
        // console.log('***AsyncLoad***', element)

        this.createObserver()
        // console.log('inside constructor')
    }

    createObserver () {
        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                // console.log('entry in createObserver', entry)
                if (entry.isIntersecting) {
                    if (!this.element.src) {
                        this.element.src = this.element.getAttribute('data-src')
                        this.element.onload = _ => {
                            if (!this.element.hasAttribute('data-handler')) {
                                this.element.classList.add('loaded')
                            }
                        }
                    }
                }
            })
        })

        this.observer.observe(this.element)
    }
}
