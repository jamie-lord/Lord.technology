/* Deterministic, real text artwork: no canvas, images or external libraries. */
(() => {
  'use strict';
  const width = 80;
  const lordBanner = [
    '██╗      ██████╗ ██████╗ ██████╗',
    '██║     ██╔═══██╗██╔══██╗██╔══██╗',
    '██║     ██║   ██║██████╔╝██║  ██║',
    '██║     ██║   ██║██╔══██╗██║  ██║',
    '███████╗╚██████╔╝██║  ██║██████╔╝',
    '╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝'
  ];
  function artwork() {
    const design = { radius: 35, height: 15 };
    const rows = design.height * 2 + 6;
    const grid = Array.from({ length: rows }, () => Array.from({ length: width }, () => ({ char: ' ', tone: '' })));
    const put = (x, y, char, tone) => { if (grid[y]?.[x]) grid[y][x] = { char, tone }; };
    const centerY = design.height + 4;
    const lobes = [
      { x: 18, y: 21, rx: 13, ry: 11 },
      { x: 28, y: 20, rx: 15, ry: 14 },
      { x: 40, y: 21, rx: 16, ry: 13 },
      { x: 52, y: 20, rx: 15, ry: 14 },
      { x: 62, y: 21, rx: 13, ry: 11 }
    ];
    const inside = (x, y) => lobes.some(lobe =>
      ((x - lobe.x) / lobe.rx) ** 2 + ((y - lobe.y) / lobe.ry) ** 2 <= 1);
    // A gently indented crown and five curved ribs give the gourd its lobes.
    for (let y = 4; y < rows - 1; y++) {
      const v = (y - centerY) / design.height;
      for (let x = 1; x < width - 1; x++) {
        const u = (x - 39.5) / design.radius;
        if (!inside(x, y)) continue;
        if (!inside(x - 1, y) || !inside(x + 1, y)) {
          const edge = y < 12 ? (u < 0 ? '.' : "'")
            : y > 30 ? (u < 0 ? '`' : "'") : u < 0 ? '(' : ')';
          put(x, y, edge, 'rind');
          continue;
        }
        if (!inside(x, y - 1) || !inside(x, y + 1)) {
          put(x, y, v < 0 ? '_' : '-', 'rind');
          continue;
        }
        const curve = Math.sqrt(Math.max(0, 1 - ((y - 20) / 15) ** 2));
        const grooves = [-25, -13, 13, 25].map(offset => 40 + offset * curve);
        const grooveDistance = Math.min(...grooves.map(groove => Math.abs(x - groove)));
        const lighting = Math.max(0, 1 - Math.abs(u + .2)) * .7;
        const grooveMark = y < 16 ? (x < 40 ? '/' : '\\') : y > 25 ? (x < 40 ? '\\' : '/') : '|';
        const texture = grooveDistance < .7 ? grooveMark : grooveDistance < 1.8 ? ':' : lighting > .6 ? '*' : lighting > .35 ? '+' : '.';
        put(x, y, texture, grooveDistance < 1.8 ? 'shade' : (x + y) % 4 === 0 && x < 50 ? 'lit-rind' : 'rind');

      }
    }
    // Fibrous olive skin, a dry cut tip and a flared base give the stalk depth.
    const stalk = ['          ____', '         /:==/', '        /:|:/', '       /:|:/', '      /:|:/', '      |:|:|', '      |:|:|', '   __./:|:\\.__', '  /::..:|:..::\\'];
    stalk.forEach((row, y) => {
      [...row].forEach((char, x) => {
        if (char === ' ') return;
        const tone = y === 0 || char === '=' ? 'stem-cut'
          : char === ':' || char === '.' ? 'stem-shadow'
          : char === '|' || char === '/' ? 'stem-highlight' : 'stem';
        put(x + 31, y, char, tone);
      });
    });
    // Map the larger original banner onto the rind, leaving its counters intact.
    for (let y = 15; y <= 25; y++) for (let x = 10; x < 70; x++) {
      const letterY = Math.floor((y - 15) / 1.75);
      const letterX = Math.floor((x - 12) / 1.71);
      if (lordBanner[letterY]?.[letterX] && lordBanner[letterY][letterX] !== ' ') put(x, y, ' ', '');
    }
    const pre = document.createElement('pre');
    pre.className = 'pumpkin-art';
    pre.setAttribute('aria-hidden', 'true');
    grid.forEach((row, y) => {
      let group = '', tone = row[0].tone;
      const append = () => {
        const span = document.createElement('span');
        if (tone) span.className = tone;
        span.textContent = group;
        pre.append(span);
      };
      row.forEach(cell => {
        if (cell.tone !== tone) { append(); group = ''; tone = cell.tone; }
        group += cell.char;
      });
      append();
      if (y < grid.length - 1) pre.append('\n');
    });
    const carving = document.createElement('pre');
    carving.className = 'pumpkin-lettering carving';
    carving.textContent = lordBanner.join('\n');
    carving.setAttribute('aria-hidden', 'true');
    const fragment = document.createDocumentFragment();
    fragment.append(pre, carving);
    return fragment;
  }
  const stage = document.querySelector('.hero .pumpkin-stage');
  if (stage) stage.replaceChildren(artwork());
})();
