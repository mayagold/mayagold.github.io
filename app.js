

// JQUERY WINDOW ONLOAD
$(() => {
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
    // click on mushrooms: changes the score based on their class, animates them
    clickShrooms() {
      $('img').on('click', (e) => {
        console.log(score);
        $(e.currentTarget).off();
        if (($(e.currentTarget).attr('class') === 'poisonous velocity-animating') || ($(e.currentTarget).attr('class') === 'poisonous')) {
          score--;
          $(e.currentTarget).css({'animation-name': 'vibrate', 'animation-duration': '.1s', 'animation-iteration-count': '20', 'opacity': '.2'
          });
          $('#show-power').text('Mr. Fun Guy says: That one was poisonous! Your points: ' + score );
        } else if (($(e.currentTarget).attr('class') === 'magic') || ($(e.currentTarget).attr('class') === 'magic velocity-animating')) {
          score++;
          $(e.currentTarget).css({ 'animation-name': 'spin', 'animation-duration': '10s', 'animation-iteration-count': '1', 'opacity': '.2'});
          $('#show-power').text('Mr. Fun Guy says: You found a magic mushroom! Your points: ' + score);
        } else if (($(e.currentTarget).attr('class') === 'normal') || ($(e.currentTarget).attr('class') === 'normal velocity-animating')) {
          $(e.currentTarget).css('opacity', '0');
          $('#show-power').text('Mr. Fun Guy says: Keep trying... Your points: ' + score);
        }
      });
    },
    // click on next round button
    nextRound() {
      $('#next-button').on('click', () => {
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('#next-button').off();
        setUpRound();
      });
    },
    // click on repeat round button
    repeatRound() {
      $('#repeat-button').on('click', () => {
        $('.modal').hide();
        $('.game-container').css('display', 'block');
        $('.mushroom-container').css('display', 'block');
        $('#repeat-button').off();
        setUpRound();
      });
    },
    // click on start over button
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
    // click on new game button
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
        shroom.css('margin-left', left);
        shroom.css('margin-top', top);
        $('.mushroom-container').append(shroom);
        let typeOfShroom = Math.random();
        if (typeOfShroom < .6) {
          shroom.addClass('normal');
        } else if ((typeOfShroom >= .6) && (typeOfShroom <.92)) {
          shroom.addClass('magic');
        } else if (typeOfShroom >= .92) {
          shroom.addClass('poisonous');
        }
      }
    },
    // clear timer, reset timer to 30s
    setTimer() {
      time=30;
      const timer = setInterval( ()=> {
        time--
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
    // animations for each round
    roundAnimation(round) {
      if (round===1){
        $('body').css('background', 'black');
        animations.grow($('.poisonous'));
        animations.grow($('.magic'));
        animations.grow($('.normal'));
      }  else if (round===2){
        $('body').css('background', 'url("https://media.giphy.com/media/26xBEez1vnVb2WgBq/giphy.gif")');
        animations.wavey($('.poisonous'));
        animations.wavey($('.magic'));
        animations.wavey($('.normal'));
      } else if (round===3){
        $('body').css('background', 'url("https://media.giphy.com/media/26tn6Me6pD4Bel37G/giphy.gif")');
        $('body').css('background-size', 'cover');
        animations.spin($('.poisonous'));
        animations.spin($('.magic'));
        animations.spin($('.normal'));
      } else if (round===4) {
        $('body').css('background', 'url("https://media.giphy.com/media/126jxQSflEozPW/giphy.gif")');
        $('body').css('background-size', 'cover');
        animations.slideHoriz($('.poisonous'));
        animations.slideHoriz($('.magic'));
        animations.slideHoriz($('.normal'));
      } else if (round===5){
        $('body').css('background', 'url("https://media.giphy.com/media/U3WiLFkGIS36M/giphy.gif")');
        $('body').css('background-size', 'cover');
        animations.slideDiag($('.poisonous'));
        animations.slideDiag($('.magic'));
        animations.slideDiag($('.normal'));
      } else if (round===6){
        $('body').css('background', 'url("https://media.giphy.com/media/26BkLPYsD1Byn8hgI/giphy.gif")');
        $('body').css('background-size', 'cover');
        animations.disappearPoison($('.poisonous'));
        animations.disappearMagic($('.magic'));
        animations.disappearNormal($('.normal'));
      } else if (round===7){
        $('body').css('background', 'url("https://media.giphy.com/media/xUPGczaIFcIXgAVK4o/giphy.gif")');
        $('body').css('background-size', 'cover');
        animations.popPoison($('.poisonous'));
        animations.popMagic($('.magic'));
        animations.popNormal($('.normal'));
      }
    }
  }

  const animations = {
    grow(type) {
          type.velocity({
          scale: 3,
        }, {duration: 30000, delay: 0});
    },
    wavey(type) {
      type.velocity({
        scale: 1.5,
        translate3d: (100,100,100),
      }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
    },
    spin(type) {
      type.velocity({
        scale: 2,
        rotateZ: 3600,
        translate3d: 50,
      }, {duration: 15000, loop: 1, delay: 0}).velocity('reverse');
    },
    slideHoriz(type) {
      type.velocity({
        scale: 1.5,
        translateX: -140
      }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
    },
    slideDiag(type) {
      type.velocity({
        scale: 1.5,
        translateX: -50,
        translateY: 150
      }, {duration: 1000, loop: 30, delay: 0}).velocity('reverse');
    },
    disappearPoison(type) {
      type.velocity({
        scale: 2,
        opacity: 0,
        }, {  duration: 1000, loop: 30},);
    },
    disappearNormal(type) {
      type.velocity({
        scale: 3,
        opacity: .2,
        }, { duration: 2000, loop: 15}, );
    },
    disappearMagic(type) {
      type.velocity({
        scale: 1.3,
        opacity: .1,
      }, {  duration: 1500,  loop: 23}, );
    },
    popPoison(type) {
      type.velocity({
        scale: -1,
        opacity: .3,
        translateZ: 40,
        rotateZ: 20
        }, {  duration: 500, loop: 60}, );
    },
    popNormal(type) {
      type.velocity({
        scale: -.5,
        opacity: 0,
        translateZ: -70,
        rotateZ: -20
        }, {  duration: 500, loop: 60}, );
    },
    popMagic(type) {
      type.velocity({
        scale: 1.2,
        opacity: .1,
        translateZ: 20,
        rotateZ: 20
        }, { duration: 500, loop: 60}, );
    }
  }

  // the actual function that starts a new round
  const setUpRound = () => {
    round.clearBoard();
    round.generateShrooms(15);
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
    }  else if ( ((round.roundNumber === 1) && (score < 10)) ||((round.roundNumber===2) && (score<15)) || ((round.roundNumber=== 3 ) && (score < 20)) || ((round.roundNumber===4 ) && (score < 25)) || ((round.roundNumber=== 5 ) && (score < 30))  || ((round.roundNumber===6 ) && (score < 35)) || ((round.roundNumber===7 ) && (score < 40)) )  {
      round.roundRepeat();
    } else if ( ((score >= 10) && (round.roundNumber===1)) || ((score >= 15) && (round.roundNumber===2)) || ((score >= 20) && (round.roundNumber===3)) || ((score >= 25) && (round.roundNumber===4)) || ((score >= 30) && (round.roundNumber===5)) || ((score >= 35) && (round.roundNumber===6)) ) {
      round.roundNext();
    } else if ((round.roundNumber===7) && (score >= 40)) {
      $('body').css({ 'background': 'url("https://media.giphy.com/media/R57GovrvicbrG/giphy.gif")', 'background-size': 'cover', 'background-position': 'center' });
      $('#h3').hide();
      $('.game-container').delay(10000).css('display', 'none');
      $('#modal-win').css('display', 'block');
      eventHandlers.newGame();
    }
  }
  // turn on event listener for start button when the page loads!
  eventHandlers.startGame();

})
