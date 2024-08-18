class Ship {
    constructor(name, hull, firepower, accuracy, image) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.image = image; 
        this.originalHull = hull; // Store the initial hull value
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
            this.totalAliens = this.aliens.length;

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
            this.alienCountNumber = document.getElementById('alien-count-number');
            this.attackSound = document.getElementById('attack-sound');
            // this.backgroundMusic = document.getElementById('background-music');
            // this.backgroundMusic.loop = true; // Ensure background music loops
            // this.backgroundMusic.volume = 0.5; // Sets volume to 50%
        } 
        showModal(gifUrl, message) {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.left = '0';
            modal.style.top = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';
        
            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.padding = '20px';
            modalContent.style.border = '1px solid #888';
            modalContent.style.textAlign = 'center';
            modalContent.style.position = 'relative';
        
            const gifImage = document.createElement('img');
            gifImage.src = gifUrl;
            gifImage.style.maxWidth = '100%';
            gifImage.style.height = 'auto';
        
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageElement.style.marginTop = '10px';
        
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.style.marginTop = '10px';
        
            modalContent.appendChild(gifImage);
            modalContent.appendChild(messageElement);
            modalContent.appendChild(closeButton);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }   
        startAnimation() {
               console.log('Starting animation');
            // this.attackBtn.classList.add('animate-move-right');
            this.playerImage.classList.add('animate-move-right');
            this.alienImage.classList.add('animate-move-right');
            
            setTimeout(() => {
                this.attackBtn.classList.remove('animate-move-right');
                this.playerImage.classList.remove('animate-move-right');
                this.alienImage.classList.remove('animate-move-right');
            }, 5000); // 5000ms = duration of the animation
        }
        updateHealthBars() {
            if (this.player && this.player.hull) {
                const playerHealthPercentage = this.player.hull / 20 * 100;
                document.getElementById('player-health-inner').style.width = `${playerHealthPercentage}%`;
            } 
            const alien = this.aliens[this.currentAlienIndex];
            if (alien && alien.hull) {
                const alienHealthPercentage = alien.hull / alien.originalHull * 100;
                document.getElementById('alien-health-inner').style.width = `${alienHealthPercentage}%`;
            }
            else {
                // Handle the case where the alien might not be defined
                document.getElementById('alien-health-inner').style.width = '0%';
            }   
        }
        testAudio() {
            this.attackSound.play().catch(error => console.error('Error playing attack sound:', error));
        }
        updateAlienCount() {
            const totalAliens = this.aliens.length;
            const remainingAliens = totalAliens - this.currentAlienIndex;
            this.alienCountNumber.textContent = `Aliens left: ${remainingAliens} / ${totalAliens}`;
        }
        // createAliens() {
        //     return [
        //         new Ship("E.T.", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://media0.giphy.com/media/Z70x1bA6mL3OM/giphy.gif?cid=6c09b952csiy1go8kkbdjf9xrk93awm8hivucdb5hwx9di8k&ep=v1_gifs_search&rid=giphy.gif&ct=g'),
        //         new Ship("Roger", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.netanimations.net/alien_56.gif'),
        //         new Ship("ExampleAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.animatedimages.org/data/media/33/animated-alien-and-extraterrestrial-image-0163.gif'),
        //         new Ship("Four_eye_Freak", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://media.tenor.com/SrJ7qdCO1LAAAAAM/space-alien.gif'),
        //         new Ship("CamoAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://cdn.dribbble.com/users/2023273/screenshots/6026642/234324.gif'),
        //         new Ship("LlamaAlien", this.generateRandomNumber(3, 6), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://cdn.pixabay.com/animation/2023/01/03/12/08/12-08-43-309_512.gif')
        //     ];
        // }
        createAliens() {
            return [
                new Ship("E.T.", this.generateRandomNumber(3, 10), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://media0.giphy.com/media/Z70x1bA6mL3OM/giphy.gif?cid=6c09b952csiy1go8kkbdjf9xrk93awm8hivucdb5hwx9di8k&ep=v1_gifs_search&rid=giphy.gif&ct=g'),
                new Ship("Roger", this.generateRandomNumber(4, 10), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.netanimations.net/alien_56.gif'),
                new Ship("ExampleAlien", this.generateRandomNumber(5, 10), this.generateRandomNumber(2, 4), this.generateRandomNumber(0.6, 0.8), 'https://www.animatedimages.org/data/media/33/animated-alien-and-extraterrestrial-image-0163.gif'),
                new Ship("Four_eye_Freak", this.generateRandomNumber(6, 10), this.generateRandomNumber(3, 4), this.generateRandomNumber(0.6, 0.8), 'https://media.tenor.com/SrJ7qdCO1LAAAAAM/space-alien.gif'),
                new Ship("CamoAlien", this.generateRandomNumber(7, 10), this.generateRandomNumber(3, 4), this.generateRandomNumber(0.6, 0.8), 'https://cdn.dribbble.com/users/2023273/screenshots/6026642/234324.gif'),
                new Ship("LlamaAlien", this.generateRandomNumber(8, 12), this.generateRandomNumber(4, 5), this.generateRandomNumber(0.7, 0.8), 'https://cdn.pixabay.com/animation/2023/01/03/12/08/12-08-43-309_512.gif')
            ];
        }
    showStartScreen() {
        document.getElementById('game').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    }
    startGame() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        this.updateImages();
        this.updateDetails();
        this.updateStatus(`Welcome to Space Battle! Your ship: ${this.player.name}. Prepare for your first opponent.`);
        this.updateAlienCount();    
    }
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    attack() {
        if (!this.aliens[this.currentAlienIndex]) {
            this.updateStatus('No alien to attack.');
            return;
        }
        const alien = this.aliens[this.currentAlienIndex];
        this.attackSound.currentTime = 0;
        this.attackSound.play().catch(error => console.error('Error playing attack sound:', error));
        this.startAnimation();
        if (alien.hull > 0) { 
            // Player attacks
            const playerHit = this.player.attack(alien);
            if (playerHit) {
                this.updateStatus(`Player attacked ${alien.name}! Successful hit. Alien hull is now ${alien.hull} .Your hull is now ${this.player.hull}`);
            } else {
                this.updateStatus(`Player attacked ${alien.name}, but missed! Alien hull is now ${alien.hull} .Your hull is now ${this.player.hull}`);
            }   
            this.updateDetails();
            this.updateHealthBars(); 
            if (alien.hull <= 0) {
                this.updateStatus(`Congratulations! ${alien.name} has been destroyed. You win this round!`);
                this.updateHealthBars(); 
                this.currentAlienIndex++;
                if (this.currentAlienIndex < this.aliens.length) {
                    this.updateImages();
                    this.updateDetails();
                    this.updateStatus(`Congratulations! ${alien.name} has been destroyed. You win this round! .Next alien: ${this.aliens[this.currentAlienIndex].name}. Prepare for battle!`);
                    this.updateHealthBars(); 
                } else {
                    this.updateStatus(`All aliens have been destroyed! You win the game!`);
                    this.attackBtn.disabled = true;
                    this.updateAlienCount(); 
                    this.updateHealthBars(); 
                    this.showModal('https://gifdb.com/images/high/gold-star-well-done-fireworks-fqthsikuto42dq7j.gif', 'Congratulations! You have defeated all the aliens and won the game!');
                    return;
                }
                this.updateAlienCount(); 
                this.updateHealthBars(); 
                return;
            }
            // Alien retaliates
            const alienHit = alien.attack(this.player);
            if (alienHit) {
                this.updateStatus(`The alien retaliates! ${alien.name} hit you. Alien hull is now ${alien.hull} .Your hull is now ${this.player.hull}`);
                this.updateHealthBars(); 
            } else {
                this.updateStatus(`The alien retaliates but misses! Alien hull is now ${alien.hull} .Your hull is now ${this.player.hull}`);
                this.updateHealthBars(); 
            }
            this.updateDetails();
            this.updateHealthBars(); 
            if (this.player.hull <= 0) {
                this.updateStatus(`Your ship has been destroyed by ${alien.name}! Game over.`);
                this.attackBtn.disabled = true;
                this.retreatBtn.disabled = true;
                this.updateHealthBars(); 
                this.showModal('https://gifdb.com/images/high/n64-game-over-q7h116ww5vxjzgv6.gif', 'Your ship has been destroyed. Game over.');
            }
        }
    }
    retreat() {
        confirm("Are you sure you want to retreat the game?");
        this.updateStatus(`You have retreated from battle. Game over.`);
        this.attackBtn.disabled = true;
        this.retreatBtn.disabled = true;
        this.updateHealthBars();
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
            this.updateAlienCount(); 
            this.updateHealthBars();
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
        this.playerName.textContent = `Your Ship: ${this.player.name}`;
        this.playerDetails.textContent = `Hull: ${this.player.hull}, Firepower: ${this.player.firepower}, Accuracy: ${(this.player.accuracy * 100).toFixed(1)}%`;

        const alien = this.aliens[this.currentAlienIndex];
        this.alienName.textContent = `Target Alien: ${alien.name}`;
        this.alienDetails.textContent = `Hull: ${alien.hull}, Firepower: ${alien.firepower}, Accuracy: ${(alien.accuracy * 100).toFixed(1)}%`;
    }
}
// Initialize the game once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpaceBattle();
});
