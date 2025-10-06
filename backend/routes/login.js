const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const router = express.Router();
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    try {
        // Hash the password with SHA-256 to match stored hash in DB
        const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
        // console.log(hashedPassword);
        
        const query = `
            SELECT * FROM AdmUsers 
            WHERE UserName = :username AND Pword = :hashedPassword AND IsActive = 1
        `;

        const result = await sequelize.query(query, {
            replacements: { username, hashedPassword },
            type: QueryTypes.SELECT,
            raw: true
        });

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = result[0];

        const payload = {
            id: user.ID,
            username: user.UserName,
            email: user.Email,
            role: user.IsAdmin ? 'admin' : 'user'
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.ID,
                name: user.FullName,
                email: user.Email,
                role: payload.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
