const brycpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = []

const getUsers = (req,res)=>{
    res.json(users)
}

const secretToken = "super_secret_dont_share"

const createUsers = async (req,res)=>{
    const user = users.find(user => user.name == req.body.name)
    
    if(user){
        return res.status(400).send("User with same username Already Exist")
    }

    try{
        const hashedPassowrd = await brycpt.hash(req.body.password,10)
        const user = { 
            username : req.body.name,
            password : hashedPassowrd
        }
        users.push(user)
        res.status(201)
        res.json(user)
    }
    catch{
        res.status(500).send()
    }
    
}

const login = async (req,res)=>{
    const user = users.find(user => user.username == req.body.name)
    
    if(!user){
        return res.status(400).send("Cannot find User")
    }
    
    try{
        const isValidPassword =  await brycpt.compare(req.body.password,user.password)
        if (isValidPassword){
            let token;
            token = jwt.sign({username:user.username},secretToken,{expiresIn: '1h'})
            res.send({
                username:user.username,
                token:token}
                )
        }
        res.status(400).send("Password does not match")
    }
    catch{
        res.status(500).send()
    }
}

exports.getUsers = getUsers
exports.createUsers = createUsers
exports.login = login