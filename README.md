# **Fall Object Puzzles（落ちものパズル）**

このプロジェクトは、**Phaser 3** と **React** を組み合わせて作成した落ちものパズル。
基本的な仕様はテトリスを参考にしています。

---

## **現在の進捗状況**

- **Phaser と React の統合**（ゲームと UI の連携）
- **ゲームの基本的なグリッドシステム**
- **ブロックの生成と操作**
- **衝突判定とブロックの固定**
- **ライン消去とスコア計算**
- **スーパーローテーションの適応**
- **BGMの追加**

---

## **今後の開発予定**

- スコア表示
- サウンドエフェクトの追加
- リトライ機能
- スタート画面
- ランキング機能

---

## **使用技術**

- **[Phaser 3.88.2](https://github.com/phaserjs/phaser)**
- **[React 18.2.0](https://github.com/facebook/react)**
- **[Vite 5.3.1](https://github.com/vitejs/vite)**
- **[TypeScript 5.2.2](https://github.com/microsoft/TypeScript)**

---

## **ゲームの遊び方**

- **左右キー** でブロックを移動
- **スペースキー** でブロックを回転
- **下キー** でブロックを素早く落下
- **上キー** でブロックを最下部まで即座に落とす
- 一列揃うとその列が消え、スコアが加算される

---

## **プロジェクト構成**

```txt
📁 root
│── index.html          # ゲームを含む基本的な HTML ページ
│── 📁 src              # React クライアントのソースコード
│     │── main.tsx        # React アプリのエントリーポイント
│     │── App.tsx         # メインの React コンポーネント
│     └── 📁 game         # Phaser のゲームソースコード
│            │── PhaserGame.tsx   # React と Phaser の橋渡しコンポーネント
│            │── EventBus.ts      # React ↔ Phaser の通信用イベントバス
│            │── main.tsx         # ゲームのエントリーポイント
│            └── 📁 scenes        # Phaser のシーン管理フォルダ
│                   └── MainScene.ts # メインゲームシーン
└── 📁 public
       │── 📁 assets      # ゲームで使用する静的アセット
       │── favicon.png    # ページのアイコン
       └── style.css      # ページレイアウト用の CSS
```

---

## **使用素材**

- [ミュージック](https://archive.org/details/TetrisThemeMusic)

---

&copy; 2025 とまとのごはん. All rights reserved.
