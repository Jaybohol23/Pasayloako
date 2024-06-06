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

        document.getElementById('ip-address').innerText = geoData.ip || infoData.ip;
        document.getElementById('location').innerText = `${city}, ${state}, ${country}`;
        document.getElementById('timezone').innerText = timezone;

        // Function to update the time every second
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
