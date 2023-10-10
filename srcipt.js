const flatsWrapper = document.getElementById("flatsWrapper");
const usersWrapper = document.getElementById("user");
const fetchflats = "http://localhost:3000/flats";
const userflats = "http://localhost:3000/users";

const flatCard = (flat) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "flatWrapper");

  const townWrapper = document.createElement("h2");
  townWrapper.innerHTML = `Miestas: ${flat.miestas}`;
  const priceWrapper = document.createElement("h3");
  priceWrapper.innerHTML = `Kaina: &#x20AC  ${flat.kaina}`;
  const areaWrapper = document.createElement("h3");
  areaWrapper.innerHTML = `Plotas: ${flat.plotas} m2`;
  const roomNumberWrapper = document.createElement("h3");
  roomNumberWrapper.innerHTML = `Kambarių skaičius: ${flat.kambariuSkaicius}`;

  wrapper.append(townWrapper, areaWrapper, priceWrapper, roomNumberWrapper);

  return wrapper;
};
const getuser = async () => {
  const response = await fetch(userflats);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getuser();

const getFlats = async () => {
  const response = await fetch(fetchflats);
  const flats = await response.json();
  flats.flats
    .sort((a, b) => {
      return a.kaina > b.kaina ? 1 : -1; //lygiavimas pagal miesta
    })
    .forEach((flat) => {
      const card = flatCard(flat);
      flatsWrapper.append(card);
    });
};
getFlats();

// const getF = async () => {
//   const response = await fetch(userflats);
//   const users = await response.json();
//   console.log(users.users[0].name);
// };
// getF();
