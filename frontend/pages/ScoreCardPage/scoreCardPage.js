import { loadPage } from '/frontend/js/loadComponents.js';

export function init() {
  const answers = JSON.parse(localStorage.getItem('quizAnswers'));
  if (!answers) {
    console.error('No answers found. Redirecting to selection page.');
    loadPage('QuizSelectionPage');
    return;
  }

  console.log('Loading scorecard...');

  const container = document.getElementById('scorecardContainer');
  container.innerHTML = '';

  const scoreTitle = document.createElement('h3');
  scoreTitle.textContent = 'Your Scorecard';
  container.appendChild(scoreTitle);

  let correctCount = 0;

  Object.values(answers).forEach(({ questionText, selectedText, isCorrect }) => {
    const row = document.createElement('div');
    row.className = 'row mb-3';

    const questionCol = document.createElement('div');
    questionCol.className = 'col-8';
    questionCol.textContent = questionText;

    const resultCol = document.createElement('div');
    resultCol.className = 'col-4';
    resultCol.textContent = isCorrect ? 'Correct' : 'Wrong';
    if (isCorrect) correctCount++;

    row.appendChild(questionCol);
    row.appendChild(resultCol);
    container.appendChild(row);
  });

  const finalScore = document.createElement('h4');
  finalScore.textContent = `Final Score: ${correctCount}/${Object.keys(answers).length}`;
  container.appendChild(finalScore);
}