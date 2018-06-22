import * as constant from "./constant.js";
import * as err from "./err.js";
import * as camera from "./camera.js";
import * as infer from "./infer.js";
import * as amazon from "./amazon.js";

// カメラ表示
camera.startCamera(constant.cameraId, constant.outputId);

// フォーカス表示
camera.setFocus(constant.cameraId, constant.focusId, constant.focusCenterId, constant.focusOffsetX, constant.focusOffsetY);

// リサイズイベントリスナー起動 (リサイズ時はフォーカス再表示)
$(window).on(
  "resize",
  function(){
    camera.setFocus(constant.cameraId, constant.focusId, constant.focusCenterId, constant.focusOffsetX, constant.focusOffsetY);
  }
);

// 「探検する」クリックイベントリスナー起動
$("#" + constant.sbuttonId).on(
  "click",
  function(){
    exploreAmazon();
  }
);

/**********************************************************************
 * Amazon 探検
 *********************************************************************/
// 「探検する」実行処理
function exploreAmazon(){

  // 探検中アニメ表示
  amazon.showExploring();

  // canvas 描画  t
  camera.drawCanvas(constant.cameraId, constant.canvasId)
  .then(()=>{
    // canvas 画像予測
    return infer.predictCanvas( constant.canvasId );
  })
  .then((response)=>{
    // Amazon 探検
    return amazon.searchAmazon( response );
  })
  .then((response)=>{
    // 検索結果がある時はスライド開始
    if( response != 0 ){
      amazon.startSlide();
    }

    // smooth scroll to outputId
    $("html, body").animate(
      { scrollTop: $("#" + constant.outputId).offset().top },
      1000
    );

    // 探検中アニメ非表示
    amazon.hideExploring();
  })
  .catch((e)=>{
    // 探検中アニメ非表示
    amazon.hideExploring();

    // エラー表示
    err.renderError(e.name, e.message);

  });

}
