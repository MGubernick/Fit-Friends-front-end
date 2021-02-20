import axios from 'axios'

export const randoQuote = () => {
  return axios({
    url: 'http://quotes.stormconsultancy.co.uk/random.json'
  })
}
