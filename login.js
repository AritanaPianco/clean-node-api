// const express = require('express')
// const router = express.Router()

module.exports = () => {
  const router = new SignUpRouter()
  router.post('/signup', ExpressRouterAdapter.adapt(router))
}

class ExpressRouterAdapter { // mapper adptar o request e response do express
  static adapt (router) {
    return async (req, res) => {
      const customHttpRequest = {
        body: req.body
      }
      const customHttpResponse = await router.route(customHttpRequest)
      res.status(customHttpResponse.statusCode).json(customHttpResponse.body)
    }
  }
}

// presentation layer
// signup-router
class SignUpRouter {
  async route (customHttpRequest) {
    const { email, password, repeatPassord } = customHttpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repeatPassord)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain Layer
// signup-useCase
class SignUpUseCase {
  async signUp (email, password, repeatPassord) {
    if (password === repeatPassord) {
      new AddAccountRepository().add(email, password, repeatPassord)
    }
  }
}

// Infra layer
// add-account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async add (email, password, repeatPassord) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
