async function main() {
    try {
        

        const urlParams = new URLSearchParams(window.location.search)
        const myParam = urlParams.get('id')
        
        const cameraRaw = await fetch(`http://localhost:3000/api/cameras/${myParam}`).then(r => r.json());
        const camera = new Camera(cameraRaw)
        console.log(camera);


        document.getElementById("imgProduct").setAttribute("src", camera.imageUrl)
        camera.lenses.forEach((product) => {
            let optionProduit = document.createElement("option");
            document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = product;
            
        });

    }

    catch (error) {

    }
};

main();

