

const spinBtn = document.querySelector('#spin'); //& 스핀버튼요소
const container = document.querySelector('.container'); //& 룰렛 담어있는 div요소
const arrrow = document.querySelector('.arrow '); //& 화살표요소
const roulettes = document.querySelectorAll('.container> div'); //& 룰렛판들 
const tname = document.querySelector('.tname'); //& 룰렛 돌아갈때 화살표 사라지면서 나오는 텍스트 요소
const modal = document.querySelector('.modal'); //& 당첨자 알려주는 모달창 요소
const modaltext = document.querySelector('.modal> .modaltext'); //& 모달창안 텍스으 들어가는 요소
const closebtn = document.querySelector('.closebtn'); //& 다시하기 버튼 요소 
const mainobtn = document.querySelector('.maingobtn'); //& 메인으로 가기 버튼 요소


console.log(localStorage.getItem('haddress'));

// container.style.transform =  "rotate(-90deg)";

//^ 돌리기전 새로고침을 하면 룰렛의 숫자배치가 계속변경
//^ 룰렛이 돌아가고 다시하기 버튼을 눌러야지만 숫자재배치가 됨

//todo!  여유가 된다면..지금은 솔직히 확률이 맞다고 할수없어서 제대로된 확률을 구현해보기..
//todo!  스핀이 천천히 멈추는 효과 표현..해보기..
//todo!  당첨자 알림 효과..모달 더 꾸며보기..


//* spin.html 룰렛컨트롤
function goSpin() { //& 룰렛 돌리는 동작함수 
    container.classList.add('spingo'); //&  css에 미리 만들어놓은 .spingo 룰렛을 돌린다.
    document.querySelector('body').classList.add('howu'); //& body 배경 사이키 파파팍
    arrrow.style.display = "none"; //& 룰렛 돌아갈때는 화살표 지움
    tname.style.display = 'block'; //& 대신 돌아간다 돌아간다 텍스트 출력
    spinBtn.disabled = true; //& 스핀 버튼 여러번 계속 누르면 이게 중첩이 되서 누르면 버튼 잠궈버림.
    setTimeout(() => { //& 3초정도 있다가 멈출꺼임 룰렛 멈추는곳
        // let randNumA = [0,-45,-90,-135,-180,-225,-270,-315];
        let randNuM = Math.floor(Math.random() * roulettes.length); //& 타겟 룰렛 정하기 위한 룰랫갯수만큼 랜덤수
        container.classList.remove('spingo'); //& 룰렛 멈추기 (위에 추가한 spingo 클래스 삭제)
        document.querySelector('body').classList.remove('howu'); //& body 사이키 끄기
        // console.log(`randNuM = ${randNuM}`);
        // console.log(randNumA[randNuM]);
        // console.log(`roulettes.classList : ${roulettes[randNuM].classList[1].replace('p', '')}`);
        tname.style.display = 'none'; //& 돌아간다 텍스트 지우고
        arrrow.style.display = "block"; //& 다시 화살표 출력
        container.style.transform = "rotate(" + roulettes[randNuM].classList[1].replace('p', '') + "deg)";
        //& 룰렛을 멈출때 클래스에 있는 각도 값 구해서 그 룰렛에서 멈추기
        setTimeout(() => { //& 당첨자 출력 셋타임아웃
            // alert(`당첨자는 : ${roulettes[randNuM].innerText} 입니다!`);
            if (roulettes[randNuM].innerText != 'RE') { //& RE가 아니면 (RE 는 다시 한 번더 자동으로 돌아가는 의미)
                modaltext.textContent = `당첨자는 ${roulettes[randNuM].innerText} 입니다`; //& 당첨자 출력
                modal.style.display = 'block'; //& 모달창 등장
            } else { //& RE면
                modaltext.textContent = `다시 돌릴께요 ${roulettes[randNuM].innerText}`; 
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.style.display = 'none';
                    goSpin();
                }, 1000); //& 1초뒤 다시 돌아감
            };
        }, 100); //& 0.1초뒤 결과 출력


        //& 하다보니 갑자기 제이쿼리가 나왔는데.
        $('.closebtn').on('click',function() { //& 다시하기 버튼 누르면
            // modal.style.display = 'none';
            // location.reload(); //& 원래는 모달창만 다시 숨기려고했는데 생각해보니 자리 배치도 다시 되야하니깐 새로고침
            self['location']['reload']()
        });
        // console.log(`값 :  ${roulettes[randNuM].innerText}`)
        // console.log(`종료지점 rotate ${container.style.transform}`);
    }, 3000); //& 3초동안 룰렛 돌아감.
};


spinBtn.addEventListener('click', function () { //& 스핀 버튼 누르면 루렛 돌아감
    goSpin();
});



$('.maingobtn').on('click', function() {
    console.log("hhh");
    // const window = window.open("./main.html");
    // window.focus();
    $(location).attr('href','./spinmain.html');
})


function shuffle(arrayy) { //& 루비는  array.shuffle 있는데 JS는 따로 SHUFFLE이 없는거 같아서 퍼옴..
    arrayy.sort(() => Math.random() - 0.5);
    return arrayy;
};

function setRoulettes(nuuum) {
    let newRoulettesA = []; //& 룰렛 요소의 첫번째 클래스명들 담을 Array
    roulettes.forEach((item, index) => {
        newRoulettesA.push(item.classList[0]);
    });

    let chaA = []; //& 기존 룰렛에서 뺄거 빼고 남은 요소값을 남길 array (나중에 룰렛 참가자가 3명  3/8 = 나머지가 2  2칸이 남으니 그 2칸이 뭔지 담을)
    chaA = shuffle(newRoulettesA); //& 매번 다르게 룰렛들을 정하기 위해 shuffle하고 나온 array를 담는다.

    let shareCnt = roulettes.length / nuuum; //& 룰렛갯수 (8개) / nuuum = 인원수 (참가자)
    shareCnt = Math.floor(shareCnt); //& 소수점 짤라버리고 

    let resultA = []; //& 실제로 이제 정상적인? 룰렛에 배정될값 넣을 array 
    for (let i = 0; i < nuuum; i++) { //&& 참여 인원수 만큼 
        var saveA = [];
        for (let z = 1; z <= shareCnt; z++) { //& 베정되야하는 수만큼
            saveA.push(chaA.shift()); //& chaA에 있는 (기존 룰렛 8개)를 뺀다음 saveA에 담는다.
        };
        resultA.push(saveA); //& saveA에 담아 있는 걸 마지막에 배정된친구들 넣는 Array에 넣는다.
    };

    // console.log(resultA.length);


    let dfNum = 0; //& 디폴드 값 지정 
    for (let z = 0; z < resultA.length; z++) { //& 참여자수랑 같음 참여자 수만큼 나눴으니.
        for (let h = 0; h < resultA[z].length; h++) { //& 참여자 수에 맞게 분배된 각 요소의 클래스 값 갯수 만큼
            // console.log(resultA[z]);
            // console.log(resultA[z].length);
            // console.log(`h : ${h}`);
            if (z == dfNum) { //& 첫번째 참여자가 배당받을 값을넣기위함. 
                document.querySelector(`.${resultA[z][h]}`).textContent = z + 1; //& 해당 요소에 숫자를 쏴줌.
            } else if (z != dfNum) { //& 첫번째가 아닌사람들은 자기 인덱스 번호에 1씩 더하면 이제 착착착. 나눠서 들어감.
                document.querySelector(`.${resultA[z][h]}`).textContent = z + 1;
            };
        };
    };
    chaA.forEach((item, index) => { //& 나머지 아까 깍두기들 은 다 RE  (8/나눴을때 딱떨어지면 RE는 없음)
        document.querySelector(`.${item}`).textContent = "RE";
    });
};


let joinpppp = window.localStorage.getItem('joinppp');
setRoulettes(joinpppp);

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(key + ": " + value);
}