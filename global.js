// global.js
console.log('IT’S ALIVE!');

// 선택자 $$ 함수 (배열 반환)
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// 페이지 정보 배열
const pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'CV & Resume' },
  { url: 'https://github.com/samsooseo', title: 'GitHub' }
];

// <nav> 생성 후 body 맨 위에 추가
let nav = document.createElement('nav');
document.body.prepend(nav);

// BASE_PATH 정의 (로컬 / GitHub Pages 구분)
const BASE_PATH =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'             // 로컬 서버
    : '/Lab-2/';      // GitHub Pages repo 이름

// 페이지 링크 반복 생성
for (let p of pages) {
  // 상대 경로 처리
  let url = !p.url.startsWith('http') ? BASE_PATH + p.url : p.url;

  // <a> 요소 생성
  let a = document.createElement('a');
  a.href = url;
  a.textContent = p.title;

  // 현재 페이지면 current 클래스 추가
  a.classList.toggle('current', a.host === location.host && a.pathname === location.pathname);

  // 외부 링크는 새 탭으로 열기 + 보안 옵션
  if (a.host !== location.host) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  // nav에 추가
  nav.append(a);
}

// 모든 nav 링크 배열 확인 (선택적)
const navLinks = $$("nav a");
console.log(navLinks);


// Dark Mode 관련 내용//

document.body.insertAdjacentHTML(
  'afterbegin',
  `
<label class="color-scheme">
  Theme:
  <select>
    <option value="light dark">Automatic</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>
`
);

// select 요소 가져오는 코드
const select = document.querySelector('.color-scheme select');

// 페이지 로드 시 localStorage 값 적용 코드
if ('colorScheme' in localStorage) {
  const saved = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', saved);
  select.value = saved;
  console.log('loaded color scheme from localStorage:', saved);
}

select.addEventListener('input', (event) => {
  const value = event.target.value;
  if (value === 'light dark') {
    document.documentElement.style.removeProperty('color-scheme'); // 자동 OS 모드
  } else {
    document.documentElement.style.setProperty('color-scheme', value); // light/dark
  }
  localStorage.colorScheme = value; // 여기서 저장
});

const saved = localStorage.colorScheme || 'light dark'; // 저장된 값 없으면 자동
document.documentElement.style.setProperty(
  'color-scheme',
  saved === 'light dark' ? '' : saved
);
select.value = saved;