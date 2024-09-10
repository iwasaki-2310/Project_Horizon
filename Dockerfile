# ベースイメージとしてLaravel Sailの公式イメージを使用
FROM laravelsail/php80-composer as base

# Node.js 18.xをインストール
FROM node:18-alpine as node

# 作業ディレクトリを設定
WORKDIR /var/www/html

# Laravelのプロジェクトファイルをすべてコピー
COPY . .

# npmを使って依存関係をインストール
RUN npm install

# ビルド用のカスタムコマンド
RUN npm run build

# php-fpmを実行する
CMD ["php-fpm"]
