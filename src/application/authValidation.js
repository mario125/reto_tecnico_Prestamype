
const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('El correo debe ser una dirección de correo válida'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
    .regex(/[@$!%*?&]/, 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)')
});

const loginSchema = z.object({
  email: z.string().email('El correo debe ser una dirección de correo válida'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

module.exports = { registerSchema, loginSchema };
