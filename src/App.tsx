import Forecast from './components/Forecast'
import Search from './components/Search'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { term, option, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  return (
    <>
      {forecast ? (
        <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-full w-full">
          <Forecast data={forecast} />
        </main>
      ) : (
        <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-screen w-full">
          <Search
            term={term}
            option={option}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        </main>
      )}
    </>
  )
}

export default App
