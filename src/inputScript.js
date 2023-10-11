const btn = document.getElementById("addFlat");
const usersWrapper = document.getElementById("user");
const infoMessenger = document.getElementById("infoMessenger");
const inputFetch = "http://localhost:3000/flats";
const userFetch = "http://localhost:3000/users";

const getUser = async () => {
  const response = await fetch(userFetch);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getUser();

const inputData = () => {
  const townAdd = document.getElementById("town").value;
  const priceAdd = document.getElementById("price").value;
  const areaAdd = document.getElementById("area").value;
  const roomNumberAdd = document.getElementById("roomNumber").value;

  const inputWrapper = {
    miestas: townAdd,
    kaina: priceAdd,
    plotas: areaAdd,
    kambariuSkaicius: roomNumberAdd,
  };
  return inputWrapper;
};

btn.addEventListener("click", async () => {
  const inputFlat = inputData();
  try {
    const response = await fetch(inputFetch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFlat),
    });
    const data = await response.json();
    if (data) {
      infoMessenger.innerHTML = "Duomenys įkelti sėkmingai.";
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 2000);
    }
  } catch (err) {
    infoMessenger.innerHTML = "Duomenys įkelti NEsėkmingai.";
  }
});
