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
    const lowercasePage = page.toLowerCase();
    console.log(`Loading page: ${lowercasePage}`);
  
    fetch(`frontend/pages/${lowercasePage}/${lowercasePage}.html`)
      .then(response => response.text())
      .then(async data => {
        appContainer.innerHTML = data;
        try {
          const module = await import(`/frontend/pages/${lowercasePage}/${lowercasePage}.js`);
          if (module.init) {
            module.init();
          } else {
            console.warn(`No init function found for page ${lowercasePage}`);
          }
        } catch (err) {
          console.error(`Error importing module for page ${lowercasePage}:`, err);
        }
      })
      .catch(err => console.error(`Error loading page HTML for ${lowercasePage}:`, err));
  }

  loadPage("Home");

  document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const page = e.target.getAttribute("data-link");
      loadPage(page);
    }
  });
});

