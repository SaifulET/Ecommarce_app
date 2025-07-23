
let step=0;
while(input!=1){
    if(input%3==0){
        input=input/3;
    }
    else if((input-1)%3==0){
        input--;
    }
    else if(input%2==0){
        input=input/2;
    }
    else{
        input=input-1;
    }
    step++;
}
console.log(step);