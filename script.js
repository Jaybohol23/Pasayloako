document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        document.getElementById('ip-address').innerText = data.ip;
        document.getElementById('location').innerText = `${data.city}, ${data.region}, ${data.country_name}`;
        document.getElementById('timezone').innerText = data.timezone;

        // Function to update the time every second
        function updateTime() {
            const currentDate = new Date();
            document.getElementById('datetime').innerText = currentDate.toLocaleString('en-US', { timeZone: data.timezone });
        }

        updateTime();
        setInterval(updateTime, 1000);
    } catch (error) {
        console.error('Error fetching IP information:', error);
    }
});
