document.addEventListener("DOMContentLoaded", () => {
  const supervisors = [
    { id: 1, name: "Dr. Nadia Khan", researchDomain: "Artificial Intelligence", availableSlots: 2, contactInfo: "nadia.khan@university.edu" },
    { id: 2, name: "Prof. Salman Irfan", researchDomain: "Cybersecurity", availableSlots: 0, contactInfo: "salman.irfan@university.edu" },
    { id: 3, name: "Dr. Maria Bibi", researchDomain: "Data Science", availableSlots: 3, contactInfo: "maria.bibi@university.edu" },
    { id: 4, name: "Dr. Marium Mehmood", researchDomain: "Cloud Computing", availableSlots: 1, contactInfo: "marium.mehmood@university.edu" },
    { id: 5, name: "Dr. Nadeem Akhtar", researchDomain: "Computer Vision", availableSlots: 2, contactInfo: "nadeem.akhtar@university.edu" },
    { id: 6, name: "Dr. Shahid Yousuf", researchDomain: "Natural Language Processing", availableSlots: 4, contactInfo: "shahid.yousuf@university.edu" },
    { id: 7, name: "Prof. Khurram Ijaz", researchDomain: "Internet of Things", availableSlots: 0, contactInfo: "khurram.ijaz@university.edu" },
    { id: 8, name: "Dr. Mehtab Ahmad", researchDomain: "Software Engineering", availableSlots: 2, contactInfo: "mehtab.ahmad@university.edu" },
    { id: 9, name: "Dr. Hina Akram", researchDomain: "Human-Computer Interaction", availableSlots: 1, contactInfo: "hina.akram@university.edu" },
    { id: 10, name: "Dr. Usman Javed", researchDomain: "Blockchain", availableSlots: 2, contactInfo: "usman.javed@university.edu" }
  ];

  const supervisorList = document.getElementById("supervisor-list");
  const filterSelect = document.getElementById("filter-domain");
  const availableCheckbox = document.getElementById("availableOnly"); // ✅ Bonus filter
  const bookmarkList = document.getElementById("bookmarked-supervisors");

  let bookmarks = [];

  const renderSupervisors = (data) => {
    supervisorList.innerHTML = "";
    data.forEach((supervisor) => {
      const supervisorCard = document.createElement("div");
      supervisorCard.classList.add("p-4", "border", "rounded", "shadow-md", "mb-4", "bg-white", "supervisor-card");

      supervisorCard.innerHTML = `
        <h3 class="text-lg font-bold">${supervisor.name}</h3>
        <p><strong>Domain:</strong> ${supervisor.researchDomain}</p>
        <p><strong>Slots Available:</strong> ${supervisor.availableSlots}</p>
        <p><strong>Contact:</strong> ${supervisor.contactInfo}</p>
        <button class="bookmark-btn bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600 transition" data-id="${supervisor.id}">Bookmark</button>
      `;

      supervisorList.appendChild(supervisorCard);
    });

    document.querySelectorAll(".bookmark-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.getAttribute("data-id"));
        bookmarkSupervisor(id);
      });
    });
  };

  const filterSupervisors = () => {
    const selectedDomain = filterSelect.value;
    const showAvailableOnly = availableCheckbox.checked;

    let filteredList = supervisors;

    if (selectedDomain !== "All") {
      filteredList = filteredList.filter((s) => s.researchDomain === selectedDomain);
    }

    if (showAvailableOnly) {
      filteredList = filteredList.filter((s) => s.availableSlots > 0);
    }

    renderSupervisors(filteredList);
  };

  const bookmarkSupervisor = (id) => {
    const supervisor = supervisors.find((s) => s.id === id);
    if (!bookmarks.includes(supervisor)) {
      bookmarks.push(supervisor);
      updateBookmarkList();
    }
  };

  const updateBookmarkList = () => {
    bookmarkList.innerHTML = "";
    bookmarks.forEach((s) => {
      const item = document.createElement("li");
      item.textContent = `${s.name} (${s.researchDomain})`;
      bookmarkList.appendChild(item);
    });
  };

  // Initial load
  renderSupervisors(supervisors);

  // Event listeners
  filterSelect.addEventListener("change", filterSupervisors);
  availableCheckbox.addEventListener("change", filterSupervisors); // ✅ Bonus feature listener
});
