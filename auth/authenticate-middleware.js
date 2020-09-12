/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")

function auth() {
  const roles = ["user", "contributor"]
  return async (req, res, next)=> {
    const authError = {
      message: "Invalid Credentials"
    }
    try{
      const token = req.cookies.token
      if(!token) {
        return res.status(401).json(authError)
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          return res.status(401).json(authError)
        }
        if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
          return res.status(403).json({
            message: "Invalid Credentials"
          })
        }
        req.token = decoded

        next()
      })


      next()
    }catch(err){
      next(err)
    }
  }
}

module.exports = auth
