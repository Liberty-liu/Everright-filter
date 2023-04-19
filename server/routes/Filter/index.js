import express from 'express'
import options from './options.js'
import ruleconditions from './ruleconditions.js'
import props from './props.js'
const router = express.Router()
router.get('/options', options)
router.get('/ruleconditions', ruleconditions)
router.get('/props', props)
router.get('/propValues', ruleconditions)
export default router
