import React, { useState, useEffect, Fragment } from 'react'

const config = {
  apiUrl: 'https://type.fit/api/quotes',
  headers: 'Access-Control-Allow-Origin'
}

function LandingPage () {
  // const [setQuotes] = useState([])
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
            <p style={{ fontSize: '30px', fontStyle: 'italic' }}>Let&apos;s Stay Fit Together!</p>
          </div>
          { quotes.lenth > 0 ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '40px' }}>
            <h1 className="quote" style={{ color: '#28dbf1', fontSize: '40px', fontStyle: 'italic' }}>&apos;&apos;{quotes.text}&apos;&apos;</h1>
            <p style={{ alignSelf: 'flex-end', color: '#28dbf1', fontSize: '15px', fontStyle: 'italic' }}>- {quotes.author ? quotes.author : 'unknown'}</p>
          </div>
            : <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '40px' }}>
              <h1 className="quote" style={{ color: '#28dbf1', fontSize: '35px', fontStyle: 'italic' }}>The motivational quote hasn&apos;t loaded...But thats ok! We It&apos;s going to be a great day!</h1>
              <h4 style={{ alignSelf: 'center', color: '#28dbf1', fontSize: '30px', fontStyle: 'italic' }}>Let&apos;s Sign-In and Get Started!</h4>
            </div>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPage
