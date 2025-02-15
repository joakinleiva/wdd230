document.getElementById("year").textContent = new Date().getFullYear();

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("lastModified").textContent = dateTimeString;
}

// Update 
updateDateTime();

const members = 'data/members.json';
const cards = document.querySelector('#cards');

// Function to generate a random membership tier
function getRandomMembership() {
    const membershipTiers = ['Gold', 'Platinum', 'Silver', 'Bronze'];
    const randomIndex = Math.floor(Math.random() * membershipTiers.length);
    return membershipTiers[randomIndex];
}

async function getMembersData() {
    try {
        // Fetch the members data
        const response = await fetch(members);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Call the function to display the members
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}

function displayMembers(companies) {
    if (Array.isArray(companies)) {
        companies.forEach(company => {
            // Generate a random membership tier for each company
            const membership = getRandomMembership();
            
            let card = document.createElement('section');
            let name = document.createElement('h2'); 
            let logo = document.createElement('img');
            let otherInfo = document.createElement('p');
            let websiteLink = document.createElement('a');
            let phoneNumber = document.createElement('p');
            let address = document.createElement('p');
            let membershipTier = document.createElement('p');  // New element to display membership

            name.textContent = company.name;
            logo.setAttribute('src', company.image);
            logo.setAttribute('alt', `Logo of ${company.name}`);
            logo.setAttribute('loading', 'lazy');
            logo.setAttribute('width', '100');
            logo.setAttribute('height', '100');
            otherInfo.textContent = company.other_info;
            websiteLink.setAttribute('href', company.website);
            websiteLink.setAttribute('target', '_blank');
            websiteLink.textContent = `Visit ${company.name} Website`;
            phoneNumber.textContent = `Phone: ${company.phone_number}`;
            address.textContent = `Address: ${company.address}`;

            // Add the random membership tier
            membershipTier.textContent = `Membership Tier: ${membership}`;

            // Append the section (card) with the created elements
            card.appendChild(name);
            card.appendChild(logo);
            card.appendChild(otherInfo);
            card.appendChild(websiteLink);
            card.appendChild(phoneNumber);
            card.appendChild(address);
            card.appendChild(membershipTier);  // Add membership tier to card

            // Add the card to the cards container
            cards.appendChild(card);
        });
    } else {
        console.error('Invalid data format');
    }
}

// Call the function to start fetching and displaying the companies
getMembersData();
