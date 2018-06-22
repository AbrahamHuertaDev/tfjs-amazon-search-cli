import * as constant from "./constant.js";
import * as err from "./err.js";

/**********************************************************************
 *
 * startCamera()
 *
 * @param  string カメラ html tag id
 * @param  string 予測出力表示部 html tag id
 * @return none
 *
 * @comments
 *    スマートデバイス(iPhone|iPad|iPod|Android)はリアカメラ、
 *    その他のデバイスはフロントカメラを起動する。
 * 
 *********************************************************************/
export function startCamera(cameraId, outputId){

  let errMsg;
  let constraints = {};

  // navigator.mediaDevices.getUserMedia() をサポートしている場合
  if(navigator.mediaDevices.getUserMedia){

    let ua = navigator.userAgent;
    if(ua.match(/iPhone|iPad|iPod|Android/)){ // スマートデバイス
      constraints = {
        audio: false,
        video: {facingMode: {exact: "environment"}} // リアカメラ
      };
    }else{
      constraints = {
        audio: false,
        video: {facingMode: "user"} // フロントカメラ
      };
    }

    navigator.mediaDevices.getUserMedia(constraints)
    .then(
      function(stream){
        document.getElementById(cameraId).srcObject = stream;
      }
    )
    .catch(
      function(e){
        // エラー表示
        err.renderError(e.name, e.message);

        // 「探検する」ボタン無効化
        $("#" + constant.sbuttonId).off("click");
      }
    );

  }else{
    // エラー表示
    err.renderError(constant.errTitle, constant.errMsgNoSupportCamera);

    // 「探検する」ボタン無効化
    $("#" + constant.sbuttonId).off("click");
  }

}

/**********************************************************************
 *
 * setFocus()
 *
 * @param  string カメラ html tag id
 * @param  string フォーカス html tag id
 * @param  string フォーカス中心マーク html tag id
 * @param  int  フォーカス左上の表示位置 X 座標オフセット
 * @param  int  フォーカス左上の表示位置 Y 座標オフセット
 * @return none
 *
 * @comments
 *    カメラにフォーカスを表示する。
 * 
 *********************************************************************/
export function setFocus(cameraId, focusId, focusCenterId, offsetX, offsetY){

  // カメラの位置(座標)取得
  let offsetPos = $("#" + cameraId).offset();
  let cameraX = offsetPos.left;
  let cameraY = offsetPos.top;

  // フォーカスの表示位置(座標)決定
  $("#" + focusId).offset({top: cameraY + offsetY, left: cameraX + offsetX});
  $("#" + focusId).css("display", "table");
  $("#" + focusCenterId).css("display", "table-cell");

}

/**********************************************************************
 *
 * drawCanvas()
 *
 * @param  string カメラ html tag id
 * @param  string canvas html tag id
 * @return promise
 *
 * @comments
 *    カメラに表示された画像を canvas に描画する。
 * 
 *********************************************************************/
export async function drawCanvas(cameraId, canvasId){

  let errMsg;
  let cameraEle = document.getElementById(cameraId);
  let canvasEle = document.getElementById(canvasId);

  let ctx = canvasEle.getContext("2d"); // canvas context オブジェクト

  try {
    canvasEle.width = constant.imgWidth;
    canvasEle.height = constant.imgHeight;

    let x = (cameraEle.offsetWidth - canvasEle.width) / 2;
    let y = (cameraEle.offsetHeight - canvasEle.height) / 2;

    // drawImage() は <img>, <canvas>, <video> 要素のいずれかを引数に指定して描画できる
    ctx.drawImage(cameraEle, -x, -y, cameraEle.offsetWidth, cameraEle.offsetHeight); 
    let imgData = ctx.getImageData(0, 0, canvasEle.width,  canvasEle.height);
    ctx.putImageData(imgData, 0, 0); // canvas 描画

    return; // return promise (resolve)

  } catch(e) {
    errMsg = "";
    errMsg = errMsg + constant.errMsgNoCapture;
    errMsg = errMsg + " (" + e.message + ")";

    throw new Error(errMsg); // return promise (reject)

  }

}
