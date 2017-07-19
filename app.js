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


const eventHandlers = {
  startGame() {
    $('#start-button').on('click', () => {
      $('.modal-1').css('display', 'none');
      $('.mushroom-container').css('display', 'block');
      setUpRound();
    });
  },
  clickShrooms() {
    $('img').on('click', (e) => {
      $(e.currentTarget).hide()});
    $('img').on('click', (e) => {
      if ($(e.currentTarget).attr('class') === 'poisonous') {
        score--;
        // alert("Be careful! That one was poisonous.")
        $('h2').text('Power: ' + score);
        console.log('lose point');
          console.log(score);
      } else if ($(e.currentTarget).attr('class') === 'magic') {
        score++;
        // alert("You found a magic mushroom!");
          $('h2').text('Power: ' + score);
        console.log('win point');
          console.log(score);
      } else if ($(e.currentTarget).attr('class') === 'normal') {
          $('h2').text('Power: ' + score);
        console.log('no change');
        console.log(score);
      }
    });
  },



}





// the game round object

const round = {
  roundNumber: 1,
  clearBoard () {
    $('.mushroom-container').empty();
  },
  generateShrooms(num) {
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
  },
  setTimer() {
    time=30;
    const timer = setInterval( ()=> {
      time--
      console.log(time);
      $('h3').text("Timer: " + time + " sec");
      if (time===0) {
        clearInterval(timer);
          checkForWin();
      }
    }, 1000);
  },
}





const setUpRound = () => {
  round.clearBoard();
  round.generateShrooms(round.roundNumber*20);
  round.setTimer();
  eventHandlers.clickShrooms();
}






const checkForWin = () => {
  if (score <= 0) {
    // call the lose modal
  }
  if ((round.roundNumber === 1) && (score < 10)) {
    // if you don't pass round 1
    // call the repeat round modal and restart round 1
    setUpRound();
  } else if ((score >= 10) && (round.roundNumber===1)) {
    // call next round modal
    round.roundNumber=2;
    setUpRound();
  } else if ((round.roundNumber===2) && (score<20)) {
    // call repeat round modal
    setUpRound();
  }  else if ((score >= 20) && (round.roundNumber===2)) {
    //call next round modal
    round.roundNumber=3;
    setUpRound();
  } else if ((round.roundNumber===3) && (score < 30)) {
    // call repeat round modal
    setUpRound();
  } else if ((score >= 30) && (round.roundNumber===3)) {
        //call next round modal
    round.roundNumber=4;
    setUpRound();
  } else if ((round.roundNumber===4) && (score < 40)) {
    // call repeat round modal
    setUpRound();
  } else if ((score >= 40) && (round.roundNumber===4)) {
        //call next round modal
    round.roundNumber=5;
    setUpRound();
  } else if ((round.roundNumber===5) && (score < 50)) {
    // call repeat round modal
    setUpRound();
  } else if ((score >= 50) && (round.roundNumber===5)) {
        //call next round modal
    round.roundNumber=6;
    setUpRound();
  } else if ((round.roundNumber===6) && (score < 60)) {
    // call repeat round modal
    setUpRound();
  } else if ((score >= 60) && (round.roundNumber===6)) {
        //call next round modal
    round.roundNumber=7;
    setUpRound();
  } else if ((round.roundNumber===7) && (score < 70)) {
    // call repeat round modal
    setUpRound();
  } else if ((round.roundNumber===7) && (score >= 70)) {
    // modal-win
  }
}



eventHandlers.startGame();


})
