export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    // eslint-disable-next-line
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // eslint-disable-next-line
    console.log('ERRO-'+code)
  })
}
