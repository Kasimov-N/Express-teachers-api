const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path');


async function read(file) {
    const text = fs.readFileSync(path.join(__dirname, file,), 'utf-8');
    if (!text) {
        console.log(err);
    } else {
        return (JSON.parse(text))
    }
}

exports.index = async (req, res) => {
    const data = await read('../Data/data.json')
    res.json({
        message: 'All Teachers',
        data: data
    })
}

exports.show = async (req, res) => {
    const data = await read('../Data/data.json')
    res.json({
        message: 'Get One Teacher',
        data: data.filter(item => item.id == req.params.id)
    })
}

exports.create = async (req, res) => {
    const data = await read('../Data/data.json')
    const newData = {
        id: v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        subject: req.body.subject,
        group: [
            {
                title: req.body.group[0].title,
                time: req.body.group[0].time,
                students: req.body.group[0].students
            }
        ]
    }
    data.push(newData)
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

exports.remove = async (req, res) => {
    let data = await read('../Data/data.json');
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

exports.update = async (req, res) => {
    const body = req.body
    let data = await read('../Data/data.json')
    const isExist = data.some(data => data.id == req.params.id)
    const index = data.findIndex(item => item.id == req.params.id)
    if (isExist) {
        data.map(item=>{
            if(item.id == req.params.id){
                item.firstName = body.firstName? body.firstName: data[index].firstName
                item.lastName = body.lastName? body.lastName: data[index].lastName
                item.email = body.email? body.email: data[index].email
                item.phoneNumber = body.phoneNumber? body.phoneNumber: data[index].phoneNumber
                item.password = body.password? body.password: data[index].password
                item.subject = body.subject? body.subject: data[index].subject
                item.group[0].title = body.group[0].title? body.group[0].title: data[index].group[0].title
                item.group[0].time = body.group[0].time? body.group[0].time: data[index].group[0].time
                item.group[0].students = body.group[0].students? body.group[0].students: data[index].group[0].students
            }
        })
        fs.writeFile(path.join(__dirname, '../Data/data.json'), JSON.stringify(data), (err) => {
            if (err) throw err
            else {
                res.json({
                    message: 'Teacher Updated',
                    data: data[index]
                })
            }
        })
    }
    else {
        res.json({
            message: 'Teacher Not Found',
        })
    }

}




