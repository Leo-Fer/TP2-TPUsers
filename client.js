import { getUsers, addUser, getUserbyEmail, updateUser, deleteUser } from "./users.js";

async function listarUsuarios(){
    console.log(await getUsers()) 
}

async function buscarUsuarioPorMail(){
    console.log(await getUserbyEmail('leo.fernandez@gmail.com'))
}
 
async function agregarUsuario(){
    const user = {        
        name: 'Leo Fernandez',
        email: 'leo.fernandez@gmail.com',
        password: 'Password1!'
    };
    
    console.log(await addUser(user))    
}

async function actualizarUsuario(){
    const user = await getUserbyEmail('leo.fernandez@gmail.com');    
    
    console.log(await updateUser({
        id: user._id.toString(),
        name: 'Leonardo Fernandez III',
        email: user.email
    }))   
    
    const modified = await getUserbyEmail('leo.fernandez@gmail.com');
    console.log(modified)
}

async function borrarUsuario(){
    const user = await getUserbyEmail('leo.fernandez@gmail.com');
    
    if(user){
        console.log(await deleteUser(user._id.toString()))
    } else {
        console.log('No existe el usuario.')
    }     
}

//listarUsuarios()
//buscarUsuarioPorMail()
//agregarUsuario()
//actualizarUsuario();
//borrarUsuario()
