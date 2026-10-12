// Builds the English site (repository root) from the Russian source in ru/.
// Русская версия в ru/ — исходник. Английская в корне собирается этим скриптом: node tools/build-en.js
// Перевод строк лежит в tools/dict.json (русская строка → английская; null — оставить как есть).
// Если в ru/ появилась новая русская строка без перевода, сборка остановится и перечислит такие строки.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), SRC = f => path.join(root, 'ru', f), OUT = f => path.join(root, f), R = f => fs.readFileSync(SRC(f), 'utf8');
const dict = JSON.parse(fs.readFileSync(path.join(__dirname, 'dict.json'), 'utf8'));

// ── имена персонажей и кандидатов: транслитерация
const ctx0 = {}; vm.createContext(ctx0);
vm.runInContext(R('js/data.js') + R('js/world.js') + R('js/future.js') + R('js/bulgaria.js') + R('js/germany.js') + ';this.N=[...new Set(Object.values(DUMA_P).concat(Object.values(BG).map(D=>D.P)).concat([DE_P]).flatMap(y=>Object.values(y).flat().map(p=>p[0])).concat(Object.values(PRES).flatMap(p=>p.c.map(c=>c[0]))).concat(Object.values(FUT).flat().map(e=>e.lead)))];', ctx0);
const FIRST = { 'Александр': 'Alexander', 'Алексей': 'Alexei', 'Юрий': 'Yuri', 'Эмилия': 'Emilia', 'Ксения': 'Ksenia', 'Мария': 'Maria', 'Лидия': 'Lidia', 'Пётр': 'Pyotr', 'Виктор': 'Viktor', 'Юлия': 'Yulia', 'Максим': 'Maxim', 'Кац': 'Katz', 'Гуриев': 'Guriev' };
const CH = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ж: 'zh', з: 'z', и: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya', ё: 'yo' };
const VOW = 'аеёиоуыэюяьъ';
function word(w) {
  if (FIRST[w]) return FIRST[w];
  let s = w.toLowerCase().replace(/(ий|ый)$/, '\u0001'), out = '';
  for (let i = 0; i < s.length; i++) { const c = s[i], p = s[i - 1];
    out += c === '\u0001' ? 'y' : c === 'е' ? ((i === 0 || VOW.includes(p)) ? 'ye' : 'e') : c === 'й' ? 'i' : CH[c] !== undefined ? CH[c] : c; }
  return out.charAt(0).toUpperCase() + out.slice(1);
}
// устоявшиеся английские написания, которые транслитерация не даёт
const FULL = { 'Адольф Гитлер': 'Adolf Hitler', 'Грегор Штрассер': 'Gregor Strasser', 'Отто Штрассер': 'Otto Strasser', 'Эрнст Рём': 'Ernst Röhm', 'Альфред Гугенберг': 'Alfred Hugenberg', 'Франц фон Папен': 'Franz von Papen', 'Курт фон Шлейхер': 'Kurt von Schleicher', 'Пауль фон Гинденбург': 'Paul von Hindenburg', 'Ханс фон Сект': 'Hans von Seeckt', 'Кронпринц Вильгельм': 'Crown Prince Wilhelm', 'Рупрехт Баварский': 'Rupprecht of Bavaria', 'Генрих Брюнинг': 'Heinrich Brüning', 'Конрад Аденауэр': 'Konrad Adenauer', 'Отто Вельс': 'Otto Wels', 'Отто Браун': 'Otto Braun', 'Теодор Лейпарт': 'Theodor Leipart', 'Пауль Лёбе': 'Paul Löbe', 'Эрнст Тельман': 'Ernst Thälmann', 'Генрих Брандлер': 'Heinrich Brandler', 'Эрнст Никиш': 'Ernst Niekisch', 'Эрих Людендорф': 'Erich Ludendorff', 'Ялмар Шахт': 'Hjalmar Schacht', 'Карл Гёрделер': 'Carl Goerdeler', 'Рихард Куденхове-Калерги': 'Richard Coudenhove-Kalergi', 'Теодор Хойс': 'Theodor Heuss', 'Клаус Хайм': 'Claus Heim', 'Освальд Шпенглер': 'Oswald Spengler', 'Герман Мюллер': 'Hermann Müller', 'Рудольф Гильфердинг': 'Rudolf Hilferding', 'Карл Зеверинг': 'Carl Severing', 'Рудольф Брейтшейд': 'Rudolf Breitscheid', 'Рудольф Виссель': 'Rudolf Wissell', 'Вильгельм Фрик': 'Wilhelm Frick', 'Герман Геринг': 'Hermann Göring', 'Йозеф Геббельс': 'Joseph Goebbels', 'Готфрид Федер': 'Gottfried Feder', 'Вальтер Дарре': 'Walther Darré', 'Хайнц Нойман': 'Heinz Neumann', 'Вильгельм Пик': 'Wilhelm Pieck', 'Клара Цеткин': 'Clara Zetkin', 'Герман Реммеле': 'Hermann Remmele', 'Вальтер Ульбрихт': 'Walter Ulbricht', 'Людвиг Каас': 'Ludwig Kaas', 'Йозеф Вирт': 'Joseph Wirth', 'Адам Штегервальд': 'Adam Stegerwald', 'Куно фон Вестарп': 'Kuno von Westarp', 'Эрнст Оберфорен': 'Ernst Oberfohren', 'Эрнст Шольц': 'Ernst Scholz', 'Эдуард Дингельдей': 'Eduard Dingeldey', 'Юлиус Курциус': 'Julius Curtius', 'Пауль Мольденгауэр': 'Paul Moldenhauer', 'Герман Дитрих': 'Hermann Dietrich', 'Эрих Кох-Везер': 'Erich Koch-Weser', 'Гертруда Боймер': 'Gertrud Bäumer', 'Генрих Гельд': 'Heinrich Held', 'Фриц Шеффер': 'Fritz Schäffer', 'Герман Древиц': 'Hermann Drewitz', 'Иоганн Виктор Бредт': 'Johann Viktor Bredt', 'Мартин Шиле': 'Martin Schiele', 'Карл Хепп': 'Karl Hepp', 'Вильгельм Симпфендёрфер': 'Wilhelm Simpfendörfer', 'Бойко Борисов': 'Boyko Borisov', 'Гылыб Донев': 'Galab Donev', 'Симеон II': 'Simeon II', 'Патриарх Даниил': 'Patriarch Daniil', 'Кристалина Георгиева': 'Kristalina Georgieva', 'Мария Габриел': 'Mariya Gabriel', 'Любчо Георгиевский': 'Ljubčo Georgievski', 'Асен Василев': 'Assen Vassilev', 'Радостин Василев': 'Radostin Vassilev', 'Илияна Йотова': 'Iliana Iotova', 'Джевдет Чакыров': 'Dzhevdet Chakarov', 'Хайри Садыков': 'Hayri Sadakov', 'Михаэла Доцова': 'Mihaela Dotsova', 'Александр Пулев': 'Aleksandar Pulev', 'Димитр Стоянов': 'Dimitar Stoyanov', 'Петр Петров': 'Petar Petrov', 'Лютви Местан': 'Lyutvi Mestan', 'Патриарх Алексий II': 'Patriarch Alexy II', 'Патриарх Кирилл': 'Patriarch Kirill', 'Мария Владимировна Романова': 'Maria Vladimirovna Romanova', 'Георгий Романов': 'George Romanov', 'Гарри Каспаров': 'Garry Kasparov', 'Михаил Горбачёв': 'Mikhail Gorbachev', 'Борис Березовский': 'Boris Berezovsky', 'Александр Солженицын': 'Aleksandr Solzhenitsyn', 'Нурсултан Назарбаев': 'Nursultan Nazarbayev', 'Алексей Навальный': 'Alexei Navalny', 'Анатолий Чубайс': 'Anatoly Chubais', 'Александр Руцкой': 'Alexander Rutskoy', 'Валерия Новодворская': 'Valeriya Novodvorskaya', 'Сергей Ковалёв': 'Sergei Kovalev', 'Александр Баркашов': 'Alexander Barkashov' };
const translit = n => FULL[n] || n.split(' ').map(part => part.split('-').map(word).join('-')).join(' ');
const nameMap = new Map(ctx0.N.map(n => [n, translit(n)]));

// ── замена русских фрагментов: фрагмент — кусок текста без кавычек и угловых скобок, в котором есть кириллица; комментарии не трогаются
const RUN = /[^'"<>`\n]*[А-Яа-яЁё][^'"<>`\n]*/g, isComment = s => /\/\/|\/\*|\*\//.test(s), left = new Set();
function translate(text) {
  return text.replace(RUN, m => { if (isComment(m)) return m; const core = m.trim(), a = m.indexOf(core), pre = m.slice(0, a), post = m.slice(a + core.length);
    if (nameMap.has(core)) return pre + nameMap.get(core) + post;
    if (!(core in dict)) { left.add(core); return m; }
    return dict[core] === null ? m : pre + dict[core] + post; });
}
const rep = (s, x, y, name, all) => { const n = s.split(x).length - 1; if (!n || (!all && n !== 1)) throw new Error('замена «' + name + '»: найдено ' + n); return s.split(x).join(y); };
const quotes = s => s.replace(/«/g, '“').replace(/»/g, '”');
const between = (s, a, b, y, name) => { const i = s.indexOf(a), j = s.indexOf(b, i); if (i < 0 || j < 0) throw new Error('нет метки ' + name); return s.slice(0, i) + y + s.slice(j + b.length); };

let app = quotes(translate(R('js/app.js'))), data = quotes(translate(R('js/data.js'))), world = quotes(translate(R('js/world.js'))), future = quotes(translate(R('js/future.js'))), bulgaria = quotes(translate(R('js/bulgaria.js'))), germany = quotes(translate(R('js/germany.js')));
// страница: сначала вырезать помеченные вставки (в них остаётся слово «Русский»), потом переводить остальное
let index = R('index.html');
index = between(index, '<!--redirect-->', '<!--/redirect-->', '@@REDIRECT@@', 'redirect');
index = between(index, '<!--lang-->', '<!--/lang-->', '@@LANG@@', 'lang');
index = translate(index);
index = index.replace('@@REDIRECT@@', "<script>try{var w=localStorage.getItem('duma-sim-lang');if(!w&&/^ru/i.test(navigator.language||''))w='ru';if(w==='ru')location.replace('ru/index.html');}catch(e){}</script>")
  .replace('@@LANG@@', "<a class=\"lang\" href=\"ru/index.html\" lang=\"ru\" onclick=\"try{localStorage.setItem('duma-sim-lang','ru')}catch(e){}\">Русский</a>");
index = rep(index, '<html lang="ru">', '<html lang="en">', 'lang');
index = rep(index, '"../', '"', 'пути к общим файлам', true);
if (left.size) { console.error('Нет перевода в tools/dict.json для строк (' + left.size + '):\n' + [...left].map(s => JSON.stringify(s)).join('\n')); process.exit(1); }

// правила английского: множественное число, точка в дробях, сортировка, своё хранилище, разбор процента из описания партии
app = rep(app, "const plural=(n,a,b,c)=>{ const m=Math.abs(n)%100, k=m%10; return m>10&&m<20?c:k===1?a:k>=2&&k<=4?b:c; };", "const plural=(n,a,b,c)=>Math.abs(n)===1?a:c; // English: singular for 1, plural otherwise (the middle form is unused)", 'plural');
app = rep(app, ".replace('.',',')", "", 'десятичная запятая', true);
app = rep(app, ",'ru'))", ",'en'))", 'сортировка');
app = rep(app, "/По списку — ([\\d,]+)%/", "/Party-list vote: ([\\d.]+)%/", 'процент по списку', true);
app = rep(app, "const KEY='svoy-parlament-v5', PKEY='svoy-parlament-presets';", "const KEY='duma-simulator-en-v1', PKEY='duma-simulator-en-presets';", 'ключи хранилища');

// ── ключи фотографий и логотипов: те же имена и названия, что в переведённых данных
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(R('js/photos.js') + R('js/logos.js'), ctx);
const remap = (o, f, what) => { const r = {}; Object.keys(o).forEach(k => { const nk = f(k); if (nk === undefined || nk === null) throw new Error('нет перевода ключа ' + what + ': ' + k); r[nk] = o[k]; }); return r; };
const pName = k => nameMap.get(k) || translit(k), lName = k => dict[k]; // снимок без персонажа в данных остаётся под транслитерированным именем
const PH = remap(ctx.window.PHOTO, pName, 'фото'), PHS = remap(ctx.window.PHOTO_SRC, pName, 'фото'), LG = remap(ctx.window.LOGO, lName, 'лого'), LGS = remap(ctx.window.LOGO_SRC, lName, 'лого');

fs.writeFileSync(OUT('js/app.js'), app); fs.writeFileSync(OUT('js/data.js'), data); fs.writeFileSync(OUT('js/world.js'), world); fs.writeFileSync(OUT('js/future.js'), future); fs.writeFileSync(OUT('js/bulgaria.js'), bulgaria); fs.writeFileSync(OUT('js/germany.js'), germany); fs.writeFileSync(OUT('index.html'), index);
fs.writeFileSync(OUT('js/photos.js'), '// Character photos: free images from Wikipedia and Wikimedia Commons. Author and licence of each image are in PHOTO_SRC.\nwindow.PHOTO=' + JSON.stringify(PH) + ';\nwindow.PHOTO_SRC=' + JSON.stringify(PHS) + ';\n');
fs.writeFileSync(OUT('js/logos.js'), '// Party logos: images from Wikimedia Commons. Author and licence of each file are in LOGO_SRC.\nwindow.LOGO=' + JSON.stringify(LG) + ';\nwindow.LOGO_SRC=' + JSON.stringify(LGS) + ';\n');

// ── credits.html
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const row = (n, x) => '<li>' + esc(n) + ': <a href="https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(x[0].replace(/ /g, '_')) + '">' + esc(x[0]) + '</a>' + (x[1] ? ', author: ' + esc(x[1]) : '') + (x[2] ? ', licence: ' + esc(x[2]) : '') + '</li>';
fs.writeFileSync(OUT('credits.html'), '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Duma Simulator — sources</title>\n<style>body{font:15px/1.5 system-ui,sans-serif;max-width:860px;margin:0 auto;padding:24px 20px;color:#151a2b;background:#fff}li{margin:3px 0;overflow-wrap:anywhere}h2{margin-top:28px}</style>\n</head>\n<body>\n<h1>Sources</h1>\n<p>The questions of the standard test and the method of dividing party-list seats come from the Spanish test “Tu hemiciclo” (<a href="https://objetivo176.es/test">objetivo176.es/test</a>). The chamber diagram is drawn by the <a href="https://github.com/geoffreybr/d3-parliament">d3-parliament</a> library (MIT licence). Region outlines come from Natural Earth open data.</p>\n<h2>Photos</h2>\n<p>Images from Wikipedia and Wikimedia Commons under free licences.</p>\n<ul>\n' + Object.keys(PHS).sort().map(n => row(n, PHS[n])).join('\n') + '\n</ul>\n<h2>Party logos</h2>\n<ul>\n' + Object.keys(LGS).sort().map(n => row(n, LGS[n])).join('\n') + '\n</ul>\n<p><a href="./">← Back to the test</a></p>\n</body>\n</html>\n');

const cyr = s => s.split('\n').filter(l => /[А-Яа-яЁё]/.test(l) && !isComment(l)).length;
console.log('English build written. Cyrillic lines outside comments: app ' + cyr(app) + ', data ' + cyr(data) + ', world ' + cyr(world) + ', index ' + cyr(index) + ' (index keeps the word «Русский» on the language switch)');
