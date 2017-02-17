/**
 * Déconnexion d'un utilisateur 
 * (Appel du controleur de déconnexion en POST)
 */
function deconnect() {
    var form = document.createElement('form');
    form.method = "POST";
    form.action = "index.htm";

    var c1 = document.createElement('input');
    c1.type = "hidden";
    c1.name = "idco";
    c1.value = document.getElementById("idco").value;
    form.appendChild(c1);

    document.body.appendChild(form);
    form.submit();
}


