let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container")
let minRange = 1;
let maxRange = 100;
let numOfBars = 100;
let heightFactor = 6.5
let unsorted_array = new Array(numOfBars);

//function to create a random number 
function randomNum(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to create a random array using minRange and maxRange as arguments 
function createRandomArray(){
    for(let i = 0; i < numOfBars; i++){
        unsorted_array[i] = randomNum(minRange, maxRange)
    }
}

// function to render bars when page is loaded 
document.addEventListener("DOMContentLoaded", function () {
    createRandomArray();
    renderBars(unsorted_array);
})

// function for bar rendering 
function renderBars(array){
    for(let i = 0;i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 10 + "px";
        bars_container.appendChild(bar)
    }
}

// onclick function to get random array
randomize_array.addEventListener("click", function () {
    createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array)
})

//sleep function to add a delay for animation
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms))
}

//bubble sort function
async function bubbleSort(array){
    let bars = document.getElementsByClassName("bar")
    for(let i = 0; i < array.length;i++){
        for(let j = 0; j < array.length - 1;j++){
            if(array[j] > array[j + 1]){
                for(let k = 0; k < bars.length; k++){
                    if(k !== j && k !== j + 1){
                        bars[k].style.backgroundColor = "aqua";   
                  }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "lightgreen";
                // bars[j].innerText = array[j];
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                // bars[j + 1].innerText = array[j + 1];
                await sleep(1000)
            }
        }
        await sleep(1000)
    }
    return array;
}

sort_btn.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
    console.log(sorted_array)
})