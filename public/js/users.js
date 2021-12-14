const formUser = document.getElementById("form-user");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const userName = document.getElementById("user-name");
const password = document.getElementById("password");
const email = document.getElementById("email");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const paragraph = document.getElementById("paragraph");
const userId = document.getElementById("user-id");

async function postUser(evt) {
  evt.preventDefault();

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    userName.value === "" ||
    email.value === "" ||
    password.value === "" ||
    phone.value === "" ||
    address.value === ""
  )
    alert("Complete los campos!");

  const sendBody = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
    email: email.value,
    address: address.value,
    phone: phone.value,
  };

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 500) {
      throw Error("Usuario, Dirección, Email o Teléfono repetido.");
    } else if (res.status === 400) {
      res
        .text()
        .then((text) => {
          const errors = JSON.parse(text);
          msg = Object.values(errors)
            .map((msgError) => `-> ${msgError} \n`)
            .join("");
          throw new Error(msg);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Usuario guardado!");
    }
  } catch (error) {
    alert(error.message);
    return;
  }
}

async function getUsers(evt) {
  evt.preventDefault();

  const res = await fetch("/api/users");
  const users = await res.json();

  console.log(users);
  const elements = users.map((book) => JSON.stringify(book, null, "    "));

  console.log(elements);
  paragraph.innerText = elements;
}

async function putUserById(evt) {
  evt.preventDefault();

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    userName.value === "" ||
    email.value === "" ||
    password.value === "" ||
    phone.value === "" ||
    address.value === ""
  )
    alert("Complete los campos!");

  const sendBody = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
    email: email.value,
    address: address.value,
    phone: phone.value,
  };

  try {
    const res = await fetch("/api/users/" + userId.value, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 500) {
      throw Error("Usuario, Dirección, Email o Teléfono repetido.");
    } else if (res.status === 400) {
      res
        .text()
        .then((text) => {
          const errors = JSON.parse(text);
          msg = Object.values(errors)
            .map((msgError) => `-> ${msgError} \n`)
            .join("");
          throw new Error(msg);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Usuario guardado!");
    }
  } catch (error) {
    alert(error.message);
    return;
  }
}

async function deleteUserById(evt) {
  evt.preventDefault();

  const res = await fetch("/api/users/" + userId.value, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  alert("Usuario borrado!");
}

formUser.querySelector("#post").addEventListener("click", postUser);
formUser.querySelector("#get").addEventListener("click", getUsers);
formUser.querySelector("#delete").addEventListener("click", deleteUserById);
formUser.querySelector("#put").addEventListener("click", putUserById);
