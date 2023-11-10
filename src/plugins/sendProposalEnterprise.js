import axios from 'axios'

// Função com parâmetros: objeto 'affilate' e dados de cliente e email
const sendProposalEnterprise = async (affiliate, planClients, planPricePerClient, planMonthlyPrice, planSavedHours, email) => {
  // Formatar número de telefone (para ser usado no href do link do WhatsApp)
  affiliate.phoneFormatted = affiliate.phone.replace(/\D/g, '')
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
      <style>
        .hover-bg-sh-dark-green:hover {
          background-color: #2FB490 !important;
        }
        .hover-text-decoration-underline:hover {
          text-decoration: underline !important;
        }
        @media (max-width: 600px) {
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
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; -webkit-font-smoothing: antialiased">
      <div role="article" aria-roledescription="email" aria-label lang="en" style="font-family: 'Poppins', Arial, sans-serif">
        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="none">
          <tr>
            <td align="center" style="font-family: 'Poppins', Arial, sans-serif; background-color: #f1f5f9; padding-top: 24px; padding-bottom: 24px">
              <table class="sm-w-full" style="width: 700px" cellpadding="0" cellspacing="0" role="none">
                <tr>
                  <div style="font-family: 'Poppins', Arial, sans-serif; margin-left: auto; margin-right: auto; margin-bottom: 16px; width: 192px">
                    <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2Fconfirmation%2Flogotype-75px.png?alt=media&token=73fcb281-c123-4738-ae98-b678416b9068" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100%">
                  </div>
                </tr>
                <tr>
                  <td align="center" class="sm-px-8" style="font-family: 'Poppins', Arial, sans-serif">
                    <table class="sm-w-full" style="width: 75%" cellpadding="0" cellspacing="0" role="none">
                      <tr>
                        <td class="sm-px-6" style="font-family: 'Poppins', Arial, sans-serif; border-radius: 16px; background-color: #fff; padding: 48px; text-align: left; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)">
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0; font-size: 18px; font-weight: 600; color: #334155">
                            Seu plano <span style="font-weight: 700">SimplesHub Enterprise</span>
                          </p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; padding-bottom: 20px; font-size: 14px; color: #475569">
                            Agradecemos por escolher o SimplesHub para otimizar seus processos contábeis. Abaixo, detalhamos o plano que você escolheu.
                          </p>
                          <hr style="margin-top: 20px; border-width: 2px; border-color: rgb(100 116 139 / 0.1)">
                          <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fplan-enterprise.png?alt=media&token=acbb983b-afac-48c6-8086-1d68865be532" alt="Plano Enterprise" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 8px">
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 4px; font-size: 16px; color: #334155">
                            <span style="font-weight: 600;">SimplesHub Enterprise</span> - até ${planClients}
                            clientes
                          </p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; font-size: 20px; font-weight: 600; color: #2FB490">
                            R$ ${planPricePerClient} por cliente
                          </p>
                          <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsimplesxml.png?alt=media&token=70da94f7-132a-4a46-80d2-ad2422635910" alt="SimplesXML" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                          <table style="margin-top: 8px; border: 0px solid rgb(16 185 129 / 0.25); border-left-width: 4px; padding-left: 8px; border-spacing: 0 4px" cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femit.png?alt=media&token=49ad434f-fc82-41b7-8efe-080d155e3798" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle">
                                Busca automática de notas fiscais XML
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsync.png?alt=media&token=478594ef-c713-4d94-98f7-5c6c9771fb53" alt="Sincronização" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Sincronização automática em tempo real
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fgraph.png?alt=media&token=92f24920-710a-45b1-98dd-0ad8bc56947f" alt="Dados" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Dados financeiros estratégicos
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Freport.png?alt=media&token=a70f9452-bc01-4fce-9c31-6d027fce9305" alt="Relatório" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Relatórios interativos para clientes
                              </td>
                            </tr>
                          </table>
                          <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femissaosimples.png?alt=media&token=6c0ccc55-7f92-4cec-aa00-ce25db197b25" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 32px">
                          <table style="margin-top: 8px; border: 0px solid rgb(16 185 129 / 0.25); border-left-width: 4px; padding-left: 8px; border-spacing: 0 4px;" cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femit.png?alt=media&token=49ad434f-fc82-41b7-8efe-080d155e3798" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Emissão automática de guias fiscais
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsend.png?alt=media&token=1d2d6672-accd-4fb1-bfeb-ae368acf75f2" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Envio automático (E-mail e WhatsApp)
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fstrategy.png?alt=media&token=f1281797-b66e-4624-9a34-a929f095e31f" alt="Estratégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Visão estratégica interativa
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fusers.png?alt=media&token=de0dae9f-709a-4e43-aced-d38f030b9828" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Adicione usuários da sua equipe
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsearch.png?alt=media&token=e229f3a3-2ea5-4fe7-9f40-7f0f026bc9e8" alt="Rastreio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Rastreio de envio e visualização
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fedit-email.png?alt=media&token=3c2b1031-2272-4603-827e-87352d7a63c3" alt="Email" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                E-mail de envio personalizado
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Download" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Download de guias em lote
                              </td>
                            </tr>
                          </table>
                          <table style="margin-top: 0; border: 0px solid rgb(16 185 129 / 0.25); border-left-width: 4px; padding-left: 8px; border-spacing: 0 4px;" cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif;">
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">
                                  Guias compatíveis
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b">DCTFWeb</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b">Histórico de 3 meses</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Comprovantes</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">
                                  Extratos, recibos, DARFs e MAED
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">DAS</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">Simples Nacional e MEI</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">Parcelamentos</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">
                                  Simples Nacional, Receita Federal, Especiais e PGFN
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">
                                  Certidões e Relatórios
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">
                                  Relatório de Situação Fiscal Federal
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">CNDs Estaduais e Federais</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">Caixas Postais</p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Mensagens do e-CAC</p>
                              </td>
                            </tr>
                          </table>
                          <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsimplesconnect.png?alt=media&token=44433cde-0d11-41a9-b375-bd2b206e7e3b" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 32px;">
                          <table style="margin-top: 8px; border: 0px solid rgb(16 185 129 / 0.25); border-left-width: 4px; padding-left: 8px; border-spacing: 0 4px;" cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fportal.png?alt=media&token=348c1c56-d86e-46aa-a108-31bec28fffe0" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Site fiscal personalizado
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Importe e envie qualquer PDF
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fscanner.png?alt=media&token=138accce-931e-4106-8309-c1f96132de16" alt="Estratégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Disparo por inteligência artificial
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fpayment.png?alt=media&token=f2904bc7-c234-469a-9b72-b25a0e375037" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Rastreie status de pagamento
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fchat.png?alt=media&token=5f0ab85f-d76e-4cdf-99f6-c22db20fcc33" alt="Rastreio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                              </td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                Dispare comunicados em massa
                              </td>
                            </tr>
                          </table>
                          <table style="margin-top: 0; border: 0px solid rgb(16 185 129 / 0.25); border-left-width: 4px; padding-left: 8px; border-spacing: 0 4px;" cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif;">
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 8px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">
                                  Guias compatíveis
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b">
                                  Qualquer arquivo .PDF
                                </p>
                                <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b;">
                                  Todas as guias do Emissão Simples
                                </p>
                              </td>
                            </tr>
                          </table>
                          <hr style="margin-top: 20px; border-width: 2px; border-color: rgb(100 116 139 / 0.1);">
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 16px; font-weight: 500; color: #334155;">Total</p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; font-size: 20px; font-weight: 600; color: #2FB490;">R$ ${planMonthlyPrice}/mês</p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155">Economia de tempo estimada</p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; font-size: 16px; font-weight: 600; color: #334155;">${planSavedHours} horas/mês</p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155;">Forma de pagamento</p>
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 20px; margin-top: 0; font-size: 16px; font-weight: 600; color: #334155">Boleto bancário</p>
                          <table cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fcheck-green.png?alt=media&token=9fce7140-382d-4e23-957c-56c2f8210184" alt="Icon1" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-weight: 500; color: #475569; vertical-align: middle;">Sem taxa de adesão</td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fasterisk.png?alt=media&token=2844c908-66cf-4c0c-ba51-9a41205d5fcc" alt="Icon2" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></td>
                              <td style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; color: #94a3b8; vertical-align: middle">Carência de 2 meses</td>
                            </tr>
                          </table>
                          <a href="https://simpleshub.com.br/subscriptions/" class="hover-bg-sh-dark-green" style="margin-left: auto; margin-right: auto; margin-top: 24px; display: block; cursor: pointer; border-radius: 4px; border-style: none; padding: 12px 16px; text-align: center; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-weight: 700; color: #fff; text-decoration-line: none; transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; background-color: #0dce9a">
                            Assine agora
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Poppins', Arial, sans-serif; height: 32px"></td>
                      </tr>
                      <tr>
                        <td class="sm-px-6" style="font-family: 'Poppins', Arial, sans-serif; border-radius: 16px; background-color: #fff; padding: 24px 32px; text-align: left; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)">
                          <table cellpadding="0" cellspacing="0" role="none">
                            <tr>
                              <td style="font-family: 'Poppins', Arial, sans-serif;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-top: 16px">
                                  <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse" role="none">
                                    <tr>
                                      <td style="font-family: 'Poppins', Arial, sans-serif; width: 100px; vertical-align: middle;">
                                        <img style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100px;" src="${affiliate.logoUrl}" alt>
                                      </td>
                                      <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle; padding-left: 10px;">
                                        <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0; font-weight: bold; font-size: 20px; color: #2d3748;">
                                          ${affiliate.name}
                                        </p>
                                        <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 4px; font-size: 14px; color: #718096;">
                                          Especialista | SimplesHub
                                        </p>
                                        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px" role="none">
                                          <tr>
                                            <td valign="middle" style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                              <div style="font-family: 'Poppins', Arial, sans-serif; height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/whatsapp-icon.png?alt=media&token=a1a7abc1-1076-4762-93e4-d5f4621e8b8f" alt style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                              </div>
                                            </td>
                                            <td valign="middle" style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                              <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="font-family: 'Poppins', Arial, sans-serif; margin: 0; color: #2fb490; line-height: 20px;">${affiliate.phone}</a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                              <div style="font-family: 'Poppins', Arial, sans-serif; height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/email-icon.png?alt=media&token=0d99f049-8219-472a-b499-d600f032a365" alt="Email" style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                              </div>
                                            </td>
                                            <td style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                              <a href="mailto:${affiliate.email}" style="font-family: 'Poppins', Arial, sans-serif; margin: 0; color: #2fb490; line-height: 20px;">${affiliate.email}</a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                      </tr>
                      <tr>
                        <td style="font-family: 'Poppins', Arial, sans-serif; padding: 32px; text-align: center; font-size: 12px; color: #4b5563">
                          <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0;">Você está recebendo este e-mail por ter se registrado no SimplesHub.</p>
                          <div style="font-family: 'Poppins', Arial, sans-serif; display: flex; flex-direction: row; gap: 32px"></div>
                          <a href="https://simpleshub.com.br/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none">Site</a> &bull;
                          <a href="https://www.instagram.com/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">Instagram</a> &bull;
                          <a href="https://www.linkedin.com/company/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">LinkedIn</a>
                          <p style="font-family: 'Poppins', Arial, sans-serif;"></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `

  // Define endpoint e payload para a API
  const url = 'https://us-central1-emissaosimplestestes.cloudfunctions.net/api/send-email-to-one'
  const payload = {
    body: htmlContent,
    subject: 'Teste de Envio de Email - Proposta Comercial Enterprise',
    emailTo: email
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

// function checkEmail (leadName, emailTitle, emailText) {
//   const regex = /\[([^\]]+)\]/g
//   const matchesTitle = [...emailTitle.matchAll(regex)]
//   const wordsInTitle = matchesTitle.map(match => match[1])
//   if (wordsInTitle.length > 0) {
//     for (const word of wordsInTitle) {
//       if (word.toLowerCase() === 'nome') {
//         const regexName = /\[([^\]]*nome[^\]]*)\]/g
//         const letter = leadName.toUpperCase()
//         const name = leadName.toLowerCase().slice(1)
//         const sum = letter + name
//         let firstName = sum.split(' ')[0].toLowerCase()
//         firstName = firstName[0].toUpperCase() + firstName.slice(1, firstName.length)
//         emailTitle = emailTitle.replace(regexName, firstName)
//       }
//       if (word.toLowerCase() === 'telefone') {
//         const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
//         emailTitle = emailTitle.replace(regexPhone, this.lead.phone)
//       }
//       if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
//         const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
//         const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
//         emailTitle = emailTitle.replace(regexmail1, this.lead.email)
//         emailTitle = emailTitle.replace(regexmail2, this.lead.email)
//       }
//       if (word.toLowerCase() === 'origem' && this.lead.originData && this.lead.originData.origin) {
//         const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
//         emailTitle = emailTitle.replace(regexOrigin, this.lead.originData.origin)
//       }
//     }
//   }
//   // Formatar Corpo do email
//   const matches = [...emailText.matchAll(regex)]
//   const wordsInBody = matches.map(match => match[1])
//   if (wordsInBody.length > 0) {
//     for (const word of wordsInBody) {
//       if (word.toLowerCase() === 'nome') {
//         const regexName = /\[([^\]]*nome[^\]]*)\]/g
//         const letter = leadName.toUpperCase()
//         const name = leadName.toLowerCase().slice(1)
//         const sum = letter + name
//         let firstName = sum.split(' ')[0].toLowerCase()
//         firstName = firstName[0].toUpperCase() + firstName.slice(1, firstName.length)
//         emailText = emailText.replace(regexName, firstName)
//       }
//       if (word.toLowerCase() === 'telefone') {
//         console.log('teste')
//         const regexPhone = /\[([^\]]*telefone[^\]]*)\]/g
//         emailText = emailText.replace(regexPhone, this.lead.phone)
//       }
//       if (word.toLowerCase() === 'email' || word.toLowerCase() === 'e-mail') {
//         const regexmail1 = /\[([^\]]*email[^\]]*)\]/g
//         const regexmail2 = /\[([^\]]*e-mail[^\]]*)\]/g
//         emailText = emailText.replace(regexmail1, this.lead.email)
//         emailText = emailText.replace(regexmail2, this.lead.email)
//       }
//       if (word.toLowerCase() === 'origem' && this.lead.origem) {
//         const regexOrigin = /\[([^\]]*origem[^\]]*)\]/g
//         emailText = emailText.replace(regexOrigin, this.lead.origem)
//       }
//     }
//   }
//   emailTitle = emailTitle.replaceAll('\n', '<br>')
//   emailText = emailText.replaceAll('\n', '<br>')
//   return [emailTitle, emailText]
// }
export default sendProposalEnterprise
