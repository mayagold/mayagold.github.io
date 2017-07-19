// Did I link my files and JQUERY?
// console.log('test');
// $

// Wednesday goals

// add animations to mushrooms so that they move around the page
// add different animations for when you click on a poisonous and a magic mushroom
// style the page and the modals
// add the round# at the top of the page while playing, above Power
// make the timer look cool / add animation





// JQUERY WINDOW ONLOAD

$(() => {

let score = 5;
let time = 30;


// First user prompt: Start button closes the intro modal and takes you to the game.
// User will click on start button after reading the directions on the modal.
// This will hide the modal (display:none) and show the mushroom-container div, which is the play space.


const eventHandlers = {
  startGame() {
    $('.start-button').on('click', () => {
      $('#modal-intro').hide();
      $('.game-container').css('display', 'block');
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
        $('#show-power').text('Power: ' + score);
        console.log('lose point');
          console.log(score);
      } else if ($(e.currentTarget).attr('class') === 'magic') {
        score++;
        // alert("You found a magic mushroom!");
          $('#show-power').text('Power: ' + score);
        console.log('win point');
          console.log(score);
      } else if ($(e.currentTarget).attr('class') === 'normal') {
          $('#show-power').text('Power: ' + score);
        console.log('no change');
        console.log(score);
      }
    });
  },
  go() {
    $('.go-button').on('click', () => {
      console.log('working');
      $('.modal').hide();
      $('.game-container').css('display', 'block');
      $('.mushroom-container').css('display', 'block');
      setUpRound();
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
  $('#show-round').text('Round: '+ round.roundNumber);
  round.clearBoard();
  round.generateShrooms(round.roundNumber*20);
  round.setTimer();
  eventHandlers.clickShrooms();
}






const checkForWin = () => {
  if (score <= 0) {
    $('.game-container').css('display', 'none');
    $('#modal-lose').css('display', 'block');
    eventHandlers.go();
  }
  if ((round.roundNumber === 1) && (score < 10)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((score >= 10) && (round.roundNumber===1)) {
    round.roundNumber=2;
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===2) && (score<20)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  }  else if ((score >= 20) && (round.roundNumber===2)) {
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===3) && (score < 30)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((score >= 30) && (round.roundNumber===3)) {
    round.roundNumber=4;
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===4) && (score < 40)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((score >= 40) && (round.roundNumber===4)) {
    round.roundNumber=5;
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===5) && (score < 50)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((score >= 50) && (round.roundNumber===5)) {
    round.roundNumber=6;
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===6) && (score < 60)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((score >= 60) && (round.roundNumber===6)) {
    round.roundNumber=7;
    $('.game-container').css('display', 'none');
    $('#modal-next-round').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===7) && (score < 70)) {
    $('.game-container').css('display', 'none');
    $('#modal-repeat').css('display', 'block');
    eventHandlers.go();
  } else if ((round.roundNumber===7) && (score >= 70)) {
    $('.game-container').css('display', 'none');
    $('#modal-win').css('display', 'block');
  }
}



eventHandlers.startGame();


})
