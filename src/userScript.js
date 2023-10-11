const usersWrapper = document.getElementById("user");
const userInfosWrapper = document.getElementById("userInfo");
const userFlatCardWrapper = document.getElementById("userFlatCard");
const inputFetch = "http://localhost:3000/flats";
const userFetch = "http://localhost:3000/users/";
const userId = "http://localhost:3000/users/6520293c8b77ff877055a5f7/flats";

const getUser = async () => {
  const response = await fetch(userFetch);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getUser();

const userInfo = (user) => {
  const userName = document.getElementById("userName");
  userName.innerHTML = `Vartotojo vardas: ${user.name}`;
  const userEmail = document.getElementById("userEmail");
  userEmail.innerHTML = `Vartotojo email: ${user.email}`;
};

const getUserInfo = async () => {
  const response = await fetch(userFetch);
  const users = await response.json();
  const user = users.users[0];
  userInfo(user);
};
getUserInfo();

const userFlatCard = (flat) => {
  const wrapperLink = document.createElement("div");
  wrapperLink.setAttribute("class", "flatWrapper");
  const townWrapper = document.createElement("h2");
  townWrapper.innerHTML = `Miestas: ${flat.miestas}`;
  const priceWrapper = document.createElement("h3");
  priceWrapper.innerHTML = `Kaina: &#x20AC  ${flat.kaina}`;
  const areaWrapper = document.createElement("h3");
  areaWrapper.innerHTML = `Plotas: ${flat.plotas} m2`;
  const roomNumberWrapper = document.createElement("h3");
  roomNumberWrapper.innerHTML = `Kambarių skaičius: ${flat.kambariuSkaicius}`;

  wrapperLink.append(townWrapper, areaWrapper, priceWrapper, roomNumberWrapper);

  return wrapperLink;
};

const getFlatsById = async () => {
  const response = await fetch(userId);
  const user = await response.json();
  user.user[0].user_flats.forEach((flat) => {
    const card = userFlatCard(flat);
    userFlatCardWrapper.append(card);
  });
};
getFlatsById();
