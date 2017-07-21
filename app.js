
// console.log('test');
// $

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
        // start audio
        let music = $('<audio src="audio/tipper.mp3" type="audio/mpeg">');
        $('body').append(music);
        $('audio')[0].play();
        $('audio')[0].addEventListener('ended',function(){
          $('audio')[0].src = "audio/antennae.mp3";
          $('audio')[0].type = "audio/mpeg";
          $('audio')[0].pause();
          $('audio')[0].load();
          $('audio')[0].play();
        });
        $('#modal-intro').detach();
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('.start-button').off();
        setUpRound();
    })
    },
    // clicking on mushrooms -- changes the score based on their class
    clickShrooms() {
      $('img').on('click', (e) => {
        console.log(score);
        $(e.currentTarget).off();
        if (($(e.currentTarget).attr('class') === 'poisonous velocity-animating') || ($(e.currentTarget).attr('class') === 'poisonous')) {
          score--;
          // this could probably be shortened into one line,
          $(e.currentTarget).css('animation-name', 'vibrate');
          $(e.currentTarget).css('animation-duration', '.1s');
          $(e.currentTarget).css('animation-iteration-count', '20');
          $(e.currentTarget).css('opacity', '.2');
          // console.log('clicking');
          $('#show-power').text('Mr. Fun Guy says: That one was poisonous! Your points: ' + score );
          // console.log('lose point');
          // console.log(score);
        } else if (($(e.currentTarget).attr('class') === 'magic') || ($(e.currentTarget).attr('class') === 'magic velocity-animating')) {
          score++;
          // this could probably be shortened too,
          // $(e.currentTarget).velocity('stop');
          $(e.currentTarget).css('animation-name', 'spin');
          $(e.currentTarget).css('animation-duration', '10s');
          $(e.currentTarget).css('animation-iteration-count', '1');
          $(e.currentTarget).css('opacity', '.2');
          $('#show-power').text('Mr. Fun Guy says: You found a magic mushroom! Your points: ' + score);
          // console.log('win point');
          // console.log(score);
        } else if (($(e.currentTarget).attr('class') === 'normal') || ($(e.currentTarget).attr('class') === 'normal velocity-animating')) {
          $(e.currentTarget).css('opacity', '0');
          if (round.roundNumber===1) {
            $('#show-power').text('Mr. Fun Guy says: Fasten your seatbelt... Your points: ' + score);
          } else if (round.roundNumber===2) {
            $('#show-power').text('Mr. Fun Guy says: I think this cat can see into my soul... Your points: ' + score);
          } else if (round.roundNumber===3) {
            $('#show-power').text('Mr. Fun Guy says: I can\'t tell if the mushrooms are moving, or I am... Your points: ' + score);
          } else if (round.roundNumber===4) {
              $('#show-power').text('Mr. Fun Guy says: Dude... Look at my hand... Your points: ' + score);
          } else if (round.roundNumber===5) {
            $('#show-power').text('Mr. Fun Guy says: That smoke looks cool... Your points: ' + score);
          } else if (round.roundNumber===6) {
            $('#show-power').text('Mr. Fun Guy says: I can see my own thoughts... Your points: ' + score);
          } else if (round.roundNumber===7) {
            $('#show-power').text('Mr. Fun Guy says: Now we\'re getting somewhere!! Your points: ' + score);
          }
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
      $('#new-game-button').on('click', () => {
        round.roundNumber=1;
        score=5;
        $('h3').show();
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
        shroom.css('max-height', '80px');
        const left = (Math.random()*1000) + 'px';
        const top = (Math.random()*500) + 'px';
        // console.log(top);
        shroom.css('margin-left', left);
        shroom.css('margin-top', top);
        $('.mushroom-container').append(shroom);
        let typeOfShroom = Math.random();
        if (typeOfShroom < .6) {
          shroom.addClass('normal');
        } else if ((typeOfShroom >= .6) && (typeOfShroom <.89)) {
          shroom.addClass('magic');
        } else if (typeOfShroom >= .89) {
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
        $('body').css('background', 'black');
        $('.poisonous').velocity({
            scale: 3,
        }, {duration: 30000, delay: 0});
        $('.normal').velocity({
          scale: 3,
      }, {duration: 30000, delay: 0});
        $('.magic').velocity({
          scale: 3,
      }, {duration: 30000, delay: 0});
      }  else if (round===2){
        $('body').css('background', 'url("https://media.giphy.com/media/26xBEez1vnVb2WgBq/giphy.gif")');
        $('.poisonous').velocity({
            scale: 1.5,
            translate3d: (100,100,100),
          }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.normal').velocity({
            scale: 1.5,
            translate3d: (100,100,100),
          }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.magic').velocity({
          scale: 1.5,
          translate3d: (100,100,100),
        }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
      } else if (round===3){
        $('body').css('background', 'url("https://media.giphy.com/media/26tn6Me6pD4Bel37G/giphy.gif")');
        $('body').css('background-size', 'cover');
        $('.poisonous').velocity({
            scale: 1.5,
            translateX: -140
          }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.normal').velocity({
          scale: 1.5,
          translateX: -140
        }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.magic').velocity({
          scale: 1.5,
          translateX: -140
        }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        // $('body').css('background-position', 'center');
      } else if (round===4) {
        $('body').css('background', 'url("https://media.giphy.com/media/3o6Zt5EmXj7jlzdFwQ/giphy.gif")');
        $('body').css('background-size', 'cover');
        $('.poisonous').velocity({
            scale: 1.5,
            translateX: -50,
            translateY: 150
          }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.normal').velocity({
          scale: 1.5,
          translateX: -50,
          translateY: 150
        }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
        $('.magic').velocity({
          scale: 1.5,
          translateX: -50,
          translateY: 150
        }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
      } else if (round===5){
        $('body').css('background', 'url("https://media.giphy.com/media/BlcWQ9L2VfOFO/giphy.gif")');
        $('body').css('background-size', 'cover');
        $('.poisonous').velocity({
            scale: 2,
            rotateZ: 1800,
            translate3d: 50
          }, {duration: 15000, loop: 1, delay: 0}).velocity('reverse');
        $('.normal').velocity({
          scale: 1,
          rotateZ: 3600,
          translate3d: 50
        }, {duration: 15000, loop: 1, delay: 0}).velocity('reverse');
        $('.magic').velocity({
          scale: 1.5,
          rotateZ: 2520,
          translate3d: 50
        }, {duration: 15000, loop: 1, delay: 0}).velocity('reverse');
        // building
      } else if (round===6){
        $('body').css('background', 'url("https://media.giphy.com/media/26BkLPYsD1Byn8hgI/giphy.gif")');
        $('body').css('background-size', 'cover');
        $('.poisonous').velocity({
          scale: 2,
          opacity: 0,
          }, {
          duration: 1000,
          loop: 30},
        );
        $('.normal').velocity({
          scale: 3,
          opacity: .2,
          }, {
          duration: 2000,
          loop: 15},
        );
        $('.magic').velocity({
          scale: 1.3,
          opacity: .1,
          }, {
          duration: 1500,
          loop: 23},
        );
      } else if (round===7){
        $('body').css('background', 'url("https://media.giphy.com/media/3o7WTFmAMnKd7DyrQY/giphy.gif")');
        $('body').css('background-size', 'cover');
        $('.poisonous').velocity({
          scale: -1,
          opacity: .3,
          translateZ: 40,
          rotateZ: 20
          }, {
          duration: 500,
          loop: 60},
        );
        $('.normal').velocity({
          scale: -.5,
          opacity: 0,
          translateZ: -70,
          rotateZ: -20
          }, {
          duration: 500,
          loop: 60},
        );
        $('.magic').velocity({
          scale: 1.2,
          opacity: .1,
          translateZ: 20,
          rotateZ: 20
          }, {
          duration: 500,
          loop: 60},
        );
      }
    }
  }

// the actual function that starts a new round

  const setUpRound = () => {
    // $('#show-round').text('Round '+ round.roundNumber);
    round.clearBoard();
    round.generateShrooms(round.roundNumber*10);
    round.setTimer();
    round.roundAnimation(round.roundNumber);
    eventHandlers.clickShrooms();

  }

// check whether user can move on to the next round

  const checkForWin = () => {
    if (score <= 0) {
      round.roundNumber=1;
      $('.game-container').css('display', 'none');
      $('#modal-lose').css('display', 'block');
      eventHandlers.restartGame();
    }  else if ( ((round.roundNumber === 1) && (score < 10)) ||((round.roundNumber===2) && (score<15)) || ((round.roundNumber=== 3 ) && (score < 25)) || ((round.roundNumber===4 ) && (score < 35)) || ((round.roundNumber=== 5 ) && (score < 45))  || ((round.roundNumber===6 ) && (score < 55)) || ((round.roundNumber===7 ) && (score < 66)) )  {
      round.roundRepeat();
    } else if ( ((score >= 10) && (round.roundNumber===1)) || ((score >= 15) && (round.roundNumber===2)) || ((score >= 25) && (round.roundNumber===3)) || ((score >= 35) && (round.roundNumber===4)) || ((score >= 45) && (round.roundNumber===5)) || ((score >= 55) && (round.roundNumber===6)) ) {
      round.roundNext();
    } else if ((round.roundNumber===7) && (score >= 66)) {
      $('body').css('background', 'url("https://media.giphy.com/media/R57GovrvicbrG/giphy.gif")');
      $('body').css('background-size', 'cover');
      $('body').css('background-position', 'center');
      $('#h3').hide();
      $('body').css('animation-name', 'colorRotate');
      $('body').css('animation-duration', '15s');
      $('body').css('animation-iteration-count', '5');
      $('.game-container').delay(10000).css('display', 'none');
      $('#modal-win').css('display', 'block');
      eventHandlers.newGame();
    }
  }

  // turn on event listener for start button when the page loads!
  eventHandlers.startGame();

})
