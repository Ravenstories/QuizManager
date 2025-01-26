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
  console.log(`Loading page: ${lowercasePage}`);

  //fetch(`./frontend/pages/${lowercasePage}/${lowercasePage}.html`)
  fetch(`./frontend/pages/${page}/${page}.html`)
    .then(response => response.text())
    .then(async html => {
      appContainer.innerHTML = html;
      console.log(`Page ${lowercasePage} loaded successfully, html:`, html);
      /*
      try {
        const module = await import(`../../frontend/pages/${lowercasePage}/${lowercasePage}.js`);
        console.log(`Loading module for page test ${lowercasePage}, module:`, module);
        if (module.init) {
          module.init(); // Initialize the page if the `init` function exists
        }
      } catch (err) {
        console.error(`Error importing module for page ${lowercasePage}:`, err);
      }
      */
    })
    .catch(err => console.error(`Error loading page HTML for ${lowercasePage}:`, err));
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