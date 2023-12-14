localStorage.setItem("loggedIn", 0);

const form = document.getElementById("form");
var data = "";
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    data = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    }).then((res) => res.json());
    localStorage.setItem("dataa", JSON.stringify(data));

    console.log(data);
    if(data.id){
      window.location.replace(`../HTML Pages/user profile.html`);
    }else{
      document.getElementById("span").style.display="block"
    }
    localStorage.AddMeToCart = -1;
  });
}
 var span=document.getElementById("span")
 var userr=document.getElementById("username")
 var pass=document.getElementById("password")
 if(userr){document.getElementById("username").addEventListener("input",()=>{
  span.style.display="none"
  //  span.innerText=""
  
  })

}
if(pass){document.getElementById("password").addEventListener("input",()=>{
  span.style.display="none"
  //  span.innerText=""
  
  })}

var logoutt=document.getElementById("logout")
function logout(info) {
  localStorage.removeItem("dataa");
  localStorage.AddMeToCart = 0;
  // location.reload();
}
if(logoutt){
  document.getElementById("logout").addEventListener("click", () => {
    window.open("../login/index.html");
    logout(data);
  })
}
;
