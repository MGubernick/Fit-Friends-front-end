import React, { useState, useEffect, Fragment } from 'react'

const config = {
  apiUrl: 'https://type.fit/api/quotes'
}

function LandingPage () {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    // setQuotes([])
    fetch(config.apiUrl)
      .then(function (res) {
        return res.json()
      })
      .then(res => {
        const randQuote = res[Math.floor(Math.random() * res.length)]
        return randQuote
      })
      .then(randQuote => {
        setQuotes(randQuote)
      })
      .catch(error => {
        console.error(error.message)
      })
  }, [])

  return (
    <Fragment>
      <div className="container">
        <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '50px', marginTop: '50px' }}>Welcome 💪 Fit-Friends 💪!</h1>
            <p style={{ fontSize: '30px', fontStyle: 'italic' }}>Let&apos;s Get Fit Together!</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '40px' }}>
            <h1 style={{ color: '#38ed84', fontSize: '40px', fontStyle: 'italic' }}>&apos;&apos;{quotes.text}&apos;&apos;</h1>
            <p style={{ alignSelf: 'flex-end', color: '#38ed84', fontSize: '15px', fontStyle: 'italic' }}>- {quotes.author}</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPage
