
const getText = (selector) => document.querySelector(selector).innerText.trim();

// コピー
document.querySelectorAll('[data-copy]').forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getText(btn.dataset.copy));
      btn.textContent = 'コピーしました';
      setTimeout(() => { btn.textContent = label; }, 1500);
    } catch {
      btn.textContent = 'コピーできません';
      setTimeout(() => { btn.textContent = label; }, 1500);
    }
  });
});

// ダウンロード
document.querySelectorAll('[data-download]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const blob = new Blob([getText(btn.dataset.download)], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = btn.dataset.filename || 'download.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
});
