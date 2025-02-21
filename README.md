# **📌 Phaser React TypeScript テンプレート（日本語版）**

このテンプレートは、**Phaser 3** を **React フレームワーク** と **Vite** を使用して開発するためのプロジェクトテンプレートです。
React と Phaser のブリッジ機能を備え、ホットリロードによる素早い開発フローと、**本番環境向けのビルドスクリプト** を含んでいます。

**[JavaScript 版のテンプレートも利用可能です](https://github.com/phaserjs/template-react)**。

---

## **🔷 バージョン情報**

このテンプレートは、以下のバージョンに対応しています：

- [Phaser 3.88.2](https://github.com/phaserjs/phaser)
- [React 18.2.0](https://github.com/facebook/react)
- [Vite 5.3.1](https://github.com/vitejs/vite)
- [TypeScript 5.2.2](https://github.com/microsoft/TypeScript)

![screenshot](screenshot.png)

---

## **🔷 必要環境**

このテンプレートを利用するには、以下のソフトウェアが必要です：

- **[Node.js](https://nodejs.org)**
  - `npm` を使用して依存関係をインストールし、スクリプトを実行するために必要です。

---

## **🔷 利用可能なコマンド**

| コマンド | 説明 |
|---------|-------------|
| `npm install` | プロジェクトの依存関係をインストール |
| `npm run dev` | 開発用のローカルサーバーを起動 |
| `npm run build` | `dist` フォルダに本番環境向けのビルドを作成 |
| `npm run dev-nolog` | 匿名データを送信せずに開発用サーバーを起動（後述の「log.js について」参照） |
| `npm run build-nolog` | 匿名データを送信せずに本番ビルドを作成（後述の「log.js について」参照） |

---

## **🔷 コーディングの開始**

リポジトリをクローンしたら、まず以下のコマンドで依存関係をインストールしてください：

```sh
npm install
```

その後、開発用サーバーを起動：

```sh
npm run dev
```

デフォルトでは `http://localhost:8080` でサーバーが起動します。ポート変更や SSL サポートを追加したい場合は、Vite の公式ドキュメントを参照してください。

**ホットリロード対応**：
`src` フォルダ内のファイルを編集すると、Vite が自動的にコードを再コンパイルし、ブラウザが更新されます。

---

## **🔷 プロジェクト構成**

このテンプレートでは、以下のプロジェクト構成を提供しています：

``` txt
📁 root
│── index.html          # ゲームを含む基本的な HTML ページ
│── 📁 src              # React クライアントのソースコード
│   │── main.tsx        # React アプリのエントリーポイント
│   │── vite-env.d.ts   # TypeScript の型情報
│   │── App.tsx         # メインの React コンポーネント
│   │── 📁 game         # Phaser のゲームソースコード
│   │   │── PhaserGame.tsx   # React と Phaser の橋渡しコンポーネント
│   │   │── EventBus.ts      # React ↔ Phaser の通信用イベントバス
│   │   │── main.tsx         # ゲームのエントリーポイント
│   │   └── 📁 scenes        # Phaser のシーン管理フォルダ
│── 📁 public
│   │── style.css      # ページレイアウト用の CSS
│   └── assets         # ゲームで使用する静的アセット
```

---

## **🔷 React と Phaser の連携**

### **PhaserGame.tsx（React ↔ Phaser の橋渡し）**

`PhaserGame.tsx` は、React アプリと Phaser のゲームインスタンスを接続するためのコンポーネントです。

### **React ↔ Phaser のイベント通信**

React から Phaser にイベントを送信したり、Phaser から React にデータを送るには、`EventBus.ts` を利用します。

- **React 側（イベント送信）**

```ts
import { EventBus } from './EventBus';

// イベントを発行
EventBus.emit('event-name', data);
```

- **Phaser 側（イベント受信）**

```ts
EventBus.on('event-name', (data) => {
    // 受け取ったデータを処理
});
```

---

## **🔷 Phaser のシーン管理**

Phaser のシーンはゲームの心臓部であり、スプライトやゲームロジックが含まれます。
このテンプレートでは、**React からアクティブなシーンを取得する機能** を提供しています。

### **React 側で現在のシーンを取得する方法**

```ts
import { useRef } from 'react';
import { IRefPhaserGame } from "./game/PhaserGame";

const ReactComponent = () => {
    const phaserRef = useRef<IRefPhaserGame>();

    const onCurrentActiveScene = (scene: Phaser.Scene) => {
        console.log("現在のアクティブなシーン:", scene);
    }

    return (
        <PhaserGame ref={phaserRef} currentActiveScene={onCurrentActiveScene} />
    );
}
```

---

## **🔷 本番環境へのデプロイ**

`npm run build` を実行すると、コードが `dist` フォルダにビルドされます。
この `dist` フォルダの内容をサーバーにアップロードするだけで、本番環境にデプロイできます。

---

## **🔷 log.js について（データ送信のオプトアウト）**

このテンプレートには `log.js` というスクリプトが含まれており、開発時に **Phaser Studio Inc.** に匿名の利用情報（テンプレート名、ビルド種別、Phaser のバージョン）を送信します。

もしデータ送信を無効にしたい場合、以下のコマンドを使用してください：

```sh
npm run dev-nolog
npm run build-nolog
```

または `log.js` を削除し、`package.json` のスクリプトを変更してください：

```json
"scripts": {
    "dev": "dev-template-script",
    "build": "build-template-script"
}
```

---

## **🔷 Phaser コミュニティに参加しよう！**

Phaser を使って開発したゲームをシェアしたり、他の開発者と交流しましょう！ 😄

🔗 **公式サイト:** [Phaser.io](https://phaser.io)
🔗 **Twitter:** [@phaser_](https://twitter.com/phaser_)
🔗 **API ドキュメント:** [Phaser Docs](https://newdocs.phaser.io)
🔗 **Discord:** [Phaser Discord](https://discord.gg/phaser)
🔗 **サンプルコード:** [Phaser Labs](https://labs.phaser.io)
🔗 **開発ニュースレター:** [Phaser World](https://phaser.io/community/newsletter)

このテンプレートは **Phaser Studio Inc.** によって作成されました。🚀
Phaser ロゴおよびキャラクターは &copy; 2011 - 2024 Phaser Studio Inc. の著作物です。
