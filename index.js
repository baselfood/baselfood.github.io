const baseURL = "file:///Users/gian/Desktop/Foodblog";
var currentMode = "dark";

Number.prototype.clamp = function(min, max) {
    return (this >= max ? max : (this <= min ? min : Number(this)))
}

function makeHeader() {
    const headerElem = document.createElement("div");
    headerElem.setAttribute("id", "header");
    const logo = document.createElement("img");
    logo.setAttribute("src", `${baseURL}/images/Logo.png`);
    logo.setAttribute("id", "logo");
    logo.setAttribute("onclick", `location.href = "${baseURL}/index.html"`);
    const dropDown = document.createElement("div");
    dropDown.setAttribute("id", "dropdown");
    const aboutUs = document.createElement("a");
    aboutUs.innerText = "Über uns";
    aboutUs.setAttribute("id", "aboutUs");
    aboutUs.setAttribute("href", `${baseURL}/aboutus/index.html`)
    const collapseSidebar = document.createElement("img");
    collapseSidebar.setAttribute("id", "collapseSidebar");
    collapseSidebar.setAttribute("src", `${baseURL}/images/menucollapse.png`);
    collapseSidebar.setAttribute("onclick", "collapseSidebar()");
    headerElem.appendChild(collapseSidebar);
    headerElem.appendChild(logo);
    headerElem.appendChild(dropDown);
    headerElem.appendChild(aboutUs);
    return headerElem;
}

function toggleDarkmode() {
    const content = document.getElementById("content");
    const textElems = document.querySelectorAll("p, td, th")
    const elemsToSwitch = [...textElems, content]
    if (currentMode == "dark") {
        currentMode = "bright"
        elemsToSwitch.forEach(x => {
            x.classList.remove("dark")
            x.classList.add("bright")
        });
    } else if (currentMode == "bright") {
        currentMode = "dark"
        elemsToSwitch.forEach(x => {
            x.classList.remove("bright")
            x.classList.add("dark")
        });
    }
}

async function makeFooter(text) {
    const footer = document.createElement("footer");
    footer.id = "footer";
    const content = document.createElement("p");
    content.innerText = text;
    footer.appendChild(content);
    return footer
}

function collapseSidebar() {
    const sideBar = document.getElementById("sidebar")
    const content = document.getElementById("content")
    const footer = document.getElementById("footer");
    const elemsToSwitch = [sideBar, content, footer];
    if (sideBar.classList.contains("active")) {
        elemsToSwitch.forEach(x => {
            x.classList.remove("active")
            x.classList.add("inactive");
        })
    } else if (sideBar.classList.contains("inactive")) {
        elemsToSwitch.forEach(x => {
            x.classList.remove("inactive")
            x.classList.add("active");
        })
    } else {
        elemsToSwitch.forEach(x => {
            x.classList.add("active");
        })
    }
}

function makeRatingTable(dict) {
    if (dict.constructor != Object) { 
        console.error("Bewärtige mönn als {Object} formattiert si.") 
    }
    const Table = document.createElement("table");
    const Tbody = document.createElement("tbody");
    const Thead = document.createElement("thead");
    let RatingHeadText = document.createElement("th");
    RatingHeadText.innerText = "Kriterien";
    Thead.appendChild(RatingHeadText);
    let RatingHeadValues = document.createElement("th");
    RatingHeadValues.innerText = "Bewertung";
    Thead.appendChild(RatingHeadValues); 
    for (let criteria in dict) {
        currentVal = dict[criteria];
        if (currentVal.constructor != Number) {
            console.error("Bewärtige mönn nummere si.")
        }
        currentVal = currentVal.clamp(0, 5)
        let tableRow = document.createElement("tr");
        let criteriaName = document.createElement("td");
        criteriaName.innerText = criteria.replaceAll("_", " ");
        let criteriaValue = document.createElement("td");
        if (Number.isInteger(currentVal)) {
            for (var i = 0; i < currentVal; i++) {
                let newImg = new Image();
                newImg.src = `${baseURL}/images/full-star.png`;
                newImg.classList.add("star");
                criteriaValue.appendChild(newImg)
            }
            for (var i = currentVal; i < 5; i++) {
                let newImg = new Image();
                newImg.src = `${baseURL}/images/empty-star.png`;
                newImg.classList.add("star");
                criteriaValue.appendChild(newImg);
            }
        } else {
            for (var i = 1; i < currentVal; i++) {
                let newImg = new Image();
                newImg.src = `${baseURL}/images/full-star.png`;
                newImg.classList.add("star");
                criteriaValue.appendChild(newImg)
            }
            let newImg = new Image();
            newImg.src = `${baseURL}/images/half-star.png`;
            newImg.classList.add("star");
            criteriaValue.appendChild(newImg);
            for (var i = currentVal; i < 4; i++) {
                let newImg = new Image();
                newImg.src = `${baseURL}/images/empty-star.png`;
                newImg.classList.add("star");
                criteriaValue.appendChild(newImg);
            }
        }
        tableRow.appendChild(criteriaName);
        tableRow.appendChild(criteriaValue);
        Tbody.appendChild(tableRow);
    }
    Table.appendChild(Thead);
    Table.appendChild(Tbody);
    return Table;
}

function makeInfoBox(dict) {
    if (dict.constructor != Object) {
        console.error("D'Infobox muess als {Object} formattiert si.")
    }
    const Table = document.createElement("table");
    const Tbody = document.createElement("tbody");
    for (let info in dict) {
        let tableRow = document.createElement("tr");
        let infoName = document.createElement("td");
        infoName.classList.add("infoName")
        infoName.innerText = info.replaceAll("_", " ");
        let infoValue = document.createElement("td");
        if (info != "Website") {
            infoValue.innerText = dict[info];
            infoValue.classList.add("infoValue");
        } else {
            infoValue.innerHTML = `<a href="${dict[info]}">${dict[info]}</a>`
            infoValue.classList.add("infoValue");
        }
        tableRow.appendChild(infoName);
        tableRow.appendChild(infoValue);
        Tbody.appendChild(tableRow);
    }
    Table.appendChild(Tbody);
    return Table;
}

function makeMainContent(title, text, imgs, ratings, infoBox) {
    const content = document.createElement("article");
    let titleElem = document.createElement("h1");
    titleElem.setAttribute("id", "title");
    titleElem.innerText = title;
    content.appendChild(titleElem);
    if (infoBox) {
        let infoBoxTable = makeInfoBox(infoBox)
        infoBoxTable.id = "infoBox"
        content.appendChild(infoBoxTable)
    }
    if (imgs) {
        const images = document.createElement("div")
        if (imgs.constructor == Array) {
            for (let img of imgs) {
                if (img == "break") {
                    breakElem = document.createElement("br")
                    images.appendChild(breakElem)
                } else {
                    let newImg = new Image();
                    newImg.src = `${baseURL}/images/${img}`;
                    images.appendChild(newImg)
                }
            }
        } else if (imgs.constructor == String) {
            let newImg = new Image()
            newImg.src = `${baseURL}/images/${imgs}`
            images.appendChild(newImg)
        } else {
            console.error('Bilder mönn entweder e "String" oder e [Array] si.')
        }
        images.id = "images"
        content.appendChild(images);
    }
    content.setAttribute("id", "content");
    text = text.split("\n")
    for (paragraph of text) {
        let pElem = document.createElement("p")
        pElem.setAttribute("class", "paragraph");
        pElem.innerText = paragraph
        content.appendChild(pElem)
    }
    if (ratings) {
        let ratingTable = makeRatingTable(ratings)	
        ratingTable.id = "ratingTable"
        content.appendChild(ratingTable)
    }
    return content
}