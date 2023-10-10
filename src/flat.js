const flatID = localStorage.getItem("FlatId");
const delBtn = document.getElementById("delBtn");
const updateBtn = document.getElementById("updateBtn");
const usersWrapper = document.getElementById("user");
const getFetch = "http://localhost:3000/flats/";
const userFech = "http://localhost:3000/users";

const getuser = async () => {
  const response = await fetch(userFech);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getuser();

const addInfoToScreen = (flats) => {
  const townWrapper = document.getElementById("town");
  townWrapper.innerHTML = `Miestas: ${flats.miestas}`;
  const priceWrapper = document.getElementById("price");
  priceWrapper.innerHTML = `Kaina: &#x20AC  ${flats.kaina}`;
  const areaWrapper = document.getElementById("area");
  areaWrapper.innerHTML = `Plotas: ${flats.kaina} m2`;
  const roomNumberWrapper = document.getElementById("roomNumber");
  roomNumberWrapper.innerHTML = `Kambarių skaičius: ${flats.kambariuSkaicius}`;
};

const getFlat = async () => {
  const response = await fetch(getFetch + flatID);
  const flat = await response.json();
  const flats = flat.flats;
  addInfoToScreen(flats);
};
getFlat();

delBtn.addEventListener("click", async () => {
  try {
    const responce = await fetch(getFetch + flatID, {
      method: "DELETE",
    });
    const data = await responce.json();
    if (data) {
      alert("Informacija ištrinta sėkmingai");
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 2000);
    }
  } catch (err) {
    alert("Informacija neištrinta!");
  }
});

const updateData = () => {
  const townAdd = document.getElementById("upTown").value;
  const priceAdd = document.getElementById("upPrice").value;
  const areaAdd = document.getElementById("upArea").value;
  const roomNumberAdd = document.getElementById("upRroomNumber").value;

  const inputWrapper = {
    miestas: townAdd,
    kaina: priceAdd,
    plotas: areaAdd,
    kambariuSkaicius: roomNumberAdd,
  };
  return inputWrapper;
};

updateBtn.addEventListener("click", async () => {
  const inputFlat = updateData();
  console.log(inputFlat);
  try {
    const responce = await fetch(getFetch + flatID, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFlat),
    });
    const data = await responce.json();
    if (data) {
      alert("Duomenys pakeisti sėkmingai.");
      setTimeout(() => {
        window.location.replace("#");
      }, 2000);
    }
  } catch (err) {
    alert("Duomenys pakeisti NEsėkmingai.");
  }
});
