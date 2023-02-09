//^ sect1

$(function(){
    $('.sect1> .nextbtn').on('click', function() {
        $('.sect1').css('display', 'none');
        $('.sect2').css('display', 'block');
    })


})


let joinppbtns = document.querySelectorAll('.join> button'); //^ 참가인원 라인의 버튼들 (1명 2명 3명 ....직접입력) 요소
let winnerppbtns = document.querySelectorAll('.winner> button'); //^ 담첨인원 라인의 버튼들 (1명 2명 3명... 직접입력) 요소
let nextbtn = document.querySelector('.sect2> .innerbox> .nextbtn'); //^ 인원석택 화면의 다음으로 이동 버튼 요소 
let siblings = t => [...t.parentElement.children].filter(e => e != t); //^ 선택된 this 요소 외 나머지 요소확인
let joinpp = ""; //^ 참가자인원수 들어갈 변수
let winnerpp = ""; //^ 당첨자인원수 들어갈 변수
let joininput = document.querySelector('.join> .joininput'); //^ 참가인원 직접입력 버튼 눌렀을때 입력창 요소
let winnerinput = document.querySelector('.winner> .winnerinput'); //^ 당첨인원 직접입력 버튼 눌렀을때 입력창 요소

let joininputvalue = document.querySelector('.join> .joininput> #joininput'); //^ 실제 참가인원의 input 태그 
let winnerinputvalue = document.querySelector('.winner> .winnerinput> #winnerinput'); //^ 실제 당첨인원의 input 태그

let jcheckjik = ""; //^ 참가인원 버튼을 눌렀는지 확인하기 위한 값을 넣을 변수
let wcheckjik = ""; //^ 당첨인원 버튼을 눌렀는지 확인하기 위한 값을 넣을 변수

//& 참가인원 버튼 눌렀을때 작동. 인원수 확인
function checkjoinbtn() {
    joinppbtns.forEach(((item, index) => { //^ 참가인원 버튼들을 for문 돌면서
        item.addEventListener('click', function(e){ //^ 버튼이 클릭되었을때
            e.target.style.backgroundColor  = "deeppink"; //^ 해당 버튼의 배경색상을 변경
            let joinvalue = e.target.textContent; //^ 해당 버튼의 벨류값을 담는다.
            console.log(`joinvalue : ${joinvalue}`);
            jcheckjik = joinvalue.split("")[0];     //^ 해당 버튼의 벨류값을 ""으로 나눠서 (1명 2명 이런식)['1','명'] 이렇게 된거에 첫번째 값
            console.log(`jcheckjik : ${jcheckjik}`);
            if (jcheckjik != '직') { //^ 해당 버튼의 벨류값의 첫번째 값이 직이 아니면 즉 숫자면
                joinpp = jcheckjik; //^ 참가자인원수 에  참가자 인원수 넣기 변수명이 쫌 애매하네요 ..
                joininput.style.display = "none"; //^ 직접 적으려다가 다시 다른버튼 눌렀을때 직접입력 버튼 숨기기
            } else { //^ 직 이면
                joininput.style.display = "block"; //^ 직접입력 버튼 보이기
            };
        });        
    }));
};


//^ 위 checkjoinbtn 함수와 동일
//& 당첨인원버튼 눌렀을때 작동. 인원수 확인
function checkwinnerbtn() {
    winnerppbtns.forEach(((item, index) => {
        item.addEventListener('click', function(e){
            e.target.style.backgroundColor = "greenyellow";
            let winvalue = e.target.textContent;
            console.log(`winvalue : ${winvalue}`);
            wcheckjik = winvalue.split("")[0];    
            if (wcheckjik != '직') {
                winnerinput.style.display = "none";
                winnerpp = wcheckjik;
            } else {
                winnerinput.style.display = "block";
            };
        });        
    }));
};


let signal = ""; //^ 값이 두개다 들어왔는지 (참여인원, 당첨인원) 신호를 담을 변수
//& 다음 버튼을 눌렀을때 인원수 입력이 다되었으면 다음 페이지로 넘기거나 그다음 행동 하는 함수
nextbtn.addEventListener('click', function() {
    

    console.log(joininput.style.display);
    console.log(winnerinput.style.display);

    if (joininput.style.display != 'none') { //^ 참가인원 직접입력input 이 보이면
        joinpp = joininputvalue.value; //^ input 태그에 입력한 값이 참가인원
        console.log(`안쪽 : ${joinpp}`);
    }  else {
        joinpp = joinpp; //^ 아니면 원래 선택한 버튼의 인원수 대로
    }

    if (winnerinput.style.display != 'none') { //^ 이건 당첨인원 위와 같음.
        winnerpp = winnerinputvalue.value;
        console.log(`안쪽2 : ${winnerpp}`);
    } else {
        winnerpp = winnerpp;
    }

    
//& 인원수 선택을 다했는지 확인하는 함수
function checkbtnvalue(app, bpp) { //^ 참가 , 당첨 인원 값을 받아서 두 곳에 다 값이 들어왔는지 확인 이부분에 문자열 들어오면 false로 하는 부분 추가할게요
    console.log(`app : ${app} bpp : ${bpp}`);
    if (app != "" && bpp != "") { //^ 두 곳다 공백이 아니면 
        return true; //^ true를 리턴
    } else {
        return false; //^ 하나라도 비여있는데 false
    };
};



signal = checkbtnvalue(joinpp, winnerpp); //^  실제 참가인원, 당첨인원 을 보내 시그널을 받는다.
if (signal == true) { //^ 시그널이 true 면 값이 다들어온것이니 섹션3으로 넘어가거나 다음 행동을 한다.
    console.log(`signal : ${signal}`);
    console.log(`joinpp : ${joinpp} winnerpp : ${winnerpp}`);
    //& 여기서 다음 섹션을 보이게 할지 아님 페이지 이동을 할지..
    
    document.querySelector('.sect3').style.display = 'block';
    document.querySelector('.sect1').style.display ="none";
    document.querySelector('.sect2').style.display ="none";
} else {

};
});



checkjoinbtn();
checkwinnerbtn();