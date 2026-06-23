const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const QrCodeReader = require('qrcode-reader');

const url = 'https://e-card-fawn-five.vercel.app/hung-phat-nguyen-lieu/';
const outDir = path.join(__dirname, '..', 'hung-phat-nguyen-lieu', 'assets', 'qr');
const files = {
  svg: path.join(outDir, 'qr-hung-phat.svg'),
  print: path.join(outDir, 'qr-hung-phat-print.png'),
  preview: path.join(outDir, 'qr-hung-phat-preview.png'),
};

async function ensureDir() {
  await fs.promises.mkdir(outDir, { recursive: true });
}

async function writeSvg() {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 4,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
  await fs.promises.writeFile(files.svg, svg, 'utf8');
}

async function writePng(targetPath, width) {
  await QRCode.toFile(targetPath, url, {
    type: 'png',
    width,
    margin: 4,
    errorCorrectionLevel: 'H',
    color: { dark: '#000000', light: '#FFFFFF' },
  });
}

async function decodeQr(filePath) {
  const image = await Jimp.read(filePath);
  return new Promise((resolve, reject) => {
    const qr = new QrCodeReader();
    qr.callback = (err, value) => {
      if (err) {
        reject(err);
      } else if (!value || !value.result) {
        reject(new Error('QR decode returned no result'));
      } else {
        resolve(value.result);
      }
    };
    qr.decode(image.bitmap);
  });
}

async function fetchUrl() {
  if (typeof fetch !== 'undefined') {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  }
  return true;
}

async function run() {
  console.log('Generating QR assets for:', url);
  await ensureDir();
  await writeSvg();
  await writePng(files.print, 2000);
  await writePng(files.preview, 600);

  console.log('Files written:');
  console.log(' -', files.svg);
  console.log(' -', files.print);
  console.log(' -', files.preview);

  const printDecoded = await decodeQr(files.print);
  const previewDecoded = await decodeQr(files.preview);

  if (printDecoded !== url || previewDecoded !== url) {
    throw new Error('Decoded QR value does not match expected URL');
  }

  console.log('Decoded URL verified from PNG files.');

  try {
    const ok = await fetchUrl();
    if (!ok) {
      console.warn('Warning: URL HEAD request failed or is not reachable from this environment.');
    } else {
      console.log('URL is reachable via HTTP HEAD request.');
    }
  } catch (err) {
    console.warn('Warning: URL fetch verification failed:', err.message);
  }

  const stats = await Promise.all([
    fs.promises.stat(files.svg),
    fs.promises.stat(files.print),
    fs.promises.stat(files.preview),
  ]);

  console.log('Output sizes:');
  console.log(` - svg: ${stats[0].size} bytes`);
  console.log(` - print: ${stats[1].size} bytes`);
  console.log(` - preview: ${stats[2].size} bytes`);
}

run().catch((error) => {
  console.error('QR generation failed:', error);
  process.exit(1);
});
