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

function setAlarm() {
    // 1. wakeUpTime에서 시와 분을 가져오기
    const wakeUpText = document.getElementById("wakeUpTime").textContent;
    if (!wakeUpText) {
        alert("먼저 기상 시간을 계산해주세요.");
        return;
    }
    const [hourStr, minuteStr] = wakeUpText.split(":");
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // 2. 현재 시간과 비교하여 알람까지 남은 시간 계산
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);

    // 만약 알람 시간이 이미 지났으면 다음 날로 설정
    if (alarmTime <= now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
    const timeDiff = alarmTime - now;

    // 3. 알람 설정(브라우저 알림)
    setTimeout(() => {
        alert(`설정한 ${hours}시 ${minutes}분에 알람입니다!`);
    }, timeDiff);

    // 4. 알람 설정 내역을 보여줄 div가 없으면 생성
    let alarmListDiv = document.getElementById("alarmList");
    if (!alarmListDiv) {
        alarmListDiv = document.createElement("div");
        alarmListDiv.id = "alarmList";
        alarmListDiv.style.marginTop = "10px";
        document.getElementById("sleepTimeContainer").appendChild(alarmListDiv);
    }

    // 5. 알람 내역 추가
    const alarmInfo = document.createElement("p");
    alarmInfo.textContent = `설정된 알람: ${hours}시 ${minutes}분`;
    alarmListDiv.appendChild(alarmInfo);
}



