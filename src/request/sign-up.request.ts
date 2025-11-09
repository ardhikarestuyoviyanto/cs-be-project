import Joi from 'joi';
import verb from '../../locales/id/verb.json';
import { Company, Users } from '../types/model.types';

export const SignUpRequest = (req: any): any => {
    req = req.body;

    const request = {
        user: {
            name: req.user.name,
            email: req.user.email,
            password: req.user.password,
        },
        company: {
            name: req.company.name,
            phoneNumber: req.company.phoneNumber,
            address: req.company.address,
            email: req.company.email,
        },
    };

    const userSchema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': verb.nameRequired,
        }),
        email: Joi.string().email().required().messages({
            'string.email': verb.emailInvalid,
            'any.required': verb.emailRequired,
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': verb.passwordMin,
            'any.required': verb.passwordRequired,
        }),
    });

    const companySchema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': verb.companyRequired,
        }),
        phoneNumber: Joi.string().min(6).required().messages({
            'string.min': verb.phoneInvalid,
            'any.required': verb.phoneRequired,
        }),
        address: Joi.string().allow(null, ''),
        email: Joi.string().email().allow(null, '').messages({
            'string.email': verb.emailInvalid,
        }),
    });

    const userValidation = userSchema.validate(request.user, {
        abortEarly: false,
    });
    const companyValidation = companySchema.validate(request.company, {
        abortEarly: false,
    });

    const allErrors = [
        ...(userValidation.error?.details.map((e) => ({
            ...e,
            contextType: 'user',
        })) || []),
        ...(companyValidation.error?.details.map((e) => ({
            ...e,
            contextType: 'company',
        })) || []),
    ];

    if (allErrors.length > 0) {
        const formattedErrors: Record<string, string[]> = {};

        allErrors.forEach((err) => {
            const field = `${err.contextType}.${err.path.join('.')}`;
            if (!formattedErrors[field]) {
                formattedErrors[field] = [];
            }
            formattedErrors[field].push(err.message);
        });

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const user: Users = {
        id: null,
        name: userValidation.value.name,
        email: userValidation.value.email,
        password: userValidation.value.password,
        isActive: 'yes',
        isAdmin: 'yes',
    };

    const company: Company = {
        id: null,
        name: companyValidation.value.name,
        address: companyValidation.value.address,
        email: companyValidation.value.email,
        phoneNumber: companyValidation.value.phoneNumber,
    };

    return {
        success: true,
        data: {
            user: user,
            company: company,
        },
    };
};
