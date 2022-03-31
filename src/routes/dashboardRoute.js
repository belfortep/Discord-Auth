const { Router } = require('express')
const router = Router()
const { isAuthorized } = require('../utils/auth')

router.get('/', isAuthorized, (req, res) => {

    res.render('dashboard')

})



module.exports = router