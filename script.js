document.addEventListener('DOMContentLoaded', async () => {
    try {
        const apiKey = 'd276b4997e164c5ca93e37a12a8ce736'; 
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
        const data = await response.json();

        document.getElementById('ip-address').innerText = data.ip;
        document.getElementById('location').innerText = `${data.city}, ${data.state_prov}, ${data.country_name}`;
        document.getElementById('timezone').innerText = data.time_zone.name;

        //seconds running bruh
        function updateTime() {
            const currentDate = new Date();
            document.getElementById('datetime').innerText = currentDate.toLocaleString('en-US', { timeZone: data.time_zone.name });
        }

        updateTime();
        setInterval(updateTime, 1000);
    } catch (error) {
        console.error('Error fetching IP information:', error);
    }
});
