console.log("Hello World");

// object creation
let rectangle={
    length:4,
    width:5,

    //method
    draw:function(){
        console.log("I am a rectangle");
    }
}


/// factory function
///constructor function
function createRectangle(len,wid){
    return {
        length:len,
        width:wid,
        draw:function(){
            console.log("I am a ractangle")
        }} };

let rectangle1=createRectangle(3,5);

///constructor function used parcal notation(first letter of function is capital)

function Rectangle(len,wid){
    this.length=len;
    this.width=wid;}

let rectangle2=new Rectangle(4,6);

//add property to object
rectangle2.draw=function(){
    console.log("I am a rectangle");
}
