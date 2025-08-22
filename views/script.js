
async function sendData()
{

const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');

const User = {
    fullName : fullName.value,
    email : email.value,
    password : password.value
};
try{


await fetch(`http://localhost:9696/author/api/register`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(User) // JS Object ko JSON string me
    }
    
);
const data = await res.json();
console.log("Response:", data)
}
catch(err)
{
    console.log(err);
}

}
