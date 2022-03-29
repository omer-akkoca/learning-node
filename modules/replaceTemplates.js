module.exports = (temp,product) =>{
    let output =    temp.replace(/{%PRODUCTNAME%}/g, product.productName)
                    .replace(/{%IMAGE%}/g, product.image)
                    .replace(/{%PRICE%}/g, product.price)
                    .replace(/{%FROM%}/g, product.from)
                    .replace(/{%NUTRIENTS%}/g, product.nutriens)
                    .replace(/{%QUANTITY%}/g, product.quantity)
                    .replace(/{%DESCRIPTION%}/g, product.description)
                    .replace(/{%ID%}/g, product.id)
                    .replace(/{%IMAGE%}/g, product.image)
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
    }

    return output;
}