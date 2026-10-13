const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

function render(photos) {
  const section = { hidden: true };
  const grid = { children: [], append(...children) { this.children.push(...children); } };
  const document = {
    querySelector: (selector) => selector === '#gallery' ? section : grid,
    createElement: (tagName) => ({
      tagName, children: [],
      append(...children) { this.children.push(...children); },
    }),
  };
  const script = readFileSync(join(__dirname, '../gallery.js'), 'utf8');
  runInNewContext(script, { photos, document });
  return { section, grid };
}

test('an empty list hides the entire gallery', () => {
  const { section, grid } = render([]);
  assert.equal(section.hidden, true);
  assert.equal(grid.children.length, 0);
});

test('one photo has an accessible image, caption and link to the original', () => {
  const photo = { src: 'assets/work.jpg', alt: 'Обсуждение задачи у станка', caption: '<Проверка> & результат' };
  const { section, grid } = render([photo]);
  assert.equal(section.hidden, false);
  assert.equal(grid.children.length, 1);
  const [link, caption] = grid.children[0].children;
  const [image] = link.children;
  assert.equal(link.href, photo.src);
  assert.equal(image.src, photo.src);
  assert.equal(image.alt, photo.alt);
  assert.equal(image.loading, 'lazy');
  assert.equal(caption.textContent, photo.caption);
});

test('several photos retain their order and individual captions', () => {
  const photos = [1, 2, 3].map((i) => ({ src: `assets/${i}.jpg`, alt: `Фото ${i}`, caption: `Задача ${i}` }));
  const { grid } = render(photos);
  assert.equal(grid.children.length, 3);
  photos.forEach((photo, i) => {
    assert.equal(grid.children[i].children[0].href, photo.src);
    assert.equal(grid.children[i].children[1].textContent, photo.caption);
  });
});
