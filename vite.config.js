import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        port: 5175, // コンテナ内のポート
        host: '0.0.0.0', // 外部アクセスを許可
        strictPort: true, // ポートが使用中の場合にエラーを出す
        hmr: {
            host: 'localhost', // ホストマシンのホスト名
            port: 5175, // ホストマシンのポート
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', 'resources/css/app.css'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
