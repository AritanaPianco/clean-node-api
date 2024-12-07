module.exports = class MissinParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissinParamError'
  }
}
