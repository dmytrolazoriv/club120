// Adding to all images a title attribute that takes as its value the value of the alt attribute plus the string specified in the code

// Get all img elements with class "rimage__image"
const images = document.querySelectorAll('img.rimage__image');

// Loop through all the images and add the title attribute
images.forEach((image) => {
  // Get the alt attribute value
  const alt = image.getAttribute('alt');
  // Set the title attribute with the value of alt plus " - photo"
  image.setAttribute('title', alt + ' - photo');
});



// For all pages with the corresponding url addresses I add a meta tag with the following attributes
// ===== Not needed yet, since everything works due to liquid code in the theme.liquid file =====
// document.addEventListener('DOMContentLoaded', function() {
//     // Get the URL of the current page
//     const currentUrl = window.location.href;
  
//     // Define an array of regular expressions to match against the URL
//     const regexPatterns = [
//       /\?q=/,
//       /\/search/,
//       /\?filter=/,
//       /\?sort=/,
//       /\/checkouts\//,
//       /\/account/,
//       /\/cart/,
//     ];
  
//     // Check if the current URL matches any of the regular expressions
//     if (regexPatterns.some(pattern => pattern.test(currentUrl))) {
//       // Create a new meta tag element and set its attributes
//       const metaTag = document.createElement('meta');
//       metaTag.setAttribute('name', 'robots');
//       metaTag.setAttribute('content', 'noindex, nofollow');
  
//       // Add the new meta tag element to the head of the document
//       document.head.appendChild(metaTag);
//     }
//   });
  