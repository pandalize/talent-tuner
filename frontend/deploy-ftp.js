#!/usr/bin/env node

/**
 * お名前.com共用サーバー FTP自動デプロイスクリプト
 * Node.js + basic-ftp を使用した完全自動化
 */

import ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env.deployファイルを手動で読み込み
const envPath = path.join(__dirname, '.env.deploy');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !key.startsWith('#')) {
      process.env[key.trim()] = value.trim();
    }
  });
}

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

  async findWebDirectory() {
    console.log('🔍 Webディレクトリを検索中...');
    
    // 可能性のあるWebディレクトリ名
    const possibleDirs = ['public_html', 'www', 'htdocs', 'html', 'public', 'web'];
    
    try {
      // ルートディレクトリの内容を取得
      await this.client.cd('/');
      const list = await this.client.list();
      
      console.log('  📂 ルートディレクトリの内容:');
      list.forEach(item => {
        console.log(`    ${item.type === 1 ? '📁' : '📄'} ${item.name} (type: ${item.type})`);
      });
      
      // ドメイン名のディレクトリを探す（お名前.com特有の構造）
      const domainDirs = list.filter(item => 
        (item.type === 1 || item.type === 2) && 
        (item.name.includes('.com') || item.name.includes('.jp') || item.name.includes('.net'))
      );
      
      if (domainDirs.length > 0) {
        // pandalize.com を優先的に選択
        const pandalizeDir = domainDirs.find(item => item.name === 'pandalize.com');
        if (pandalizeDir) {
          console.log(`  ✅ ドメインディレクトリ発見: ${pandalizeDir.name}`);
          return `/${pandalizeDir.name}`;
        } else {
          console.log(`  ✅ ドメインディレクトリ発見: ${domainDirs[0].name}`);
          return `/${domainDirs[0].name}`;
        }
      }
      
      // 標準的なWebディレクトリがあるかチェック
      for (const dir of possibleDirs) {
        const found = list.find(item => item.name === dir && (item.type === 1 || item.type === 2));
        if (found) {
          console.log(`  ✅ Webディレクトリ発見: ${dir}`);
          return `/${dir}`;
        }
      }
      
      // どちらも見つからない場合はルートを使用
      console.log('  ⚠️  適切なWebディレクトリが見つかりません。ルートディレクトリを使用します。');
      return '/';
      
    } catch (error) {
      console.warn('  ⚠️  ディレクトリ検索に失敗しました。デフォルトを使用します:', error.message);
      return REMOTE_DIR;
    }
  }

  async uploadFiles() {
    console.log('📤 ファイルをアップロード中...');

    // サーバーのディレクトリ構造を確認
    const remoteDir = await this.findWebDirectory();
    console.log(`  📁 Web ディレクトリ: ${remoteDir}`);

    // distディレクトリの全ファイルをアップロード
    await this.client.ensureDir(remoteDir);
    await this.client.cd(remoteDir);
    
    console.log('  📁 静的ファイル（dist/）をアップロード...');
    await this.client.uploadFromDir(LOCAL_DIST_DIR, '.');

    // 設定ファイルのアップロード
    console.log('  ⚙️  設定ファイルをアップロード...');
    
    // .htaccess
    const htaccessLocal = './public/.htaccess';
    if (fs.existsSync(htaccessLocal)) {
      await this.client.uploadFrom(htaccessLocal, '.htaccess');
      console.log('    ✅ .htaccess アップロード完了');
    }

    // 追加ファイルは dist/ のアップロードで既に処理済み
    console.log('    ✅ APIファイルはメインアップロードで処理済み');

    // .env ファイル
    const envLocal = './.env';
    if (fs.existsSync(envLocal)) {
      await this.client.uploadFrom(envLocal, '.env');
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
if (import.meta.url === `file://${process.argv[1]}`) {
  const deployer = new FTPDeployer();
  deployer.deploy();
}

export default FTPDeployer;