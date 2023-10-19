const baseURL = (isURL(location.href)) ? "https://baselfood.github.io" : ((location.href.slice(0, 7) == "file://") ? "file:///Users/gian/Desktop/Foodblog" : alert("unreachable"))

function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
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
    getRatings() {
        let ratings = [];
        this.blogs.forEach(blog => {
            ratings.push({
                rating: Object.values(blog.ratings).reduce((a, b) => a + b),
                name: blog.name,
                writer: blog.writer
            });
        });
        ratings = ratings.sort((a, b) => b.rating - a.rating);
        ratings.forEach(rating => console.log(`${rating.name} von ${rating.writer} hat ${rating.rating} von 40 Punkten.`));
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

        content.innerHTML += `<iframe id="video" width="950" height="534" src="https://www.youtube.com/embed/j-mQNNqMc9Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        const blogs = document.createElement("div");
        blogs.id = "blogs";

        for (let pastBlog of this.blogs) {
            let containingDiv = document.createElement("a");
            containingDiv.id = pastBlog.urlName;

            let blogTitle = document.createElement("h2");
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
            blogDate.innerText = formatDate(pastBlog.postDate);
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
        return this.blogs.find(Blog => Blog.urlName.toLowerCase() == text.toLowerCase());
    }
    makeSearch(query) {
        if (query === null) {
            let content = document.createElement("div");
            content.id = "content";

            const title = document.createElement("h1");
            title.innerText = `Suche`
            title.id = "title";
            content.appendChild(title);

            const searchDiv = document.createElement("div");
            searchDiv.id = "bigSearchForm";

            const searchBar = document.createElement("input");
            searchBar.type = "text";
            searchBar.placeholder = "Suche...";
            searchBar.id = "bigSearchBar";
            searchBar.value = query;
            searchBar.onchange = function() {
                if (searchBar.value !== "") {
                    location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
                }
            }

            const searchButton = new Image();
            searchButton.alt = "Lupe";
            searchButton.src = `${baseURL}/images/Suche.png`
            searchButton.id = "bigSearchButton";
            searchButton.onclick = function() {
                if (searchBar.value !== "") {
                    location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
                }
            }

            searchDiv.appendChild(searchBar);
            searchDiv.appendChild(searchButton);

            content.appendChild(searchDiv);

            return content;
        }
        if (this.findBlog(query)) {
            location.href = `${baseURL}/${query[0].toUpperCase() + query.slice(1)}`;
        }

        let originalQuery = query;
        query = query.toString().toLowerCase();

        let rickroll = false;
        let schimmel = false;

        if (query == "pride") {
            setTimeout(_ => [...document.querySelectorAll("#header, #footer, #sidebar")].forEach(x => {
                x.classList.add("pride");
            }), 100);
        } else if (query == "rick astley" || query == "never gonna give you up" || query == "rickroll" || query == "free vbucks" || query == "free robux") {
            rickroll = true;
        } else if (query == "dini muetter" || query == "dini mom" || query.includes("schimmel")) {
            schimmel = true;
        }

        let foundBlogs = new Set();
        for (let blog of this.blogs.slice().reverse()) {
            for (let key in blog) {
                let value = blog[key];
                if (value.constructor == Object) {
                    for (let key1 in value) {
                        let value1 = value[key1];
                        if (value1.toString().toLowerCase().includes(query)) {
                            foundBlogs.add(blog);
                        }
                    }
                } else if (value.constructor == Array) {
                    for (let item of value) {
                        if (item.toString().toLowerCase().includes(query)) {
                            foundBlogs.add(blog);
                        }
                    }
                } else {
                    if (value.toString().toLowerCase().includes(query)) {
                        foundBlogs.add(blog);
                    }
                }
            }
        }

        foundBlogs = [...foundBlogs];

        if (rickroll || schimmel) {
            foundBlogs = this.blogs;
        }

        let content = document.createElement("div");
        content.id = "content";

        const title = document.createElement("h1");
        title.innerText = `Suche nach '${originalQuery}' ergab ${foundBlogs.length} Treffer`
        title.id = "title";
        content.appendChild(title);

        const searchDiv = document.createElement("div");
        searchDiv.id = "bigSearchForm";

        const searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.placeholder = "Suche...";
        searchBar.id = "bigSearchBar";
        searchBar.value = originalQuery;
        searchBar.onchange = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }

        const searchButton = new Image();
        searchButton.alt = "Lupe";
        searchButton.src = `${baseURL}/images/Suche.png`
        searchButton.id = "bigSearchButton";
        searchButton.onclick = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }

        searchDiv.appendChild(searchBar);
        searchDiv.appendChild(searchButton);

        content.appendChild(searchDiv);
        for (let foundBlog of foundBlogs) {
            let blogBox = document.createElement("a");
            blogBox.classList.add("foundBlog");

            let blogBoxTitle = document.createElement("h2");
            blogBoxTitle.innerText = foundBlog.name;
            blogBox.appendChild(blogBoxTitle);

            let blogDate = document.createElement("p");
            blogDate.innerText = formatDate(foundBlog.postDate);
            blogBox.appendChild(blogDate);

            let line = document.createElement("hr");
            blogBox.appendChild(line);

            let blogBoxText = document.createElement("p");
            blogBoxText.innerText = foundBlog.text.slice(0, 300).replaceAll("\n", " ") + "...";
            blogBox.appendChild(blogBoxText);

            if (rickroll) {
                blogBox.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
            } else if (schimmel) {
                blogBox.href = "https://www.youtube.com/watch?v=Ji1eWl4-SwA";
            } else {
                blogBox.href = `${baseURL}/${foundBlog.urlName}/`;
            }

            content.appendChild(blogBox);
        }

        return content;
    }
}

const isMobile = window.matchMedia("(max-aspect-ratio: 3/4)").matches;
const pastBlogs = new blogList(
    new blog(
        "Alchemist",
        "Alchemist",
        `Das Alchemist ist ein cooles Restaurant an der Schifflände. Das Konzept des Restaurants ist es eine coole, angenehme, freundschaftliche Atmosphäre zu schaffen. Zudem ist es das Ziel so viel wie möglich in der Küche und an der Bar selber zu machen. Als Beispiel verkaufen sie keine Softdrinks wie Cola, Fanta, etc., sondern stellen ein Getränk mit Cola-Kraut Sirup und Wasser zur Verfügung.
        Die Speisekarte besteht aus vielen kleinen Speisen wie Dips, Suppen, Pommes, Brot usw. und es gibt eine grosse Auswahl. Die kleinen Portionen sind zum Teilen gedacht. Also man bestellt viele kleine Speisen und stellt sie in die Mitte des Tisches und teilt. Dieses Restaurant bringt auf jeden Fall ein Erlebnis, weil man unter anderem seine Getränke selber mixen kann und die Präsentation der Getränke und Speisen sehr schön und anregend ist. Das Ambiente ist sehr toll, locker, geheimnisvoll und man fühlt sich schnell wohl. 
        Der Service ist auch sehr nett und beantwortet gerne Fragen, wenn man zum ersten Mal dort ist und noch alles neu ist. Auf der Website kann man noch viel mehr erfahren z.B wie es zum Namen Alchemist kam, wieso genau es an diesem Ort ist, wieso sie dieses Menü und Essen für ihr Restaurant-Konzept gewählt haben und noch vieles mehr.`,
        [
            "alchemist/door.png",
            "alchemist/tube-system.png",
            "alchemist/tube.png",
            "alchemist/wax.png",
            "alchemist/glace.png",
            "break",
            "alchemist/bottles.png",
            "alchemist/food.png",
            "alchemist/steamy-kitchen.png",
            "alchemist/card.png",
            "alchemist/chairs.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 3,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 4,
            Hygiene: 5,
            Service: 4.5,
            Ausstattung: 4
        }, {
            Adresse: "Schifflände 1 4051 Basel",
            Telefonnummer: "061 561 88 68",
            Email: "info@alchemistbasel.ch",
            Website: "https://www.alchemistbasel.ch/"
        }, {
            Montag_bis_Donnerstag: "11.30 bis 14.30 / 17.00 bis 23.00",
            Freitag: "11.30 bis 14.30 / 17.00 bis 24.00",
            Samstag: "12.00 bis 24.00"
        },
        new Date("2/9/2022"),
        "Noée",
        "Das Alchemist ist ein cooles, experimentelles Restaurant an der Schifflände mit vielen verschiedenen Speisen wie z.B. Dips, Suppen, Pommes, Brot.",
        [47.5595824, 7.5882457]
    ),
    new blog(
        "Café Streuli",
        "Streuli",
        `Das Café Streuli liegt etwas versteckt auf dem Bruderholz und ist ein eher kleines Café. Man wird freundlich begrüsst und der Service ist sehr gut. Das Angebot besteht aus Café, Gebäck, Konfekt und ein Snackangebot z.B. Sandwiches, belegte Brote usw. 
        Die Preise sind etwa im Mittelbereich, und im Vergleich zu den Produkten angemessen. Das Café ist auch gut für eine kurze Wegzehrung oder einen Take-Away Kaffee. Das Café bietet zusätzlich einen Packetdienst an, bei dem Pakete gegen eine Gebühr abgegeben werden können.`,
        [
            "https://media-cdn.tripadvisor.com/media/photo-s/12/00/a2/6d/sidewalk-seating-and.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/12/00/a9/cb/interior-view.jpg",
            "https://hummel.cafe-streuli.ch/fileadmin/_processed_/d/0/csm_Feingebaeck_8e4f068eef.jpg",
            "break",
            "https://tse1.mm.bing.net/th?id=OIP.b1u2jmFCGFLSmHUOKtes7QHaJQ&pid=Api"
        ], {
            Ambiente: 3.5,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 4.5,
            Quantität_der_Auswahl: 3,
            Lage: 5,
            Hygiene: 4.5,
            Service: 4.5,
            Ausstattung: 3.5
        }, {
            Adresse: "Auf dem Hummel 2 4059 Bruderholz",
            Telefonnummer: "061 362 07 10 (zu Bürozeiten)",
            Email: "streuli.hummel@bluewin.com",
            Website: "https://hummel.cafe-streuli.ch/"
        }, {
            Montag_bis_Fritag: "07.00 bis 18.00",
            Samstag: "08.00 bis 17.00",
            Sonntag: "09.00 bis 17.00"
        },
        new Date("2/9/2022"),
        "Arik",
        "Das Café Streuli liegt etwas versteckt auf dem Bruderholz. Dort kann man Café, Gebäck, Konfekt und ein Snackangebot verzehren.",
        [47.5320943, 7.5932226],
        "https://hummel.cafe-streuli.ch/fileadmin/_processed_/d/0/csm_Feingebaeck_8e4f068eef.jpg"
    ),
    new blog(
        "Wiesengarten Musetti",
        "Musetti",
        `Das Restaurant Wiesengarten ist ein kleines Restaurant in Riehen, nahe an der deutschen Grenze. Das Restaurant ist eher edel, gedacht für Geburtstage, Hochzeiten oder andere Anlässe. Beim Eintreten wird man freundlich begrüsst und zu seinem Tisch geführt. Man fühlt sich sehr schnell wohl und gut aufgenommen. 
        Das Restaurant ist ein Familienbetrieb und man merkt, dass die Betreiber*innen mit sehr viel Leidenschaft dabei sind. Auch die Speisen, wie z.B. die Pasta sind komplett hausgemacht. Im Zentrum des Restaurants steht auch der Wein. Es gibt es eine grosse Weinkarte, aus verschiedenen Regionen Italiens. Die verwendeten Produkte sind saisonal und marktfrisch. 
        Das Restaurant Wiesengarten wird mehrheitlich von Erwachsenen besucht, und ist nicht unbedingt die beste Wahl für Kinder, da die Speisekarte keine Kindermenüs enthält. Die Preise sind etwas gehoben, was aber bei der hervorragenden Qualität und der hausgemachten Zubereitung gerechtfertigt ist. Die Räumlichkeiten sind relativ klein, aber sehr gemütlich eingerichtet.`,
        [
            "musetti/fleisch.png",
            "musetti/sauce.png",
            "musetti/glace.png",
            "musetti/wine.png",
            "musetti/aussen.png",
            "musetti/innen.png",
            "musetti/nacht.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 4.5,
            Quantität_der_Auswahl: 3.5,
            Lage: 4.5,
            Hygiene: 4.5,
            Service: 5,
            Ausstattung: 5
        }, {
            Adresse: "Weilstrasse 51 4125 Basel",
            Telefonnummer: "061 641 26 42",
            Email: "reservation@wiesengartenmusetti.ch",
            Website: "http://www.wiesengartenmusetti.ch/"
        }, {
            Montag_und_Dienstag: "Geschlossen",
            Mittwoch_bis_Sonntag: "11.30 bis 14.00 / 18.00 bis 23.00"
        },
        new Date("2/9/2022"),
        "Arik",
        "Das Restaurant Wiesengarten ist ein edles kleines Restaurant in Riehen, gedacht für Hochzeitsessen und Geburtstage.",
        [47.5914631, 7.6473783]
    ),
    new blog(
        "Café Bar Elisabethen",
        "Elisabethen",
        `Die Café Bar Elisabethen befindet sich direkt in der Elisabethenkirche. Im Sommer bietet sich ein wunderschöner Aussenbereich an, um einen Cappuccino zu trinken oder eine kleine Mahlzeit zu essen. Ausserdem hat es einen sehr herzigen kleinen Innenbereich, in dem man an kalten Wintertagen sein kann. 
        In dem Onlineshop, sowie auch vor Ort in der Café Bar kann man Weine, wie auch Bio-Reis und andere Produkte kaufen. Als kleine Speisen bietet das Café Suppen oder Salate an. Das Highlight von der Café Bar Elisabethen ist jedoch der Kaffee, der fast genauso wie in Italien schmeckt. 
        Das Personal ist sehr freundlich und man fühlt sich schnell wohl. Für einen kurzen Stop zum Aufwärmen eignet sich das Café sehr und ist daher empfehlenswert.`,
        [
            "elisabethen/cake.png",
            "elisabethen/bottles.png",
            "elisabethen/stairs.png",
            "elisabethen/window.png",
            "elisabethen/chairs.png",
            "break",
            "elisabethen/entrance.png",
            "elisabethen/people.png",
        ], {
            Ambiente: 5,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 2,
            Lage: 4,
            Hygiene: 4,
            Service: 4,
            Ausstattung: 3
        }, {
            Adresse: "Elisabethenstrasse 14 4051 Basel",
            Telefonnummer: "079 511 72 38",
            Email: "joernschaerer@delitalia.ch",
            Website: "https://www.cafebarelisabethen.com/"
        }, {
            Dienstag_bis_Freitag: "7.00 bis 19.00",
            Samstag_und_Sonntag: "10.00 bis 18.00"
        },
        new Date("2/9/2022"),
        "Noée",
        "Die Café Bar Elisabethen befindet sich direkt in der Elisabethenkirche und ist optimal für einen kleinen Zwischenstop.",
        [47.5527293, 7.5911635]
    ),
    new blog(
        "1777 Café Restaurant Bar",
        "1777",
        `Das 1777 ist ein Restaurant im Schmiedenhof. Es hat einen schönen Aussenbereich im Innenhof. Das Personal ist sehr nett und aufmerksam. Das Besondere im 1777 sind die Werkstätte. Das heisst man kann sich eigene Salate und Baguettes zusammenstellen mit seinen Lieblingszutaten. 
        Ansonsten macht das 1777 auch sehr köstliche Burger. Das Ambiente ist locker und freundlich. Ausserdem besitzt das 1777 eine coole Bar mit Drinks etc. Von Montag bis Freitag von 11.30 bis 15.00 stellt das Restaurant ein Tagesangebot mit Tagesteller, Suppen, vegetarischen alternativen und weitere Kleinigkeiten bereit. `,
        [
            "1777/glowy.png",
            "1777/bar.png",
            "1777/burger.png",
            "1777/cabbage.png",
            "1777/salad.png",
            "break",
            "1777/card0.png",
            "1777/card1.png",
            "1777/card2.png",
        ], {
            Ambiente: 4.5,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 3.5,
            Lage: 4,
            Hygiene: 5,
            Service: 5,
            Ausstattung: 4
        }, {
            Adresse: "Im Schmiedenhof 10 4001 Basel",
            Telefonnummer: "061 261 77 77",
            Email: "info@1777.ch",
            Website: "www.1777.ch"
        }, {
            Montag_bis_Mittwoch: "10.00 bis 20.00",
            Donnerstag_bis_Samstag: "10.00 bis 23.00"
        },
        new Date("2/9/2022"),
        "Noée",
        "Das 1777 hat es sich zum Konzept genommen, die Konsument*innen genaustens entscheiden zu lassen, was ins Essen kommt.",
        [47.5570095, 7.5877449]
    ),
    new blog(
        "WERK 8",
        "Werk8",
        `Das WERK 8 ist ein tolles Restaurant in einer alten Fabrikhalle im Gundeldingerfeld. Das Ambiente, wie schon vorher erwähnt mit der Fabrikhalle schafft eine coole und spannende Atmosphäre. 
        Der Klassiker zum Essen ist auf jeden Fall das Clubsandwich, aber es gibt auch viele andere köstliche Speisen. Das WERK 8 ist auch für seine grosse und tolle Bar bekannt, also nicht nur zum Essen, sondern auch zum Trinken empfiehlt sich das WERK 8. Etwas was aber auffällt ist die Lautstärke. Durch den grossen Raum hallt es und wenn die Musik läuft, ist es ein wenig laut. 
        Ansonsten ist das WERK 8 aber ein super Restaurant, das sich gut eignet, wenn man mit Freunden essen gehen will. Durch die grosse Fabrikhalle hat es sehr viel Platz und somit auch Ausstattung. Im Sommer bietet sich auch ein Aussenbereich an der Sonne an.`,
        [
            "Werk8/eingang.png",
            "Werk8/kerze.png",
            "Werk8/bar.png",
            "Werk8/karte.png",
            "Werk8/sandwich.png"
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 5,
            Hygiene: 4,
            Service: 4,
            Ausstattung: 5
        }, {
            Adresse: "Dornacherstrasse 192 4053 Basel",
            Telefonnummer: "061 551 08 80",
            Email: "reservation@werkacht.ch",
            Website: "https://werkacht.ch/"
        }, {
            Sonntag_bis_Mittwoch: "Geschlossen",
            Donnerstag: "17.00 bis 23.00",
            Freitag: "17.00 bis 24.00",
            Samstag: "18.00 bis 24.00"
        },
        new Date("2/15/2022"),
        "Noée",
        "Das WERK 8 ist ein tolles Restaurant in einer alten Fabrikhalle mit einer grossen, tollen Bar und guten Clubsandwiches.",
        [47.5416492, 7.5934488]
    ),
    new blog(
        "Lily's",
        "Lilys",
        `Das Lily's ist ein Restaurant in der Rebgasse, also in der Nähe des Claraplatzes. Das Lily's hat eine asiatische Küche mit vielen Spezialitäten. Im Sommer hat es einen schönen Aussenbereich mit Lichtern, sodass man an Sommerabenden den Abend draussen geniessen. 
        Auf der Speisekarte ist mit Symbolen jeweils angegeben wie scharf das jeweilige Gericht ist und ob es vegetarisch oder vegan ist. Man kann das Essen aus dem Lily's auch via Velokurier nach Hause bestellen.`,
        [
            "lilys/salad.png",
            "lilys/asia.png",
            "lilys/karte-aussen.png",
            "lilys/karte-innen.png",
            "lilys/klösse.png"
        ], {
            Ambiente: 3,
            PreisçLeistungsçVerhältnis: 3.5,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 4,
            Hygiene: 4,
            Service: 4,
            Ausstattung: 4
        }, {
            Adresse: "Rebgasse 1 4058 Basel",
            Telefonnummer: "061 683 11 11",
            Website: "https://lilys.ch/"
        }, {
            Montag_bis_Sonntag: "11.00 bis 21.00"
        },
        new Date("2/17/2022"),
        "Noée",
        "Das Lily's ist ein Restaurant mit einer asiatischen Küche und einem schönen Aussenbereich.",
        [47.5612102, 7.5940240]
    ),
    new blog(
        "Nomad Design & Lifestyle Hotel",
        "Nomad",
        `Im Nomad ist das Konzept, dass die Küche sehr international ist, also es gibt Gerichte von der ganzen Welt. Das Nomad hat auch einen Brunch jeden Sonntag mit gemütlicher Stimmung. Die Karte wechselt gelegentlich, denn es kommen immer wieder neue Gerichte auf die Karte. Der Klassiker vom Nomad ist aber der Burger „The Big Nomad“.
        Das Lokal hat eine sehr schöne Einrichtung mit viel Pflanzen und der Farbe Türkis. Die Atmosphäre ist sehr angenehm und man fühlt sich auf jeden Fall wohl. Das Nomad besitzt auch eine grosse schöne Bar mit vielen Drinks. Es empfiehlt sich auf jeden Fall, dort ein Stopp einzulegen und etwas zu essen oder zu trinken.`,
        [
            "Nomad/Burgir.png",
            "Nomad/Kitchen.png",
            "Nomad/Nomol-Burgir.png",
            "Nomad/Salat.png",
            "Nomad/Karte.png",
            "Nomad/Glas.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 3,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 3.5,
            Lage: 5,
            Hygiene: 5,
            Service: 5,
            Ausstattung: 4
        }, {
            Adresse: "Brunngässlein 8 4052 Basel",
            Telefonnummer: "061 690 91 60",
            Email: "info@nomad.ch",
            Website: "https://www.nomad.ch/"
        }, {
            Sonntag_bis_Mittwoch: "7.00 bis 23.00",
            Donnerstag_bis_Samstag: "7.00 bis 24.00"
        },
        new Date("2/19/2022"),
        "Noée",
        "Das Nomad ist ein gemütliches Hotel mit einer Bar und einem Restaurant, bei dem es sich lohnt, einen Halt zu machen.",
        [47.552709, 7.5942989]
    ),
    new blog(
        "Februar Special: Tibits",
        "Tibits",
        `Das Tibits ist ein vegetarisches Restaurant in Basel. In Basel hat es zwei Filialen, eine in der Steinenvorstadt und die andere im Gundeli bzw. direkt neben dem Bahnhofeingang Gundeldingen. Die Filiale am Bahnhof eignet sich gut, da man vor oder nach einer Reise etwas gutes essen kann. Das tolle am Tibits ist es, dass das Restaurant nur vegetarische oder vegane Sachen anbietet und man so sehr viel köstliche neue Gerichte ausprobieren kann. Das Tibits hat ein Buffet an dem man sich selber bedienen kann. Das hat zum Vorteil, dass man sich nur so viel schöpft wie man selber essen mag, also man kann seine Portion selber machen, was Foodwaste vermeidet. Und zum anderen Vorteil man kann sich das auf den Teller schöpfen was man gern hat oder was man gerne neu ausprobiert.
        Die Speisen haben eine sehr gute Qualität und schmecken ausgezeichnet. Das Personal ist sehr nett und aufmerksam. Die Ausstattung im Innenraum ist auf jeden Fall gut. Jedoch kann es sein das es im Winter sehr schnell keine Plätze mehr hat. Im Sommer hat es einen schönen Aussenbereich, mit dem man viel Platz hat. 


        Juli: Ich habe noch Lust auf ein Dessert, was meinst du?
        Noée: Ja auf jeden Fall. 
        Juli: Hier am Dessertbuffet gibt es ein Tiramisù das sehr lecker aussieht. Wollen wir eine Portion teilen?
        Noée: Ja gute Idee. Ich gehe zur Kasse bezahlen kommst du mit?
        Juli und Noée bezahlen.
        Juli: Das Personal ist immer so nett hier. Ich bin richtig zufrieden.
        Noée: Ja das stimmt. Sie sind sehr aufmerksam und haben uns direkt zwei Löffel mitgegeben um das Tiramisù zu teilen.
        Juli: Ja genau.
        Juli und Noée gehen zu ihrem Platz und essen das Tiramisù.
        Juli: Das schmeckt so guuuut.
        Noée: Da stimme ich dir voll und ganz zu. Einfach köstlich. Ich fand auch unsere Portion gerade perfekt.
        Juli: Ja finde ich auch. Das ist eben auch ein Vorteil von einem Buffet. Man kann sich so viel nehmen wie man will.
        Noée: Genau!`,
        [
            "Tibits/buffet-nr-1.png",
            "Tibits/buffet-nr-2.png",
            "Tibits/buffet-nr-3.png",
            "Tibits/buffet-nr-4.png",
            "Tibits/buffet-nr-5.png",
            "Tibits/gnotschi-nr-1.png",
            "Tibits/gnotschi-nr-2.png",
            "Tibits/rote-wand-nr-1.png",
            "Tibits/rote-wand-nr-2.png",
            "Tibits/tiramisu.png"
        ], {
            Ambiente: 5,
            PreisçLeistungsçVerhältnis: 5,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 4,
            Hygiene: 5,
            Service: 5,
            Ausstattung: 4
        }, {
            Adresse: "Meret Oppenheim-Strasse 1 4053 Basel",
            Telefonnummer: "061 531 40 40",
            Website: "http://www.tibits.ch/"
        }, {
            Montag_bis_Samstag: "8.00 bis 22.00",
            Sonntag: "9:00 bis 22:00"
        },
        new Date("2/24/2022"),
        "Noée",
        "Ein kleiner Dialog über das coole, vegetarische Restaurant am Bahnhof mit einem Specialguest.",
        [47.5460533, 7.5874119]
    ),
    new blog(
        "Union Diner",
        "Union",
        `Das Union Diner hat verschiedene Standorte. Unser Besuch erfolgte bei der Filiale nahe dem Bahnhof SBB. Es ist ein wenig versteckt neben dem Tibits. Wer also lieber fleischhaltiges statt vegetarisches Essen will, braucht nur etwa 20 Meter weitergehen. 
        Das Restaurant ist relativ klein und schlicht gehalten. Es besteht aus einem kleinen Aussenbereich, einer grossen Bar und Sitzgelegenheiten. Man kann per QR-Code bestellen. Die Küche ist direkt hinter der Bar, so kann man zuschauen, während das Essen zubereitet wird. `,
        [
            "Union/bar1.png",
            "Union/bar2.png",
            "Union/aussen.png",
            "Union/burger.png",
            "Union/burgerkarte.png",
            "Union/drinkkarte.png"
        ], {
            Ambiente: 4.5,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 4,
            Hygiene: 4,
            Service: 3.5,
            Ausstattung: 4
        }, {
            Adresse: "Meret Oppenheim-Strasse 1 4053 Basel",
            Telefonnummer: "061 271 02 66",
            Website: "https://uniondiner.ch/",
            Email: "moh@uniondiner.ch"
        }, {
            Montag_bis_Sonntag: "11:00 bis 23:00"
        },
        new Date("3/24/2022"),
        "Arik",
        "Das Union Diner ist ein Burgerladen, der hinter dem Bahnhof liegt und eine lockere Atmosphäre hat.",
        [47.5460160, 7.5865915]
    ),
    new blog(
        "Noohn Sushi Bar",
        "Noohn",
        `Die Sushi Bar im Noohn ist auf jeden Fall ein Erlebnis. In der Mitte der Bar ist ein Sushi Koch, der frisch Sushis zubereitet und sie auf das drehende Fliessband stellt. Bei den Sushi Tellern gibt es Unterschiede. Nämlich bestimmen die Farben der Teller die Preise, je nach Aufwendigkeit und Grösse. 
        Grün = 5.00 
        Blau = 7.00 
        Schwarz = 8.00 
        Rot = 9.00 
        Gelb = 12.00 
        
        Die Sushis haben eine sehr gute Qualität und schmecken sehr gut. Durch das Fliessband kommen immer wieder neue Kreationen von Sushis und man kann selber auswählen welche Sushis und wie viele Sushi-kreationen man konsumieren möchte. Das Noohn besitzt auch noch einen normalen Restaurantbereich mit anderen Spezialitäten. Man kann bei der Sushi-Bar nicht reservieren und selbst wenn die Sushi-Bar voll ist, gibt es keine langen Wartezeiten. Die Atmosphäre ist sehr toll und das Personal freundlich.`,
        [
            "Noohn/sushibar.jpg",
            "Noohn/sitze.jpg",
            "Noohn/display.png",
            "break",
            "Noohn/sushi.png",
            "Noohn/teller.png",
        ], {
            Ambiente: 5,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 4,
            Lage: 3.5,
            Hygiene: 5,
            Service: 4,
            Ausstattung: 4
        }, {
            Adresse: "Henric Petri-Strasse 12 4051 Basel",
            Telefonnummer: "061 281 14 14",
            Website: "http://www.noohn.ch/",
            Email: "events@noohn.ch"
        }, {
            Montag_bis_Freitag: "11:30 bis 14:00 / 18:00 bis 22:00",
            Samstag: "18:00 bis 22:00",
            Sonntag: "Geschlossen"
        },
        new Date("3/28/2022"),
        "Noée",
        "Das Noohn ist eine Sushi-bar mit einer grossen Auswahl an Sushi-kreationen",
        [47.5521166, 7.5922055]
    ),
    new blog(
        "Bistro Genusswerk & Co",
        "Genusswerk",
        `Das Bistro Genusswerk & Co ist ein Café/Restaurant am Freilagerplatz in Münchenstein, in der Nähe des Dreispitzes. Das Bistro bietet jeden Wochentag neu zubereitete frische Menüs an, die man auch alle als Take-Away mitnehmen. Das Bistro bietet zudem auch Events und Apéros an. Das Genusswerk & Co bietet sich super für ein Mittagessen an der Sonne an, denn es hat einen sehr schönen Aussenbereich. Das Essen war sehr frisch, aromatisch und hat sehr gut geschmeckt. 
        Das Personal ist sehr nett. Das Einzige, was vielleicht ein Nachteil ist, ist, dass es nicht direkt in der Stadt liegt und ein bisschen abseits liegt. Was aber gut ist, dass viele Kund*innen von der FHNW oder der Gestaltungsschule kommen, die in der Nähe sind. Das Ambiente ist sehr toll und angenehm, sodass man sich schnell wohlfühlt.`,
        [
            "Genusswerk/panini.png",
            "Genusswerk/innenraum.png",
            "Genusswerk/aussenbereich.png",
            "break",
            "Genusswerk/törtli.png",
            "Genusswerk/karte.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 4.5,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 3.5,
            Lage: 3,
            Hygiene: 4,
            Service: 5,
            Ausstattung: 4
        }, {
            Adresse: "Freilager-Platz 9 4142 Münchenstein",
            Telefonnummer: "061 281 14 14",
            Website: "http://www.noohn.ch/",
            Email: "events@noohn.ch"
        }, {
            Montag_und_Dienstag: "11:30 bis 16:00",
            Mittwoch_bis_Freitag: "10:30 bis 18:00",
            Samstag_und_Sonntag: "12:30 bis 18:00"
        },
        new Date("3/28/2022"),
        "Noée",
        "Das Bistro Genusswerk & Co ist ein Bistro in Münchenstein mit einem gemütlichen Aussenbereich.",
        [47.5327003, 7.6099120]
    ),
    new blog(
        "Vito Aeschen",
        "Vito",
        `Das Vito liegt nahe dem Aeschenplatz an der Strasse, Aeschengraben. Von aussen sieht es relativ langweilig aus. Drinnen sieht es aber anders aus. Die Inneneinrichtung ist sehr aufwendig und beinhaltet Pflanzen, kleine Tische, Bilder an den Wänden und vieles mehr. Es ist in einem altmodischen Stil eingerichtet und wirkt sehr gemütlich. 
        Bestellt werden können neben Pizzen, auch Getränke. Wer Pizza also nicht mag, ist in diesem Restaurant eher fehl am Platz. Man kann zwischen einer ganzen personalisierten Pizza auswählen oder einem schon gebackenen Stück. Die Wartezeit beträgt je nach Menge der Besucher*innen etwa 10-20 Minuten. Der Preis für ein kleines Stück Pizza beträgt 10 Franken. 
        Die Getränke sind da im Vergleich etwas teurer und wir empfehlen davor oder danach etwas zu trinken. Lieferservice gibt es nicht. Man kann entweder draussen vor dem Restaurant essen, oder drinnen, was wir empfehlen, da drinnen weniger Leute sind und man etwas mehr Platz hat.`,
        [
            "Vito/pizza-1.png",
            "Vito/pizza-2.png",
            "Vito/innenraum-1.png",
            "Vito/innenraum-2.png",
            "Vito/lavabo.png",
            "Vito/säule-1.png",
            "Vito/säule-2.png",
        ], {
            Ambiente: 5,
            PreisçLeistungsçVerhältnis: 3,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 4,
            Lage: 2,
            Hygiene: 4,
            Service: 2.5,
            Ausstattung: 5
        }, {
            Adresse: "Aeschengraben 14 4051 Basel",
            Telefonnummer: "076 220 55 68",
            Website: "https://www.vito.ch/",
            Email: "info@vito.ch"
        }, {
            Montag_bis_Mittwoch: "11:30 bis 22:00",
            Donnerstag: "11:30 bis 23:00",
            Freitag_und_Samstag: "11:30 bis 00:00",
            Sonntag: "12:00 bis 22:00"
        },
        new Date("4/9/2022"),
        "Arik",
        "Das Vito ist ein Pizzaladen im Aeschengraben mit einer coolen Atmosphäre.",
        [47.5508143, 7.593495]
    ),
    new blog(
        "BarFüssli",
        "Barfuessli",
        `In der BarFüssli, das ist im Orell Füssli im 1. Stock, kann man entspannt einen Kaffee geniessen und es bietet sich sehr gut an dort einen Zwischenstopp einzulegen, um eine Pause vom Shoppen oder anderen Aktivitäten in der Stadt zu machen, denn der Orell Füssli ist in der Freien Strasse, was sehr geeignet ist. Die BarFüssli wird von der Firma Gottlieber geführt, die für ihre Schokolade bekannt ist. 
        Die Atmosphäre ist sehr angenehm, einladend und ruhig, sodass man die BarFüssli auch gut als ein Ort zum Arbeiten benutzen kann. Ein Nachteil ist aber, dass die Ausstattung relativ begrenzt ist, darum ist es bei vielen Leuten schwierig einen Platz zu bekommen. Der Service ist nett und man wird gut bedient. Als Snacks bietet die BarFüssli süsse und salzige Kleinigkeiten an.`,
        [
            "Barfuessli/Cafe.png",
            "Barfuessli/Cafe-und-Most.png",
            "break",
            "Barfuessli/Wasser.png",
            "Barfuessli/Shop.png",
            "Barfuessli/Bar.png",
            "Barfuessli/Fenster.png"
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 3.5,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 3.5,
            Lage: 4.5,
            Hygiene: 4,
            Service: 3,
            Ausstattung: 2
        }, {
            Adresse: "Freie Strasse 17 4001 Basel",
            Telefonnummer: "079 157 57 81",
            Website: "https://www.gottlieber.ch/",
            Email: "info@gottlieber.ch"
        }, {
            Montag_bis_Freitag: "9:00 bis 18:30",
            Samstag: "9:00 bis 18:00",
            Sonntag: "Geschlossen"
        },
        new Date("4/16/2022"),
        "Noée",
        "Die Barfüssli ist ein Cafè in der Innenstadt mit einer guten Lage und einem Snackangebot.",
        [47.557363, 7.589085]
    ),
    new blog(
        "Nooch - Asian Kitchen",
        "Nooch",
        `Das Nooch befindet sich in der Gerbergassse 73, nahe vom Barfüsserplatz. Es hat eine asiatische Küche und bietet daher asiatische Spezialitäten unter anderem auch Sushis an. Es hat innen eine schöne Einrichtung und sehr viel Platz. Das Ambiente ist sehr cool und schön.
        Der Aussenbereich ist sehr begrenzt, was schade ist, weil es im Sommer dann schwierig ist, draussen einen Platz zu bekommen. Das Essen vom Nooch kann man sich auch nach Hause liefern lassen. Die Sushis schmecken sehr gut und frisch. Das Personal ist sehr nett und freundlich. 
        Das Nooch ist auf jeden Fall empfehlenswert für ein Mittagessen oder ein Abendessen in der Stadt.`,
        [
            "Nooch/Sushi.png",
            "Nooch/Schaukel.png",
            "Nooch/Velo.png",
            "Nooch/Aussenbereich.png",
            "Nooch/Bar.png",
            "Nooch/Gitter.png",
            "Nooch/Dessert.png"
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 3.5,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 3.5,
            Lage: 3.5,
            Hygiene: 3,
            Service: 4,
            Ausstattung: 4.5
        }, {
            Adresse: "Gerbergasse 73 4001 Basel",
            Telefonnummer: "061 261 67 80",
            Website: "https://www.nooch.ch/de/basel-barfi"
        }, {
            Montag_bis_Samstag: "11:00 bis 23:00",
            Sonntag: "12:00 bis 22:00"
        },
        new Date("4/28/2022"),
        "Noée",
        "Das Nooch ist ein Sushi-Restaurant in der Innenstadt mit einer coolen Atmossphäre.",
        [47.5553191, 7.5889372]
    ),
    new blog(
        "Papa Joe's",
        "PapaJoes",
        `Das Papa Joe's befindet sich gut gelegen am Barfüsserplatz. Der Eingangsbereich ist sehr schön dekoriert und führt über eine Treppe nach oben. Die Inneneinrichtung ist sehr aufwendig und detailliert gestaltet. Es gibt viele Bilder von Prominenten an den Wänden. Das Thema des Restaurants ist mexikanisch. 
        Die Auswahl der Speisekarte ist relativ gross, und besteht z.B. aus Burgern, Salaten und Spareribs. Die Qualität der Speisen ist relativ hoch, rechtfertigt aber unserer Meinung nach nicht die hohen Preise. So kostet ein Burger mit Pommes rund 30 Franken. Das Essen wurde relativ zeitnahe geliefert und das Personal war sehr freundlich. 
        Die Atmosphäre ist sehr angenehm und die Innenrichtung erzeugt einen sehr entspannten Aufenthalt. Insgesamt ist das Restaurant sicher zu empfehlen.`,
        [
            "PapaJoes/Essen.png",
            "PapaJoes/Nachos.png",
            "PapaJoes/Burger.png",
            "PapaJoes/Salat.png",
            "PapaJoes/Innenraum1.png",
            "PapaJoes/Innenraum2.png",
            "PapaJoes/Karte.png",
            "PapaJoes/Aussicht.png",
            "PapaJoes/Eingang.png",
        ], {
            Ambiente: 4.5,
            PreisçLeistungsçVerhältnis: 2.5,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 4.5,
            Lage: 4,
            Hygiene: 4.5,
            Service: 4,
            Ausstattung: 5
        }, {
            Adresse: "Steinenberg 14 4051 Basel",
            Telefonnummer: "061 225 93 94",
            Website: "https://www.papajoes.ch/"
        }, {
            Montag_bis_Donnerstag: "11:30 bis 23:00",
            Freitag: "11:30 bis 1:30",
            Samstag: "12:00 bis 1:30",
            Sonntag: "12:00 bis 23:00"
        },
        new Date("5/8/2022"),
        "Arik",
        "Das Papa Joe's ist ein mexikanisches Restaurant mit einer grossen Auswahl und einer tollen Einrichtung.",
        [47.5543552, 7.5892698]
    ),
    new blog(
        "La Manufacture",
        "Manufacture",
        `Das La Manufacture ist ein Restaurant an der Hochstrasse in der Nähe vom Tellplatz. Es ist für seine ausgezeichneten Burger bekannt. Die Inneneinrichtung ist sehr gemütlich mit Holztischen und Pflanzen gestaltet und man fühlt sich sehr schnell wohl. 
        Das Essen war sehr gut und die Qualität erstklassig. Das Personal war sehr nett und unkompliziert und hat zudem auch erklärt, wie das Essen in der Küche zubereitet wird (mit welchen Methoden und Zutaten), was sehr interessant war. Die Lage ist etwas abgelegen von den anderen Restaurants am Tellplatz, jedoch lohnt es sich auf jeden Fall vorbeizuschauen. 
        Das La Manufacture hat auch noch einen zweiten Standort in Basel am Klosterberg, in der Nähe von der Elisabethenkirche. Ausserdem bietet das La Manufacture einen Brunch jeden Sonntag an. Die Preis-Leistung ist auf jeden Fall angemessen für das köstliche Essen und das Erlebnis.`,
        [
            "Manufacture/Burger.png",
            "Manufacture/Wasser-Glas.png",
            "Manufacture/Drinks.png",
            "Manufacture/Salat.png",
            "Manufacture/Bar.png",
            "Manufacture/Innenbereich.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 4,
            Qualität_der_Speisen: 5,
            Quantität_der_Auswahl: 3.5,
            Lage: 3,
            Hygiene: 5,
            Service: 5,
            Ausstattung: 3.5
        }, {
            Adresse: "Hochstrasse 56 4053 Basel",
            Telefonnummer: "061 554 52 50",
            Website: "https://lamanufacture-restaurant.com/gundeli.html",
            Email: "reservation@lamanufacture-restaurant.com"
        }, {
            Montag_bis_Freitag: "11:30 bis 14:30 / 17:30 bis 22:30",
            Samstag: "12:00 bis 15:00 / 17:30 bis 22:30",
            Sonntag: "10:00 bis 14:00 / 17:30 bis 21:30"
        },
        new Date("5/12/2022"),
        "Noée",
        "Das La Manufacture ist ein Restaurant an der Hochstrasse in der Nähe vom Tellplatz bekannt für Burger.",
        [47.5444444, 7.5949900]
    ),
    new blog(
        "Starbucks",
        "Starbucks",
        `Die Starbucks Standorte erstrecken sich über ganz Basel. Bei unserem Besuch waren wir in der Freien Strasse, wo sich auf der rechten Seite der Starbucks befindet. Der Eingangsbereich ist relativ überschaubar und besteht aus der "Bar" und ein paar Sitzgelegenheiten. Das Untergeschoss ist dagegen sehr geräumig und schön eingerichtet. Man fühlt sich sehr schnell wohl und hat genügend Platz. 
        Die Preise sind jedoch im Vergleich mit anderen Cafés sehr hoch. So kostet eine Flasche stilles Wasser 4.50 FR. und auch der Kaffee ist preislich im Bereich 6 Franken oder mehr eingeordnet. Auch Snacks und ähnliches fallen im Vergleich zum Preis sehr klein aus. Unsere Empfehlung ist also, dass Starbucks ausschliesslich für einen Kaffee zu besuchen und den Hunger woanders zu stillen. Die Qualität des Kaffees ist aber top und rechtfertigt in diesem Fall den Preis.`,
        [
            "Starbucks/Konsum.png",
            "Starbucks/Cafe.png",
            "Starbucks/Kuchen.png",
            "Starbucks/Zimtrolle.png",
            "Starbucks/Sitzmöglichkeit.png",
        ], {
            Ambiente: 4,
            PreisçLeistungsçVerhältnis: 3,
            Qualität_der_Speisen: 4,
            Quantität_der_Auswahl: 3.5,
            Lage: 3.5,
            Hygiene: 4,
            Service: 4,
            Ausstattung: 4.5
        }, {
            Adresse: "Freie Strasse 89 4051 Basel",
            Telefonnummer: "061 271 09 20",
            Website: "https://www.starbucks.ch/",
        }, {
            Montag_bis_Samstag: "7:00 bis 20:00",
            Sonntag: "10:00 bis 19:00"
        },
        new Date("5/18/2022"),
        "Arik",
        "Das Starbucks ist wohl das bekannteste Café in Basel mit einer grossen Auswahl an Café und Snacks.",
        [47.5550555, 7.5912779]
    )
)

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
    const textElems = document.querySelectorAll("#content > p, #content > td, #content > th, #content > a");
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
        let mode = "bright";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            mode = "dark";
        } 
        localStorage.setItem("mode", mode);
        elemsToSwitch.forEach(x => {
            x.classList.add(mode);
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
    const headerElem = document.createElement("nav");
    headerElem.id = "header";

    const logoWrapper = document.createElement("a");
    logoWrapper.href = baseURL;
    const logo = new Image();
    logo.id = "logo";
    logo.src = `${baseURL}/images/Logo.png`;
    logo.alt = "Return to Homepage";
    logoWrapper.appendChild(logo);
    const collapseSidebarElem = new Image();
    collapseSidebarElem.alt = "collapse sidebar button";
    collapseSidebarElem.id = "collapseSidebar";
    collapseSidebarElem.src = `${baseURL}/images/menucollapse.png`;
    collapseSidebarElem.onclick = collapseSidebar;
    const searchDiv = document.createElement("div");
    if (!isMobile) {
        searchDiv.id = "searchForm";

        const searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.placeholder = "Suche...";
        searchBar.id = "searchBar";
        searchBar.onchange = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }

        const searchButton = new Image();
        searchButton.alt = "Lupe";
        searchButton.src = `${baseURL}/images/Suche.png`
        searchButton.id = "searchButton";
        searchButton.onclick = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }

        searchDiv.appendChild(searchBar);
        searchDiv.appendChild(searchButton);
    }

    const darkModeToggle = new Image();
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.alt = "Toggle Dark Mode"
    darkModeToggle.src = `${baseURL}/images/mode-toggle.png`
    darkModeToggle.onclick = function() {
        toggleDarkmode(false);
    }

    headerElem.appendChild(collapseSidebarElem);
    headerElem.appendChild(logoWrapper);

    if (!isMobile) {
        headerElem.appendChild(searchDiv);
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

    if (isMobile) {
        instagram.href = "instagram://user?username=baselfood_blog";
        instagram.onclick = _ => instagram.href = "https://www.instagram.com/_u/baselfood_blog/";
    } else {
        instagram.href = "https://www.instagram.com/_u/baselfood_blog/";
    }
    footer.appendChild(contact);
    footer.appendChild(instagram);
    return footer
}

function makeSidebar() {
    const sideBar = document.createElement("div");
    sideBar.id = "sidebar";

    let reverseBlogs = pastBlogs.blogs.slice().reverse();

    const searchDiv = document.createElement("div");
    if (isMobile) {
        searchDiv.id = "searchForm";

        const searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.placeholder = "Suche...";
        searchBar.id = "searchBar";
        searchBar.onchange = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }

        const searchButton = new Image();
        searchButton.alt = "Lupe";
        searchButton.src = `${baseURL}/images/Suche.png`
        searchButton.id = "searchButton";
        searchButton.onclick = function() {
            if (searchBar.value !== "") {
                location.href = `${baseURL}/Suche/?query=${searchBar.value}`;
            }
        }
        searchDiv.classList.add("sideBarBlog");
        searchDiv.appendChild(searchBar);
        searchDiv.appendChild(searchButton);
        sideBar.appendChild(searchDiv);
    }
    let blog = document.createElement("a");
    blog.classList.add("sideBarBlog");
    const homePage = document.createElement("p");
    homePage.innerText = "Startseite";
    blog.appendChild(homePage);
    blog.href = baseURL;

    if (baseURL.toLowerCase() == location.href.toLowerCase()) {
        blog.id = "currentBlog";
    }
    sideBar.appendChild(blog);

    blog = document.createElement("a");
    blog.classList.add("sideBarBlog");
    const aboutUs = document.createElement("p");
    aboutUs.innerText = "Über uns";
    blog.appendChild(aboutUs);
    blog.href = `${baseURL}/aboutus/`;

    if (`${baseURL}/aboutus/`.toLowerCase() == location.href.toLowerCase()) {
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
        let theDate = formatDate(pastBlog.postDate);
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

function checkMap() {
    if (typeof document.getElementById("map") != "undefined") {
        setTimeout(_ => console.log("Loading map again..."), 1000);
        if (document.getElementById("map").childElementCount == 0) {
            initMap();
        }
    }
}
