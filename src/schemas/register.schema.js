import z from 'zod'

const registerUser = z.object({
    email: z.string({
        invalid_type_error: 'El email tiene que ser un string.',
        required_error: 'No puede estar vacío el email.'
    }),
    contrasena: z.string({
        invalid_type_error: 'La contraseña tiene que ser un string.',
        required_error: 'No puede estar vacío la contraseña.'
    }).min(6, 'Se requiren más de 6 carácteres.')
})

export function validateUser(input) {
    return registerUser.safeParse(input)
}