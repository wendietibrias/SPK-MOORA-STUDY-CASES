/** get all input */
const laptopName = document.querySelector(".laptopName");
const weight = document.querySelector(".weight");
const ram = document.querySelector(".ram");
const battery = document.querySelector(".battery");
const price = document.querySelector(".price");
const processorSpeed = document.querySelector(".processorSpeed");

const criteriaItemBody = document.getElementById("criteria-item-body");

const formBtn = document.querySelector(".criteria-form-btn");
const calculationBtn = document.querySelector(".calculation-btn");

let arrayOfItems = []; /** should be array of object*/

formBtn.addEventListener("click", function (e) {
  arrayOfItems.push({
    laptopName: laptopName.value,
    price: parseInt(price.value),
    ram: parseInt(ram.value),
    battery: parseInt(battery.value),
    processorSpeed: parseInt(processorSpeed.value),
    weight: parseInt(weight.value),
  });

  let parsedValueHTML = "";
  /** loop updated array of items */
  for (let i = 0; i < arrayOfItems.length; i++) {
    parsedValueHTML += `
               <tr>
                 <td>${arrayOfItems[i].laptopName}</td>
                 <td>${arrayOfItems[i].ram}</td>
                 <td>${arrayOfItems[i].price}</td>
                 <td>${arrayOfItems[i].processorSpeed}</td>
                 <td>${arrayOfItems[i].weight}</td>
                 <td>${arrayOfItems[i].battery}</td>
               </tr>
            `;
  }

  criteriaItemBody.innerHTML = parsedValueHTML;
});

calculationBtn.addEventListener("click", function () {
  /** calculate result */

  let squareRootOfItem = [];
  let idxRetrieved = 1;

  for (const [index, value] of arrayOfItems.entries()) {
    if (index > 0) {
      const findExisting = squareRootOfItem.find(
        (item) => item.name === `C${index}`
      );
      if (!findExisting) {
        const payloadCurrentItem = {
          name: `C${index + 1}`,
          values: [],
        };

        for (const [key, valueDetail] of value.entries()) {
          payloadCurrentItem[values];
        }
        squareRootOfItem.push(payloadCurrentItem);
      }
      idxRetrieved += 1;
    }
  }
});
