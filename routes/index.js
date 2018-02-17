const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { vektor: req.session.vektor });
});

module.exports = router;