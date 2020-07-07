var buttonColours= ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Detect initial key press
$(document).keypress(function(event){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(document).on("tap",function(event){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});



// Click Event listener
$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(level);
});


//Validate each click against the memorized pattern.
function checkAnswer(currentLevel){
  if (userClickedPattern.length != level){
      var lastReferred = (userClickedPattern.length-1)
      if (userClickedPattern[lastReferred] != gamePattern[lastReferred]){
        level = 0;
        started = false;
        $("h1").text("Game Over. Press any key to restart");
        playSound("wrong");
        gamePattern=[];
        userClickedPattern=[];
      }
  }
  else{
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)){
        userClickedPattern = [];
        setTimeout(nextSequence(),5000);
      }
      else{
        level = 0;
        started = false;
        $("h1").text("Game Over. Press any key to restart");
        playSound("wrong");
        gamePattern=[];
        userClickedPattern=[];
      }

  }
}

//Generate next level of sequence.
function nextSequence(){

  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randonChosenColour = buttonColours[randomNumber];
  gamePattern.push(randonChosenColour);
  $("#"+randonChosenColour).delay(500).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randonChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}
