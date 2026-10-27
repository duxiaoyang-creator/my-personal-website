const body=document.body;
const themeToggle=document.querySelector('#theme-toggle');
const menuToggle=document.querySelector('#menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
const savedTheme=localStorage.getItem('dxy-theme');
if(savedTheme) body.dataset.theme=savedTheme;
function updateThemeIcon(){themeToggle.innerHTML=body.dataset.theme==='light'?'<i class="fa-solid fa-moon"></i>':'<i class="fa-solid fa-sun"></i>';themeToggle.setAttribute('aria-label',body.dataset.theme==='light'?'切换深色主题':'切换浅色主题')}
updateThemeIcon();
themeToggle.addEventListener('click',()=>{body.dataset.theme=body.dataset.theme==='light'?'dark':'light';localStorage.setItem('dxy-theme',body.dataset.theme);updateThemeIcon()});
menuToggle.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>'}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count);let current=0;const step=Math.max(1,Math.ceil(target/24));const timer=setInterval(()=>{current=Math.min(current+step,target);el.textContent=current+'+';if(current>=target)clearInterval(timer)},45)});countObserver.unobserve(entry.target)}),{threshold:.45});
const stats=document.querySelector('.stats-grid');if(stats)countObserver.observe(stats);
