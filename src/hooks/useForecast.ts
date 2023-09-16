import { useEffect, useState } from 'react'
import { Iforecast, Ioption } from '../interfaaces/interfaces'
const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [option, setOption] = useState<[]>([])
  const [city, setCity] = useState<Ioption | null>()
  const [forecast, setForecast] = useState<Iforecast | null>()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    getSearchOptions(value)
  }
  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=2abfbbe0fa3ef359a1785987d224a97e`
    )
      .then((res) => res.json())
      .then((data) => setOption(data))
      .catch((e) => console.log(e))
  }
  const getForecast = (option: Ioption) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&appid=2abfbbe0fa3ef359a1785987d224a97e
`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        console.log(data)
        setForecast(forecastData)
      })
      .catch((e) => console.log(e))
  }
  const onSubmit = () => {
    if (!city) return
    getForecast(city)
  }
  const onOptionSelect = (option: Ioption) => {
    setCity(option)
  }
  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOption([])
    }
  }, [city])
  return {
    term,
    option,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}
export default useForecast
