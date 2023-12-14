fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

fetch('https://dummyjson.com/products/category/tops')
.then(res => res.json())
.then(console.log);