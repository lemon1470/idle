window.onload = function() {
      console.log("페이지가 모두 로드되었습니다.");
    };


function modeChange() { // 다크-라이트 모드 변경
    let p = document.getElementById("mode");
    if (p.textContent === "Dark") {
        p.textContent = "Light"
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";    
        document.querySelectorAll("a").forEach(link => {link.style.color = "black";});
        for (let i = 0; i < document.getElementsByClassName("schedule").length; i++) {
            document.getElementsByClassName("schedule")[i].style.border.color = "black";
        }
    }
    else {
        p.textContent = "Dark"
        document.body.style.backgroundColor = "black";
        document.body.style.color = "grey";
        document.querySelectorAll("a").forEach(link => {link.style.color = "grey";});
    }

}

function calculateWakeUpTime() {
    const sleepTime = document.getElementById("bedtime").value; // 입력 받은 취침 시각
    if (!sleepTime) { // 취침 시각이 입력되지 않았을 때
        console.log("취침시각이 입력되지 않았습니다.");
        return;
    }

    const [hourStr, minuteStr] = sleepTime.split(":"); // 시간과 분을 분리
    let hours = parseInt(hourStr, 10);
    let minutes = parseInt(minuteStr, 10);

    // 7시간 30분 더하기
    hours += 7;
    minutes += 30;

    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    hours = hours % 24;

    const newTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    document.getElementById("result").style.display = "block"; // 결과 영역을 보이게 함

    // id="wakeUpTime"에 결과 표시
    const spanElement = document.getElementById("wakeUpTime");
    spanElement.textContent = newTime;
}




