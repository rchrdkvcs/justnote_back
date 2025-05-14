import type { HttpContext } from '@adonisjs/core/http'
import User from '#users/models/user'

export default class OauthController {
  public async render({ params, ally }: HttpContext) {
    const { provider } = params

    const authorizationUrl = await ally.use(provider).getRedirectUrl()

    return {
      url: authorizationUrl,
    }
  }

  public async execute({ params, ally, response, request }: HttpContext) {
    const { provider } = params
    const redirectUrl = request.input('redirectUrl', 'http://localhost:4200')
    const social = ally.use(provider)

    if (social.accessDenied()) {
      return response.redirect(`${redirectUrl}?error=access_denied`)
    }

    if (social.stateMisMatch()) {
      return response.redirect(`${redirectUrl}?error=state_mismatch`)
    }

    if (social.hasError()) {
      return response.redirect(
        `${redirectUrl}?error=${encodeURIComponent(social.getError() || '')}`
      )
    }

    const connectingUser = await social.user()

    const user = await User.firstOrCreate(
      {
        email: connectingUser.email,
      },
      {
        userName: connectingUser.nickName,
        authProvider: provider,
        authProviderId: connectingUser.id,
      }
    )

    const token = await User.accessTokens.create(user)

    return response.redirect(`${redirectUrl}?token=${token.value}&userId=${user.id}`)
  }
}
