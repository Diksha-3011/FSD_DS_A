// Armstrong number

let n=153;
let sum=0;
let num=n;
prompt("Enter a number: ");

while(n>0) {
    let r=n%10;
    sum+=r*r*r;
    n=parseInt(n/10);
}

if(sum===num) {
    console.log("Armstrong number");
} else {
    console.log("Not an Armstrong number");
}