import profileSchema from '../model/profile.js'
import Joi from 'joi'

const createProfile = async (req, res) => {
    try {

        const userValidationSchema = Joi.object({

            name: Joi.string()
                .min(3)
                .max(100)
                .messages({
                    'string.empty': 'Name is required',
                    'string.min': 'Name must be at least 3 characters long',
                    'string.max': 'Name must be less than 100 characters',
                }),

            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .messages({
                    'string.empty': 'Username is required',
                    'string.min': 'Username must be at least 3 characters long',
                    'string.max': 'Username must be less than 30 characters',
                    'string.alphanum': 'Username can only contain letters and numbers',
                }),

            pronouns: Joi.string()
                .valid('he/him', 'she/her', 'they/them', 'other')
                .default('they/them')
                .messages({
                    'any.only': 'Pronouns must be one of "he/him", "she/her", "they/them", or "other"',
                }),

            links: Joi.object()
                .pattern(
                    Joi.string()
                        .uri()
                        .messages({
                            'string.uri': 'Invalid URL format',
                        })
                )
                .messages({
                    'object.base': 'Links are required',
                }),

            gender: Joi.string()
                .valid('male', 'female', 'non-binary', 'prefer not to say', 'other').required()
                .messages({
                    'any.only': 'Gender must be one of "male", "female", "non-binary", "prefer not to say", or "other"',
                }),
        });

        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(200).json({
                status: false,
                error: error.details.map((err) => err.message)
            })
        }


        const checkValid = await profileSchema.findOne({ username: req.body.username })
        if (checkValid) {
            return res.status(200).json({
                status: false,
                error: 'This username Already exists'
            })
        }

        const data = await profileSchema.create(req.body)
        data.profilePic = req.file.originalname
        data.save()
        return res.status(200).json({
            status: true,
            data: data
        })
    } catch (err) {
        // const {massage} = err
        console.log(err)

    }

}

const updateDetails = async (req, res) => {
    try {

        const userValidationSchema = Joi.object({

            name: Joi.string()
                .min(3)
                .max(100)
                .required()
                .messages({
                    'string.empty': 'Name is required',
                    'string.min': 'Name must be at least 3 characters long',
                    'string.max': 'Name must be less than 100 characters',
                }),

            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .messages({
                    'string.empty': 'Username is required',
                    'string.min': 'Username must be at least 3 characters long',
                    'string.max': 'Username must be less than 30 characters',
                    'string.alphanum': 'Username can only contain letters and numbers',
                }),

            pronouns: Joi.string()
                .valid('he/him', 'she/her', 'they/them', 'other')
                .default('they/them')
                .messages({
                    'any.only': 'Pronouns must be one of "he/him", "she/her", "they/them", or "other"',
                }),

            links: Joi.object()
                .pattern(
                    Joi.string(),
                    Joi.string()
                        .uri()
                        .messages({
                            'string.uri': 'Invalid URL format',
                        })
                )
                .messages({
                    'object.base': 'Links are required',
                }),

            gender: Joi.string()
                .valid('male', 'female', 'non-binary', 'prefer not to say', 'other')
                .messages({
                    'any.only': 'Gender must be one of "male", "female", "non-binary", "prefer not to say", or "other"',
                }),
        });

        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(200).json({
                status: false,
                error: error.details.map((err) => err.message)
            })
        }


        const checkValid = await profileSchema.findOne({ username: req.body.username })
        if (checkValid) {
            return res.status(200).json({
                status: false,
                error: 'This username Already exists'
            })
        }

        const data = await profileSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        data.updateAt = Date.now()
        data.save
        return res.status(200).json({
            status: true,
            data: data
        })
    } catch (err) {
        // const {massage} = err
        console.log(err)

    }
}

const link = async (req, res) => {
    try {
        const userValidationSchema = Joi.object({

            name: Joi.string()
                .min(3)
                .max(100)
                .required()
                .messages({
                    'string.empty': 'Name is required',
                    'string.min': 'Name must be at least 3 characters long',
                    'string.max': 'Name must be less than 100 characters',
                }),
            links: Joi.object()
                .pattern(
                    Joi.string().required()
                        .uri()
                        .messages({
                            'string.uri': 'Invalid URL format',
                        })
                )
                .messages({
                    'object.base': 'Links are required',
                }),
        });

        const { error } = userValidationSchema.validate(req.body);
        
        if (error) {
            return res.status(200).json({
                status: false,
                error: error.details.map((err) => err.message)
            })
        }

    } catch (err) {
        return res.status(200).json({
            status: false,
            error: err
        })
    }
}

export default {
    createProfile, updateDetails, link
}