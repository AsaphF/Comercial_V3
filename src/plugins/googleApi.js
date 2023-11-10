const { google } = require('googleapis')

async function createMeeting (startTime, endTime) {
  try {
    // Autenticação com o Google Calendar
    const auth = new google.auth.GoogleAuth({
      // Insira as suas credenciais aqui
      keyFile: 'path/to/keyfile.json',
      scopes: ['https://www.googleapis.com/auth/calendar']
    })
    const calendar = google.calendar({ version: 'v3', auth })

    // Criação da reunião
    const event = {
      summary: 'Nome da reunião',
      location: 'Link da sala do Google Meet',
      start: {
        dateTime: startTime,
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Sao_Paulo'
      },
      // Insira os participantes da reunião aqui, se necessário
      attendees: [
        { email: 'participante1@gmail.com' },
        { email: 'participante2@gmail.com' }
      ]
      // Insira qualquer outra informação necessária da reunião aqui
    }

    // Envio da requisição para criar a reunião
    const response = await calendar.events.insert({
      calendarId: 'primary', // O ID do calendário onde a reunião será adicionada
      resource: event
    })

    console.log(`Link da reunião: ${response.data.hangoutLink}`)
    return response.data.hangoutLink
  } catch (error) {
    console.error(error)
  }
}

createMeeting('2023-03-29T14:30:00.000-03:00', '2023-03-29T15:30:00.000-03:00')
