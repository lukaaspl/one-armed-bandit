class Wallet {
    constructor(money) {
        let _money = money;

        this.getFunds = () => money;

        this.hasEnoughFunds = value => (money >= value) ? true : false;

        this.changeFundsCondition = (operation, money) => {
            if (typeof money !== "number" ||
                isNaN(money) ||
                !isFinite(money)) {
                throw new Error("Invalid money property");
                return false;
            }

            switch (operation) {
                case "+":
                    return _money += money;
                    break;
                case "-":
                    return _money -= money;
                    break;
                default:
                    throw new Error("Invalid type of operation");
                    return false;
            }
        }
    }
}

const wallet = new Wallet(100);