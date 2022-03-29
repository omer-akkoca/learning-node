const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplates");

const templateOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const templateCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const templateProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((e) =>
    slugify(e.productName, {
        replacement: "-",
        lower: true,
        trim: true,
    })
);

5 > 10
    ? console.log("jhasdnasjdsauıdjıasdjuıasnjdıosanhduıasdjsadjsaıdsaod")
    : console.log("kahudgyasıduhasudıhnasıudhnasuıdnsaıuhdnuısad");

const server = http.createServer((req, resp) => {
    const { query, pathname } = url.parse(req.url, true);

    switch (pathname) {
        //todo: OVERVIEW
        case "/": {
            resp.writeHead(200, {
                "Content-type": "text/html",
            });

            const cardHtml = dataObj
                .map((el) => replaceTemplate(templateCard, el))
                .join("");
            let output = templateOverview.replace(
                "{%PRODUCT_CARDS%}",
                cardHtml
            );

            resp.end(output);
            break;
        }
        case "/omer": {
            resp.writeHead(200, {
                "Content-type": "text/html",
            });
            resp.end("<h1>OMER AKKOCA</h1>");
            break;
        }
        case "/overview": {
            resp.writeHead(200, {
                "Content-type": "text/html",
            });

            const cardHtml = dataObj
                .map((el) => replaceTemplate(templateCard, el))
                .join("");
            let output = templateOverview.replace(
                "{%PRODUCT_CARDS%}",
                cardHtml
            );

            resp.end(output);
            break;
        }
        //todo: PRODUCT
        case "/product":
            {
                resp.writeHead(200, {
                    "Content-type": "text/html",
                });
                const product = dataObj[query.id];
                const output = replaceTemplate(templateProduct, product);
                resp.end(output);
            }
            break;
        //todo: API
        case "/api": {
            resp.writeHead(200, {
                "Content-type": "application/json",
            });
            resp.end(data);
            break;
        }
        //todo: NOT FOUND
        default:
            resp.writeHead(404, {
                "Content-type": "text/html",
                "my-header": "omer akkoca",
            }).end(`<h1>This page could not be found.</h1>`);
            break;
    }
});

server.listen("8000", () => {
    console.log("Server is running on port 8000");
});
