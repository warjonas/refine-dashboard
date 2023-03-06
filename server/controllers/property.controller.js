import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose, { isValidObjectId } from 'mongoose';

import Property from '../mongodb/models/property.js'
import User from '../mongodb/models/user.js'


dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getAllProperties = async (req, res) => {

    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        propertyType = ""
    } = req.query
    
    const query = {};

    if (propertyType !== "") {
        query.propertyType = propertyType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: 'i' }
    }

    try {
        const count = await Property.countDocuments({ query });

        const properties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order});

        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count')

        res.status(200).send(properties)
        
    } catch (error) {
        //res.status(500).send({ message: "Could not fetch properties" });
        console.log({error: error.message})
        res.status(500).send({ error: error.messsage });
        
    }
    
}

const getPropertyDetail = async (req, res) => {
    const { id } = req.params;
    const propertyExists = await Property.findOne({ _id: id }).populate('creator');

    if (propertyExists) {
        res.status(200).send(propertyExists)
    } else {
        res.status(404).send({ message: "Property not found" });
    }
    


}

const createProperty = async (req, res) => {

    try {
        const { title, description, propertyType, location, price, photo, email } = req.body;

        //Start a new session ....
        const session = await mongoose.startSession();

        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error('User not found');

        const photoUrl = await cloudinary.uploader.upload(photo);
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        });

        user.allProperties.push(newProperty._id);

        await user.save({ session });
        await session.commitTransaction();

        res.status(200).send({ message: "Property created successfully" });

    } catch (error) {
        res.status(500).send({ message: "Could not create property" });
    }

    
}

const updateProperty = async (req, res) => {

    try {
        const { id } = req.params;

        const { title, description, propertyType, location, price, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({
            title,
            description,
            propertyType,
            location,
            photo: photoUrl || photo,
            price

            
        })

        res.status(200).send({message: "Property updated!"})
        
    } catch (error) {
        res.status(500).send({message: "Error updating property!"})
        
    }

}

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const valid = isValidObjectId(id);
        console.log({ valid });
        


        const propertyToDelete = await Property.findById({ _id: id }).populate('creator');

        if (!propertyToDelete) throw new Error('Property not found');

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.deleteOne({ session });
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).send({ message:'Property deleted successfully'})

    } catch (error) {
        res.status(500).send({message: "Could not delete property"})
        // res.status(500).send({message: error.message})

    }

}

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty
}