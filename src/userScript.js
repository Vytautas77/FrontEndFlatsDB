const usersWrapper = document.getElementById("user");
const inputfetch = "http://localhost:3000/flats";
const userfech = "http://localhost:3000/users";

const getuser = async () => {
  const response = await fetch(userfech);
  const users = await response.json();
  usersWrapper.append(users.users[0].name);
};
getuser();
