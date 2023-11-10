const axios = require('axios')

const createAndSend = async (apiKey, firstName, lastName, userPhone, message) => {
  const apiUrl = 'http://localhost:5001/emissaosimplestestes/us-central1/api/create-subscriber'
  // const apiKey = '077f1900-55c4-42f9-af88-9d67961063bc' // Replace this with your actual API key

  const dataToSend = {
    apiKey: apiKey,
    user: {
      first_name: firstName,
      last_name: lastName,
      phone: `+55${userPhone}`
    }
  }
  try {
    // Chamar API para enviar o email e esperar resposta
    const response = await axios.post(apiUrl, dataToSend)
    console.log(response.data)
    console.log('Contado criado com sucesso:')
    if (response.status === 200) {
      const id = response.data.info.id
      const result = await sendMessage(apiKey, id, message)
      if (result.status === 200) {
        console.log('Mensagem enviado com sucesso')
        return result
      } else {
        console.log('Erro no Envio da mensagem')
        return result
      }
    } else {
      return 'erro ao criar o contato '
    }
  } catch (error) {
    console.error('Falha na criação do contato:', error)
    return 'false'
  }
}

const sendMessage = async (apiKey, userId, message) => {
  const apiUrl = 'http://localhost:5001/emissaosimplestestes/us-central1/api/sendMessage'

  const dataToSend = {
    apiKey: apiKey,
    message: message,
    userId: userId
  }

  try {
    // Chamar API para enviar o email e esperar resposta
    const response = await axios.post(apiUrl, dataToSend)
    return response.data
  } catch (error) {
    return error
  }
}

export default createAndSend
