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


// Function to find the iframe and set its title attribute
function findIframeAndSetTitle() {
  let container = document.getElementById("dummy-chat-button-iframe");
  if (container) {
    container.title = "Chat window";
  }
}

// Create a MutationObserver instance
const observer = new MutationObserver(function(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if the iframe is added or modified
      const addedNodes = mutation.addedNodes;
      for (let node of addedNodes) {
        if (node.id === 'dummy-chat-button-iframe') {
          findIframeAndSetTitle();
          return; // Stop observing once the iframe is found
        }
      }
    }
  }
});

// Start observing changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Call the function once to handle the case when the iframe is already present
findIframeAndSetTitle();


// Find and assign all element to constants which are used to add the correct value for aria-label attribute
const quickBuyElements = document.querySelectorAll('.quick-buy span');
/*console.log(quickBuyElements);*/

const titleElements = document.querySelectorAll('.product-block__title-price .title');
/*console.log(titleElements);*/

const priceElements = document.querySelectorAll('.product-block__title-price .price .amount');
/*console.log(priceElements);*/

// Set aria-label attributes for quickBuyElements
quickBuyElements.forEach((element, index) => {
  element.setAttribute('aria-label', element.textContent);
});

const paymentButton = document.querySelectorAll('.payment-and-quantity__add');

paymentButton.forEach(button => {
  const loadingSpinner = button.querySelector('.loading-spinner');
  loadingSpinner.setAttribute('aria-label', 'Add to Cart');
});


// Get the element with the 'cart-promo__subheading' class
let element = document.querySelector('.cart-promo__subheading');

let url = window.location.href;

// Check if the URL matches any of the specified patterns
if (url === 'https://club120.com/blogs/news/about-club120') {
  element.textContent = 'About CLUB120';
} else if (url === 'https://club120.com/blogs/news/epitalon-spray-mechanism-of-action') {
  element.textContent = 'Epitalon Spray: Mechanism of Action';
} else if (url === 'https://club120.com/blogs/news/peptides-what-are-they') {
  element.textContent = 'Peptides: what are they';
}

/*I set the text content in the span tags in the breadcrumb class visually-hidden so that the text content is not duplicated*/
const breadcrumbActiveElements = document.querySelectorAll('.breadcrumb-active');
breadcrumbActiveElements.forEach(element => {
  const spanTags = element.querySelectorAll('span');

  spanTags.forEach(span => {
    span.classList.add('visually-hidden');
  });
});

// Set aria-label attributes for titleElements
titleElements.forEach((element, index) => {
  const correspondingQuickBuyElement = quickBuyElements[index];
  const correspondingPriceElement = priceElements[index];

  const title = element.textContent.trim();
  const price = correspondingPriceElement.textContent.trim().replace(/\.?0+$/, ''); // Remove trailing zeros

  const ariaLabel = `${title} - Price: ${price}`;
  correspondingQuickBuyElement.setAttribute('aria-label', ariaLabel);
});

// Set aria-label attributes for priceElements
priceElements.forEach((element, index) => {
  const correspondingQuickBuyElement = quickBuyElements[index];
  const correspondingTitleElement = titleElements[index];

  const title = correspondingTitleElement.textContent.trim();
  const price = element.textContent.trim().replace(/\.?0+$/, ''); // Remove trailing zeros

  const ariaLabel = `${title} - Price: ${price}`;
  correspondingQuickBuyElement.setAttribute('aria-label', ariaLabel);
});

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

/*Metatags for product cards*/
/*Title tag*/
function updateTitleAttribute() {
  let productNameElement = document.querySelector('.product-title');
  let productPriceElement = document.querySelector('.current-price');
  let url = window.location.href;

  if (productNameElement && productPriceElement && url.includes('products')) {
    let productName = productNameElement.innerText;
    let productPriceString = productPriceElement.innerText;

    let numericPriceString = productPriceString.replace(/[^\d.]/g, '');
    let productPrice = parseFloat(numericPriceString) / 100; // Divide by 100 to convert cents to dollars

    if (!isNaN(productPrice)) {
      let formattedPrice = "$" + Math.floor(productPrice);

      let title = `${productName}, buy for the best price, ${formattedPrice}, U.S. delivery`;
      document.title = title;
    }
  }
}

document.addEventListener('DOMContentLoaded', updateTitleAttribute);

/*content attribute value*/
function updateMetaTag() {
  let productNameElement = document.querySelector('.product-title');
  let productPriceElement = document.querySelector('.current-price');
  let brandNameElement = document.querySelector('.brand');
  let url = window.location.href;

  if (productNameElement && productPriceElement && brandNameElement && url.includes('products')) {
    let productName = productNameElement.innerText;
    let productPriceString = productPriceElement.innerText;
    let brandName = brandNameElement.querySelector('a').innerText;

    let numericPriceString = productPriceString.replace(/[^\d.]/g, '');
    let productPrice = parseFloat(numericPriceString) / 100; // Divide by 100 to convert cents to dollars

    if (!isNaN(productPrice)) {
      let formattedPrice = "$" + Math.floor(productPrice);

      let description = `Buy ${productName} for best cost, ${formattedPrice}. ${brandName}. Quality. Reviews. Discounts. U.S. delivery`;
      let metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', description);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'description');
        metaTag.setAttribute('content', description);
        document.head.appendChild(metaTag);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', updateMetaTag);

/*h1 tag content*/
function updateProductTitleTag() {
  let productNameElement = document.querySelector('.product-title');
  let brandNameElement = document.querySelector('.brand');
  let url = window.location.href;

  if (productNameElement && brandNameElement && url.includes('products')) {
    let brandName = brandNameElement.querySelector('a').innerText;
    productNameElement.innerText += ', ' + brandName;
  }
}

document.addEventListener('DOMContentLoaded', updateProductTitleTag);


// Find and insert breadcrumbs inside the main container, which is in all sections
document.addEventListener('DOMContentLoaded', function() {
  let breadcrumbs = document.querySelector('.breadcrumbs');

  let sectionContainer = document.querySelector('.section.container');
  if (sectionContainer !== null) {
    sectionContainer.insertBefore(breadcrumbs, sectionContainer.firstChild);
  }

  let collectionContainer = document.querySelector('.section.collection-page .container');
  if (collectionContainer !== null) {
    collectionContainer.insertBefore(breadcrumbs, collectionContainer.firstChild);
  }

  let productContainer = document.querySelector('.section.product-container');
  if (productContainer !== null) {
    productContainer.insertBefore(breadcrumbs, productContainer.firstChild);
  }
});

