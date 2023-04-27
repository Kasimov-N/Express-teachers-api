const { Router } = require('express')
const router = Router()
let DATA = require('../Data/data')
const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')

//get All teachers

router.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, '../Data/data.json'), 'utf-8', (err, data) => {
        if (err) throw err
        else {
            data = JSON.parse(data)
            res.json({
                message: 'All Teachers',
                data: data
            })
        }
    })
})

//get one teacher

router.get('/:id', (req, res) => {
    res.json(DATA.filter(item => item.id == req.params.id))
})

//create ucer

router.post('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../Data/data.json'), 'utf-8', (err, data) => {
        if (err) throw err
        else {
            const newData = {
                id: v4(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }
            data = JSON.parse(data)
            data.push(newData)
            // res.json(data);
            fs.writeFile(path.join(__dirname, '../Data/data.json'), JSON.stringify(data), (err) => {
                if (err) throw err
                else {
                    res.json({
                        message: 'Teacher Created',
                        data: newData
                    })
                }
            })
        }
    })
})

//delete

router.delete('/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../Data/data.json'), 'utf-8', (err, data) => {
        if (err) throw err
        else {
            data = JSON.parse(data)
            const isExist = data.some(data => data.id == req.params.id)
            if (isExist) {
                data = data.filter(item => item.id != req.params.id)
                fs.writeFile(path.join(__dirname, '../Data/data.json'), JSON.stringify(data), (err) => {
                    if (err) throw err
                    else {
                        res.json({
                            message: 'Teacher Deleted',
                        })
                    }
                })
            } else {
                res.json({
                    message: 'Teacher Not Found',
                })
            }
        }
    })
})

//update teacher

router.put('/:id', (req, res) => {
    const body = req.body
    fs.readFile(path.join(__dirname, '../Data/data.json'), 'utf-8', (err, data) => {
        if (err) throw err
        else {
            data = JSON.parse(data)
            const isExist = data.some(data => data.id == req.params.id)
            if (isExist) {
                const index = data.findIndex(item => item.id == req.params.id)
                const putData = {
                    id: req.params.id,
                    firstName: body.firstName ? body.firstName : data[index].firstName,
                    lastName: body.lastName ? body.lastName : data[index].lastName,
                    email: body.email ? body.email : data[index].email
                }
                data[index] = putData
                res.json(data)
    
                fs.writeFile(path.join(__dirname, '../Data/data.json'), JSON.stringify(data), (err) => {
                    if (err) throw err
                    else {
                        res.json({
                            message: 'Teacher Updated',
                            data: putData
                        })
                    }
                })
            }else{
                res.json({
                    message: 'Teacher Not Found',
                })
            }

        }
    })

})

module.exports = router