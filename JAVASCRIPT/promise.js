function f1(){

    return new Promise(function(resolve, reject){   
  setTimeout(function(){
    console.log("f1");
    resolve();  
  }, 1000);
});
}

function f2(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log("f2");
      resolve();
    }, 2000);
  });
}
f1().then(f2)
    .catch((err)=>{
        console.log(err);
    });

f2();