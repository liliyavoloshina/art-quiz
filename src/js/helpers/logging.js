console.log(
  `
Score: 240 / 240

✅ Стартовая страница и навигация +20
✅ Настройки +40
✅ Страница категорий +30
✅ Страница с вопросами +50
✅ Страница с результатами +50
✅ Одновременная загрузка и плавная смена изображений +10
  - пока изображения полностью не загружены отображается thumbnail
✅ Анимация +20
   1) анимация появления блоков на всех страницах (снизу вверх) и заголовка (сверху вниз)
   2) анимация таймера (изменение длины и цвета полосы в зависимости от оставшегося времени). Также, когда время истекает, индикатор времени начинает мигать
   3) появление модальных окон (после ответа на вопрос - снизу вверх, после окончания раунда - сверху вниз)
   4) при нажатии на кнопку подсказки (в artists и pictures quiz) появляется текст подсказки (в pictures quiz если подсказка не использована ранее), также добавляется эффект вокруг нажатой кнопки
   5) при нажтии на кнопку увеличения картины (в artists и pictures quiz) анимация плавного увеличения картины и оверлея
   6) при неправильном ответе к кнопке (или картине если pictures quiz) добавляется shake-эффект
   7) в модальном окне после ответа анимация правильного или неправильного индикатора (галочка и крестик)
   8) после окончания раунда, если правильных ответов больше 6 (или установлен рекорд если blitz quiz) - появляется эффект конфетти
   9) на странице с результатами при нажатии на превью картины появляется попап с инфой (zoom и rotate анимация)
✅ Дополнительный функционал на выбор +20
1) перевод приложения на два языка +5
2) разные уведомления по окончанию раунда в зависимости от результата +2
3) возможность увеличения картины (только в artists и pictures quiz). В таком режиме просмотра таймер времени ставится на паузу, после закрытия окна отсчет продолжается +5
4) добавлены подсказки (только в artists и pictures quiz):
- в artists quiz можно узнать в каком году была написана картина
- pictures quiz отображается зашифрованное имя автора (при условии, что подсказка уже не была использована в этом вопросе, т.е. можно использовать раз в четыре картины)
+5
5) мини-игра - блиц:
- вопросы генерируются рандомно
- время на ответ - 30 сек
- при неправильном ответе время уменьшается на 2 сек, при правильном увеличивается на 2 сек
- статистика сохраняется в local storage, после окончания времени показываются результаты (какая это была по счету игра, сколько правильных ответов и рекорд ли это)
+10 
`
)