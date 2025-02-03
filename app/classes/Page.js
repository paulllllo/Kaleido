import { each, map } from 'lodash'
import GSAP from 'gsap'
import Prefix from 'prefix'
import AsyncLoad from './AsyncLoad.js'

import Lenis from 'lenis'
import HomeSeq from '../animations/homeSeq.js'
import TextReveal from '../animations/textReveal.js'

export default class Page {
    constructor ({ id, element, elements }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
            waveWords: '[data-animation="waveWord"]',

            lazyLoaders: '[data-src]'
        }

        this.transformPrefix = Prefix('transform')
    }

    create (arg) {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        // console.log('id', this.id)
        // console.log('pageChangeHandler', arg)

        this.pageChangeHandler = arg.pageChangeHandler

        this.scroll = {
            target: 0,
            current: 0,
            last: 0,
            limit: 0
        }

        each(this.selectorChildren, (child, key) => {
            if (child instanceof window.HTMLElement || child instanceof window.NodeList || Array.isArray(child)) {
                this.elements[key] = child
            } else {
                this.elements[key] = document.querySelectorAll(child)

                // console.log('this.elements[key]', this.elements[key])

                if (this.elements[key].length === 0) {
                    this.elements[key] = null
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(child)
                }
                // if (this.element) {
                //     console.log('true')
                // }
            }
        })

        this.createAnimations()
        this.createAsyncLoad()

        window.addEventListener('DOMContentLoaded', () => {
            this.lenis = new Lenis({
                autoRaf: true
            })
        })

        /// Initialize Lenis
        // const lenis = new Lenis({
        //     autoRaf: true
        // })

        // Listen for the scroll event and log the event data
        // lenis.on('scroll', (e) => {
        //     console.log(e)
        // })
    }

    createAnimations () {
        this.animatedElements = []

        if (this.id === 'home') {
            this.homeSeq = new HomeSeq()

            this.animatedElements.push(this.homeSeq)
        }

        if (this.elements.waveWords) {
            this.waveWords = map(this.elements.waveWords, element => {
                // console.log('element in page anim', element)
                return new TextReveal({ element })
            })

            this.animatedElements.push(...this.waveWords)
        }
    }

    createAsyncLoad () {
        // if (!this.lazyLoaders) return
        // console.log('lazyloaders ** ', this.elements.lazyLoaders)
        if (this.elements.lazyLoaders?.[Symbol.iterator]) {
            this.lazyLoaders = [...this.elements.lazyLoaders].map(element => {
                // console.log('in map, About to start', element)
                return new AsyncLoad({
                    element
                })
            })
        } else if (this.elements.lazyLoaders instanceof window.HTMLElement) {
            this.lazyLoaders = []
            const newLoader = new AsyncLoad({ element: this.elements.lazyLoaders })
            this.lazyLoaders.push(newLoader)
        }
        // console.log('lazyloaders after map', this.lazyLoaders)
    }

    show (animation) {
        // console.log('show')
        return new Promise(resolve => {
            if (animation) {
                this.animationIn = animation
            } else {
                this.animationIn = GSAP.timeline()

                this.animationIn.fromTo(this.element, {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1
                })
            }

            this.animationIn.call(_ => {
                this.addEventListeners()
                resolve()
            })
        })
    }

    hide () {
        return new Promise(resolve => {
            this.destroy()
            this.animationOut = GSAP.timeline()

            this.animationOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve
            })
        })
    }

    // Events

    onWheel ({ pixelY }) {
        // const { deltaY } = event

        this.scroll.target += pixelY
    }

    onResize () {
        if (this.elements.wrapper) {
            this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
        }

        each(this.animatedElements, element => {
            element.onResize()
        })
    }

    // Loop

    updateScroll () {
        // console.log('updating scroll')
        this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)

        this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

        if (this.scroll.current < 0.1) {
            this.scroll.current = 0
        }

        if (this.elements.wrapper) {
            this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
        }
    }

    // Listeners

    addEventListeners () {
        // window.addEventListener('mousewheel', this.onMouseWheelEvent)
        // console.log('listener Added')
    }

    removeEventListeners () {
        // window.removeEventListener('mousewheel', this.onMouseWheelEvent)
    }

    // Destroy

    destroy () {
        this.removeEventListeners()
    }
}
