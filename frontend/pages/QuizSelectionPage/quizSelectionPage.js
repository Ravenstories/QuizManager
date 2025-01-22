// Handles the rendering of the quiz selection page
class QuizSelectionPage {
    constructor(categoryLoader) {
        this.categoryLoader = categoryLoader;
    }

    async render() {
        const categories = await this.categoryLoader.loadCategories();
        const container = document.getElementById('quizSelectionContainer');
        container.innerHTML = '';
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.onclick = () => this.selectCategory(category.id);
            container.appendChild(button);
        });
    }

    selectCategory(categoryId) {
        console.log(`Selected category ID: ${categoryId}`);
        // Logic for starting the quiz in the selected category
    }
}