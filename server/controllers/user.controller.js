import User from '../mongodb/models/user.js'
import { isValidObjectId } from 'mongoose';

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({}).limit(req.query._end);

        res.status(200).send(users)
        
    } catch (error) {
        res.status(500).send({message: "Could not fetch users"})
        
    }

}

const createUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;
    
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(200).send({ userExist });
        }

        const newUser = await User.create({
            name, email, avatar
        })

        res.status(200).send({ newUser })
    } catch (error) {
        return res.status(500).send({ error: "could not create user" })
    }
    
};

const getUserInfoByID = async (req, res) => {

    try {
        const { id } = req.params;

        const valid = isValidObjectId(id);

        let user = [];

        if (valid) {
             user = await User.findById({ _id: id }).populate('allProperties');
        } else {
             user = await User.findOne({ email: id }).populate('allProperties');
        }

        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ message: "User not found" });
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    
};

export {
    getAllUsers, createUser, getUserInfoByID
}