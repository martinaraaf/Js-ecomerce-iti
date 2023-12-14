var image = document.getElementById("productImage");
var productPrice = document.getElementById("price");
var description = document.getElementById("description");
var productTitle = document.getElementById("productTitle");
var rating = document.getElementById("rating");
// localStorage.setItem("id", 1);
const test = localStorage.getItem("myproduct");
var divIcon = document.getElementById("divIcon");

fetch(`https://dummyjson.com/products/${test}`)
  .then((res) => res.json())
  .then((product) => {
    // console.log(icon[0].src);
    console.log(product);
    for (let i = 0; i < product.images.length; i++) {
      divIcon.innerHTML += `<a href="#"><img src="${product.images[i]}" alt="" class="icon" /></a>`;
    }
    image.src = product.images[0];
    var icon = document.querySelectorAll(".icon");
    productTitle.innerText = product.title;
    productPrice.innerText = "$" + product.price;
    description.innerText = product.description;
    rating.innerText = `(${product.rating})`;
    //maintenance
    icon.forEach(function (ico) {
      ico.addEventListener("click", function () {
        image.src = this.src;
      });
    });

    let btn = document.getElementById("add-btn");
    btn.addEventListener('click', function() {
      if(JSON.parse(localStorage.loggedIn)){
        if(JSON.parse(localStorage.AddMeToCart) === -1){
          localStorage.setItem("AddMeToCart",  product.id);
        }else{
          localStorage.AddMeToCart += product.id;
        }
      }else{
        // go to login page
        window.open("../login/index.html");
      }
    });

  });
