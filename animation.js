let animationFrameId;
let textElement;
let containerElement;
let x, y, speedX, speedY;
let colorIndex = 0;
const colors = [
    '#ff0000', // red
    '#ff7f00', // orange
    '#ffff00', // yellow
    '#00ff00', // green
    '#0000ff', // blue
    '#4b0082', // indigo
    '#9400d3'  // violet
];

document.getElementById('clickButton').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('animationContainer').style.display = 'block';
    startAnimation();
});

function startAnimation() {
    textElement = document.getElementById('bouncingText');
    containerElement = document.getElementById('animationContainer');
    
    // Initial position
    x = Math.random() * (containerElement.offsetWidth - textElement.offsetWidth);
    y = Math.random() * (containerElement.offsetHeight - textElement.offsetHeight);
    
    // Initial speed (pixels per frame)
    speedX = 3;
    speedY = 2.5;
    
    // Set initial position
    updatePosition();
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);
}

function updatePosition() {
    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
}

function animate() {
    // Update position
    x += speedX;
    y += speedY;
    
    // Check for collision with walls
    const rightBound = containerElement.offsetWidth - textElement.offsetWidth;
    const bottomBound = containerElement.offsetHeight - textElement.offsetHeight;
    
    // Right/left walls
    if (x > rightBound) {
        x = rightBound;
        speedX = -speedX;
        changeColor();
    } else if (x < 0) {
        x = 0;
        speedX = -speedX;
        changeColor();
    }
    
    // Top/bottom walls
    if (y > bottomBound) {
        y = bottomBound;
        speedY = -speedY;
        changeColor();
    } else if (y < 0) {
        y = 0;
        speedY = -speedY;
        changeColor();
    }
    
    // Update element position
    updatePosition();
    
    // Continue animation
    animationFrameId = requestAnimationFrame(animate);
}

function changeColor() {
    // Text already has rainbow gradient effect from CSS
    // But we can add a subtle effect on collision like changing opacity
    textElement.style.opacity = 0.7;
    setTimeout(() => {
        textElement.style.opacity = 1;
    }, 100);
}

// Ensure animation resizes properly with window
window.addEventListener('resize', function() {
    if (textElement && containerElement) {
        // Keep text within bounds after resize
        const rightBound = containerElement.offsetWidth - textElement.offsetWidth;
        const bottomBound = containerElement.offsetHeight - textElement.offsetHeight;
        
        x = Math.min(x, rightBound);
        y = Math.min(y, bottomBound);
        
        updatePosition();
    }
});