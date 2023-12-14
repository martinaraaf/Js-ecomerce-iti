var x = JSON.parse(localStorage.getItem("dataa"));
console.log(x);
async function displayUserProfile(id) {
  if (id) {
    const element = document.getElementById("Name");
    const element2 = document.getElementById("Age");
    const element3 = document.getElementById("Email");
    const element4 = document.getElementById("PP-img");
    const element6 = document.getElementById("gender");
    const element5 = document.getElementById("birthDate");
    if (element) {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const user = await response.json();
        console.log(user);
        element.innerHTML = user.username;
        element2.innerHTML = user.age;
        element3.innerHTML = user.email;
        element4.src = user.image;
        element5.innerHTML = user.birthDate;
        element6.innerHTML = user.gender;

        localStorage.loggedIn = id;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Element with ID 'Name' not found");
    }
  }
}
displayUserProfile(x.id);
