document.addEventListener('DOMContentLoaded', function () {

    // DOM elements
    const periodicTable = document.getElementById('periodicTable');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const randomBtn = document.getElementById('random-btn');
    const elementDetails = document.getElementById('elementDetails');
    const closeDetails = document.getElementById('closeDetails');
    const overlay = document.getElementById('overlay');

    // Create periodic table
    function createPeriodicTable() {
        periodicTable.innerHTML = '';

        // Create empty spaces to match periodic table layout
        for (let i = 1; i < 1; i++) {
            periodicTable.appendChild(createEmptySpace());
        }

        // Create elements
        elements.forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.className = `element ${element.category}`;
            elementDiv.dataset.number = element.number;
            elementDiv.dataset.name = element.name.toLowerCase();
            elementDiv.dataset.symbol = element.symbol.toLowerCase();
            elementDiv.dataset.category = element.category;

            elementDiv.innerHTML = `
                <div class="number">${element.number}</div>
                <div class="symbol">${element.symbol}</div>
                <div class="name">${element.name}</div>
            `;

            elementDiv.addEventListener('click', () => showElementDetails(element));
            periodicTable.appendChild(elementDiv);
        });

        // Add more empty spaces if needed for layout
        // for (let i = 6; i < 58; i++) {
        //     periodicTable.appendChild(createEmptySpace());
        // }
        for (let i = 0; i < 16; i++) {
            periodicTable.appendChild(createEmptySpace());
        }
    }

    function createEmptySpace() {
        const emptySpace = document.createElement('div');
        emptySpace.className = 'empty-space';
        return emptySpace;
    }

    // Show element details
    function showElementDetails(element) {
        document.getElementById('detailSymbol').textContent = element.symbol;
        document.getElementById('detailSymbol').className = `detail-symbol detail-${element.category}`;
        document.getElementById('detailName').textContent = element.name;
        document.getElementById('detailNumber').textContent = `Atomic Number: ${element.number}`;

        document.getElementById('detailSymbolText').textContent = element.symbol;
        document.getElementById('detailAtomicWeight').textContent = element.atomicWeight;
        document.getElementById('detailCategory').textContent = formatCategory(element.category);
        document.getElementById('detailGroup').textContent = element.group;
        document.getElementById('detailPeriod').textContent = element.period;
        document.getElementById('detailBlock').textContent = element.block;

        document.getElementById('detailPhase').textContent = element.phase;
        document.getElementById('detailDensity').textContent = element.density;
        document.getElementById('detailMeltingPoint').textContent = element.meltingPoint;
        document.getElementById('detailBoilingPoint').textContent = element.boilingPoint;

        document.getElementById('detailElectronConfig').textContent = element.electronConfig;
        document.getElementById('detailElectronegativity').textContent = element.electronegativity !== null ? element.electronegativity : 'N/A';
        document.getElementById('detailAtomicRadius').textContent = element.atomicRadius;
        document.getElementById('detailIonizationEnergy').textContent = element.ionizationEnergy;

        document.getElementById('detailDiscoveredBy').textContent = element.discoveredBy;
        document.getElementById('detailDiscoveryYear').textContent = element.discoveryYear;
        document.getElementById('detailNamedBy').textContent = element.namedBy;

        elementDetails.classList.add('active');
        overlay.classList.add('active');
    }

    function formatCategory(category) {
        const words = category.split('-');
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Close details
    closeDetails.addEventListener('click', () => {
        elementDetails.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        elementDetails.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const elements = document.querySelectorAll('.element');

        elements.forEach(element => {
            const number = element.dataset.number;
            const name = element.dataset.name;
            const symbol = element.dataset.symbol;

            if (number.includes(searchTerm) || name.includes(searchTerm) || symbol.includes(searchTerm)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter elements
            const elements = document.querySelectorAll('.element');
            elements.forEach(element => {
                if (category === 'all' || element.dataset.category === category) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    });

    // Random element
    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * elements.length);
        showElementDetails(elements[randomIndex]);
    });

    

    // Initialize
    createPeriodicTable();
});