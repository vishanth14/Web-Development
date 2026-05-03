import express from 'express'
import { getPortfolio } from '../controllers/portfolioController.js'
import { getTestimonials } from '../controllers/testimonialController.js'
import { getFAQs } from '../controllers/faqController.js'

const router = express.Router()

router.get('/portfolio', getPortfolio)
router.get('/testimonials', getTestimonials)
router.get('/faq', getFAQs)

export default router