/** get all input */
const laptopName = document.querySelector(".laptopName");
const weight = document.querySelector(".weight");
const ram = document.querySelector(".ram");
const battery = document.querySelector(".battery");
const price = document.querySelector(".price");
const processorSpeed = document.querySelector(".processorSpeed");

const laptopWeight = document.querySelector(".laptopWeight");
const ramWeight = document.querySelector(".ramWeight");
const batteryWeight = document.querySelector(".batteryWeight");
const priceWeight = document.querySelector(".priceWeight");
const processorSpeedWeight = document.querySelector(".processorSpeedWeight");

const criteriaItemBody = document.getElementById("criteria-item-body");

const formBtn = document.querySelector(".criteria-form-btn");
const calculationBtn = document.querySelector(".calculation-btn");

const tableResultContainer = document.getElementById('table-result-container');
const resetBtn = document.querySelector('.reset-result-btn');

let squareOfItems = {};
let arrayOfItems = []; /** should be array of object*/

function displayResult() {
  if (arrayOfItems.length > 0) {
    let parsedValueHTML = "";
    for (let i = 0; i < arrayOfItems.length; i++) {
      parsedValueHTML += `
               <tr>
                 <td>${arrayOfItems[i].laptopName}</td>
                 <td>${arrayOfItems[i].score}</td>
                 <td>${(i + 1)}</td>
               </tr>
            `;
    }
    tableResultContainer.innerHTML = parsedValueHTML;
  }

}

formBtn.addEventListener("click", function (e) {
  squareOfItems = {};

  arrayOfItems.push({
    laptopName: laptopName.value,
    price: Number(price.value),
    ram: Number(ram.value),
    battery: Number(battery.value),
    processorSpeed: Number(processorSpeed.value),
    weight: Number(weight.value),
    score: 0,
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

  let idxSquareItem = 0;

  Object.keys(arrayOfItems[0]).forEach((key) => {
    console.log(key);
    if (
      typeof arrayOfItems[0][key] === "number" ||
      !isNaN(arrayOfItems[0][key])
    ) {

      if (key !== 'score') {
        squareOfItems[`${key}`] = {
          values: [],
          normalizations: [],
          calculatedResult: 0,
        };

        if (laptopWeight.className.toLowerCase().includes(key.toLowerCase())) {
          squareOfItems[`${key}`]['tipe'] = 'cost'
          squareOfItems[`${key}`]['bobot'] = Number(laptopWeight.value);
        }
        if (ramWeight.className.toLowerCase().includes(key.toLowerCase())) {
          squareOfItems[`${key}`]['tipe'] = 'benefit'
          squareOfItems[`${key}`]['bobot'] = Number(ramWeight.value);

        }
        if (batteryWeight.className.toLowerCase().includes(key.toLowerCase())) {
          squareOfItems[`${key}`]['tipe'] = 'benefit'
          squareOfItems[`${key}`]['bobot'] = Number(batteryWeight.value);

        }
        if (processorSpeedWeight.className.toLowerCase().includes(key.toLowerCase())) {
          squareOfItems[`${key}`]['tipe'] = 'benefit'
          squareOfItems[`${key}`]['bobot'] = Number(processorSpeedWeight.value);

        }
        if (priceWeight.className.toLowerCase().includes(key.toLowerCase())) {
          squareOfItems[`${key}`]['tipe'] = 'cost'
          squareOfItems[`${key}`]['bobot'] = Number(priceWeight.value);

        }
      }

    }

    idxSquareItem += 1;
  });
});


calculationBtn.addEventListener("click", function () {

  for (const itemDetail of arrayOfItems) {
    for (const [key, value] of Object.entries(itemDetail)) {
      if (squareOfItems[key] && key !== 'score') {
        squareOfItems[key].values.push({
          value: value,
          group: itemDetail.laptopName,
        });
      }
    }

    for (const [key, value] of Object.entries(squareOfItems)) {
      let calculatedResult = 0;
      squareOfItems[key].calculatedResult = squareOfItems[key].values.map((detailMapped) => {
        const currentCalculated = Math.sqrt(detailMapped.value ** 2);
        calculatedResult += currentCalculated;
      });

      squareOfItems[key].calculatedResult = Math.sqrt(calculatedResult);
      squareOfItems[key].normalizations = squareOfItems[key].values.map((item) => {
        return {
          laptopName: item.group,
          value: item.value / squareOfItems[key].calculatedResult
        };
      });
    }
  }


  /** calculate result */

  for (const arrayItem of arrayOfItems) {
    let calculatedScore = 0;
    for (const [key, value] of Object.entries(squareOfItems)) {
      const findByLaptopName = squareOfItems[key].normalizations.find((item) => item.laptopName.toLowerCase().includes(arrayItem.laptopName));
      if (findByLaptopName) {
        if (squareOfItems[key].tipe === "cost") {
          calculatedScore -= Number((findByLaptopName.value * squareOfItems[key].bobot));
        } else {
          calculatedScore += Number((findByLaptopName.value * squareOfItems[key].bobot));
        }
      }
    }

    console.log(calculatedScore);
    arrayItem.score = Math.abs(calculatedScore);

  }
  arrayOfItems = arrayOfItems.sort((a, b) => b.score - a.score);

  displayResult();
});


resetBtn.addEventListener('click', function(){
  laptopName.value = null;
  processorSpeed.value= null;
  processorSpeedWeight.value = null;
  ram.value = null
  ramWeight.value = null;
  battery.value = null;
  batteryWeight.value = null;
  price.value = null;
  priceWeight.value = null;
  weight.value  = null;
  laptopWeight.value = null;

  arrayOfItems = null;
  tableResultContainer.innerHTML = "";

  tableResultContainer.innerHTML = "";
});