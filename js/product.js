async function main() {
    try {
        

        const urlParams = new URLSearchParams(window.location.search)
        const myParam = urlParams.get('id')
        
        const cameraRaw = await fetch(`http://localhost:3000/api/cameras/${myParam}`).then(r => r.json());
        const camera = new Camera(cameraRaw)
        console.log(camera);


        document.getElementById("camera_image").setAttribute("src", camera.imageUrl)
        document.getElementById("camera_name").innerText = camera.name
        document.getElementById("camera_description").innerHTML = '<span>Description du produit: </span><br />' + camera.description
        document.getElementById("camera_price").innerHTML = '<span>Prix: </span>' + camera.price / 100 + '€'

        camera.lenses.forEach((product) => {
            let optionProduit = document.createElement("option");
            document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = product;
            
        });

    }

    catch (error) {

    }
};

main();

