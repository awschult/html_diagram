
//Class for creating the drawing surface
//has an array of all the elements on the surface
//updates the surface on a set interval
//also handles all user interaction with the surface
function Surface()
{
    this.width = document.body.clientWidth;
    this.height = 1000;  // make this adjustable... somehow
    this.backgroundColor = "#EFEFEF";

    //reference to the box being dragged
    this.boxBeingDragged = {bx:null, xOffset:0, yOffset:0};    

    //needs a drawing surface
    this.surface = document.createElement("canvas");
    this.surface.width = this.width;
    this.surface.height = this.height;
    this.surface.style="border:1px solid #000000;";
    this.surface.style.backgroundColor=this.backgroundColor;

    //add canvas to the html page
    document.getElementById("canvas").appendChild(this.surface);


    //add event listeners
    this.surface.onmousemove = function(e){highlightBox(e.clientX-10, e.clientY-10);};
    this.surface.onmousedown = function(e){captureBox(e.clientX-10, e.clientY-10);};
    this.surface.onmouseup = function (){
                    surface.onmousemove = function(e){highlightBox(e.clientX-10, e.clientY-10);};
                    boxBeingDragged.bx = null;};

    //array to hold all of the on-screen elements
    this.elements = [];    

    //put a new block on the screen
    this.elements.push(new Block(this.surface));

    //event handler for highlighting boxes onmousemove
    this.highlight = function (x)
    {
        x.isSelected = true;
    }
    
    

    //function for grabbing a block and translating it
    this.captureBox = function (xMouse,yMouse)
    {
        var len = elements.length;
        for(var i = 0;i<len;i++)
        {
            //if mouse clicked on the box
            if( this.elements[i].boundsRect(xMouse,yMouse))
            {
                //enable dragging
                this.elements[i].isSelected = true;
                //remember the box
                this.boxBeingDragged.bx = this.elements[i];

                //store the mouse offset coordinates
                //this just makes it look nicer
                this.boxBeingDragged.xOffset = xMouse - this.boxBeingDragged.bx.xCoor;
                this.boxBeingDragged.yOffset = yMouse - this.boxBeingDragged.bx.yCoor;

                //put the box on the top of the stack
                var temp = this.elements.slice(i,i+1);
                this.elements.splice(i,i+1);
                this.elements.push(temp[0]);
                delete temp;
                

                //assign an event handler to move the box
                this.surface.onmousemove = function (e) {moveBox(e.clientX-10,e.clientY-10);};
               
            }
        }
    }



    //this function assigns new coordinates 
    //to the box being dragged
    this.moveBox = function(xMouse,yMouse)
    {
        if(this.boxBeingDragged != null)
        {
            var x = xMouse-this.boxBeingDragged.xOffset;
            var y = yMouse-this.boxBeingDragged.yOffset;

            this.boxBeingDragged.bx.setCoordinates(x,y);
        }
        else
        {
            console.log("ERROR: trying to drag an unassigned box.");
        }
    }



    //this function detects if the mouse is over top 
    //one of the elements. if it is, then the element 
    //is considered "selected".
    this.highlightBox = function (xMouse,yMouse)
    {
        for(box in elements)
        {
            if( this.elements[box].boundsRect(xMouse,yMouse))
            {
                this.elements[box].isSelected = true;
            }
            else
            {
                this.elements[box].isSelected = false;
            }
        }
    }


    this.update = function (e)
    {
        //clear the space
        var ctx = this.surface.getContext("2d");
        ctx.clearRect(0,0,this.surface.width,this.surface.height);
        for(piece in this.elements)
        {
            this.elements[piece].draw();
        }
    }

    setInterval(this.update,20);
}