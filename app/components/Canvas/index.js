import { Camera, Renderer, Transform } from 'ogl'
import Home from './Home/index.js'
import About from './About/index.js'
import Collections from './Collections/index.js'
import Transition from './transition.js'
import Detail from './Detail/index.js'

// import GSAP from 'gsap'

export default class Canvas {
    constructor ({ template }) {
        this.template = template

        this.createRenderer()
        this.createCamera()
        this.createScene()

        this.onResize()

        // this.onPageChangeEnd(this.template)
        // this.createHome()

        this.x = {
            start: 0,
            distance: 0,
            end: 0
        }

        this.y = {
            start: 0,
            distance: 0,
            end: 0
        }
    }

    createRenderer () {
        this.renderer = new Renderer({
            alpha: true,
            antiAliasing: true
        })

        this.gl = this.renderer.gl

        document.body.appendChild(this.gl.canvas)
    }

    createCamera () {
        this.camera = new Camera(this.gl)
        this.camera.position.z = 5
    }

    createScene () {
        this.scene = new Transform()
    }

    //      Home

    createHome () {
        this.home = new Home({
            gl: this.gl,
            scene: this.scene,
            sizes: this.sizes
        })
        // console.log('create home!')
    }

    destroyHome () {
        if (!this.home) return

        this.home.destroy()
        this.home = null
    }

    //          Events

    onPreloaded () {
        this.onPageChangeEnd(this.template)
    }

    onPageChangeStart (template, url) {
        console.log("page change start")
    }

    onPageChangeEnd (template) {
        if (template === 'home') {
            this.createHome()
        } else if (this.home) {
            this.destroyHome()
        }
    }

    onResize () {
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera.perspective({
            aspect: window.innerWidth / window.innerHeight
        })

        const fov = this.camera.fov * (Math.PI / 180)
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z
        const width = height * this.camera.aspect

        // const fov = this.camera.fov * (Math.PI / 100)
        // const height = 2 * Math.tan(fov / 2) * this.camera.position.z
        // const width = height * this.camera.aspect

        this.sizes = {
            height,
            width
        }

        if (this.home) {
            this.home.onResize(values)
        }
    }

    onWheel (event) {
        if (this.home) {
            this.home.onWheel(event)
        }
    }

    update (scroll) {
        if (this.home) {
            this.home.update()
        }

        this.renderer.render({
            camera: this.camera,
            scene: this.scene
        })
    }
}
