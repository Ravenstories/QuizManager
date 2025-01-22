// Handles loading of quiz categories from a CSV file
class QuizCategoryLoader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async loadCategories() {
        const response = await fetch(this.filePath);
        const data = await response.text();
        return this.parseCSV(data);
    }

    parseCSV(data) {
        const rows = data.split('\n');
        const categories = {};

        rows.forEach(row => {
            const [categoryId, categoryName] = row.split(',');
            if (categoryId && categoryName && !categories[categoryId]) {
                categories[categoryId] = categoryName.trim();
            }
        });

        return Object.entries(categories).map(([id, name]) => ({ id, name }));
    }
}