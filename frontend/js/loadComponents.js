// Function to load reusable components (e.g., header, footer)
export function loadComponent(component, targetSelector) {
  fetch(`./frontend/components/${component}.html`)
    .then(response => response.text())
    .then(html => {
      document.querySelector(targetSelector).innerHTML = html;
    })
    .catch(err => console.error(`Error loading component ${component}:`, err));
}

// Function to load page content and initialize its JS module
export function loadPage(page) {
  const appContainer = document.getElementById("app");
  const lowercasePage = page.toLowerCase();
  console.log(`Loading page: ${page}`);

  //fetch(`./frontend/pages/${lowercasePage}/${lowercasePage}.html`)
  fetch(`./frontend/pages/${page}/${page}.html`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Path: ./frontend/pages/${page}/${page}.html`);
    }
    return response.text();
  })
  .then(async html => {
    console.log(`HTML fetched for page ${page}:`, html);
    appContainer.innerHTML = html;
    try {
      const module = await import(`../../frontend/pages/${page}/${page}.js`);
      console.log(`Module loaded for page ${page}:`, module);
    } catch (err) {
      console.error(`Error loading module for page ${page}:`, err);
    }
  })
  .catch(err => console.error(`Error loading page ${page}:`, err));
}

// Function to set up navigation links and handle their click events
export function setupNavigation() {
  document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const page = e.target.getAttribute("data-link");
      loadPage(page);
    }
  });
}

// Initialize reusable components and default page
export function initComponents() {
  loadComponent("header", "header"); // Load header
  loadComponent("footer", "footer"); // Load footer
  loadPage("home"); // Load the default page (home)
  setupNavigation(); // Set up navigation handling
}