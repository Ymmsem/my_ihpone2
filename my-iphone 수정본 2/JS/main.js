function updateClock() {

  // 현재 날짜와 시간 가져오기
  const now = new Date();

  // HTML 요소 선택하기
  const clock = document.querySelector(".lock-clock");
  const date = document.querySelector(".lock-date");
  const statusTime = document.querySelector(".status-time");

  // 시간 가져오기
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  statusTime.textContent = `${hours}:${minutes}`;

  // 시계 화면에 표시하기
  clock.textContent = `${hours}:${minutes}`;

  // 날짜 가져오기
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdays[now.getDay()];

  // 날짜 화면에 표시하기
  date.textContent = `${month}월 ${day}일 ${weekday}`;

}

updateClock();

// 화면 꺼짐 요소 선택
const screenoff = document.querySelector(".screen-off");

// 화면 클릭 시 켜기
screenoff.addEventListener("click", () => {

  screenoff.style.display = "none";

});

// 잠금 화면 요소 선택
const lockScreen = document.querySelector(".lock-screen");

// 암호 입력 화면 요소 선택
const passcodeScreen = document.querySelector(".passcode-screen");

// 잠금 화면 클릭 시 암호 입력 화면으로 이동
lockScreen.addEventListener("click", () => {

  passcodeScreen.style.display = "flex";
  passcodeScreen.classList.add("enter");
  
});

// 1초마다 시계 갱신
  setInterval(updateClock, 1000);

// 암호 입력 기능
// 입력된 암호를 저장할 변수
let inputPassword = "";

// 숫자 버튼 선택
const numberButtons = document.querySelectorAll(".number-button");

// 암호 표시 원 선택
const passwordDots = document.querySelectorAll(".passcode-dots span");

// 정답 암호 설정
const correctPassword = "1234";
const passcodeTitle = document.querySelector(".passcode-title");
let wrongAttempts = 0;

// 숫자 버튼 클릭 이벤트
numberButtons.forEach((button) => {

  button.addEventListener("click", () => {

    // 암호가 4자리인지 확인
    if (inputPassword.length >= 4) {
      return;
    }
    
    // 입력된 숫자 가져오기
    const number = button.textContent;

    // 암호에 숫자 추가하기
    inputPassword += number;

    // 암호 표시 업데이트
    updatePasswordDots();

    console.log(inputPassword);

    // 암호가 4자리 입력되었는지 확인
    if (inputPassword.length === 4) {

      // 입력한 암호와 정답 비교
      if (inputPassword === correctPassword) {

        // 홈 화면으로 이동
        document.querySelector(".passcode-screen").style.display = "none";
        document.querySelector(".home-screen").style.display = "block";

      } else {

        // 암호 입력 원 흔들기
        const passwordDotsContainer = document.querySelector(".passcode-dots");
        passwordDotsContainer.classList.add("shake");

        // 흔들림이 끝난 후 초기화
        setTimeout(() => {
          passwordDotsContainer.classList.remove("shake");

          inputPassword = "";
          updatePasswordDots();
        }, 300);

      }
    }

  });

});

// 암호 표시 원 업데이트
function updatePasswordDots() {

 passwordDots.forEach((dot, index) => {

  if (index < inputPassword.length) {
    dot.style.backgroundColor = "white";
  } else {
    dot.style.backgroundColor = "transparent";
  }

 });
}

// 앱 실행 테스트
