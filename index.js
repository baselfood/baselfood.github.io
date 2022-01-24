const baseURL = "file:///Users/gian/Desktop/Foodblog";
var currentMode = "bright";

Number.prototype.clamp = function(min, max) {
    return (this >= max ? max : (this <= min ? min : Number(this)))
}

function toggleDarkmode() {
    const body = document.body;
    const svgChildren = document.querySelectorAll("#darkModeToggle circle, #darkModeToggle path");
    const Tables = document.querySelectorAll("#content > table *");
    const content = document.getElementById("content");
    const textElems = document.querySelectorAll("#content > p, td, th");
    const elemsToSwitch = [...Tables, ...textElems, ...svgChildren, content, body, ];
    if (!elemsToSwitch[0].classList.contains("animate")){
        elemsToSwitch.forEach(x => x.classList.add("animate"))
    }
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

function makeDarkModeToggle() {
    let svg = document.createElement("div");
    svg.innerHTML = `
    <svg viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
    <g transform="matrix(0.69,0,0,0.69,20.65,35.14)">
    <circle cx="115" cy="94" r="50"/>
    </g>
    <g transform="matrix(1,0,0,0.853659,0,2.34146)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(-1,1.22465e-16,-1.04543e-16,-0.853659,200,197.644)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(-1.83697e-16,-1,0.853659,-1.56815e-16,2.35632,200)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(6.12323e-17,1,-0.853659,5.22715e-17,197.644,3.55271e-15)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(0.707495,0.706718,-0.603296,0.603959,98.1384,-39.5975)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(-0.707495,-0.706718,0.603296,-0.603959,101.862,239.583)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(0.706718,-0.707495,0.603959,0.603296,-39.5827,101.862)">
    <path d="M100,16L100,57"/>
    </g>
    <g transform="matrix(-0.706718,0.707495,-0.603959,-0.603296,239.583,98.1384)">
    <path d="M100,16L100,57"/>
    </g>
    </svg>`;
    svg.id = "darkModeToggle";
    svg.onclick = function() {
        toggleDarkmode();
    }
    return svg;
}

function makeHeader() {
    const headerElem = document.createElement("div");
    headerElem.setAttribute("id", "header");
    const logo = document.createElement("img");
    logo.setAttribute("src", `${baseURL}/images/Logo.png`);
    logo.setAttribute("id", "logo");
    logo.setAttribute("onclick", `location.href = "${baseURL}/index.html"`);
    const aboutUs = document.createElement("a");
    aboutUs.innerText = "Über uns";
    aboutUs.setAttribute("id", "aboutUs");
    aboutUs.setAttribute("href", `${baseURL}/aboutus/index.html`)
    const collapseSidebar = document.createElement("img");
    collapseSidebar.setAttribute("id", "collapseSidebar");
    collapseSidebar.setAttribute("src", `${baseURL}/images/menucollapse.png`);
    collapseSidebar.setAttribute("onclick", "collapseSidebar()");
    const svg = makeDarkModeToggle();
    headerElem.appendChild(svg)
    headerElem.appendChild(collapseSidebar);
    headerElem.appendChild(logo);
    headerElem.appendChild(aboutUs);
    return headerElem;
}

function makeFooter(text) {
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
            infoValue.innerHTML = `<a href="${dict[info]}" target="_blank">${dict[info]}</a>`
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