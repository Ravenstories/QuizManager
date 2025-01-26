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
  const basePath = "./frontend/pages/";
  const lowerCasePage = page.charAt(0).toLowerCase() + page.slice(1);
  
  console.log(`Loading page: ${page}`);
  console.log(lowerCasePage);
  
  fetch(`${basePath}${page}/${lowerCasePage}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Path: ${basePath}${page}/${lowerCasePage}.html`);
      }
      return response.text();
    })
    .then(async html => {
      appContainer.innerHTML = html;
      console.log(`Page ${page} loaded successfully, html:`, html);
      try {
        const module = await import(`../.${basePath}${page}/${lowerCasePage}.js`);
        console.log(`Module loaded for page ${page}:`, module);
        if (module.init) {
          module.init(); // Initialize the page if the `init` function exists
        }
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
  loadPage("Home"); // Load the default page (home)
  setupNavigation(); // Set up navigation handling
}