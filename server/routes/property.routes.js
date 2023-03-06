import express from 'express';
import { createProperty, deleteProperty, getAllProperties, getPropertyDetail, updateProperty } from '../controllers/property.controller.js';

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/').post(createProperty);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);
router.route('/:id').get(getPropertyDetail);


export default router;

