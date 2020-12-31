//Span scores
const player1_score = document.querySelector('#player_one-score');
const player2_score = document.querySelector('#player_two-score');

//Dropdown select max score
const select_dropdown = document.querySelector('.choose_final-score');

//Buttons
const player1_button = document.getElementById('plus_player-one');
const player2_button = document.getElementById('plus_player-two');
const reset_button = document.getElementById('reset');

//Scores
let maxScore = 0;

let score1 = 0;
let score2 = 0;

select_dropdown.addEventListener('change', (e) => {
  maxScore = e.target.value;
  player1_button.disabled = false;
  player2_button.disabled = false;
  reset_button.disabled = false;
});

//Player one score
player1_button.addEventListener('click', () => {
  score1++;
  player1_score.innerHTML = score1;

  //Check
  if (score1 == maxScore) {
    player1_score.classList.add('green-text', 'text-darken-3');
    player1_button.disabled = true;
    player2_button.disabled = true;
    player2_score.classList.add('red-text', 'text-darken-3');
  }
});

player2_button.addEventListener('click', () => {
  score2++;
  player2_score.innerHTML = score2;

  //Check
  if (score2 == maxScore) {
    player2_score.classList.add('green-text', 'text-darken-3');
    player1_button.disabled = true;
    player2_button.disabled = true;
    player1_score.classList.add('red-text', 'text-darken-3');
  }
});

reset_button.addEventListener('click', resetAll);

function resetAll() {
  maxScore = 0;
  score1 = 0;
  score2 = 0;
  player1_score.innerHTML = score1;
  player2_score.innerHTML = score2;
  select_dropdown.value = '';
  player1_button.disabled = true;
  player2_button.disabled = true;
  reset_button.disabled = true;
  player1_score.className = '';
  player2_score.className = '';
}
