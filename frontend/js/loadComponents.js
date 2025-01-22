document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  function loadComponent(component, target) {
    fetch(`frontend/components/${component}.html`)
      .then(response => response.text())
      .then(data => {
        document.querySelector(target).innerHTML = data;
      });
  }

  // Load header and footer components
  loadComponent("header", "header");
  loadComponent("footer", "footer");

  function loadPage(page) {
    // Convert the page name to lowercase for consistency
    const lowercasePage = page.toLowerCase();
    console.log(`Loading page: ${lowercasePage}`); // Log to see which page is being requested

    // Fetch the page HTML content
    fetch(`frontend/pages/${lowercasePage}/${lowercasePage}.html`)
      .then(response => response.text())
      .then(data => {
        appContainer.innerHTML = data;

        // Corrected path for importing JavaScript file
        if (lowercasePage === 'start') {
          console.log(`Importing module: ./pages/${lowercasePage}/${lowercasePage}.js`);
          import(`/frontend/pages/${lowercasePage}/${lowercasePage}.js`)
            .then(module => {
              module.init();  
            })
            .catch(err => console.error('Error loading script:', err));
        }
      })
      .catch(err => console.error('Error loading page HTML:', err));
  }
      
  // Load Home as default
  loadPage("Home");

  // Add event listeners for navigation links
  document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const page = e.target.getAttribute("data-link");
      loadPage(page);
    }
  });
});
