import EventEmitter from 'events'

import { each } from 'lodash'
// import GSAP from 'gsap'

export default class Component extends EventEmitter {
    constructor ({
        element,
        elements
    }) {
        super()

        this.selector = element
        this.selectorChildren = {
            ...elements
        }

        this.create()

        // this.addEventListeners()
    }

    create () {
        this.element = null
        this.elements = {}

        if (this.selector instanceof window.HTMLElement || this.selector instanceof window.SVGElement) {
            this.element = this.selector
        } else {
            // console.log('***selector***', this.selector)
            // console.log('***selector type***', this.selector)
            this.element = document.querySelector(this.selector)
        }

        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.elements[key] = entry
            } else {
                this.elements[key] = document.querySelectorAll(entry)

                // console.log('this.elements', this.elements)

                if (this.elements[key].length === 0) {
                    this.elements[key] = null
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(entry)
                }
                // if (this.element) {
                //     console.log('true')
                // }
            }
        })
    }

    addEventListeners () {
        return null
    }

    removeEventListeners () {
        return null
    }
}
