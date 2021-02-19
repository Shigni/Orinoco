if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
  	let products = [];

	//L'user a maintenant un panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));


addPanier = () =>{

    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('id')

    let inputBuy = document.getElementById("ajouterProduitPanier");
    inputBuy.addEventListener("click", async function() {
        const cameraRaw = await fetch(`http://localhost:3000/api/cameras/${myParam}`).then(r => r.json());
        const produits = new Camera(cameraRaw)

    userPanier.push(produits);
    localStorage.setItem("userPanier", JSON.stringify(userPanier));
    console.log("le produit a été ajouté au panier");
    console.log(localStorage)
  
});
};

addition = () =>{
  
  if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
    document.getElementById("panierVide").remove();
  
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");

    let ligneTotal = document.createElement("tr");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPaye = document.createElement("td");

    let factureSection = document.getElementById("basket-resume");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = "Nom du produit";
    ligneTableau.appendChild(colonnePrixUnitaire);
    colonnePrixUnitaire.textContent = "Prix du produit";

    let i = 0;
    
    JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
  
      let ligneProduit = document.createElement("tr");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("button");

      ligneProduit.setAttribute("id", "produit"+i);
      removeProduit.setAttribute("id", "remove"+i);
      removeProduit.setAttribute('class', "annulerProduit");
      removeProduit.innerText = ("delete")
      
      removeProduit.addEventListener('click', annulerProduit.bind(i));
      i++;

      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      nomProduit.innerHTML = produit.name;
      prixUnitProduit.textContent = produit.price / 100 + " €";
  });

    facture.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneRefTotal);
    colonneRefTotal.textContent = "Total à payer"
    ligneTotal.appendChild(colonnePrixPaye);
    colonnePrixPaye.setAttribute("id", "sommeTotal")

    let totalPaye = 0;
    JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
      totalPaye += produit.price / 100;
    });

    console.log(totalPaye);
    document.getElementById("sommeTotal").textContent = totalPaye + " €";
};
}

annulerProduit = (i) =>{
  console.log("Enlever le produit à l'index " + i);

    userPanier.splice(i, 1); 
    console.log(userPanier);

    localStorage.clear();
    console.log("localStorage vidé");

    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log("localStorage mis à jour");

    window.location.reload();
};