/**
 * Linkit 7688 範例
 * 使用 GPIO 控制 8x8 LED Matrix (共陽)
 * 
 * @author Abola Lee 
 * @version 1.0
 * @since 2016-01-10
 * 
 * @link http://www.gibar.co/2016/01/7688-8x8-led-matrix.html
 */
var mraa = require('mraa');

// 腳位命名參考
//  
//    
//    \Col 1   2   3   4   5   6   7   8
//Row  \ _13__03__04__10__06__11__15__16_  (針腳)
// 1  09|                               |
// 2  14|                               |
// 3  08|                               |
// 4  12|              8x8              |
// 5  01|           LED Matrix          |
// 6  07|                               |
// 7  02|                               |
// 8  05|_______________________________|
//   (針腳)


// 設定GPIO 接腳
var col = [
      new mraa.Gpio(2)
      , new mraa.Gpio(16)
      , new mraa.Gpio(17)
      , new mraa.Gpio(44)
      , new mraa.Gpio(5)
      , new mraa.Gpio(46)
      , new mraa.Gpio(0)
      , new mraa.Gpio(1) 
    ],
    row = [
      new mraa.Gpio(37)
      , new mraa.Gpio(3)
      , new mraa.Gpio(13)
      , new mraa.Gpio(45)
      , new mraa.Gpio(14)
      , new mraa.Gpio(12)
      , new mraa.Gpio(15)
      , new mraa.Gpio(4)      
    ];
    
// 預設全亮測試
for(var idx=0; idx<8; idx++) col[idx].dir(mraa.DIR_OUT_HIGH);
for(var idx=0; idx<8; idx++) row[idx].dir(mraa.DIR_OUT_LOW);


// 逐row關燈
var offIndex=0;
var offRow = setInterval(function(){
  if( offIndex<8 ) {
    row[offIndex].write(1);
    offIndex++;
  }
  if( offIndex >= 8 ) {
    reset();
    clearInterval(offRow);
  }
},250);

// 逐column 開燈
var onIndex = 7;
var onColumn = setInterval(function(){
  if (resetFlag == true) {}
  else if( offIndex>=8 && onIndex>=0) {
    col[onIndex].write(1);
    onIndex--;
  }
  else if ( onIndex < 0){
    reset();
    clearInterval(onColumn);
  }
},250);

var resetFlag=false;
/**
 * 回復全暗
 */
function reset(){
  resetFlag = true; // 
  for(var idx=0; idx<8; idx++) col[idx].write(0);
  for(var idx=0; idx<8; idx++) row[idx].write(0);
  resetFlag=false;
}
