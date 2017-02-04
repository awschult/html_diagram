
//Class for blocks on the surface
//
function Block(surface)
{
    //needs to have a drawing element
    this.brush = surface.getContext("2d");
    this.text = "DEFAULT";
    this.width = 100;
    this.height = 40;
    this.color = "BBBBBB";
    this.xCoor = surface.width/4;
    this.yCoor = surface.height/4;
    this.isSelected = false;


    //function to set the coordinates
    this.setCoordinates = function(x,y)
    {
        this.xCoor = x;
        this.yCoor = y;
    }


    //function to set the text
    this.setText = function (msg)
    {
        this.text = msg;
    }



    //function to set the size
    this.setSize = function (width, height)
    {
        this.width = width;
        this.height = height;
    }



    //function to set the color
    //uses the typical RGB string
    //000000 = black
    //ffffff = white
    this.setColor = function (rgbVal)
    {
        this.color = rgbVal;
    }


    //function returns bool if the given
    //coordinates are intersecting the
    //box.
    this.boundsRect = function (x,y)
    {
        if( x > this.xCoor && x < this.xCoor+this.width &&
            y > this.yCoor && y < this.yCoor+this.height)
        {
            return true;
        }
        else
        {
            return false;
        }

    }


    //this function will draw the block onto the surface
    //it will draw a gradient fill 
    //it will draw a border (either bold or normal if selected)
    //it will draw the text
    this.draw = function ()
    {
        //draw the box with gradient
        var grad = this.brush.createLinearGradient(this.xCoor,this.yCoor,this.xCoor,this.yCoor+this.height);
        grad.addColorStop(0,"#EFEFEF");
        grad.addColorStop(1,"#" + this.color);
        this.brush.fillStyle = grad;
        this.brush.fillRect(this.xCoor,this.yCoor,this.width,this.height);


        //draw the border
        this.brush.strokeStyle = "#0f0f0f";
        this.brush.lineWidth = 0.5;
        if(this.isSelected == true) //bold line
        {
            this.brush.strokeStyle = "#000000";
            this.brush.lineWidth = 1;
        }
        this.brush.strokeRect(this.xCoor,this.yCoor,this.width,this.height);



        //draw the text
        this.brush.font = "bold 12px Courier New";
        this.brush.textAlign = "center";
        this.brush.fillStyle = "black";
        this.brush.fillText(this.text,this.xCoor+this.width/2,this.yCoor+this.height/2);
    }

}