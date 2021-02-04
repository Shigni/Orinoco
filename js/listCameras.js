async function main() {
    try {
        const camerasRaw = await fetch('http://localhost:3000/api/cameras').then(r => r.json());
        const cameras = camerasRaw.map(value => new Camera(value))

        const $cameras = document.getElementById('cameras')
        const $templateCamera = document.getElementById('cameras_template').content;

        cameras.forEach(camera => {
            const $newTemplateCamera = $templateCamera.cloneNode(true);
            $newTemplateCamera.querySelector('.camera_name').innerText = camera.name
            $newTemplateCamera.querySelector('.camera_lense').innerText = camera.lenses
            $newTemplateCamera.querySelector('.camera_image').src = camera.imageUrl
            $newTemplateCamera.querySelector('.camera_id').innerText = camera.id
            $newTemplateCamera.querySelector('.camera_description').innerText = camera.description
            $newTemplateCamera.querySelector('.camera_price').innerText = camera.price
            

            $cameras.append($newTemplateCamera);
        });

    } catch (error) {

    }
}

main();