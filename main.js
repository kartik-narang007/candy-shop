const nameInput = document.getElementById('name');
const description = document.getElementById('description');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const form = document.getElementById('my-form');
const msg = document.querySelector('.msg');
const stockList = document.getElementById('stock');

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value !== '' || description.value !== '' || price.value !== '' || quantity.value !== '') {
    const obj = {
      nameValue: nameInput.value,
      descriptionvalue: description.value,
      priceValue: price.value,
      quantityValue: quantity.value
    };
    try {
      const res = await axios.post('https://crudcrud.com/api/c606b85524b44a19b9e341f786f1f198/candyVendor', obj);

      const stock = res.data;
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${stock.nameValue} : ${stock.descriptionvalue} : ${stock.priceValue} : ${stock.quantityValue}`));
      stockList.appendChild(li);
      nameValue = '';
      descriptionValue = '';
      priceValue = '';
      quantityValue = '';

    } catch (err) {
      console.log(err);
    }
  }
}

async function getStockDetails() {
  try {
    const res = await axios.get('https://crudcrud.com/api/c606b85524b44a19b9e341f786f1f198/candyVendor');
    const stockDetails = res.data;
    stockDetails.forEach(function(stock) {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${stock.nameValue} : ${stock.descriptionvalue} : ${stock.priceValue} : ${stock.quantityValue}`));
      createButtons(li, stock);
      stockList.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
}

getStockDetails();

function createButtons(li, stock) {
  const buyOne = document.createElement('button');
  buyOne.innerHTML = 'Buy One';
  buyOne.addEventListener('click', async () => {
    try {
      const updatedQuantity = parseInt(stock.quantityValue) - 1; // Decrease the quantity by 1
      const updatedStock = { ...stock, quantityValue: updatedQuantity.toString() };
      const res = await axios.put(`https://crudcrud.com/api/c606b85524b44a19b9e341f786f1f198/candyVendor/${stock._id}`, updatedStock);

      // Update the quantity value in the DOM
      stock.quantityValue = updatedQuantity.toString();
      li.firstChild.nodeValue = `${stock.nameValue} : ${stock.descriptionvalue} : ${stock.priceValue} : ${stock.quantityValue}`;

      console.log('Quantity updated successfully:', res.data);
    } catch (err) {
      console.log('Error updating quantity:', err);
    }
  });

  li.appendChild(buyOne);


  const buyTwo = document.createElement('button');
  buyTwo.innerHTML = "But Two";
  buyTwo.addEventListener('click', async ()=>{
    try{
        const updatedQuantity = parseInt(stock.quantityValue) - 2;
        const updatedStock = {...stock, quantityValue : updatedQuantity.toString()};
        const res = await axios.put(`https://crudcrud.com/api/c606b85524b44a19b9e341f786f1f198/candyVendor/${stock._id}`, updatedStock);

        //updating it to DOM
        stock.quantityValue = updatedQuantity.toString();
        li.firstChild.nodeValue = `${stock.nameValue} : ${stock.descriptionvalue} : ${stock.priceValue} : ${stock.quantityValue}`;

    }catch(err){
        console.log('Error updating quantitiy', err);
    }
  })
  li.appendChild(buyTwo);

  const buyThree = document.createElement('button');
  buyThree.innerHTML = "But Three";
  buyThree.addEventListener('click', async ()=>{
    try{
        const updatedQuantity = parseInt(stock.quantityValue) - 3;
        const updatedStock = {...stock, quantityValue : updatedQuantity.toString()};
        const res = await axios.put(`https://crudcrud.com/api/c606b85524b44a19b9e341f786f1f198/candyVendor/${stock._id}`, updatedStock);

        //updating it to DOM
        stock.quantityValue = updatedQuantity.toString();
        li.firstChild.nodeValue = `${stock.nameValue} : ${stock.descriptionvalue} : ${stock.priceValue} : ${stock.quantityValue}`;

    }catch(err){
        console.log('Error updating quantitiy', err);
    }
  })
  li.appendChild(buyThree);
}
