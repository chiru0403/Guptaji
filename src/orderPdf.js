function pdfText(value) {
  return String(value ?? '')
    .replaceAll('₹', 'Rs.')
    .replaceAll('—', '-')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function assemblePdf(stream) {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Count 1 /Kids [3 0 R] >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`,
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

function money(amount) {
  return `Rs.${amount}`;
}

export function buildOrderPdf({
  shopName = 'Gupta Namkin',
  orderNo = '',
  name = '',
  mobile = '',
  items = [],
  instructions = '',
  discountCode = '',
  orderedAt = new Date(),
}) {
  const ops = [];
  const text = (font, size, x, y, value) => {
    ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfText(value)}) Tj ET`);
  };
  const fill = (r, g, b, x, y, w, h) => {
    ops.push(`${r} ${g} ${b} rg\n${x} ${y} ${w} ${h} re f`);
  };

  fill('0.329', '0.106', '0.094', 0, 760, 595, 82);
  fill('0.929', '0.420', '0.098', 0, 760, 595, 6);
  ops.push('1 1 1 rg');
  text('F2', 22, 40, 804, shopName);
  text('F1', 11, 40, 782, 'Order form');

  const dateLabel = orderedAt.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  ops.push('0.188 0.110 0.094 rg');
  text('F1', 12, 40, 720, 'Hello, I want to order:');

  let y = 688;
  text('F1', 11, 40, y, 'Order ref');
  text('F2', 11, 160, y, orderNo || '-');
  y -= 20;
  text('F1', 11, 40, y, 'Date');
  text('F2', 11, 160, y, dateLabel);
  y -= 20;
  text('F1', 11, 40, y, 'Name');
  text('F2', 11, 160, y, name || '-');
  y -= 20;
  text('F1', 11, 40, y, 'Mobile');
  text('F2', 11, 160, y, mobile || '-');

  y -= 36;
  fill('0.969', '0.918', '0.792', 36, y - 8, 523, 24);
  ops.push('0.329 0.106 0.094 rg');
  text('F2', 10, 48, y, '#');
  text('F2', 10, 80, y, 'Product');
  text('F2', 10, 360, y, 'Qty');
  text('F2', 10, 450, y, 'Amount');

  const rows = items.map((item, index) => ({
    index: index + 1,
    name: item.name,
    qty: item.qty,
    amount: item.price * item.qty,
  }));
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  rows.forEach((row) => {
    y -= 26;
    ops.push('0.188 0.110 0.094 rg');
    text('F1', 11, 48, y, String(row.index));
    text('F1', 11, 80, y, row.name);
    text('F1', 11, 360, y, `x ${row.qty}`);
    text('F2', 11, 450, y, money(row.amount));
  });

  y -= 18;
  ops.push('0.8 0.75 0.7 RG\n40 ' + y + ' m 555 ' + y + ' l S');
  y -= 24;
  ops.push('0.329 0.106 0.094 rg');
  text('F2', 13, 360, y, 'Total');
  text('F2', 13, 450, y, money(total));

  if (instructions.trim()) {
    y -= 36;
    text('F2', 11, 40, y, 'Special instructions');
    y -= 18;
    text('F1', 11, 40, y, instructions.trim());
  }
  if (discountCode.trim()) {
    y -= 28;
    text('F2', 11, 40, y, 'Discount code');
    text('F1', 11, 160, y, discountCode.trim());
  }

  y -= 40;
  ops.push('0.463 0.333 0.290 rg');
  text('F1', 11, 40, y, 'Please share availability and order details.');

  const stream = ops.join('\n');
  return new Blob([assemblePdf(stream)], { type: 'application/pdf' });
}

export function orderPdfFile(blob, orderNo) {
  const safeRef = String(orderNo || 'order').replace(/[^\w.-]+/g, '-');
  return new File([blob], `Gupta-Namkin-${safeRef}.pdf`, { type: 'application/pdf' });
}

export function orderCaption({ orderNo, name, mobile }) {
  return [
    'Hello Gupta Namkin, I want to order. Please open the attached PDF order form.',
    `Order ref: ${orderNo}`,
    `Name: ${name}`,
    `Mobile: ${mobile}`,
  ].join('\n');
}

export async function shareOrderPdf(file, text) {
  if (typeof navigator.share !== 'function') return 'unsupported';
  const payload = { files: [file], title: file.name, text };
  if (navigator.canShare && !navigator.canShare(payload)) return 'unsupported';
  try {
    await navigator.share(payload);
    return 'shared';
  } catch (err) {
    if (err?.name === 'AbortError') return 'cancelled';
    return 'unsupported';
  }
}

export function downloadOrderPdf(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
