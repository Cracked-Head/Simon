// alert("Hello")
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
$(document).on("keypress",function(){
  if(!gameStarted){
    nextSequence();
    gameStarted = true;
    $("h1").text("Level "+level);
  }
});

$(".btn").click(function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(this);

   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  level++;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour)
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play()
}

function animatePress(currenColor){
  $(currenColor).addClass("pressed");
  setTimeout(function(){
    $(currenColor).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}
