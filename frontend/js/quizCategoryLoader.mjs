// Handles loading of quiz categories from a CSV file
export default class QuizCategoryLoader {
    constructor(filePath) {
      this.filePath = filePath;
    }
  
    async loadCategoriesWithQuizzes() {
      const response = await fetch(this.filePath);
      const data = await response.text();
      return this.parseCSV(data);
    }
  
    parseCSV(data) {
        const rows = data.split("\n").slice(1); // Remove the first line (headers)
        const categories = {};
    
        rows.forEach(row => {
          const [categoryId, categoryName, quizId, quizName] = row.split(",");
          if (categoryId && categoryName) {
            if (!categories[categoryId]) {
              categories[categoryId] = { name: categoryName.trim(), quizzes: [] };
            }
            if (quizId && quizName) {
              const existingQuiz = categories[categoryId].quizzes.find(quiz => quiz.id === quizId.trim());
              if (!existingQuiz) {
                categories[categoryId].quizzes.push({ id: quizId.trim(), name: quizName.trim() });
              }
            }
          }
        });
    
        return Object.entries(categories).map(([id, { name, quizzes }]) => ({ id, name, quizzes }));
      }
  }
  