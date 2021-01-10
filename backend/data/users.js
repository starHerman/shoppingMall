const bcrypt=require("bcrypt")
const users=[
    {
        name:"Admin User",
        email:"admin@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"John Dom",
        email:"john@example.com",
        password:bcrypt.hashSync("123456",10)
    },
    {
        name:"Andrew Hu",
        email:"andrew@example.com",
        password:bcrypt.hashSync("123456",10)
    }
]

module.exports=users