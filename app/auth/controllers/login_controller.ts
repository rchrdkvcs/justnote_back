import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  public async execute({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.json({
      message: 'User logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    })
  }
}
