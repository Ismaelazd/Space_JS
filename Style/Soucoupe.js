let nbSoucoupe = 0;


// représentatoin de la classe soucoupe
class Soucoupe {

    constructor(posX, posY) {
        this._posX = posX;
        this._posY = posY;
        this._img = "../images/flyingSaucer-petit.png";
        this._id = nbSoucoupe++;

    }

    // getter
    get posY() {
        return this._posY;
    }

    //setter
    set posY(value) {
        if (value < 0) {
            throw new Error("Largeur négative : " + value);
        }
        this._posY = value;
    }

    // getter
    get posX() {
        return this._posX;
    }

    //setter
    set posX(value) {
        if (value < 0) {
            throw new Error("Largeur négative : " + value);
        }
        this._posX = value;
    }

    // getter
    get img() {
        return this._img;
    }

    //setter
    set img(img) {
        if (img == null || img =="") {
            throw new Error("pas d'image ! ");
        }
        this._img = img;
    }

    // permet d'initialiser les soucoupes dans html
    initHtml() {
        var soucoupe = document.createElement("img"); //créé une balise img
        document.getElementById("game").append(soucoupe); // soucoupe représente le nom de l'id ajouté a l'id game

        //modifie les attributs des constructeurs
        soucoupe.src = this._img;
        soucoupe.setAttribute("id", "soucoupe" + this._id); //id est incrémenté
        //les positions sont modifiées
        soucoupe.style.position = "absolute";
        soucoupe.style.top = this.posY + "px";
        soucoupe.style.left = this.posX + "px";
    }

    //permet d'afficher les soycoupes
    display() {
        var soucoupe = document.getElementById('soucoupe' + this._id); // a l'attribut soucoupe on ajoute une soucoupe
        soucoupe.style.top = this.posY + "px";
        soucoupe.style.left = this.posX + "px";
    }

    //permet de déplacer les soucoupes
    move() {

        // Tire un nombre entre 1 et 2. Si c'est 1 distance<0 si c'est 2 distance>0
        let distance = Math.floor((Math.random() * 3) - 1);
        if (this.posY < 30) {
            this.posX = this.posX - 2;
            this.posY = 30;
            this.display();
        } else if (this.posY > 370) {
            this.posX = this.posX - 2;
            this.posY = 370;
            this.display();
        } else {
            this.posX = this.posX - 2;
            this.posY = this.posY + distance;
            this.display();
        }



    }

    //permet de supprimer les soucoupes de l'html
    remove() {
        var soucoupe = document.getElementById('soucoupe' + this._id);
        soucoupe.parentNode.removeChild(soucoupe);
    }

}
