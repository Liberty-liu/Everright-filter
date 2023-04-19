import express from 'express'
import ListFilter from '../controllers/ListFilter.js'
const router = express.Router()
router.get('/options', ListFilter.getOptions)
router.get('/ruleconditions', ListFilter.getRuleconditions)
export default router
