class Game {
    constructor(money, simulation = false) {
        const _tokenValue = 0.00207;
        this.wallet = new Wallet(money);
        this.statistics = new Statistics();
        this.modal = new Modal();
        this.simulation = simulation;

        this.bidInput = document.getElementById("bid-input");
        this.bidFormBtn = document.getElementById("bid-btn");
        this.bidFormMsg = document.querySelector("p.bid-msg");
        this.keepBidCheckbox = document.getElementById("keep-bid");
        this.boards = document.querySelectorAll(".board");
        this.gameResult = document.querySelector(".after-game");
        this.winState = document.querySelector("span.win");
        this.winRate = document.querySelector("span.rate");
        this.funds = document.getElementById("funds");
        this.accountFunds = document.querySelector(".account-funds");
        this.accountBox = document.querySelector(".account");
        this.accountModalBox = document.querySelector("#account-content");
        this.HTMLStats = document.querySelectorAll('span[class^="stats"]');

        this.getTokenValue = () => _tokenValue;

        this.bidFormBtn.addEventListener("click", this.startGame.bind(this));
        window.addEventListener("keydown", e => {
            if (e.keyCode === 32)
                this.startGame();
        });

        this.render();
    }

    render(
        bid = 0,
        winState = null,
        winRate = null,
        boards = [],
        stats = false) {

        /* IN PROGRESS */
        // if (this.wallet.getFunds() == 0) {
        //     this.bidFormBtn.disabled = true;
        //     setTimeout(this.gameOver, 1000);
        // } 

        if (boards.length > 0) {
            this.boards.forEach((board, index) => {
                const splittedBoard = boards[index].split(";");
                board.style.backgroundColor = splittedBoard[1];
                board.innerHTML = `<img src="img/${splittedBoard[0]}.png">`;
            });
        }

        if (this.bidFormMsg.classList.contains("error"))
            this.bidFormMsg.classList.remove("error");

        this.bidFormMsg.innerHTML = "(min: 1, max: 10000)";

        if (winState === null)
            this.gameResult.innerHTML = "Spin it for the first time!";
        else {
            if (winState) {
                this.gameResult.className = "after-game green";
                this.gameResult.innerHTML = `You win! <span class="rate">+${winRate}</span> tokens`;
            } else {
                this.gameResult.className = "after-game red";
                this.gameResult.innerHTML = `You loss! <span class="rate">-${bid}</span> tokens`;
            }
        }

        this.funds.innerHTML = this.wallet.getFunds();
        this.accountFunds.innerHTML = this.wallet.getFunds();
        this.accountModalBox.innerHTML = this.renderAccountBox();

        if (!stats)
            this.HTMLStats.forEach(HTMLStat => HTMLStat.innerHTML = "-");
        else {
            const getStats = this.statistics.getStatistics();
            this.HTMLStats[0].innerHTML = getStats.wins;
            this.HTMLStats[1].innerHTML = getStats.losses;
            this.HTMLStats[2].innerHTML = getStats.totalGames;
            this.HTMLStats[3].innerHTML = getStats.turnover + '<i class="fas fa-coins coins-icon"></i>';
        }
    }

    bidFormError(content) {
        this.bidFormMsg.classList.add("error");
        this.bidFormMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${content}`;
    }

    startGame() {
        let bid;

        if (!this.simulation)
            bid = Math.floor(this.bidInput.value);
        else
            bid = Math.floor(Math.random() * 3 + 1); // simulator bids

        if (bid < 1 || bid > 10000)
            return this.bidFormError("Invalid token number!");

        if (!this.wallet.hasEnoughFunds(bid)) {
            let msg = "You have no enough funds!<br>";

            if (this.wallet.hasEnoughFunds(1))
                msg += "Reduce the rate.";
            else
                msg += "Top your account by pressing F5!";

            return this.bidFormError(msg);
        }

        this.wallet.changeFundsCondition("-", bid);

        const draw = new Draw();
        const drawnColors = draw.getDrawnColors();
        let winState = false,
            winRate = 0,
            turnover = bid;

        if (Result.hasUserWon(drawnColors)) {
            winState = true;
            winRate = Result.winRate(bid);
            turnover = bid + winRate;
            this.wallet.changeFundsCondition("+", winRate);
        }

        if (!this.keepBidCheckbox.checked)
            this.bidInput.value = "";

        this.statistics.addGameToStatistics(winState, turnover);
        this.render(bid, winState, winRate, drawnColors, true);
    }

    gameOver() {
        const elementsToHide = document.querySelectorAll(".boards, .bid-form, .game-result");
        const statisticsBar = document.querySelector(".statistics");
        const container = document.querySelector(".container");

        elementsToHide.forEach(el => {
            el.style.transition = "opacity 1s";
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.display = "none";
                statisticsBar.style.marginTop = "50px";
                container.style.justifyContent = "center";
            }, 1000);
        })
    }

    renderAccountBox() {
        const tokenValue = this.getTokenValue();
        const userFundsTokens = this.wallet.getFunds();
        const userFundsDollars = (userFundsTokens * tokenValue).toFixed(2);
        const financialBoundDollars = 20;
        const financialBoundTokens = Math.ceil(financialBoundDollars / this.getTokenValue());

        let btnAction = "disabled";

        if (userFundsTokens >= financialBoundTokens)
            btnAction = `onclick='window.location.assign("http://bit.do/withdraw-my-money")'`;

        const html =
            `<p>You got <strong><span class="account-modal-box-funds">${userFundsTokens}</span> tokens</strong> (<strong>$${userFundsDollars}</strong>).</p>
            <p>Currently <strong>1 token</strong> has value of <strong>${tokenValue} dollar</strong>.</p>
            <p>Withdrawal of funds is possible at the moment when your account is at least <strong>$${financialBoundDollars}</strong> (<strong>${financialBoundTokens} tokens</strong>).</p>
            <button class="btn" ${btnAction}>Withdraw funds</button>
            `;

        return html;
    }

    static simulate() {
        const simulator = new Game(100, true);
        setInterval(() => {
            simulator.startGame();
        }, 200);
    }
}