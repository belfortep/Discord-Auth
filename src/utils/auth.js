function isAuthorized(req, res, next) {

    if (req.user) {
        next()  //si existe usuario, segui
    } else {  //si no, anda a home
        res.redirect('/')
    }

}

function isNotAuthorized(req, res, next) {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

module.exports = {
    isAuthorized,
    isNotAuthorized
}