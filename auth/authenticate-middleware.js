/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")
const secKeys = require("../api/secKeys")

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({
        message: " Invalid Credentials"
      })
    }

    jwt.verify(token, secKeys.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid Credentials"
        })
      }
      req.token = decoded

      next()
    })
  }catch (err) {
    next(err)
  }
}
