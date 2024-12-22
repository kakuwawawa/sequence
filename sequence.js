var cnv_conv = "conveyor1";
//Get canvas object data
var conv = document.getElementById(cnv_conv);
var con = conv.getContext("2d");//Get canvas context

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
    var width = conv.width;
    var height = conv.height;
    con.storkeStyle = "#999";
    con.fillStyle = "#aaa";
    var len_wi = 150;
    con.beginPath();
    con.moveTo(width,height);
    con.lineTo(width,0);
    con.lineTo(width - len_wi,0);
    con.lineTo(width - len_wi,height);
    con.fill();
//}
