import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'

const register = async (req, res) =>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email is already in use')
    }

    const user = await User.create({name, email, password})

    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({
            user:{
                email: user.email, 
                name: user.name,
                lastName: user.lastName, 
                location: user.location, 
            }, 
            token, 
            location: user.location
        })
} 

const login = async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please Provide All Values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token, location:user.location})
}

const updateUser = async (req, res) =>{
    const {name, email, lastName, location} = req.body
    if(!name || !email || !lastName || !location){
        throw new BadRequestError('Please Provide All Values')
    }

    //grab user id that matches
    const user = await User.findOne({_id:req.user.userId})

    //values that update
    user.name = name
    user.email = email
    user.lastName = lastName
    user.location = location

    //save user
    await user.save()

    //create token
    const token = user.createJWT()

    //send response
    res.status(StatusCodes.OK).json({user, token, location:user.location})

}

export {register, login, updateUser}