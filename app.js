class Ship {
    constructor(name, hull, firepower, accuracy, image) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.image = image; 
    }
    attack(target) {
        const hit = Math.random() < this.accuracy;
        if (hit) {
            target.hull -= this.firepower;
        }
        return hit;
    }
}
class SpaceBattle {
    constructor() {
        // Initialize player and aliens
        this.initializeGame();
        this.setupEventListeners();
        this.showStartScreen();
    }
        setupEventListeners() {
            // Add user interaction listener
        //    document.addEventListener('click', () => this.testAudio());
            this.attackBtn.addEventListener('click', () => this.attack());
            this.retreatBtn.addEventListener('click', () => this.retreat());
            this.startBtn.addEventListener('click', () => this.startGame());
            this.resetBtn.addEventListener('click', () => this.resetGame());
            }

        initializeGame() {
            this.player = new Ship("USS Assembly",20,5, 0.7,'https://giffiles.alphacoders.com/576/57614.gif');
            this.aliens = this.createAliens();
            this.currentAlienIndex = 0;
    
            this.statusEl = document.getElementById('status');
            this.attackBtn = document.getElementById('attackBtn');
            this.retreatBtn = document.getElementById('retreatBtn');
            this.startBtn = document.getElementById('startBtn');
            this.resetBtn = document.getElementById('resetBtn');
            this.playerImage = document.getElementById('player-image');
            this.alienImage = document.getElementById('alien-image');
            this.playerDetails = document.getElementById('player-details');
            this.alienDetails = document.getElementById('alien-details');
            this.playerName = document.getElementById('player-name');
            this.alienName = document.getElementById('alien-name');

             // Get reference to the audio elements
            this.attackSound = document.getElementById('attack-sound');
            // this.backgroundMusic = document.getElementById('background-music');
            // this.backgroundMusic.loop = true; // Ensure background music loops
            // this.backgroundMusic.volume = 0.5; // Sets volume to 50%
        }
        testAudio() {
            // Try to play audio manually
            this.attackSound.play().catch(error => console.error('Error playing attack sound:', error));
         //   this.backgroundMusic.play().catch(error => console.error('Error playing background music:', error));
        }
        createAliens() {
            return [
                new Ship("E.T.", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://media0.giphy.com/media/Z70x1bA6mL3OM/giphy.gif?cid=6c09b952csiy1go8kkbdjf9xrk93awm8hivucdb5hwx9di8k&ep=v1_gifs_search&rid=giphy.gif&ct=g'),
                new Ship("Roger", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.netanimations.net/alien_56.gif'),
                new Ship("ExampleAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.animatedimages.org/data/media/33/animated-alien-and-extraterrestrial-image-0163.gif'),
                new Ship("Four_eye_Freak", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://media.tenor.com/SrJ7qdCO1LAAAAAM/space-alien.gif'),
                new Ship("CamoAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://cdn.dribbble.com/users/2023273/screenshots/6026642/234324.gif'),
                new Ship("LlamaAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://cdn.pixabay.com/animation/2023/01/03/12/08/12-08-43-309_512.gif')
            ];
        }
    showStartScreen() {
        document.getElementById('game').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    }
    startGame() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game').style.display = 'flex';

    // Update status and images
    this.updateImages();
    this.updateDetails();
    this.updateStatus(`Welcome to Space Battle! Your ship: ${this.player.name}. Prepare for your first opponent.`);

     // Play background music
    // this.backgroundMusic.play().catch(error => console.error('Error playing background music:', error));
      
    }
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    attack() {
        const alien = this.aliens[this.currentAlienIndex];

       // Play attack sound
        this.attackSound.currentTime = 0; // Reset to the start
        this.attackSound.play().catch(error => console.error('Error playing attack sound:', error));

        if (alien.hull > 0) { 
            // Player attacks
            const playerHit = this.player.attack(alien);
            if (playerHit) {
                this.updateStatus(`Player attacked ${alien.name}! Successful hit. Alien hull now ${alien.hull}`);
            } else {
                this.updateStatus(`Player attacked ${alien.name}, but missed!`);
            }
            // Update details after player attack
            this.updateDetails();
            if (alien.hull <= 0) {
                this.updateStatus(`Congratulations! ${alien.name} has been destroyed. You win this round!`);
                this.currentAlienIndex++;
                if (this.currentAlienIndex < this.aliens.length) {
                    this.updateImages();
                    this.updateDetails();
                    this.updateStatus(`Next alien: ${this.aliens[this.currentAlienIndex].name}. Prepare for battle!`);
                } else {
                    this.updateStatus(`All aliens have been destroyed! You win the game!`);
                    this.attackBtn.disabled = true;
                      // Add an alert to notify the player of the win
                    confirm("Congratulations! You have defeated all the aliens and won the game!");
                    return;
                }
                return;
            }
            // Alien retaliates
            const alienHit = alien.attack(this.player);
            if (alienHit) {
                this.updateStatus(`The alien retaliates! ${alien.name} hit you. Your hull is now ${this.player.hull}`);
            } else {
                this.updateStatus(`The alien retaliates but misses!`);
            }
            // Update details after alien attack
            this.updateDetails();

            if (this.player.hull <= 0) {
                this.updateStatus(`Your ship has been destroyed by ${alien.name}! Game over.`);
                this.attackBtn.disabled = true;
                this.retreatBtn.disabled = true;
            }
        }
    }
    retreat() {
        this.updateStatus(`You have retreated from battle. Game over.`);
        this.attackBtn.disabled = true;
        this.retreatBtn.disabled = true;
    }
    resetGame() {
        const confirmReset = confirm("Are you sure you want to reset the game?");
        if (confirmReset) {
            this.initializeGame();
            this.updateImages();
            this.updateDetails();
            this.updateStatus(`Game has been reset. Prepare for battle!`);
            this.attackBtn.disabled = false;
            this.retreatBtn.disabled = false;
        }
    }
    updateStatus(message) {
        this.statusEl.textContent = message;
    }

    updateImages() {
        this.playerImage.src = this.player.image;
        this.alienImage.src = this.aliens[this.currentAlienIndex].image;
    }

    updateDetails() {
        // Update player details
        this.playerName.textContent = `Your Ship: ${this.player.name}`;
        this.playerDetails.textContent = `Hull: ${this.player.hull}, Firepower: ${this.player.firepower}, Accuracy: ${(this.player.accuracy * 100).toFixed(1)}%`;

        // Update alien details
        const alien = this.aliens[this.currentAlienIndex];
        this.alienName.textContent = `Target Alien: ${alien.name}`;
        this.alienDetails.textContent = `Hull: ${alien.hull}, Firepower: ${alien.firepower}, Accuracy: ${(alien.accuracy * 100).toFixed(1)}%`;
    }
}

// Initialize the game once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpaceBattle();
});
