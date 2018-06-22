import * as constant from "./constant.js";

/**********************************************************************
 *
 * searchAmazon()
 *
 * @param  array 予測結果 Top K [{className: "string", probability: float}, ...]
 * @return promise resolve: JSON 形式の Amazon 検索結果
 *                 reject: エラーメッセージ
 *
 * @comments
 *    Top K 予測結果について Amazon 検索を行う。
 *
 *********************************************************************/
export async function searchAmazon(topKClasses) {

  let errMsg;

  try {

    let searchKeywords;
    let pctProbability;
    let postData;
    let resultItem = [];
    let existResultCnt = 0;

    $("#" + constant.outputId).html("");

    for( let i = 0; i < topKClasses.length; i++ ){

      searchKeywords = topKClasses[i][constant.keyClassName].replace(/,/g, " |");
      pctProbability = ( topKClasses[i][constant.keyProbability] * 100 ).toFixed(3) + " %";

      postData = {
        "keywords": searchKeywords
      };
      await $.ajax(
        {
          type: "POST",
          url: constant.amazonApi,
          dataType: "json",
          data: JSON.stringify(postData)
        }
      ).done(
        function (responseData) {

          // responseData は JSON 形式の Amazon 検索結果を含む配列
          // [{ "title": "titleName",
          //    "image": "imagePath",
          //    "url": "detailPageUrl",
          //    "new_price": "newPrice",
          //    "used_price": "usedPrice" }, ... ]
          resultItem = JSON.parse(responseData);

          // Amazon 検索結果の描画
          renderItem(resultItem, searchKeywords, pctProbability);

          // Amazon 検索結果有りの件数カウント (戻り値用)
          if(resultItem.length != 0){
            existResultCnt++;
          }

        }
      ).fail(
        function (responseData) {
          throw new Error();
        }
      );

    }

    return existResultCnt; // return promise (resolve)

  } catch(e) {
    errMsg = "";
    errMsg = errMsg + constant.errMsgSearchAmazon;
    errMsg = errMsg + " (" + e.message + ")";

    throw new Error(errMsg); // return promise (reject)

  }

}

/**********************************************************************
 *
 * renderItem()
 *
 * @param  array JSON 形式の Amazon 検索結果を含む配列
 * @param  string 検索キーワード
 * @param  string 予測確率
 * @return none
 *
 * @comments
 *    Amazon 検索結果を描画する。
 *
 *********************************************************************/
function renderItem(resultItem, searchKeywords, pctProbability){

  let sHtml = "";

  sHtml = sHtml + "<div class='item_wrapper'>";

  sHtml = sHtml + "<div class='item_predict_wrapper'>";
  sHtml = sHtml + "<div class='item_predict'>[検出物体]&nbsp;" + searchKeywords + "<br />";
  sHtml = sHtml + "（整合確率 " + pctProbability + "）"
  sHtml = sHtml + "</div>";
  sHtml = sHtml + "</div>";

  if(resultItem.length != 0){
    sHtml = sHtml + "<div class='item_slider'>";
    for(let i = 0; i < resultItem.length; i++){
      sHtml = sHtml + "  <div>";
      sHtml = sHtml + "    <a href='" + resultItem[i].url + "' target='_blank'><img src='" + resultItem[i].image + "' style='display: inline-block;' /></a>";
      sHtml = sHtml + "    <div class='item_title'><a href='" + resultItem[i].url + "' target='_blank'>" + resultItem[i].title + "</a></div>";
      sHtml = sHtml + "    <div class='item_price'>" + resultItem[i].new_price + "</div>";
      sHtml = sHtml + "  </div>";
    }
    sHtml = sHtml + "</div>"; // .item_slider
  }else{
    sHtml = sHtml + "<div>";
    sHtml = sHtml + constant.errMsgNoResult;
    sHtml = sHtml + "</div>";
  }

  sHtml = sHtml + "</div>"; // .item_wrapper

  $("#" + constant.outputId).append(sHtml);

}

/**********************************************************************
 *
 * startSlide()
 *
 * @param  none
 * @return none
 *
 * @comments
 *    描画された Amazon 検索結果のスライドショーを開始する。
 *
 *********************************************************************/
export function startSlide(){
  
  $(document).ready(
    function(){
      $("." + constant.sliderClass).slick({
        swipe: true,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: false,
        arrows: true
      });
    }
  );

}

/**********************************************************************
 *
 * showExploring() / hideExploring
 *
 * @param  none
 * @return none
 *
 * @comments
 *    showExploring(): 「探検する」ボタンを「探検中」にする。
 *    hideExploring(): 「探検中」から「探検する」に戻す。
 *
 *********************************************************************/
export function showExploring(){
  $("#" + constant.searchId).css("display", "none");
  $("#" + constant.searchingId).css("display", "block");
}
export function hideExploring(){
  $("#" + constant.searchId).css("display", "block");
  $("#" + constant.searchingId).css("display", "none");
}
