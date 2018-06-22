import * as constant from "./constant.js";

let tfModel; // TensorFlow.js モデルロード時の戻り値 (Promise)

/**********************************************************************
 *
 * predictCanvas()
 *
 * @param  string canvas html tag id
 * @return promise resolve: 予測結果 Top K [{className: "string", probability: float}, ...]
 *                 reject: エラーメッセージ
 * @comments
 *    MobileNet_v1 モデルを使用して、canvas に表示された画像の
 *    予測結果 Top K 個を返す
 *
 *********************************************************************/
export const predictCanvas = async (canvasId) => {

  let errMsg;

  try {

    // tf.loadModel( path )
    // @param string 標準的な TensorFlow.js 形式モデルを記載した JSON 設定ファイルへの PATH
    // @return Promise
    // @comments モデルをロードする
    tfModel = await tf.loadModel(constant.mnModelPath);

    // canvas の画像を予測する
    const canvasDom = document.getElementById(canvasId);
    const predictedTensor = await predictImg(canvasDom);

    // 予測結果 Top K 抽出
    const topKClasses = await getTopKClasses(predictedTensor, constant.topKPredictions);

    return topKClasses; // return promise (resolve)

  } catch(e) {
    errMsg = "";
    errMsg = errMsg + constant.errMsgPredictCanvas;
    errMsg = errMsg + " (" + e.message + ")";

    throw new Error(errMsg); // return promise (reject)

  }

}

/**********************************************************************
 *
 * predictImg()
 *
 * @param  DOM canvas 要素
 * @return promise resolve: 予測結果(確率)テンソル。形状 [1, 1000]
 *                 reject: エラーメッセージ
 * @comments
 *    MobileNet_v1 モデルを使用して、canvas に表示された画像の
 *    予測結果(確率)を返す
 *
 *********************************************************************/
async function predictImg(imgElement){

  let errMsg;

  try {

    // 引数の関数を実行し、実行後は return されるテンソル以外の中間テンソルを
    // すべて削除する。
    //
    // tf.tidy( fn )
    //   @param function 実行関数
    //   @return tf.Tensor テンソル
    const predictedTensor = tf.tidy( ()=>{
  
      // canvas 画像の 3 次元テンソルを返す。テンソルの形状は [224, 224, 3]
      // [height, width, channels]
      //
      // tf.fromPixels( canvasElement )
      //   @param DOM canvas 要素
      //   @return tf.Tensor3D
      const canvasTensor = tf.fromPixels(imgElement).toFloat();
      // canvasTensor.print(true); // for debug
  
      // 引数で指定されたスカラー値を rank-0 tf.Tensor に変換する。
      // 次の正規化のための前処理。
      //
      // tf.scalar( value )
      //   @param number スカラー値
      //   @return tf.Scalar
      const offsetTensor = tf.scalar(127.5);
  
      // canvas 画像のテンソルは 0～255 の値を取るが、-1～1 の値に正規化する
      //
      // a.sub( b ): a - b (減算)
      // a.div( b ): a / b (除算)
      const normalizedCanvasTensor = canvasTensor.sub(offsetTensor).div(offsetTensor);
      // normalizedCanvasTensor.print(true); // for debug
  
      // canvas 画像テンソルの形状を 3 次元から 4 次元に変換する
      // テンソルの形状は [224, 224, 3] から [1, 224, 224, 3] に変換される
      // [batch_size, height, width, channels]
      //
      // tf.reshape( newShape )
      //   @param number[] 形状変換後のテンソルを定義する整数の配列
      //   @return tf.Tensor
      const batchedCanvasTensor = normalizedCanvasTensor.reshape(
                        [1, constant.imgHeight, constant.imgWidth, 3]
                      );
      // batchedCanvasTensor.print(true); // for debug
  
      // モデルのロード完了後、入力テンソルの予測実施
      //
      // tf.Model.predict( canvasTensor )
      // @param tf.Tensor 入力データ(テンソル: [1, 224, 224, 3])
      // @return tf.Tensor 入力データの予測結果(テンソル: [1, 1000])
      const predictedCanvasTensor =  tfModel.predict(batchedCanvasTensor);
      // predictedCanvasTensor.print(true); // for debug
  
      return predictedCanvasTensor;
  
    });
  
    return predictedTensor; // return promise (resolve)

  } catch(e) {
    errMsg = "";
    errMsg = errMsg + constant.errMsgPredictCanvas;
    errMsg = errMsg + " (" + e.message + ")";

    throw new Error(errMsg); // return promise (reject)

  }

}

/**********************************************************************
 *
 * getTopKClasses()
 *
 * @param tf.Tensor 予測結果(確率)テンソル。形状 [1, 1000]
 * @param number 予測結果から Top K を抜き出すための K 値
 * @return promise resolve: 予測結果 Top K [{className: "string", probability: float}, ...]
 *                 reject: エラーメッセージ
 * @comments
 *    MobileNet モデルを使用して、canvas に表示された画像の
 *    予測結果(確率)を返す
 *
 *********************************************************************/
async function getTopKClasses(predictedTensor, topK){

  let errMsg;

  try {

    // 予測結果を確率で降順ソート
    const values = await predictedTensor.data();
    const valuesAndIndices = [];
    for(let i = 0; i < values.length; i++){
      valuesAndIndices.push({value: values[i], index: i});
    }
  
    valuesAndIndices.sort((a, b) => { // 降順ソート
      return b.value - a.value;
    });
  
    // Top K 出力結果生成 [{className: "string", probability: float}, ...]
    const topkValues = new Float32Array(topK);
    const topkIndices = new Int32Array(topK);
    for(let i = 0; i < topK; i++){
      topkValues[i] = valuesAndIndices[i].value;
      topkIndices[i] = valuesAndIndices[i].index;
    }
  
    const topClassesAndProbs = [];
    for(let i = 0; i < topkIndices.length; i++){
      topClassesAndProbs.push({
        [constant.keyClassName]: IMAGENET_CLASSES[topkIndices[i]],
        [constant.keyProbability]: topkValues[i]
      });
    }
  
    return topClassesAndProbs; // return promise (resolve)

  } catch(e) {
    errMsg = "";
    errMsg = errMsg + constant.errMsgPredictCanvas;
    errMsg = errMsg + " (" + e.message + ")";

    throw new Error(errMsg); // return promise (reject)

  }

}
