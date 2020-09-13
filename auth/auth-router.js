const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const Users = require("./auth-model")
const secKey = require("../api/secKeys");

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()

    if(user) {
      return res.status(409).json({
        message: "Username is already taken please choose another"
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14)
    })
    res.status(201).json(newUser)
  }catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try{
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if(!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    const payload = {
      userId: user.id,
      username: user.username
    }

    res.json({
      message: `Welcome ${user.username}`,
      token: jwt.sign(payload, secKey.JWT_SECRET)
    })

  }catch(err) {
    next(err)
  }
});

module.exports = router;
