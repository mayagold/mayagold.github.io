// Did I link my files and JQUERY?
// console.log('test');
// $

// Wednesday goals

// add animations to mushrooms so that they move around the page
// add different animations for when you click on a poisonous and a magic mushroom
// style the page and the modals
// make the timer look cool / add animation
// comment out code
// fix restart button


// JQUERY WINDOW ONLOAD

$(() => {

// Declare score and time variables outside of any object
  let score = 5;
  let time = 30;

// Event Handlers object
  const eventHandlers = {
    // start game: when you click the Start or Start Over button
    startGame() {
      score=5;
      $('.start-button').on('click', () => {
        $('#modal-intro').detach();
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        setUpRound();
        $('.start-button').off();
      });
    },
    // clicking on mushrooms -- changes the score based on their class
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
    // when you click Keep Playing after winning a round
    nextRound() {
      $('#next-button').on('click', () => {
        console.log('working');
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('#next-button').off();
        setUpRound();
      });
    },
    // when you click Keep Playing after losing a round
    repeatRound() {
      $('#repeat-button').on('click', () => {
        console.log('working');
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('#repeat-button').off();
        setUpRound();
      });
    },
  }

// the game round object

  const round = {
    // round number can be updated
    roundNumber: 1,
    // clear the board of any leftover mushrooms (at beginning of each round)
    clearBoard () {
      $('.mushroom-container').empty();
    },
    // generate a different number of shrooms depending on what round number it is, assigning them each a random class of poisonous, normal or magic
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
    // clear timer, reset timer to 30s
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
    // shows the repeat round modal
    roundRepeat() {
      $('.game-container').css('display', 'none');
      $('#modal-repeat').css('display', 'block');
      eventHandlers.repeatRound();
    },
    // shows the next round modal
    roundNext() {
      round.roundNumber++;
      $('.game-container').css('display', 'none');
      $('#modal-next-round').css('display', 'block');
      eventHandlers.nextRound();
    },
  }

// the actual function that starts a new round

  const setUpRound = () => {
    $('#show-round').text('Round: '+ round.roundNumber);
    round.clearBoard();
    round.generateShrooms(round.roundNumber*20);
    round.setTimer();
    eventHandlers.clickShrooms();
  }

// check whether user can move on to the next round

  const checkForWin = () => {
    if (score <= 0) {
      round.roundNumber=1;
      $('.game-container').css('display', 'none');
      $('#modal-lose').css('display', 'block');
      eventHandlers.startGame();
    }  else if ( ((round.roundNumber === 1) && (score < 10)) ||((round.roundNumber===2) && (score<20)) || ((round.roundNumber=== 3 ) && (score < 30)) || ((round.roundNumber===4 ) && (score < 40)) || ((round.roundNumber=== 5 ) && (score < 50))  || ((round.roundNumber===6 ) && (score < 60)) || ((round.roundNumber===7 ) && (score < 70)) )  {
      round.roundRepeat();
    } else if ( ((score >= 10) && (round.roundNumber===1)) || ((score >= 20) && (round.roundNumber===2)) || ((score >= 30) && (round.roundNumber===3)) || ((score >= 40) && (round.roundNumber===4)) || ((score >= 50) && (round.roundNumber===5)) || ((score >= 60) && (round.roundNumber===6)) ) {
      round.roundNext();
    } else if ((round.roundNumber===7) && (score >= 70)) {
      round.roundNumber=1;
      $('.game-container').css('display', 'none');
      $('#modal-win').css('display', 'block');
      eventHandlers.startGame();
    }
  }

  // turn on event listener for start button when the page loads!

  eventHandlers.startGame();

})
