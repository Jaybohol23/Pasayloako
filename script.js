document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ipinfoToken = '60117f9430a2b5';

        // Fetch IP information
        const infoResponse = await fetch(`https://ipinfo.io/json?token=${ipinfoToken}`);
        const infoData = await infoResponse.json();

        const city = infoData.city;
        const state = infoData.region;
        const country = infoData.country;
        const timezone = infoData.timezone;
        const ipAddress = infoData.ip;

        document.getElementById('ip-address').innerText = ipAddress;
        document.getElementById('location').innerText = `${city}, ${state}, ${country}`;
        document.getElementById('timezone').innerText = timezone;

        function updateTime() {
            const currentDate = new Date();
            document.getElementById('datetime').innerText = currentDate.toLocaleString('en-US', { timeZone: timezone });
        }

        updateTime();
        setInterval(updateTime, 1000);

        // Visitor count logic
        const visitorCountKey = 'visitorCount';
        let visitorCount = localStorage.getItem(visitorCountKey);

        if (!visitorCount) {
            visitorCount = 0;
        }

        visitorCount = parseInt(visitorCount) + 1;
        localStorage.setItem(visitorCountKey, visitorCount);

        document.getElementById('visitor-count').innerText = visitorCount;

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

function toggleVisitorCount() {
    const visitorCountDisplay = document.getElementById('visitor-count-display');
    if (visitorCountDisplay.style.display === 'none' || visitorCountDisplay.style.display === '') {
        visitorCountDisplay.style.display = 'block';
    } else {
        visitorCountDisplay.style.display = 'none';
    }
}
