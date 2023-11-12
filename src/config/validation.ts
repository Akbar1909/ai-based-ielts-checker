import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  ACCESS_TOKEN_SECRET: Joi.string(),
  JWT_ACCESS_TIME: Joi.string(),
  JWT_REFRESH_TIME: Joi.string(),
  PORT: Joi.number().default(3001),
  UPLOADED_FILES_DESTINATION: Joi.string().required(),
});
