function password_check(user,pass){
    if(user == pass){
        return "correct";
    }
    else{
        return "not correct";
    }
}
function sumWithMsg(callback,msgSUM){
    const result= callback("diksha","diksha");
    const fresult="HI your "+msgSUM+" are "+result+" ";
    console.log(fresult);
}
sumWithMsg(password_check,"user and password");