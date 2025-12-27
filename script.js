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

let squareOfItems = {};
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
  let idxSquareItem = 0;

  Object.keys(arrayOfItems[0]).forEach((key) => {
    if (
      typeof arrayOfItems[0][key] === "number" ||
      !isNaN(arrayOfItems[0][key])
    ) {
      squareOfItems[`${key}`] = {
         values: [],
         normalizations: [],
         calculatedResult: 0
      };
    }

    idxSquareItem += 1;
  });

  
  for(const itemDetail of arrayOfItems) {
     for(const [key,value] of Object.entries(itemDetail)){
         if(squareOfItems[key]) {
           squareOfItems[key].values.push(value);
         }
     }

     for(const [key,value] of Object.entries(squareOfItems)){
        let calculatedResult = 0;
        squareOfItems[key].calculatedResult = squareOfItems[key].values.map((detailMapped) => {
          const currentCalculated = Math.sqrt(detailMapped**2);
          calculatedResult += Math.sqrt(detailMapped**2);
        });

        squareOfItems[key].calculatedResult = Math.sqrt(calculatedResult);
        squareOfItems[key].normalizations = squareOfItems[key].values.map((item) => {
           return item / squareOfItems[key].calculatedResult;
        });
     }
  }

  for(const finalCalculatedItem of squareOfItems){
     
  }

  /** calculate result */

  squareOfItems = {};


});
