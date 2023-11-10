import axios from 'axios'

// Função com parâmetros: objeto 'affilate' e dados de cliente e email
const sendSalesMessage = async (affiliate, clientName, clientEmail, emailTitle, emailText) => {
  // Formatar número de telefone (para ser usado no href do link do WhatsApp)
  affiliate.phoneFormatted = affiliate.phone.replace(/\D/g, '')
  const [title, text] = checkEmail(clientName, emailTitle, emailText)
  // Define o conteúdo do email em HTML com campos dinâmicos
  const htmlContent = `
  <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
      </style>
      <![endif]-->
      <!-- <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: 'Poppins', sans-serif;}
      </style> -->

      <title>{"$emailSubject":null}</title>

      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        /* Tailwind CSS components */
        /* Additional imports */
        /* Tailwind CSS utility classes */
        .collapse {
          visibility: collapse;
        }
        .absolute {
          position: absolute;
        }
        .m-0 {
          margin: 0;
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .my-0 {
          margin-top: 0;
          margin-bottom: 0;
        }
        .my-4 {
          margin-top: 16px;
          margin-bottom: 16px;
        }
        .-ml-4 {
          margin-left: -16px;
        }
        .-mt-3 {
          margin-top: -12px;
        }
        .mb-0 {
          margin-bottom: 0;
        }
        .mb-4 {
          margin-bottom: 16px;
        }
        .mb-8 {
          margin-bottom: 32px;
        }
        .mt-0 {
          margin-top: 0;
        }
        .mt-4 {
          margin-top: 16px;
        }
        .mt-6 {
          margin-top: 24px;
        }
        .mt-8 {
          margin-top: 32px;
        }
        .block {
          display: block;
        }
        .inline-block {
          display: inline-block;
        }
        .flex {
          display: flex;
        }
        .table {
          display: table;
        }
        .hidden {
          display: none;
        }
        .h-0 {
          height: 0;
        }
        .h-0_5 {
          height: 2px;
        }
        .h-8 {
          height: 32px;
        }
        .h-auto {
          height: auto;
        }
        .w-2-5 {
          width: 40%;
        }
        .w-3-4 {
          width: 75%;
        }
        .w-48 {
          width: 192px;
        }
        .w-5-6 {
          width: 83.333333%;
        }
        .w-600px {
          width: 600px;
        }
        .w-768px {
          width: 768px;
        }
        .w-auto {
          width: auto;
        }
        .w-full {
          width: 100%;
        }
        .flex-none {
          flex: none;
        }
        .border-collapse {
          border-collapse: collapse;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .flex-row {
          flex-direction: row;
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .gap-8 {
          gap: 32px;
        }
        .overflow-hidden {
          overflow: hidden;
        }
        .rounded {
          border-radius: 4px;
        }
        .rounded-2xl {
          border-radius: 16px;
        }
        .rounded-3xl {
          border-radius: 24px;
        }
        .rounded-xl {
          border-radius: 12px;
        }
        .rounded-t-xl {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        .border-2 {
          border-width: 2px;
        }
        .border-solid {
          border-style: solid;
        }
        .border-none {
          border-style: none;
        }
        .border-slate-200 {
          border-color: #e2e8f0;
        }
        .bg-blue-500 {
          background-color: #3b82f6;
        }
        .bg-gray-200 {
          background-color: #e5e7eb;
        }
        .bg-gray-300 {
          background-color: #d1d5db;
        }
        .bg-gray-900 {
          background-color: #111827;
        }
        .bg-red-400 {
          background-color: #f87171;
        }
        .bg-slate-100 {
          background-color: #f1f5f9;
        }
        .bg-slate-200 {
          background-color: #e2e8f0;
        }
        .bg-white {
          background-color: #fff;
        }
        .p-0 {
          padding: 0;
        }
        .p-12 {
          padding: 48px;
        }
        .p-4 {
          padding: 16px;
        }
        .p-8 {
          padding: 32px;
        }
        .px-4 {
          padding-left: 16px;
          padding-right: 16px;
        }
        .px-6 {
          padding-left: 24px;
          padding-right: 24px;
        }
        .py-3 {
          padding-top: 12px;
          padding-bottom: 12px;
        }
        .py-5 {
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .py-6 {
          padding-top: 24px;
          padding-bottom: 24px;
        }
        .py-8 {
          padding-top: 32px;
          padding-bottom: 32px;
        }
        .pb-10 {
          padding-bottom: 40px;
        }
        .pb-2 {
          padding-bottom: 8px;
        }
        .pb-4 {
          padding-bottom: 16px;
        }
        .pb-5 {
          padding-bottom: 20px;
        }
        .pb-6 {
          padding-bottom: 24px;
        }
        .pb-8 {
          padding-bottom: 32px;
        }
        .pt-0 {
          padding-top: 0;
        }
        .pt-10 {
          padding-top: 40px;
        }
        .pt-4 {
          padding-top: 16px;
        }
        .pt-5 {
          padding-top: 20px;
        }
        .pt-6 {
          padding-top: 24px;
        }
        .pt-8 {
          padding-top: 32px;
        }
        .text-left {
          text-align: left;
        }
        .text-center {
          text-align: center;
        }
        .font-sans {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        .text-2xl {
          font-size: 24px;
        }
        .text-3xl {
          font-size: 30px;
        }
        .text-base {
          font-size: 16px;
        }
        .text-lg {
          font-size: 18px;
        }
        .text-sm {
          font-size: 14px;
        }
        .text-xl {
          font-size: 20px;
        }
        .text-xs {
          font-size: 12px;
        }
        .font-bold {
          font-weight: 700;
        }
        .font-medium {
          font-weight: 500;
        }
        .font-semibold {
          font-weight: 600;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .leading-6 {
          line-height: 24px;
        }
        .leading-none {
          line-height: 1;
        }
        .text-black {
          color: #000;
        }
        .text-blue-500 {
          color: #3b82f6;
        }
        .text-gray-100 {
          color: #f3f4f6;
        }
        .text-gray-200 {
          color: #e5e7eb;
        }
        .text-gray-400 {
          color: #9ca3af;
        }
        .text-gray-600 {
          color: #4b5563;
        }
        .text-gray-700 {
          color: #374151;
        }
        .text-gray-800 {
          color: #1f2937;
        }
        .text-slate-500 {
          color: #64748b;
        }
        .text-slate-600 {
          color: #475569;
        }
        .text-slate-700 {
          color: #334155;
        }
        .text-slate-800 {
          color: #1e293b;
        }
        .text-white {
          color: #fff;
        }
        .no-underline {
          text-decoration-line: none;
        }
        .transition-colors {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
        .bg-sh-neutral-900 {
          background-color: #181818;
        }
        .bg-sh-neutral-800 {
          background-color: #28282B;
        }
        .bg-sh-neutral-light-gray {
          background-color: #EFEFEF;
        }
        .bg-sh-hero-green {
          background-color: #0dce9a;
        }
        .text-sh-green {
          color: #0dce9a;
        }
        .text-sh-neutral-800 {
          color: #282A3A;
        }
        .sh-divider {
          background: linear-gradient(270deg, #0DCE9A 0%, rgba(13, 206, 154, 0) 0.01%, #0DCE9A 51.04%, rgba(13, 206, 154, 0) 100%);
          height: 1px;
          width: 100%;
        }
        .-webkit-font-smoothing-antialiased {
          -webkit-font-smoothing: antialiased;
        }
        .text-decoration-none {
          text-decoration: none;
        }
        /* Custom utility classes */
        .hover-bg-blue-600:hover {
          background-color: #2563eb !important;
        }
        .hover-bg-sh-dark-green:hover {
          background-color: #2FB490 !important;
        }
        .hover-text-decoration-underline:hover {
          text-decoration: underline !important;
        }
        @media (max-width: 425px) {
          .xs-w-3-5 {
            width: 60% !important;
          }
        }
        @media (max-width: 600px) {
          .sm-h-8 {
            height: 32px !important;
          }
          .sm-w-full {
            width: 100% !important;
          }
          .sm-px-6 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .sm-px-8 {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .sm-pb-3 {
            padding-bottom: 12px !important;
          }
        }
      </style>

    </head>
    <body class="m-0 p-0 w-fullword-break-break-word -webkit-font-smoothing-antialiased bg-white" style="margin: 0; background-color: #fff; padding: 0; -webkit-font-smoothing: antialiased;">
      <div role="article" aria-roledescription="email" aria-label='{"$emailSubject":null}' lang="en">

        <div class="font-sans" style="font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;">
          <table cellpadding="0" cellspacing="0" role="none">
            <tr>
              <td class="text-slate-800 text-sm">
                ${title}
                ${text}
                <hr class="border-slate-200 border-solid" style="border-style: solid; border-color: #e2e8f0;">
              </td>
            </tr>
            <tr>
              <td>
                <div class="pt-4" style="padding-top: 16px;">
                  <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse" role="none">
                    <tr>
                      <td style="width: 100px; vertical-align: middle">
                        <img style="width: 100px" src="${affiliate.logoUrl}" alt>
                      </td>
                      <td style="vertical-align: middle; padding-left: 10px">
                        <p style="
                            margin: 0;
                            font-weight: bold;
                            font-size: 20px;
                            color: #2d3748;
                          ">
                          ${affiliate.name}
                        </p>
                        <p style="
                            margin-top: 0;
                            margin-bottom: 4px;
                            font-size: 14px;
                            color: #718096;
                          ">
                          Especialista | SimplesHub
                        </p>
                        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px" role="none">
                          <tr>
                            <td valign="middle" style="vertical-align: middle">
                              <div style="
                                  height: 20px;
                                  line-height: 20px;
                                  margin-right: 8px;
                                  display: inline-block;
                                ">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2FGlobal%2Fwhatsapp-icon.png?alt=media&token=a45abd69-ab4f-4020-a419-38653176f7b8" alt style="vertical-align: middle">
                              </div>
                            </td>
                            <td valign="middle" style="vertical-align: middle">
                              <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="margin: 0; color: #2fb490; line-height: 20px">${affiliate.phone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align: middle">
                              <div style="
                                  height: 20px;
                                  line-height: 20px;
                                  margin-right: 8px;
                                  display: inline-block;
                                ">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2FGlobal%2Femail-icon.png?alt=media&token=76704b1a-7863-484c-bf1d-51a6635ed648" alt="Email" style="vertical-align: middle">
                              </div>
                            </td>
                            <td style="vertical-align: middle">
                              <a href="mailto:${affiliate.email}" style="margin: 0; color: #2fb490; line-height: 20px">${affiliate.email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table style="margin-left: 12px" cellpadding="0" cellspacing="0" role="none">
                    <tr>
                      <td style="padding-right: 40px">
                        <a href="https://simpleshub.com.br/?origin=email-comercial"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2FGlobal%2Flogo-sig.png?alt=media&token=02680c8c-0df4-4843-aef3-e62cace9a59e" alt></a>
                      </td>
                      <td>
                        <a href="https://simpleshub.com.br/?origin=email-comercial"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2FGlobal%2Facesse-link.png?alt=media&token=72ee4317-b706-4a6d-af99-c7a5ada406e4" alt></a>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </div>

      </div>
    </body>
    </html>
  `

  // Define endpoint e payload para a API
  const url =
    'https://us-central1-emissaosimplestestes.cloudfunctions.net/api/send-email-to-one'
  const payload = {
    body: htmlContent,
    subject: 'Email do SimplesHub',
    emailTo: clientEmail
  }

  try {
    // Chamar API para enviar o email e esperar resposta
    const response = await axios.post(url, payload)
    console.log(
      'E-mail de confirmação de registro enviado com sucesso:',
      response.data
    )
    return response.status
  } catch (error) {
    console.error('Falha no envio de e-mail de confirmação:', error)
    return 'false'
  }
}

function checkEmail (leadName, emailTitle, emailText) {
  const regex = /\[([^\]]+)\]/g
  const matchesTitle = [...emailTitle.matchAll(regex)]
  const wordsInTitle = matchesTitle.map(match => match[1])
  if (wordsInTitle.length > 0) {
    for (const word of wordsInTitle) {
      if (word.toLowerCase() === 'nome') {
        const regexName = /\[([^\]]*nome[^\]]*)\]/g
        const letter = leadName.toUpperCase()
        const name = leadName.toLowerCase().slice(1)
        const sum = letter + name
        let firstName = sum.split(' ')[0].toLowerCase()
        firstName = firstName[0].toUpperCase() + firstName.slice(1, firstName.length)
        emailTitle = emailTitle.replace(regexName, firstName)
      }
      if (word.toLowerCase() === 'telefone') {
        const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
        emailTitle = emailTitle.replace(regexPhone, this.lead.phone)
      }
      if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
        const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
        const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
        emailTitle = emailTitle.replace(regexmail1, this.lead.email)
        emailTitle = emailTitle.replace(regexmail2, this.lead.email)
      }
      if (word.toLowerCase() === 'origem' && this.lead.originData && this.lead.originData.origin) {
        const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
        emailTitle = emailTitle.replace(regexOrigin, this.lead.originData.origin)
      }
    }
  }
  // Formatar Corpo do email
  const matches = [...emailText.matchAll(regex)]
  const wordsInBody = matches.map(match => match[1])
  if (wordsInBody.length > 0) {
    for (const word of wordsInBody) {
      if (word.toLowerCase() === 'nome') {
        const regexName = /\[([^\]]*nome[^\]]*)\]/g
        const letter = leadName.toUpperCase()
        const name = leadName.toLowerCase().slice(1)
        const sum = letter + name
        let firstName = sum.split(' ')[0].toLowerCase()
        firstName = firstName[0].toUpperCase() + firstName.slice(1, firstName.length)
        emailText = emailText.replace(regexName, firstName)
      }
      if (word.toLowerCase() === 'telefone') {
        console.log('teste')
        const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
        emailText = emailText.replace(regexPhone, this.lead.phone)
      }
      if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
        const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
        const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
        emailText = emailText.replace(regexmail1, this.lead.email)
        emailText = emailText.replace(regexmail2, this.lead.email)
      }
      if (word.toLowerCase() === 'origem' && this.lead.origem) {
        const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
        emailText = emailText.replace(regexOrigin, this.lead.origem)
      }
    }
  }
  emailTitle = emailTitle.replaceAll('\n', '<br>')
  emailText = emailText.replaceAll('\n', '<br>')
  return [emailTitle, emailText]
}
export default sendSalesMessage
