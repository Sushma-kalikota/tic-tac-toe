let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newbtn=document.querySelector("#new-btn")
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO = true;
let count = 0;
const winPattens=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked !");
        if(turnO){
            box.innerText="O";
            box.style.color="navy";
            turnO=false;
        }else{
            box.innerText="X";
            box.style.color="firebrick"
            turnO=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }

    });
});
const gameDraw=()=>{
        msg.innerHTML=`Draw! between the both players`;
        msgContainer.classList.remove("hide");
        disableBoxes();
};
const disableBoxes=()=>{
    boxes.forEach((box)=>{box.disabled=true})
};
const enableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    })
    
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations the winner is "${winner}"`
    msgContainer.classList.remove("hide");
};
const checkWinner=()=>{
    for(let pattern of winPattens){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;
    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
        if(pos1Val === pos2Val && pos2Val=== pos3Val){
            console.log("winner");
            showWinner(pos1Val);
            disableBoxes();
            return true;
        }
    }
}
return false;
};
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};
newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
