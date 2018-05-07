"use strict";

const from_elon  = "53 11E RFRFRFRF 32N FRRFLLFFRRFLL 03W LLFFFLFLFL"

let schema_constructor = str => {

    const trimmed = str.trim().split(/\s+/),
        grid_info = trimmed[0].split("")

    this.grid = {
        x: parseInt(grid_info[0]),
        y: parseInt(grid_info[1])
    }
    this.rovers = []

    for (let i=1;i<trimmed.length;i++){

        let start = trimmed[i].split("")

        const local_rover = {
            start: {
                x: parseInt(start[0]),
                y: parseInt(start[1]), 
                direction: start[2]
            },
            movement: ""
        }

        this.rovers.push(local_rover)
        i++
        local_rover.movement = trimmed[i]
        
    }
    return this;
}

const   schema      = schema_constructor(from_elon),
        compass     = ["N","E","S","W"],
        deaths      = [],
        hungry      = () => console.log('ba' + +'a'+'a');

//I copy and pasted this part of the code, i wish i was smart enough to to be able to do something like this
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=> {
        const r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
        return v.toString(16);
    });
}

function rover (input_data) {
    
    return new Promise (resolve=>{

        this.x          = input_data.start.x;
        this.y          = input_data.start.y;
        this.id         = Math.random().toString(36).substr(2, 9);
        this.direction  = input_data.start.direction;
        this.state      = "alive";
        this.status     = () => console.log(this.x+" "+this.y+" "+this.direction+" "+(this.state ==="alive"?" ":"LOST"));
        this.kill       = () => {

            this.state  = "dead";
            deaths.push({x: this.x, y: this.y});

        };
        this.move       = str => {
            
            let current_direction;

            if(this.state === "dead") return;

            if(str === "R") {
                
                //This finds the direction in the array then goes clockwise
                current_direction = compass.indexOf(this.direction)+1;
                
                //This stops it going off the array end
                if (current_direction === compass.length) {
                    current_direction = 0;
                }

                this.direction = compass[current_direction];
                return
            }

            if(str === "L") {
                
                current_direction = compass.indexOf(this.direction)-1;

                if (current_direction < 0) {
                    current_direction = compass.length-1;
                }

                this.direction = compass[current_direction];
                return
            }

            if(str === "F") {
                // console.log(deaths)
                //loop through the deaths and check if the rover is next to a death position
                for(let i of deaths){
                    
                    if(i.x===this.x+1||i.y===this.y+1) {
                        return
                    }
                }

                //this is sneaky, it itterates and checks the boundries
                if     (this.direction === "N" && this.y++ === schema.grid.y) {this.y--;this.kill()}
                else if(this.direction === "S" && this.y-- === 0) {this.y++;this.kill()}
                else if(this.direction === "E" && this.x++ === schema.grid.x) {this.x--;this.kill()}
                else if(this.direction === "W" && this.x-- === 0) {this.x++;this.kill()}
                
            }
        };
        this.parse_input = () => {

            const instructions = input_data.movement.split("");
            for(let i of instructions) this.move(i);
            resolve(this.status());
        }
        this.parse_input(input_data)
    })
}

new rover(schema.rovers[0]).then(()=>new rover(schema.rovers[1]).then(()=>new rover(schema.rovers[2])))

// hungry()/*?*/




