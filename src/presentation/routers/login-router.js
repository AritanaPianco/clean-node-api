const HttpResponse = require('../helpers/http-response')
const MissinParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissinParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissinParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // console.error(error)
      return HttpResponse.serverError()
    }
  }
}
