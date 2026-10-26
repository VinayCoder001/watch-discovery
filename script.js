
let contactusButton = document.getElementById("contactusButton");
let HomeButton = document.getElementById("HomeButton");
let wishlistButton = document.getElementById("wishlistButton");
let categoryFilter = document.getElementById("category-filter");
let strapFilter = document.getElementById("strapFilter");
let individualSection = document.getElementById("individualSection");
let displayWatches = document.getElementById("displayWatches");


// All watch data
let Watches = [
    {
        name: "Casio Vintage A-158WA-1Q",
        brand: "Casio",
        price: 1893,
        category: "digital",
        image: "https://m.media-amazon.com/images/I/61ybeKQto8L._SY879_.jpg",
        strap: "metal",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/0bmkNi75",
                price: 1893
            }
        ]
    },
    {
        name: "Casio Edifice EFR-526D-1AV.",
        brand: "Casio",
        price: 8495,
        category: "luxury",
        image: "https://m.media-amazon.com/images/I/61IBS5lTLaL._SX679_.jpg",
        strap: "metal",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/07EWGJdC",
                price: 8495
            }
        ]
    },
    {
        name: "Casio Edifice EFB-109D-5AV.",
        brand: "Casio",
        price: 10993,
        category: "luxury",
        image: "https://m.media-amazon.com/images/I/61m1kpU27NL._SX679_.jpg",
        strap: "metal",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/09pukzVs",
                price: 10993
            }
        ]
    },
    {
        name: "Bruno Milano Elegant Masterpiece.",
        brand: "Bruno Milano",
        price: 3346,
        category: "luxury",
        image: "https://m.media-amazon.com/images/I/71NS7Jb3EXL._SX679_.jpg",
        strap: "metal",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/0bOhpGqz",
                price: 3346
            }
        ]
    },
    {
        name: "boAt Wave Call 3 (Bold Black)",
        brand: "boAt",
        price: 999,
        category: "digital",
        image: "https://m.media-amazon.com/images/I/71UdDIKDlEL._AC_UL480_FMwebp_QL65_.jpg",
        strap: "rubber",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/0gSNFfXo",
                price: 999
            }
        ]
    },
    {
        name: "Fastrack Revoltt R1",
        brand: "Fastrack",
        price: 1499,
        category: "digital",
        image: "https://m.media-amazon.com/images/I/61V1GnTNjWL._AC_UL480_FMwebp_QL65_.jpg",
        strap: "rubber",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/09SfVL7T",
                price: 1499
            }
        ]
    },
    {
        name: "Fire-Boltt Ninja Call Pro (Black)",
        brand: "Fire-Boltt",
        price: 1099,
        category: "digital",
        image: "https://m.media-amazon.com/images/I/61gnwDgVZbL._AC_UL480_FMwebp_QL65_.jpg",
        strap: "rubber",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/02cj1Hjf",
                price: 1099
            }
        ]
    },
    {
        name: "Fastrack Astor FS1 Pro (Black)",
        brand: "Fastrack",
        price: 1999,
        category: "sports",
        image: "https://m.media-amazon.com/images/I/71BMeCVMZOL._AC_UL480_FMwebp_QL65_.jpg",
        strap: "rubber",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/03nRAhMW",
                price: 1999
            }
        ]
    },
    {
        name: "Noise Twist Go (Elite Black)",
        brand: "Noise",
        price: 1699,
        category: "sports",
        image: "https://m.media-amazon.com/images/I/61q0ZgCYoJL._AC_UL480_FMwebp_QL65_.jpg",
        strap: "metal",
        buyLinks: [
            {
                website: "Amazon",
                url: "https://amzn.in/d/02kr8kya",
                price: 1699
            }
        ]
    }
];


// --------------------------------------------------
// CREATE WATCH CARDS
// --------------------------------------------------

function createWatchDiv(details) {

    // Create the main card element
    let WatchDiv = document.createElement("div");

    // The class connects this card to the carousel CSS
    WatchDiv.className = "watchDetails";

    // Display the watch name
    let watchname = document.createTextNode(details.name);

    // Display the brand
    let brandName = document.createElement("p");
    brandName.textContent = `Brand: ${details.brand}`;

    // Create the watch image
    let watchimage = new Image(300, 200);
    watchimage.src = details.image;
    watchimage.alt = details.name;

    // Display the price
    let watchPrice = document.createTextNode(`Price: ₹${details.price}`);

    // Create the More Info button
    let moreInfo = document.createElement("button");
    moreInfo.textContent = "MoreInfo";

    // Add all elements to the watch card
    WatchDiv.appendChild(watchname);
    WatchDiv.appendChild(brandName);
    WatchDiv.appendChild(watchimage);
    WatchDiv.appendChild(watchPrice);
    WatchDiv.appendChild(moreInfo);

    // Add the card to the carousel container
    displayWatches.appendChild(WatchDiv);

    // Open the popup when More Info is clicked
    moreInfo.addEventListener("click", () => {
        moreInfofun(details);
    });
}


// Initially display all watches
Watches.forEach(details => {
    createWatchDiv(details);
});


// --------------------------------------------------
// FILTER WATCHES
// --------------------------------------------------

function filterWatches() {

    // Remove existing cards before displaying filtered results
    displayWatches.innerHTML = "";

    Watches.forEach(details => {

        // Check whether the watch matches both selected filters
        let categoryMatches =
            categoryFilter.value === "all" ||
            categoryFilter.value === details.category;

        let strapMatches =
            strapFilter.value === "all" ||
            strapFilter.value === details.strap;

        // Create a card only if both filters match
        if (categoryMatches && strapMatches) {
            createWatchDiv(details);
        }
    });

    // Start from the first filtered watch
    currentWatch = 0;

    // Recalculate the carousel positions
    updateCarousel();
}


// --------------------------------------------------
// 3D CAROUSEL LOGIC
// --------------------------------------------------

// Stores the index of the watch in the center
let currentWatch = 0;


function updateCarousel() {

    // Select all cards currently displayed
    let cards = document.querySelectorAll(
        "#displayWatches .watchDetails"
    );

    // Remove old position classes from every card
    // CSS uses these classes to control position and appearance
    cards.forEach(card => {
        card.classList.remove("active", "left", "right");
    });

    // Stop if the filters leave no watches
    if (cards.length === 0) return;

    // Keep the index valid after filtering
    currentWatch = currentWatch % cards.length;

    // Make the selected watch the center card
    // CSS makes the active card larger and fully visible
    cards[currentWatch].classList.add("active");

    // Only show side cards if at least three watches exist
    if (cards.length >= 3) {

        // Calculate the previous watch's index
        // Adding cards.length avoids a negative index
        let leftIndex =
            (currentWatch - 1 + cards.length) % cards.length;

        // Calculate the next watch's index
        // Modulo makes the carousel loop at the end
        let rightIndex =
            (currentWatch + 1) % cards.length;

        // CSS positions the previous watch on the left
        cards[leftIndex].classList.add("left");

        // CSS positions the next watch on the right
        cards[rightIndex].classList.add("right");
    }
}


// Move to the previous or next watch
function moveCarousel(direction) {

    // Get the currently displayed cards
    let cards = document.querySelectorAll(
        "#displayWatches .watchDetails"
    );

    // Stop if there are no cards
    if (cards.length === 0) return;

    // direction = 1 means next
    // direction = -1 means previous
    //
    // Modulo allows continuous looping through the watches
    currentWatch =
        (currentWatch + direction + cards.length) % cards.length;

    // Update the active, left and right classes
    updateCarousel();
}


// Connect the previous arrow to the carousel
document.getElementById("prevWatch").addEventListener("click", () => {
    moveCarousel(-1);
});


// Connect the next arrow to the carousel
document.getElementById("nextWatch").addEventListener("click", () => {
    moveCarousel(1);
});


// Set the initial carousel positions
updateCarousel();


// Update the carousel when either filter changes
categoryFilter.addEventListener("change", filterWatches);
strapFilter.addEventListener("change", filterWatches);


// --------------------------------------------------
// MORE INFO POPUP
// --------------------------------------------------

function moreInfofun(details) {

    // Clear the previous popup content
    individualSection.innerHTML = "";

    // Create the popup container
    let InfoDiv = document.createElement("div");
    InfoDiv.id = "moreInfoSection";

    // Create the close button
    let closeButton = document.createElement("button");
    closeButton.textContent = "x";

    // Close the popup when clicked
    closeButton.addEventListener("click", () => {
        individualSection.classList.remove("active");
    });

    InfoDiv.appendChild(closeButton);

    // Display the selected watch's name
    let watchname = document.createTextNode(details.name);

    // Display the brand
    let brandName = document.createElement("p");
    brandName.textContent = `Brand: ${details.brand}`;

    // Display the watch image
    let watchimage = new Image(300, 200);
    watchimage.src = details.image;
    watchimage.alt = details.name;

    // Display the price
    let watchPrice = document.createTextNode(`Price: ₹${details.price}`);

    // Create the Amazon purchase link
    let productLink = document.createElement("a");
    productLink.href = details.buyLinks[0].url;
    productLink.textContent = "Buy at Amazon";
    productLink.target = "_blank";
    productLink.rel = "noopener noreferrer";

    // Add all content to the popup
    InfoDiv.appendChild(watchname);
    InfoDiv.appendChild(brandName);
    InfoDiv.appendChild(watchimage);
    InfoDiv.appendChild(watchPrice);
    InfoDiv.appendChild(productLink);

    // Display the popup
    individualSection.appendChild(InfoDiv);
    individualSection.classList.add("active");
}
