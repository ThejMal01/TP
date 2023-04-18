import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please Provide Name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },

    email: {
        type: String, 
        required: [true, 'Please Provide Email'],
        validate:{
            validator: validator.isEmail,
            message: 'Please Provide a Valid Email'
        },
        unique: true,
    },

    password: {
        type: String, 
        required: [true, 'Please Provide Password'],
        minlength: 6,
        select: false,
    },

    lastName: {
        type: String, 
        trim: true,
        // required: true,
        maxlength: 20,
        default: 'lastName',
    },

    location: {
        type: String, 
        trim: true,
        // required: true,
        maxlength: 50,
        default: 'my city',
    },

    /*
    receivedDate: {
        type: String, 
        // required: true,
        maxlength: 10,
        default: 'xx/xx/xxxx',
    },

    dispatchDate: {
        type: String, 
        // required: true,
        maxlength: 10,
        default: 'xx/xx/xxxx',
    },

    contactNumber: {
        type: String,
        // required: true,
        maxlength: 10,
        default: 'xxxxxxxxxx',
    },

    repairCharge: {
        type: String,
        // required: true,
        maxlength: 7,
        default: 'xxx',
    },

    deliveryCharge: {
        type: String,
        // required: true,
        maxlength: 7,
        default: 'xxx',
    },

    repairId: {
        type: String,
        // required: true,
        maxlength: 6,
        default: 'xxxxxx',
    }
    */
})

UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id}, 
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
            //expiresIn: '100',
        }
    )
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)