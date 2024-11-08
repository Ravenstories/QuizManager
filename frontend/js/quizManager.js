// app.js (for quiz functionality)
class QuizManager {
    constructor() {
        this.quizzes = [];  // Stores all quizzes
    }

    addQuestion(quizId, question) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        if (quiz) {
            quiz.questions.push(question);
        }
    }

    createQuiz(title, category) {
        const newQuiz = {
            id: Date.now(),
            title,
            category,
            questions: []
        };
        this.quizzes.push(newQuiz);
        return newQuiz.id;
    }
}

function displayQuestion(question) {
    const questionContainer = document.createElement('div');
    questionContainer.innerHTML = `
        <h3>${question.questionText}</h3>
        ${question.options.map(option => `
            <button class="option-btn">${option}</button>
        `).join('')}
    `;
    document.getElementById('app').appendChild(questionContainer);
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('option-btn')) {
        const chosenOption = e.target.textContent;
        const isCorrect = currentQuestion.correctAnswers.includes(chosenOption);
        e.target.classList.add(isCorrect ? 'correct' : 'incorrect');
    }
});


// Example usage
const quizManager = new QuizManager();
const quizId = quizManager.createQuiz("History Basics", "History");
quizManager.addQuestion(quizId, {
    questionText: "Who discovered America?",
    options: ["Columbus", "Vespucci", "Cook", "Cortez"],
    correctAnswers: ["Columbus"]
});
