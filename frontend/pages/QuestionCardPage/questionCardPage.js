import { loadPage } from '../../../frontend/js/loadComponents.js';

export function init() {
  const quizId = localStorage.getItem('selectedQuizId');
  if (!quizId) {
    console.error('No quiz ID found. Redirecting to selection page.');
    loadPage('QuizSelectionPage');
    return;
  }

  console.log(`Loading questions for quiz ID: ${quizId}`);

  fetch('./frontend/db/quizDB.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1); // Skip header row
      const questions = rows
        .filter(row => row.split(',')[2] === quizId) // Match Quiz ID
        .reduce((acc, row) => {
          const [ , , , , questionId, questionText, answerId, answerText, isCorrect] = row.split(',');
          let question = acc.find(q => q.id === questionId);
          if (!question) {
            question = { id: questionId, text: questionText.trim(), options: [] };
            acc.push(question);
          }
          question.options.push({
            id: answerId.trim(),
            text: answerText.trim(),
            isCorrect: isCorrect.trim() === 'TRUE'
          });
          return acc;
        }, []);

      // Render Quiz UI
      let currentIndex = 0;
      const container = document.getElementById('questionContainer');
      const navigation = document.getElementById('navigationContainer');
      const answers = new Map();

      const renderQuestion = (index) => {
        const question = questions[index];
        container.innerHTML = '';

        // Question Title
        const title = document.createElement('h5');
        title.textContent = `Q${index + 1}/${questions.length}: ${question.text}`;
        container.appendChild(title);

        // Options List
        const list = document.createElement('ul');
        list.className = 'list-group';
        question.options.forEach(option => {
          const item = document.createElement('li');
          item.className = 'list-group-item';
          item.textContent = option.text;
          item.onclick = () => {
            answers.set(question.id, { answerId: option.id, questionText: question.text, selectedText: option.text, isCorrect: option.isCorrect });
            console.log(`Saved answer for Q${index + 1}: ${option.text}`);

            // Highlight selected answer
            Array.from(list.children).forEach(child => child.classList.remove('active')); // Remove active class from all
            item.classList.add('active'); // Add active class to the selected
          };
          list.appendChild(item);
        });
        container.appendChild(list);
      };

      const updateNavigation = () => {
        navigation.innerHTML = '';

        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentIndex === 0;
        prevButton.className = 'btn btn-secondary me-2';
        prevButton.onclick = () => {
          currentIndex--;
          renderQuestion(currentIndex);
          updateNavigation();
        };
        navigation.appendChild(prevButton);

        // Next/Finish Button
        const nextButton = document.createElement('button');
        nextButton.textContent = currentIndex === questions.length - 1 ? 'Finish' : 'Next';
        nextButton.className = 'btn btn-primary';
        nextButton.onclick = () => {
          if (currentIndex === questions.length - 1) {
            console.log('Quiz Complete:', Object.fromEntries(answers));
            localStorage.setItem('quizAnswers', JSON.stringify(Object.fromEntries(answers)));
            loadPage('ScorecardPage');
          } else {
            currentIndex++;
            renderQuestion(currentIndex);
            updateNavigation();
          }
        };
        navigation.appendChild(nextButton);
      };

      renderQuestion(currentIndex);
      updateNavigation();
    })
    .catch(err => console.error(`Error loading questions for quiz ID ${quizId}:`, err));
}
