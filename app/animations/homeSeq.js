import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import Component from '../classes/Component.js'

// import { split } from '../utils/text.js'

import GSAP from 'gsap'
// import { map } from 'lodash'

export default class HomeSeq extends Component {
    constructor () {
        super({
            element: '.home',
            elements: {
                heroText: '.home_hero_text',
                heroSection: '.home_hero',
                heroImage: '.home_hero_media',
                horizontalSection: '.home_horizontal',
                horizontalPinner: '.home_horizontal_pinner',
                horizontalWrapper: '.home_horizontal_wrapper'
            }
        })

        GSAP.registerPlugin(ScrollTrigger)

        this.heroAnimation()
        this.expandImage()
        this.horizontalSlide()
    }

    heroAnimation () {
        const tl = GSAP.timeline({
            scrollTrigger: {
                trigger: this.elements.heroSection,
                start: 'top+=10px top',
                end: 'bottom',
                scrub: 1,
                duration: 4,
                toggleActions: 'play reset none reset'
                // markers: true
            },
            ease: 'none'
        })

        GSAP.from(this.elements.heroImage, {
            y: 100,
            // opacity: 0.6,
            duration: 1.5,
            ease: 'expo'
        })

        tl.to(this.elements.heroText, {
            y: -100,
            duration: 4
        })

        // tl.to(this.elements.heroImage, {
        //     y: 100,
        //     duration: 3
        // })
    }

    expandImage () {
        const section = document.querySelector('.home_third')
        const media = section.querySelector('.home_third_media')
        const triangle = section.querySelector('.triangle_up')

        const tl = GSAP.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=50px',
                end: 'bottom bottom'
                // markers: true
            },
            ease: 'none'
        })

        tl.from(media, {
            width: 0,
            height: 0,
            duration: 1.5,
            ease: 'expo'
        }, 0)

        tl.from(triangle, {
            top: '85%',
            left: '85%',
            duration: 1.5,
            ease: 'expo'
        }, 0)
    }

    horizontalSlide () {
        const sliderWidth = this.elements.horizontalWrapper.offsetWidth
        const slides = GSAP.utils.toArray('.home_horizontal_section')
        const xWidth = window.innerWidth

        const titles = GSAP.utils.toArray('.home_horizontal_title')

        this.elements.horizontalSection.style.height = `${sliderWidth}px`

        // console.log('sliderWidth', sliderWidth)

        GSAP.to(slides, {
            scrollTrigger: {
                trigger: this.elements.horizontalPinner,
                pin: true,
                start: 'top',
                end: `+=${sliderWidth} bottom`,
                scrub: 1
                // markers: true
            },
            x: -sliderWidth + xWidth,
            ease: 'none'
        })

        GSAP.to(titles, {
            scrollTrigger: {
                trigger: this.elements.horizontalSection,
                start: 'top',
                end: `+=${sliderWidth} bottom`,
                scrub: 1
                // markers: true
            },
            x: '-20rem',
            ease: 'none'
        })
    }

    onResize () {}
}
