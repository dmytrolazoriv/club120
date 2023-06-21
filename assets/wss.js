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

/*Generate the breadcrumb markup dynamically*/
function generateBreadcrumbMarkup() {
  let breadcrumbList = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };

  let pathSegments = window.location.pathname.split('/').filter(function(segment) {
    return segment !== '';
  });

  let baseUrl = window.location.origin + '/';
  let position = 1;

  // Generate breadcrumb items dynamically
  for (let i = 0; i < pathSegments.length; i++) {
    baseUrl += pathSegments[i] + '/';
    position++;

    let name = formatName(pathSegments[i]);

    let breadcrumbItem = {
      "@type": "ListItem",
      "position": position,
      "item": {
        "@id": baseUrl,
        "name": name
      }
    };

    breadcrumbList.itemListElement.push(breadcrumbItem);
  }

  let breadcrumbMarkup = document.createElement('script');
  breadcrumbMarkup.type = 'application/ld+json';
  breadcrumbMarkup.innerHTML = JSON.stringify(breadcrumbList);

  let titleElement = document.getElementsByTagName('title')[0];
  let headElement = document.getElementsByTagName('head')[0];
  headElement.insertBefore(breadcrumbMarkup, titleElement.nextSibling);
}

// Format the name by removing dashes and capitalizing first letter of each word
function formatName(name) {
  let formattedName = name.replace(/-/g, ' ');
  formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase();
  return formattedName;
}

// Call the generateBreadcrumbMarkup function when the page is loaded
window.addEventListener('DOMContentLoaded', generateBreadcrumbMarkup);


/*Add width and height attributes for images*/
const logoContainer = document.querySelector('.footer-logo-container');
const logoImg = logoContainer.querySelector('img');

logoImg.setAttribute('width', '133');
logoImg.setAttribute('height', '43');
logoImg.setAttribute('alt', 'Footer logo');

const breadcrumbActive = document.querySelector('.breadcrumb-active');
const spanElement = breadcrumbActive.querySelector('span');
const spanText = spanElement.textContent;

const textNode = document.createTextNode(spanText);
breadcrumbActive.appendChild(textNode);

