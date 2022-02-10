const baseURL = (isURL(location.href)) ? "https://baselfood.github.io" : ((location.href.slice(0, 7) == "file://") ? "file:///Users/gian/Desktop/Foodblog" : alert("unreachable"))

class blog {
    constructor(name, text, imgs, ratings, infoBox, openingTimes, urlName, postDate, writer, shortDescription) {
        this.name = name;
        this.urlName = urlName;
        this.text = text;
        this.imgs = imgs;
        this.ratings = ratings;
        this.infoBox = infoBox;
        this.openingTimes = openingTimes;
        this.postDate = postDate;
        this.writer = writer;
        this.shortDescription = shortDescription
    }
}


var currentMode = "bright";
const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
const pastBlogs = [ // Make blog class and make coverImg optional
    {
        name: "Alchemist",
        urlName: "Alchemist",
        postDate: new Date("2/9/2022"),
        coverImg: "unreachable",
        writer: "Noée",
        shortDescription: "Das Alchemist ist ein cooles, experimentelles Restaurant an der Schifflände mit vielen verschiedenen Speisen wie z.B. Dips, Suppen, Pommes, Brot."
    },
    {
        name: "Café Streuli",
        urlName: "Streuli",
        postDate: new Date("2/9/2022"),
        coverImg: "https://hummel.cafe-streuli.ch/fileadmin/_processed_/d/0/csm_Feingebaeck_8e4f068eef.jpg",
        writer: "Arik",
        shortDescription: "Das Café Streuli liegt etwas versteckt auf dem Bruderholz. Dort kann man Café, Gebäck, Konfekt und ein Snackangebot verzehren."
    },
    {
        name: "Wiesengarten Musetti",
        urlName: "Musetti",
        postDate: new Date("2/9/2022"),
        coverImg: "unreachable",
        writer: "Arik",
        shortDescription: "Das Restaurant Wiesengarten ist ein edles kleines Restaurant in Riehen, gedacht für Hochzeitsessen und Geburtstage."
    },
    {
        name: "Café Bar Elisabethen",
        urlName: "Elisabethen",
        postDate: new Date("2/9/2022"),
        coverImg: "unreachable",
        writer: "Noée",
        shortDescription: "Die Café Bar Elisabethen befindet sich direkt in der Elisabethenkirche und ist optimal für einen kleinen Zwischenstop."
    },
    {
        name: "1777 Café Restaurant Bar",
        urlName: "1777",
        postDate: new Date("2/9/2022"),
        coverImg: "unreachable",
        writer: "Noée",
        shortDescription: "Das 1777 hat es sich zum Konzept genommen, die Konsument*innen genaustens entscheiden zu lassen, was ins Essen kommt."
    },

]

if (typeof structuredClone === "undefined") {
    function structuredClone(obj) {
        const oldState = history.state;
        history.replaceState(obj, null);
        const clonedObj = history.state;
        history.replaceState(oldState, null);
        return clonedObj;
    }
}

if (typeof String.prototype.replaceAll == "undefined") {
    String.prototype.replaceAll = function(find, replace) {
        x = structuredClone(this)
        while(x.includes("find")) {
            x = x.replace(find, replace);
        }
        return x;
    }
}

if (typeof Array.prototype.at == "undefined") {
    Array.prototype.at = function(index) {
        if (index < 0) {
            return this[this.length + index]
        } else {
            return this[index];
        }
    }
}

Number.prototype.clamp = function(min, max) {
    return (this >= max ? max : (this <= min ? min : Number(this)))
}

function toggleDarkmode() {
    const body = document.body;
    const Tables = document.querySelectorAll("#content table *");
    const textElems = document.querySelectorAll("#content > p, #content > td, #content > th");
    const elemsToSwitch = [...Tables, ...textElems, body];
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

function collapseSidebar() {
    const sideBar = document.getElementById("sidebar");
    const content = document.getElementById("content");
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

function isURL(URL) {
    return URL.slice(0, 8) == "https://" || URL.slice(0, 7) == "http://"
}

function makeHeader() {
    const headerElem = document.createElement("div");
    headerElem.id = "header";
    const logo = new Image();
    logo.id = "logo";
    logo.src = `${baseURL}/images/Logo.png`;
    logo.alt = "Return to Homepage";
    logo.onclick = function() {
        location.href = baseURL
    }
    const collapseSidebarElem = new Image();
    collapseSidebarElem.alt = "collapse sidebar button";
    collapseSidebarElem.id = "collapseSidebar";
    collapseSidebarElem.src = `${baseURL}/images/menucollapse.png`;
    collapseSidebarElem.onclick = function () {
        collapseSidebar()
    };
    const darkModeToggle = new Image();
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.alt = "Toggle Dark Mode"
    darkModeToggle.src = `${baseURL}/images/mode-toggle.png`
    darkModeToggle.onclick = function() {
        toggleDarkmode();
    }
    headerElem.appendChild(collapseSidebarElem);
    headerElem.appendChild(logo);
    
    if (!isMobile) {
        const aboutUs = document.createElement("a");
        aboutUs.innerText = "Über uns";
        aboutUs.id = "aboutUs";
        aboutUs.href = `${baseURL}/aboutus/`;
        headerElem.appendChild(aboutUs);
    }
    headerElem.appendChild(darkModeToggle);
    return headerElem;
}

function makeFavicons() {
    let favicons = `
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="${baseURL}/images/favicomatic/apple-touch-icon-57x57.png" />
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

function makeSidebar() {
    const sideBar = document.createElement("div");
    sideBar.id = "sidebar";
    
    for (let pastBlog of pastBlogs) {
        let blog = document.createElement("div");
        blog.classList.add("sideBarBlog");
        if (`${baseURL}/${pastBlog.urlName}/`.toLowerCase() == location.href.toLowerCase()) {
            blog.id = "currentBlog";
        }
        blog.onclick = function() {
            location.href = `${baseURL}/${pastBlog.urlName}/`
        }
        let pElem = document.createElement("p");
        let theDate = `${pastBlog.postDate.getDate()}.${pastBlog.postDate.getMonth() + 1}`;
        pElem.innerText = `${pastBlog.name} - ${theDate}`;
        blog.appendChild(pElem);
        sideBar.appendChild(blog);
    }
    
    if (isMobile) {
        let blog = document.createElement("div");
        blog.classList.add("sideBarBlog");
        const aboutUs = document.createElement("p");
        aboutUs.innerText = "Über uns";
        blog.appendChild(aboutUs);
        blog.onclick = function() {
            location.href = `${baseURL}/aboutus/`
        }
        if (`${baseURL}/aboutus/`.toLowerCase() == location.href.toLowerCase()) {
            blog.id = "currentBlog";
        }
        sideBar.appendChild(blog);
    }
    
    let blog = document.createElement("div");
    blog.classList.add("sideBarBlog");
    const aboutUs = document.createElement("p");
    aboutUs.innerText = "Startseite";
    blog.appendChild(aboutUs);
    blog.onclick = function() {
        location.href = baseURL
    }
    if (baseURL.toLowerCase() == location.href.toLowerCase()) {
        blog.id = "currentBlog";
    }
    sideBar.appendChild(blog);
    
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
        criteria = criteria.replaceAll("_", " ").replaceAll("ç", "-");
        criteriaName.innerText = criteria;
        let criteriaValue = document.createElement("td");
        for (var i = 1; i <= currentVal; i++) {
            let newImg = new Image();
            newImg.src = `${baseURL}/images/full-star.png`;
            newImg.classList.add("star");
            newImg.alt = "star";
            criteriaValue.appendChild(newImg)
        }
        if (!Number.isInteger(currentVal)) {
            let newImg = new Image();
            newImg.src = `${baseURL}/images/half-star.png`;
            newImg.classList.add("star");
            newImg.alt = "star";
            criteriaValue.appendChild(newImg);
        }
        for (var i = currentVal; i <= 4; i++) {
            let newImg = new Image();
            newImg.src = `${baseURL}/images/empty-star.png`;
            newImg.classList.add("star");
            newImg.alt = "star";
            criteriaValue.appendChild(newImg);
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
        info = info.replaceAll("_", " ").replaceAll("ç", "-")
        infoName.innerText = info;
        let infoValue = document.createElement("td");
        infoValue.classList.add("infoValue");
        if (info == "Website") {
            let aElem = document.createElement("a");
            aElem.href = dict[info];
            aElem.target = "_blank";
            aElem.innerText = dict[info];
            infoValue.appendChild(aElem);
        } else if (info == "Email") {
            let aElem = document.createElement("a");
            aElem.href = `mailto:${dict[info]}`;
            aElem.target = "_blank";
            aElem.innerText = dict[info];
            infoValue.appendChild(aElem);
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
        openingDays.classList.add("openingDays");
        openingDays.innerText = openingTimeElem.replaceAll("_", " ").replaceAll("ç", "-");
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
    
    for (let pastBlog of pastBlogs) {
        let containingDiv = document.createElement("div");
        containingDiv.id = pastBlog.urlName;
        
        let blogTitle = document.createElement("h3");
        blogTitle.innerText = pastBlog.name;
        blogTitle.classList.add("blogTitle");
        
        let blogImg = new Image();
        blogImg.alt = pastBlog.name;
        if (isURL(pastBlog.coverImg)) {
            blogImg.src = pastBlog.coverImg;
        } else {
            blogImg.src = `${baseURL}/images/titleImgs/${pastBlog.urlName.toLowerCase()}.png`;
        }
        blogImg.classList.add("blogImg");
        
        let blogDescription = document.createElement("p");
        blogDescription.innerText = pastBlog.shortDescription;
        blogDescription.classList.add("blogDescription");
        
        let blogDate = document.createElement("p");
        blogDate.innerText = pastBlog.postDate.toLocaleDateString("de");
        blogDate.classList.add("blogDate");
        
        containingDiv.classList.add("blog");
        containingDiv.onclick = _ => location.href = `${baseURL}/${pastBlog.urlName}/`;
        
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
    
    const pageTitle = document.createElement("title");
    pageTitle.innerText = title;
    document.head.appendChild(pageTitle);
    
    const content = document.createElement("article");
    
    let titleElem = document.createElement("h1");
    titleElem.id = "title";
    titleElem.innerText = title;
    content.appendChild(titleElem);
    
    let thisBlog = pastBlogs.find(x => x.name == title);
    if (typeof thisBlog != "undefined") {
        const shortDescription = document.createElement("p");
    shortDescription.id = "shortDescription";
    shortDescription.innerText = thisBlog.shortDescription;
    content.appendChild(shortDescription);
    }
    
    if (imgs) {
        const images = document.createElement("div")
        if (imgs.constructor == Array) {
            for (let img of imgs) {
                if (img == "break") {
                    breakElem = document.createElement("br")
                    images.appendChild(breakElem)
                } else if (isURL(img)) {
                    let newImg = new Image();
                    newImg.src = img;
                    newImg.alt = img.split(".").join("/").split("/").at(-2);
                    images.appendChild(newImg);
                } else {
                    let newImg = new Image();
                    newImg.src = `${baseURL}/images/${img}`;
                    newImg.alt = img.split(".").join("/").split("/").at(-2);
                    images.appendChild(newImg)
                }
            }
        } else if (imgs.constructor == String && isURL(imgs)) {
            let newImg = new Image();
            newImg.src = imgs;
            newImg.alt = imgs.split(".").join("/").split("/").at(-2);
            images.appendChild(newImg);
        } else if (imgs.constructor == String) {
            let newImg = new Image();
            newImg.src = `${baseURL}/images/${imgs}`;
            newImg.alt = img.split(".").join("/").split("/").at(-2)
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
    content.id = "content";
    text = text.split("\n")
    for (paragraph of text) {
        let pElem = document.createElement("p")
        pElem.classList.add("paragraph");
        pElem.innerText = paragraph
        content.appendChild(pElem)
    }
    if (ratings) {
        let ratingTable = makeRatingTable(ratings)	
        ratingTable.id = "ratingTable"
        content.appendChild(ratingTable)
    }
    if (infoBox) {
        let infoBoxTable = makeInfoBox(infoBox);
        infoBoxTable.id = "infoBox";
        content.appendChild(infoBoxTable);
    }
    return content
}
