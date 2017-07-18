// Did I link my files and JQUERY?
// console.log('test');
// $



// JQUERY WINDOW ONLOAD

$(() => {

let score = 5;
let time = 30;

// First user prompt: Start button closes the intro modal and takes you to the game.
// User will click on start button after reading the directions on the modal.
// This will hide the modal (display:none) and show the mushroom-container div, which is the play space.

$('#start-button').on('click', () => {
  $('.modal-1').css('display', 'none');
  $('.mushroom-container').css('display', 'block');
  setTimer();
  checkPower(score);
});


// at the beginning of each round, run the generateShrooms equation with a number input. It will generate the input# of mushroom elements onto the page, and randomly assign the new mushroom elements with a class of "normal", "poisonous" or "magic". there is a high probability of mushroom being normal, and a lower probability of it being magic, and the lowest probability of it being poisonous.

const generateShrooms = (num) => {
  for (i=0; i<num; i++) {
    const shroom = $('<img src="images/Mushroom.png"/>');
    shroom.css('max-height', '50px');
    $('.mushroom-container').append(shroom);
    let typeOfShroom = Math.random();
    if (typeOfShroom < .5) {
      shroom.addClass('normal');
    } else if ((typeOfShroom >= .5) && (typeOfShroom <.8)) {
      shroom.addClass('magic');
    } else if (typeOfShroom >= .8) {
      shroom.addClass('poisonous');
    }
  }
}

// the score updates when you click on the mushrooms: ++ if you click a magic one, -- if you click a poisonous one, no change if you click a normal one

const clickShrooms = () => {
  $('img').on('click', (e) => {
    $(e.currentTarget).hide()});
  $('img').on('click', (e) => {
    if ($(e.currentTarget).attr('class') === 'poisonous') {
      score--;
      alert("Be careful! That one was poisonous.")
      $('h2').text('Power: ' + score);
      console.log('lose point');
        console.log(score);
    } else if ($(e.currentTarget).attr('class') === 'magic') {
      score++;
      alert("You found a magic mushroom!");
        // $('mushroom-container').css('animation-name', 'colorFlash');
        // $('mushroom-container').css('animation-duration', '1s');
        $('h2').text('Power: ' + score);
      console.log('win point');
        console.log(score);
    } else if ($(e.currentTarget).attr('class') === 'normal') {
        $('h2').text('Power: ' + score);
      console.log('no change');
      console.log(score);
    }
  });

}




// The game timer: each round lasts 30 seconds


const setTimer = () => {
  const timer = setInterval( ()=> {
    time--
    console.log(time);
    $('h3').text("Timer: " + time + " sec");
    if (time===0) {
      checkPower(score);
      clearInterval(timer);
      time=30;
    }
  }, 1000);
}
// const startTimer = () => {
//   at the end of this function: checkForWin function
      // if score is a certain amount, setUpRound(x)
// }

// const addAnimation

// const updateScore
// event handler on all the images


// the start round function: when you click start round button, the function
// 1. generates the mushrooms (round#*20)
// 2. adds animation to the mushrooms, using addAnimation(roundNumber) function, different each round based on difficulty
// 3. starts the timer
// 4. updates the score as you click


const setUpRound = (roundNumber) => {
  $('.mushroom-container').empty();
  generateShrooms(roundNumber*10);
  clickShrooms();
  setTimer();
  // addAnimation(roundNumber);
}
// setUpRound(1);

// Mushroom animations: different for each round. They bounce around the page at different speeds.


const checkPower = (power) => {
  if (power < 10) {
    setUpRound(1);
  } else if ((power >= 10) && (power<20)) {
      setUpRound(2);
  } else if ((power >= 20) && (power<30)) {
      setUpRound(3);
  } else if ((power >= 30) && (power<40)) {
      setUpRound(4);
  } else if ((power >= 40) && (power<50)) {
      setUpRound(5);
  } else if ((power >= 50) && (power<60)) {
      setUpRound(6);
  } else if ((power >= 60) && (power<70)) {
      setUpRound(7);
  // } else if (power >= 80) {
  //     winGame();
  // }
}}



})
