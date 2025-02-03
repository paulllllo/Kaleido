import GSAP from 'gsap'

import Component from '../classes/Component.js'
import { COLOR_QUARTER_SPANISH_WHITE, COLOR_BRIGHT_GREY } from '../classes/Colors.js'

export default class Navigation extends Component {
    constructor ({ template }) {
        super({
            element: '.navigation',
            elements: {
                items: '',
                links: ''
            }
        })

        this.onChange(template)
    }

    onChange (template) {
        // console.log('template', template)
        if (template === 'about') {
            GSAP.to(this.element, {
                color: null,
                duration: 1.5
            })

            GSAP.to(this.elements.items[0], {
                autoAlpha: 1,
                duration: 0.75,
                delay: 0.75
            })

            GSAP.to(this.elements.items[1], {
                autoAlpha: 0,
                duration: 0.75
            })
        } else {
            GSAP.to(this.element, {
                color: null,
                duration: 1.5
            })

            GSAP.to(this.elements.items[0], {
                autoAlpha: 0,
                duration: 0.75
            })

            GSAP.to(this.elements.items[1], {
                autoAlpha: 1,
                duration: 0.75,
                delay: 0.75
            })
        }
    }
}
