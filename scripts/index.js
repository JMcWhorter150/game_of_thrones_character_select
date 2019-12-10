function getCategories() {
    const categoryContainer = document.querySelector("js-category");
    let gotAddress = "https://anapioficeandfire.com/api/";
    fetch(gotAddress)
        .then(r => r.json())
        .then(getAddresses)
}

function getAddresses (object) {
    let categoryNames = Object.keys(object)
    categoryNames.map(createLiElement)
                 .map(function (element) {
                                    element.dataAttribute = object[element.textContent]
                                    element.addEventListener("click", fetchClick)
                                    return element;
                                })
                 .map(addToCategoryContainer)
}

// either add hidden anchor tag that has href data that can be fetched

function createLiElement(str) {
    let li = document.createElement('li');
    li.textContent = str;
    return li;
}

function addToCategoryContainer(element) {
    // console.log(element);
    const categoryContainer = document.querySelector(".js-category");
    categoryContainer.appendChild(element);
}

function addToMasterlistContainer(element) {
    const masterListContainer = document.querySelector(".js-masterlist");
    masterListContainer.appendChild(element);
}

function fetchClick (event) {
    clearMasterlist();
    clearDetails();
    let address = event.target.dataAttribute;
    fetch(address)
    .then(r => r.json())
    .then(r => console.log(r))
    .then(getCategoryDetails)
}

function getCategoryDetails(arrayofObjects) {
    let arrayofNames = arrayofObjects.map(obj => obj.name);
    let arrayofElements = arrayofNames.map(createLiElement);
    arrayofElements = getUrlFromArray(arrayofObjects, arrayofElements)
    arrayofElements.map(element => element.addEventListener("click", getDetails))
    arrayofElements.map(addToMasterlistContainer);
    addButton(arrayofObjects, "Get Next 10");
}

function addButton (arrayofObjects, text) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener("click", function (arrayofObjects) {
        
    })
    let masterlistContainer = document.querySelector('js-masterlist');
    masterlistContainer.appendChild(button);
}

function getUrlFromArray(arrayofObjects, arrayofElements) {
    for (let i=0;i<arrayofObjects.length; i++) {
        arrayofElements[i].dataAttribute = arrayofObjects[i].url;
    }
    return arrayofElements;
}

function getDetails(event) {
    const detailAddress = event.target.dataAttribute;
    fetch(detailAddress)
        .then(r => r.json())
        .then(showDetails)
}

function showDetails(object) {
    clearDetails();
    let keys = Object.keys(object);
    let dataArray = keys.map(function (key) {
        return `${key}: ${object[key]}`
    })
    let dataElementArray = dataArray.map(createLiElement);
    dataElementArray.map(function (element) {
        let detailContainer = document.querySelector(".js-detail");
        detailContainer.appendChild(element);
    })
}

function clearMasterlist() {
    let masterList = document.querySelector(".js-masterlist")
    masterList.textContent = "";
}

function clearDetails() {
    let detailContainer = document.querySelector('.js-detail');
    detailContainer.textContent = "";
}

function main() {
    getCategories();
}

main();