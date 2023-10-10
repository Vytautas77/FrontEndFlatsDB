const btn = document.getElementById("addFlat");
const usersWrapper = document.getElementById("user");
const infoMesenger = document.getElementById("infoMesenger");
const inputfetch = "http://localhost:3000/flats";
const userfech = "http://localhost:3000/users";

const getuser = async () => {
  const response = await fetch(userfech);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getuser();

const inputData = () => {
  const townAdd = document.getElementById("town").value;
  const priceAdd = document.getElementById("price").value;
  const areaAdd = document.getElementById("area").value;
  const roomNumberAdd = document.getElementById("roomNumber").value;

  const inputWrapper = {
    miestas: townAdd,
    kaina: priceAdd,
    plotas: areaAdd,
    roomNumberAdd: roomNumberAdd,
  };
  return inputWrapper;
};

btn.addEventListener("click", async () => {
  const inputFlat = inputData();
  console.log(inputFlat);
  try {
    const responce = await fetch(inputfetch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFlat),
    });
    const data = await responce.json();
    if (data) {
      infoMesenger.innerHTML = "Duomenys įkelti sėkmingai.";
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 2000);
    }
  } catch (err) {
    infoMesenger.innerHTML = "Duomenys įkelti NEsėkmingai.";
  }
});
