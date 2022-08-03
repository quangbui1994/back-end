const { v4: uuid } = require('uuid')
const User = require('../schema/auth')
const bcrypt = require('bcrypt')

class AuthService {
    constructor() {}

    async login(username, password) {
        const user = await User.findOne({ username })
        if (!user) {
            throw Error('User not existed')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
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
            const newPassword = await bcrypt.hash(password, 8)
            const newUser = new User({
                username,
                password: newPassword,
                id: uuid(),
            })
            await newUser.save()
            return newUser
        } catch (error) {
            throw Error('Cant create new user')
        }
    }
}

module.exports = AuthService
