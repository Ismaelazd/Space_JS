// représente la class tir
let nbTir =0;
class Tir{

    constructor(posX,posY){
        this._posX = posX;
        this._posY = posY;
        this._img = "../images/tir.png";
        this._id=nbTir++;

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

    //initialisme les tirs dans html
    initHtml(){
        var tir =  document.createElement("img");//"img" est le type d'element
        document.getElementById("game").append(tir); // tir représente le nom de l'id ajouté

        //modifie les attributs des constructeurs
        tir.src = this._img;
        tir.setAttribute("id","tir"+this._id);//id est incrémenté
        //les positions sont modifiées
        tir.style.position = "absolute";
        tir.style.top = this.posY+"px";
        tir.style.left = this.posX+"px";

    }

    // permet d'afficher les tirs
    display(){

        var tir = document.getElementById('tir'+this._id);
        tir.style.top = this.posY+"px";
        tir.style.left = this.posX+"px";

    }

    // permet de faire bouger les tirs
    move(){
        this._posX =this._posX + 10;
        this.display();
    }

    //permet de retire les tir de l'html
    remove(){
        var tir = document.getElementById('tir'+this._id);
        tir.parentNode.removeChild(tir);
    }

}
