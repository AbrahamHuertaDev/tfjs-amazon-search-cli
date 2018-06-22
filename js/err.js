import * as constant from "./constant.js";

/**********************************************************************
 *
 * renderError()
 *
 * @param  string エラータイトル
 * @param  string エラーメッセージ
 * @return none
 *
 * @comments
 *    エラー表示エリアにエラー内容を表示する。
 * 
 *********************************************************************/
export function renderError( eTitle, eMsg ){
  let eHtml = "";

  eHtml = eHtml + "<strong>" + eTitle + "</strong><br />";
  eHtml = eHtml + "<br />";
  eHtml = eHtml + eMsg;

  $("#" + constant.errorId).html( eHtml );

}
