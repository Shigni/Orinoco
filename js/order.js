// Récupération des paramètres de l'URL
let params = (new URL(document.location)).searchParams;
let name = params.get("orderId");

var targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);

// Livraison estimée (date du jour + 10)

var dd = targetDate.getDate();
var mm = targetDate.getMonth() + 1;
var yyyy = targetDate.getFullYear();

var dateString = dd + "/" + mm + "/" + yyyy;




// Récupération des informations du sessionStorage et affichage
let orderDetails = JSON.parse(sessionStorage.getItem("orderSum"));
let totalPrice = 0;
let productsDetails = orderDetails.products

// Récupération et calcul du prix total
for (element in productsDetails) {
    totalPrice += productsDetails[element].price / 100;   
}

document.getElementById("orderId").innerHTML = orderDetails.orderId;
document.getElementById("confirmOrder").innerHTML = `Merci pour votre commande chez Orinoco! Nous espérons que vos produits vous satisferont ! Un e-mail de confirmation vous a été envoyé à l'adresse mail suivante: ` + '<span>' + orderDetails.contact.email + '</span>' + `, contenant le récapitulatif de la commande.`;
document.getElementById("totalPrice").innerHTML = totalPrice + `€`;

document.getElementById("orderFName").innerHTML = orderDetails.contact.firstName;
document.getElementById("orderLName").innerHTML = orderDetails.contact.lastName;
document.getElementById("orderEmail").innerHTML = orderDetails.contact.email;
document.getElementById("orderAddress").innerHTML = orderDetails.contact.address;
document.getElementById("orderCity").innerHTML = orderDetails.contact.city;

document.getElementById("deliveryDate").innerHTML = dateString;

//Supprime le sessionStorage
function clearStorage() {
    sessionStorage.clear();
}