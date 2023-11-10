<template>
  <div>
    <div class="button-container">
      <span>Enviar Proposta</span>
      <button class="btn-action"  @click="showModal = true">
        <svg style="padding-bottom: 2px;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 13.067V18.972C21 20.092 20.099 21 18.987 21H5.013C3.901 21 3 20.092 3 18.972V6.028C3 4.908 3.901 4 5.013 4H12" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.828 17.172L11.559 16.239C11.735 16.195 11.895 16.104 12.024 15.976L20.414 7.58599C21.195 6.80499 21.195 5.53899 20.414 4.75799L20.242 4.58599C19.461 3.80499 18.195 3.80499 17.414 4.58599L9.024 12.976C8.896 13.104 8.805 13.265 8.761 13.441L7.828 17.172" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.83 6.17L18.83 9.17" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.546 16.242C11.56 16.136 11.578 16.031 11.578 15.921C11.578 14.54 10.459 13.421 9.078 13.421C8.968 13.421 8.863 13.44 8.757 13.453" stroke="#068373" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <transition name="fade">
      <div v-if="showModal" class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog" role="dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6>Escolha os planos que deseja enviar e preencha-os abaixo:</h6>
              <div class="toogle-buttons">
                <div class="inner-container">
                  <div class="current" :class="{ active: changePlan}" @click="switchTable()">
                    <p>Pro</p>
                  </div>
                  <div class="old" :class="{ active: !changePlan}" @click="switchTable()">
                    <p>Enterprise</p>
                  </div>
                </div>
              </div>
            </div>
            <form @submit.prevent="openConfirmation = true">
              <div class="modal-body">
                <div v-if="changePlan" class="proposal-container" align="center">
                  <div class="inner-container">
                    <div class="logo-container">
                      <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2Fconfirmation%2Flogotype-75px.png?alt=media&token=73fcb281-c123-4738-ae98-b678416b9068" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100%">
                    </div>
                    <div class="proposal-body-container" align="center">
                      <div class="proposal-body">
                        <p class="title">
                          Seu plano <span style="font-weight: 700">SimplesHub Pro</span>
                        </p>
                        <p class="subTitle">
                          Agradecemos por escolher o SimplesHub para otimizar seus processos contábeis. Abaixo, detalhamos o plano que você escolheu.
                        </p>
                        <hr class="diviser">
                        <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fplan-pro.png?alt=media&token=9ce6b8d8-446d-49af-812a-21fc21c1917b" alt="Plano Pro" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 8px">
                        <div class="input-continer-first">
                          <span style="font-weight: 600;">SimplesHub Pro</span> - até
                          <input v-model="amountClient" class="inline-input first" type="text" minlength="1" maxlength="5" required @input="validateRestInputs()">
                          <span>clientes</span>
                        </div>
                        <div class="input-continer-second">R$
                          <input v-model="priceClient"  class="inline-input second" type="text" minlength="1" maxlength="6" required  @input="formatPriceClient()">
                            por cliente
                        </div>
                        <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femissaosimples.png?alt=media&token=6c0ccc55-7f92-4cec-aa00-ce25db197b25" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                        <div class="container-functions">
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femit.png?alt=media&token=49ad434f-fc82-41b7-8efe-080d155e3798" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle">Emissão automática de guias fiscais</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsend.png?alt=media&token=1d2d6672-accd-4fb1-bfeb-ae368acf75f2" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Envio automático (E-mail e WhatsApp)</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fstrategy.png?alt=media&token=f1281797-b66e-4624-9a34-a929f095e31f" alt="Esdivatégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Visão estratégica interativa</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fusers.png?alt=media&token=de0dae9f-709a-4e43-aced-d38f030b9828" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Adicione usuários da sua equipe</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsearch.png?alt=media&token=e229f3a3-2ea5-4fe7-9f40-7f0f026bc9e8" alt="Rasdiveio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Rastreio de envio e visualização</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fedit-email.png?alt=media&token=3c2b1031-2272-4603-827e-87352d7a63c3" alt="Email" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">E-mail de envio personalizado</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Download" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Download de guias em lote</div>
                          </div>
                        </div>
                        <div class="container-docs">
                          <div>
                              <p style="margin-bottom: 16px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">Guias compatíveis</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b">DCTFWeb</p>
                              <p style="margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b">Histórico de 3 meses</p>
                              <p style="margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Comprovantes</p>
                              <p style="margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">Exdivatos, recibos, DARFs e MAED</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">DAS</p>
                              <p style="margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">Simples Nacional e MEI</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">Parcelamentos</p>
                              <p style="margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">Simples Nacional, Receita Federal, Especiais e PGFN</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">Certidões e Relatórios</p>
                              <p style="margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Relatório de Situação Fiscal Federal</p>
                              <p style="margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">CNDs Estaduais e Federais</p>
                              <p style="margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b;">Caixas Postais</p>
                              <p style="margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Mensagens do e-CAC</p>
                          </div>
                        </div>
                        <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsimplesconnect.png?alt=media&token=44433cde-0d11-41a9-b375-bd2b206e7e3b" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 32px">
                        <div class="container-functions">
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fportal.png?alt=media&token=348c1c56-d86e-46aa-a108-31bec28fffe0" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Site fiscal personalizado</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Importe e envie qualquer PDF</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fscanner.png?alt=media&token=138accce-931e-4106-8309-c1f96132de16" alt="Esdivatégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Disparo por inteligência artificial</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fpayment.png?alt=media&token=f2904bc7-c234-469a-9b72-b25a0e375037" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Rasdiveie status de pagamento</div>
                          </div>
                          <div style="display: flex; align-items: center;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fchat.png?alt=media&token=5f0ab85f-d76e-4cdf-99f6-c22db20fcc33" alt="Rasdiveio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">Dispare comunicados em massa</div>
                          </div>
                        </div>
                        <div class="container-docs">
                          <div>
                              <p style="margin-bottom: 8px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">Guias compatíveis</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b">Qualquer arquivo .PDF</p>
                              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b;">Todas as guias do Emissão Simples</p>
                          </div>
                        </div>
                        <hr class="diviser">
                        <p class="resume-title">Total</p>
                        <div class="input-continer-third">R$
                          <input v-model="monthlyPrice" class="inline-input third" type="text" maxlength="8" required @input="formatMonthlyPrice()">
                          /mês
                        </div>
                        <p style="margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155">Economia de tempo estimada</p>
                        <div class="input-continer-fourth">
                          <input v-model="hoursSaved" class="inline-input fourth" type="text" maxlength="5" required @input="validateRestInputs()">
                          horas/mês
                        </div>
                        <p style="margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155;">Forma de pagamento</p>
                        <p style="margin-bottom: 10px; margin-top: 0; font-size: 16px; font-weight: 600; color: #334155">Boleto bancário</p>
                        <div>
                          <div style="display: flex;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fcheck-green.png?alt=media&token=9fce7140-382d-4e23-957c-56c2f8210184" alt="Icon1" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; font-weight: 500; color: #475569; vertical-align: middle;">Sem taxa de adesão</div>
                          </div>
                          <div style="display: flex;">
                            <div style="vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fasterisk.png?alt=media&token=2844c908-66cf-4c0c-ba51-9a41205d5fcc" alt="Icon2" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                            <div style="padding-left: 8px; padding-top: 4px; color: #94a3b8; vertical-align: middle">Carência de 2 meses</div>
                          </div>
                        </div>
                        <a class="hover-bg-sh-dark-green" style="margin-left: auto; margin-right: auto; margin-top: 20px; display: block; cursor: pointer; border-radius: 4px; border-style: none; padding: 12px 16px; text-align: center; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-weight: 700; color: #fff; text-decoration-line: none; divansition-property: color, background-color, border-color, text-decoration-color, fill, sdivoke; divansition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); divansition-duration: 150ms; background-color: #0dce9a">
                          Assine agora
                        </a>
                      </div>
                      <div class="affiliate-info">
                        <div style="padding-top: 16px;">
                          <div style="width: 100%;">
                            <div>
                              <div style="width: 100px; vertical-align: middle;">
                                <img style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100px;" :src="loggedAffiliate.logoUrl" alt>
                              </div>
                              <div style="vertical-align: middle; padding-left: 10px;">
                                <p style="margin: 0; font-weight: bold; font-size: 20px; color: #2d3748;">
                                  {{ loggedAffiliate.name }}
                                </p>
                                <p style="margin-top: 0; margin-bottom: 4px; font-size: 14px; color: #718096;">
                                  Especialista | SimplesHub
                                </p>
                                <div cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px" role="none">
                                  <div style="display: flex;">
                                    <div valign="middle" style="vertical-align: middle;">
                                      <div style="height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/whatsapp-icon.png?alt=media&token=a1a7abc1-1076-4762-93e4-d5f4621e8b8f" alt style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                      </div>
                                    </div>
                                    <div valign="middle" style="vertical-align: middle;">
                                      <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="margin: 0; color: #2fb490; line-height: 20px;">{{ loggedAffiliate.phone }}</a>
                                    </div>
                                  </div>
                                  <div style="display: flex;">
                                    <div style="vertical-align: middle;">
                                      <div style="height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/email-icon.png?alt=media&token=0d99f049-8219-472a-b499-d600f032a365" alt="Email" style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                      </div>
                                    </div>
                                    <div style="vertical-align: middle;">
                                      <a href="mailto:${affiliate.email}" style="margin: 0; color: #2fb490; line-height: 20px;">{{ loggedAffiliate.email }}</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="proposal-footer">
                        <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0;">Você está recebendo este e-mail por ter se registrado no SimplesHub.</p>
                        <div style="font-family: 'Poppins', Arial, sans-serif; display: flex; flex-direction: row; gap: 32px"></div>
                        <a href="https://simpleshub.com.br/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none">Site</a> &bull;
                        <a href="https://www.instagram.com/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">Instagram</a> &bull;
                        <a href="https://www.linkedin.com/company/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">LinkedIn</a>
                        <p style="font-family: 'Poppins', Arial, sans-serif;"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="proposal-container" align="center">
                  <div class="inner-container">
                      <div class="logo-container">
                        <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FEmail-Marketing%2Fconfirmation%2Flogotype-75px.png?alt=media&token=73fcb281-c123-4738-ae98-b678416b9068" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100%">
                      </div>
                      <div class="proposal-body-container" align="center">
                        <div class="proposal-body">
                            <p class="title">
                              Seu plano <span style="font-weight: 700">SimplesHub Enterprise</span>
                            </p>
                            <p class="subTitle">
                              Agradecemos por escolher o SimplesHub para otimizar seus processos contábeis. Abaixo, detalhamos o plano que você escolheu.
                            </p>
                            <hr class="diviser">
                            <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fplan-enterprise.png?alt=media&token=acbb983b-afac-48c6-8086-1d68865be532" alt="Plano Enterprise" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 10px">
                            <p class="input-continer-first">
                              <span style="font-weight: 600;">SimplesHub Enterprise</span> - até
                              <input v-model="amountClient" class="inline-input first" type="text" minlength="1" maxlength="5" required @input="validateRestInputs()">
                              <span>clientes</span>
                            </p>
                            <p class="input-continer-second">
                              R$
                              <input v-model="priceClient" class="inline-input second" type="text" minlength="1" maxlength="6" required @input="formatPriceClient()">
                              por cliente
                            </p>
                            <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsimplesxml.png?alt=media&token=70da94f7-132a-4a46-80d2-ad2422635910" alt="SimplesXML" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                            <div class="container-functions">
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femit.png?alt=media&token=49ad434f-fc82-41b7-8efe-080d155e3798" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle">
                                  Busca automática de notas fiscais XML
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsync.png?alt=media&token=478594ef-c713-4d94-98f7-5c6c9771fb53" alt="Sincronização" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Sincronização automática em tempo real
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fgraph.png?alt=media&token=92f24920-710a-45b1-98dd-0ad8bc56947f" alt="Dados" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Dados financeiros esdivatégicos
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Freport.png?alt=media&token=a70f9452-bc01-4fce-9c31-6d027fce9305" alt="Relatório" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Relatórios interativos para clientes
                                </div>
                              </div>
                            </div>
                            <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femissaosimples.png?alt=media&token=6c0ccc55-7f92-4cec-aa00-ce25db197b25" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 32px">
                            <div class="container-functions">
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Femit.png?alt=media&token=49ad434f-fc82-41b7-8efe-080d155e3798" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Emissão automática de guias fiscais
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsend.png?alt=media&token=1d2d6672-accd-4fb1-bfeb-ae368acf75f2" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Envio automático (E-mail e WhatsApp)
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fstrategy.png?alt=media&token=f1281797-b66e-4624-9a34-a929f095e31f" alt="Esdivatégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Visão esdivatégica interativa
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fusers.png?alt=media&token=de0dae9f-709a-4e43-aced-d38f030b9828" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Adicione usuários da sua equipe
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsearch.png?alt=media&token=e229f3a3-2ea5-4fe7-9f40-7f0f026bc9e8" alt="Rasdiveio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Rasdiveio de envio e visualização
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fedit-email.png?alt=media&token=3c2b1031-2272-4603-827e-87352d7a63c3" alt="Email" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  E-mail de envio personalizado
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Download" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Download de guias em lote
                                </div>
                              </div>
                            </div>
                            <div class="container-docs">
                              <div>
                                <div style="font-family: 'Poppins', Arial, sans-serif;">
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">
                                    Guias compatíveis
                                  </p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 600; color: #64748b">DCTFWeb</p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b">Histórico de 3 meses</p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; margin-top: 0; font-size: 12px; color: #64748b;">Comprovantes</p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 16px; margin-top: 0; font-size: 12px; color: #64748b;">
                                    Exdivatos, recibos, DARFs e MAED
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
                                </div>
                              </div>
                            </div>
                            <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fsimplesconnect.png?alt=media&token=44433cde-0d11-41a9-b375-bd2b206e7e3b" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; margin-top: 32px;">
                            <div class="container-functions">
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fportal.png?alt=media&token=348c1c56-d86e-46aa-a108-31bec28fffe0" alt="Emissão" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Site fiscal personalizado
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Finbox.png?alt=media&token=cf2c1da6-dd9e-4de9-bff1-35e72611b59f" alt="Envio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Importe e envie qualquer PDF
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fscanner.png?alt=media&token=138accce-931e-4106-8309-c1f96132de16" alt="Esdivatégia" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Disparo por inteligência artificial
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fpayment.png?alt=media&token=f2904bc7-c234-469a-9b72-b25a0e375037" alt="Equipe" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Rasdiveie status de pagamento
                                </div>
                              </div>
                              <div style="display: flex; align-items: center;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                  <img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fchat.png?alt=media&token=5f0ab85f-d76e-4cdf-99f6-c22db20fcc33" alt="Rasdiveio" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                                </div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-size: 14px; color: #334155; vertical-align: middle;">
                                  Dispare comunicados em massa
                                </div>
                              </div>
                            </div>
                            <div class="container-docs">
                              <div>
                                <div style="font-family: 'Poppins', Arial, sans-serif;">
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 8px; margin-top: 20px; font-size: 16px; font-weight: 600; color: #374151">
                                    Guias compatíveis
                                  </p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b">
                                    Qualquer arquivo .PDF
                                  </p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 0; font-size: 14px; font-weight: 500; color: #64748b;">
                                    Todas as guias do Emissão Simples
                                  </p>
                                </div>
                              </div>
                            </div>
                            <hr class="diviser">
                            <p class="resume-title">Total</p>
                            <div class="input-continer-third">R$
                              <input v-model="monthlyPrice" class="inline-input third" type="text" maxlength="9" required @input="formatMonthlyPrice()">
                              /mês
                            </div>
                            <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155">Economia de tempo estimada</p>
                            <div class="input-continer-fourth">
                              <input v-model="hoursSaved" class="inline-input fourth" type="text" maxlength="6" required @input="validateRestInputs()">
                              horas/mês
                            </div>
                            <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 0; font-size: 14px; font-weight: 400; color: #334155;">Forma de pagamento</p>
                            <p style="font-family: 'Poppins', Arial, sans-serif; margin-bottom: 20px; margin-top: 0; font-size: 16px; font-weight: 600; color: #334155">Boleto bancário</p>
                            <div>
                              <div style="display: flex;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fcheck-green.png?alt=media&token=9fce7140-382d-4e23-957c-56c2f8210184" alt="Icon1" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; font-weight: 500; color: #475569; vertical-align: middle;">Sem taxa de adesão</div>
                              </div>
                              <div style="display: flex;">
                                <div style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;"><img src="https://firebasestorage.googleapis.com/v0/b/emissaosimplesweb.appspot.com/o/images%2FSistema-Comercial%2FEmail-Proposta%2Fasterisk.png?alt=media&token=2844c908-66cf-4c0c-ba51-9a41205d5fcc" alt="Icon2" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"></div>
                                <div style="font-family: 'Poppins', Arial, sans-serif; padding-left: 8px; padding-top: 4px; color: #94a3b8; vertical-align: middle">Carência de 2 meses</div>
                              </div>
                            </div>
                            <a href="https://simpleshub.com.br/subscriptions/" class="hover-bg-sh-dark-green" style="margin-left: auto; margin-right: auto; margin-top: 24px; display: block; cursor: pointer; border-radius: 4px; border-style: none; padding: 12px 16px; text-align: center; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-weight: 700; color: #fff; text-decoration-line: none; divansition-property: color, background-color, border-color, text-decoration-color, fill, sdivoke; divansition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); divansition-duration: 150ms; background-color: #0dce9a">
                              Assine agora
                            </a>
                        </div>
                        <div class="affiliate-info">
                          <div style="padding-top: 16px;">
                            <div style="width: 100%;">
                              <div>
                                <div style="width: 100px; vertical-align: middle;">
                                  <img style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; width: 100px;" :src="loggedAffiliate.logoUrl" alt>
                                </div>
                                <div style="vertical-align: middle; padding-left: 10px;">
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0; font-weight: bold; font-size: 20px; color: #2d3748;">
                                    {{ loggedAffiliate.name }}
                                  </p>
                                  <p style="font-family: 'Poppins', Arial, sans-serif; margin-top: 0; margin-bottom: 4px; font-size: 14px; color: #718096;">
                                    Especialista | SimplesHub
                                  </p>
                                  <div style="margin-bottom: 20px">
                                    <div style="display: flex;">
                                      <div valign="middle" style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                        <div style="font-family: 'Poppins', Arial, sans-serif; height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                          <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/whatsapp-icon.png?alt=media&token=a1a7abc1-1076-4762-93e4-d5f4621e8b8f" alt style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                        </div>
                                      </div>
                                      <div valign="middle" style="font-family: 'Poppins', Arial, sans-serif; vertical-align: middle;">
                                        <a href="https://wa.me/55${affiliate.phoneFormatted}?text=Ol%C3%A1%21+Gostaria+de+te+consultar+sobre+o+SimplesHub." style="font-family: 'Poppins', Arial, sans-serif; margin: 0; color: #2fb490; line-height: 20px;">{{ loggedAffiliate.phone }}</a>
                                      </div>
                                    </div>
                                    <div style="display: flex;">
                                      <div>
                                        <div style="height: 20px; line-height: 20px; margin-right: 8px; display: inline-block;">
                                          <img src="https://firebasestorage.googleapis.com/v0/b/sh-dev-b0fbf.appspot.com/o/email-icon.png?alt=media&token=0d99f049-8219-472a-b499-d600f032a365" alt="Email" style="max-width: 100%; line-height: 1; border: 0; vertical-align: middle;">
                                        </div>
                                      </div>
                                      <div >
                                        <a :href="'mailto:' + loggedAffiliate.email" style="margin: 0; color: #2fb490; line-height: 20px;">{{ loggedAffiliate.email }}</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="proposal-footer">
                          <div style="font-family: 'Poppins', Arial, sans-serif; padding: 32px; text-align: center; font-size: 12px; color: #4b5563">
                            <p style="font-family: 'Poppins', Arial, sans-serif; margin: 0;">Você está recebendo este e-mail por ter se registrado no SimplesHub.</p>
                            <div style="font-family: 'Poppins', Arial, sans-serif; display: flex; flex-direction: row; gap: 32px"></div>
                            <a href="https://simpleshub.com.br/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none">Site</a> &bull;
                            <a href="https://www.instagram.com/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">Instagram</a> &bull;
                            <a href="https://www.linkedin.com/company/simpleshub/" class="hover-text-decoration-underline" style="font-family: 'Poppins', Arial, sans-serif; color: #3b82f6; text-decoration: none;">LinkedIn</a>
                            <p style="font-family: 'Poppins', Arial, sans-serif;"></p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-undo" @click=closeModal()>
                  <template style="transition: all .3s !important">
                    <i class="fas fa-undo" style="color: #777986;"></i> Voltar
                  </template>
                </button>
                 <button v-if="!openConfirmation" class="btn btn-activate">
                  Enviar Proposta
                </button>
                <template v-else >
                  <SendConfirmation :user="user" :loggedAffiliate="loggedAffiliate" :amountClient="amountClient" :priceClient="priceClient" :monthlyPrice="monthlyPrice" :hoursSaved="hoursSaved" @cancelConfirmation="cancelConfirmation" />
                </template>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-backdrop fade" style="opacity: 0.1;" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
      </div>
    </transition>
    <div v-if="status.info" class="alert-container alert text-center alert-warning" :class="status.color" role="alert">
      {{ status.info }}
    </div>
  </div>
</template>

<script>
import SendConfirmation from './SendConfirmation.vue'
// import sendProposalPro from '../../plugins/sendProposalPro'
// import sendProposalEnterprise from '../../plugins/sendProposalEnterprise'

export default {
  props: ['user', 'loggedAffiliate'],
  components: {
    SendConfirmation
  },
  data: () => ({
    showModal: false,
    loading: false,
    changePlan: true,
    process: 'initial',
    amountClient: '',
    priceClient: '',
    monthlyPrice: '',
    hoursSaved: '',
    confirmed: false,
    openConfirmation: false,
    status: {
      info: '',
      color: ''
    }
  }),
  methods: {
    switchTable () {
      if (this.changePlan === true) {
        this.changePlan = false
        this.amountClient = ''
        this.hoursSaved = ''
        this.monthlyPrice = ''
        this.priceClient = ''
      } else {
        this.changePlan = true
        this.amountClient = ''
        this.hoursSaved = ''
        this.monthlyPrice = ''
        this.priceClient = ''
      }
    },
    formatPriceClient () {
      const regexPattern = /[a-zA-Z]|[#$%&]/
      const testPriceClient = regexPattern.test(this.priceClient[this.priceClient.length - 1])
      if (testPriceClient === false) {
        if (this.priceClient.length >= 3 && this.priceClient !== '') {
          const localString = this.priceClient.replace(',', '')
          const sliceOne = localString.slice(0, localString.length - 2)
          const sliceTwo = localString.slice(localString.length - 2)
          const result = sliceOne.concat(',', sliceTwo)
          this.priceClient = result
        }
      } else {
        this.priceClient = this.priceClient.replace(this.priceClient[this.priceClient.length - 1], '')
      }
    },
    formatMonthlyPrice () {
      const regexPattern = /[a-zA-Z]|[#$%&]/
      const testMonthPrice = regexPattern.test(this.monthlyPrice[this.monthlyPrice.length - 1])
      if (testMonthPrice === false) {
        if (this.monthlyPrice.length >= 3 && this.monthlyPrice !== '') {
          const localString = this.monthlyPrice.replace(',', '')
          const sliceOne = localString.slice(0, localString.length - 2)
          const sliceTwo = localString.slice(localString.length - 2)
          const result = sliceOne.concat(',', sliceTwo)
          this.monthlyPrice = result
        }
      } else {
        this.monthlyPrice = this.monthlyPrice.replace(this.monthlyPrice[this.monthlyPrice.length - 1], '')
      }
    },
    validateRestInputs () {
      const regexPattern = /[a-zA-Z]|[#$%&]/
      const testAmount = regexPattern.test(this.amountClient)
      const testHours = regexPattern.test(this.hoursSaved)
      if (testAmount === true) {
        this.amountClient = this.amountClient.replace(this.amountClient[this.amountClient.length - 1], '')
      }
      if (testHours === true) {
        this.hoursSaved = this.hoursSaved.replace(this.hoursSaved[this.hoursSaved.length - 1], '')
      }
    },
    cancelConfirmation () {
      this.amountClient = ''
      this.priceClient = ''
      this.monthlyPrice = ''
      this.hoursSaved = ''
      this.openConfirmation = false
    },
    closeModal () {
      this.amountClient = ''
      this.priceClient = ''
      this.monthlyPrice = ''
      this.hoursSaved = ''
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 15px;
    font-weight: 500;
    // color: rgb(6, 131, 115, 0.8);
    color: #5b5d6b;
  }
  .btn-action {
    color: var(--featured);
    background: rgba(6, 131, 115, 0.1);
    border: 2px solid rgb(6, 131, 115, 0.5);
    border-radius: 9px !important;
    padding: 0px 20px;

    &:disabled{
      color: var(--gray) !important;
      background: rgba(52, 58, 64, .075) !important;
      border: 2px solid rgba(52, 58, 64, .075);
    }
    &.loading {
      padding: 0px 22px;

      svg {
        margin-bottom: 1px;
      }
    }
  }
}
.modal-content{
  width: 900px !important;
  height: 905px;
  margin-left: -25%;
  margin-top: -10px;
  padding: 10px 30px !important;
  border-radius: 9px;
  outline: 2px solid #2FB490;

  .modal-header, .modal-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none !important;
    text-align: center;
    h6 {

    }
    .toogle-buttons {
      .inner-container {
        display: flex;
        background-color: #DDF1EE;
        // outline: 2px solid #45CDAA;
        border-radius: 9px;
        height: 43px;
        width: 240px;
        .current {
          margin: auto 3px auto 3px;
          height: 37.9px;
          width: 120px;
          transition: all .2s;
          border-radius: 9px 0px 0px 9px !important;
          cursor: pointer;

          p {
            margin: 5px 10px !important;
            color: #777986;
            font-size: 16px;
            font-weight: medium;
            word-spacing: 1px;
          }
          &.active {
            background-color: #45CDAA;
            border-radius: 9px;
            cursor: default;
            p {
              color: #FFFFFF !important;
              font-size: 17px;
              font-weight: bold;
            }

          }
        }
        .old {
          cursor: pointer;
          margin: auto 0px auto 0px !important;
          border-radius: 0px 9px 9px 0px !important;
          height: 37.9px;
          width: 125px;
          transition: all .2s;

          p {
            margin: 5px 10px !important;
            color: #777986;
            font-size: 16px;
            font-weight: medium;
            word-spacing: 1px;
          }

          &.active {
            background-color: #32CDA5;
            border-radius: 9px;
            cursor: default;

            p {
              color: #FFFFFF !important;
              font-size: 17px;
              font-weight: bold;
            }
          }
        }
      }

      ::selection {
        background:transparent;
      }
    }
  }

  .modal-body {
    background-color: #f1f5f9;
    border: 2px solid #F2F6FA;
    border-radius: 8px;
    overflow-y: scroll;
    height: 715px;
    .proposal-container {
      background-color: #f1f5f9;
      padding-top: 24px;
      padding-bottom: 0px;

      .inner-container {
        width: 700px;
        .logo-container {
          margin: auto auto 16px auto;
          width: 192px;
        }
        .proposal-body-container {
          width: 70%;

          .proposal-body {
            border-radius: 16px;
            background-color: #fff;
            padding: 48px;
            text-align: left;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

            .inline-input {
              box-shadow: none !important;
              border: 1px solid #9496a1 !important;
              border-top: 1px solid rgb(190, 241, 227, 0.5) !important;
              border-left: 1px solid rgb(190, 241, 227, 0.5) !important;
              border-right: 1px solid rgb(190, 241, 227, 0.5) !important;
              // border-radius: 3px !important;
              width: 55px;
              height: 30px !important;
              background-color: #f1f5f9;
              &.first {
                color: #334155;
                margin: 0px 2px;
                padding: 0px 1px;
              }

              &.second {
                border-bottom: 1px solid #2FB490 !important;
                font-size: 20px;
                font-weight: 600;
                color: #2FB490;
                margin: 0px 5px;
                width: 70px;
              }

              &.third {
                border-bottom: 1px solid #2FB490 !important;
                color: #2FB490;
                font-size: 20px;
                font-weight: 600;
                margin: 0px 0px;
                padding: 0px 1px;
                width: 100px;
              }

              &.fourth {
                border-bottom: 1px solid #334155 !important;
                font-size: 16px;
                font-weight: 600;
                color: #334155;
                margin: 0px 0px;
                padding: 0px 1px;
                width: 55px;
              }
            }

            .title {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #334155
            }

            .subTitle {
              padding-bottom: 5px;
              font-size: 14px;
              color: #475569
            }

            .diviser {
              margin-top: 20px;
              border-width: 2px;
              border-color: rgb(100 116 139 / 0.1)
            }

            .input-continer-first {
              margin-bottom: 4px;
              margin-top: 6px;
              font-size: 16px;
              color: #334155
            }
            .input-continer-second {
              margin-top: 0;
              margin-bottom: 16px;
              font-size: 20px;
              font-weight: 600;
              color: #2FB490;
            }
            .container-functions {
              margin-top: 8px;
              border: 0px solid rgb(16 185 129 / 0.25);
              border-left-width: 4px;
              padding-left: 8px;
              border-spacing: 0 4px
            }
            .container-docs {
              margin-top: 0;
              border: 0px solid rgb(16 185 129 / 0.25);
              border-left-width: 4px;
              padding-left: 8px;
              border-spacing: 0 4px;
            }
            .resume-title {
              margin-bottom: 0;
              font-size: 16px;
              font-weight: 500;
              color: #334155;
            }
            .input-continer-third {
              margin-top: 0;
              margin-bottom: 12px;
              font-size: 20px;
              font-weight: 600;
              color: #2FB490
            }
            .input-continer-fourth{
              margin-top: 0;
              font-size: 16px;
              font-weight: 600;
              color: #334155;
            }
          }
        }
      }
    }
    .affiliate-info{
      border-radius: 16px;
      background-color: #fff;
      padding: 24px 32px;
      text-align: left;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      margin-top: 32px;
    }

    .proposal-footer {
      padding: 32px;
      text-align: center;
      font-size: 12px;
      color: #4b5563
    }

  }
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-activate {
      display: flex;
      gap: 5px;
      align-items: center;
      color: var(--featured);
      background: rgba(6, 131, 115, 0.1);
      border: 2px solid rgb(6, 131, 115, 0.5) !important;
      padding: 10px 20px !important;
      margin-right: -12px !important;
      &.loading {
        padding: 15px 20px !important;

        svg {
          margin-bottom: 1px;
        }
      }
    }
    .btn-undo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #777986 !important;
      border: none;
      background-color: #ffffff;
      padding: 6px 9px !important;
      font-weight: 500 !important;
      font-size: 17px;
      letter-spacing: 0.5px;
      margin-left: -20px !important;
      transition: all .3s !important;
      &:hover{
          transform: translate(0, -3px);
      }
    }
  }

  .remove-confirmation{
    position: absolute !important;
    background-color: #fafafa;
    border-radius: 12px;
    border: 2px solid #2FB490;
    top: 30%;
    left: 280px;
    width: 335px;
    height: 315px;
    text-align: start;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 25px;
    .confirmation-header {
      h5 {
      font-size: 20px;
      font-weight: 700;
      color: #282A3A;
      }
      p{
        font-size: 13px;
        font-weight: 400;
        color: #404252;
        word-spacing: 5px;
      }
    }
    .confirmation-body {
      ul {
        padding-left: 10px;
        li {
          padding-top: 1px;
          padding-bottom: 1px;
          font-size: 13px;
          font-weight: 400;
          color: #404252;
        }
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: #404252;
        text-align: justify;
      }
    }
    .confirmation-footer {
      .btn-activate {
        color: var(--featured);
        background: rgba(6, 131, 115, 0.1);
        border: 2px solid rgb(6, 131, 115, 0.5) !important;
        padding: 10px 20px !important;
        margin-right: -10px !important;
        &.loading {
          padding: 15px 20px !important;

          svg {
            margin-bottom: 1px;
          }
        }
      }
    }
  }
}
.alert-container {
  width: 500px;
  right: 80% !important;
  left: 15% !important;
  font-weight: 600;
}
</style>
