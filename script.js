document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ip = '136.158.63.54';
        const response = await fetch(`https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/ip?ipnum=${ip}`);
        const data = await response.json();

        document.getElementById('ip-address').innerText = data.ip;
        document.getElementById('location').innerText = `${data.city}, ${data.region}, ${data.country}`;
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
