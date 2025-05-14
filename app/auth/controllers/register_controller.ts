import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'

export default class RegistersController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8),
      passwordConfirmation: vine.string().confirmed({ confirmationField: 'password' }),
    })
  )

  public async execute({ request, response }: HttpContext) {
    const data = await request.validateUsing(RegistersController.validator)

    const { passwordConfirmation, ...userData } = data

    const user = await User.create(userData)
    const token = await User.accessTokens.create(user)

    return response.json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    })
  }
}
