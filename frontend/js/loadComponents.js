// loadComponents.js
document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app");
  
    function loadPage(page) {
      fetch(`frontend/pages/${page}/${page}.html`)
        .then(response => response.text())
        .then(data => {
          appContainer.innerHTML = data;
          if (page === 'start') {
            import(`./pages/Start/start.js`).then(module => {
              module.init();  // Assuming start.js exports an init function to set up page functionality
            });
          }
        });
    }
  
    // Example of setting the default page to start.html
    loadPage("Start");
  
    // Add event listeners for navigation links
    document.querySelectorAll("[data-link]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.getAttribute("data-link");
        loadPage(page);
      });
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
