
var buttonColors = ["red","green","yellow","blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;

$(document).keydown(function(){
  if (!start){
  sequence();
  start = true;
}
});
//===take user clicked color color==========================================================================

$(".btn").click(function(){

  var userClickColor = $(this).attr("id");

  userClickPattern.push(userClickColor);
  audioPlay(userClickColor);
  animation(userClickColor);
  checkAnswer(userClickPattern.length-1)
});

//-------------------
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickPattern[currentLevel]){

    if (gamePattern.length === userClickPattern.length){

      setTimeout(function() {
      sequence()
    }, 1000);
    }
}else{
    audioPlay("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over!  😞 Press any key to start again.")
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    reStart();
  }
}
//===Create random color==========================================================================
function sequence(){
  userClickPattern = [];
  level++
  $("#level-title").text("level " + level)
  let randomNumber = Math.floor(Math.random() * buttonColors.length)

  let randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  audioPlay(randomColor);
  checkAnswer();
}

function animation(currentColor){
    $("." + currentColor).addClass("pressed");

  setTimeout(function(){
    $("." + currentColor).removeClass("pressed")
  },100);
}
// sounds
function audioPlay(randomColor){
var playAudio = new Audio("sounds/" + randomColor + ".mp3");
playAudio.play();
}
// start again
function reStart(){
  level = 0;
  gamePattern = [];
  started = false;
}
