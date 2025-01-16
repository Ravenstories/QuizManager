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
/*
  function loadPage(page) {
    fetch(`frontend/pages/${page}/${page}.html`)
      .then(response => response.text())
      .then(data => {
        appContainer.innerHTML = data;
        if (page.toLowerCase() === 'start') {
          import(`./pages/Start/start.js`).then(module => {
            module.init();  // Assuming start.js exports an init function to set up page functionality
          });
        }
      });
  }*/
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
                  module.init();  // Assuming start.js exports an init function to set up page functionality
                })
                .catch(err => console.error('Error loading script:', err));
            }
          })
          .catch(err => console.error('Error loading page HTML:', err));
      }
      


  // Example of setting the default page to home.html
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

  

/** Old version of loadComponents.js
// Function to load components dynamically into the #app container
export function loadComponent(componentName) {
    const appContainer = document.getElementById('app');
    
    // Define the file paths for the component HTML and its corresponding JS
    let componentHTMLPath = '';
    let componentJSPath = '';
    
    switch (componentName) {
        case 'start':
            componentHTMLPath       = 'frontend/pages/start/start.html';
            componentJSPath         = 'frontend/pages/start/start.js';
            break;
        default:
            componentHTMLPath       = 'frontend/pages/start/start.html';
            componentJSPath         = 'frontend/pages/start/start.js';
    }

    // Fetch the component HTML and inject it into the app container
    fetch(componentHTMLPath)
        .then(response => response.text())
        .then(data => {
            appContainer.innerHTML = data;  // Inject the HTML into the app container

            // Now that the HTML is loaded, dynamically load the corresponding JS
            loadScript(componentJSPath);
        })
        .catch(error => {
            console.error('Error loading component:', error);
            appContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });
}

// Function to dynamically load a script
function loadScript(scriptPath) {
    const script = document.createElement('script');
    script.src = scriptPath;
    script.type = 'module';
    script.defer = true;
    document.body.appendChild(script);  // Add the script to the body
}

window.loadComponent = loadComponent;

// Load the default component (start) on page load
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('start');  // Load the start component by default
});
 */
