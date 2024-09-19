const admin = require('firebase-admin');
const fs = require('fs');

// 初始化 Firebase Admin SDK
const serviceAccount = require('/path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-bucket-name.appspot.com' // 替换为你的 Firebase Storage 存储桶名称
});

// 获取 Firebase Storage 存储桶
const bucket = admin.storage().bucket();

// 指定要下载的文件夹路径
const folderPath = 'your-folder-name'; // 替换为你的文件夹路径

// 下载整个文件夹
async function downloadFolder() {
  try {
    const [files] = await bucket.getFiles({ prefix: folderPath });

    // 创建本地目标文件夹
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // 遍历文件列表并下载每个文件
    for (const file of files) {
      const destination = `${folderPath}/${file.name}`;
      await file.download({ destination });
      console.log(`Downloaded file: ${file.name}`);
    }

    console.log('Folder download completed!');
  } catch (error) {
    console.error('Error downloading folder:', error);
  }
}

// 调用下载函数
downloadFolder();
