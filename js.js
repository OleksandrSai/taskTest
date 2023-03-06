let transfer = document.querySelector("#transfer")
let storage = document.querySelector("#storage")
let diagram = document.querySelector(".diagram")
let optionsBunny
let optionsScaleway
let vultr
let scaleway
let bunny
let backblaze
let arrayColors = ["red", "orange", "violet", "blue"]
let arrayheight



document.addEventListener("input", function () {

    document.querySelector(".transfer__name").innerHTML = `Transfer - ${transfer.value}`;
    document.querySelector(".storage__name").innerHTML = `Storage - ${storage.value}`;
    
    document.querySelectorAll("[name='bunnys']").forEach(el =>{
    if(el.checked) optionsBunny = el.value});
    
    document.querySelectorAll("[name='scaleway']").forEach(el =>{
    if(el.checked) optionsScaleway = el.value})


    backblaze = ((storage.value * 0.005) + (transfer.value * 0.01)) <= 7 ? 7
    : ((storage.value * 0.005) + (transfer.value * 0.01))
    
    bunny = optionsBunny == true ? (storage.value * 0.02) + (transfer.value * 0.01) : (storage.value * 0.01) + (transfer.value * 0.01)
    if(bunny > 10) bunny = 10

    scaleway = function (){
    let myStorageValue = storage.value <= 75 ? 0 : (storage.value - 75);
    let myTransferValue = transfer.value <= 75 ? 0 : (transfer.value - 75);
    return optionsScaleway == true ? (myStorageValue * 0.03) + (myTransferValue * 0.02)
     : (myStorageValue * 0.06) + (myTransferValue * 0.02);
    }

    vultr =  ((storage.value * 0.01) + (transfer.value * 0.01)) <= 5 ? 5
    : ((storage.value * 0.01) + (transfer.value * 0.01))
    let container = document.querySelector(".diagram");


    let createDiagram = createBarChart([backblaze, bunny, scaleway(), vultr], 540, 100);
        container.innerHTML = ""
        container.append(createDiagram)
      
    showMeColor()    
})


function showMeColor(){
    let minHeight = arrayheight[0];
    let colorId
    arrayheight.forEach((el) => {
        if(el < minHeight) minHeight = el})
    
    arrayheight.forEach((el,id)=> {
        if(el == minHeight) colorId = id
    })
    document.querySelectorAll(".bar").forEach((elem, id, arr)=> arr[colorId].style.backgroundColor = arrayColors[colorId])
}


function createBarChart(data, width, height) {

    let chart = document.createElement("div");
    chart.style.width = width + "px";
    chart.style.height = height + "px";
    chart.style.position = "relative";
    
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < data.length; i++) {
        if (max < data[i]) max = data[i];
    }
    arrayheight = []

    let scale = height / max;

    for (let i = 0; i < data.length; i++) {
        arrayheight.push(data[i]*scale)
        let bar = document.createElement("div");
        let price = document.createElement("div")
        price.textContent = `${parseInt(data[i])}$`

        price.style.position = "absolute",
        price.style.top = "-25px"
        price.style.right = "10px"
        bar.append(price)
        bar.className = "bar"
        bar.style.height = data[i] * scale + "px";
        bar.style.width = 35 + "px";
        bar.style.position = "absolute";
        bar.style.marginLeft = "9px";
        bar.style.bottom = "0px";
        bar.style.left = 83 * i + "px";
        bar.style.border = "1px solid black"

        bar.style.backgroundColor = "silver"

        chart.append(bar);
    }

    return chart;
}



