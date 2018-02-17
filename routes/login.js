const express = require('express');
const router = express.Router();

const { hash } = require('../config');

router.get('/', (req, res) => {
    res.render('login');
});


router.post('/', (req, res) => {
    if (req.body.username === 'odmen' && req.body.password === hash) {
        req.session.vektor = true;
        return res.redirect('/');
    }
    return res.redirect('/login');
})

module.exports = router;