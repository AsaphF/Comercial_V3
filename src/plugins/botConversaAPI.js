const axios = require('axios');
// URL of the third-party API you want to request
const getSubscriberUrl = 'https://backend.botconversa.com.br/api/v1/webhook/subscriber/get_by_phone/551193378888/'
const createSubUrl = 'https://backend.botconversa.com.br/api/v1/webhook/subscriber/';
const sendMessageUrl = 'https://backend.botconversa.com.br/api/v1/webhook//subscriber/{subscriber_id}/send_message/'
const customFildUrl = 'https://backend.botconversa.com.br/api/v1/webhook/subscriber/id/custom_fields/String/'
const apiKey = '077f1900-55c4-42f9-af88-9d67961063bc'; // Replace this with your actual API key

async function fetchData() {
  try {
    // Make a GET request to the API with the API key in the headers
    const response = await axios.get(getSubscriberUrl, {
      headers: {
        'API-KEY': `${apiKey}`,
      }
    });

    const data = response.data;
    const status = 200
    console.log('API Data:', data);
    return { status, data }
  } catch (error) {
    const status = error.response.status
    const data = error.response.statusText
    console.error('Error fetching data:', error.response.statusText);
    return { status, data }

  }
}

fetchData();

async function createSubscriber() {
  try {
    // Make a GET request to the API
    const response = await axios.post(createSubUrl, {
      "phone": "5511933776898",
      "first_name": "Asaph",
      "last_name": "Ferreira"
    }, {
      headers: {
        'API-KEY': `${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    const status = response.status
    return { status, data }
  } catch (error) {
    // Handle errors
    const status = error.response.data.status_code
    let data = error.response.data.detail
    console.log(error.response)
    if (status === 400 && data.includes('already')) {
      data = 'O Cliente já possui o cadastro efetuado'
    } else if (status === 401) {
      data = 'Error 401'
    } else {
      data = 'A key da API está inválida.'
    }
    return { status, data }
  }
}

async function sendFirstMessage() {
  try {
    // Make a GET request to the API
    const response = await axios.post(createSubUrl, {
      "phone": "5511933776898",
      "first_name": "Asaph",
      "last_name": "Ferreira"
    }, {
      headers: {
        'API-KEY': `${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    const status = response.status
    return { status, data }
  } catch (error) {
    // Handle errors
    const status = error.response.data.status_code
    let data = error.response.data.detail
    if (status === 400 && data.includes('already')) {
      data = 'O Cliente já possui o cadastro efetuado'
    } else if (status === 401) {
      data = 'Error 401'
    } else {
      data = 'A key da API está inválida.'
    }
    return { status, data }
  }
}

async function handlingPromise () {
  try {
    const result = await createSubscriber();
    if (result.status === 200) {
      console.log(result.data)
      // Mandar mensagem
    } else{
      console.log(result.status)
      console.log(result.data)
    }
  } catch (error) {
    console.error('Error while Handling:', error);
  }
}

// handlingPromise()