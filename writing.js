'use strict';
const books = window.WRITING_BOOKS || [];
function el(tag, cls, text) {
 const node = document.createElement(tag);
 if (cls) node.className = cls;
 if (text !== undefined) node.textContent = text;
 return node;
}
function unitUrl(book, unit) { return './unit.html?book=' + encodeURIComponent(book.id) + '&unit=' + encodeURIComponent(unit.id); }
function resourceUrl(value) {
 if (typeof value !== 'string' || !value.trim()) return null;
 try {
  const url = new URL(value, location.href);
  return ['https:', 'http:'].includes(url.protocol) || (url.protocol === 'file:' && value.startsWith('./')) ? value : null;
 } catch { return null; }
}
function linkRow(title, href) {
 const row = el('a', 'page-link'); row.href = href;
 const icon = el('span', 'file-icon', '▤'); icon.setAttribute('aria-hidden', 'true');
 row.append(icon, el('span', 'link-title', title)); return row;
}
if (document.body.dataset.page === 'home') {
 for (const book of books) {
  const section = el('section', book.standalone ? 'book-section standalone' : 'book-section');
  if (!book.standalone) section.append(el('h2', '', book.title));
  for (const unit of book.units) section.append(linkRow(unit.title, unitUrl(book, unit)));
  document.querySelector('#book-list').append(section);
 }
} else {
 const params = new URLSearchParams(location.search);
 const book = books.find(item => item.id === params.get('book'));
 const unit = book?.units.find(item => item.id === params.get('unit'));
 const content = document.querySelector('#unit-content');
 if (!unit) {
  document.querySelector('#unit-title').textContent = '페이지를 찾을 수 없어요';
  content.append(el('p', 'notice', '교재 목차에서 학습할 Unit을 다시 선택해 주세요.'));
 } else {
  document.title = unit.title + ' · Writing Jack';
  document.querySelector('#unit-title').textContent = unit.title;
  document.querySelector('#book-label').textContent = book.title;
  document.querySelector('#breadcrumb').textContent = book.title;
  if (unit.heading) content.append(el('h2', 'chapter-heading', unit.heading));
  if (unit.videos?.length) {
   const section = el('section', 'videos'); section.setAttribute('aria-label', '학습 영상');
   for (const video of unit.videos) {
    const figure = el('figure', 'video-item'); const url = resourceUrl(video.url);
    if (url) {
     if (video.type === 'link') { section.append(linkRow(video.title + ' ↗', url)); continue; }
     const player = el('video', 'video-player'); player.controls = true; player.preload = 'metadata'; player.src = url;
     player.append(document.createTextNode('이 브라우저에서는 영상을 재생할 수 없습니다.'));
     figure.append(player);
    } else {
     const placeholder = el('div', 'video-placeholder');
     const symbol = el('span', 'play-symbol', '▷'); symbol.setAttribute('aria-hidden', 'true');
     placeholder.append(symbol, el('strong', '', video.title), el('span', '', '영상 준비 중')); figure.append(placeholder);
    }
    figure.append(el('figcaption', '', video.title + (video.duration ? ' · ' + video.duration : ''))); section.append(figure);
   }
   content.append(section);
  }
  if (unit.files?.length) {
   const section = el('section', 'attachments'); section.setAttribute('aria-label', 'PDF 학습 자료');
   for (const file of unit.files) {
    const url = resourceUrl(file.url);
    const row = url ? linkRow(file.title, url) : el('div', 'page-link pending-file');
    if (!url) row.append(el('span', 'file-icon', '▤'), el('span', '', file.title));
    row.append(el('span', 'file-size', file.size || ''));
    if (!url) row.append(el('span', 'badge', '준비 중'));
    section.append(row);
   }
   content.append(section);
  }
  for (const activity of unit.activities || []) {
   const section = el('section', 'activity'); const heading = el('h2', 'activity-heading');
   heading.append(el('span', '', 'ACTIVITY ' + activity.number), el('span', 'activity-title', activity.title)); section.append(heading);
   if (!activity.resources?.length) section.append(el('p', 'quiet', '학습 활동을 준비하고 있어요.'));
   for (const resource of activity.resources || []) {
    section.append(el('p', 'resource-label', '(' + (resource.label || 'activity') + ')'));
    const url = resourceUrl(resource.url); const card = el(url ? 'a' : 'div', 'resource-card');
    if (url) card.href = url;
    const art = el('div', 'resource-art', resource.label?.includes('quiz') ? 'Q' : 'Aa'); art.setAttribute('aria-hidden', 'true');
    const info = el('div', 'resource-info'); info.append(el('span', 'resource-kind', 'WRITING ACTIVITY'), el('h3', '', resource.title), el('p', '', url ? '눌러서 학습 활동 시작하기' : '웹앱을 준비하고 있어요.'));
    card.append(art, info, el('span', url ? 'open-arrow' : 'badge', url ? '↗' : '준비 중')); section.append(card);
   }
   content.append(section);
  }
  if (!unit.heading && !unit.activities?.length && !unit.videos?.length && !unit.files?.length) content.append(el('p', 'notice', '이 페이지의 학습 자료를 준비하고 있어요.'));
  const nav = document.querySelector('#unit-nav'); const index = book.units.indexOf(unit);
  if (index > 0) nav.append(linkRow('← 이전 Unit', unitUrl(book, book.units[index - 1])));
  nav.append(linkRow('교재 목차', './index.html'));
  if (index < book.units.length - 1) nav.append(linkRow('다음 Unit →', unitUrl(book, book.units[index + 1])));
 }
}