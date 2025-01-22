export default class QuizSelectionPage {
    constructor(categoryLoader) {
      this.categoryLoader = categoryLoader;
    }
  
    async render() {
      const categories = await this.categoryLoader.loadCategoriesWithQuizzes();
      const container = document.getElementById("quizSelectionContainer");
      container.innerHTML = "";
  
      categories.forEach(category => {
        // Create category dropdown
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "mb-3";
  
        const categoryButton = document.createElement("button");
        categoryButton.className = "btn btn-secondary btn-block w-100 text-start";
        categoryButton.type = "button";
        categoryButton.setAttribute("data-bs-toggle", "collapse");
        categoryButton.setAttribute("data-bs-target", `#category-${category.id}`);
        categoryButton.textContent = category.name;
  
        // Create quizzes list
        const quizList = document.createElement("ul");
        quizList.className = "collapse list-group";
        quizList.id = `category-${category.id}`;
  
        category.quizzes.forEach(quiz => {
          const quizItem = document.createElement("li");
          quizItem.className = "list-group-item";
          quizItem.textContent = quiz.name;
          quizItem.onclick = () => this.selectQuiz(quiz.id);
          quizList.appendChild(quizItem);
        });
  
        // Append to container
        categoryDiv.appendChild(categoryButton);
        categoryDiv.appendChild(quizList);
        container.appendChild(categoryDiv);
      });
    }
  
    selectQuiz(quizId) {
      console.log(`Selected quiz ID: ${quizId}`);
      // Logic to start the quiz
    }
  }
  
  export function init() {
    const categoryLoader = new QuizCategoryLoader("frontend/db/quizDB.csv");
    const selectionPage = new QuizSelectionPage(categoryLoader);
    selectionPage.render();
  }