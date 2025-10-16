// Committee page logic
// This expects a query param ?name=Committee%20Name

// Dummy data for demo; in real use, import or fetch from storage
const homeData = window.opener?.homeData || {
  committeeData: {
    "Board of Directors": {
      members: ["User Initial"],
      motions: [
        { name: "Motion Name", description: "Motion Description", creator: "Creator", date: "Date Created", status: "active", type: "Main Motion", threshold: "Simple Majority", requiresDiscussion: false }
      ],
      meetings: []
    }
  },
  committees: [
    { name: "Board of Directors", description: "Short Committee Description" }
  ]
};
let currentCommitteeName = null;
let currentCommitteeData = null;

function getCommitteeName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name') || 'Board of Directors';
}

function renderHeader(committee) {
  document.getElementById('committee-title').textContent = committee.name;
  document.getElementById('committee-desc').textContent = committee.description;
}

function renderTabs(activeTab, committeeData) {
  const tabContent = document.querySelector('.tab-content');
  tabContent.innerHTML = '';
  if (activeTab === 'motions') {
    renderMotions(tabContent, committeeData);
  } else {
    renderMembers(tabContent, committeeData);
  }
}

function renderMotions(container, committeeData) {
  const section = document.createElement('div');
  section.className = 'motions-section';
  section.innerHTML = `
    <div class="motions-header">Motions</div>
    <div class="motion-filters">
      <button class="filter-btn active" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
      <button class="filter-btn" data-filter="all">All</button>
    </div>
    <div class="motions-list"></div>
  `;
  container.appendChild(section);
  renderMotionsList(section.querySelector('.motions-list'), committeeData.motions, 'active');
  // Filter logic
  section.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMotionsList(section.querySelector('.motions-list'), committeeData.motions, btn.dataset.filter);
    });
  });
}

function renderMotionsList(listEl, motions, filter) {
  listEl.innerHTML = '';
  let filtered = motions;
  if (filter === 'active') filtered = motions.filter(m => m.status === 'active');
  if (filter === 'completed') filtered = motions.filter(m => m.status === 'completed');
  if (filtered.length === 0) {
    listEl.innerHTML = '<div style="color:#444;">No motions found.</div>';
    return;
  }
  filtered.forEach((motion, idx) => {
    // Assign a unique id if not present
    if (!motion.id) {
      motion.id = Date.now() + Math.floor(Math.random() * 10000) + idx;
    }
    const card = document.createElement('div');
    card.className = 'motion-card';
    card.innerHTML = `
      <h3>${motion.name}</h3>
      <p>${motion.description}</p>
      <div class="motion-card-footer">
        <span class="creator">${motion.creator}</span>
        <span class="date">${motion.date}</span>
        <button class="view-details-btn">View Details</button>
      </div>
    `;
    // Add event listener to View Details button
    card.querySelector('.view-details-btn').addEventListener('click', () => {
      // Save motion data to sessionStorage for retrieval in motions.html
      sessionStorage.setItem('motion_' + motion.id, JSON.stringify(motion));
      // Link to motions.html with id
      window.location.href = `motions.html?id=${motion.id}`;
    });
    listEl.appendChild(card);
  });
}

function renderMembers(container, committeeData) {
  const section = document.createElement('div');
  section.className = 'members-section';
  section.innerHTML = `
    <div class="members-header">Members</div>
    <table class="members-table">
      <thead><tr><th>Name</th><th>Position</th></tr></thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = section.querySelector('tbody');
  (committeeData.members || []).forEach(member => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${member}</td><td>Member</td>`;
    tbody.appendChild(tr);
  });
  container.appendChild(section);
}

// Tab switching
function setupTabs(committeeData) {
  const tabs = document.querySelectorAll('.tab');
  let activeTab = 'motions';
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      renderTabs(activeTab, committeeData);
    });
  });
}

// Modal logic for New Motion
function setupMotionModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const openBtn = document.querySelector('.new-motion-btn');
  const closeBtn = document.querySelector('.modal-close');
  const cancelBtn = document.querySelector('.modal-cancel');
  const form = document.querySelector('.motion-form');
  const typeSelect = document.getElementById('motion-type-select');
  const typeDesc = document.getElementById('motion-type-desc');

  // Update description on type change
  if (typeSelect && typeDesc) {
    typeSelect.addEventListener('change', function () {
      const selected = typeSelect.options[typeSelect.selectedIndex];
      typeDesc.textContent = selected.getAttribute('data-desc') || '';
    });
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    form.reset();
    // Reset type description
    if (typeDesc && typeSelect) {
      const selected = typeSelect.options[typeSelect.selectedIndex];
      typeDesc.textContent = selected.getAttribute('data-desc') || '';
    }
  }

  openBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
  });
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Gather form data
    const fd = new FormData(form);
    const newMotion = {
      name: fd.get('title'),
      description: fd.get('description'),
      creator: homeData.profile?.name || 'You',
      date: new Date().toLocaleDateString(),
      status: 'active',
      type: fd.get('type'),
      threshold: fd.get('threshold'),
      requiresDiscussion: !!fd.get('requiresDiscussion')
    };
    // Save to current committee
    if (currentCommitteeData && Array.isArray(currentCommitteeData.motions)) {
      currentCommitteeData.motions.unshift(newMotion);
    }
    closeModal();
    // Re-render motions tab
    renderTabs('motions', currentCommitteeData);
    // Switch to motions tab if not already
    document.querySelectorAll('.tab').forEach(tab => {
      if (tab.dataset.tab === 'motions') tab.classList.add('active');
      else tab.classList.remove('active');
    });
  });
}

// Main
window.addEventListener('DOMContentLoaded', () => {
  currentCommitteeName = getCommitteeName();
  // Find committee info
  const committee = (homeData.committees || []).find(c => c.name === currentCommitteeName) || { name: currentCommitteeName, description: '' };
  currentCommitteeData = homeData.committeeData[currentCommitteeName] || { members: [], motions: [], meetings: [] };
  renderHeader(committee);
  renderTabs('motions', currentCommitteeData);
  setupTabs(currentCommitteeData);
  setupMotionModal();
  // Back button logic
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '../home/home-page.html';
    });
  }
});
