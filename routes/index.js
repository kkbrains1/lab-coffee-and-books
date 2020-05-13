'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Books and Beans' });
});

module.exports = router;
