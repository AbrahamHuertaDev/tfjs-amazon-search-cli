/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

const IMAGENET_CLASSES = {
  0: 'テンチ, ティンカティンカ',
  1: '金魚, カリコフラメ金魚',
  2: 'ホオジロザメ, ホホジロザメ',
  3: 'イタチザメ',
  4: 'シュモクザメ, ハンマーヘッドシャーク',
  5: 'シビレエイ, ゴウシュウシビレエイ, ナンフィッシュ, ヤマトシビレエイ',
  6: 'アカエイ, 赤エイ',
  7: '雄鶏, 鶏, にわとり',
  8: '雌鶏, 鶏, にわとり',
  9: 'ダチョウ',
  10: 'アトリ, 獦子鳥',
  11: 'ゴシキヒワ',
  12: 'メキシコマシコ, ムネアカヒワ',
  13: 'ユキヒメドリ, ユキホオジロ',
  14: 'ルリノジコ',
  15: 'ヨーロッパコマドリ, コマツグミ',
  16: 'ヒヨドリ',
  17: 'アオカケス',
  18: 'カササギフエガラス',
  19: 'アメリカコガラ',
  20: 'メキシコカワガラス, カワガラス',
  21: 'トビ, トンビ',
  22: 'ハクトウワシ',
  23: 'ハゲワシ',
  24: 'カラフトフクロウ',
  25: 'ファイアサラマンダー, フランスファイアサラマンダー',
  26: 'スベイモリ',
  27: 'イモリ',
  28: 'サンショウウオ, 米国産サンショウウオ',
  29: 'メキシコサンショウウオ, マッドパピー',
  30: 'ウシガエル',
  31: 'アマガエル',
  32: 'オガエル',
  33: 'アカウミガメ',
  34: 'オサガメ',
  35: 'ドロガメ',
  36: 'テラピン, キスイガメ, ダイヤモンドテラピン',
  37: 'ハコガメ',
  38: 'バンデッド・ヤモリ',
  39: 'イグアナ',
  40: 'グリーンアノール',
  41: 'テグートカゲ',
  42: 'アガマ(トカゲ)',
  43: 'エリマキトカゲ',
  44: 'アリゲータートカゲ',
  45: 'アメリカドクトカゲ',
  46: 'ミドリカナヘビ',
  47: 'アフリカカメレオン',
  48: 'コモドドラゴン, コモドオオトカゲ ',
  49: 'ナイルワニ',
  50: 'アメリカアリゲーター',
  51: 'トリケラトプス',
  52: 'サンダースネーク, メクラヘビ',
  53: 'クビワヘビ',
  54: 'ホグノーズスネーク, パフアダー, ハナダカクサリヘビ',
  55: 'アオヘビ, ヨーロッパヤマカガシ',
  56: 'キングヘビ, キングスネイク',
  57: 'ガーターヘビ, ヨーロッパヤマカガシ',
  58: '水ヘビ, ミギワヘビ',
  59: 'ハナナガムチヘビ',
  60: 'ナイトスネーク',
  61: 'ボアコンストリクター',
  62: 'アフリカニシキヘビ',
  63: 'インドコブラ',
  64: 'ヒガシグリーンマンバ',
  65: 'ウミヘビ',
  66: 'サハラツノクサリヘビ, スナクサリヘビ, ハナダカクサリヘビ',
  67: 'ダイヤガラガラヘビ, ニシダイヤガラガラヘビ, ヒガシダイヤガラガラヘビ',
  68: 'サイドワインダー, ヨコバイガラガラヘビ',
  69: '三葉虫, トリロバイト',
  70: 'ザトウムシ, ガガンボ, 蚊とんぼ, メクラグモ, マザトウムシ',
  71: 'サソリ',
  72: 'キマダラコガネグモ',
  73: 'バーンスパイダー',
  74: 'コガネグモ, ニワオニグモ',
  75: 'クロゴケグモ',
  76: 'タランチュラ',
  77: 'コモリグモ',
  78: 'ダニ',
  79: 'ムカデ',
  80: 'クロライチョウ',
  81: 'ライチョウ',
  82: 'エリマキライチョウ, ヤマウズラ, イワシャコ',
  83: 'ソウゲンライチョウ',
  84: '孔雀, クジャク',
  85: 'ウズラ',
  86: 'ヤマウズラ',
  87: 'ヨウム',
  88: 'コンゴウインコ',
  89: 'キバタン, バタンインコ',
  90: 'ヒインコ',
  91: 'バンケン',
  92: 'ハチクイ',
  93: 'サイチョウ',
  94: 'ハチドリ',
  95: 'キリハシ',
  96: 'オオハシ',
  97: '雄カモ',
  98: 'ウミアイサ',
  99: 'ガチョウ',
  100: 'ブラックスワン, 黒鳥, コクチョウ',
  101: '大きい牙の生えた動物',
  102: 'ハリモグラ, アリクイ',
  103: 'カモノハシ',
  104: 'ワラビー, 小型カンガルー',
  105: 'コアラ',
  106: 'ウォンバット',
  107: 'クラゲ',
  108: 'イソギンチャク',
  109: 'ブレインサンゴ, 脳サンゴ',
  110: '扁形動物',
  111: '線形動物',
  112: 'ホラガイ, 巻貝',
  113: 'カタツムリ',
  114: 'ナメクジ',
  115: 'ウミウシ, 裸鰓類',
  116: '多板綱',
  117: 'オウムガイ',
  118: 'アメリカイチョウガニ',
  119: 'ヨーロッパイチョウガニ, イチョウガニ',
  120: 'シオマネキ',
  121: 'タラバガニ',
  122: 'アメリカンロブスター',
  123: 'イセエビ, 伊勢エビ, ザリガニ',
  124: 'ザリガニ',
  125: 'ヤドカリ',
  126: 'ワラジムシ, フナムシ, ダンゴムシ',
  127: 'シュバシコウ',
  128: 'ナベコウ',
  129: 'ヘラサギ',
  130: 'フラミンゴ',
  131: 'スミレサギ',
  132: 'ダイサギ',
  133: 'サンカノゴイ, ヨシゴイ',
  134: 'ツル, 鶴',
  135: 'ツルモドキ',
  136: 'ヨーロピアンセイケイ, セイケイ',
  137: 'アメリカオオバン, オウサマクイナ, バン',
  138: 'ノガン',
  139: 'キョウジョシギ',
  140: 'ハマシギ',
  141: 'アカアシシギ',
  142: 'オオハシシギ',
  143: 'ミヤコドリ',
  144: 'ペリカン',
  145: 'キングペンギン',
  146: 'アホウドリ',
  147: 'コククジラ, イトマキエイ, マンタ',
  148: 'シャチ, シーウルフ',
  149: 'ジュゴン',
  150: 'アシカ',
  151: 'チワワ',
  152: 'チン, 狆',
  153: 'マルチーズ',
  154: 'ペキニーズ',
  155: 'シーズー',
  156: 'キャバリア・キングチャールズ・スパニエル, キャバリア',
  157: 'パピヨン',
  158: 'イングリッシュ･トイ･テリア',
  159: 'ローデシアン・リッジバック',
  160: 'アフガン・ハウンド',
  161: 'バセット・ハウンド',
  162: 'ビーグル',
  163: 'ブラッド・ハウンド',
  164: 'ブルーティック・クーンハウンド',
  165: 'ブラック・アンド・タン・クーンハウンド',
  166: 'ツリーイング・ウォーカー・クーンハウンド, ウォーカー・フォックスハウンド',
  167: 'イングリッシュ・フォックスハウンド',
  168: 'レッドボーン・クーンハウンド',
  169: 'ボルゾイ',
  170: 'アイリッシュ・ウルフハウンド',
  171: 'イタリアン・グレイハウンド',
  172: 'ウィペット',
  173: 'イビザン・ハウンド',
  174: 'ノルウェジアン・エルクハウンド・グレー',
  175: 'オッターハウンド',
  176: 'サルーキ',
  177: 'スコティッシュ・ディアハウンド',
  178: 'ワイマラナー',
  179: 'スタッフォードシャー・ブル・テリア',
  180: 'アメリカン・スタッフォードシャー・テリア, アメリカン・ピット・ブル・テリア',
  181: 'ベドリントン・テリア',
  182: 'ボーダー・テリア',
  183: 'ケリー・ブルー・テリア',
  184: 'アイリッシュ・テリア',
  185: 'ノーフォーク・テリア',
  186: 'ノーリッチ・テリア',
  187: 'ヨークシャー・テリア',
  188: 'ワイアー・フォックス・テリア',
  189: 'レークランド・テリア',
  190: 'シーリハム・テリア',
  191: 'エアデール・テリア',
  192: 'ケアーン・テリア',
  193: 'オーストラリアン・テリア',
  194: 'ダンディ・ディンモント・テリア',
  195: 'ボストン・テリア',
  196: 'ミニチュア・シュナウザー',
  197: 'ジャイアント・シュナウザー',
  198: 'スタンダード・シュナウザー',
  199: 'スコティッシュ・テリア',
  200: 'チベタン・テリア',
  201: 'オーストラリアン・シルキー・テリア',
  202: 'ソフトコーテッド・ウィートン・テリア',
  203: 'ウエスト・ハイランド・ホワイト・テリア',
  204: 'ラサ・アプソ',
  205: 'フラットコーテッド・レトリバー',
  206: 'カーリーコーテッド・レトリバー',
  207: 'ゴールデン・レトリバー',
  208: 'ラブラドール・レトリバー',
  209: 'チェサピーク・ベイ・レトリバー',
  210: 'ジャーマン・ショートヘアード・ポインター',
  211: 'ショートヘアード・ハンガリアン・ビズラ',
  212: 'イングリッシュ・セッター',
  213: 'アイリッシュ・セッター, レッド・セッター',
  214: 'ゴードン・セッター',
  215: 'ブリタニー・スパニエル',
  216: 'クランバー・スパニエル',
  217: 'イングリッシュ・スプリンガー・スパニエル',
  218: 'ウェルシュ・スプリンガー・スパニエル',
  219: 'イングリッシュ・コッカー・スパニエル',
  220: 'サセックス・スパニエル',
  221: 'アイリッシュ・ウォーター・スパニエル',
  222: 'クーバース',
  223: 'スキッパーキ',
  224: 'ベルジアン・シェパード・ドッグ・グローネンダール, グローネンダール',
  225: 'ベルジアン・シェパード・ドッグ・マリノア, マリノア',
  226: 'ブリアード',
  227: 'オーストラリアン・ケルピー',
  228: 'コモンドール',
  229: 'オールド・イングリッシュ・シープドッグ, ボブテイル',
  230: 'シェットランド・シープドッグ, シェルティー',
  231: 'コリー, ラフ・コリー',
  232: 'ボーダー・コリー',
  233: 'ブービエ・デ・フランダース',
  234: 'ロットワイラー',
  235: 'ジャーマン・シェパード・ドッグ, シェパード',
  236: 'ドーベルマン',
  237: 'ミニチュア・ピンシャー, ミニピン',
  238: 'グレーター・スイス・マウンテン・ドッグ',
  239: 'バーニーズ・マウンテン・ドッグ',
  240: 'アッペンツェラー・キャトル・ドッグ',
  241: 'エントレブッハー・キャトル・ドッグ, エントレブッフ・キャトル・ドッグ',
  242: 'ボクサー犬, ボクサー',
  243: 'ブルマスティフi, ブル・マスティフ',
  244: 'チベタン・マスティフ, チベット犬',
  245: 'フレンチ・ブルドッグ',
  246: 'グレート・デーン, ジャーマン・マスティフ',
  247: 'セント・バーナード', 
  248: 'カナディアン・エスキモー・ドッグ, エスキモー犬, エスキモー・ドッグ, ハスキー犬',
  249: 'アラスカン・マラミュート',
  250: 'シベリアン・ハスキー',
  251: 'ダルメシアン',
  252: 'アーフェンピンシャー, アッフェンピンシャー, モンキー・テリア, ブラック・デビル',
  253: 'バセンジー, バセンジ',
  254: 'パグ, パグ犬',
  255: 'レオンベルガー',
  256: 'ニューファンドランド, ニューファンドランド犬',
  257: 'グレート・ピレニーズ',
  258: 'サモエド',
  259: 'ポメラニアン',
  260: 'チャウ・チャウ',
  261: 'キースホンド, ウルフ・スピッツ',
  262: 'ブリュッセル・グリフォン',
  263: 'ウェルシュ・コーギー・ペンブローク',
  264: 'ウェルシュ・コーギー・カーディガン',
  265: 'トイ・プードル',
  266: 'ミニチュア・プードル',
  267: 'スタンダード・プードル',
  268: 'メキシカン・ヘアレス・ドッグ',
  269: 'タイリクオオカミ',
  270: 'シロオオカミ, ホッキョクオオカミ',
  271: 'アカオオカミ, タテガミオオカミ, アメリカアカオオカミ',
  272: 'コヨーテ',
  273: 'ディンゴ',
  274: 'ドール, アカオオカミ',
  275: 'リカオン',
  276: 'ハイエナ',
  277: 'アカギツネ',
  278: 'キットギツネ',
  279: 'ホッキョクギツネ',
  280: 'ハイイロギツネ',
  281: 'タビー, トラネコ, トラ猫',
  282: 'トラネコ, トラ猫',
  283: 'ペルシャ猫',
  284: 'シャム猫, シャム',
  285: 'エジプシャンマウ',
  286: 'ピューマ, プーマ, ヒョウ, パンサー',
  287: 'オオヤマネコ, クーガー',
  288: 'ヒョウ',
  289: 'ユキヒョウ',
  290: 'ジャガー, パンサー, ジャガー',
  291: 'ライオン',
  292: 'トラ, 虎',
  293: 'チーター',
  294: 'ヒグマ',
  295: 'アメリカグマ, クロクマ',
  296: 'ホッキョクグマ, シロクマ',
  297: 'ナマケグマ',
  298: 'マングース',
  299: 'ミーアキャット',
  300: 'ハンミョウ',
  301: 'テントウムシ, てんとう虫',
  302: 'オサムシ, ゴミムシ',
  303: 'カミキリムシ',
  304: 'ハムシ',
  305: 'フンコロガシ, 糞虫',
  306: 'カブトムシ',
  307: 'ゾウムシ',
  308: 'ハエ, 蠅',
  309: '蜂',
  310: 'アリ, 蟻',
  311: 'バッタ',
  312: 'コオロギ',
  313: 'ナナフシ',
  314: 'ゴキブリ',
  315: 'カマキリ',
  316: 'セミ, 蝉',
  317: 'ヨコバイ',
  318: 'クサカゲロウ, ヒメカゲロウ',
  319: 'トンボ',
  320: 'ダンゾリー',
  321: 'イチモンジチョウ',
  322: 'ジャノメチョウ',
  323: 'オオカバマダラ',
  324: 'モンシロチョウ',
  325: 'ワタリオオキチョウ',
  326: 'シジミチョウ',
  327: 'ヒトデ',
  328: 'ウニ',
  329: 'ナマコ',
  330: 'アバラチアワタオウサギ, ワタオウサギ',
  331: 'ノウサギ, 野ウサギ',
  332: 'アンゴラウサギ',
  333: 'ハムスター',
  334: 'ヤマアラシ, ハリネズミ',
  335: 'キツネリス',
  336: 'マーモット',
  337: 'ビーバー',
  338: 'モルモット',
  339: '栗毛馬',
  340: 'ゼブラ, シマウマ',
  341: '豚, イノシシ, 猪',
  342: 'イノシシ, 猪',
  343: 'イボイノシシ',
  344: 'カバ', 
  345: '牛',
  346: '水牛',
  347: 'バイソン',
  348: '羊, ヒツジ',
  349: 'ビッグホーン, オオツノヒツジ',
  350: 'アイベックス, ヤギ, 山羊',
  351: 'ハーテビースト, シカレイヨウ, シカカモシカ',
  352: 'インパラ',
  353: 'ガゼル',
  354: 'ヒトコブラクダ, ラクダ',
  355: 'ラマ',
  356: 'イタチ',
  357: 'ミンク',
  358: 'ヨーロッパケナガイタチ, ケナガイタチ, シマスカンク',
  359: 'クロアシイタチ, フェレット',
  360: 'カワウソ',
  361: 'スカンク, イタチ',
  362: '狸, たぬき, タヌキ, アナグマ',
  363: 'アルマジロ',
  364: 'ナマケモノ, ノドジロミユビナマケモノ',
  365: 'オランウータン, ボルネオオランウータン',
  366: 'ゴリラ',
  367: 'チンパンジー',
  368: 'テナガザル, シロテテナガザル',
  369: 'フクロテナガザル',
  370: 'ウォルフグエノン',
  371: 'パタスモンキー',
  372: 'ヒヒ',
  373: 'マカク, ニホンザル',
  374: 'ハヌマンラングール',
  375: 'コロブス',
  376: 'テングザル',
  377: 'マーモセット',
  378: 'オマキザル, カコミスル, ノドジロオマキザル',
  379: 'ホエザル',
  380: 'ダスキーティティ',
  381: 'クモザル, ジェフロイクモザル',
  382: 'リスザル, コモンリスザル',
  383: 'マダガスカルキャット, キツネザル, ワオキツネザル',
  384: 'インドリ',
  385: 'インドゾウ, インド象, アジアゾウ, アジア象',
  386: 'アフリカゾウ, アフリカ象',
  387: 'レッサーパンダ, パンダ, ビントロング',
  388: 'ジャイアントパンダ, パンダ',
  389: 'バラクータ, ノーザンパイク',
  390: 'ウナギ',
  391: 'ギンザケ, コーホーサーモン, シルバーサーモン, アジ, 鯵',
  392: 'ロック･ビューティー',
  393: 'クマノミ',
  394: 'チョウザメ',
  395: 'ガーフィッシュ, ダツ, カジキ, ロングノーズガー',
  396: 'ミノカサゴ',
  397: 'フグ',
  398: 'そろばん',
  399: 'アバヤ',
  400: 'アカデミック・ガウン, アカデミック・ローブ, 裁判官のローブ',
  401: 'アコーディオン, ピアノ・アコーディオン',
  402: 'アコースティック・ギター',
  403: '航空母艦',
  404: '旅客機, 飛行機',
  405: '飛行船',
  406: '祭壇',
  407: '救急車',
  408: '水陸両用車',
  409: 'アナログ時計',
  410: '養蜂場',
  411: 'エプロン',
  412: '灰皿, ごみ箱',
  413: 'アサルトライフル, アサルト銃',
  414: 'バックパック, リュックサック',
  415: 'ベーカリー, パン屋',
  416: '平均台',
  417: '気球, 風船',
  418: 'ボールペン',
  419: 'バンドエイド, 絆創膏',
  420: 'バンジョー',
  421: '手すり',
  422: 'バーベル',
  423: '理髪店専用椅子',
  424: '理髪店',
  425: '納屋, 物置, 倉庫, 車庫',
  426: '気圧計',
  427: '酒樽, おけ',
  428: '手押し車, 一輪車, 小さい荷車',
  429: '野球',
  430: 'バスケットボール',
  431: '乳母車',
  432: 'ファゴット',
  433: '入浴キャップ, 水泳キャップ',
  434: 'バスタオル',
  435: 'バスタブ, 浴槽',
  436: 'ビーチワゴン, ステーションワゴン, ワゴン車, エステートカー',
  437: '標識, 灯台, 標識灯',
  438: 'ビーカー',
  439: '黒毛皮帽, 毛皮製高帽, とがった帽子',
  440: 'ビール瓶',
  441: 'ビールグラス, ビアグラス',
  442: 'ベルコート（鐘を守る小屋）',
  443: 'よだれ掛け',
  444: '二輪車, 自転車, タンデム自転車',
  445: 'ビキニ, ツーピース',
  446: 'バインダー, リングバインダー',
  447: '双眼鏡, オペラグラス',
  448: '巣箱, 小鳥小屋',
  449: 'ボートハウス, 船小屋',
  450: 'ボブスレー',
  451: 'ボロタイ, ポーラー・タイ',
  452: '縁なし帽, 顎の下で結ばれる帽子',
  453: '本棚',
  454: '書店',
  455: 'ボトルキャップ, 王冠',
  456: '弓',
  457: 'ボウタイ, 蝶ネクタイ',
  458: '金管楽器, 真鍮, 真鍮製の記念碑, 記念碑, 額',
  459: 'ブラジャー',
  460: '防波堤, 防砂堤, 桟橋',
  461: '胸当て, 胸部を保護する装甲鋼板',
  462: 'ほうき',
  463: 'バケツ, 手桶',
  464: 'バックル, 飾り留め金',
  465: '防弾ベスト',
  466: '新幹線',
  467: '肉屋, 精肉店',
  468: 'タクシー',
  469: '大鍋, 大釜',
  470: 'キャンドル, ろうそく',
  471: 'キャノン砲, 機関砲',
  472: 'カヌー',
  473: '缶切り',
  474: 'カーディガン',
  475: '車のミラー, カーミラー',
  476: '回転木馬, メリーゴーラウンド',
  477: '大工道具, ツールキット',
  478: 'カートン, ボール箱',
  479: '車輪',
  480: '現金自動預け払い機, 自動預金支払機, ATM',
  481: 'カセット',
  482: 'カセットプレーヤー',
  483: '城',
  484: 'いかだ',
  485: 'CDプレーヤー',
  486: 'チェロ',
  487: '携帯電話',
  488: 'チェーン, 鎖',
  489: '金網フェンス',
  490: '金属の輪でできた鎧',
  491: 'チェーンソー',
  492: 'たんす',
  493: '西洋だんす, 整理だんす',
  494: 'チャイム, ベル, ゴング',
  495: '陶磁器戸棚, 瀬戸物戸棚',
  496: 'クリスマスの靴下',
  497: '教会',
  498: '映画館, 絵画館',
  499: '肉切り包丁, おの, 斧, なた',
  500: '岩とれんができた住居',
  501: 'マント',
  502: '木靴, 下駄',
  503: 'カクテルシェーカー',
  504: 'コーヒーマグ',
  505: 'コーヒーポット',
  506: 'コイル, らせん, 渦巻',
  507: '合わせ錠, ダイヤル錠',
  508: 'コンピュータキーボード, キーボード, キーパッド',
  509: 'お菓子, お菓子屋',
  510: 'コンテナ船',
  511: 'コンバーチブル',
  512: '栓抜き',
  513: 'コルネット, ホルン, トランペット',
  514: 'カウボーイブーツ',
  515: 'カウボーイハット, テンガロンハット',
  516: 'ゆりかご, 小児用ベッド',
  517: 'クレーン',
  518: 'ヘルメット',
  519: '箱, かご',
  520: 'ベビーベッド',
  521: '電気調理鍋',
  522: 'クロケットボール',
  523: '松葉杖',
  524: '銅鎧, 胸当て',
  525: 'ダム, 堤防',
  526: '机',
  527: 'デスクトップコンピュータ',
  528: 'ダイヤル式電話',
  529: 'おむつ, ナプキン',
  530: 'デジタル時計',
  531: 'デジタル腕時計',
  532: 'ダイニングテーブル, テーブル',
  533: 'ふきん',
  534: '食器洗い機',
  535: 'ディスクブレーキ',
  536: 'ドック, ドッキング施設',
  537: '犬ぞり',
  538: 'ドーム, 半球',
  539: 'ドアマット, ウェルカムマット',
  540: '掘削機, 掘削装置',
  541: 'ドラム, 打楽器',
  542: 'ドラムスティック, 太鼓のばち',
  543: 'ダンベル',
  544: 'ダッチオーブン, オーブン',
  545: '扇風機, 電動ファン, 送風機',
  546: 'エレキギター',
  547: '蒸気機関車, 電気機関車',
  548: 'エンターテイメントセンター, オーディオセット',
  549: '封筒',
  550: 'エスプレッソメーカー',
  551: 'フェースパウダー, おしろい',
  552: '羽毛・毛皮襟巻き, ボア',
  553: 'ファイルキャビネット, 書類用戸棚',
  554: '消防艇',
  555: '消防車',
  556: '防火用スクリーン, ファイアーガード',
  557: '旗竿',
  558: 'フルート, 横笛',
  559: '折りたたみ椅子',
  560: 'フットボールヘルメット',
  561: 'フォークリフト',
  562: '泉, 噴水',
  563: '万年筆',
  564: '四柱式ベッド',
  565: '貨物車',
  566: 'フレンチホルン, ホルン',
  567: 'フライパン',
  568: '毛皮コート',
  569: '清掃車, ごみ収集車',
  570: 'ガスマスク, 防毒マスク, ガスヘルメット',
  571: 'ガソリンポンプ, 給油ポンプ',
  572: 'ゴブレット, ワイングラス',
  573: 'ゴーカート',
  574: 'ゴルフボール',
  575: 'ゴルフカート',
  576: 'ゴンドラ, つりかご',
  577: 'ゴング, どら',
  578: 'ガウン',
  579: 'グランドピアノ',
  580: '温室ハウス, 種苗場',
  581: 'グリル, ラジエーターグリル',
  582: '食料品店, 食品市場',
  583: 'ギロチン',
  584: 'ヘアクリップ, 髪留め',
  585: 'ヘアスプレー',
  586: 'ハーフトラック',
  587: 'ハンマー',
  588: '手さげかご',
  589: 'ヘアドライヤー',
  590: '携帯パソコン, 携帯情報端末',
  591: 'ハンカチ',
  592: 'ハードディスク',
  593: 'ハーモニカ, 口琴',
  594: 'ハープ',
  595: '刈り取り機',
  596: 'まさかり, 手斧',
  597: 'ホルスター, 拳銃用ケース',
  598: 'ホームシアター',
  599: 'ハチの巣',
  600: 'フック, かぎつめ',
  601: 'フープスカート, クリノリンスカート',
  602: '鉄棒',
  603: '馬車',
  604: '砂時計',
  605: 'iPod',
  606: 'アイロン, スムーシングアイロン',
  607: 'ジャックオーランタン',
  608: 'ジーンズ, ブルージーン, デニム',
  609: 'ジープ, ランドローバー',
  610: 'ジャージー, ティーシャツ',
  611: 'ジグソーパズル',
  612: '人力車',
  613: 'ジョイスティック',
  614: '着物',
  615: '膝あて',
  616: '結び目, ちょう結び',
  617: '実験服, 実験室用コート',
  618: 'ひしゃく, おたま',
  619: 'ランプシェード',
  620: 'ラップトップコンピュータ',
  621: '芝刈り機, 草刈り機',
  622: 'レンズキャップ, レンズカバー',
  623: 'レターオープナー, ペーパーナイフ',
  624: 'ライブラリ, 書庫',
  625: '救命艇, 救助艇',
  626: 'ライター, 点火装置',
  627: 'リムジン',
  628: '定期船, 巨船',
  629: '口紅',
  630: 'ローファー',
  631: 'ローション, 化粧水',
  632: '拡声器, スピーカー, スピーカーユニット, スピーカーシステム',
  633: 'ルーペ, ジュエリールーペ',
  634: '製材所',
  635: '磁気コンパス',
  636: '郵便カバン, 郵袋',
  637: 'メールボックス, レターボックス',
  638: 'レオタード, 女性用水着',
  639: 'レオタード, 女性用水着',
  640: 'マンホールカバー',
  641: 'マラカス',
  642: 'マリンバ, 木琴',
  643: 'マスク',
  644: 'マッチ棒',
  645: 'メイポール, 五月柱',
  646: '迷路',
  647: '計量カップ',
  648: '救急箱, 常備薬戸棚',
  649: '巨石, 巨石記念碑',
  650: 'マイク',
  651: '電子レンジ',
  652: '軍服',
  653: 'ミルク缶, 牛乳缶',
  654: 'ミニバス',
  655: 'ミニスカート',
  656: 'ミニバン',
  657: 'ミサイル',
  658: 'ミトン',
  659: '調理用ボウル',
  660: '移動住宅',
  661: 'モデルT',
  662: 'モデム',
  663: '修道院',
  664: 'モニター',
  665: '小型モーター付き自転車, 原動機付自転車',
  666: 'モルタル, しっくい',
  667: 'モルタルボード, こて板',
  668: 'モスク',
  669: '蚊帳',
  670: 'モータースクーター, スクーター',
  671: 'マウンテンバイク, オールテラインバイク(ATB), オフロードバイク',
  672: 'テント',
  673: 'マウス, コンピュータマウス',
  674: 'ネズミ捕り',
  675: '引越しトラック',
  676: '銃口',
  677: '爪',
  678: '頚椎装具',
  679: 'ネックレス',
  680: '乳首',
  681: 'ノートブックコンピュータ',
  682: 'オベリスク',
  683: 'オーボエ',
  684: 'オカリナ',
  685: 'オドメーター, 走行距離計',
  686: 'オイルフィルター',
  687: 'オルガン, パイプオルガン',
  688: 'オシロスコープ, スコープ, 陰極線オシロスコープ, CRO',
  689: 'オーバースカート',
  690: '牛車',
  691: '酸素マスク',
  692: 'パケット, 小包',
  693: 'パドル, ボートパドル',
  694: 'パドルホイール',
  695: '南京錠',
  696: '絵筆',
  697: 'パジャマ',
  698: '宮殿',
  699: 'パンパイプ, パンディーンパイプ',
  700: 'ペーパータオル',
  701: 'パラシュート',
  702: '平行棒',
  703: '公園のベンチ',
  704: 'パーキングメーター',
  705: '乗用車',
  706: 'パティオ, テラス',
  707: '公衆電話, 公衆電話ボックス',
  708: '土台, 台座, 足置き',
  709: '筆箱, 鉛筆ケース',
  710: '鉛筆削り',
  711: '香水',
  712: 'ペトリ皿, シャーレ',
  713: '複写機',
  714: 'ピック, 弦楽器用ピック',
  715: 'ピッケルハウベ, スパイク付きヘルメット',
  716: '杭柵, 杭',
  717: '軽トラック',
  718: '桟橋',
  719: '貯金箱',
  720: '薬瓶, 薬ボトル',
  721: '枕',
  722: '卓球ボール',
  723: '風車',
  724: '海賊, 海賊船',
  725: 'ピッチャー, 水差し',
  726: 'かんな',
  727: 'プラネタリウム',
  728: 'ビニール袋',
  729: '皿たて, 食器棚',
  730: 'すき, 鋤',
  731: 'プランジャー, ラバーカップ, スッポン',
  732: 'ポラロイドカメラ',
  733: 'ポール, 棒',
  734: '警察用バン, 警察用ワゴン, 警察用護送車',
  735: 'ポンチョ, レインコート',
  736: 'ビリヤードテーブル',
  737: 'サイダーボトル, ソーダボトル',
  738: '鉢, 植木鉢',
  739: 'ろくろ',
  740: '電動ドリル',
  741: 'お祈りに使う敷物',
  742: 'プリンタ',
  743: '刑務所',
  744: '弾丸, ミサイル',
  745: 'プロジェクター',
  746: 'ホッケーパック',
  747: 'パンチングバッグ, パンチングボール',
  748: '財布',
  749: '羽ペン',
  750: 'キルト, 掛け布団',
  751: 'レースカー, レーシングカー',
  752: 'ラケット',
  753: 'ラジエター',
  754: 'ラジオ, 無線装置',
  755: '電波望遠鏡, 電波反射器',
  756: 'レインバレル, 雨桶',
  757: 'レクリエーションビークル車, RV車',
  758: 'リール',
  759: 'レフ型カメラ',
  760: '冷蔵庫',
  761: 'リモコン',
  762: 'レストラン, 食堂',
  763: 'リボルバー, 拳銃',
  764: 'ライフル',
  765: 'ロッキングチェア, ロッカー',
  766: '焼肉機',
  767: '消しゴム',
  768: 'ラグビーボール',
  769: '定規',
  770: 'ランニングシューズ',
  771: '金庫',
  772: '安全ピン',
  773: '食卓用塩入れ',
  774: 'サンダル',
  775: 'サロン, 巻きスカート',
  776: 'サックス',
  777: '鞘',
  778: '計量機, はかり, 体重計',
  779: 'スクールバス',
  780: 'スクーナー, 大ジョッキ',
  781: 'スコアボード',
  782: 'CRT画面, 画面',
  783: 'ネジ',
  784: 'ネジ用ドライバー',
  785: 'シートベルト',
  786: 'ミシン',
  787: '盾, 丸盾',
  788: '靴屋',
  789: '障子',
  790: '買い物かご',
  791: 'ショッピングカート',
  792: 'シャベル',
  793: 'シャワーキャップ',
  794: 'シャワーカーテン',
  795: 'スキー',
  796: '目出し帽',
  797: '寝袋',
  798: '計算尺, アナログ式計算機',
  799: 'スライドドア',
  800: 'スロットマシーン',
  801: 'シュノーケル',
  802: 'スノーモービル',
  803: '除雪機',
  804: '液体せっけん入れ',
  805: 'サッカーボール',
  806: '靴下',
  807: 'ソーラーパネル',
  808: 'ソンブレロ',
  809: 'スープボウル, 吸い物椀',
  810: 'スペースバー',
  811: '暖房機',
  812: 'スペースシャトル',
  813: 'へら',
  814: 'スピードボート, モーターボート',
  815: 'クモの巣',
  816: 'スピンドル',
  817: 'スポーツカー',
  818: 'スポットライト',
  819: 'ステージ',
  820: '蒸気機関車',
  821: '鋼アーチ橋',
  822: 'スチールドラム, ドラム缶',
  823: '聴診器',
  824: '襟巻き, ストール',
  825: '石垣',
  826: 'ストップウォッチ',
  827: 'ストーブ',
  828: '漉し器, ふるい, ろ過器',
  829: '路面電車, 電車',
  830: 'ストレッチャー, 担架',
  831: 'ソファーベッド',
  832: '卒塔婆',
  833: '潜水艦, Uボート',
  834: 'スーツ',
  835: '日時計',
  836: 'サングラス',
  837: 'サングラス',
  838: '日焼け止め',
  839: '吊り橋',
  840: 'モップ',
  841: 'スエットシャツ, トレーナー',
  842: '水泳パンツ',
  843: 'スイング, ブランコ',
  844: 'スイッチ, 電気スイッチ',
  845: '注射器',
  846: 'テーブルランプ, 電気スタンド',
  847: '戦車, 装甲戦車',
  848: 'テープ再生装置, カセットプレーヤー',
  849: 'ティーポット',
  850: 'テディベア',
  851: 'テレビ',
  852: 'テニスボール',
  853: '茅葺き屋根',
  854: 'シアターカーテン, 紗幕',
  855: '指ぬき',
  856: '脱穀機',
  857: '便座, トイレ',
  858: '瓦屋根',
  859: 'トースター',
  860: 'タバコショップ, タバコ専門店',
  861: '便座',
  862: 'トーチ, たいまつ, 懐中電灯',
  863: 'トーテムポール',
  864: '牽引車, レッカー車',
  865: 'おもちゃ屋',
  866: 'トラクター',
  867: 'トレーラートラック, 輸送トレーラー',
  868: 'トレイ, 受け皿, お盆',
  869: 'トレンチコート',
  870: '三輪車',
  871: 'トライマラン, 三胴船',
  872: '三脚',
  873: '凱旋門',
  874: 'トロリーバス, 無軌条電車',
  875: 'トロンボーン',
  876: '桶',
  877: '回転ドア',
  878: 'タイプライターキーボード',
  879: '傘',
  880: '一輪車',
  881: '縦型ピアノ',
  882: '掃除機',
  883: '花瓶',
  884: '円天井',
  885: 'ベルベット, ビードロ',
  886: '自動販売機',
  887: '衣服, 祭服',
  888: '高架橋, 吊り橋',
  889: 'バイオリン',
  890: 'バレーボール',
  891: 'ワッフル焼き型',
  892: '壁掛け時計, 柱時計',
  893: '財布',
  894: '洋服ダンス, クローゼット',
  895: '戦闘機, 軍用機',
  896: '洗面器',
  897: '洗濯機',
  898: 'ウォーターボトル',
  899: 'ウォータージャグ, 水がめ, 水差し',
  900: 'ウォータータワー, 給水塔',
  901: 'ウィスキージャグ',
  902: 'ホイッスル',
  903: 'かつら',
  904: '網戸',
  905: 'ブラインド',
  906: 'ウィンザータイ, 蝶ネクタイ',
  907: 'ワインボトル',
  908: '翼, 羽',
  909: '中華鍋',
  910: '木製スプーン',
  911: 'ウール, 羊毛, 毛糸',
  912: 'レールフェンス',
  913: '難破船, 破壊されたもの',
  914: '手漕ぎボート',
  915: 'ユルト, 円錐型移動テント',
  916: 'ウェブサイト, インターネットサイト',
  917: 'コミックス, 漫画',
  918: 'クロスワードパズル',
  919: '道路標識',
  920: '信号機',
  921: '書籍カバー, ブックカバー',
  922: 'メニュー',
  923: '皿, プレート',
  924: 'グアカモール, ワカモレ',
  925: 'コンソメ, コンソメスープ',
  926: 'ホットポット',
  927: 'トライフル, デザート',
  928: 'アイスクリーム',
  929: 'アイスキャンディー, ロリポップ',
  930: 'フランスパン',
  931: 'ベーグル',
  932: 'プレッツェル',
  933: 'チーズバーガー',
  934: 'ホットドッグ',
  935: 'マッシュポテト',
  936: 'キャベツ',
  937: 'ブロッコリー',
  938: 'カリフラワー',
  939: 'ズッキーニ',
  940: '金糸瓜, 西洋かぼちゃ',
  941: '団栗かぼちゃ',
  942: 'バターナッツかぼちゃ',
  943: 'キュウリ',
  944: 'アーティチョーク',
  945: 'ピーマン',
  946: 'カルドン',
  947: 'キノコ, マッシュルーム',
  948: 'グラニースミスアップル, リンゴ',
  949: 'イチゴ',
  950: 'オレンジ',
  951: 'レモン',
  952: 'イチジク',
  953: 'パイナップル',
  954: 'バナナ',
  955: 'ジャックフルーツ',
  956: 'カスタードアップル, リンゴ',
  957: 'ザクロ',
  958: '干し草',
  959: 'カルボナーラ',
  960: 'チョコレートソース, チョコレートシロップ',
  961: '生地',
  962: 'ミートローフ',
  963: 'ピザ, ピザパイ',
  964: 'ポットパイ, 肉入りパイ',
  965: 'ブリトー',
  966: '赤ワイン',
  967: 'エスプレッソ',
  968: 'カップ',
  969: 'エッグノッグ',
  970: '高い山',
  971: '泡, バブル, シャボン玉',
  972: '崖, 絶壁',
  973: 'サンゴ礁',
  974: '間欠泉',
  975: '湖畔',
  976: '岬',
  977: '砂州',
  978: '海岸, 沿岸',
  979: '谷',
  980: '火山',
  981: '野球選手',
  982: '新郎, 花婿',
  983: 'スキューバダイバー',
  984: 'ナタネ',
  985: 'ヒナギク',
  986: 'アツモリソウ, ラン',
  987: 'トウモロコシ',
  988: 'どんぐり',
  989: 'ローズヒップ',
  990: 'セイヨウトチノキ',
  991: 'ハナホウキタケ',
  992: 'ハラタケ',
  993: 'シャグマアミガサタケ',
  994: 'スッポンタケ',
  995: 'エリマキツチグリ',
  996: '舞茸',
  997: 'ポルチーニ',
  998: '穀類の植物, 穂, 頭状花序',
  999: 'トイレットペーパー'
};
