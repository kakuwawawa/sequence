//User's class declaration

class BitArray {
    constructor(size) {
        this.size = size;
        this.array = new Uint8Array((size + 7) >> 3); // 必要なバイト数を確保
    }

    // 真偽値を設定する
    set(index, value) {
        if (index >= this.size || index < 0) {
            throw new RangeError("Index out of bounds");
        }
        const byteIndex = index >> 3;
        const bitIndex = index & 7;

        if (value) {
            this.array[byteIndex] |= (1 << bitIndex); // ビットを立てる
        } else {
            this.array[byteIndex] &= ~(1 << bitIndex); // ビットを下げる
        }
    }

    // 真偽値を取得する
    get(index) {
        if (index >= this.size || index < 0) {
            throw new RangeError("Index out of bounds");
        }
        const byteIndex = index >> 3;
        const bitIndex = index & 7;

        return (this.array[byteIndex] & (1 << bitIndex)) !== 0; // ビットをチェック
    }
    log(){
        alert(this.array);
    }
}

class conveyor{
    constructor(can_info,
    work_width,work_height){
        this.con = can_info[1];
        this.canW = can_info[0].width;
        this.canH = can_info[0].height;
        this.workW = work_width / 2;
        this.workH = work_height / 2;
        this.speed = 5;
        this.boltMany = 4;
        this.bolt = new BitArray(this.boltMany);
        for (let i=0;i<this.boltMany;i++){
            this.bolt.set(i,true);
        }
        this.boltLs = {
        "left":{
                0:"ls5",
                1:"ls4",
                2:"ls3",
                3:"ls4"},
        "right":{
                0:"ls1"}};
        //background-color: green;
        this.con.fillStyle = "#060";
        this.con.fillRect(0,0,this.canW,this.canH);
        this.setImg = this.con.getImageData(0,0,this.canW,this.canH);
    }
    write_work(x,y){
        if(x > this.canW - this.workW || x < this.workW){
            throw new RangeError("Index out of bounds");
        }
        else if(y > this.canH - this.workH || y < this.workH){
            throw new RangeError("Index out of bounds");
        }
        this.workX = x;
        this.workY = y;
        const work_left = x - this.workW;
        const work_right = x + this.workW;
        const work_up = y - this.workH;
        const work_down = y + this.workH;
        const radius = this.workH / 4;
        const endAngle = Math.PI * 2;
        const boltCenter =[
        [x , radius] , 
        [x , radius * 3],
        [x , radius * 5],
        [x , radius * 7]
        ];
        this.con.putImageData(this.setImg,0,0);
        this.con.fillStyle = "#aaa";
        this.con.fillRect(work_left,work_up,work_right,work_down);
        this.con.fillStyle = "#999";
        this.con.beginPath();
        for(let i=0;i<this.boltMany;i++){
            if(this.bolt.get(i)){
                this.con.arc(boltCenter[i][0],boltCenter[i][1],radius,0,endAngle);
            }
        }
        this.con.fill();
        
    }
    move_left(alldevice,ls_dev){
        if(this.workX - this.speed - this.workW < 0){
            for(let i=0; i<this.boltMany;i++){
                if(this.bolt.get(i)){
                    let dev_name = ls_dev[this.boltLs["left"][i]];
                    let device = str_dev(dev_name);
                    alldevice[device["header"]].set(device["index"],true);
                }
            }
        }
        else{
            this.write_work(this.workX -this.speed,this.workY);
        }
    }
    move_right(alldevice,ls_dev){
        if(this.workX + this.speed + this.workW > this.canW){
            let dev_name = ls_dev[this.boltLs["right"][0]];
            let device = str_dev(dev_name);
            alldevice[device["header"]].set(device["index"],true);
            }
        }
        else{
            this.write_work(this.workX+this.speed,this.workY);
        }
    }
}

//************************//
//User's function area
function settingid(btn_id){
btn_id.forEach(btn=>{
    let el_btn = document.getElementById(btn[0]);
    el_btn.addEventListener('click',()=>pb_push(btn[1]));
    el_btn.addEventListener('mouseup',()=>pb_up(btn[1]));
})
}

function pb_push(dev){
    //alert(dev=="x5");
    if(dev == "x5"){
        alldevice['y'].set(2,true);
    }
    else if(dev == "x6"){
        alldevice['y'].set(2,false);
    }
    else if(dev == "x7"){
        alldevice['y'].set(3,true);
    }
    else if(dev == "x8"){
        alldevice['y'].set(3,false);
    }
}

function pb_up(dev){
    
}

function get_canvas(canvas_id){
    let cn_can = canvas_id.map(function(value){
    let el = document.getElementById(value);
        return [el,el.getContext("2d")];
    })
    return cn_can;
}

function str_dev(str){
    return {
        'header' : str.slice(0,1),
        'index' : parseInt(str.slice(1),10)
    };
}

function lanp_con(lanp_info){
    device = str_dev(lanp_info[1]);
    if(alldevice[device['header']].get(device['index'])){
        lanp_info[0].style.backgroundColor = "red";
    }
    else{
        lanp_info[0].style.backgroundColor = 'rgba(0,0,0,0)';
    }
}

//******************************//
//main
//Variable declaration
const x = new BitArray(8000);
const y = new BitArray(8000);

let alldevice = {
    "x":x,
    "y":y
};

const ls_dev = {
"ls1":"x0",
"ls2":"x1",
"ls3":"x2",
"ls4":"x3",
"ls5":"x4"}

const btn_id = [
["pb1","x5"],
["pb2","x6"],
["pb3","x7"],
["pb4","x8"]];

const lanp_id = [
[document.getElementById("pl1"),"y2"],
[document.getElementById("pl2"),"y3"],
[document.getElementById("pl3"),"y4"],
[document.getElementById("pl4"),"y5"]];

const workW = 190;
const workH = 100;
const conv = ["conveyor1"];
const con_info = get_canvas(conv);
const start_workX = con_info[0][0].width - workW/2;
const start_workY = con_info[0][0].height/2;
const canv = new conveyor(con_info[0],190,95);
canv.write_work(start_workX,start_workY);

//Initial process
settingid(btn_id);
//Gameloop
requestAnimationFrame(gameloop);
function gameloop(){
    //Fill in the process
    lanp_con(lanp_id[0]);
    if(alldevice['y'].get(2) && !(alldevice['y'].get(3))){
        canv.move_left(alldevice,ls_dev);
    }
    else if(!(alldevice['y'].get(2)) && alldevice['y'].get(3)){
        canv.move_right(alldevice,ls_dev);
    }
    requestAnimationFrame(gameloop);
}
