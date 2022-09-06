
import userTable from './UserTable.js';

function Register(app) {
    app.post('/signup', signUp)
    app.post('/signin', signIn)
}

async function signUp(req, res) {
    if(await userTable.isEmailExisting(req.body.email)) {
        res.send("This email is in use, please change your email")
    }
    
    if (!req.body.email || req.body.password === "") {
        res.send("Email or password cannot be empty");
    }
    else{
        const created = await userTable.createUser(req.body.name, req.body.surname, req.body.email, req.body.password)
        res.send(created)
    } 
}

 async function signIn(req, res) {

    if(await userTable.isEmailExisting(req.body.email) && await userTable.checkPassword(req.body.password)){
        //const checked = await functions.checkUser() 
        res.send(true)
    }else{
        res.send("Email or password is wrong, please try again ")
    }
    }
   




var myUsers = {
    Register
}


export default myUsers;
