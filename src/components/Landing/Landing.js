import React, { useState, useEffect } from 'react'

const config = {
  apiUrl: 'https://type.fit/api/quotes'
}

function LandingPage () {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    setQuotes([])
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuotes(data)
      })
      .catch(console.log('that didn\'t work'))
  }, [])

  console.log('quotes here:', quotes)

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  console.log('this is randomQuote', randomQuote)

  return (
    <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '50px', marginTop: '50px' }}>Welcome 💪 Fit-Friends 💪!</h1>
        <p style={{ fontSize: '30px', fontStyle: 'italic' }}>Let&apos;s Get Fit Together!</p>
      </div>
      {/*  <div>
        <h1>{quote.text}</h1>
        <p>{quote.author}</p>
      </div> */}
    </div>
  )
}

export default LandingPage
