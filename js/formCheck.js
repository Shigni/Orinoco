var products = localStorage.key("userPanier");
var listOfProducts = JSON.parse(localStorage.getItem(products));
let productOrder = [];
for (element in listOfProducts) {
  productOrder.push(listOfProducts[element].id);
}

function checkInput() {
    // Controle Regex
    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;
   
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    // message fin de controle
    let checkMessage = "";

    // Récupération des inputs
    let formFNom = document.getElementById("fname").value;
    let formLNom = document.getElementById("lname").value;
    let formMail = document.getElementById("mail").value;
    let formAdresse = document.getElementById("address").value;
    let formVille = document.getElementById("city").value;
    let formZip = document.getElementById("zip").value;
 
        if(checkNumber.test(formFNom) == true || checkSpecialCharacter.test(formFNom) == true || formFNom == ""){
        	checkMessage = "Vérifier/renseigner votre Prénom";
        }

        if(checkNumber.test(formLNom) == true || checkSpecialCharacter.test(formLNom) == true || formLNom == ""){
        	checkMessage = "Vérifier/renseigner votre nom";
        }
        
        if(checkMail.test(formMail) == false){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
        }
        
        if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
        }
        
        if(checkSpecialCharacter.test(formVille) == true || checkNumber.test(formVille) == true || formVille == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
        }

        if(checkSpecialCharacter.test(formZip) == true || checkMail.test(formZip) == true || checkString.test(formZip) == true || formZip == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre code postal"
        }
        
        if(checkMessage != ""){
        	alert("Il est nécessaire de :" + "\n" + checkMessage);
            return false;
        }
        return true;   
    };

    function confirmOrder() {
        // Vérif du formulaire
        if (checkInput() == true) {
          let order = {
            // Récupère le tableau d'id des produits
            products: productOrder,
            // Créé l'objet
            contact: {
              lastName: document.getElementById("lname").value,
              firstName: document.getElementById("fname").value,
              address: document.getElementById("address").value,
              city: document.getElementById("city").value,
              email: document.getElementById("mail").value,
            },
          };
          console.log(order)
          let headers = {
            "Content-Type": "application/json"
          };
          // Envoie les informations à l'API 
          fetch('http://localhost:3000/api/cameras/order', {
            method: 'post',
            headers: headers,
            body: JSON.stringify(order),
      
            //Récupère la réponse 
          }).then(function (response) {
            if (response.status == 201) {
              response.json().then(function (data) {
                // Vide le localStorage
                localStorage.clear();
                // Envoie les informations dans le sessionStorage
                sessionStorage.setItem("orderSum", JSON.stringify(data));
                // Ouvre une fenêtre avec sur l'id de commande
                window.open("\order.html?orderId=" + data.orderId);
                window.location.reload();
              });
            }
          }).catch(function (err) {
            window.alert("Impossible d'afficher les fichiers !")
          });
        };
      }