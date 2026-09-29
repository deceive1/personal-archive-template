'use strict';

// 页面结构与交互代码。个人资料仅维护 content.js。
const content = window.resumeContent;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const lines = value => escapeHTML(value).replace(/\n/g, '<br>');
const tags = values => values.map(value => `<span>${escapeHTML(value)}</span>`).join('');
const put = (id, html) => { document.getElementById(id).innerHTML = html; };

// 仅接收站内相对路径、锚点及 HTTP(S) 链接，防止把内容误当成脚本。
function safeURL(value) {
  const url = String(value ?? '').trim();
  if (!url || /[\\\u0000-\u0020]/.test(url)) return '';
  if (/^https?:\/\//i.test(url)) {
    try { return new URL(url).href; } catch { return ''; }
  }
  if (url.startsWith('/') || url.includes(':') || url.split('/').includes('..')) return '';
  return url;
}
function imageTag(src, alt, className = '', extra = '') {
  return `<img src="${escapeHTML(safeURL(src) || 'assets/portrait.svg')}" alt="${escapeHTML(alt)}" class="${className}" ${extra}>`;
}
function externalLink(title, url) {
  const target = safeURL(url);
  return target ? `<a href="${escapeHTML(target)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)} ↗</a>` : '';
}

const p = content.profile;
document.title = p.title;
document.querySelector('meta[name="description"]').content = p.description;
document.querySelector('link[rel="icon"]').href = safeURL(p.logo) || 'assets/logo.svg';
document.getElementById('brand').setAttribute('aria-label', `${p.name}，返回首页`);
put('brand', `${imageTag(p.logo, '', 'brand-logo', 'width="42" height="42"')}<span>${escapeHTML(p.name)}<small>${escapeHTML(p.englishName)}</small></span>`);
put('headerNote', `<i></i> ${escapeHTML(p.status)}`);
put('about', `
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="hero-photo">${imageTag(p.portrait, p.portraitAlt, '', 'width="1080" height="1440" fetchpriority="high"')}<div class="photo-coordinate" aria-hidden="true">PERSONAL ARCHIVE<br>${escapeHTML(p.archiveLabel)}</div></div>
  <div class="hero-copy"><p class="eyebrow"><span class="blue-square"></span> 个人档案 <span>/</span> THE PERSON BEHIND THE WORK</p>
    <h1 id="heroTitle">${escapeHTML(p.name)}<span>${escapeHTML(p.englishName)}</span></h1>
    <h2>${lines(p.headline)}</h2><p class="hero-description">${lines(p.introduction)}</p>
    <div class="hero-tags">${tags(p.tags)}</div>
    <div class="hero-actions"><a class="button primary" href="#projects">探索我的实践 <span>↗</span></a><a class="button text-button" href="#contact">联系 / 简历 <span>↓</span></a></div>
  </div>
  <div class="hero-bottom"><span>${escapeHTML(p.educationLine)}</span><a href="#profile">向下探索 <span>↓</span></a></div>`);
put('profile', `<div class="overview-intro"><span class="micro">PROFILE / OVERVIEW</span><h2>把不同的经历，<br>连接成自己的能力。</h2><p>在这里，了解我的关注与实践。</p></div>` + content.overview.map((item, index) => `
  <a class="overview-card ${index === 1 ? 'blue-card' : ''}" href="${escapeHTML(safeURL(item.href) || '#about')}"><span class="micro">${escapeHTML(item.label)}</span><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.text)}</p><span class="overview-foot">${escapeHTML(item.foot)} <b>↗</b></span></a>`).join(''));
put('aboutContent', `<div><h2 id="aboutTitle">${lines(p.aboutTitle)}</h2><div class="identity">${imageTag(p.avatar, `${p.name}的头像`, '', 'width="108" height="144" loading="lazy"')}<div><strong>${escapeHTML(p.name)} <span>/ ${escapeHTML(p.englishName)}</span></strong><p>${escapeHTML(p.degree)}<br>${escapeHTML(p.school)}</p></div></div></div><div class="about-story">${p.biography.map(text => `<p>${escapeHTML(text)}</p>`).join('')}<a class="inline-link" href="#experience">查看完整经历 <span>↗</span></a></div>`);
put('facts', content.facts.map(item => `<div><strong>${escapeHTML(item.value)}<span>${escapeHTML(item.unit)}</span></strong><p>${escapeHTML(item.label)}</p><small>${escapeHTML(item.note)}</small></div>`).join(''));
put('skillCards', content.skills.map(item => `<article class="capability"><span class="cap-number">${escapeHTML(item.label)}</span><div class="cap-symbol" aria-hidden="true">${escapeHTML(item.symbol)}</div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><ul>${item.items.map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ul><a href="${escapeHTML(safeURL(item.href) || '#projects')}">相关实践 <span>→</span></a></article>`).join(''));

const categoryLabels = Object.fromEntries(content.categories.map(item => [item.id, item.label]));
categoryLabels.all = '全部';
put('filters', `<button class="active" data-filter="all" aria-pressed="true">全部 <span>${String(content.projects.length).padStart(2, '0')}</span></button>` + content.categories.map(item => `<button data-filter="${escapeHTML(item.id)}" aria-pressed="false">${escapeHTML(item.label)}</button>`).join(''));
document.getElementById('filterStatus').textContent = `显示全部 ${content.projects.length} 个项目`;
const projectData = Object.fromEntries(content.projects.map((project, index) => [project.id, {
  ...project, kicker: `PROJECT ${String(index + 1).padStart(2, '0')} / ${project.date}`,
  links: project.links.map(([title, url]) => [title, safeURL(url)]).filter(([, url]) => url)
}]));
put('projectCards', content.projects.map((item, index) => {
  const art = ['oa', 'timer', 'home', 'lock'].includes(item.art) ? item.art : 'oa';
  return `<article class="project-card" data-category="${escapeHTML(item.category)}"><div class="project-art ${art}-art" aria-hidden="true"><div class="art-top"><span>${String(index + 1).padStart(2, '0')} / SELECTED WORK</span><span>${escapeHTML(item.coverLabel)}</span></div><div class="template-cover"><span>${escapeHTML(item.coverWord)}</span><i></i></div><div class="art-bottom"><span>IDEA / PROCESS / RESULT</span><span>+</span></div></div><div class="project-content"><div class="project-type">${escapeHTML(item.date)}<span>${escapeHTML(item.role)}</span></div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><div class="project-tags">${tags(item.tags)}</div><button class="project-open" data-project="${escapeHTML(item.id)}">查看项目档案 <span>↗</span></button></div></article>`;
}).join(''));
put('experienceEntries', content.experience.map(item => `<article class="experience-entry"><div class="entry-date"><span>${escapeHTML(item.date)}</span><span>${escapeHTML(item.location)}</span></div><h3>${escapeHTML(item.organization)}<span>${escapeHTML(item.role)}</span></h3><p class="entry-summary">${escapeHTML(item.summary)}</p>${item.details.length ? `<div class="experience-details">${item.details.map(([title, body]) => `<div><h4>${escapeHTML(title)}</h4><p>${escapeHTML(body)}</p></div>`).join('')}</div>` : ''}</article>`).join(''));
const education = content.education;
put('educationContent', `<article class="school"><span class="micro">EDUCATION / ${escapeHTML(education.period)}</span><h3>${lines(education.school)}</h3><p>${escapeHTML(education.degree)}</p><span class="school-code" aria-hidden="true">${escapeHTML(education.code)}</span></article><div class="campus-list">${education.activities.map((item, index) => `<article><span class="campus-index">${String(index + 1).padStart(2, '0')}</span><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div></article>`).join('')}</div>`);
const honors = content.honors;
if (honors.featured || honors.items.length) {
  put('honorsContent', `<div class="honors-heading"><h3>荣誉与认证</h3><span class="micro">RECOGNITION / QUALIFICATIONS</span></div><div class="honors">${honors.featured ? `<article class="honor-feature"><span class="award-icon" aria-hidden="true">✳</span><div><span class="micro">${escapeHTML(honors.featured.label)}</span><h4>${escapeHTML(honors.featured.title)}</h4><p>${escapeHTML(honors.featured.description)}</p></div></article>` : ''}<div class="honor-list">${honors.items.map(item => `<div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.detail)}</span></div>`).join('')}</div></div>`);
}
const contact = content.contact;
const contactRow = (label, value, protocol, copyLabel) => value ? `<div><span class="micro">${label}</span><a href="${protocol}:${escapeHTML(encodeURIComponent(value))}">${escapeHTML(value)} ↗</a><button class="copy-button" data-copy="${escapeHTML(value)}" aria-label="${copyLabel}">复制</button></div>` : '';
const resumes = contact.resumes.filter(item => safeURL(item.file));
put('contactContent', `<div><p class="eyebrow">每一段新的经历，从一次交流开始。</p><h2 id="contactTitle">${lines(contact.headline)}</h2><p class="contact-description">${lines(contact.description)}</p><div class="contact-links">${contactRow('EMAIL', contact.email, 'mailto', '复制邮箱')}${contactRow('PHONE', contact.phone, 'tel', '复制电话号码')}</div></div><aside class="resume-panel" aria-label="简历下载"><div class="resume-header"><span class="micro">DOCUMENT ARCHIVE</span><span aria-hidden="true">↓</span></div><h3>更多经历，<br>从简历开始。</h3><p>${resumes.length ? '选择查看或下载 PDF 简历。' : '简历即将更新，欢迎先浏览项目与经历。'}</p>${resumes.map(item => `<a class="resume-link" href="${escapeHTML(safeURL(item.file))}" download="${escapeHTML(item.downloadName || 'resume.pdf')}"><div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.description)}</span></div><span>PDF ↓</span></a>`).join('')}<div class="resume-previews">${resumes.map(item => `<a class="resume-preview" href="${escapeHTML(safeURL(item.file))}" target="_blank" rel="noopener noreferrer">查看${escapeHTML(item.title)} <span>↗</span></a>`).join('')}</div></aside>`);
put('githubLink', externalLink('GitHub', contact.github));
put('footer', `<span>© ${new Date().getFullYear()} ${escapeHTML(p.name)} / ${escapeHTML(p.englishName)}</span><span>PERSONAL ARCHIVE — ALWAYS IN PROGRESS</span><span>${escapeHTML(p.footerNote)}</span>`);

// 下方保留导航、筛选、弹窗与复制交互。
const menuButton = document.getElementById('menuBtn');
const nav = document.getElementById('siteNav');
function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航');
}
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!event.target.closest('.topbar')) closeMenu(); });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const navLinks = [...nav.querySelectorAll('a')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollPending = false;
function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progressBar').style.width = `${scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0}%`;
  let current = navSections[0];
  for (const section of navSections) if (section.getBoundingClientRect().top <= 150) current = section;
  if (scrollable > 0 && window.scrollY >= scrollable - 3) current = navSections.at(-1);
  navLinks.forEach(link => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
function requestScrollUpdate() { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); } }
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
window.addEventListener('load', updateScroll);
updateScroll();

const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; if (!card.hidden) count++; });
  document.getElementById('filterStatus').textContent = `显示${categoryLabels[filter] || filter} ${count} 个项目`;
  requestScrollUpdate();
}));

const dialog = document.getElementById('projectModal');
let modalTrigger = null;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const data = projectData[button.dataset.project];
  if (!data) return;
  modalTrigger = button;
  document.getElementById('modalKicker').textContent = data.kicker;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSummary').textContent = data.summary;
  const details = document.getElementById('modalDetails');
  details.replaceChildren();
  data.details.forEach(([title, body]) => {
    const section = document.createElement('section'); section.className = 'modal-detail';
    const heading = document.createElement('h3'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = body;
    section.append(heading, paragraph); details.append(section);
  });
  document.getElementById('modalTags').replaceChildren(...data.tags.map(tag => {
    const item = document.createElement('span'); item.textContent = tag; return item;
  }));
  document.getElementById('modalLinks').replaceChildren(...data.links.map(([title, url]) => {
    const link = document.createElement('a'); link.textContent = title; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; return link;
  }));
  closeMenu(); dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('modal-open');
}));
dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
let backdropPress = false;
dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
dialog.addEventListener('click', event => {
  if (event.target === dialog && backdropPress) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
  backdropPress = false;
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); modalTrigger?.focus({ preventScroll: true }); });

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast'); clearTimeout(toastTimeout);
  toast.textContent = message; toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(button.dataset.copy); showToast('已复制到剪贴板');
  } catch { showToast('复制未成功，请长按或选中联系方式复制'); }
}));

