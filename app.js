// import { client } from './config/prismicConfig.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
// import * as prismicH from '@prismicio/helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define "require"
const require = createRequire(import.meta.url)

require('dotenv').config()

const express = require('express')
// const prismic = require('@prismicio/client')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('morgan')
const UAParser = require('ua-parser-js')

const app = express()
const port = 5000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const linkResolver = doc => {
    // console.log(doc)
    if (doc.type === 'product') {
        return `detail/${doc.uid}`
    }

    if (doc.type === 'collections') {
        return '/collections'
    }

    if (doc.type === 'about') {
        return '/about'
    }

    return '/'
}

app.use((req, res, next) => {
    const ua = UAParser(req.headers['user-agent'])

    res.locals.isDesktop = ua.device.type === undefined
    res.locals.isTablet = ua.device.type === 'tablet'
    res.locals.isPhone = ua.device.type === 'mobile'

    // console.log(res.locals.isDesktop, res.locals.isTablet, res.locals.isPhone)

    // res.locals.ctx = {
    //     prismic
    // }

    // res.locals.prismicH = prismicH
    next()
})

const handleDefaults = async (client) => {
    // const meta = await client.getSingle('meta')
    // const preloader = await client.getSingle('preloader')

    const meta = {
        data: {
            title: 'Temp',
            description: 'web portfolio for Odigbo Kelechi Paul',
            image: {
                url: ''
            }
        }
    }

    // Foo

    // const assets = []
    // return {}


    return {
        meta
    }
}

app.get('/', async (req, res) => {
    const defaults = await handleDefaults()

    res.render('pages/home', {
        ...defaults
    })
})

app.get('/order', async (req, res) => {
    const defaults = await handleDefaults()

    res.render('pages/order', {
        ...defaults
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
