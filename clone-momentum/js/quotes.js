const quotes = [
  {
    quote: "돈이 인생의 전부는 아니지만 그만한게 없다.",
    author: "권세원",
  },
  {
    quote: "일찍 일어나는 새가 피곤하다.",
    author: "권세원",
  },
  {
    quote: "일찍 일어나는 벌레가 먼저 먹힌다.",
    author: "권세원",
  },
  {
    quote: "행복을 돈으로 살 수 없다면 혹시 돈이 모자란건 아닌지 확인하라.",
    author: "권세원",
  },
  {
    quote: "내가 일으킬 수 있는 아주 작은 기적은 밍기적이다.",
    author: "권세원",
  },
  {
    quote:
      "게으른 행동에 대해 하늘이 주는 벌은 두가지이다. 하나는 자신의 실패이고, 또 다른 하나는 내가 하지 않은 일을 해낸 옆사람의 성공이다.",
    author: "줄스 레나드",
  },
  {
    quote:
      "인생은 스스로 알아서 하지 않으면 아무도 아무것도 가르쳐 주지 않는다.",
    author: "빌 게이츠",
  },
  {
    quote:
      "아침에 눈을 떠서 어제보다 나은 하루를 만들지 않으면, 실패한 것이다.",
    author: "로버트 나델리",
  },
  {
    quote:
      "단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?",
    author: "이드리스 샤흐",
  },
  {
    quote:
      "안녕하슈크림메밀생모카초코빵상아줌마징가제트디펜스폼변환상의나라에버랜드로드밸런싱싱한싱호날두크리스티아누텔라잼빵상빵상깨라까랑데뷰티풀너드라이아이스통째로씹어먹는아주멈니~!",
    author: "박우빈",
  },
  {
    quote: "대충 이런 화면에 아무 글이나 적으면 명언 같다고 하더라.",
    author: "나",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQoute = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `"${todaysQoute.quote}"`;
author.innerText = todaysQoute.author;
