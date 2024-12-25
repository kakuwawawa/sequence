//User's function area

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

function settingid(btn_id){
btn_id.forEach(btn=>{
    document.getElementById(btn[0])
    .addEventListener('click',()=>pb_push(btn[1]));
})
}

function pb_push(dev){
    alert(dev=="x5");
    if(dev == "x5"){
        alldevice['y'].set(2,true);
    }
}

function get_canvas(canvas_id){
    let cn_can = canvas_id.map(function(value){
    let el = document.getElementById(value);
        return [el,el.getContext("2d")];
    })
    return cn_can;
}

function canvas_initial(can_info){
    const conv = can_info[0];
    const con = can_info[1];
    let width = conv.width;
    let height = conv.height;
    let len_wi = 150;
    //background-color: green;
    con.fillStyle = "#060";
    con.beginPath();
    con.moveTo(0,0);
    con.lineTo(width,0);
    con.lineTo(width,height);
    con.lineTo(0,height);
    con.fill();
    //Draw wark
    con.strokeStyle = "#999";
    con.fillStyle = "#aaa";
    con.beginPath();
    con.moveTo(width,height);
    con.lineTo(width,0);
    con.lineTo(width - len_wi,0);
    con.lineTo(width - len_wi,height);
    con.fill();
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

const conveyor = [
"conveyor1"];

const con_info = get_canvas(conveyor);

//Initial process
settingid(btn_id);
canvas_initial(con_info[0]);
//Gameloop
function gameloop(){
    //Fill in the process
    lanp_con(lanp_id[0]);
    requestAnimationFrame(gameloop);
}
