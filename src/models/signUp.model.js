import joi from "joi";

export const signUpModel = joi.object({
  name: joi.string().min(3).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
    .required(),
  doc: joi
    .string()
    .pattern(
      new RegExp(
        "^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$|^[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2}$"
      )
    ).required,
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: joi.ref("password").required(),
});
