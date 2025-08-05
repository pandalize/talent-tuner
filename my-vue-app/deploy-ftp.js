#!/usr/bin/env node

/**
 * お名前.com共用サーバー FTP自動デプロイスクリプト
 * Node.js + basic-ftp を使用した完全自動化
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// 設定
const FTP_CONFIG = {
  host: process.env.FTP_HOST || 'your-ftp-server.com',
  user: process.env.FTP_USER || 'your-username',
  password: process.env.FTP_PASSWORD || 'your-password',
  secure: false, // お名前.comは通常false
  port: 21
};

const REMOTE_DIR = '/public_html';
const LOCAL_DIST_DIR = './dist';

class FTPDeployer {
  constructor() {
    this.client = new ftp.Client();
    this.client.ftp.verbose = true;
  }

  async deploy() {
    console.log('🚀 お名前.com FTP自動デプロイを開始します...\n');

    try {
      // 1. ビルド実行
      await this.buildProject();

      // 2. FTP接続
      await this.connectFTP();

      // 3. ファイルアップロード
      await this.uploadFiles();

      // 4. 権限設定
      await this.setPermissions();

      console.log('\n✅ デプロイが完了しました！');
      
    } catch (error) {
      console.error('\n❌ デプロイに失敗しました:', error.message);
      process.exit(1);
    } finally {
      this.client.close();
    }
  }

  async buildProject() {
    console.log('📦 プロジェクトをビルド中...');
    
    try {
      await execAsync('npm run build');
      console.log('✅ ビルド完了');
    } catch (error) {
      throw new Error(`ビルドに失敗しました: ${error.message}`);
    }
  }

  async connectFTP() {
    console.log('🔌 FTPサーバーに接続中...');
    
    // 環境変数チェック
    if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) {
      throw new Error('FTP接続情報が設定されていません。.env.deployを確認してください。');
    }

    try {
      await this.client.access(FTP_CONFIG);
      console.log('✅ FTP接続成功');
    } catch (error) {
      throw new Error(`FTP接続に失敗しました: ${error.message}`);
    }
  }

  async uploadFiles() {
    console.log('📤 ファイルをアップロード中...');

    // distディレクトリの全ファイルをアップロード
    await this.client.ensureDir(REMOTE_DIR);
    await this.client.clearWorkingDir();
    
    console.log('  📁 静的ファイル（dist/）をアップロード...');
    await this.client.uploadFromDir(LOCAL_DIST_DIR, REMOTE_DIR);

    // 設定ファイルのアップロード
    console.log('  ⚙️  設定ファイルをアップロード...');
    
    // .htaccess
    const htaccessLocal = './public/.htaccess';
    const htaccessRemote = `${REMOTE_DIR}/.htaccess`;
    if (fs.existsSync(htaccessLocal)) {
      await this.client.uploadFrom(htaccessLocal, htaccessRemote);
      console.log('    ✅ .htaccess アップロード完了');
    }

    // API ディレクトリ作成
    await this.client.ensureDir(`${REMOTE_DIR}/api`);
    
    // PHP APIプロキシ
    const phpApiLocal = './public/api/chat-proxy.php';
    const phpApiRemote = `${REMOTE_DIR}/api/chat-proxy.php`;
    if (fs.existsSync(phpApiLocal)) {
      await this.client.uploadFrom(phpApiLocal, phpApiRemote);
      console.log('    ✅ chat-proxy.php アップロード完了');
    }

    // .env ファイル
    const envLocal = './.env';
    const envRemote = `${REMOTE_DIR}/.env`;
    if (fs.existsSync(envLocal)) {
      await this.client.uploadFrom(envLocal, envRemote);
      console.log('    ✅ .env アップロード完了');
    }

    console.log('✅ 全ファイルのアップロード完了');
  }

  async setPermissions() {
    console.log('🔐 ファイル権限を設定中...');

    try {
      // .env ファイルの権限を600に設定（セキュリティ）
      await this.client.send('SITE CHMOD 600 .env');
      console.log('  ✅ .env → 600');

      // .htaccess の権限を644に設定
      await this.client.send('SITE CHMOD 644 .htaccess');
      console.log('  ✅ .htaccess → 644');

      // API ディレクトリの権限を755に設定
      await this.client.send('SITE CHMOD 755 api');
      console.log('  ✅ api/ → 755');

      // PHP ファイルの権限を644に設定
      await this.client.send('SITE CHMOD 644 api/chat-proxy.php');
      console.log('  ✅ chat-proxy.php → 644');

      console.log('✅ 権限設定完了');
    } catch (error) {
      console.warn('⚠️  権限設定に失敗しました（一部FTPサーバーでは対応していません）:', error.message);
    }
  }
}

// メイン実行
if (require.main === module) {
  const deployer = new FTPDeployer();
  deployer.deploy();
}

module.exports = FTPDeployer;