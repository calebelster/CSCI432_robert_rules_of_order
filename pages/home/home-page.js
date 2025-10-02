// Root-level data object
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// 2. (Recommended) Protect the page by redirecting if no one is logged in
if (!currentUser) {
    // No user found, send them back to the login page
    window.location.href = '../login/login.html';
}


const homeData = {
    profile: { name: "Profile Name" },
    stats: [
        { title: "Your Committees", value: 2, description: "Active committees you're part of" },
        { title: "Pending Motions", value: 3, description: "Motions requiring your attention" },
        { title: "Upcoming Meetings", value: 1, description: "Scheduled for this week" }
    ],
    committees: [
        {
            name: "Board of Directors",
            description: "Monthly board meeting for strategic decisions",
            date: "Created 1/14/2024",
            role: "Member"
        },
        {
            name: "Budget Committee",
            description: "Quarterly budget review and approval",
            date: "Created 1/31/2024",
            role: "Member"
        }
    ]
};
function renderProfile() {
    const userInfo = document.querySelector('.user-info');
    userInfo.innerHTML = `<span>${currentUser.fullName}</span>`;
}
// Render stats cards
function renderStats() {
    const grid = document.querySelector('.card-grid');
    grid.innerHTML = '';
    homeData.stats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <div class="card-header">
        <span class="title">${stat.title}</span>
      </div>
      <div class="card-content">
        <h3>${stat.value}</h3>
        <p>${stat.description}</p>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Render committees
function renderCommittees() {
    const grid = document.querySelector('.committee-card-grid');
    grid.innerHTML = '';
    homeData.committees.forEach(committee => {
        const card = document.createElement('div');
        card.className = 'committee-card';
        card.innerHTML = `
      <div>
        <div class="committee-header">
          <h3>${committee.name}</h3>
          <span class="member-tag">${committee.role}</span>
        </div>
        <p class="committee-description">
          ${committee.description}
        </p>
      </div>
      <div class="committee-footer">
        <span class="date">${committee.date}</span>
        <button class="enter-button">Enter</button>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Modal logic
function setupModal() {
    const createButton = document.querySelector(".create-button");
    const modalOverlay = document.querySelector(".modal-overlay");
    const closeButton = document.querySelector(".modal-close");
    const cancelButton = document.querySelector(".modal-button.cancel");
    const createCommitteeBtn = document.querySelector(".modal-button.create");

    createButton.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    cancelButton.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = "none";
        }
    });

    // Handle create committee
    createCommitteeBtn.addEventListener("click", () => {
        const name = document.getElementById("committee-name").value.trim();
        const description = document.getElementById("committee-description").value.trim();
        if (name && description) {
            homeData.committees.push({
                name,
                description,
                date: `Created ${new Date().toLocaleDateString()}`,
                role: "Member"
            });
            renderCommittees();
            modalOverlay.style.display = "none";
            document.getElementById("committee-name").value = '';
            document.getElementById("committee-description").value = '';
            // Optionally update stats
            homeData.stats[0].value = homeData.committees.length;
            renderStats();
        }
    });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderStats();
    renderCommittees();
    setupModal();
});