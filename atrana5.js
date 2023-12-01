var scriptElement = document.createElement('script');

// Set the source attribute to the local jQuery file
scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';

// Append the script element to the head tag
document.head.appendChild(scriptElement);

// Wait for jQuery to load before using it
scriptElement.onload = function() {
    // Your JavaScript code using jQuery
    $(document).ready(function() {
        console.log("$", window.jQuery);
    });
};
