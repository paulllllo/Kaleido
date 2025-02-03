import { Plane, Transform } from 'ogl'
import Media from './Media.js'
import { map } from 'lodash'
import GSAP from 'gsap'

export default class Home {
    constructor ({ gl, scene, sizes }) {
        this.gl = gl
        this.scene = scene
        this.sizes = sizes

        this.group = new Transform()

        this.mediaElements = document.querySelectorAll('')

        this.x = {
            current: 0,
            target: 0,
            lerp: 0.1
        }

        this.y = {
            current: 0,
            target: 0,
            lerp: 0.1
        }

        this.scroll = {
            x: 0,
            y: 0
        }

        this.scrollCurrent = {
            x: 0,
            y: 0
        }

        this.createGeometry()
        this.createGallery()

        this.onResize({
            sizes: this.sizes
        })

        this.group.setParent(this.scene)

        this.show()
    }

    createGeometry () {
        this.geometry = new Plane(this.gl, {
            heightSegments: 20,
            widthSegments: 20
        })
    }

    createGallery () {
        this.medias = map(this.mediaElements, (element, index) => {
            return new Media({
                element,
                geometry: this.geometry,
                gl: this.gl,
                scene: this.group,
                sizes: this.sizes,
                index
            })
        })
    }

    //          Show
    show () {
        // this.group.setParent(this.scene)
        map(this.medias, (media) => {
            media.show()
        })
    }

    hide () {
        // this.group.setParent(null)
        map(this.medias, (media) => {
            media.hide()
        })
    }

    //                   Events

    onResize (event) {
        // console.log('Home onResize()')
        this.scroll = {
            x: 0,
            y: 0
        }

        this.scroll.x = this.x.target = 0
        this.scroll.y = this.y.target = 0
    }

    onWheel ({ pixelX, pixelY }) {
        this.x.target += pixelX
        this.y.target += pixelY
    }

    //          Loop
    update () {
        this.x.current = GSAP.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
        this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)
    }

    //          Destroy
    destroy () {
        this.scene.removeChild(this.group)
    }
}
