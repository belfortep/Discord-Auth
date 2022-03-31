const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = require('../config')
const User = require('../models/User')
const passport = require('passport')
const { Strategy } = require('passport-discord')

//guardando usuario en la sesion
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    if (user) done(null, user)
})

passport.use(new Strategy({//manera en la que pido la autenticacion

    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/redirect',
    scope: ['identify', 'guilds']//que le pido acceder al usuario

}, async (accessToken, refreshToken, profile, done) => {

    try {

        const user = await User.findOne({ discordId: profile.id })

        if (user) return done(null, user)//primer parametro es para error, el segundo lo que devuelvo

        const newUser = new User({
            discordId: profile.id,
            username: profile.username,
            guilds: profile.guilds
        })

        await newUser.save()

        done(null, newUser)
    } catch (err) {
        console.log(err)
        return done(error, null)
    }

}))