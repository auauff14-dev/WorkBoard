(function (global) {
  'use strict';

  function createQrCode(options) {
    const text = options.text || '';
    const size = options.size || 256;
    const margin = options.margin == null ? 4 : options.margin;
    const dark = options.dark || '#000000';
    const light = options.light || '#ffffff';

    if (!global.qrcode) {
      throw new Error('QR library is not available');
    }

    const qr = new global.qrcode(0, 'M');
    qr.addData(text);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = dark;

    const moduleSize = Math.max(1, Math.floor((size - margin * 2) / moduleCount));
    const offset = margin + Math.floor((size - moduleSize * moduleCount) / 2);

    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        if (qr.isDark(row, col)) {
          const x = offset + col * moduleSize;
          const y = offset + row * moduleSize;
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }

    return canvas;
  }

  global.WorkBoardQrLocal = {
    createQrCode: createQrCode
  };
})(window);
