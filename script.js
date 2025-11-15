import { formFactory } from "./utils/formFactory.js";
import { putDataResponse } from "./utils/putData.js";
import { updateCard } from "./utils/putData.js";

// ------- Config -------
const useRemote = true;
const remoteURL = "https://projectnodejs-oam0.onrender.com/users";
const localURL = "./data/response.json";

const gamesURL = "https://projectnodejs-oam0.onrender.com/videogames";

// ------- DOM -------
const alertBox = document.querySelector(".alert");
const spinner = document.querySelector(".spinner-border");
const usersContainer = document.getElementById("users-container");
const modalEl = document.getElementById("exampleModal");
const saveBtn = modalEl.querySelector(".btn.btn-primary");

// ------- App state -------
let users = [];

// ------- Utils -------
function showAlert(message, type = "info") {
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
}

// ------- fetch the JSON file -------
async function getJSON(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "tralala",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

// ------- turn any data into list -------
function toUsersArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.users)) return data.users;
  if (data && typeof data === "object") return [data];
  return [];
}

// ------- Data load -------
async function loadData() {
  spinner.classList.remove("d-none");
  alertBox.classList.add("d-none");

  try {
    const data = await getJSON(useRemote ? remoteURL : localURL);
    users = toUsersArray(data);
    displayUsers(users);

    if (users.length === 0) {
      showAlert("No users found", "warning");
    }
  } catch (error) {
    showAlert(`Failed to load data: ${error.message}`, "danger");
    console.error("Failed to load data:", error);
  } finally {
    spinner.classList.add("d-none");
  }
}

// ------- Render -------
function displayUsers(list) {
  if (!list || list.length === 0) {
    alertBox.classList.remove("d-none");
    alertBox.classList.add("alert-danger");
    alertBox.textContent = "No users found.";
    return;
  }

  usersContainer.innerHTML = "";

  list.forEach((user, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";

    col.innerHTML = `
      <article class="card glass-card h-100 text-center">
        <div class="p-3">
          <img src="${user.avatar_url || "https://via.placeholder.com/200"}" 
               alt="${user.name || "No name"}" 
               class="card-img-top object-fit-contain mb-3"
               width="120" height="120" />
        </div>
        <div class="card-body">
          <h5 class="card-title mb-2">${user.name || "Unnamed"}</h5>
          <ul class="list-group list-group-flush text-start">
            <li class="list-group-item">Email: ${user.email || "–"}</li>
            <li class="list-group-item">Age: ${user.age || "–"}</li>
            <li class="list-group-item">Gender:  ${user.gender || "–"}</li>
          </ul>
          <button data-index="${index}" data-user-id="${user.id}"
                  type="button" class="btn btn-primary mt-3 edit-btn"
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
          </button>
        </div>
      </article>
    `;

    usersContainer.appendChild(col);
  });

  addEventListeners();
}

function displayGames(games) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  games.forEach((game) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";

    col.innerHTML = `
      <article class="card glass-card h-100 text-center p-3">
        <h5 class="card-title">${game.title}</h5>
        <ul class="list-group list-group-flush text-start">
          <li class="list-group-item">Genre: ${game.genre || "–"}</li>
          <li class="list-group-item">Platform: ${game.platform || "–"}</li>
          <li class="list-group-item">Released: ${game.releaseYear || "–"}</li>
          <li class="list-group-item">Rating: ${game.rating ?? "–"}</li>
          <li class="list-group-item">Price: ${game.price ?? "–"} €</li>
        </ul>
      </article>
    `;

    container.appendChild(col);
  });
}

// ------- make buttons functional -------
const addEventListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".modal-body").innerHTML = "";
      document.querySelector(".modal-body").appendChild(formFactory());

      // find the correct user id
      const foundUser = users.find(
        (user) => user.id === parseInt(e.target.getAttribute("data-user-id"))
      );

      // populate the modal form
      getModalForm(foundUser);
    });
  });
};

// ------- make modal form -------
const getModalForm = (foundUser) => {
  const modalForm = document.querySelector(".modal-body form");
  if (!modalForm || !foundUser) return;

  modalForm.userName.value = foundUser.name || "";
  modalForm.userAge.value = foundUser.age || "";
  modalForm.userImg.value = foundUser.avatar_url || "";
  modalForm.userGender.value = foundUser.gender || "";
  saveBtn.setAttribute("data-user-id", foundUser.id);
};

// ------- the submit/save moodal button functionality -------
saveBtn.addEventListener("click", async () => {
  const modalForm = document.querySelector(".modal-body form");
  const userId = saveBtn.getAttribute("data-user-id");
  if (!modalForm) return;

  // builds the updated object
  const updated = {
    id: userId,
    name: modalForm.userName.value.trim(),
    age: Number(modalForm.userAge.value || 0),
    avatar_url: modalForm.userImg.value.trim(),
    gender: modalForm.userGender.value.trim(),
  };

  // send to backend
  await putDataResponse(remoteURL, updated);
  updateCard(updated);

  // to fix the aria-hidden error
  // it didn't fully fix it for chrome browsers
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) {
    modalEl.addEventListener(
      "hidden.bs.modal",
      () => {
        const index = users.findIndex((u) => u.id === parseInt(userId));
        if (index !== -1) users[index] = { ...users[index], ...updated };
        // rerender
        displayUsers(users);
      },
      { once: true }
    );
    modalInstance.hide();
  }

  // update local array
  // find the user whose id == userId
  // parseInt converts string to an integer
  const index = users.findIndex((u) => u.id === parseInt(userId));
  if (index !== -1) users[index] = { ...users[index], ...updated };
});

async function loadGames() {
  const spinner = document.querySelector(".spinner-border");
  spinner.classList.remove("d-none");

  try {
    const data = await getJSON(gamesURL);
    const games = Array.isArray(data) ? data : data?.videogames || [];

    displayGames(games);
  } catch (error) {
    showAlert("Failed to load games: " + error.message, "danger");
  } finally {
    spinner.classList.add("d-none");
  }
}

// ------- Init -------
loadData();
loadGames();
