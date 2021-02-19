let userPanier = JSON.parse(localStorage.getItem("userPanier"));

addPanier = () => {
    const $form = document.getElementById('form');

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

        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('id')
        const item = {
            "id": productId,
        };

        if (!localStorage.getItem("userPanier")) {
            let cartInit = [];
            localStorage.setItem("userPanier", JSON.stringify(cartInit));
        }

        let userPanier = JSON.parse(localStorage.getItem("userPanier"));

        if (!userPanier.includes(item)) {
            userPanier.push(item);
            localStorage.setItem("userPanier", JSON.stringify(userPanier));
            document.getElementById('success_type').innerText = 'Ajouté au panier';
        }
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

addition = () => {

    if (JSON.parse(localStorage.getItem("userPanier")).length > 0) {
        document.getElementById("basket-resume").remove();

        var products = localStorage.key("userPanier");
        var listOfProducts = JSON.parse(localStorage.getItem(products));

        const promises = listOfProducts.map(item => {
            return fetch(`http://localhost:3000/api/cameras/` + item.id).then(response => {
                return response.json()
            });
        });

        Promise.all(promises).then(data => {

            const $cameras = document.getElementById('camerasCart')
            const $templateCamera = document.getElementById('cameras_template').content;

            let i = 0;

            for (element in data) {
                const $newTemplateCamera = $templateCamera.cloneNode(true);

                $newTemplateCamera.querySelector('.camera_image').src = data[element].imageUrl
                $newTemplateCamera.querySelector('.camera_name').innerHTML = data[element].name
                $newTemplateCamera.querySelector('.camera_lense').innerHTML = data[element].lenses[0]
                $newTemplateCamera.querySelector('.camera_price').innerHTML = data[element].price
                $newTemplateCamera.getElementById('remove_product').innerHTML = '<button class="annulerProduit"><i class="fas fa-trash-alt"></i> delete </button>'

                $cameras.append($newTemplateCamera);

                let removeProduit = document.getElementById('remove_product');
                removeProduit.setAttribute("id", "remove" + i);

                const index = i
                
                removeProduit.addEventListener('click', () => {
                    annulerProduit(index)
                });
                i++;

                /*let deleteProduct = document.getElementById('remove_product');
                deleteProduct.appendChild(removeProduit);*/

                /*let ligneProduit = document.querySelector('.camera_name')
                ligneProduit.setAttribute("id", "produit" + i);*/
            };
        });
    };
}

annulerProduit = (i) => {
    console.log("Enlever le produit à l'index " + i);

    userPanier.splice(i, 1);
    console.log(userPanier);

    localStorage.clear();
    console.log("localStorage vidé");

    localStorage.setItem('userPanier', JSON.stringify(userPanier));
    console.log("localStorage mis à jour");

    window.location.reload();

};