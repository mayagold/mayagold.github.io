
// console.log('test');
// $

// Thursday goals

// Animate mushrooms differently for each round
  // round 1: no animation, just scattered
  // round 2: they move horizontally in same direction
  // round 3: they move horizontally in both directions past each other
  // round 4: they move up and down in both directions
  // round 5: they move in all directions up/down/left/right on x/y axis
  // round 6: they move x/y/z
  // round 7: they disappear and reappear somewhere else on the page


// Friday goals
  // figure out the whole background situation ... wtf is that gonna be


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
        $('.start-button').off();
        setUpRound();
      });
    },
    // clicking on mushrooms -- changes the score based on their class
    clickShrooms() {
      $('img').on('click', (e) => {
        if ($(e.currentTarget).attr('class') === 'poisonous') {
          score--;
          // this could probably be shortened into one line,
          $(e.currentTarget).css('animation-name', 'vibrate');
          $(e.currentTarget).css('animation-duration', '.1s');
          $(e.currentTarget).css('animation-iteration-count', '10');
          $(e.currentTarget).delay(1000).fadeOut();
          $('#show-power').text('Power: ' + score);
          // console.log('lose point');
          // console.log(score);
        } else if ($(e.currentTarget).attr('class') === 'magic') {
          score++;
          // this could probably be shortened too,
          $(e.currentTarget).css('animation-name', 'spin');
          $(e.currentTarget).css('animation-duration', '2s');
          $(e.currentTarget).css('animation-iteration-count', '1');
          $(e.currentTarget).delay(1700).fadeOut();
          $('#show-power').text('Power: ' + score);
          // console.log('win point');
          // console.log(score);
        } else if ($(e.currentTarget).attr('class') === 'normal') {
          $(e.currentTarget).delay(200).fadeOut();
          $('#show-power').text('Power: ' + score);
          // console.log('no change');
          // console.log(score);
        }
      });
    },
    // when you click Keep Playing after winning a round
    nextRound() {
      $('#next-button').on('click', () => {
        // console.log('working');
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
        // console.log('working');
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('#repeat-button').off();
        setUpRound();
      });
    },
    restartGame() {
      score=5;
      $('#restart-button').on('click', () => {
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        setUpRound();
        $('#restart-button').off();
      });
    },
    newGame() {
      score=5;
      $('#new-game-button').on('click', () => {
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        setUpRound();
        $('#new-game-button').off();
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
        shroom.css('animation-name', 'colorRotate');
        shroom.css('animation-duration', '15s');
        shroom.css('animation-iteration-count', '2');
        const left = (Math.random()*1000) + 'px';
        const top = (Math.random()*500) + 'px';
        // console.log(top);
        shroom.css('margin-left', left);
        shroom.css('margin-top', top)
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
        // console.log(time);
        $('h3').text(time);
        if (time===0) {
          clearInterval(timer);
          checkForWin();
        }
      }, 1000);
    },
    // shows the repeat round modal
    roundRepeat() {
      $('#repeat-button').html('Try Round ' + round.roundNumber + " Again");
      $('.game-container').css('display', 'none');
      $('#modal-repeat').css('display', 'block');
      eventHandlers.repeatRound();
    },
    // shows the next round modal
    roundNext() {
      round.roundNumber++;
      $('#next-button').html('Move On To Round ' + round.roundNumber + "!");
      $('.game-container').css('display', 'none');
      $('#modal-next-round').css('display', 'block');
      eventHandlers.nextRound();
    },
    roundAnimation(round) {
      if (round===1){
        // console.log('called');
        // $('.poisonous').css('animation-name', 'spin');
        // $('.poisonous').css('animation-duration', '3s');
        // $('.poisonous').css('animation-iteration-count', '10');
        // $('.magic').css('animation-name', 'spin');
        // $('.magic').css('animation-duration', '3s');
        // $('.magic').css('animation-iteration-count', '10');
        // $('.normal').css('animation-name', 'spin');
        // $('.normal').css('animation-duration', '3s');
        // $('.normal').css('animation-iteration-count', '10');
      } else {
        // console.log('working');
      }
    //   else if (round===2){}
    //   else if (round===3){}
    //   else if (round===4){}
    //   else if (round===5){}
    //   else if (round===6){}
    //   else if (round===7){}
    // }
    }
  }

// the actual function that starts a new round

  const setUpRound = () => {
    // $('#show-round').text('Round '+ round.roundNumber);
    round.clearBoard();
    round.generateShrooms(round.roundNumber*20);
    round.setTimer();
    eventHandlers.clickShrooms();
    round.roundAnimation(round.roundNumber);
  }

// check whether user can move on to the next round

  const checkForWin = () => {
    if (score <= 0) {
      round.roundNumber=1;
      $('.game-container').css('display', 'none');
      $('#modal-lose').css('display', 'block');
      eventHandlers.restartGame();
    }  else if ( ((round.roundNumber === 1) && (score < 10)) ||((round.roundNumber===2) && (score<20)) || ((round.roundNumber=== 3 ) && (score < 30)) || ((round.roundNumber===4 ) && (score < 40)) || ((round.roundNumber=== 5 ) && (score < 50))  || ((round.roundNumber===6 ) && (score < 60)) || ((round.roundNumber===7 ) && (score < 70)) )  {
      round.roundRepeat();
    } else if ( ((score >= 10) && (round.roundNumber===1)) || ((score >= 20) && (round.roundNumber===2)) || ((score >= 30) && (round.roundNumber===3)) || ((score >= 40) && (round.roundNumber===4)) || ((score >= 50) && (round.roundNumber===5)) || ((score >= 60) && (round.roundNumber===6)) ) {
      round.roundNext();
    } else if ((round.roundNumber===7) && (score >= 70)) {
      round.roundNumber=1;
      $('.game-container').css('display', 'none');
      $('#modal-win').css('display', 'block');
      eventHandlers.newGame();
    }
  }

  // turn on event listener for start button when the page loads!
  eventHandlers.startGame();

})
