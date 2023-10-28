import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://yashjeswani63:SHDsWY46FhJtwtCP@cluster0.pcxefdd.mongodb.net/loginregister?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})



const userSchema = new mongoose.Schema({
    name: String,
    dateofbirth: Date,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)



//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, dateofbirth, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                dateofbirth,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.get('/getusers',(req,res)=>{
    User.find().then(User=>res.json(User)).catch(err=>res.json(err))
})

app.listen(9002,() => {
    console.log("BE started at port 9002")
})