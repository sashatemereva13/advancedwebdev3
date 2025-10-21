// builds the url, sends PUT, returns data
export const putData = async (url, usersData) => {
  //   console.log("Sending data....", url, usersData);

  const updateUrl = `${url}/${usersData.id}`;

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        my_key: "my_super_secret_phrase",
      },
      body: JSON.stringify(usersData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // waiting spinner
    document.querySelector(".modal-body").innerHTML = `
    		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
    `;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putDataResponse = async (url, updated) => {
  try {
    const response = await putData(url, updated);

    if (response) {
      document.querySelector(
        ".modal-body"
      ).innerHTML = `		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-success" role="alert">
				${response.message}
			</div>
		</div>`;

      const myModal = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(myModal);
      setTimeout(() => modal.hide(), 700);
    }
  } catch (error) {
    console.error("Failed to update data:", error);

    document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-danger w-100" role="alert">
				${error.message}
			</div>
			<p class="mark">${error.stack}</p>
		</div>
		`;
  }
};

export const updateCard = (user) => {
  const cardsArray = Array.from(document.querySelectorAll(".card"));

  const foundCard = cardsArray.find((card) => {
    const btn = card.querySelector("button");
    return btn && btn.dataset.userId == user.id;
  });
  foundCard.innerHTML = `
				<div class="card-image p-3">
					<img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-cover" />
					<span class="card-title">${user.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name: </strong>${user.name}</li>
						<li class="list-group-item"><strong>Age: </strong>${user.age}</li>
						<li class="list-group-item">
							<strong>Gender: </strong> ${user.gender}
						</li>
					</ul>
					<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>
`;

  // console.log("User ID to find:", user.id);
  // console.log("Type of user.id:", typeof user.id);
  // console.log(foundCard);
};
