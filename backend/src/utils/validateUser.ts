import Joi from "joi";

export interface RegisterUser {
  email: string;
  name: string;
  // surname: string;
  password: string;
  // repeat_password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

const registerUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  name: Joi.string().max(50).required(),
  // surname: Joi.string().max(50).required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/)
    .required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().max(50).required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/)
    .required(),
});

export const validateUserRegister = (registerUserData: RegisterUser) => {
  const { email, name, password /*, repeat_password*/ } = registerUserData;
  const { error, value } = registerUserSchema.validate({
    email: email,
    name: name,
    //surname: surname,
    password: password,
    //repeat_password: repeat_password,
  });
  return { error, value };
};

export const validateUserLogin = (loginUserData: LoginUser) => {
  const { email, password } = loginUserData;
  const { error, value } = loginUserSchema.validate({
    email: email,
    password: password,
  });
  return { error, value };
};
