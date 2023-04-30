const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchKey = document.getElementById("searchKey").value
    const data = await weatherConnect(searchKey)
    DomManupilation(data)
    
    
    
})


const weatherConnect = async (searchKey) => {
    try {
        const msg = document.getElementById('msg')
        msg.style.opacity = 0
        const requestURL = `https://api.weatherapi.com/v1/current.json?key=1b9044b798a941d9a1d91210233004&q=${searchKey}`
        const request = new Request(requestURL)
    
        const myObj = {}
        const response = await fetch(request)
        const data = await response.json()
        myObj['condition'] = data.current.condition.text
        myObj['location'] = `${data.location.name}, ${data.location.country}`
        myObj['temp'] = data.current.temp_c
        myObj['feelsLike'] = data.current.feelslike_c
        myObj['wind'] = data.current.wind_kph
        myObj['humidity'] = data.current.humidity
    
        return myObj
    } catch(err) {
        console.log("Error")
        const msg = document.getElementById('msg')
        msg.style.opacity = 1
    }
}

const DomManupilation = (data) => {
    const condition = document.querySelector('.condition')
    const city = document.querySelector('.city')
    const temp = document.querySelector('#temp')
    const feelsLike = document.querySelector('#feelslike')
    const wind = document.querySelector('#wind')
    const humidity = document.querySelector('#humidity')

    condition.textContent = data['condition']
    city.textContent = data['location']
    temp.textContent = `${data['temp']}°C `
    feelsLike.textContent = `${data['feelsLike']}°C`
    wind.textContent = `WIND: ${data['wind']}KPH`
    humidity.textContent = `HUMIDITY: ${data['humidity']}%`

}