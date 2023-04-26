const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.json({
        title: 'teachers',
        message: 'Hello express',
        data: [
            {
                route: 'teachers',
                method: 'GET',
                url: '/',
                data: 'All teachers',
            },
            {
                route: 'teachers',
                method: 'GET',
                url: '/:id',
                data: 'Get one teacher',
            },
            {
                route: 'teachers',
                method: 'POST',
                url: '/',
                data: 'Create teacher',
            },
            {
                route: 'teachers',
                method: 'DELETE',
                url: '/:id',
                data: 'Delete teacher',
            },
            {
                route: 'teachers',
                method: 'PUT',
                url: '/:id',
                data: 'Update teacher',
            },
        ]
    })
})


module.exports = router