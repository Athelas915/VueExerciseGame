var vm = new Vue({
    el: "#app",
    data: {
        gameRunning: false,
        playerHealthVal: 100,
        monsterHealthVal: 100,
        logList: []
    },
    methods: {
        randomRange: (a, b) => Math.floor((Math.random() * (b + 1 - a) + a)),
        startGame: function () {
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logList = [];
        },
        endGame: function (message = "") {
            this.gameRunning = false;
            if (message != "") {
                if (window.confirm(`${message} Start a new game?`)) {
                    this.startGame();
                }
            }
        },
        createLog: function (message, isPlayer) {
            this.logList.unshift({
                isPlayer: isPlayer,
                message: message
            })
        },
        attack: function () {
            var dmg = this.randomRange(5, 10);
            this.monsterHealth -= dmg;
            this.createLog(`PLAYER HITS MONSTER FOR ${dmg}`, true);
        },
        specialAttack: function () {
            var dmg = this.randomRange(10, 15);
            this.monsterHealth -= dmg;
            this.createLog(`PLAYER HITS MONSTER FOR ${dmg}`, true);
        },
        heal: function () {
            var heal = 10;
            this.playerHealth += heal;
            this.createLog(`PLAYER HEALS FOR ${heal}`, true);
        },
        giveUp: function () {
            this.endGame("You gave up!")
        },
        monsterAttack: function () {
            var dmg = this.randomRange(7, 12);
            this.playerHealth -= dmg;
            this.createLog(`MONSTER HITS PLAYER FOR ${dmg}`, false);
        }
    },
    computed: {
        playerHealthbarStyle: function () {
            return {
                width: (Math.max(this.playerHealth, 0)) + '%'
            }
        },
        monsterHealthbarStyle: function () {
            return {
                width: (Math.max(this.monsterHealth, 0)) + '%'
            }
        },
        playerHealth: {
            get: function () {
                return this.playerHealthVal;
            },
            set: function (value) {
                if (value <= 0) {
                    this.endGame("You lost!");
                }
                this.playerHealthVal = Math.min(100, value)
            }
        },
        monsterHealth: {
            get: function () {
                return this.monsterHealthVal;
            },
            set: function (value) {
                if (value <= 0) {
                    this.endGame("You won!");
                }
                this.monsterHealthVal = Math.min(100, value)
            }
        }
    },
    watch: {
        logList: function (value) {
            if (value.length > 0 && value[0].isPlayer && this.gameRunning === true) this.monsterAttack();
        }
    }
});