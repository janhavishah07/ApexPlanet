class TicTacToe {
    constructor() {
        this.boxes = document.querySelectorAll(".box");
        this.resetBtn = document.querySelector("#reset-btn");
        this.newBtn = document.querySelector("#new-btn");
        this.msgContainer = document.querySelector(".msg-container");
        this.msg = document.querySelector("#msg");
        
        this.turnO = true; // true = O's turn, false = X's turn
        this.count = 0; // count moves to detect draw
        this.gameActive = true;
        
        // Winning patterns
        this.winPatterns = [
            [0, 1, 2], // top row
            [0, 3, 6], // left column
            [0, 4, 8], // diagonal
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [2, 4, 6], // diagonal
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.addEventListeners();
        this.resetGame();
    }
    
    addEventListeners() {
        this.boxes.forEach((box, index) => {
            box.addEventListener("click", () => this.handleBoxClick(box, index));
        });
        
        this.resetBtn.addEventListener("click", () => this.resetGame());
        this.newBtn.addEventListener("click", () => this.resetGame());
    }
    
    handleBoxClick(box, index) {
        if (!this.gameActive || box.innerText !== "") {
            return;
        }
        
        // Make move
        const currentPlayer = this.turnO ? "O" : "X";
        box.innerText = currentPlayer;
        box.classList.add(currentPlayer.toLowerCase());
        box.disabled = true;
        
        this.count++;
        
        // Check for winner
        if (this.checkWinner()) {
            this.showWinner(currentPlayer);
            return;
        }
        
        // Check for draw
        if (this.count === 9) {
            this.showDraw();
            return;
        }
        
        // Switch turn
        this.turnO = !this.turnO;
    }
    
    checkWinner() {
        for (let pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            const boxes = this.boxes;
            
            if (boxes[a].innerText !== "" && 
                boxes[a].innerText === boxes[b].innerText && 
                boxes[a].innerText === boxes[c].innerText) {
                
                // Highlight winning combination
                boxes[a].style.background = "#90EE90";
                boxes[b].style.background = "#90EE90";
                boxes[c].style.background = "#90EE90";
                
                return true;
            }
        }
        return false;
    }
    
    showWinner(winner) {
        this.gameActive = false;
        this.disableAllBoxes();
        
        this.msg.innerText = `🎉 Player ${winner} Wins! 🎉`;
        this.msg.classList.add(`winner-${winner.toLowerCase()}`);
        this.showMessage();
    }
    
    showDraw() {
        this.gameActive = false;
        this.disableAllBoxes();
        
        this.msg.innerText = "🤝 It's a Draw! 🤝";
        this.msg.classList.add("draw");
        this.showMessage();
    }
    
    showMessage() {
        this.msgContainer.classList.remove("hide");
        
        // Create a wrapper div for the message if it doesn't exist
        if (!this.msgContainer.querySelector('div')) {
            const messageDiv = document.createElement('div');
            messageDiv.appendChild(this.msg);
            messageDiv.appendChild(this.newBtn);
            this.msgContainer.appendChild(messageDiv);
        }
    }
    
    disableAllBoxes() {
        this.boxes.forEach(box => {
            box.disabled = true;
        });
    }
    
    enableAllBoxes() {
        this.boxes.forEach(box => {
            box.disabled = false;
        });
    }
    
    resetGame() {
        this.turnO = true;
        this.count = 0;
        this.gameActive = true;
        
        // Clear all boxes
        this.boxes.forEach(box => {
            box.innerText = "";
            box.classList.remove("x", "o");
            box.style.background = "";
        });
        
        // Clear message classes
        this.msg.classList.remove("winner-x", "winner-o", "draw");
        
        // Hide message container
        this.msgContainer.classList.add("hide");
        
        // Enable all boxes
        this.enableAllBoxes();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some fun animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add click sound effect (optional - requires audio file)
    const playClickSound = () => {
        // You can add an audio file here if desired
        // const audio = new Audio('click.mp3');
        // audio.play();
    };
    
    // Add visual feedback for moves
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!box.disabled && box.innerText === '') {
                box.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    box.style.transform = '';
                }, 150);
            }
        });
    });
});