import Page from 'classes/page.js'

import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

// import Button from '../../classes/Button.js'

export default class Order extends Page {
    constructor () {
        super({
            id: 'order',
            element: '.order',
            elements: {
                previewBox: '.order_preview_box',
                prevButton: '.order_prev',
                nextButton: '.order_next',
                totalPriceSpan: '.order_subtotal_price'
            }
        })

        GSAP.registerPlugin(ScrollTrigger)
    }

    show () {
        super.show()

        this.initPage()
    }

    initPage () {
        this.inputs = GSAP.utils.toArray('.order_type_choice_input')
        this.navs = GSAP.utils.toArray('.order_nav_link')
        this.sections = GSAP.utils.toArray('.order_section')
        this.totalPrice = 0
        const previewImage = this.elements.previewBox.querySelector('img')

        this.currentSection = 1

        const tl = GSAP.timeline()

        this.changeSection(this.currentSection)

        this.navs.forEach((nav, i) => {
            nav.addEventListener('click', () => {
                this.currentSection = i + 1

                this.changeSection(this.currentSection)
            })
        })

        this.inputs.forEach(input => {
            input.addEventListener('change', e => {
                e.preventDefault()

                if (this.lastChanged) {
                    if (this.lastChanged === e.target) return
                }

                // const lastChangedSection = this.lastChanged ? this.lastChanged : null

                if (this.lastChanged) {
                    const lastChangedPrice = Number(this.lastChanged.getAttribute('data_price'))
                    const newPrice = Number(e.target.getAttribute('data_price'))
                    const totalPrice = Number(this.elements.totalPriceSpan.textContent)

                    console.log('lastChanged currentSection', this.lastChanged, this.sections[this.currentSection])
                    console.log('total old new', totalPrice, lastChangedPrice, newPrice)

                    if (this.sections[(this.currentSection - 1)].contains(this.lastChanged)) {
                        this.elements.totalPriceSpan.textContent = (totalPrice - lastChangedPrice) + newPrice
                        console.log('right')
                    } else {
                        this.elements.totalPriceSpan.textContent = totalPrice + newPrice
                    }
                } else {
                    const newPrice = Number(e.target.getAttribute('data_price'))
                    const totalPrice = Number(this.elements.totalPriceSpan.textContent)

                    this.elements.totalPriceSpan.textContent = totalPrice + newPrice
                }

                this.inputs.forEach(input => {
                    if (e.target !== input) {
                        input.checked = false
                    } else {
                        input.checked = true
                    }
                })

                tl.to(this.elements.previewBox, {
                    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                    duration: 0.8,
                    ease: 'power2.in',
                    onComplete: () => {
                        const parentElement = e.target.parentElement
                        previewImage.src = parentElement.querySelector('.home_choice_image').src
                    }
                })

                tl.to(this.elements.previewBox, {
                    clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
                    duration: 0.5,
                    ease: 'power2.out'
                })

                this.lastChanged = e.target
            })
        })

        this.elements.nextButton.addEventListener('click', () => {
            if (this.currentSection === this.sections.length) {
                this.currentSection = 1
            } else {
                this.currentSection++
            }

            this.changeSection(this.currentSection)
        })

        this.elements.prevButton.addEventListener('click', () => {
            if (this.currentSection === 1) {
                this.currentSection = this.sections.length
            } else {
                this.currentSection--
            }

            this.changeSection(this.currentSection)
        })
    }

    changeSection (index) {
        this.navs.forEach((nav, i) => {
            if ((i + 1) === index) {
                nav.style.borderBottom = 'solid 0.5px #fff'
            } else {
                nav.style.borderBottom = 'solid 0.5px #545252'
            }
        })

        this.sections.forEach((section, i) => {
            if ((i + 1) === index) {
                GSAP.to(section, {
                    autoAlpha: 1,
                    delay: 0.5
                })
            } else {
                GSAP.to(section, {
                    autoAlpha: 0
                })
            }

            if ((i + 1) === index) {
                const firstInput = section.querySelector('.order_type_choice_input')
                const newEvent = new Event('change')

                setTimeout(() => {
                    firstInput.checked = true
                    firstInput.dispatchEvent(newEvent)
                }, 0)
            }
        })
    }
}
