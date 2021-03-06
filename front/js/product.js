const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, ArticleName
}

// URL de l'API
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

// Récupérer les données depuis l'API
function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price, _id } = couch
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    ArticleName = name
    loadImage(imageUrl, altTxt)
    loadTitle(name)
    loadPrice(price)
    loadCartDescription(description)
    loadColors(colors)
}

//Afficher l'image
function loadImage(imageUrl, altTxt) {
    const canape = document.createElement("img")
    canape.src = imageUrl
    canape.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(canape)
}

//Afficher le titre
function loadTitle(name) {
    const h1 = document.getElementById("title")
    if (h1 != null) h1.textContent = name
}

//Afficher le prix
function loadPrice(price) {
    const span = document.getElementById("price")
    if (span != null) span.textContent = price
}

//Afficher la description
function loadCartDescription(description) {
    const p = document.getElementById("description")
    if (p != null) p.textContent = description
}

//Afficher le choix des couleurs
function loadColors(colors) {
    const select = document.getElementById("colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}


//On ajoute les articles au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
    const colors = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
        
    if (isOrderInvalid(colors, quantity)) return
    saveOrder(colors, quantity)
    redirectToCart()
}

// Ordre des articles dans le panier
function saveOrder(colors, quantity) {
    const key = `${id}-${colors}`
    const data = {
        id: id,
        color: colors,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altText: altText,
        name: ArticleName
    }
    localStorage.setItem(key, JSON.stringify(data))
}

// Message d'alerte en cas d'article non sélectionné
function isOrderInvalid(colors, quantity) {
    if (colors == null || colors === "" || quantity == null || quantity == 0) {
        alert("Please choose a color and quantity")
        return true
    }
}

// Redirection vers le panier si un article y est ajouté
function redirectToCart() {
    window.location.href = "cart.html"
}