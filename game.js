// Biến toàn cục
let balance = 1000;
let currentBet = 0;
let resultHistory = [];  // Lịch sử kết quả (tối đa 10 ván)

// Lấy các phần tử DOM
const betBigBtn = document.getElementById("bet-big");
const betSmallBtn = document.getElementById("bet-small");
const placeBetBtn = document.getElementById("place-bet");
const betAmountInput = document.getElementById("bet-amount");
const rollDiceBtn = document.getElementById("roll-dice");
const diceContainer = document.getElementById("dice-container");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const balanceDisplay = document.getElementById("balance");
const messageDisplay = document.getElementById("message");
const diceResult = document.getElementById("dice-result");
const resultHistoryList = document.getElementById("result-history");

// Xử lý khi người chơi cược Tài
betBigBtn.addEventListener("click", function() {
    currentBet = 100;
    messageDisplay.textContent = "Bạn đã cược Tài!";
    updateBalance();
});

// Xử lý khi người chơi cược Xỉu
betSmallBtn.addEventListener("click", function() {
    currentBet = 100;
    messageDisplay.textContent = "Bạn đã cược Xỉu!";
    updateBalance();
});

// Đặt cược số tiền
placeBetBtn.addEventListener("click", function() {
    let betAmount = parseInt(betAmountInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Vui lòng nhập số tiền cược hợp lệ!");
        return;
    }
    currentBet = betAmount;
    messageDisplay.textContent = `Bạn đã đặt cược ${currentBet} tiền!`;
    updateBalance();
});

// Cập nhật số dư
function updateBalance() {
    balanceDisplay.textContent = `Tiền: ${balance}`;
}

// Quay xúc xắc mỗi 60 giây
setInterval(function() {
    rollDice();
}, 60000); // Mỗi 60 giây

// Quay xúc xắc
function rollDice() {
    if (currentBet === 0) {
        messageDisplay.textContent = "Vui lòng cược trước khi quay!";
        return;
    }

    diceResult.textContent = "Đang quay xúc xắc...";
    messageDisplay.textContent = "";

    // Thêm hiệu ứng quay xúc xắc
    dice1.classList.add("dice-spin");
    dice2.classList.add("dice-spin");
    dice3.classList.add("dice-spin");

    setTimeout(function() {
        // Xác định kết quả xúc xắc
        let diceValues = [getRandomDice(), getRandomDice(), getRandomDice()];
        let sum = diceValues.reduce((a, b) => a + b, 0);

        // Hiển thị kết quả xúc xắc
        dice1.textContent = diceValues[0];
        dice2.textContent = diceValues[1];
        dice3.textContent = diceValues[2];

        // Kiểm tra kết quả cược
        let result = sum >= 11 && sum <= 18 ? "Tài" : (sum >= 3 && sum <= 10 ? "Xỉu" : "Không hợp lệ");
        diceResult.textContent = `Kết quả: ${sum} (${result})`;

        // Cập nhật số dư tiền cược
        if ((result === "Tài" && currentBet === 100) || (result === "Xỉu" && currentBet === 100)) {
            balance += currentBet * 2;
            messageDisplay.textContent = "Bạn thắng!";
        } else {
            balance -= currentBet;
            messageDisplay.textContent = "Bạn thua!";
        }

        // Cập nhật lại số dư
        updateBalance();

        // Lưu kết quả vào lịch sử, giới hạn 10 ván
        resultHistory.push({ sum, result });
        if (resultHistory.length > 10) {
            resultHistory.shift();  // Xóa kết quả ván cũ nhất khi đạt 10 ván
        }
        updateResultHistory();

        // Xóa hiệu ứng quay xúc xắc
        dice1.classList.remove("dice-spin");
        dice2.classList.remove("dice-spin");
        dice3.classList.remove("dice-spin");
    }, 1000); // Đợi 1 giây để kết thúc hiệu ứng quay
}

// Hàm sinh giá trị xúc xắc ngẫu nhiên
function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Cập nhật lịch sử kết quả
function updateResultHistory() {
    resultHistoryList.innerHTML = "";
    resultHistory.forEach(result => {
        let li = document.createElement("li");
        li.textContent = `Kết quả: ${result.sum} - ${result.result}`;
        resultHistoryList.appendChild(li);
    });
}
