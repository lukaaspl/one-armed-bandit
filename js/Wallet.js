class Wallet {
    constructor(money) {
        let _money = money;

        this.getFunds = () => (_money <= 0) ? 0 : _money;

        this.setFunds = value => _money = value;

        this.hasEnoughFunds = value => (_money >= value) ? true : false;

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