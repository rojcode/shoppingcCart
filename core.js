const $ = document;


let counterCart = 0;

let cartArray = [];


// Title
const title = $.createElement('title');
const head = $.querySelector('head');
if (head) {
   title.textContent = `سبد خرید (${counterCart})`;
   head.append(title)
} else {
   console.error(`We can't find head`);
};


// Cart Button
const cartButton = $.querySelector('.green-button');
if (cartButton) {
   cartButton.innerHTML = `سبد خرید (${counterCart})`;
   cartButton.addEventListener('click', (e) => {
      showModal(cartArray);
   });
} else {
   console.error(`We cant't find cardButton`);
};

// Store Name
const logo = $.querySelector('.logo');
if (logo) {
   logo.innerHTML = 'کردستان کالا';
} else {
   console.error(`We can't find logo`);
};

/// Pagination

let paginationSetUp = new Pagination(products, 3);
paginationSetUp.goToPage(1);
const firstPageItem = paginationSetUp.getPageItems();


const formatNumberSeparate = (number) => {
   let formattedNumber = new Intl.NumberFormat().format(number);
   return formattedNumber;
};


// Products
const sectionProducts = $.querySelector('.products');


const createItem = (parent, name, des, priceItem, img, add) => {
   const productItem = $.createElement('div');
   productItem.classList.add('product');
   const imgProduct = $.createElement('img');
   imgProduct.src = img;

   const h3 = $.createElement('h3');
   h3.innerHTML = name;

   const p = $.createElement('p');
   p.textContent = des;

   const price = $.createElement('p');
   price.textContent = formatNumberSeparate(priceItem);

   const button = $.createElement('button');
   button.classList.add('green-button');
   button.innerHTML = 'اضافە به سبد خرید';


   productItem.append(imgProduct, h3, p, price, button)
   parent.appendChild(productItem);

   button.addEventListener('click', (e) => {
      add(e, button);
   })

}


const showItem = (array) => {
   array.forEach(pro => {
      createItem(sectionProducts, pro.name, pro.des, pro.price, pro.img, (data, but) => {
        counterCart += 1;
        cartButton.innerHTML = `سبد خرید (${counterCart})`;
        title.textContent = `سبد خرید (${counterCart})`;
        but.setAttribute('data-name', pro.name);
        pro.count = 1;
        cartArray.push(pro);

      })
   });
};


showItem(firstPageItem);


const classPagination = $.querySelector('.pagination');

var i = 1;
while (i <= 3) {
   let array = [];
   const button = $.createElement('button');
   button.innerHTML = i;
   button.setAttribute('data-id', i);
   if (i == 1) {
      button.classList.add('active');
   }
   button.addEventListener('click', e => {
      sectionProducts.innerHTML = '';
      const findActiveButton = $.querySelector('.pagination button.active');
      if (findActiveButton) {
         findActiveButton.classList.remove('active');
         button.classList.add('active');
      }
      const buttonId = e.target.dataset.id;
      paginationSetUp.goToPage(buttonId);
      array = paginationSetUp.getPageItems();
      showItem(array);
   });
   i++;
   classPagination.append(button);
};


const modalProduct = $.querySelector('.modal');


const showModal = (array) => {
   let sum = 0;


   //close modal
   modalProduct.style.display = 'block';
   const closeButton = $.querySelector('.close');
   closeButton.addEventListener('click', (e) => {
      modalProduct.style.display = 'none';
   });


   const priceModal = $.querySelector('#price');
   const totalPrice = (ar) => {
      ar.forEach(item => {
         sum += item.price * item.count;
         priceModal.innerHTML = formatNumberSeparate(sum);
      })
   }

   const table = $.querySelector('table');
   array.forEach(item => {

      const trTable = $.createElement('tr');
      trTable.setAttribute('data-id', item.id);


      const tdImage = $.createElement('img');
      tdImage.src = item.img;
      tdImage.style.width = '50px';
      tdImage.style.height = '50px';

      const tdName = $.createElement('td');
      tdName.innerHTML = item.name;

      const tdPrice = $.createElement('td');
      tdPrice.innerHTML = formatNumberSeparate(item.price);

      const tdNumber = $.createElement('td');
      const numberInput = $.createElement('input');
      numberInput.setAttribute('type', 'number');
      numberInput.setAttribute('data-id', item.id);
      numberInput.value = 1;
      numberInput.style.width = '30px';
      numberInput.style.height = '30px';


      numberInput.addEventListener('input', e => {
         array.forEach(item => {
            if (item.id == e.target.dataset.id) {
               item.count = Number(e.target.value);
               sum = 0;
               totalPrice(array);
            }
         })

      })


      tdNumber.append(numberInput);


      const tdDelete = $.createElement('td');
      const buttonDelete = $.createElement('button');
      buttonDelete.classList.add('delete-button');
      buttonDelete.innerHTML = 'حذف';
      buttonDelete.setAttribute('data-id', item.id);
      buttonDelete.setAttribute('data-price', item.price);

      buttonDelete.addEventListener('click', e => {
         if (trTable.dataset.id == e.target.dataset.id) {
            trTable.remove();
            const priceDel = Number(e.target.dataset.price);
            sum = sum - priceDel;
            console.log(sum);
            priceModal.innerHTML = formatNumberSeparate(sum);

         }


      });


      tdDelete.append(buttonDelete);
      trTable.append(tdImage, tdName, tdPrice, tdNumber, tdDelete);
      table.append(trTable);


   })

   totalPrice(array)
}