const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const s = size / 128;

    // Background
    ctx.fillStyle = '#010101';
    const r = 28 * s;
    ctx.beginPath();
    ctx.moveTo(r, 0); ctx.lineTo(size - r, 0);
    ctx.arcTo(size, 0, size, r, r);
    ctx.lineTo(size, size - r);
    ctx.arcTo(size, size, size - r, size, r);
    ctx.lineTo(r, size);
    ctx.arcTo(0, size, 0, size - r, r);
    ctx.lineTo(0, r);
    ctx.arcTo(0, 0, r, 0, r);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 10 * s;
    ctx.lineCap = 'round';

    // Cyan arc
    ctx.strokeStyle = '#25F4EE';
    ctx.beginPath();
    ctx.arc(60 * s, 58 * s, 24 * s, Math.PI * 0.9, Math.PI * 1.8, false);
    ctx.stroke();
    // Cyan arrow
    ctx.fillStyle = '#25F4EE';
    ctx.beginPath();
    ctx.moveTo(80 * s, 34 * s); ctx.lineTo(94 * s, 46 * s); ctx.lineTo(80 * s, 58 * s);
    ctx.closePath(); ctx.fill();

    // Red arc
    ctx.strokeStyle = '#FE2C55';
    ctx.beginPath();
    ctx.arc(68 * s, 70 * s, 24 * s, Math.PI * 1.9, Math.PI * 0.8, false);
    ctx.stroke();
    // Red arrow
    ctx.fillStyle = '#FE2C55';
    ctx.beginPath();
    ctx.moveTo(48 * s, 94 * s); ctx.lineTo(34 * s, 82 * s); ctx.lineTo(48 * s, 70 * s);
    ctx.closePath(); ctx.fill();

    // White X
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14 * s;
    ctx.beginPath(); ctx.moveTo(36 * s, 36 * s); ctx.lineTo(92 * s, 92 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(92 * s, 36 * s); ctx.lineTo(36 * s, 92 * s); ctx.stroke();

    return canvas.toBuffer('image/png');
}

[16, 48, 128].forEach(size => {
    fs.writeFileSync(`icon${size}.png`, drawIcon(size));
    console.log(`Created icon${size}.png`);
});
