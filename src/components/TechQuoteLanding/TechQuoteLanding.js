import React, { Component } from 'react'

import { randoQuote } from '../../api/techquotes'

class TechQuoteLandingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      randomQuote: '',
      quoteAuthor: ''
    }
  }

  componentDidMount () {
    randoQuote()
      .then(res => {
        console.log('this is res', res)
        this.setState({ randomQuote: res.data.quote, quoteAuthor: res.data.author })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const { randomQuote, quoteAuthor } = this.state
    console.log('this is randoquote', randomQuote)
    console.log('this is quoteAuthor', quoteAuthor)

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '50px', marginTop: '50px' }}>Welcome 💪 Fit-Friends 💪!</h1>
          <p style={{ fontSize: '30px', fontStyle: 'italic' }}>Let&apos;s Get Fit Together!</p>
        </div>
        <div>
          <h1 style={{ color: '#38ed84', fontSize: '40px', fontStyle: 'italic' }}>&apos;&apos;{randomQuote}&apos;&apos;</h1>
          <p style={{ color: '#38ed84', fontSize: '15px', fontStyle: 'italic' }}>- {quoteAuthor}</p>
        </div>
      </div>
    )
  }
}

export default TechQuoteLandingPage
