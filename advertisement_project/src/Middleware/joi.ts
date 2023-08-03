import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import User from '../model/User_model';

export class Validation {
  static async sinupValidate(req: Request, res: Response,next:NextFunction) {
    const UsersSchema = Joi.object({
        id:Joi.number(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      gender:Joi.string(),
      firstName:Joi.string(),
      lastName:Joi.string()
        .messages({
          'string.pattern.base': 'Password should be between 3 to 30 characters and contain only alphanumeric characters',
          'any.empty': 'Password cannot be an empty string',
          'any.required': 'Password is required',
        }),
      mobileno: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
    });

    const result = UsersSchema.validate(req.body);
    if(result)
    {
        next()
    }

    if (result.error) {
      
      return res.status(400).json({ error: result.error.details });
    }

}
}