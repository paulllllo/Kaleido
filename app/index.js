import { each } from 'lodash'

import Home from 'pages/Home/index.js'
import Order from 'pages/Order/index.js'

// import Preloader from 'components/Preloader.js'
// import Navigation from './components/Navigation.js'
import Normalize from 'normalize-wheel'

class App {
    constructor () {
        this.createContent()

        // this.createNavigation()

        // this.createCanvas()

        // this.createPreloader()

        this.createPages()

        this.addLinkListeners()
        this.addEventListeners()

        this.update()
    }

    // createNavigation () {
    //     this.navigation = new Navigation({ template: this.template })
    // }

    // createPreloader () {
    //     this.preloader = new Preloader({ canvas: this.canvas })
    //     // this.preloader.once('completed', this.onPreloaded.bind(this))
    // }

    // createCanvas () {
    //     this.canvas = new Canvas({ template: this.template })
    // }

    createContent () {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    createPages () {
        this.pages = {
            home: new Home(),
            order: new Order()
        }

        this.page = this.pages[this.template]
        this.page.create({
            pageChangeHandler: this.onPageChange.bind(this)
        })
        this.page.show()
        // this.page.load()
        // this.onResize()
    }

    // Events

    // onPreloaded () {
    //     // this.canvas.onPreloaded()
    //     this.preloader.destroy()
    //     // console.log('this.page', this.page)
    //     this.onResize()
    //     this.page.show()
    // }

    onPopstate () {
        this.onPageChange({
            url: window.location.pathname,
            push: false
        })
    }

    async onPageChange ({ url, push = true }) {
        // console.log(this)
        await this.page.hide()

        const response = await window.fetch(url)

        if (response.status === 200) {
            const html = await response.text()
            const div = document.createElement('div')

            if (push) {
                window.history.pushState({}, '', url)
            }

            div.innerHTML = html

            const divContent = div.querySelector('.content')
            this.template = divContent.getAttribute('data-template')

            this.content.setAttribute('data-template', this.template)
            this.content.innerHTML = divContent.innerHTML

            // this.navigation.onChange(this.template)

            this.page = this.pages[this.template]
            this.page.create({
                pageChangeHandler: this.onPageChange.bind(this)
            })
            this.onResize()
            this.page.show()

            this.addLinkListeners()
        } else {
            console.log('Error')
        }
    }

    onResize () {
        // window.requestAnimationFrame(_ => {
        //     if (this.canvas && this.canvas.onResize) {
        //         this.canvas.onResize()
        //     }
        // })

        if (this.page && this.page.onResize) {
            this.page.onResize()
        }
    }

    onWheel (event) {
        const normalizedWheel = Normalize(event)

        // if (this.canvas && this.canvas.onWheel) {
        //     this.canvas.onWheel(normalizedWheel)
        // }

        if (this.page && this.page.onWheel) {
            this.page.onWheel(normalizedWheel)
        }
    }

    // Loop

    update () {
        if (this.page && this.page.updateScroll) {
            this.page.updateScroll()
        }

        // if (this.canvas && this.canvas.update) {
        //     this.canvas.update(this.page.scroll)
        // }

        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    // Listeners

    addEventListeners () {
        window.addEventListener('wheel', this.onWheel.bind(this))

        window.addEventListener('popstate', this.onPopstate.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }

    addLinkListeners () {
        const links = document.querySelectorAll('a')
        // console.log(links)

        each(links, link => {
            // console.log(link)
            link.onclick = event => {
                event.preventDefault()
                const { href } = link

                this.onPageChange({ url: href })
            }
        })
    }
}

export const app = new App()
