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

if (breadcrumbActive !== null) {
  const spanElement = breadcrumbActive.querySelector('span');

  if (spanElement !== null) {
    const spanText = spanElement.textContent;
    const textNode = document.createTextNode(spanText);
    breadcrumbActive.appendChild(textNode);
  }
}

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
  if (sectionContainer !== null && breadcrumbs instanceof Node) {
    sectionContainer.insertBefore(breadcrumbs, sectionContainer.firstChild);
  }

  let collectionContainer = document.querySelector('.section.collection-page .container');
  if (collectionContainer !== null && breadcrumbs instanceof Node) {
    collectionContainer.insertBefore(breadcrumbs, collectionContainer.firstChild);
  }

  let productContainer = document.querySelector('.section.product-container');
  if (productContainer !== null && breadcrumbs instanceof Node) {
    productContainer.insertBefore(breadcrumbs, productContainer.firstChild);
  }
});

// Organization markup
if (window.location.pathname === "/") {
  let script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "MedicalBusiness",
    "url": "https://club120.com/",
    "priceRange": "$$$",
    "name": "CLUB120 - Bioregulators, Dietary Supplements & Health Products",
    "logo": "//club120.com/cdn/shop/files/e25510fab3c33bbc9ecb389f0219429d_500x.svg?v=1679069722",
    "image": [
      "https://club120.com/cdn/shop/collections/v54_460x@2x.jpg",
      "https://club120.com/cdn/shop/collections/v61_460x@2x.jpg",
      "https://club120.com/cdn/shop/products/EPITIDE1_1_720x@2x.jpg"
    ],
    "sameAs": [
      "https://www.facebook.com/sharer.php?u=https%3A%2F%2Fclub120.com%2Fblogs%2Fnews",
      "https://twitter.com/intent/tweet?text=News&url=https://club120.com/blogs/news",
      "https://vk.com/peptidy_vitaminy_club120",
      "https://t.me/club120russia"
    ],
    "currenciesAccepted": "USD",
    "paymentAccepted": "cash, credit card",
    "address": {
      "@type": "PostalAddress",
      "@id": "https://club120.com/",
      "name": "CLUB120 FL, USA",
      "addressRegion": ", Florida",
      "addressLocality": "St. Petersburg",
      "postalCode": "33702",
      "streetAddress": "7901 4th St N STE 300",
      "telephone": "7867538579",
      "email": "info@club120.com",
      "addressCountry": "USA"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "7867538579",
        "contactType": "customer support"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "21:00"
      }
    ]
  });
  document.head.appendChild(script);
}

// Search line markup

if (window.location.pathname === "/") {
  let script = document.createElement("script");
  script.type = "application/ld+json";

  let scriptContent = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "https://club120.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://club120.com/search?type={query}"
      },
      "query-input": "required name=query"
    }
  };

  script.text = JSON.stringify(scriptContent);

  document.head.appendChild(script);
}


// title and description meta tags
  function createAndAppendMetaTag(name, content) {
    let metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    metaTag.setAttribute("content", content);

    let headTag = document.querySelector("head");
    headTag.appendChild(metaTag);
  }

  function updateDocumentTitle(title) {
    document.title = title;
  }

  const pathname = window.location.pathname;

  switch (true) {
    case pathname === "/":
      createAndAppendMetaTag("description", "CLUB120: The brand store for Khavinson peptides, promoting health and longevity. Quality, reviews, and discounts available. In our online store, you can make payments via credit card or PayPal.");
      updateDocumentTitle("Supplements in the online store CLUB 120: The best brand store for health and longevity.");
      break;

    case pathname.includes("/blogs/news/epitalon-spray-mechanism-of-action"):
      createAndAppendMetaTag("description", "Discover how Epitalon Spray works on the body's cells and tissues, promoting anti-aging effects and overall health benefits. Learn about the science behind this innovative supplement.");
      updateDocumentTitle("Epitalon Spray Mechanism of Action: Benefits for the Body.");
      break;

    case pathname.includes("/blogs/news/bioregulators-what-are-they"):
      updateDocumentTitle("Peptides: What They Are and How They Benefit You.");
      break;

    case pathname.includes("/pages/company"):
      createAndAppendMetaTag("description", "CLUB120 is an international online store offering unique dietary supplements - bioregulators for health and beauty with scientifically proven effectiveness. We unite people interested in health, beauty, and active longevity. The number \"120\" in the name of the club is not accidental. 120 years is a biological resource.");
      updateDocumentTitle("CLUB120 Blog: Articles and scientific materials.");
      break;

    case pathname.includes("/blogs/news"):
      createAndAppendMetaTag("description", "CLUB120: Useful articles and materials.");
      updateDocumentTitle("CLUB120 Blog: Articles and scientific materials.");
      break;

    case pathname.includes("/collections/vendors"):
      createAndAppendMetaTag("description", "CLUB120: Detailed information about vendors in our online store.");
      updateDocumentTitle("Information about vendors in our online store, CLUB120.");
      break;
  }
