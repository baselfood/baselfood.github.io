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
    //setImgs(...imgs) {this.imgs = imgs}
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

        if (this.imgs) {
            const images = document.createElement("div")
            if (this.imgs.constructor == Array) {
                for (let img of this.imgs) {
                    if (img == "break") {
                        let breakElem = document.createElement("br")
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
            } else if (this.imgs.constructor == String && isURL(this.imgs)) {
                let newImg = new Image();
                newImg.src = this.imgs;
                newImg.alt = this.imgs.split(".").join("/").split("/").at(-2);
                images.appendChild(newImg);
            } else if (this.imgs.constructor == String) {
                let newImg = new Image();
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
            mapsCreateScript.innerHTML = `window.initMap = function() { toggleDarkmode(true); map = new google.maps.Map(map, {center: {lat: 47.5451464, lng: 7.5869987}, zoom: 12}); const marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(${this.pos.join(", ")}), title: "${this.name}"})}`;
            document.body.appendChild(mapsCreateScript);
            document.head.appendChild(googleMapsScript);
        }

        if (this.openingTimes) {
            let openingTimesTable = makeOpeningTimes(this.openingTimes);
            openingTimesTable.id = "openingTimes";
            content.appendChild(openingTimesTable);
        }
        content.id = "content";
        this.text = this.text.split("\n")
        for (let paragraph of this.text) {
            let pElem = document.createElement("p")
            pElem.classList.add("paragraph");
            pElem.innerText = paragraph;
            content.appendChild(pElem)
        }
        if (this.ratings) {
            let ratingTable = makeRatingTable(this.ratings)
            ratingTable.id = "ratingTable"
            content.appendChild(ratingTable)
        }
        if (this.infoBox) {
            let infoBoxTable = makeInfoBox(this.infoBox);
            infoBoxTable.id = "infoBox";
            content.appendChild(infoBoxTable);
        }
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

        const blogs = document.createElement("div");
        blogs.id = "blogs";

        for (let pastBlog of this.blogs) {
            let containingDiv = document.createElement("div");
            containingDiv.id = pastBlog.urlName;

            let blogTitle = document.createElement("h3");
            blogTitle.innerText = pastBlog.name;
            blogTitle.classList.add("blogTitle");

            let blogImg = new Image();
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
    findBlog(text) {
        return this.blogs.find(Blog => Blog.urlName == text)
    }
}

const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
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
            Das Musetti wird mehrheitlich von Erwachsenen besucht, und ist nicht unbedingt die beste Wahl für Kinder, da die Speisekarte keine Kindermenüs enthält. Die Preise sind etwas gehoben, was aber bei der hervorragenden Qualität und der hausgemachten Zubereitung gerechtfertigt ist. Die Räumlichkeiten sind relativ klein, aber sehr gemütlich eingerichtet.`,
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
            Auf der Speisekarte ist mit Symbolen jeweils angegeben wie scharf das jeweilige Gericht ist und ob es vegetarisch oder vegan ist. Man kann das Lily's auch via Velokurier nach Hause bestellen.`,
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
        "unreachable",
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

function toggleDarkmode(initial) {
    const body = document.body;
    const Tables = document.querySelectorAll("#content table *");
    const textElems = document.querySelectorAll("#content > p, #content > td, #content > th");
    const elemsToSwitch = [...Tables, ...textElems, body];
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
    contact.href = "mailto:baselfoodblog@gmail.com"

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
        instagram.onclick = _ => document.getElementById("instagram").href = "https://www.instagram.com/_u/baselfood_blog/"

        twitter.href = "twitter://user?screen_name=baselfood";
        twitter.onclick = _ => document.getElementById("twitter").href = "https://twitter.com/baselfood";
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

    for (let pastBlog of pastBlogs.blogs) {
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

function checkMap() {
    if (typeof document.getElementById("map") != "undefined") {
        setTimeout(_ => console.log("Loading map again..."), 1000);
        if (document.getElementById("map").childElementCount == 0) {
            initMap();
        }
    }
}