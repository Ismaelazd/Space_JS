// Classe représentant le vaisseau
class Vaisseau{

    // Constructeur
    constructor(img){
        this._posX = 20;
        this._posY = 200;
        this._img = img;


    }

    // getter
    get posY(){
        return this._posY;
    }

    //setter
    set posY(value){
        if (value < 0) {
            throw new Error("Largeur négative : " + value);
        }
        this._posY = value;
    }

    // getter
    get posX(){
        return this._posX;
    }

    //setter
    set posX(value){
        if (value < 0) {
            throw new Error("Largeur négative : " + value);
        }
        this._posX = value;
    }

    // getter
    get img(){
        return this._img;
    }

    //setter
    set img(img){
        if (img == null || img =="") {
            throw new Error("pas d'image ! ");
        }
        this._img = img;
    }



    // Initialise le vaisseau dans le html
    initHtml(){
        var vaisseau = document.getElementById('vaisseau');
        vaisseau.src = this._img;
        vaisseau.style.position = "absolute";
        vaisseau.style.top = this.posY+"px";
        vaisseau.style.left = this.posX+"px";
    }

    //permet d'afficher le vaisseau
    display(){
        var vaisseau = document.getElementById('vaisseau');
        vaisseau.style.top = this.posY+"px";
        vaisseau.style.left = this.posX+"px";

    }

    //permet de déplacer le vaisseau
    move(distance){
        this._posY = this._posY +distance;
        this.display();
    }

    //permet au vaisseau de tirer
    fire(){
        return new Tir(this.posX + 41, this.posY + 10);

    }

    fireMissile(){
        return new Missile(this.posX + 41, this.posY + 10);
    }


}
