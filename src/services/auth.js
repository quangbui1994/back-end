const { v4: uuid } = require('uuid')
const User = require('../schema/auth')

class AuthService {
    constructor() {}

    async login(username, password) {
        const user = await User.findOne({ username })
        if (!user) {
            throw Error('User not existed')
        }
        if (user.password !== password) {
            throw Error('Password wrong')
        }
        return user
    }

    async signup(username, password) {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            throw Error('User existed')
        }

        try {
            const newUser = new User({ username, password, id: uuid() })
            await newUser.save()
            return newUser
        } catch (error) {
            throw Error('Cant create new user')
        }
    }
}

module.exports = AuthService
