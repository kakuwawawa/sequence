
const btn_id = [
["pb1","x5"],
["pb2","x6"],
["pb3","x7"],
["pb4","x8"]
];
btn_id.foreach(btn=>{
    document.getElementById(btn[0])
    .addEventListener('click',push(btn[1]));
})
function push(dev){
    alert(dev);
}


let cnv_conv = "conveyor1";
//Get canvas object data
let conv = document.getElementById(cnv_conv);
let con = conv.getContext("2d");//Get canvas context

//background-color: green;
con.fillStyle = "#060";
con.beginPath();
con.moveTo(0,0);
con.lineTo(conv.width,0);
con.lineTo(conv.width,conv.height);
con.lineTo(0,conv.height);
con.fill();
//draw_wark(con,conv.width,conv.height);

//function draw_wark(con,width,height){
    let width = conv.width;
    let height = conv.height;
    con.storkeStyle = "#999";
    con.fillStyle = "#aaa";
    let len_wi = 150;
    con.beginPath();
    con.moveTo(width,height);
    con.lineTo(width,0);
    con.lineTo(width - len_wi,0);
    con.lineTo(width - len_wi,height);
    con.fill();
//}
