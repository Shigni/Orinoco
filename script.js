fetch("http://localhost:3000/api/cameras").then(promise => {
    promise.json().then(data => {
        console.log(data);

        html = '';
        data.forEach(function (camera) {
            html = html + '<div>' + camera.name + '</div>';
        });
    });

    document.getElementById("listing").innerHtml = html;
})