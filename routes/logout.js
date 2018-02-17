const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.vektor = false;
    return res.redirect('/');
});

module.exports = router;