
import jwt from 'jsonwebtoken';
import userTable from './UserTable.js';

const secret = "my_secret";

function Register(app) {
    app.post('/signup', signUp)
    app.post('/signin', signIn)
}




//----------------------------------------------------------------------------------------------------------------------------


async function signUp(req, res) {
    
    if (req.body.email =="" || req.body.password === "" || req.body.name == "" || req.body.surname == "") {
        res.send("Please fill all empty spaces");
    }else if(await userTable.isEmailExisting(req.body.email)){

        res.send("This email is in use, please change your email")
    }
    else{
        const created = await userTable.createUser(req.body.name, req.body.surname, req.body.email, req.body.password)
        res.send(created)
    } 
}

//----------------------------------------------------------------------------------------------------------------------------

 async function signIn(req, res) {

    // check if user exist ------------------

    const user = await userTable.getUser(req.body.email, req.body.password);


    if(user){
        //const checked = await functions.checkUser() 
        var token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, secret,);
        res.send({
            message: "Success",
            token: token,
            user: user
        })
    }else{
        res.send("Email or password is wrong, please try again ")
    }
    }
   




var myUsers = {
    Register
}


export default myUsers;
