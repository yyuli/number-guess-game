//숫자를 1-100까지 랜덤으로 골라줘야 함.
//유저가 번호를 입력하고, go라는 버튼 누름
//유저가 랜덤번호를 맞히면 맞혔습니다.
//랜덤번호 < 유저번호 Down
//랜덤번호 > 유저번호 Up
//Reset 누르면 게임 리셋
//5번의 기회를 다 쓰면 게임 끝 (더이상 추측 불가, 버튼 disable)
//유저가 1~100 범위 밖 숫자를 입력하면 알려줌. 기회 차감 X
//유저가 이미 입력한 숫자를 또 입력하면 알려줌. 기회 차감 X

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let mainImage = document.querySelector(".main-img");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];


function pickRandomNum () {
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function() {userInput.value =""});

function play () {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1-100 사이의 값을 입력해 주세요."
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 값입니다."
        return;
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}번`;

    if (userValue > computerNum) {
        resultArea.textContent ="Down!";
        mainImage.src = "https://blog.kakaocdn.net/dn/ekv1RC/btrAgosZbde/lViDM4UqxNoWrD6R0Ap621/220425%EC%9D%B4%EC%A0%9C%EC%9A%B0%EB%A6%B0_2.gif?attach=1&knm=img.gif";
    }else if (userValue < computerNum) {
        resultArea.textContent = "Up!";
        mainImage.src = "https://blog.kakaocdn.net/dn/ekv1RC/btrAgosZbde/lViDM4UqxNoWrD6R0Ap621/220425%EC%9D%B4%EC%A0%9C%EC%9A%B0%EB%A6%B0_2.gif?attach=1&knm=img.gif";
    }else {
        resultArea.textContent ="정답!";
        mainImage.src = "https://blog.kakaocdn.net/dn/ekv1RC/btrAgosZbde/lViDM4UqxNoWrD6R0Ap621/220425%EC%9D%B4%EC%A0%9C%EC%9A%B0%EB%A6%B0_2.gif?attach=1&knm=img.gif";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);


    if (chances < 1) {
        gameOver = true;
        resultArea.textContent = `정답: ${computerNum}`;
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
};

function reset() {
    userInput.value = "";
    pickRandomNum ();
    chances = 5;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    history = [];
    resultArea.textContent ="죽기 싫다면 맞혀라!";
    mainImage.src = "https://blog.kakaocdn.net/dn/ekv1RC/btrAgosZbde/lViDM4UqxNoWrD6R0Ap621/220425%EC%9D%B4%EC%A0%9C%EC%9A%B0%EB%A6%B0_2.gif?attach=1&knm=img.gif";
    gameOver = false;
    playButton.disabled = false;
};

pickRandomNum ();