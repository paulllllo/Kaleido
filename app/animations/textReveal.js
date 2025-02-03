import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import Component from '../classes/Component.js'

import { split } from '../utils/text.js'

import GSAP from 'gsap'
// import { map } from 'lodash'

export default class TextReveal extends Component {
    constructor ({ element }) {
        super({
            element
        })

        GSAP.registerPlugin(ScrollTrigger)

        split({ element: this.element, append: true })
        // split({ element: this.element, append: true })

        this.mainWords = this.element.querySelectorAll('span')
        // console.log('heroword', this.mainWords)

        // this.splitText()

        this.addEventListener()

        // this.createEffect()
    }

    splitText () {
        // if ()
        // const words = this.element.textContent.split(' ')
        // word.textContent = ''
        // letters.forEach(letter => {
        //     // let done = false
        //     const span = document.createElement('span')
        //     // span.classList.add('letter')
        //     span.textContent = letter
        //     word.append(span)
        // })
    }

    createEffect () {
        this.mainWords.forEach((word) => {
            // console.log('word', word)
            const letters = word.textContent.split('')
            word.textContent = ''
            letters.forEach(letter => {
                // let done = false
                const span = document.createElement('span')
                // span.classList.add('letter')
                span.textContent = letter
                word.append(span)
            })
        })

        this.tl = GSAP.timeline({
            scrollTrigger: {
                trigger: this.element,
                start: 'top bottom-=20%'
                // markers: true
            }
        })

        this.mainWords.forEach((word) => {
            const letters = word.querySelectorAll('span')

            this.tl.from(letters, {
                // autoAlpha: 0,
                y: 100,
                stagger: 0.04,
                duration: 0.4,
                delay: 0,
                ease: 'expo'
            }, '>-=0.5')

            this.tl.from(letters, {
                autoAlpha: 0,
                stagger: 0.04,
                duration: 0.6
            }, '<')
        })
    }

    addEventListener () {
        window.addEventListener('DOMContentLoaded', () => {
            this.createEffect()
            // console.log('loaded dom')
        })
    }

    onResize () {}
}
