var scriptElement = document.createElement('script');

// Set the source attribute to the local jQuery file
scriptElement.src = 'path/to/jquery-3.6.4.min.js';

// Append the script element to the head tag
document.head.appendChild(scriptElement);

// Wait for jQuery to load before using it
scriptElement.onload = function() {
    // Your JavaScript code using jQuery
    $(document).ready(function() {
        console.log("$", window.jQuery);
    });
};
