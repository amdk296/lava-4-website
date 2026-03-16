let blobs = [];

function setup() {
  createCanvas(400, 600);
  clear(); // Make the background transparent

  // Create a few blobs
  for (let i = 0; i < 25; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      size: random(30, 70),
      speedY: random(0, 1),
      speedX: random(-2, 0),
      offset: random(100) // For smooth horizontal movement
    });
  }
}

function draw() {
  clear(); // Keep the background transparent

  // Darker, more organic color
  fill(0, 180); // Nearly black with a bit of transparency
  noStroke();

  // Update and draw each blob
  for (let blob of blobs) {
    // Horizontal movement using a sine wave for smooth effect
    blob.x += sin(frameCount * 0.01 + blob.offset) * 0.5;
    blob.y += blob.speedY;

    // Reverse direction if it goes off screen
    if (blob.y > height || blob.y < 0) {
      blob.speedY *= -1;
    }
    if (blob.x > width || blob.x < 0) {
      blob.speedX *= -1;
    }

    // Repel from the mouse position with stronger force
    let dx = blob.x - mouseX;
    let dy = blob.y - mouseY;
    let distance = sqrt(dx * dx + dy * dy);
    let maxDistance = 100;
    let force = map(distance, 0, maxDistance, 40, 0);
    if (distance < maxDistance && distance > 0) {
      blob.x += force * dx / distance * 0.1;
      blob.y += force * dy / distance * 0.1;
    }

    ellipse(blob.x, blob.y, blob.size);
  }
}