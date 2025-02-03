import Page from 'classes/page.js'

import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

// import Button from '../../classes/Button.js'

export default class Home extends Page {
    constructor () {
        super({
            id: 'home',
            element: '.home',
            elements: {
                menuButton: '.home_menu',
                dropDown: '.home_dropdown'
            }
        })

        GSAP.registerPlugin(ScrollTrigger)

        this.dropDownState = false
    }

    show () {
        super.show()
        this.newEventListeners()
        // this.loadEffects()
    }

    loadEffects () {

    }

    onClickMenu (e) {
        if (this.dropDownState === false) {
            // console.log('opendropdown')
            this.dropDownState = true
            GSAP.to(this.elements.dropDown, {
                height: '100vh',
                ease: 'power2.out',
                duration: 1
            })
        } else {
            // console.log('closedropdown')
            this.dropDownState = false
            GSAP.to(this.elements.dropDown, {
                height: 0,
                ease: 'power2.out',
                duration: 1
            })
        }
    }

    newEventListeners () {
        // console.log('elementa', this.elements)
        this.elements.menuButton.addEventListener('click', this.onClickMenu.bind(this))
        this.elements.dropDown.addEventListener('click', this.onClickMenu.bind(this))
    }

    destroy () {
        super.destroy()
        // this.link.removeEventListeners()
    }
}
