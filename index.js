const baseURL = (isURL(location.href)) ? "https://baselfood.github.io" : ((location.href.slice(0, 7) == "file://") ? "file:///Users/gian/Desktop/Foodblog" : alert("unreachable"))

class blog {
    constructor(name, urlName, text, imgs, ratings, infoBox, openingTimes, postDate, writer, shortDescription, pos, coverImg) {
        this.name = name;
        this.urlName = urlName;
        this.text = text;
        if (imgs) {
            this.imgs = imgs;
        }
        if (ratings) {
            this.ratings = ratings;
        }
        if (infoBox) {
            this.infoBox = infoBox;
        }
        if (openingTimes) {
            this.openingTimes = openingTimes;
        }
        if (postDate) {
            this.postDate = postDate;
        }
        if (writer) {
            this.writer = writer;
        }
        if (shortDescription) {
            this.shortDescription = shortDescription;
        }
        if (coverImg) {
            this.coverImg = coverImg;
        }
        if (pos) {
            this.pos = pos;
        }
    }
    makeBlog() {
        const pageTitle = document.createElement("title");
        pageTitle.innerText = `${this.name} | Baselfood`;
        document.head.appendChild(pageTitle);

        const content = document.createElement("article");

        let titleElem = document.createElement("h1");
        titleElem.id = "title";
        titleElem.innerText = this.name;
        content.appendChild(titleElem);

        if (this.shortDescription) {
            const shortDescription = document.createElement("p");
            shortDescription.id = "shortDescription";
            shortDescription.innerText = this.shortDescription;
            content.appendChild(shortDescription);
        }

        if (this.text && this.imgs) {
            const tableOfContents = document.createElement("table");
            let Tbody = document.createElement("tbody");

            let Thead = document.createElement("thead");
            let tableOfContentsHead = document.createElement("th");
            tableOfContentsHead.innerHTML = `<a href=${baseURL}/${this.urlName}/#tableOfContents>Inhaltsverzeichnis</a>`
            Thead.appendChild(tableOfContentsHead);
            tableOfContents.appendChild(Thead);

            if (this.imgs) {
                let imgRow = makeTableOfContentsRow("Bilder", "images", this.urlName);
                Tbody.appendChild(imgRow);
            }
            if (this.pos) {
                let mapRow = makeTableOfContentsRow("Karte", "map", this.urlName);
                Tbody.appendChild(mapRow);
            }
            if (this.openingTimes) {
                let openingRow = makeTableOfContentsRow("Öffnungszeiten", "openingTimesTitle", this.urlName);
                Tbody.appendChild(openingRow);
            }
            if (this.text) {
                let textRow = makeTableOfContentsRow("Text", "text", this.urlName);
                Tbody.appendChild(textRow);
            }
            if (this.ratings) {
                let ratingRow = makeTableOfContentsRow("Bewertung", "ratingTable", this.urlName);
                Tbody.appendChild(ratingRow);
            }
            if (this.infoBox) {
                let infoRow = makeTableOfContentsRow("Info", "infoBox", this.urlName);
                Tbody.appendChild(infoRow);
            }

            tableOfContents.id = "tableOfContents";
            tableOfContents.appendChild(Tbody);
            content.appendChild(tableOfContents);
        }

        if (this.imgs) {
            const images = document.createElement("div")
            if (this.imgs.constructor == Array) {
                for (let img of this.imgs) {
                    if (img == "break") {
                        let breakElem = document.createElement("br")
                        images.appendChild(breakElem)
                    } else if (isURL(img)) {
                        let newImg = new Image();
                        newImg.loading = "lazy";
                        newImg.src = img;
                        newImg.alt = img.split(".").join("/").split("/").at(-2);
                        images.appendChild(newImg);
                    } else {
                        let newImg = new Image();
                        newImg.loading = "lazy";
                        newImg.src = `${baseURL}/images/${img}`;
                        newImg.alt = img.split(".").join("/").split("/").at(-2);
                        images.appendChild(newImg)
                    }
                }
            } else if (this.imgs.constructor == String && isURL(this.imgs)) {
                let newImg = new Image();
                newImg.loading = "lazy";
                newImg.src = this.imgs;
                newImg.alt = this.imgs.split(".").join("/").split("/").at(-2);
                images.appendChild(newImg);
            } else if (this.imgs.constructor == String) {
                let newImg = new Image();
                newImg.loading = "lazy";
                newImg.src = `${baseURL}/images/${this.imgs}`;
                newImg.alt = this.imgs.split(".").join("/").split("/").at(-2)
                images.appendChild(newImg);
            } else {
                console.error('Bilder mönn entweder e "String" oder e [Array] si.');
            }
            images.id = "images";
            content.appendChild(images);
        }
        if (this.pos) {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYtPqZSAXLwFhmwZoq_bgethkZw3gjz4&callback=initMap"
            googleMapsScript.async = true;
            const map = document.createElement("div");
            map.id = "map";
            content.appendChild(map);
            const mapsCreateScript = document.createElement("script");
            mapsCreateScript.innerHTML = `
            window.initMap = function() { 
                toggleDarkmode(true); 
                map = new google.maps.Map(
                    map, {
                        center: {
                            lat: 47.5451464, 
                            lng: 7.5869987
                        }, 
                        zoom: 12
                    }
                    ); 
                    const marker = new google.maps.Marker(
                        {
                            map: map, 
                            position: new google.maps.LatLng(${this.pos.join(", ")}),
                            title: "${this.name}"
                        }
                        )
                    }`;
            document.body.appendChild(mapsCreateScript);
            document.head.appendChild(googleMapsScript);
        }

        if (this.openingTimes) {
            let openingTimesTable = makeOpeningTimes(this.openingTimes);
            openingTimesTable.id = "openingTimes";
            content.appendChild(openingTimesTable);
        }

        const textDiv = document.createElement("div");
        textDiv.id = "text";
        this.text = this.text.split("\n");
        for (let paragraph of this.text) {
            let pElem = document.createElement("p");
            pElem.classList.add("paragraph");
            pElem.innerText = paragraph;
            textDiv.appendChild(pElem);
        }
        content.appendChild(textDiv);

        if (this.ratings) {
            let ratingTable = makeRatingTable(this.ratings);
            ratingTable.id = "ratingTable";
            content.appendChild(ratingTable);
        }
        if (this.infoBox) {
            let infoBoxTable = makeInfoBox(this.infoBox);
            infoBoxTable.id = "infoBox";
            content.appendChild(infoBoxTable);
        }

        content.id = "content";
        return content;
    }
}

class blogList {
    constructor(...blogs) {
        this.blogs = blogs;
        this.length = blogs.length;
    }
    makeLandingPage() {
        const content = document.createElement("article");
        content.id = "content";

        let titleElem = document.createElement("h1");
        titleElem.innerText = "Baselfood - Der Foodblog für die Region Basel";
        titleElem.id = "title";
        content.appendChild(titleElem);

        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYtPqZSAXLwFhmwZoq_bgethkZw3gjz4&callback=initMap"
        googleMapsScript.async = true;
        const map = document.createElement("div");
        map.id = "map";
        content.appendChild(map);
        const mapsCreateScript = document.createElement("script");
        var mapsCreateScriptText = `
                window.initMap = function() { 
                    toggleDarkmode(true); 
                    map = new google.maps.Map(
                        map, {
                            center: {
                                lat: 47.5451464, 
                                lng: 7.5869987
                            }, 
                            zoom: 12
                        }
                        );
                        `
        for (let pastBlog of this.blogs) {
            mapsCreateScriptText += `
                            const marker${pastBlog.urlName} = new google.maps.Marker(
                                {
                                    map: map, 
                                    position: new google.maps.LatLng(${pastBlog.pos.join(", ")}), 
                                    title: "${pastBlog.name}"
                                }
                                );
                                google.maps.event.addDomListener(marker${pastBlog.urlName}, 'click', function() {
                                    location.href = "${baseURL}/${pastBlog.urlName}/"
                                });`
        }
        mapsCreateScriptText += "}";
        mapsCreateScript.innerHTML = mapsCreateScriptText
        document.body.appendChild(mapsCreateScript);
        document.head.appendChild(googleMapsScript);

        const blogs = document.createElement("div");
        blogs.id = "blogs";

        for (let pastBlog of this.blogs) {
            let containingDiv = document.createElement("a");
            containingDiv.id = pastBlog.urlName;

            let blogTitle = document.createElement("h3");
            blogTitle.innerText = pastBlog.name;
            blogTitle.classList.add("blogTitle");

            let blogImg = new Image();
            blogImg.loading = "lazy";
            blogImg.alt = pastBlog.name;
            if (pastBlog.coverImg) {
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
            containingDiv.href = `${baseURL}/${pastBlog.urlName}/`;

            containingDiv.appendChild(blogTitle);
            containingDiv.appendChild(blogImg);
            containingDiv.appendChild(blogDescription);
            containingDiv.appendChild(blogDate);
            blogs.appendChild(containingDiv);
        }
        content.appendChild(blogs);
        return content;
    }
    findBlog(text) {
        return this.blogs.find(Blog => Blog.urlName == text)
    }
}

const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

const pastBlogs = new blogList();

fetch("https://baselfood.github.io/blogs.json")
    .then(Response => Response.json())
    .then(blogsData => {
  		for (const blogData of blogsData) {
            pastBlogs.blogs.push(
                new blog(blogData.name, blogData.urlName, blogData.text, blogData.imgs, blogData.ratings, blogData.infoBox, blogData.openingTimes, new Date(blogData.postDate), blogData.writer, blogData.shortDescription, blogData.pos, blogData?.coverImg)
            )
            pastBlogs.length++;
        }
    });

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
        while (x.includes("find")) {
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

function makeTableOfContentsRow(text, id, name) {
    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");
    tableData.innerHTML = `<a href=${baseURL}/${name}/#${id}>${text}</a>`;
    tableRow.appendChild(tableData);
    return tableRow;
}

function toggleDarkmode(initial) {
    const body = document.body;
    const Tables = document.querySelectorAll("#content table *");
    const textElems = document.querySelectorAll("#content > p, #content > td, #content > th");
    const blogs = document.getElementsByClassName("blog");
    const elemsToSwitch = [...Tables, ...textElems, ...blogs, body];
    if (!elemsToSwitch[0].classList.contains("animate") && !initial) {
        elemsToSwitch.forEach(x => x.classList.add("animate"))
    }
    if ((localStorage.getItem("mode") == "dark" && !initial) || (localStorage.getItem("mode") == "bright" && initial)) {
        localStorage.setItem("mode", "bright")
        elemsToSwitch.forEach(x => {
            x.classList.remove("dark")
            x.classList.add("bright")
        });
    } else if ((localStorage.getItem("mode") == "bright" && !initial) || (localStorage.getItem("mode") == "dark" && initial)) {
        localStorage.setItem("mode", "dark");
        elemsToSwitch.forEach(x => {
            x.classList.remove("bright")
            x.classList.add("dark")
        });
    } else {
        localStorage.setItem("mode", "bright")
        elemsToSwitch.forEach(x => {
            x.classList.remove("dark")
            x.classList.add("bright")
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
    collapseSidebarElem.onclick = function() {
        collapseSidebar()
    };
    const darkModeToggle = new Image();
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.alt = "Toggle Dark Mode"
    darkModeToggle.src = `${baseURL}/images/mode-toggle.png`
    darkModeToggle.onclick = function() {
        toggleDarkmode(false);
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
    contact.href = "mailto:contact@baselfood.email"

    const instagram = document.createElement("a");
    instagram.innerText = "Unser Instagram";
    instagram.target = "_blank";
    instagram.id = "instagram";

    const twitter = document.createElement("a");
    twitter.innerText = "Unser Twitter";
    twitter.target = "_blank"
    twitter.id = "twitter";

    if (isMobile) {
        instagram.href = "instagram://user?username=baselfood_blog";
        instagram.onclick = _ => instagram.href = "https://www.instagram.com/_u/baselfood_blog/"

        twitter.href = "twitter://user?screen_name=baselfood";
        twitter.onclick = _ => twitter.href = "https://twitter.com/baselfood";
    } else {
        instagram.href = "https://www.instagram.com/_u/baselfood_blog/";
        twitter.href = "https://twitter.com/baselfood";
    }
    footer.appendChild(contact);
    footer.appendChild(instagram);
    footer.appendChild(twitter);
    return footer
}

function makeSidebar() {
    const sideBar = document.createElement("div");
    sideBar.id = "sidebar";

    let reverseBlogs = pastBlogs.blogs.slice().reverse();

    if (isMobile) {
        let blog = document.createElement("a");
        blog.classList.add("sideBarBlog");
        const aboutUs = document.createElement("p");
        aboutUs.innerText = "Über uns";
        blog.appendChild(aboutUs);
        blog.href = `${baseURL}/aboutus/`;

        if (`${baseURL}/aboutus/`.toLowerCase() == location.href.toLowerCase()) {
            blog.id = "currentBlog";
        }
        sideBar.appendChild(blog);
    }

    let blog = document.createElement("a");
    blog.classList.add("sideBarBlog");
    const aboutUs = document.createElement("p");
    aboutUs.innerText = "Startseite";
    blog.appendChild(aboutUs);
    blog.href = baseURL;

    if (baseURL.toLowerCase() == location.href.toLowerCase()) {
        blog.id = "currentBlog";
    }
    sideBar.appendChild(blog);

    for (let pastBlog of reverseBlogs) {
        let blog = document.createElement("a");
        blog.classList.add("sideBarBlog");
        if (`${baseURL}/${pastBlog.urlName}/`.toLowerCase() == location.href.toLowerCase()) {
            blog.id = "currentBlog";
        }
        blog.href = `${baseURL}/${pastBlog.urlName}/`;

        let pElem = document.createElement("p");
        let theDate = `${pastBlog.postDate.getDate()}.${pastBlog.postDate.getMonth() + 1}`;
        pElem.innerText = `${pastBlog.name} - ${theDate}`;
        blog.appendChild(pElem);
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
        criteria = criteria.replaceAll("_", " ").replaceAll("ç", "-");
        criteriaName.innerText = criteria;
        let criteriaValue = document.createElement("td");
        for (var i = 1; i <= currentVal; i++) {
            let newImg = new Image();
            newImg.loading = "lazy";
            newImg.src = `${baseURL}/images/full-star.png`;
            newImg.classList.add("star");
            newImg.alt = "star";
            criteriaValue.appendChild(newImg)
        }
        if (!Number.isInteger(currentVal)) {
            let newImg = new Image();
            newImg.loading = "lazy";
            newImg.src = `${baseURL}/images/half-star.png`;
            newImg.classList.add("star");
            newImg.alt = "star";
            criteriaValue.appendChild(newImg);
        }
        for (var i = currentVal; i <= 4; i++) {
            let newImg = new Image();
            newImg.loading = "lazy";
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

function getRatings() {
    const writers = new Array(...new Set(pastBlogs.blogs.map(x => x.writer)))
    for (let writer of writers) {
        let currentArray = pastBlogs.blogs.filter(x => x.writer == writer);
        let ratingArray = currentArray.map(x => [x.name, x.writer, Object.values(x.ratings).reduce((a, b) => a + b)]);
        ratingArray.sort((a, b) => b[2] - a[2]);
        ratingArray.forEach(x => console.log(`${x[0]} (${x[1]}): ${x[2]}`));
        console.log("\n")
    }
}

function checkMap() {
    if (typeof document.getElementById("map") != "undefined") {
        setTimeout(_ => console.log("Loading map again..."), 1000);
        if (document.getElementById("map").childElementCount == 0) {
            initMap();
        }
    }
}