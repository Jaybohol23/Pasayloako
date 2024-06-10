document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch IP information
        const infoResponse = await fetch('https://ipinfo.io/json');
        const infoData = await infoResponse.json();

        const city = infoData.city;
        const region = infoData.region;
        const country = infoData.country;
        const timezone = infoData.timezone;
        const ipAddress = infoData.ip;

        document.getElementById('ip-address').innerText = ipAddress;
        document.getElementById('location').innerText = `${city}, ${region}, ${country}`;
        document.getElementById('timezone').innerText = timezone;

        function updateTime() {
            const currentDate = new Date();
            document.getElementById('datetime').innerText = currentDate.toLocaleString('en-US', { timeZone: timezone });
        }

        updateTime();
        setInterval(updateTime, 1000);

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
