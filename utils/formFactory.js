export const formFactory = () => {
  const form = document.createElement("form");

  // --- factories ---
  const inputFactory = (type, id, className, ariaDescribedby) => {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.classList.add(className);
    input.ariaDescribedby = ariaDescribedby;
    return input;
  };

  const labelFactory = (text, htmlFor) => {
    const label = document.createElement("label");
    label.htmlFor = htmlFor;
    label.classList.add("form-label");
    label.textContent = text;
    return label;
  };

  const appendNodeElement = (parentNode, childNode) => {
    parentNode.appendChild(childNode);
  };

  // --- build labels and inputs ---
  const nameLabel = labelFactory("User's Name", "useName");
  const nameInput = inputFactory(
    "text",
    "userName",
    "form-control",
    "nameHelp"
  );
  const ageLabel = labelFactory("User's Age", "userAge");
  const ageInput = inputFactory("text", "userAge", "form-control", "ageHelp");

  const imageLabel = labelFactory("User's Image", "userImg");
  const imageInput = inputFactory("url", "userImg", "form-control", "imgHelp");

  const genderLabel = labelFactory("User's Gender", "userGender");
  const genderInput = inputFactory(
    "gender",
    "userGender",
    "form-control",
    "genderHelp"
  );

  [
    [nameLabel, nameInput],
    [ageLabel, ageInput],
    [imageLabel, imageInput],
    [genderLabel, genderInput],
  ].forEach(([label, input]) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("mb-3");
    appendNodeElement(wrapper, label);
    appendNodeElement(wrapper, input);
    appendNodeElement(form, wrapper);
  });

  const modalBody = document.querySelector(".modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    appendNodeElement(modalBody, form);
  }

  return form;
};
