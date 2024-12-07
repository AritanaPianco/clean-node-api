const MissinParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissinParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}
