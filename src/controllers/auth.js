const express = require('express')
const router = express.Router()
const AuthService = require('../services/auth')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await new AuthService().login(username, password)
        res.status(200).send(user)
    } catch (error) {
        if (error.message === 'User not existed') {
            res.status(404).send(error.message)
        } else if (error.message === 'Password wrong') {
            res.status(404).send(error.message)
        }
    }
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await new AuthService().signup(username, password)
        res.status(200).send(user)
    } catch (error) {
        if (error.message === 'User existed') {
            res.status(400).send(error.message)
        } else if (error.message === 'Cant create new user') {
            res.status(501).send(error.message)
        }
    }
})

module.exports = router
