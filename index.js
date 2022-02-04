const baseURL = "file:///Users/gian/Desktop/Foodblog";
var currentMode = "bright";
const isMobile = window.matchMedia("(pointer:coarse)").matches;
const pastBlogs = [
    {
        name: "Alchemist",
        urlName: "Alchemist",
        postDate: new Date("2/5/2022"),
        coverImg: "titleImgs/alchemist.png",
        writer: "Noée",
        shortDescription: "Das Alchemist ist ein cooles, experimentelles Restaurant an der Schifflände mit vielen verschiedenen Speisen wie z.B. Dips, Suppen, Pommes, Brot."
    },
    {
        name: "Café Streuli",
        urlName: "Streuli",
        postDate: new Date("2/5/2022"),
        coverImg: "https://hummel.cafe-streuli.ch/fileadmin/_processed_/d/0/csm_Feingebaeck_8e4f068eef.jpg",
        writer: "Arik",
        shortDescription: "Das Café Streuli liegt etwas versteckt auf dem Bruderholz, in dem man Café, Gebäck, Konfekt und ein Snackangebot verzehren kann."
    },
    {
        name: "Wiesengarten Musetti",
        urlName: "Musetti",
        postDate: new Date("2/5/2022"),
        coverImg: "http://www.wiesengartenmusetti.ch/images/show/imp_14.jpg",
        writer: "Arik",
        shortDescription: "Das Restaurant Wiesengarten ist ein edles kleines Restaurant in Riehen, gedacht für Hochzeitsessen und Geburtstage."
    },
    {
        name: "Café Bar Elisabethen",
        urlName: "Elisabethen",
        postDate: new Date("2/5/2022"),
        coverImg: "titleImgs/elisabethen.png",
        writer: "Noée",
        shortDescription: "Die Café Bar Elisabethen befindet sich direkt in der Elisabethenkirche und ist optimal für einen kleinen Zwischenstop."
    },
]

Number.prototype.clamp = function(min, max) {
    return (this >= max ? max : (this <= min ? min : Number(this)))
}

function toggleDarkmode() {
    const body = document.body;
    const svgChildren = document.querySelectorAll("#darkModeToggle circle, #darkModeToggle path");
    const svg = document.getElementById("darkModeToggle");
    const Tables = document.querySelectorAll("#content table *");
    const textElems = document.querySelectorAll("#content > p, td, th");
    const elemsToSwitch = [...Tables, ...textElems, ...svgChildren, body, svg];
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
    const collapseSidebar = document.createElement("img");
    collapseSidebar.setAttribute("id", "collapseSidebar");
    collapseSidebar.setAttribute("src", `${baseURL}/images/menucollapse.png`);
    collapseSidebar.setAttribute("onclick", "collapseSidebar()");
    const svg = makeDarkModeToggle();
    headerElem.appendChild(svg)
    headerElem.appendChild(collapseSidebar);
    headerElem.appendChild(logo);
    if (!isMobile) {
        const aboutUs = document.createElement("a");
        aboutUs.innerText = "Über uns";
        aboutUs.setAttribute("id", "aboutUs");
        aboutUs.setAttribute("href", `${baseURL}/aboutus/index.html`)
        headerElem.appendChild(aboutUs);
    }
    return headerElem;
}

function makeFavicons() {
    let favicons = `<link rel="apple-touch-icon-precomposed" sizes="57x57" href="${baseURL}/images/favicomatic/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="${baseURL}/images/favicomatic/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="${baseURL}/images/favicomatic/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="${baseURL}/images/favicomatic/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="${baseURL}/images/favicomatic/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="${baseURL}/images/favicomatic/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="${baseURL}/images/favicomatic/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="${baseURL}/images/favicomatic/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="${baseURL}/images/favicomatic/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="${baseURL}/images/favicomatic/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="${baseURL}/images/favicomatic/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="${baseURL}/images/favicomatic/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="${baseURL}/images/favicomatic/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="${baseURL}/images/favicomatic/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="${baseURL}/images/favicomatic/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="${baseURL}/images/favicomatic/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="${baseURL}/images/favicomatic/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="${baseURL}/images/favicomatic/mstile-310x310.png" />`;
    return favicons;
}

function makeFooter() {
    const footer = document.createElement("footer");
    footer.id = "footer";
    const contact = document.createElement("a");
    contact.innerText = "Kontaktier uns!"
    contact.target = "_blank"
    contact.href = "mailto:baselfoodblog@gmail.com"
    footer.appendChild(contact);
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

function makeSidebar() {
    const sideBar = document.createElement("div");
    sideBar.id = "sidebar";
    if (isMobile) {
        let blog = document.createElement("div");
        blog.classList.add("sideBarBlog");
        const aboutUs = document.createElement("span");
        aboutUs.innerText = "Über uns";
        blog.appendChild(aboutUs);
        blog.onclick = function() {
            location.href = `${baseURL}/aboutus/index.html`
        }
        sideBar.appendChild(blog);
    }
    for (let pastBlog of pastBlogs.reverse()) {
        let blog = document.createElement("div");
        blog.classList.add("sideBarBlog");
        if (`${baseURL}/${pastBlog.urlName}/index.html`.toLocaleLowerCase() == location.href.toLocaleLowerCase()) {
            blog.id = "currentBlog";
        }
        blog.onclick = function() {
            location.href = `${baseURL}/${pastBlog.urlName}/index.html`
        }
        blog.innerHTML = `<span>${pastBlog.name} - ${pastBlog.postDate.getDate()}.${pastBlog.postDate.getMonth() + 1}</span>`
        sideBar.appendChild(blog);
    }
    return sideBar
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
        infoValue.classList.add("infoValue");
        if (info == "Website") {
            infoValue.innerHTML = `<a href="${dict[info]}" target="_blank">${dict[info]}</a>`
        } else if (info == "Email") {
            infoValue.innerHTML = `<a href="mailto:${dict[info]}" target="_blank">${dict[info]}</a>`
        } else {
            infoValue.innerText = dict[info];
        }
        tableRow.appendChild(infoName);
        tableRow.appendChild(infoValue);
        Tbody.appendChild(tableRow);
    }
    Table.appendChild(Tbody);
    return Table;
}

function makeOpeningTimes(openingTimes) {
    if (openingTimes.constructor != Object) {
        console.error("D'Öffnigszite mien als {Object} formattiert si.");
    }
    const containingDiv = document.createElement("div");

    const openingTimesTitle = document.createElement("h3");
    openingTimesTitle.innerText = "Öffnungszeiten";
    openingTimesTitle.id = "openingTimesTitle"
    containingDiv.appendChild(openingTimesTitle);

    const Table = document.createElement("table");
    const Tbody = document.createElement("tbody");

    for (let openingTimeElem in openingTimes) {
        let tableRow = document.createElement("tr");
        let openingDays = document.createElement("td");
        openingDays.classList.add("openingDays")
        openingDays.innerText = openingTimeElem.replaceAll("_", " ");
        let openingTime = document.createElement("td");
        openingTime.classList.add("openingTime");
        openingTime.innerText = openingTimes[openingTimeElem];
        tableRow.appendChild(openingDays);
        tableRow.appendChild(openingTime);
        Tbody.appendChild(tableRow);
    }
    Table.appendChild(Tbody);
    Table.id = "openingTimesTable";
    containingDiv.appendChild(Table)
    return containingDiv;
}

function makeLandingPage() {
    const content = document.createElement("article");
    content.id = "content";
    
    let titleElem = document.createElement("h1");
    titleElem.innerText = "Baselfood - Der Foodblog für die Region Basel";
    titleElem.id = "title";
    content.appendChild(titleElem);
    
    const blogs = document.createElement("div");
    blogs.id = "blogs";
    
    for (let pastBlog of pastBlogs.reverse()) {
        let containingDiv = document.createElement("div");
        
        let blogTitle = document.createElement("h3");
        blogTitle.innerText = pastBlog.name;
        blogTitle.classList.add("blogTitle");
        
        let blogImg = new Image();
        if (pastBlog.coverImg.split("").slice(0, 8).join("") == "https://" || pastBlog.coverImg.split("").slice(0, 7).join("") == "http://") {
            blogImg.src = pastBlog.coverImg;
        } else {
            blogImg.src = `${baseURL}/images/${pastBlog.coverImg}`;
        }
        blogImg.classList.add("blogImg");
        
        let blogDescription = document.createElement("p");
        blogDescription.innerText = pastBlog.shortDescription;
        blogDescription.classList.add("blogDescription");
        
        let blogDate = document.createElement("p");
        blogDate.innerText = pastBlog.postDate.toLocaleDateString("de-de");
        blogDate.classList.add("blogDate");
        
        containingDiv.classList.add("blog");
        containingDiv.onclick = _ => location.href = `${baseURL}/${pastBlog.urlName}/index.html`;
        
        containingDiv.appendChild(blogTitle);
        containingDiv.appendChild(blogImg);
        containingDiv.appendChild(blogDescription);
        containingDiv.appendChild(blogDate);
        blogs.appendChild(containingDiv);
    }
    content.appendChild(blogs);
    return content;
}

function makeMainContent(title, text, imgs, ratings, infoBox, openingTimes) {
    const content = document.createElement("article");
    let titleElem = document.createElement("h1");
    titleElem.setAttribute("id", "title");
    titleElem.innerText = title;
    content.appendChild(titleElem);
    if (infoBox) {
        let infoBoxTable = makeInfoBox(infoBox);
        infoBoxTable.id = "infoBox";
        content.appendChild(infoBoxTable);
    }
    if (imgs) {
        const images = document.createElement("div")
        if (imgs.constructor == Array) {
            for (let img of imgs) {
                if (img == "break") {
                    breakElem = document.createElement("br")
                    images.appendChild(breakElem)
                } else if (img.split("").slice(0, 8).join("") == "https://" || img.split("").slice(0, 7).join("") == "http://") {
                let newImg = new Image();
                newImg.src = img;
                images.appendChild(newImg);
            } else {
                let newImg = new Image();
                newImg.src = `${baseURL}/images/${img}`;
                images.appendChild(newImg)
            }
        }
    } else if (imgs.constructor == String && imgs.split("").slice(0, 8).join("") == "https://" || imgs.split("").slice(0, 7).join("") == "http://") {
    let newImg = new Image();
    newImg.src = img;
    images.appendChild(newImg);
} else if (imgs.constructor == String) {
    let newImg = new Image();
    newImg.src = `${baseURL}/images/${img}`;
    images.appendChild(newImg)
} else {
    console.error('Bilder mönn entweder e "String" oder e [Array] si.');
}
images.id = "images";
content.appendChild(images);
}
if (openingTimes) {
        let openingTimesTable = makeOpeningTimes(openingTimes);
        openingTimesTable.id = "openingTimes";
        content.appendChild(openingTimesTable);
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