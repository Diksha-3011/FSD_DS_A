function test1(){
    setTimeout(function(){
        console.log("test1");
        cb();
    
    }, 4000);
}
function test2(){
    setTimeout(function(){
        console.log("test2");   
        cb();    
    
    }, 2000);
}

function test3(){
    setTimeout(function(){
        console.log("test3");
        cb();
    }, 200);
}

function test4(){
    setTimeout(function(){
        console.log("test4");
        cb();
    }, 100);
}

function cb(){
    console.log("callback");
}
test1(()=>{
    test2(()=>{
        test3(()=>{
            test4();
        });
    }   );
});

