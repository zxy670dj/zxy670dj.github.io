// Get the back button
const backBtn = document.getElementById('backBtn');

const shapeSelect = document.getElementById('shapeSelect');
const generateBtn = document.getElementById('generateBtn');
const container = document.querySelector('.container');

const output = document.getElementById('outputText')

let isFlat = true; // Default value

// Always create the size input once
const sizeLabel = document.createElement('label');
sizeLabel.textContent = 'Radius/Size:';
const sizeInput = document.createElement('input');
sizeInput.type = 'number';
sizeInput.id = 'sizeInput';
sizeInput.value = 5;
sizeInput.min = 1;

container.appendChild(sizeLabel);
container.appendChild(sizeInput);
container.appendChild(document.createElement('br'));

// Handle dynamic orientation dropdown
shapeSelect.addEventListener('change', () => {
    // Remove previous orientation dropdown if it exists
    const oldOrient = document.getElementById('orientationSelect');
    const oldLabel = document.getElementById('orientationLabel');
    if (oldOrient) oldOrient.remove();
    if (oldLabel) oldLabel.remove();

    const value = shapeSelect.value;

    if (value === 'circle' || value === 'square') {
        // Orientation label
        const orientLabel = document.createElement('label');
        orientLabel.id = 'orientationLabel';
        orientLabel.textContent = 'Orientation:';
        orientLabel.style.marginLeft = '5px';

        // Orientation dropdown
        const orientSelect = document.createElement('select');
        orientSelect.id = 'orientationSelect';
        ['Vertical', 'Horizontal'].forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.toLowerCase();
            optionEl.textContent = opt;
            orientSelect.appendChild(optionEl);
        });

        // Update isFlat when orientation changes
        orientSelect.addEventListener('change', () => {
            isFlat = orientSelect.value === 'horizontal' || orientSelect.value === 'vertical';
        });

        container.appendChild(orientLabel);
        container.appendChild(orientSelect);

        // Set default isFlat
        isFlat = true;
    } else {
        // For cube or other shapes, orientation doesn't exist
        isFlat = false;
    }
});

// Add click event
backBtn.addEventListener('click', () => {
    // Redirect to main page
    window.location.href = '../main/index.html';
});

function midpointCircle(blockId=2,r, cx = 0, cy = 0) {
    let x = 0;
    let y = r;
    let d = 1 - r;

    let savestring = "";

    while (x <= y) {
        // Draw the eight octants
        savestring += `${blockId},,${cx + x},${cy + y},,;`;
        savestring += `${blockId},,${cx + -x},${cy + y},,;`;
        savestring += `${blockId},,${cx + x},${cy + -y},,;`;
        savestring += `${blockId},,${cx + -x},${cy + -y},,;`;
        savestring += `${blockId},,${cx + y},${cy + x},,;`;
        savestring += `${blockId},,${cx + -y},${cy + x},,;`;
        savestring += `${blockId},,${cx + y},${cy + -x},,;`;
        savestring += `${blockId},,${cx + -y},${cy + -x},,;`;
        
        x++;
        if (d < 0) {
            d += 2 * x + 3;
        } else {
            d += 2 * (x - y) + 5;
            y--;
        }
    }
    return savestring.slice(0, -1) + "???"; 
}
function ctxCircle(blockId=2,r) {
    let savestring = "";
    for (let deg = 0; deg < 360; deg++) {
        const rad = deg * (Math.PI / 180);
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);
        savestring += `${blockId},,${x},${y},,;`;
    }
    return savestring.slice(0, -1) + "???";
}

function square(blockId=2, size=5, isFlat=true) {
    let savestring = "";
    
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (isFlat) {
                savestring += `${blockId},,${x},,${y},;`;
            }
            savestring += `${blockId},,${x},${y},,;`;
        }
    }
    return savestring.slice(0, -1) + "???";
}
function cube(blockId=2, size=5) {
    let savestring = "";
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                savestring += `${blockId},,${x},${y},${z},;`;
            }
        }
    }
    return savestring.slice(0, -1) + "???";
}

generateBtn.addEventListener('click', () => {
    const shape = shapeSelect.value;
    const size = parseInt(sizeInput.value);
    let result = "";

    if (shape === "circle") result = midpointCircle(2, size);
    else if (shape === "square") result = square(2, size, isFlat);
    else if (shape === "cube") result = cube(2, size);

    output.value = result;
});