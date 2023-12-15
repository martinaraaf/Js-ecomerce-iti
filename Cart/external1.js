// localStorage.setItem("onCart", 0);

fetch('https://dummyjson.com/products')
.then( (res) => {
    let myData = res.json();
    return myData;
})
.then(addToCart);

let arr = [];
let table = document.getElementById('table');

function addToCart(myData){
    let choice1 = document.getElementById('choice1');
    let choice2 = document.getElementById('choice2');
    if(JSON.parse(localStorage.loggedIn)>0){
        choice1.style.display = 'none';
        choice2.style.display = 'block';
        console.log("choice2 but first");
    }else{
        choice1.style.display = 'block';
        choice2.style.display = 'none';
        console.log("choice1 but second");
    }
    let myproducts = myData.products;
    let prod_ids = localStorage.getItem('AddMeToCart');
    console.log(prod_ids);
    prod_ids = prod_ids.replaceAll(',', '')
    
    console.log(Number(prod_ids));

    
    console.log(prod_ids)
        
    for(let i=0; i<prod_ids.length; i++){
        if(arr.length==0){
            let obj ={};
            obj.id = prod_ids[i];
            obj.Title = myproducts[prod_ids[i]].title;
            obj.price = myproducts[prod_ids[i]].price;
            obj.quantity = 1;
            obj.total = obj.price * obj.quantity;
            arr.push(obj);
        }else{
            let flag=0;
            for(let j=0; j<arr.length; j++){
                if(prod_ids[i] === arr[j].id){
                    flag=1;
                    if(flag){
                            arr[j].quantity++;
                            arr[j].total = arr[j].price * arr[j].quantity;
                    }
                }
            }if(!flag){
                let obj = {};
                obj.id = prod_ids[i];
                obj.Title = myproducts[prod_ids[i]].title;
                obj.price = myproducts[prod_ids[i]].price;
                obj.quantity = 1;
                obj.total = obj.price * obj.quantity;
                arr.push(obj);
            }
        }
    }

    console.log(arr);
    for(let i=0; i<arr.length; i++){
        let tr = document.createElement('tr');

        let plus = document.createElement('button');
        let minus = document.createElement('button');
        let span = document.createElement('span');
        plus.innerHTML = '+';
        minus.innerHTML = '-';
        plus.classList.add("plus-minus");
        minus.classList.add("plus-minus");
        plus.setAttribute('value', '+');
        minus.setAttribute('value', '-');

        let td_title = document.createElement('td');
        let td_price = document.createElement('td');
        let td_quantity = document.createElement('td');
        let td_total = document.createElement('td');

        td_title.innerHTML = arr[i].Title;
        tr.appendChild(td_title);

        td_price.innerHTML = arr[i].price;
        tr.appendChild(td_price);
        
        span.innerHTML = arr[i].quantity;
        td_quantity.appendChild(span);
        td_quantity.appendChild(plus);
        td_quantity.appendChild(minus);
        tr.appendChild(td_quantity);

        td_total.innerHTML = arr[i].total;
        tr.appendChild(td_total);

        table.appendChild(tr);
    }
        
        let receipt = 0;
        for(let i =0; i<arr.length; i++){
            receipt += arr[i].total;
        }
        let subTotal = document.getElementById('sub-total');
        subTotal.innerHTML = receipt;

        localStorage.onCart = JSON.parse(arr);
}

table.addEventListener('click', (e) => {
    let btn = document.getElementsByClassName('plus-minus');
    let q = e.target.parentElement.firstChild.innerText ;
    

    if(e.target.value == btn[0].value){
        let quant = parseInt(e.target.parentElement.firstChild.innerText);
        let lastq = e.target.parentElement.firstChild.innerHTML = eval(quant + 1);

        let prod_name = e.target.parentElement.parentElement.children[0].innerText;
        let brr = JSON.parse(localStorage.onCart);
        
        for(let i=0; i<brr.length; i++){
            if(prod_name === brr[i].Title){
                brr[i].quantity = lastq;
                brr[i].total = brr[i].quantity * brr[i].price;
                e.target.parentElement.parentElement.lastChild.innerHTML = brr[i].total;
            }
        }
        
        localStorage.setItem("onCart", JSON.stringify(brr));
        
    }else if(e.target.value == btn[1].value && q!=0){
        let quant = parseInt(e.target.parentElement.firstChild.innerText);
        let lastq = e.target.parentElement.firstChild.innerHTML = eval(quant - 1);

        let price = parseInt(e.target.parentElement.parentElement.children[1].innerText)
        e.target.parentElement.parentElement.lastChild.innerHTML = eval(price * lastq)

        localStorage.setItem("onCart", JSON.stringify(brr));
    }
})
    