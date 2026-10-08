const hindiWords = [
  [/जलेबी|जेलेबी/g, ' jalebi '],
  [/लड्डू|लडू|लाडू|लड्डु/g, ' ladoo '],
  [/सेव/g, ' sev '],
  [/समोसा/g, ' samosa '],
  [/कचौरी/g, ' kachori '],
  [/भुजिया/g, ' bhujia '],
  [/चिवडा|चिवड़ा|चिवड़ा/g, ' chivda '],
  [/पापड़ी|पापडी/g, ' papdi '],
  [/गाठिया|गांठिया|गान्ठिया/g, ' ganthiya '],
  [/मखाना/g, ' makhana '],
  [/चना/g, ' chana '],
  [/मूंगफली|मूँगफली|मूँगफली/g, ' peanuts '],
  [/ढोकला/g, ' dhokla '],
  [/पोहा/g, ' poha '],
  [/नमकीन/g, ' namkeen '],
  [/मिक्स/g, ' mix '],
  [/खट्टा\s*मीठा/g, ' khatta meetha '],
  [/रतलामी/g, ' ratlami '],
];

const fillers = new Set([
  'mujhe',
  'muje',
  'muze',
  'chahiye',
  'chahie',
  'dikhao',
  'dikha',
  'search',
  'please',
  'show',
  'me',
  'the',
  'a',
  'ek',
  'one',
  'wala',
  'wali',
  'hai',
  'hain',
]);

function editDistance(left, right) {
  if (Math.abs(left.length - right.length) > 2) return 3;
  const rows = Array.from({ length: left.length + 1 }, (_, index) => [index]);
  for (let column = 1; column <= right.length; column += 1) rows[0][column] = column;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[left.length][right.length];
}

export function normalizeSpeech(text) {
  let value = String(text || '').toLowerCase();
  hindiWords.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });
  value = value.replace(/laddu/g, 'ladoo');
  return value
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchTermFromSpeech(transcript, products = []) {
  const heard = normalizeSpeech(transcript)
    .split(' ')
    .filter((token) => token && !fillers.has(token))
    .join(' ');
  if (!heard) return '';

  const names = products
    .map((product) => ({
      raw: product.name,
      key: normalizeSpeech(product.name),
    }))
    .filter((item) => item.key);

  const contained = names
    .filter((item) => heard.includes(item.key))
    .sort((a, b) => b.key.length - a.key.length);
  if (contained[0]) return contained[0].raw;

  const tokens = heard.split(' ');
  const corrected = tokens.map((token) => {
    let best = token;
    let bestDistance = token.length > 5 ? 2 : 1;
    names.forEach((item) => {
      item.key.split(' ').forEach((part) => {
        if (part.length < 3) return;
        const distance = editDistance(token, part);
        if (distance > 0 && distance <= bestDistance) {
          best = part;
          bestDistance = distance - 1;
        }
      });
    });
    return best;
  });
  const correctedHeard = corrected.join(' ');
  const correctedMatch = names
    .filter((item) => correctedHeard.includes(item.key))
    .sort((a, b) => b.key.length - a.key.length);
  if (correctedMatch[0]) return correctedMatch[0].raw;

  return correctedHeard;
}

export function startVoiceSearch({ onText, onEnd, onError, products }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError?.('unsupported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 5;

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    if (!result) return;
    if (!result.isFinal) {
      onText?.(result[0].transcript.replace(/\s+/g, ' ').trim(), false);
      return;
    }

    let chosen = '';
    for (let index = 0; index < result.length; index += 1) {
      const term = searchTermFromSpeech(result[index].transcript, products);
      const matched = products.some(
        (product) => normalizeSpeech(product.name) === normalizeSpeech(term),
      );
      if (matched || !chosen) chosen = term || result[index].transcript.trim();
      if (matched) break;
    }
    onText?.(chosen, true);
  };

  recognition.onend = () => onEnd?.();
  recognition.onerror = (event) => onError?.(event.error);
  try {
    recognition.start();
  } catch {
    onError?.('start');
    return null;
  }
  return recognition;
}
