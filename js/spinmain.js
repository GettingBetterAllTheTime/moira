//* mainspin.html 게임진행 도움말, 참여인원설정
localStorage.removeItem("joinppp");
console.log(localStorage.getItem('haddress'));

const helpbtn = document.querySelector('#Helpbtn'); //^ 도움말 버튼 요소
const helpmodal = document.querySelector('.helpmodal'); //^ 도움말 창 요소
const closemodala = document.querySelector('.closemodala'); //^ 도움말 창 닫기 버튼 요소

//^ 도움말 보기
helpbtn.addEventListener('click', function () {
    helpmodal.style.display = 'block';
});

//^ 도움말 닫기
closemodala.addEventListener('click', function () {
    helpmodal.style.display = 'none';
});

const joinppbtns = document.querySelectorAll('.join> button'); //^ 참가인원 라인의 버튼들 (1명 2명 3명 ....직접입력) 요소
let siblings = t => [...t.parentElement.children].filter(e => e != t); //^ 선택된 this 요소 외 나머지 요소확인

let joinP = 0; //^ 참가인원 확인
const gogame = document.querySelector('.nextbtn'); //^ 게임진행버튼
const checkPmodal = document.querySelector('.checkP')

//^ 인원선택 버튼 눌르고 게임진행 함수
function checkjoinbtngogame() {
    joinppbtns.forEach(((item, index) => { //^ 참가인원 버튼들을 for문 돌면서
        item.addEventListener('click', function (e) { //^ 버튼이 클릭되었을때
            e.target.style.backgroundColor = 'crimson';//^ 해당 버튼 배경색 변경
            siblings(e.target).forEach((item, index) => { //^ 해당버튼 제외하고 나머진친구들 for 돌아
                if (item.classList == 'inwon') { //^ inwon은 타이틀인데 이친구까지 배경 바꺼서 if 걸음
                } else {
                    item.style.backgroundColor = 'white'; //^ 누른버튼 제외하고 나머지는 색상 화이트로 그럼 누른것만 핑크색
                };
            });
            joinP = e.target.textContent;  //^ 해당 버튼의 벨류값
            joinP = joinP.split("")[0]; //^ 뒤에 명 빼고 
        });
    }));
};

//^ 게임진행 참여인원 확인 및 진행.
gogame.addEventListener('click', function (e) {
    // console.log(`joinp ::: ${joinP}`);
    // console.log(`joinP2 : ${joinP}`);
    if (joinP == 0) { //^ 버튼 클릭안하면 0임 그래서 인원수 안정했으면
        e.preventDefault() //^ 페이지 이동막기
        checkPmodal.style.display = 'block';
        setTimeout(() => {
            checkPmodal.style.display = '';
        }, 1200);
    } else {
        window.localStorage.setItem('joinppp', joinP);
    };
});

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(key + ": " + value);
}

checkjoinbtngogame();