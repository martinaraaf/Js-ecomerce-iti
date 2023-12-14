let limit = 30;
let skip = 0;
function fetchdata() {
  fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
    .then((res) => res.json())
    .then(getfromapi);
}
fetchdata();
function getfromapi(mydata) {
  if (mydata.total == 0)
    document.getElementsByTagName(
      "h1"
    )[0].innerText = `no search results found`;
  removesec();
  let myproducts = mydata.products;
  for (let i = 0; i < myproducts.length; i++) {
    let section = document.createElement("div");
    let subsection = document.createElement("div");
    section.appendChild(subsection);
    section.className = "section";
    let image = document.createElement("img");
    image.className = "allimages";
    image.src = myproducts[i].images[0];
    let title = document.createElement("p");
    title.className = "title";
    title.innerHTML = myproducts[i].title;
    let price = document.createElement("p");
    price.className = "price";
    price.innerHTML = "$ " + myproducts[i].price;
    let addtocart = document.createElement("button");
    addtocart.className = "addtocart";
    addtocart.innerHTML = "Add To Cart";
    // addtocart.addEventListener("mouseover", function () {
    //   this.style.backgroundColor = "#FF2020";
    //   this.style.cursor = "pointer";
    //   this.style.color = "white";
    // });
    // addtocart.addEventListener("mouseout", function () {
    //   this.style.backgroundColor = "buttonface";
    //   this.style.color = "black";
    // });
    subsection.addEventListener("click", function () {
      localStorage.setItem("myproduct", myproducts[i].id);
      window.open("products-details (1).html");
    });
    subsection.appendChild(image);
    subsection.appendChild(title);
    subsection.appendChild(price);
    section.appendChild(addtocart);
    document.getElementById("sections").appendChild(section);
  }
  // if (mydata.nextPage)
  // {
  //   page++;
  //   fetchdata();
  // }
}
function removesec() {
  let children = document.getElementsByClassName("section");
  let childarray = Array.from(children);
  childarray.forEach(function (child) {
    child.remove();
  });
}

let Categories = document.getElementsByClassName("cat");
// Categories[0].style.color = "white";
for (let i = 0; i < Categories.length; i++) {
  Categories[i].addEventListener("click", function () {
    for (let i = 0; i < Categories.length; i++) {
      Categories[i].classList.remove("active");
      // Categories[i].style.backgroundColor = "#FF2020";
    }
    Categories[i].classList.add("active");
  });
}
let mycategory = "";
function changemycategory(val) {
  mycategory = val;
}
function execute() {
  document.getElementsByTagName("h1")[0].style.fontSize = 3 + "rem";
  if (mycategory == "all") {
    for (let i = 0; i < document.getElementsByClassName("n-p").length; i++)
      document.getElementsByClassName("n-p")[i].disabled = false;
    document.getElementsByTagName("h1")[0].innerText = "All Categories";
    fetch("https://dummyjson.com/products")
      .then((res) => {
        let mydata = res.json();
        return mydata;
      })
      .then(getfromapi);
  } else {
    for (let i = 0; i < document.getElementsByClassName("n-p").length; i++)
      document.getElementsByClassName("n-p")[i].disabled = true;
    document.getElementsByTagName("h1")[0].innerText = `${mycategory}`;
    fetch(`https://dummyjson.com/products/category/${mycategory}`)
      .then((res) => {
        let mydata = res.json();
        return mydata;
      })
      .then(getfromapi);
  }
}
var searchBar = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
var searchIcon = document.getElementById("searchIcon");
var sidenav = document.getElementById("sidenav");
searchIcon.addEventListener("click", function (e) {
  if (searchBar.value == "") return;
  for (let i = 0; i < document.getElementsByClassName("n-p").length; i++)
    document.getElementsByClassName("n-p")[i].disabled = true;
  document.getElementsByTagName(
    "h1"
  )[0].innerText = `search results for "${searchBar.value}"`;
  document.getElementsByTagName("h1")[0].style.fontSize = 1.5 + "rem";
  fetch(`https://dummyjson.com/products/search?q=${searchBar.value}`)
    .then((res) => {
      let mydata = res.json();
      return mydata;
    })
    .then(getfromapi);
  searchBar.value = "";
});
var next = document.getElementById("next");
var prev = document.getElementById("prev");
next.addEventListener("click", function () {
  skip += 30;
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((mydata) => {
      if (skip < mydata.total) {
        removesec();
        fetchdata();
      } else skip -= 30;
    });
});
prev.addEventListener("click", function () {
  if (skip != 0) {
    skip -= 30;
    removesec();
    fetchdata();
  }
});
// next.addEventListener("mouseover", function () {
//   if (next.disabled==false)
//   {
//     this.style.backgroundColor = "#FF2020";
//     this.style.cursor = "pointer";
//     this.style.color = "white";
// }
// });
// next.addEventListener("mouseout", function () {
//   if (next.disabled == false)
//   {
//     this.style.backgroundColor = "buttonface";
//     this.style.color = "black";
//   }
// });
// prev.addEventListener("mouseover", function () {
//   if (prev.disabled == false)
//   {
//     this.style.backgroundColor = "#FF2020";
//     this.style.cursor = "pointer";
//     this.style.color = "white";
//   }
// });
// prev.addEventListener("mouseout", function () {
//   if (next.disabled == false)
//   {
//     this.style.backgroundColor = "buttonface";
//     this.style.color = "black";
//   }
// });
