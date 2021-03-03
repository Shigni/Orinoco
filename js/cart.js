let userPanier = JSON.parse(localStorage.getItem("userPanier"));

displayForm = () => {
if (!localStorage.getItem("userPanier")) {
    document.getElementById("totalPrice").style.display = "none";
};
}
// Ajout au panier
addPanier = () => {
    const $form = document.getElementById('form');

    // Obligation de remplir le champs pour ajouter au panier
    $form.addEventListener('submit', (e) => {
        e.preventDefault();

        const datas = formToJson($form);
        let hasError = false;

        document.getElementById('errors_type').innerText = '';
        document.getElementById('success_type').innerText = '';
        if (!datas.type) {
            document.getElementById('errors_type').innerText = "Sélectionnez un objectif";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        //Création de l'objet dans le localStorage
        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('id')
        let selectQuantity = document.getElementById("productQuantity");
        let selectedQuantity = selectQuantity.options[selectQuantity.selectedIndex].value;
        let selectLense = document.getElementById("optionSelect");
        let selectedLense = selectLense.options[selectLense.selectedIndex].value
        const item = {
            "id": productId,
            "quantity": selectedQuantity,
            "lense": selectedLense,
        };

        if (!localStorage.getItem("userPanier")) {
            let cartInit = [];
            localStorage.setItem("userPanier", JSON.stringify(cartInit));
        }

        let userPanier = JSON.parse(localStorage.getItem("userPanier"));

        var isInUserCart = false;
        
        // Vérifie si l'objet est déjà dans le panier et bloque l'ajout d'un second        
        userPanier.forEach(element => {
            if ((selectedLense == element.lense) && (productId == element.id)) {
                isInUserCart = true;
            }
        });

        if (!isInUserCart) {
            userPanier.push(item);
            localStorage.setItem("userPanier", JSON.stringify(userPanier));
            window.location.reload();
        }

        userPanier.forEach(element => {
            if ((selectedLense == element.lense) && (productId == element.id)) {
                element.quantity = selectedQuantity;
                localStorage.setItem("userPanier", JSON.stringify(userPanier));
                window.location.reload();

            }
        });
    });

    function formToJson($form) {
        const result = {};
        const formData = new FormData($form);

        Array.from(formData.keys()).forEach((key) => {
            result[key] = formData.get(key);
        })

        return result;
    }
};

// Création de la pastille indiquant le nombres de produits dans le panier
cartInfo = () => {

    if (JSON.parse(localStorage.getItem("userPanier")).length > 0) {

        let infoCart = document.createElement("div")
        infoCart.setAttribute("id", "pastille")
        document.getElementById("info-cart").appendChild(infoCart)
    };

    for (i = 0; i < userPanier.length; i++) {
        x = userPanier.length;
        document.getElementById("pastille").innerHTML = x;
    };
}

// Récupération du localStorage, ajout des informations de panier
addition = () => {
    // Ne pas afficher le panier si il est vide
    if (JSON.parse(localStorage.getItem("userPanier")).length <= 0)  {
        document.getElementById("totalPrice").remove()
    };

    if (JSON.parse(localStorage.getItem("userPanier")).length > 0) {
        document.getElementById("basket-resume").remove();

        // Création de l'afficheur du prix total
        let createTotal = document.createElement("div");
        createTotal.setAttribute("id", "totalCart");
        document.getElementById("totalPrice").appendChild(createTotal);

        var products = localStorage.key("userPanier");
        var listOfProducts = JSON.parse(localStorage.getItem(products));

        // Récupération des données de l'api
        const promises = listOfProducts.map(item => {
            return fetch(`http://localhost:3000/api/cameras/` + item.id).then(response => {
                return response.json()
            });
        });

        // Affichage des différents objets du localStorage
        Promise.all(promises).then(data => {

            const $cameras = document.getElementById('camerasCart')
            const $templateCamera = document.getElementById('cameras_template').content;

            let i = 0;

            for (element in data) {
                const $newTemplateCamera = $templateCamera.cloneNode(true);

                $newTemplateCamera.querySelector('.camera_image').src = data[element].imageUrl
                $newTemplateCamera.querySelector('.camera_name').innerHTML = data[element].name
                $newTemplateCamera.querySelector('.camera_lense').innerHTML = '<span>Objectif: </span>' + listOfProducts[element].lense
                $newTemplateCamera.querySelector('.camera_price').innerHTML = '<span>Prix: </span>' + data[element].price * listOfProducts[element].quantity / 100 + '€'
                $newTemplateCamera.getElementById('remove_product').innerHTML = '<button class="annulerProduit"><i class="fas fa-trash-alt"></i> <span class="delete-btn"> Supprimer </span></button>'
                $newTemplateCamera.querySelector('.quantityCheck').innerHTML = '<div data-id="' + data[element]._id + '" data-lense="' + listOfProducts[element].lense + '" class="more">+</div><span>Quantité: </span>' + listOfProducts[element].quantity + '<div data-id="' + data[element]._id + '" data-lense="' + listOfProducts[element].lense + '" class="less">-</div>';

                $cameras.append($newTemplateCamera);

                // Création de bouton de retrait du panier
                let removeProduit = document.getElementById('remove_product');
                removeProduit.setAttribute("id", "remove" + i);

                const index = i
                removeProduit.addEventListener('click', () => {
                    annulerProduit(index)
                });

                i++;

                // Calcul du prix total en fonction du nombre d'objet dans le panier et de leur quantité
                let totalPrice = 0
                for (element in data) {
                    totalPrice += data[element].price * listOfProducts[element].quantity / 100;
                };
                document.getElementById("totalCart").innerHTML = '<span>Total du panier: </span>' + totalPrice + '€';
            };

            // Comparaison des id produits et bouton et modification de la quantité dans le panier
            // Diminue la quantité
            document.addEventListener('click', e => {
                if (!e.target.classList.contains("less")) {
                    return;
                }
                for (element in listOfProducts) {
                    if (listOfProducts[element].lense == e.target.dataset.lense && listOfProducts[element].id == e.target.dataset.id && listOfProducts[element].quantity > 1) {
                        listOfProducts[element].quantity--;
                        window.location.reload();
                    }
                }
                localStorage.setItem("userPanier", JSON.stringify(listOfProducts));
            });

            // Augmente la quantité
            document.addEventListener("click", e => {
                if (!e.target.classList.contains("more")) {
                    return;
                }

                for (element in listOfProducts) {
                    if (listOfProducts[element].lense == e.target.dataset.lense && listOfProducts[element].id == e.target.dataset.id && listOfProducts[element].quantity < 5) {
                        listOfProducts[element].quantity++;
                        window.location.reload();
                    }
                }
                localStorage.setItem("userPanier", JSON.stringify(listOfProducts));
            });

        });

    };
};

// Fonction pou le retrait d'un produit du panier
annulerProduit = (i) => {
    userPanier.splice(i, 1);
    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    window.location.reload();
};


