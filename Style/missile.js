let nbMissile =0;

class Missile{

    constructor(posX,posY){
        this._posX = posX;
        this._posY = posY;
        this._img = "../images/missile2.png";
        this._id=nbMissile++;

    }

    // getter
    get posY(){
        return this._posY;
    }

    //setter
    set posY(value){
        if (value < 0) {
            throw new Error("position négative : " + value);
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
            throw new Error("position négative : " + value);
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

     initHtml(){
        var missile =  document.createElement("img");
        document.getElementById("game").append(missile);
        missile.src = this._img;
        missile.setAttribute("id","missile"+this._id);
        missile.style.position = "absolute";
        missile.style.top = this.posY+"px";
        missile.style.left = this.posX+"px";

    }
     display(){

        var missile = document.getElementById('missile'+this._id);
        missile.style.top = this.posY+"px";
        missile.style.left = this.posX+"px";

    }

     move() {


        let distance = Math.floor((Math.random() * 3) - 1);
        if (this.posY < 30) {
            this.posX = this.posX + 5;
            this.posY = 30;
            this.display();
        } else if (this.posY > 370) {
            this.posX = this.posX + 5;
            this.posY = 370;
            this.display();
        } else {
            this.posX = this.posX + 5;
            this.posY = this.posY + distance;
            this.display();
        }


    }

    remove(){
        var missile = document.getElementById('missile'+this._id);
        missile.parentNode.removeChild(missile);
    }

}
