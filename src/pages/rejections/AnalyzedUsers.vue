<template>
    <div>
        <button class="btn  btn-sm btn-primary-border" style="width: 145px;" @click="initialChanges()">Botão Mágico</button>
        <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Análise do Cliente</h4>
                        <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal"
                            aria-label="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                      <div v-if="!loading">
                        <div class="info-client-container">
                          <div class="container-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>
                            <h5>Informações conta</h5>
                          </div>
                          <div class="container container-information">
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Frequência:</strong>
                              <div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(5, 'months').format('YYYYMM')) + '%'"></div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(4, 'months').format('YYYYMM')) + '%'"></div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(3, 'months').format('YYYYMM')) + '%'"></div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(2, 'months').format('YYYYMM')) + '%'"></div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(1, 'months').format('YYYYMM')) + '%'"></div>
                                <div class="column-chart" :style="'height: ' + verifySizeChart(user, moment(new Date()).subtract(0, 'months').format('YYYYMM')) + '%'"></div>
                              </div>
                            </div>
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Emissões disponíveis:</strong>
                              <span>{{user.emissions}}</span>
                            </div>
                            <div class="inner-container-information" style="display: flex; justify-content: space-between; align-items: center; margin: 5px 0;">
                              <strong style="font-weight: 600;" >Emissões do plano:</strong>
                              <span v-if="user.pagarmePlan.amount"> {{ user.pagarmePlan.amount }}</span>
                              <span v-else>Não Informado</span>
                            </div>
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Quantidade de perfis:</strong>
                              <span v-if="user.profile && user.profile.profiles">Total: {{ Object.keys(user.profile.profiles).length }} </span>
                              <span v-else>0</span>
                            </div>
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Quantidade de clientes:</strong>
                              <span v-if="user.clientsAmount > 0">Total: {{ user.clientsAmount}} </span>
                              <span v-else>Não informado</span>
                            </div>
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Contato telefônico:</strong>
                              <span>{{user.phone}}</span>
                            </div>
                            <div class="without-border inner-container-information">
                              <strong style="font-weight: 600;">Criado em:</strong>
                              <template v-if="user.createdAt">
                                <span>{{date}}</span>
                              </template>
                              <template v-else>
                                <span>-</span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="signature-client-container">
                          <div class="container-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 576 512"><path d="M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66 14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96 225.06V416h68.99l161.68-162.78-67.88-67.88L288 346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25 67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z"/></svg>                            <h5>Assinatura</h5>
                          </div>
                          <div  class="container container-information" v-if="user.pagarmeSubscription && user.pagarmeSubscription.lastTransations">
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Plano atual:</strong>
                              <span v-if="user.pagarmeSubscription">{{ user.pagarmePlan.name }}</span>
                              <span v-else>Não Assinante</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription && user.pagarmeSubscription.paymentMethod">
                              <strong style="font-weight: 600;">Forma de pagamento:</strong>
                              <span v-if="user.pagarmeSubscription && user.pagarmeSubscription.paymentMethod && !user.pagarmeSubscription.paymentMethod">
                                Não Informado
                              </span>
                              <span v-else-if="user.pagarmeSubscription && user.pagarmeSubscription.paymentMethod && user.pagarmeSubscription.paymentMethod === 'boleto'">
                                Boleto
                              </span>
                              <span v-else>
                                Cartão de Crédito
                              </span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Dia do vencimento:</strong>
                                <span v-if="user.pagarmeSubscription.dueDay"> dia {{ user.pagarmeSubscription.dueDay }}</span>
                                <span v-else>Não informado</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Email financeiro:</strong>
                                <span v-if="user.pagarmeSubscription.financialEmail"> {{ user.pagarmeSubscription.financialEmail }}</span>
                                <span v-else>Não informado</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Data da contratação:</strong>
                                <span v-if="user.pagarmeSubscription.createdAt">{{ moment(user.pagarmeSubscription.createdAt).format('DD/MM/YYYY HH:mm') }}</span>
                                <span v-else>Não informado</span>
                            </div>
                            <template v-if="user.pagarmeSubscription && user.pagarmeSubscription.lastTransations">
                              <strong style="font-weight: 600; margin-left: -428px; font-size: 14px; color: #404252;">Últimos boletos:</strong>
                              <div v-for="(transation, index) in user.pagarmeSubscription.lastTransations" :key="index" class="inner-container-transations">
                                  <strong> Data : {{ transation.expirationDate }}</strong>
                                  <span v-if="transation.status === 'paid'"><a class="info-status status-loading boleto_button">Pago</a></span>
                                  <span v-else-if="transation.status == 'pending'"><a class="info-status status-success boleto_button" :href="transation.lastBoletoUrl">Pendente</a></span>
                              </div>
                            </template>
                            <div v-else class="inner-container-information" style=" margin: 5px 0;">
                            </div>
                          </div>
                          <div  class="container container-information" v-else>
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Plano atual:</strong>
                              <span v-if="user.pagarmeSubscription">{{ user.pagarmePlan.name }}</span>
                              <span v-else>Não Assinante</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription && user.pagarmeSubscription.payment_method">
                              <strong style="font-weight: 600;">Forma de pagamento:</strong>
                              <span v-if="user.pagarmeSubscription && user.pagarmeSubscription.payment_method && !user.pagarmeSubscription.payment_method">
                                Não Informado
                              </span>
                              <span v-else-if="user.pagarmeSubscription && user.pagarmeSubscription.payment_method && user.pagarmeSubscription.payment_method === 'boleto'">
                                Boleto
                              </span>
                              <span v-else>
                                Cartão de Crédito
                              </span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Início do Período:</strong>
                                <span v-if="user.pagarmeSubscription.current_period_start">{{ moment(String(user.pagarmeSubscription.current_period_start)).format('DD-MM-YYYY HH:mm') }}</span>
                                <span v-else>Período Inicial não informado</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Final do Período:</strong>
                                <span v-if="user.pagarmeSubscription.current_period_end"> {{ moment(String(user.pagarmeSubscription.current_period_end)).format('DD-MM-YYYY HH:mm') }}</span>
                                <span v-else>Período Final não informado</span>
                            </div>
                            <div class="inner-container-information" v-if="user.pagarmeSubscription">
                                <strong style="font-weight: 600;">Data da Contratação:</strong>
                                <span v-if="user.pagarmeSubscription.date_created"> {{ moment(String(user.pagarmeSubscription.date_created)).format('DD-MM-YYYY HH:mm') }}</span>
                                <span v-else>Período Final não informado</span>
                            </div>
                            <div v-if="user.pagarmeSubscription && user.pagarmeSubscription.payment_method && user.pagarmeSubscription.payment_method === 'boleto'" class="without-border inner-container-information" style="margin: 0;">
                              <strong style="font-weight: 600;">Link do último Boleto</strong>
                              <span v-if="user.pagarmeSubscription.current_transaction && user.pagarmeSubscription.current_transaction.boleto_url"><a class="btn btn-sm btn-primary" :href="user.pagarmeSubscription.current_transaction.boleto_url" target="_blank" style="padding: .25rem 1.7rem !important; margin: 0px;"><i class="fas fa-file-invoice-dollar"></i>Acessar boleto</a></span>
                              <span v-else>Link do boleto indisponível</span>
                            </div>
                            <div v-else class="inner-container-information" style=" margin: 5px 0;">
                            </div>
                          </div>
                        </div>
                        <div v-if="loggedAffiliate.adm" class="certificate-client-container">
                          <div class="container-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/></svg>
                            <h5>Certificado digital</h5>
                          </div>
                          <div class="container container-information">
                            <div class="inner-container-information">
                              <strong style="font-weight: 600;">Situação:</strong>
                              <span v-if="user.digitalCertificate.expired === 0">Não possui</span>
                              <span v-else-if="user.digitalCertificate.expired === 1">Vencido</span>
                              <span v-else>À vencer</span>
                            </div>
                            <template v-if="user.digitalCertificate.expired !== 0">
                              <div class="inner-container-information">
                                  <strong style="font-weight: 600;">Senha do certificado:</strong>
                                  <template v-if="user.digitalCertificate">
                                    <span v-if="!passwordVisible" @click="passwordVisible = !passwordVisible">********</span>
                                    <span v-else @click="passwordVisible = !passwordVisible">{{ user.digitalCertificate.password }}</span>
                                  </template>
                                  <span v-else> - </span>
                              </div>
                              <div class="without-border inner-container-information">
                                  <strong style="font-weight: 600;">Baixar certificado:</strong>
                                  <span v-if="user.digitalCertificate && user.digitalCertificate.digitalCertificateUrl"><a class="btn btn-sm btn-secondary" :href="user.digitalCertificate.digitalCertificateUrl" target="_blank" style="padding: .25rem 1.7rem !important; margin: 0px; background-color: #07ad7e"><i class="fas fa-file-alt"></i>Certificado Digital</a></span>
                                  <span v-else>Indisponível</span>
                              </div>
                            </template>
                          </div>
                        </div>
                        <div v-else class="certificate-client-container"></div>
                        <hr>
                        <div class="container-fluid" style="margin: 0; padding: 0;">
                          <div class="sections-container">
                            <div>
                              <h5>Parcelamentos</h5>
                              <div class="container">
                                <div class="section-container" v-if="user.results && user.results.simplesInstallments">
                                  <span>Simples Nacional</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesInstallments.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesInstallments.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesInstallments.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesInstallments.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.simplesInstallments.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>Simples Nacional</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>

                                <div class="section-container" v-if="user.results && user.results.receitaInstallments">
                                  <span>Receita Federal</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.receitaInstallments.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.receitaInstallments.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.receitaInstallments.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.receitaInstallments.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.receitaInstallments.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>Receita Federal</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>

                                <div class="section-container" v-if="user.results && user.results.pgfnInstallments">
                                  <span>PGFN</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.pgfnInstallments.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.pgfnInstallments.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.pgfnInstallments.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.pgfnInstallments.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.pgfnInstallments.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>PGFN</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>

                                <div class="section-container" v-if="user.results && user.results.especialInstallments">
                                  <span>Especial</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.especialInstallments.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.especialInstallments.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.especialInstallments.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.especialInstallments.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.especialInstallments.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>Especial</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5>DCTFWeb</h5>
                              <div class="container">
                                <div class="section-container" v-if="user.results && user.results.dctfwebCollections">
                                  <span>DCTFWeb</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.dctfwebCollections.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.dctfwebCollections.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.dctfwebCollections.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.dctfwebCollections.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.dctfwebCollections.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>DCTFWeb</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5>Guias de DAS</h5>
                              <div class="container">
                                <div class="section-container" v-if="user.results && user.results.meiCollections">
                                  <span>MEI</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.meiCollections.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.meiCollections.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.meiCollections.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.meiCollections.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.meiCollections.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>MEI</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-if="user.results && user.results.simplesCollections">
                                  <span>Simples Nacional</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesCollections.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesCollections.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesCollections.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.simplesCollections.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center; padding-left: ">
                                      {{ user.results.simplesCollections.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>Simples Nacional</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5>Certidões Negativas</h5>
                              <div class="container">
                                <div class="section-container" v-if="user.results && user.results.certificates">
                                  <span>Certidões Negativas</span>
                                  <div class="inner-section">
                                    <div class="info-status status-success status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.certificates.success }}
                                    </div>
                                    <div class="info-status status-warning status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.certificates.warning }}
                                    </div>
                                    <div class="info-status status-danger status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.certificates.danger }}
                                    </div>
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700;">
                                      {{ user.results.certificates.loading }}
                                    </div>
                                    <div class="info-status status-verifing status-analyzed"
                                      style="font-size: 12px; font-weight: 700; display: flex; align-items: center;">
                                      {{ user.results.certificates.verifing }}
                                      <i class="fas fa-exclamation-triangle pl-1" style="color: var(--warning)"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="section-container" v-else>
                                  <span>Certidões Negativas</span>
                                  <div class="inner-section">
                                    <div class="info-status status-loading status-analyzed" style="font-size: 12px; font-weight: 700; width: 325px">
                                      Não Disponível
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="container-fluid page-spinner-modal">
                        <img class="base-spinner-modal" src="../../assets/images/es-loading-100x100-transparente.gif">
                      </div>
                    </div>
                </div>
            </div>
            <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
                {{ status.info }}
            </div>
            <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{ display: showModal ? 'block' : 'none' }"></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['user'],
  data: () => ({
    showModal: false,
    showSubscription: false,
    loading: true,
    hasCpf: false,
    infoLoading: false,
    loggedAffiliate: {},
    customersLenght: 0,
    status: {
      info: '',
      color: ''
    },
    passwordVisible: false,
    profileQuantity: 0
  }),
  computed: {
    date () {
      let date = ''
      try {
        if (!this.user.createdAt) {
          return 'Selecione uma data'
        } else {
          const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
          const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
          const year = (moment(this.user.createdAt).year())
          const dayofWeek = weekdays[moment(this.user.createdAt).weekday()]
          const dayAndMonth = months[moment(this.user.createdAt).month()]
          const day = moment(this.user.createdAt).format('DD')
          date = `${dayofWeek}, ${day} ${dayAndMonth} de ${year}`
          return date
        }
      } catch (msg) {
        console.log(msg)
      }
      return date
    }
  },
  methods: {
    async getUserInfo () {
      if (this.affiliates) {
        for (let i = 0; i < this.affiliates.length; i++) {
          if (this.affiliates[i].id === window.uid) {
            this.loggedAffiliate = this.affiliates[i]
          }
        }
      } else {
        console.log('erro - afiliado logado')
      }
      await this.$firebase.database().ref('support/supportAffiliates').on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          const tempArray = Object.keys(values).map(i => values[i])
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].adm && tempArray[i].id === window.uid) {
              this.loggedAffiliate = tempArray[i]
            }
          }
        } else {
          console.log('erro - afiliados')
        }
      })
    },
    async initialChanges () {
      this.showModal = true
      this.getUserInfo()
      if (!this.user.results) {
        this.user.results = {}
        await this.getData('dctfwebCollections')
        await this.getData('meiCollections')
        await this.getData('simplesCollections')
        await this.getData('simplesInstallments')
        await this.getData('receitaInstallments')
        await this.getData('pgfnInstallments')
        await this.getData('especialInstallments')
        await this.getData('certificates')
        // await this.getData('digitalCertificates', false)
      }
      this.loading = false
    },
    async getData (table, isArray = true) {
      await this.$firebase.database().ref(table).child(this.user.uId).once('value', snapshot => {
        let values = snapshot.val()
        if (values) {
          values = Object.keys(values).map(i => values[i])
          if (isArray) {
            var results = {
              success: 0,
              warning: 0,
              danger: 0,
              loading: 0,
              verifing: 0
            }
            const result = Object.keys(values).map(i => values[i])
            if (table === 'dctfwebCollections') {
            }
            for (let i = 0; i < result.length; i++) {
              if (result[i].loading) {
                results.loading = results.loading + 1
              } else if (result[i].status && result[i].status.color === 'status-success') {
                results.success = results.success + 1
              } else if (result[i].status && result[i].status.color === 'status-warning') {
                results.warning = results.warning + 1
              } else if (result[i].status && result[i].status.color === 'status-danger') {
                results.danger = results.danger + 1
              } else if (result[i].status && result[i].status.info === 'Verificando Erro') {
                results.verifing = results.verifing + 1
              }
            }
            this.user.results[table] = results
          }
        }
      })
    },
    closeModal () {
      this.showModal = false
    },
    toTimestamp (strDate) {
      var datum = Date.parse(strDate)
      return datum / 100
    },
    verifySizeChart (user, date) {
      if (user.emissionsHistoric && user.emissionsHistoric[date] && user.pagarmePlan.amount) {
        if (user.emissionsHistoric[date].totalEmissions) {
          const result = Math.round((parseInt(user.emissionsHistoric[date].totalEmissions) / user.pagarmePlan.amount) * 100)
          if (result <= 100) {
            return result
          } else {
            return 100
          }
        } else {
          const historicLenght = Object.keys(user.emissionsHistoric[date].emissions).map(i => user.emissionsHistoric[date].emissions[i]).length
          const result = (historicLenght / user.pagarmePlan.amount) * 100
          if (result <= 100) {
            return result
          } else {
            return 100
          }
        }
      } else {
        if (user.emissionsHistoric && user.emissionsHistoric[date] && user.emissionsHistoric[date].emissions && !user.pagarmePlan.amount) {
          const historicLenght = Object.keys(user.emissionsHistoric[date].emissions).map(i => user.emissionsHistoric[date].emissions[i]).length
          const result = (historicLenght / 50) * 100
          if (result <= 100) {
            return result
          } else {
            return 100
          }
        }
      }
      return 1
    }
  }
}
</script>

<style lang="scss" scoped>
.column-chart{
  background-color: var(--featured-light);
  width: 15px !important;
  min-height: 1px;
  margin: 0 1px;
  border-radius: 4px;
  display: inline-block;
  align-self: flex-end;
}
.modal-content {
  width: 590px !important;
  .modal-body {
      padding-top: 0;
      height: 100vh;

    .container-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 5px;
      svg {
          fill: #404252;
      }
      h5 {
          color: #282a3a;
          text-align: center;
          margin: auto 0;
          font-size: 17px;
          font-weight: 600;
          padding-left: 3px;
        }
    }
    .page-spinner-modal {
      background: var(--background-gray) !important;
      z-index: 9999 !important;
      position: fixed;
    }
    .base-spinner-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      height: 70px;
      transform: translate(-50%, -50%);
      z-index: 9999 !important;
    }
    .section{
      display: flex;
      justify-content: space-between;
      text-align: center;
      span {
          margin-right: 10px;
        }
      }
    .sections-container .container{
      padding: 0 2px !important;
    }
    .container-information{
      margin: 12px 0;
      padding: 0 2px !important;
      .inner-container-information{
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0 !important;
        margin-bottom: 8px !important;
        &.without-border {
          border-bottom: none !important;
        }
        strong {
          font-weight: 700;
          font-size: 14px;
          color: #404252;
        }
        input {
          box-shadow: none !important;
          border: none !important;
          text-align: end;
          cursor: pointer;
        }
      }
      .inner-container-transations {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 8px !important;
        p {
          margin-bottom: 0px;
        }
        strong {
          font-weight: 500;
          font-size: 13px;
          color: #404252;
        }
        .transation_status {
          font-size: 12px;
          margin-right: 8px;
          color: #101223;
        }
        .boleto_button {
          padding: .25rem 1.7rem !important;
          margin: 0px;
          text-decoration: none !important;
          cursor: pointer !important;
        }
      }
    }
    .sections-container{
      display: flex;
      flex-flow: column;
      gap: 15px;
      text-align: start;
      .section-container{
      display: flex;
      justify-content: space-between;
      align-items: center;

      .inner-section {
          display: flex;
          gap: 0px;
          margin: 0
        }
    }
    }
    .info-status{
        border: none;
        cursor: default !important;
        margin: 3px;
        border-radius: 4px;
        height: 27px;
        font-weight: 700 !important;
        background-color: white;
        transition: all .2s;
        padding: 6px 17px;
        min-width: 50px;
        width: 60px;
        text-align: center;
      }
    .info-status-sm{
        border-radius: 4px;
        transition: all .2s;
        min-width: 50px;
        width: 50px;
        text-align: center;
    }
    .data-status{
      border: none;
        cursor: default !important;
        margin: 3px;
        border-radius: 4px;
        height: 27px;
        font-weight: 700 !important;
        background-color: white;
        transition: all .2s;
        padding: 6px 17px;
        min-width: 100;
        width: 110px;
        text-align: center;
    }
  }
  .modal-header {
    padding: 12px 16px 10px 16px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eaeaea
  }

  .custom-checkbox {
      margin: 10px 0 0 2px;
  }
  .custom-control-label::before {
      height: 1.2rem !important;
      width: 1.2rem !important;
      top: .15rem;
      left: -1.60rem;
      box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.15) !important;
      border-color: white !important;
      border-radius: 5px;
  }
  .custom-control-label::after {
      border-color: var(--featured) !important;
  }
  .custom-control-input:checked~.custom-control-label::before {
      box-shadow: none !important;
      color: white !important;
      background-color: var(--featured) !important;
      border-color: var(--featured) !important;

      &:focus {
          border: none !important;
      }
  }
  h4, h5 {
      font-weight: 700;
  }
  .form-group {
      margin: 7px 0;
  }
  .btn-remove {
      color: var(--red-light);
      padding: 0;
      border: none;
      background-color: white;
      margin-left: 3px;

      i {
          margin-right: 5px;
      }
  }
}
.input-group-text {
    position: absolute;
    background-color: var(--featured) !important;
    color: white;
    right: 2px;
    bottom: 3px;
    top: 3px;
    border: none;
    cursor: pointer;
    border-radius: 10px !important;
    z-index: 999;
}
</style>
