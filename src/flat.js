const flatID = localStorage.getItem("FlatId");
const userID = localStorage.getItem("userId");
const delBtn = document.getElementById("delBtn");
const addToUserBtn = document.getElementById("AddUserBtn");
const updateBtn = document.getElementById("updateBtn");
const usersWrapper = document.getElementById("user");
const getFetch = "http://localhost:3000/flats/";
const userFetch = "http://localhost:3000/users/";

const getUser = async () => {
  const response = await fetch(userFetch);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
  localStorage.setItem("userId", users.users[0]._id);
};
getUser();

const addInfoToScreen = (flats) => {
  const townWrapper = document.getElementById("town");
  townWrapper.innerHTML = `Miestas: ${flats.miestas}`;
  const priceWrapper = document.getElementById("price");
  priceWrapper.innerHTML = `Kaina: ${flats.kaina} &#x20AC `;
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
    const response = await fetch(getFetch + flatID, {
      method: "DELETE",
    });
    const data = await response.json();
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
  const roomNumberAdd = document.getElementById("upRoomNumber").value;

  const inputs = {
    miestas: townAdd,
    kaina: priceAdd,
    plotas: areaAdd,
    kambariuSkaicius: roomNumberAdd,
  };
  return inputs;
};

const validationData = (updateData) => {
  Object.keys(updateData).forEach(
    (k) => updateData[k] === "" && delete updateData[k]
  );

  return updateData;
};

updateBtn.addEventListener("click", async () => {
  const inputs = updateData();
  const inputFlat = validationData(inputs);
  try {
    const response = await fetch(getFetch + flatID, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFlat),
    });
    const data = await response.json();
    if (data) {
      alert("Duomenys pakeisti sėkmingai.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (err) {
    alert("Duomenys pakeisti NEsėkmingai.");
  }
});
//addToUserBtn nukellia flat id pas user
const addToUserFlatId = async () => {
  try {
    const response = await fetch(userFetch);
    const getUser = await response.json();
    const userFlatProducts = getUser.users[0].userFlatProducts;

    userFlatProducts.push(flatID);

    return userFlatProducts;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

addToUserBtn.addEventListener("click", async () => {
  try {
    const updatedUserFlatProducts = await addToUserFlatId(); // This fetches the updated userFlatProducts array

    const response = await fetch(userFetch + userID, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userFlatProducts: updatedUserFlatProducts }), // Send the updated array
    });

    const data = await response.json();
    if (data) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (err) {
    alert("Duomenys pakeisti NEsėkmingai.");
  }
});
