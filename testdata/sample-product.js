const sampleProductDatas = [
  {
    name: "솔송주 약주",
    price: 18000,
    category: "선물하기 좋은술",
    image: null,
    stock: 100,
    brand: "솔송주",
    description: "함양의 깨끗한 이슬을 머금은 솔송주",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "서천 한산소곡주",
    price: 39000,
    category: "선물하기 좋은술",
    image: null,
    stock: 100,
    brand: "우희열한산소곡주",
    description: "우리땅 처음술",
    volume: 1800,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 18,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "진도 홍주",
    price: 25000,
    category: "선물하기 좋은술",
    image: null,
    stock: 200,
    brand: "대대로영농조합",
    description: "진도쌀과 지초로 빚고 3년 숙성한 홍주",
    volume: 375,
    sales: 12,
    alcoholType: "리큐르",
    alcoholDegree: 38,
    manufacturedDate: "2022-05-17",
  },
  {
    name: "선운산 복분자주",
    price: 8300,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 75,
    brand: "선운산복분자주흥진",
    description: "양질의 복분자로 빚은 건강 발효주",
    volume: 375,
    sales: 55,
    alcoholType: "과실주",
    alcoholDegree: 16,
    manufacturedDate: "2021-11-12",
  },
  {
    name: "서울의 밤",
    price: 7900,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 50,
    brand: "더한",
    description: "황매실로 만든 프리미엄 매실주",
    volume: 375,
    sales: 15,
    alcoholType: "증류주",
    alcoholDegree: 25,
    manufacturedDate: "2021-11-12",
  },
  {
    name: "매실원주",
    price: 7900,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 50,
    brand: "더한",
    description: "맛있게 한잔하고 싶은 날에 찾아주세요",
    volume: 375,
    sales: 55,
    alcoholType: "리큐르",
    alcoholDegree: 25,
    manufacturedDate: "2021-11-12",
  },
  {
    name: "강냉이 막걸리",
    price: 7900,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 150,
    brand: "용두산조은술",
    description: "맑은물로 빚은 전통의 명주",
    volume: 1000,
    sales: 13,
    alcoholType: "탁주",
    alcoholDegree: 6,
    manufacturedDate: "2020-06-22",
  },
  {
    name: "명품안동소주",
    price: 19000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 50,
    brand: "명품안동소주",
    description: "프리미엄 소주 안동소주일품",
    volume: 375,
    sales: 3,
    alcoholType: "증류주",
    alcoholDegree: 19.8,
    manufacturedDate: "2021-11-12",
  },
  {
    name: "유채꽃, 제주",
    price: 12000,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 70,
    brand: "제주본초",
    description: "지역의 전통과 역사를 이어가는 바람에 산들산들 유채꽃,제주",
    volume: 365,
    sales: 7,
    alcoholType: "기타주류",
    alcoholDegree: 16,
    manufacturedDate: "2021-11-12",
  },
  {
    name: "우주멜론미",
    price: 24000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "시향가",
    description: "곡성의 머스크멜론으로 만든 달달한 스파클링 멜론 막걸리",
    volume: 300,
    sales: 15,
    alcoholType: "탁주",
    alcoholDegree: 16,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "담은",
    price: 33000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "포천일동막걸리",
    description: "마음을 담은 한잔",
    volume: 300,
    sales: 20,
    alcoholType: "탁주",
    alcoholDegree: 6.5,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "복순도가 손 막걸리",
    price: 12000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "복순도가",
    description: "막페인의 원조, 스파클링 막걸리",
    volume: 935,
    sales: 12,
    alcoholType: "탁주",
    alcoholDegree: 6.5,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "붉은 원숭이",
    price: 9000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "복순도가",
    description: "빨간맛, 궁금해 Monkey",
    volume: 935,
    sales: 34,
    alcoholType: "탁주",
    alcoholDegree: 10.8,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "백련 미스티 살균 막걸리",
    price: 4500,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "신평양조장",
    description: "연꽃이 들어간 살균 막걸리",
    volume: 700,
    sales: 10,
    alcoholType: "탁주",
    alcoholDegree: 7,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "술취한 원숭이",
    price: 9000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 100,
    brand: "복순도가",
    description: "빨간맛, 궁금해 Monkey",
    volume: 935,
    sales: 12,
    alcoholType: "탁주",
    alcoholDegree: 10.8,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "나루 생 막걸리",
    price: 7000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 200,
    brand: "한강주조",
    description: "서울의 경복궁 쌀로 빚은 첫 번째 지역 특산주 막걸리",
    volume: 935,
    sales: 22,
    alcoholType: "탁주",
    alcoholDegree: 6,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "술공방 9.0",
    price: 5000,
    category: "캠핑엔 막걸리",
    image: null,
    stock: 120,
    brand: "아리랑주조",
    description: "자연주의 스파클링막걸리",
    volume: 935,
    sales: 22,
    alcoholType: "탁주",
    alcoholDegree: 9,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "고도리 복숭아 와인",
    price: 15000,
    category: "선물하기 좋은술",
    image: null,
    stock: 120,
    brand: "고도리 와이너리",
    description: "뭐야? 주스가 아니라 술이였어?",
    volume: 535,
    sales: 32,
    alcoholType: "과실주",
    alcoholDegree: 6.5,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "혼디주",
    price: 8000,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 120,
    brand: "시트러스",
    description: "뭐야? 주스가 아니라 술이였어?",
    volume: 600,
    sales: 2,
    alcoholType: "과실주",
    alcoholDegree: 6.5,
    manufacturedDate: "2022-10-12",
  },
  {
    name: "테스트1",
    price: 18000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트2",
    price: 18000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트3",
    price: 18000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트4",
    price: 18000,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트5",
    price: 18000,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트6",
    price: 18000,
    category: "방방곡곡 전국여행",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트7",
    price: 18000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트8",
    price: 18000,
    category: "한여름밤의 하이볼",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트9",
    price: 18000,
    category: "선물하기 좋은술",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품입니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
  {
    name: "테스트10",
    price: 18000,
    category: "선물하기 좋은술",
    image: null,
    stock: 100,
    brand: "테스트",
    description: "테스트 제품 그만 만들겠습니다",
    volume: 700,
    sales: 10,
    alcoholType: "약주",
    alcoholDegree: 13,
    manufacturedDate: "2022-06-07",
  },
];

module.exports = { sampleProductDatas };
