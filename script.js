let inputDir = {x: 0,y: 0};
let foodSound = new Audio('./Files/eat.wav');
let gameOverSound = new Audio('./Files/gameover.mp3');
let moveSound = new Audio('./Files/move.mp3');
let speed = 5;
let Score = 0;
let lastPaintTime = 0;

function level()
{
    var type = document.getElementsByName("levels");
    if (type[0].checked) 
    {
        speed = 4;
        console.log("Easy")        
    }
    else if (type[1].checked) 
    {
        speed = 8;
        console.log("medium");    
    }
    else if(type[2].checked)
    {
        speed = 16;
        console.log("hard");
    }

}

// $('.levellist').on('change', function(){
//     $('.levellist').not(this).prop('checked', false);
// });
let snakeArr = [

    {x: 13, y: 15}
]
food = {x: 6, y: 15};
/* Game Function */
function main (ctime)
{
    window.requestAnimationFrame(main);
    if (( (ctime - lastPaintTime)/1000  ) < 1/speed)
    {
    return;
    }
    lastPaintTime = ctime;
    
    gameEngine();    

}
function isCollide(snake)
{
 for (let i = 1; i < snakeArr.length; i++)
   {
         if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
          {
            gameOverSound.play();
              return true;
             }
    }
        if (snake[0].x >= 18 || snake[0].x <= 0  || snake[0].y >= 18 || snake[0].y <= 0) 
        {
            gameOverSound.play();
             return true; 
        }
        
    
   
}
function gameEngine()
{   //updating snake array & food
    //If snake collides with wall or itself
    if (isCollide(snakeArr)) 
    {
        Score = 0;  
        scoreBox.innerHTML = "Score : " + Score;
        inputDir = {x:0 , y:0} ;
        alert("Game over , press any key to play again") ;
        snakeArr = [{x: 13, y: 15}];
        
    }
    //if food is eaten , score increment , food regenrate
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        Score +=1;
        if (Score>hiscoreval) 
        {
            hiscoreval = Score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))    
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + Score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b =16;
        food = {x: Math.round(a + (b - a)* Math.random() ), y: Math.round(a + (b - a)* Math.random() )}
    }
    //moving snake
    for (let i = snakeArr.length - 2; i>= 0 ; i--)
    {
        
        snakeArr[i+1] =  {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    board.innerHTML = "";
        
    snakeArr.forEach((e, index)=>{
        //display snake
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x; 
        if(index === 0)
        { 
            snakeElement.classList.add('head')
       
        }
        else
        snakeElement.classList.add('snake')
       
        board.appendChild(snakeElement);
    });
        //display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y; 
        foodElement.style.gridColumnStart = food.x; 
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}



//main logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else
{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDir = {x:0, y:1} //game start
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});