import express from 'express'
const router = express.Router()

import {
    createDelivery, 
    getAllDelivery, 
    updateDelivery, 
    deleteDelivery, 
    showStats
} from '../controllers/DeliveryController.js'

router.route('/').post(createDelivery).get(getAllDelivery)
//remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteDelivery).patch(updateDelivery)

export default router