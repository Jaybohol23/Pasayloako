document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ipgeolocationApiKey = 'd276b4997e164c5ca93e37a12a8ce736'; // Replace with your ipgeolocation.io API key
        const ipinfoToken = '60117f9430a2b5'; // Replace with your ipinfo.io token

        const [geoResponse, infoResponse] = await Promise.all([
            fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocationApiKey}`),
            fetch(`https://ipinfo.io/json?token=${ipinfoToken}`)
        ]);

        const geoData = await geoResponse.json();
        const infoData = await infoResponse.json();

        // Combine data from both APIs
        const city = geoData.city || infoData.city;
        const state = geoData.state_prov || infoData.region;
        const country = geoData.country_name || infoData.country;
        const timezone = geoData.time_zone.name || infoData.timezone;
        const ipAddress = geoData.ip || infoData.ip;

        document.getElementById('ip-address').innerText = ipAddress;
        document.getElementById('location').innerText = `${city}, ${state}, ${country}`;
        document.getElementById('timezone').innerText = timezone;

        // Function to update the time every second
        function updateTime() {
            const currentDate = new Date();
            document.getElementById('datetime').innerText = currentDate.toLocaleString('en-US', { timeZone: timezone });
        }

        updateTime();
        setInterval(updateTime, 1000);

        // Store IP address in local storage (or you can store it in a database)
        let ipList = JSON.parse(localStorage.getItem('ipList')) || [];
        if (!ipList.includes(ipAddress)) {
            ipList.push(ipAddress);
            localStorage.setItem('ipList', JSON.stringify(ipList));
        }

        // Load IP addresses in chunks
        let currentPage = 0;
        const itemsPerPage = 10;

        function loadMoreIPs() {
            const ipListElement = document.getElementById('ip-list');
            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;
            const ipsToShow = ipList.slice(start, end);

            ipsToShow.forEach(ip => {
                const li = document.createElement('li');
                li.innerText = ip;
                ipListElement.appendChild(li);
            });

            currentPage++;
            if (end >= ipList.length) {
                document.getElementById('load-more').style.display = 'none';
            }
        }

        // Initial load
        loadMoreIPs();

    } catch (error) {
        console.error('Error fetching IP information:', error);
    }
});

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.container');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    toggleMenu();
}

function promptPassword() {
    const passwordPrompt = document.getElementById('password-prompt');
    passwordPrompt.style.display = 'flex';
}

function closePasswordPrompt() {
    const passwordPrompt = document.getElementById('password-prompt');
    passwordPrompt.style.display = 'none';
}

function validatePassword() {
    const password = document.getElementById('password').value;
    if (password === 'chilladmin') {
        showSection('ip-list-section');
    } else {
        alert('Invalid password. Please try again.');
    }
    closePasswordPrompt();
}
