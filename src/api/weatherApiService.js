
export const getLocalForecast = (coords) => {
  const [latitude, longitude] = coords;

  return Promise.all([
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5cce314eb75f7136d6791029de739d4e`)
      .then(res => res.json())
      .then(res => res.name),
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely&appid=5cce314eb75f7136d6791029de739d4e`)
      .then(res => res.json())
  ]).then(res => ({cityName: res[0], forecast: res[1]}))
}





