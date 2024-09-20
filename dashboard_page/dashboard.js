// Toggle active class to show/hide sections
const dashboardContent = document.getElementById('dashboard-content');
const dashboardTable = document.getElementById('dashboard-table');
const scanSection = document.getElementById('scan');

// Function to show dashboard content
function showDashboardContent() {
    dashboardContent.classList.add('active');
    dashboardTable.classList.add('active');
    scanSection.classList.remove('active');
}

// Function to show scan section
function showScanSection() {
    scanSection.classList.add('active');
    dashboardContent.classList.remove('active');
    dashboardTable.classList.remove('active');
}

// Example: Toggle between dashboard and scan sections
const dashboardMenu = document.getElementById('dashboard-menu');
const scanMenu = document.getElementById('scan-menu');

dashboardMenu.addEventListener('click', function(e) {
    e.preventDefault();
    showDashboardContent();
});

scanMenu.addEventListener('click', function(e) {
    e.preventDefault();
    showScanSection();
});

// Your existing JavaScript code continues...
// JavaScript for handling scan functionality
const scanForm = document.getElementById('scan-form');
const targetUrlInput = document.getElementById('target-url');
const scanResultsTable = document.getElementById('scan-results-table');
const loadingAnimation = document.getElementById('loading-animation');

scanForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input value (URL to scan)
    const targetUrl = targetUrlInput.value.trim();

    // Simulate scanning process (replace with actual scanning logic)
    loadingAnimation.style.display = 'block';
    setTimeout(() => {
        const scanResults = {
            target: targetUrl,
            vulnerabilitiesFound: Math.floor(Math.random() * 10), // Random number of vulnerabilities found
            status: 'Completed',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        // Display scan results in the table
        displayScanResults(scanResults);

        // Update scan statistics
        updateScanStatistics();

        // Hide loading animation
        loadingAnimation.style.display = 'none';
    }, 3000); // Simulate 3 seconds of scanning
});

function displayScanResults(results) {
    const newRow = `
        <tr>
            <td>${scanResultsTable.rows.length + 1}</td>
            <td>${results.target}</td>
            <td>${results.vulnerabilitiesFound}</td>
            <td>${results.status}</td>
            <td>${results.date}</td>
            <td>${results.time}</td>
        </tr>
    `;

    scanResultsTable.insertAdjacentHTML('beforeend', newRow);
}

function updateScanStatistics() {
    const scansPerformedElement = document.getElementById('scans-performed');
    const vulnerabilitiesFoundElement = document.getElementById('vulnerabilities-found');

    scansPerformedElement.textContent = parseInt(scansPerformedElement.textContent) + 1;
    vulnerabilitiesFoundElement.textContent = parseInt(vulnerabilitiesFoundElement.textContent) + Math.floor(Math.random() * 10); // Update with actual vulnerabilities found
}



const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
