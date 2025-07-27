"use strict;"

let field;
let ball;
let paddle1;
let paddle2;
let scores;
let buttons;


document.addEventListener('DOMContentLoaded', function () {
  launch_game()
});


function launch_game() {
  document.addEventListener("keydown", track_player_input);
  document.addEventListener("keyup", track_player_input);

  field = document.querySelector('body').getBoundingClientRect();

  ball = {
    width: 64, height: 64,
    x: 0, y: 0,
    vx: 10, vy: 10,
    element: document.querySelector('#ball'),
  };

  paddle1 = {
    width: 24, height: 192,
    x: field.x, y: field.height / 2 - 192 / 2,
    element: document.querySelector('#paddle1'),
  };

  paddle2 = {
    width: 24, height: 192,
    x: field.width - 24, y: field.height / 2 - 192 / 2,
    element: document.querySelector('#paddle2'),
  };

  scores = {
    player1: 0,
    player2: 0,
    element: document.querySelector('#scores'),
  };

  buttons = {
    p1_up: false,
    p1_down: false,
    p2_up: false,
    p2_down: false,
  }

  new_round();
  setInterval(update, 10);
}


function track_player_input(event) {
  if(event.type == "keydown") {
    switch(event.keyCode) {
      case 65: buttons.p1_up = true; break;
      case 90: buttons.p1_down = true; break;
      case 38: buttons.p2_up = true; break;
      case 40: buttons.p2_down = true; break;
    }
  } else if(event.type == "keyup") {
    switch(event.keyCode) {
      case 65: buttons.p1_up = false; break;
      case 90: buttons.p1_down = false; break;
      case 38: buttons.p2_up = false; break;
      case 40: buttons.p2_down = false; break;
    }
  }
}


function new_round(player) {
  ball.x = field.width / 2 - ball.width / 2;
  ball.y = field.height / 2 - ball.height / 2;
  let angle = Math.random() * Math.PI / 2 - Math.PI / 4;
  if(Math.random() < .5) angle += Math.PI;
  ball.vx = Math.cos(angle) * 6;
  ball.vy = Math.sin(angle) * 6;
}


function update() {
  field = document.querySelector('body').getBoundingClientRect();

  if(buttons.p1_up && paddle1.y > 10) paddle1.y -= 10;
  if(buttons.p1_down && paddle1.y + paddle1.height < field.height - 10) paddle1.y += 10;
  if(buttons.p2_up && paddle2.y > 10) paddle2.y -= 10;
  if(buttons.p2_down && paddle2.y + paddle2.height < field.height - 10) paddle2.y += 10;

  ball.x += ball.vx;
  ball.y += ball.vy;

  // top and bottom collisions
  if(ball.y < field.y) { ball.y = 0; ball.vy = -ball.vy; }
  else if(ball.y + ball.height > field.y + field.height) { ball.y = field.y + field.height - ball.height; ball.vy = -ball.vy; }

  // paddle collisions
  if(ball.x < paddle1.x + paddle1.width && ball.y - ball.height / 2 >= paddle1.y && ball.y + ball.height * 0.5 < paddle1.y + paddle1.height) { ball.x = paddle1.x + paddle1.width; ball.vx = -ball.vx; }
  else if(ball.x + ball.width > paddle2.x && ball.y - ball.height / 2 >= paddle2.y && ball.y + ball.height * 0.5 < paddle2.y + paddle2.height) { ball.x = paddle2.x - ball.width; ball.vx = -ball.vx; }

  // scored points
  if(ball.x < -ball.width) {
    scores.player2 += 1;
    new_round();
  } else if(ball.x > field.width) {
    scores.player1 += 1;
    new_round();
  }

  ball.element.style.left = ball.x + "px";
  ball.element.style.top = ball.y + "px";
  paddle1.element.style.left = paddle1.x + "px";
  paddle1.element.style.top = paddle1.y + "px";
  paddle2.element.style.left = paddle2.x + "px";
  paddle2.element.style.top = paddle2.y + "px";
  scores.element.innerText = scores.player1 + " - " + scores.player2;
}
