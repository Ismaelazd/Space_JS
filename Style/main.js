let spaceship = new Vaisseau("../images/vaisseau-ballon-petit.png");
let tabTir = [];
let tabSoucoupe = [];
let score = 0;
let chrono = 0;
let meilleur = null;
let bestNombre = 0;
var inter;
var interTime;
let tabMissile = [];

let nbMax = 0;

//classe principale
function main() {
    $(document).ready(function () {

        spaceship.initHtml();
        updateUI();
        var restant = document.createElement("div");
        var s = document.getElementById("bestBoard");
        s.appendChild(restant);
        var contenu = "missiles utilisés : "+nbMax+"/3";
        restant.innerHTML = contenu;


    });


    inter = setInterval(game, 15);
    interTime = setInterval(time, 1000);

    setTimeout(function () {
        clearInterval(inter); clearInterval(interTime);
        alert("La partie est finie ! Votre score est de " + score + " !");
        loadName();loadScore();bestPlayer();
        location.reload();
    }, 30000);


}

//défini le meilleur joueur
function bestPlayer(){
    if (score > bestNombre ){
        bestNombre = score;
        changeName();

    }
}

//incrémente le chrono dans html
function time() {
    chrono = chrono + 1;
    $('#chronotime').text(chrono);

}

// permet la reconnaissance des touches du clavier
function affKeyCode(event) {
    //touche du haut
    if (event.keyCode == 38) {
        if (spaceship.posY > 10) {
            spaceship.move(-15);
        }

    }
    //touche du bas
    if (event.keyCode == 40) {
        if (spaceship.posY < 378 - 29) {
            spaceship.move(+15);
        }

    }
    //l'espace
    if (event.keyCode == 32) {
        let tir = spaceship.fire();
        tir.initHtml();
        tabTir.push(tir);

    }
    //le missile
    if (event.keyCode == 77 && tabMissile.length < 1 && nbMax<3) {
        let missile = spaceship.fireMissile();
        missile.initHtml();
        tabMissile.push(missile);
        nbMax++;

    }

}

//permet de creer une soucoupe aleatoirement sur l'axe des y
function creationSoucoupe() {
    let pos = Math.floor((Math.random() * 360));
    let soucoupe = new Soucoupe(950, pos);
    soucoupe.initHtml();
    tabSoucoupe.push(soucoupe);
}

//permet l'avancement de soucoupe dans le canevas
//elles sont supprimées si elles sortent du canevas
function avancementSoucoupe() {
    for (let i = tabSoucoupe.length - 1; i >= 0; i--) {
        if (tabSoucoupe[i].posX > 0) {
            tabSoucoupe[i].move();

        } else {
            tabSoucoupe[i].remove();
            tabSoucoupe.splice(i, 1);
            score = score - 1;
            $('#score').text(+score);

        }

    }
}

//permet l'avancement des tirs dans le canevas
//ils sont supprimées lorsqu'ils sortent du canevas
function avancementTir() {
    for (let i = tabTir.length - 1; i >= 0; i--) {
        //        if(tabTir[i].posX > 0){
        if (tabTir[i].posX >= 960) {
            tabTir[i].remove();
            tabTir.splice(i, 1);

        } else {
            tabTir[i].move();
        }
    }
}

function avancementMissile(){
    for (let i = tabMissile.length - 1; i >= 0; i--) {
        //        if(tabTir[i].posX > 0){
        if (tabMissile[i].posX >= 940) {
            tabMissile[i].remove();
            tabMissile.splice(i, 1);

        } else {
            tabMissile[i].move();
        }
    }
}

//permet le fonctionnement du jeu
function game() {
    // permet un interval plus fluide
    let interval = Math.floor((Math.random() * 80) + 1);
    if (tabSoucoupe.length == 0) {
        creationSoucoupe();
        //a chaque que l'interval = 50 on ajoute une souce
        // vu que c'est en miliseconde, tout va assez vite
    } else if (interval == 50 && tabSoucoupe.length < 10) {
        creationSoucoupe();
    }
    avancementSoucoupe();
    avancementTir();
    destruction();
    avancementMissile();
    destructionMiss();
    //missileRestant();


}


//Supprime les tirs et les soucoupes lors d'une collision
//Et incrémente le score
function destruction() {
    for (let j = 0; j < tabSoucoupe.length; j++) {
        for (let i = 0; i < tabTir.length; i++) {

            //28 debut a gauche de la soucoupe
            //32 debut a droite du tir
            //48 hauteur de la soucoupe

            if (tabTir[i].posX + 28 >= tabSoucoupe[j].posX && tabTir[i].posX + 32 <= tabSoucoupe[j].posX + 48 &&
                tabTir[i].posY >= tabSoucoupe[j].posY && tabTir[i].posY <= tabSoucoupe[j].posY + 36) {
                tabTir[i].remove();
                tabTir.splice(i, 1);
                tabSoucoupe[j].remove();
                tabSoucoupe.splice(j, 1);
                score++;
                $('#score').text(+score);
            }
        }
    }
}

function destructionMiss() {
    for (let j = 0; j < tabSoucoupe.length; j++) {
        for (let i = 0; i < tabMissile.length; i++) {

            //28 debut a gauche de la soucoupe
            //32 debut a droite du tir
            //48 hauteur de la soucoupe

            if (tabMissile[i].posX + 28 >= tabSoucoupe[j].posX && tabMissile[i].posX + 32 <= tabSoucoupe[j].posX + 48 &&
                tabMissile[i].posY >= tabSoucoupe[j].posY && tabMissile[i].posY <= tabSoucoupe[j].posY + 36) {
                tabMissile[i].remove();
                tabMissile.splice(i, 1);
                tabSoucoupe[j].remove();
                tabSoucoupe.splice(j, 1);
                /*score++;
                $('#score').text(+score);*/
            }
        }
    }
}


//permet de récupérer le nom du meilleur joueur en local
function loadName() {
	meilleur = localStorage.getItem("best");
	if (! meilleur) {
		meilleur = "inconnu";
    }

}

//mettre le nom dans le html à l'id best
function saveName() {
	localStorage.setItem("best", meilleur);

}

//change le nom stocké
function changeName() {
	meilleur = prompt("Votre nom");

	saveName();
    saveScore();
	updateUI();
}


//met a jour le score et le nom
function updateUI() {
	$("#best").text(localStorage.getItem("best"));
    $("#scoreBest").text(localStorage.getItem("scoreBest"));
}

//------ score

//permet de récupérer le nom du score en local
function loadScore() {
    bestNombre = localStorage.getItem("scoreBest");
    if (! bestNombre) {
		bestNombre = 0;
    }
}

//mettre le score dans le html à l'id scoreBest
function saveScore() {
    localStorage.setItem("scoreBest",bestNombre);
}





