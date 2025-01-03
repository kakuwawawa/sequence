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
        this.edge = {
            "left":false,
            "right":true
        };
        this.speed = 5;
        this.boltMany = 4;
        this.bolt = new BitArray(this.boltMany);
        for (let i=0;i<this.boltMany;i++){
            this.bolt.set(i,true);
        }
        this.boltLs = {
        "left":{
                3:"ls5",
                2:"ls4",
                1:"ls3",
                0:"ls2"},
        "right":{
                0:"ls1"}};
        //background-color: green;
        this.con.fillStyle = "#060";
        this.con.fillRect(0,0,this.canW,this.canH);
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
        [x , work_down - radius] , 
        [x , work_down - radius * 3],
        [x , work_down - radius * 5],
        [x , work_down - radius * 7]
        ];
        if(typeof this.setImg != 'undefined'){
            this.con.putImageData(this.setImg,this.imgX,this.imgY);
        }
        this.setImg = this.con.getImageData(work_left,work_up,this.workW * 2,this.workH * 2);
        this.imgX = work_left;
        this.imgY = work_up;
        this.con.fillStyle = "#aaa";
        this.con.fillRect(work_left,work_up,this.workW * 2,this.workH * 2);
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
            this.edge["left"] = true;
            this.edge["right"] = false;
        }
        else{
            this.write_work(this.workX -this.speed,this.workY);
            this.edge["left"] = false;
            this.edge["right"] = false;
        }
    }
    move_right(alldevice,ls_dev){
        if(this.workX + this.speed + this.workW > this.canW){
            this.edge["left"] = false;
            this.edge["right"] = true;
            }
        else{
            this.write_work(this.workX+this.speed,this.workY);
            this.edge["left"] = false;
            this.edge["right"] = false;
        }
    }
}

//************************//
//User's function declaration
function settingpb(alldevice,btn_id){
btn_id.forEach(btn=>{
    let el_btn = document.getElementById(btn[0]);
    el_btn.addEventListener('pointerdown',()=>pb_push(alldevice,btn[1]));
    el_btn.addEventListener('pointerup',()=>pb_up(alldevice,btn[1]));
})
}

function pb_push(alldevice,dev){
    let device = str_dev(dev);
    alldevice[device["header"]].set(device["index"],true);
}

function pb_up(alldevice,dev){
    let device = str_dev(dev);
    alldevice[device["header"]].set(device["index"],false);
}

function settingbolt(cnvObj,bolt_id,ls_dev){
bolt_id.forEach(bolt=>{
    let el_bolt = document.getElementById(bolt[0]);
    el_bolt.addEventListener('click',()=>bolt_mode(cnvObj,bolt[1],ls_dev));
})
}

function bolt_mode(cnvObj,boltNo,ls_dev){
    let boltTF = !(cnvObj.bolt.get(boltNo));
    cnvObj.bolt.set(boltNo,boltTF);
    cnvObj.write_work(cnvObj.workX,cnvObj.workY);
    
    /*let l_dev_name = ls_dev[cnvObj.boltLs["left"][boltNo]];
    let l_device = str_dev(l_dev_name);
    alldevice[l_device["header"]].set(l_device["index"],boltTF);
    let r_dev_name = ls_dev[cnvObj.boltLs["right"][boltNo]];
    let r_device = str_dev(r_dev_name);
    alldevice[r_device["header"]].set(r_device["index"],boltTF);*/
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
    lanp_info.forEach(lanp_data =>{
        device = str_dev(lanp_data[1]);
        if(alldevice[device['header']].get(device['index'])){
            lanp_data[0].style.backgroundColor = "red";
        }
        else{
            lanp_data[0].style.backgroundColor = 'rgba(0,0,0,0)';
        }
    })
}

function ls_con(convObj,alldevice,ls_dev){
        for(let i=0;i<convObj.boltMany;i++){
            let l_lsValue = false;
            let l_dev_name = ls_dev[convObj.boltLs["left"][i]];
            let l_device = str_dev(l_dev_name);
            if(convObj.bolt.get(i) && convObj.edge["left"]){
                l_lsValue = true;
            }
            alldevice[l_device["header"]].set(l_device["index"],l_lsValue);
        }
        for(let i=0;i<1;i++){
            let r_lsValue = false;
            let r_dev_name = ls_dev[convObj.boltLs["right"][i]];
            let r_device = str_dev(r_dev_name);
            if(convObj.bolt.get(i) && convObj.edge['right']){
                r_lsValue = true;
            }
            alldevice[r_device["header"]].set(r_device["index"],r_lsValue);
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

const bolt_id = [
["bolt1",3],
["bolt2",2],
["bolt3",1],
["bolt4",0]];

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

//Initial process
const canv = new conveyor(con_info[0],workW,workH);
canv.write_work(start_workX,start_workY);
settingpb(alldevice,btn_id);
settingbolt(canv,bolt_id,ls_dev);
//Gameloop
requestAnimationFrame(gameloop);
function gameloop(){
    //Fill in the process
    if(alldevice['y'].get(0) && !(alldevice['y'].get(1))){
        canv.move_left(alldevice,ls_dev);
    }
    else if(!(alldevice['y'].get(1)) && alldevice['y'].get(0)){
        canv.move_right(alldevice,ls_dev);
    }
    lanp_con(lanp_id);
    ls_con(canv,alldevice,ls_dev);
    requestAnimationFrame(gameloop);
}
