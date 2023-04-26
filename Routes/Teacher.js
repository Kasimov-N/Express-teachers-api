const { Router } = require('express')
const router = Router()
let data = require('../Data/data')
const { v4 } = require('uuid')

//get All teachers

router.get('/', (req, res) => {
    res.json({
        message: 'All Teachers',
        data: data
    })
})

//get one teacher

router.get('/:id', (req, res) => {
    res.json(data.filter(item => item.id == req.params.id))
})

//create ucer

router.post('/', (req, res) => {
    const body = req.body
    const newTeacher = {
        id: v4(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
    }
    data.push(newTeacher)
    res.json({
        message: 'Teacher Created',
        data: newTeacher
    })
})

//delete

router.delete('/:id', (req, res) => {
    data = data.filter(item => item.id != req.params.id)
    res.json({
        message: 'Teacher Deleted',
        data: data
    })
})

//update teacher

router.put('/:id', (req, res) => {
    const body = req.body
    const isExist = data.some(item => item.id == req.params.id)
    if(isExist){
        data.map(item => {
            if(item.id == req.params.id){
                item.firstName = body.firstName? body.firstName : item.firstName
                item.lastName = body.lastName? body.lastName: item.lastName
                item.email = body.email? body.email : item.email
                res.json({
                    message: 'teacher updated',
                    data: item
                })
            }
        })
    }
})

module.exports = router