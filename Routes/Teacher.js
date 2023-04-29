const { Router } = require('express')
const router = Router()

const { index, show, create, remove, update } = require('../Controllers/Teachers')

router.get('/', index)
router.get('/:id', show )
router.post('/', create )
router.delete('/:id', remove)
router.put('/:id', update )

module.exports = router