// original web api for searching amazon
//    API の応答データ(Amazon 検索結果)は下記 JSON 形式
//    [{ "title": "titleName",
//       "image": "imagePath",
//       "url": "detailPageUrl",
//       "new_price": "newPrice",
//       "used_price": "usedPrice" }, ... ]
export const amazonApi = "";

// html
export const cameraId = "camera"; // カメラ
export const focusId = "focus"; // フォーカス
export const focusCenterId = "focus-center"; // フォーカス中心マーク
export const sbuttonId = "sbutton"; // 探検するボタン
export const searchId = "search"; // 探検するボタンテキスト
export const searchingId = "searching"; // 探検するボタン探検中アニメーション
export const canvasId = "canvas"; // canvas
export const errorId = "error"; // エラー表示
export const outputId = "output"; // 予測出力表示
export const sliderClass = "item_slider";
export const focusOffsetX = 68; // カメラからのフォーカス X 軸オフセット
export const focusOffsetY = 68; // カメラからのフォーカス Y 軸オフセット

// prediction
export const imgWidth = 224;
export const imgHeight = 224;
export const mnModelPath = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
export const topKPredictions = 3;
export const keyClassName = "className"; // 予測結果: 分類キー
export const keyProbability = "probability"; // 予測結果: 確率キー

// error
export const errTitle = "ERROR";
export const errMsgNoSupportCamera = "この OS・ブラウザはカメラ機能をサポートしていません。";
export const errMsgNoCapture = "カメラの画像を取得できません。";
export const errMsgPredictCanvas = "画像の推測に失敗しました。";
export const errMsgSearchAmazon = "Amazon の検索に失敗しました。";
export const errMsgNoResult = "検索結果は存在しないか、API の制限により Amazon に接続できませんでした。";
