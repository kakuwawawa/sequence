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

/*ladder element data*/
class led{
    constructor(){
        this.device = "";
        this.comment = "";
        this.aidText = "";
        this.mode = 0;
    }
    setDevice(data){
        this.device = data;
    }
    setComment(data){
        this.comment = data;
    }
    /*The mode data is a dict.
     and the keys are "barup","swich","not","up","down".
     and keys value is "set" or "reset" or "reverse".*/
    setMode(data){
        this.modeBitOpe(data["barup"],1);
        this.modeBitOpe(data["swich"],2);
        this.modeBitOpe(data["not"],3);
        this.modeBitOpe(data["up"],4);
        this.modeBitOpe(data["down"],5);
    }
    modeBitOpe(mode,bit){
        if(mode){
            switch (mode){
                case "set":
                this.mode |= (1 << (bit-1));
                break;
                case "reset":
                this.mode &= ~(1 << (bit-1));
                break;
                case "reverse":
                this.mode ^= (1 << (bit-1));
                break;
            }
        }
    }
}
//************************//
//User's function declaration
function appendRow(rowLength){
    let ledArray = [];
    for(let i=0; i<rowLength; i++){
        ledArray.push(new led());
    }
    return ledArray;
}

function writeLed(htmlElm,ledMap){
    let htmlValue = "";
    ledMap.forEach((ledArray)=>{
        htmlValue += "<tr>";
        ledArray.forEach((led)=>{
            htmlValue += "<td>";
            if(led.mode & 0b1){
                //barup
                htmlValue += "<img src='ladder_barup.png'>";
            }
            else if(led.mode & 0b10){
                //swich
                htmlValue += "<img src='ladder_sw.png'>";
                if(led.mode & 0b100){
                    //not
                    htmlValue += "<img src='ladder_not.png'>";
                }
                if(led.mode & 0b1000){
                    //up
                    htmlValue += "<img src='ladder_up.png'>";
                }
                else if(led.mode & 0b10000){
                    //down
                    htmlValue += "<img src='ladder_down.png'>";
                }
            }
            else{
                //bar
                htmlValue += "<img src='ladder_bar.png'>";
            }
            htmlValue += "</td>";
        })
        htmlValue += "</tr>";
    })
    alert(htmlValue);
    htmlElm.insertAdjacentHTML("beforeend",htmlValue);
}
//************************//
//Main
//Variable declaration
let filed = [];
let rowLength = 9;
let htmlFiled = document.getElementById("filed");
//filed.splice(row,delete,element1,element2)
filed.push(appendRow(rowLength));
//Initial process
writeLed(htmlFiled,filed);
//Gameloop
requestAnimationFrame(gameloop);
function gameloop(){
    //Fill in the pricess
    
    requestAnimationFrame(gameloop);
}