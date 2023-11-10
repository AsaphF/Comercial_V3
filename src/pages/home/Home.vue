<template>
  <div class="container-fluid">
    <div class="row">
      <layout-navigation/>
      <div class="col-lg-12 col-content" v-if="loggedAffiliate.actived">
        <div class="content main-container">
          <div class="container-fluid header" style="border-radius: 7px !important;">
            <div class="row info-container header-page-container" style="border-radius: 9px !important;">
              <div class="left-container">
                <h2 class="title" style="">
                  Olá, Especialista {{ capitalize(loggedAffiliate.name) }}
                </h2>
                <p class="subtitle mt-3">
                  Confira sua agenda semanal, defina suas metas e conquiste vendas bem-sucedidas!
                </p>
              </div>
            </div>
          </div>
          <div class="container-body">
            <div v-if="!loadingPage" class="left-body-container">
              <div class="clients-info-container">
                <h3>Clientes</h3>
                <div class="general-info">
                  <div class="client-info">
                    <template v-if="todayLeads.length > 0">
                      <div class="cicle-background first" @click="$router.push({ path: `/hotleads/${encodeURIComponent(today)}` })">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 448 512" style="fill: #e6ac00;"><path d="M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"/></svg>
                      </div>
                    </template>
                    <template>
                      <div class="cicle-background first">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 448 512" style="fill: #e6ac00;"><path d="M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"/></svg>
                      </div>
                    </template>
                    <div class="info" style="margin-bottom: 12px !important; padding-top: 0px;">
                      <p class="descriptor">Leads a tratar</p>
                      <div class="text-container">
                        <p class="data-text" style="font-weight: 400 !important;">{{ leads.length }}</p>
                        <sup v-if="todayLeads.length > 0">+ {{ todayLeads.length }} hoje</sup>
                        <sup v-else></sup>
                      </div>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: #a4e1d8; padding: 9px;">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.42139 23.184C8.61605 26.0987 12.0921 28 16.0001 28C22.6001 28 28.0001 22.6 28.0001 16C28.0001 9.4 22.6001 4 16.0001 4" stroke="#2FB490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.42133 23.184C4.90933 21.176 4 18.692 4 16C4 9.4 9.4 4 16 4" stroke="#2FB490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6667 9.33333V11" stroke="#2FB490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6667 22.6667V21" stroke="#2FB490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9827 13.3333C18.896 12.032 17.8227 11 16.5 11H14.6734C13.38 11 12.3334 12.048 12.3334 13.34C12.3334 14.4133 13.064 15.3493 14.104 15.6107L17.228 16.3947C18.2694 16.656 18.9987 17.592 18.9987 18.6653C18.9987 19.9587 17.9507 21.0053 16.6587 21.0053H14.832C13.5067 21.0053 12.4334 19.9707 12.348 18.6667" stroke="#2FB490" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor">Comissão Atual</p>
                      <p class="data-text"  style="color: #068373;">R$ {{ bonusResult }}</p>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: #E1F2FF; padding: 8px;">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.0814 8.99066L16.0067 19.0653L10.9707 14.028" stroke="#76A5E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M27.46 18.008V24.5333C27.46 26.08 26.2067 27.3333 24.66 27.3333H7.59333C6.04667 27.3333 4.79333 26.08 4.79333 24.5333V7.46667C4.79333 5.92001 6.04667 4.66667 7.59333 4.66667H16.1267" stroke="#76A5E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor">Vendas no mês</p>
                      <p class="data-text">{{ salesAmount }}</p>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: #FAE4E4; padding: 8px;">
                      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.671 11.1644H21.3355C20.5988 11.1644 20.0016 10.5672 20.0016 9.83055V4.495" stroke="#E87979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.99658 11.1644V7.16277C7.99658 5.6894 9.19099 4.495 10.6644 4.495H20.231C20.9385 4.495 21.6169 4.77631 22.1171 5.27665L25.8894 9.04889C26.3897 9.54908 26.671 10.2275 26.671 10.935V25.8372C26.671 27.3106 25.4766 28.505 24.0032 28.505H10.6644C9.19099 28.505 7.99658 27.3106 7.99658 25.8372V24.5033" stroke="#E87979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6645 17.5871V15.1394" stroke="#E87979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6645 20.2869C10.6324 20.2869 10.6017 20.2997 10.5792 20.3225C10.5566 20.3453 10.5441 20.3762 10.5445 20.4083C10.5445 20.4575 10.5742 20.5018 10.6197 20.5205C10.6652 20.5393 10.7175 20.5286 10.7522 20.4936C10.7868 20.4586 10.7968 20.4062 10.7776 20.3609C10.7584 20.3156 10.7137 20.2864 10.6645 20.2869" stroke="#E87979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="3.995" y="11.1644" width="13.3389" height="13.3389" rx="4" stroke="#E87979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor">Pagamento Pendente</p>
                      <p class="data-text">{{ pendingAmount }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contracts-container">
                <div class="contracts-info">
                  <div class="contract-info-container">
                    <h3>Contratos</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor">Mais Rentável</small>
                        <p v-if="subscriptionsArray.length > 0" class="data-name">{{ profitablesUsers.more.name.slice(0, 20) }}...</p>
                        <p v-else class="data-name">Sem contratos assinados</p>
                        <p v-if="subscriptionsArray.length > 0" class="data-text" style="color: #068373;">R$ {{ profitablesUsers.more.price }}</p>
                        <p v-else class="data-text" style="color: #068373;">R$ 0,00</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor">Menos Rentável</small>
                        <p v-if="subscriptionsArray.length > 0" class="data-name">{{ profitablesUsers.less.name.slice(0, 30) }}...</p>
                        <p v-else class="data-name">Sem contratos assinados</p>
                        <p v-if="subscriptionsArray.length > 0" class="data-text" style="color: #E87979;">R$ {{ profitablesUsers.less.price }}</p>
                        <p v-else class="data-text" style="color: #E87979;">R$ 0,00</p>
                      </div>
                    </div>
                  </div>
                  <div class="plan-info-container">
                    <h3>Tipos de Plano</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor">Planos Novos</small>
                        <p v-if="subscriptionsArray.length > 0" class="data-text">{{ users.length }}</p>
                        <p v-else class="data-text">0</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor">Planos Antigos</small>
                        <div v-if="subscriptionsArray.length > 0" class="text-container">
                          <p class="data-text" style="font-weight: 400;">{{ oldPlansUsers.length }}</p>
                          <sup v-if="OldUsersfiltered.length > 0">{{ OldUsersfiltered.length }}  Pagos ou Pendentes</sup>
                          <sup v-else></sup>
                        </div>
                        <div v-else class="text-container">
                          <p class="data-text">0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!plansLoading" class="suggestion-container" >
                    <template v-if="seeSuggestion">
                      <div class="upper-section">
                        <h3>Sugestão para Upsell</h3>
                        <div class="nav-button-pair">
                          <button class="updates-nav" @click="getMoreSuggestions('back')">
                            <svg data-v-7661b20e="" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="7.77815" y1="13.4351" x2="0.707078" y2="6.36407" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="7.77817" y1="0.707107" x2="0.707107" y2="7.77817" stroke="#9496A1" stroke-width="2"></line></svg>
                          </button>
                          <button class="updates-nav" @click="getMoreSuggestions('foward')">
                            <svg data-v-7661b20e="" width="35" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="0.707107" y1="1.29289" x2="7.77817" y2="8.36396" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="0.707078" y1="14.0209" x2="7.77814" y2="6.94985" stroke="#9496A1" stroke-width="2"></line></svg>
                          </button>
                        </div>
                      </div>
                      <div class="row inner-info">
                        <div class="description-container col-5">
                          <small class="descriptor">Cliente</small>
                          <p v-if="oldPlansUsers[0]" class="data-text">{{ currentSuggestion.name.slice(0, 20) }}...</p>
                          <p v-else class="data-text">Sem Sugestões</p>
                        </div>
                        <div class="description-container col-6">
                          <small class="descriptor">Planos Atual</small>
                          <p v-if="oldPlansUsers[0]" class="data-text">{{currentSuggestion.pagarmePlan.name }} - <span style="color: #068373;">R$ {{ this.formattedPrice(currentSuggestion.planPrice) }}</span></p>
                          <p v-else class="data-text">Sem Sugestões</p>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <h3>Sugestão para Upsell</h3>
                      <div class="row inner-initial">
                        <div v-if="subscriptionsArray.length > 0" class="btn-suggestion" @click="getSuggestion()">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 15.1899H9" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.541 14.8959C6.765 13.6409 5.7 11.4499 6.075 9.03795C6.481 6.43095 8.654 4.34995 11.275 4.04295C14.913 3.61595 18 6.44795 18 9.99995C18 12.0249 16.994 13.8119 15.457 14.8979C15.181 15.0929 15 15.3949 15 15.7329V18.4999C15 19.8809 13.881 20.9999 12.5 20.9999H11.5C10.119 20.9999 9 19.8809 9 18.4999V15.7369C9 15.3959 8.818 15.0919 8.541 14.8959Z" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 5.00006L21.19 3.81006" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 15L2.81 16.19" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 4.00006L3.81 2.81006" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 15L21.19 16.19" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 10H22.69" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.31 10H3" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 18H14.87" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p>Ver Sugestão</p>
                        </div>
                        <div v-else class="btn-suggestion">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 15.1899H9" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.541 14.8959C6.765 13.6409 5.7 11.4499 6.075 9.03795C6.481 6.43095 8.654 4.34995 11.275 4.04295C14.913 3.61595 18 6.44795 18 9.99995C18 12.0249 16.994 13.8119 15.457 14.8979C15.181 15.0929 15 15.3949 15 15.7329V18.4999C15 19.8809 13.881 20.9999 12.5 20.9999H11.5C10.119 20.9999 9 19.8809 9 18.4999V15.7369C9 15.3959 8.818 15.0919 8.541 14.8959Z" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 5.00006L21.19 3.81006" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 15L2.81 16.19" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 4.00006L3.81 2.81006" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 15L21.19 16.19" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 10H22.69" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.31 10H3" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 18H14.87" stroke="var(--success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p>Ver Sugestão</p>
                        </div>
                        <div class="container-explanation">
                          <p>Clique para sugerir clientes de planos antigos para upsell.</p>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-else class="suggestion-container" style="background-color: rgba(0, 0, 0, 0.07); border-top: 1px solid rgba(0, 0, 0, 0.07);">
                    <h3>Sugestão para Upsell</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor title-loading">Cliente</small>
                        <p class="data-text subtitle-loading">ÁLAMO GRÁFICA</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor title-loading">Planos Atual</small>
                        <p class="data-text subtitle-loading">Premium</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="last-contracts">
                  <div class="title-section">
                    <h3>Últimos Contratos Mensais</h3>
                    <small>{{ timeHumanize() }}</small>
                  </div>
                  <div class="lasts-list">
                    <template v-if="monthlyContracts.length > 0">
                      <div class="empty-container">
                        <p>Seus contratos deste mês aparecerão aqui.<br> Boas vendas!</p>
                        <div class="counter-container">
                          <P>Dias restantes até o final do mês: <span>21</span></P>
                          <p>Contratos conquistados até o momento: {{ paidsContracts }}</p>
                          <p>Dias: 21 - Horas: 10 horas - minutos: 36 min - segundos: 50 s</p>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div v-for="(user, i) in monthlyContracts" :key="i" class="inner-container">
                        <div v-if="user.pagarmePaymentStatus === 'Pago'" :key="i" class="body-info paid" @click="$router.push({ path: `/users/${user.name}` })">
                          <div class="cicle-background">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26.6711 10.6644H21.3356C20.5989 10.6644 20.0017 10.0672 20.0017 9.33055V3.995" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M7.99667 10.6644V6.66277C7.99667 5.1894 9.19108 3.995 10.6645 3.995H20.2311C20.9386 3.995 21.617 4.27631 22.1172 4.77665L25.8895 8.54889C26.3898 9.04908 26.6711 9.72753 26.6711 10.435V25.3372C26.6711 26.8106 25.4767 28.005 24.0033 28.005H10.6645C9.19108 28.005 7.99667 26.8106 7.99667 25.3372V24.0033" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M13.3339 10.6644H7.995C5.78586 10.6644 3.995 12.4553 3.995 14.6644V20.0033C3.995 22.2124 5.78586 24.0033 7.995 24.0033H13.3339C15.543 24.0033 17.3339 22.2124 17.3339 20.0033V14.6644C17.3339 12.4553 15.543 10.6644 13.3339 10.6644Z" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M10.8167 13.3333V14.25" stroke="#eaeaea" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M10.8167 20.6667V19.75" stroke="#eaeaea" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M12.6405 15.5333C12.5928 14.8176 12.0025 14.25 11.275 14.25H10.2703C9.559 14.25 8.98334 14.8264 8.98334 15.537C8.98334 16.1273 9.3852 16.6421 9.9572 16.7859L11.6754 17.2171C12.2481 17.3608 12.6493 17.8756 12.6493 18.4659C12.6493 19.1773 12.0729 19.7529 11.3623 19.7529H10.3576C9.62867 19.7529 9.03834 19.1839 8.9914 18.4667" stroke="#eaeaea" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <div class="info">
                            <p class="descriptor">{{ user.name.slice(0, 23) }}...</p>
                            <p class="contract-status"><span style="font-weight: 600;" >{{ user.pagarmePaymentStatus }}</span> - {{ moment(user.pagarmeSubscription.createdAt).format('DD/MM/YYYY') }}</p>
                          </div>
                        </div>
                        <div v-if="user.pagarmePaymentStatus === 'Pendente'" class="body-info pending" @click="$router.push({ path: `/users/${user.name}` })">
                          <div class="cicle-background" style="background-color: #d8a240;">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M26.6711 10.6644H21.3356C20.5989 10.6644 20.0017 10.0672 20.0017 9.33055V3.995" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M7.99666 10.6644V6.66277C7.99666 5.1894 9.19107 3.995 10.6645 3.995H20.2311C20.9386 3.995 21.617 4.27631 22.1172 4.77665L25.8895 8.54889C26.3898 9.04908 26.6711 9.72753 26.6711 10.435V25.3372C26.6711 26.8106 25.4767 28.005 24.0033 28.005H10.6645C9.19107 28.005 7.99666 26.8106 7.99666 25.3372V24.0033" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M10.6644 17.0872V14.6395" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M10.6644 19.7869C10.6324 19.7869 10.6016 19.7997 10.5791 19.8225C10.5565 19.8453 10.544 19.8762 10.5444 19.9083C10.5444 19.9575 10.5741 20.0018 10.6196 20.0205C10.6651 20.0393 10.7175 20.0286 10.7521 19.9936C10.7867 19.9586 10.7967 19.9062 10.7775 19.8609C10.7583 19.8156 10.7136 19.7864 10.6644 19.7869Z" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M13.3339 10.6644H7.995C5.78586 10.6644 3.995 12.4553 3.995 14.6644V20.0033C3.995 22.2124 5.78586 24.0033 7.995 24.0033H13.3339C15.543 24.0033 17.3339 22.2124 17.3339 20.0033V14.6644C17.3339 12.4553 15.543 10.6644 13.3339 10.6644Z" stroke="#eaeaea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <div class="info">
                            <p class="descriptor" style="color: #d8a240;">{{ user.name.slice(0, 23) }}...</p>
                            <p v-if="user.pagarmeSubscription.signedContract" class="contract-status" style="color: #E6AC00;"><span style="font-weight: 600;" >{{ user.pagarmePaymentStatus }}</span>  - {{ moment(user.pagarmeSubscription.createdAt).format('DD/MM/YYYY') }}</p>
                            <p v-else class="contract-status" style="color: #E6AC00;"><span style="font-weight: 600;" >Não Assinado</span>  - {{ moment(user.pagarmeSubscription.createdAt).format('DD/MM/YYYY') }}</p>
                          </div>
                        </div>
                        <div v-if="user.pagarmePaymentStatus === 'Cancelado'" class="body-info canceled" @click="$router.push({ path: `/users/${user.name}` })">
                          <div class="cicle-background" style="background-color: #E87979;">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66669 22C1.66669 18.134 4.80069 15 8.66669 15C12.5327 15 15.6667 18.134 15.6667 22C15.6667 25.866 12.5327 29 8.66669 29C4.80069 29 1.66669 25.866 1.66669 22ZM13.6667 22C13.6667 19.2386 11.4281 17 8.66667 17C5.90524 17 3.66667 19.2386 3.66667 22C3.66667 24.7614 5.90524 27 8.66667 27C11.4281 27 13.6667 24.7614 13.6667 22Z" fill="#eaeaea"/>
                              <path d="M9.28537 19.9671C9.67589 19.5766 10.3091 19.5766 10.6996 19.9671C11.0546 20.3221 11.0869 20.8777 10.7964 21.2691L10.6996 21.3813L8.04793 24.033C7.6574 24.4235 7.02424 24.4235 6.63371 24.033C6.27869 23.6779 6.24642 23.1224 6.53689 22.7309L6.63371 22.6187L9.28537 19.9671Z" fill="#eaeaea"/>
                              <path d="M6.63371 19.9671C6.98874 19.6121 7.54429 19.5798 7.93577 19.8703L8.04793 19.9671L10.6996 22.6187C11.0901 23.0093 11.0901 23.6424 10.6996 24.033C10.3446 24.388 9.78901 24.4203 9.39752 24.1298L9.28537 24.033L6.63371 21.3813C6.24319 20.9908 6.24319 20.3576 6.63371 19.9671Z" fill="#eaeaea"/>
                              <path d="M19.3209 3C20.545 3 21.7228 3.44886 22.6342 4.25543L22.8564 4.46447L26.2022 7.81023C27.0677 8.67578 27.5832 9.82599 27.6573 11.0408L27.6666 11.3457V24C27.6666 26.6723 25.5702 28.855 22.9322 28.9931L22.6666 29H17.3333C16.781 29 16.3333 28.5523 16.3333 28C16.3333 27.4937 16.7095 27.0753 17.1976 27.0091L17.3333 27H22.6666C24.2545 27 25.5542 25.7665 25.6597 24.2054L25.6666 24V11.3457C25.6666 10.6385 25.4169 9.95702 24.9663 9.41917L24.788 9.22444L21.4422 5.87868C20.9421 5.37858 20.2836 5.07328 19.5847 5.01161L19.3209 5H9.33331C7.74549 5 6.44579 6.23355 6.34023 7.7946L6.33331 8V12C6.33331 12.5523 5.8856 13 5.33331 13C4.82705 13 4.40866 12.6238 4.34244 12.1357L4.33331 12V8C4.33331 5.32765 6.42979 3.14497 9.06777 3.00693L9.33331 3H19.3209Z" fill="#eaeaea"/>
                              <path d="M19.3333 3C19.8396 3 20.258 3.37621 20.3242 3.86431L20.3333 4V8.66667C20.3333 9.52961 20.9891 10.2394 21.8296 10.3247L22 10.3333H26.6666C27.2189 10.3333 27.6666 10.781 27.6666 11.3333C27.6666 11.8396 27.2904 12.258 26.8023 12.3242L26.6666 12.3333H22C20.0499 12.3333 18.4554 10.8111 18.34 8.89003L18.3333 8.66667V4C18.3333 3.44772 18.781 3 19.3333 3Z" fill="#eaeaea"/>
                            </svg>
                          </div>
                          <div class="info">
                            <p class="descriptor" style="color: #E87979;">{{ user.name.slice(0, 23) }}...</p>
                            <p class="contract-status" style="color: #E87979;"><span style="font-weight: 600;" >{{ user.pagarmePaymentStatus }}</span> - {{ moment(user.pagarmeSubscription.createdAt).format('DD/MM/YYYY') }}</p>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="charts-container">
                <template v-if="chartBonus">
                  <div class="upper-section">
                    <h3>Bonificações</h3>
                    <div class="nav-button-pair">
                      <button class="updates-nav">
                        <svg data-v-7661b20e="" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="7.77815" y1="13.4351" x2="0.707078" y2="6.36407" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="7.77817" y1="0.707107" x2="0.707107" y2="7.77817" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                      <button class="updates-nav" id="foward" @click="chartBonus = false">
                        <svg data-v-7661b20e="" width="35" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="0.707107" y1="1.29289" x2="7.77817" y2="8.36396" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="0.707078" y1="14.0209" x2="7.77814" y2="6.94985" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                    </div>
                  </div>
                  <apexchart class="chart-deals" height="85%" type="bar" :options="chartOptionsBonus" :series="seriesBonus"></apexchart>
                </template>
                <template v-else>
                  <div class="upper-section">
                    <h3>Metas</h3>
                    <div class="nav-button-pair">
                      <button class="updates-nav" id="back" @click="chartBonus = true">
                        <svg data-v-7661b20e="" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="7.77815" y1="13.4351" x2="0.707078" y2="6.36407" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="7.77817" y1="0.707107" x2="0.707107" y2="7.77817" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                      <button class="updates-nav">
                        <svg data-v-7661b20e="" width="35" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="0.707107" y1="1.29289" x2="7.77817" y2="8.36396" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="0.707078" y1="14.0209" x2="7.77814" y2="6.94985" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                    </div>
                  </div>
                  <apexchart class="chart-deals" height="85%" type="bar" :options="chartOptionsClosings" :series="seriesClosings"></apexchart>
                </template>
              </div>
            </div>
            <div v-else class="left-body-container">
              <div class="clients-info-container">
                <h3>Clientes</h3>
                <div class="general-info">
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: rgba(0, 0, 0, 0.07); padding: 11px 13px;">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 448 512" style="fill: gray;"><path d="M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"/></svg>
                    </div>
                    <div class="info">
                      <p class="descriptor title-loading">Leads a tratar</p>
                      <p class="data-text subtitle-loading">1500</p>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: rgba(0, 0, 0, 0.07); padding: 9px;">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.42139 23.184C8.61605 26.0987 12.0921 28 16.0001 28C22.6001 28 28.0001 22.6 28.0001 16C28.0001 9.4 22.6001 4 16.0001 4" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.42133 23.184C4.90933 21.176 4 18.692 4 16C4 9.4 9.4 4 16 4" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6667 9.33333V11" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6667 22.6667V21" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9827 13.3333C18.896 12.032 17.8227 11 16.5 11H14.6734C13.38 11 12.3334 12.048 12.3334 13.34C12.3334 14.4133 13.064 15.3493 14.104 15.6107L17.228 16.3947C18.2694 16.656 18.9987 17.592 18.9987 18.6653C18.9987 19.9587 17.9507 21.0053 16.6587 21.0053H14.832C13.5067 21.0053 12.4334 19.9707 12.348 18.6667" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor title-loading">Comissão Atual</p>
                      <p class="data-text subtitle-loading">1500</p>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: rgba(0, 0, 0, 0.07); padding: 8px;">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.0814 8.99066L16.0067 19.0653L10.9707 14.028" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M27.46 18.008V24.5333C27.46 26.08 26.2067 27.3333 24.66 27.3333H7.59333C6.04667 27.3333 4.79333 26.08 4.79333 24.5333V7.46667C4.79333 5.92001 6.04667 4.66667 7.59333 4.66667H16.1267" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor title-loading">Vendas no mês</p>
                      <p class="data-text subtitle-loading">500</p>
                    </div>
                  </div>
                  <div class="client-info">
                    <div class="cicle-background" style="background-color: rgba(0, 0, 0, 0.07); padding: 8px;">
                      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.671 11.1644H21.3355C20.5988 11.1644 20.0016 10.5672 20.0016 9.83055V4.495" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.99658 11.1644V7.16277C7.99658 5.6894 9.19099 4.495 10.6644 4.495H20.231C20.9385 4.495 21.6169 4.77631 22.1171 5.27665L25.8894 9.04889C26.3897 9.54908 26.671 10.2275 26.671 10.935V25.8372C26.671 27.3106 25.4766 28.505 24.0032 28.505H10.6644C9.19099 28.505 7.99658 27.3106 7.99658 25.8372V24.5033" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6645 17.5871V15.1394" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6645 20.2869C10.6324 20.2869 10.6017 20.2997 10.5792 20.3225C10.5566 20.3453 10.5441 20.3762 10.5445 20.4083C10.5445 20.4575 10.5742 20.5018 10.6197 20.5205C10.6652 20.5393 10.7175 20.5286 10.7522 20.4936C10.7868 20.4586 10.7968 20.4062 10.7776 20.3609C10.7584 20.3156 10.7137 20.2864 10.6645 20.2869" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="3.995" y="11.1644" width="13.3389" height="13.3389" rx="4" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="info">
                      <p class="descriptor title-loading">Pagamento Pendente</p>
                      <p class="data-text subtitle-loading">100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contracts-container">
                <div class="contracts-info">
                  <div class="contract-info-container">
                    <h3>Contratos</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor title-loading">Mais Rentável</small>
                        <p class="data-name subtitle-loading">ÁLAMO E GRÁFICA SOCIED...</p>
                        <p class="data-text subtitle-loading" style="color: #068373;">R$ 500,00</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor title-loading">Menos Rentável</small>
                        <p class="data-name subtitle-loading">ÁLAMO E GRÁFICA SOCIEDADE</p>
                        <p class="data-text subtitle-loading" style="color: #E87979;">R$ 50,00</p>
                      </div>
                    </div>
                  </div>
                  <div class="plan-info-container">
                    <h3>Tipos de Plano</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor title-loading">Planos Novos</small>
                        <p class="data-text subtitle-loading">500</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor title-loading">Planos Antigos</small>
                        <p class="data-text subtitle-loading">300</p>
                      </div>
                    </div>
                  </div>
                  <div class="suggestion-container" style="background-color: rgba(0, 0, 0, 0.07); border-top: 1px solid rgba(0, 0, 0, 0.07); height: 100%;">
                    <h3>Sugestão para Upsell</h3>
                    <div class="row inner-info">
                      <div class="description-container col-5">
                        <small class="descriptor title-loading">Cliente</small>
                        <p class="data-text subtitle-loading">ÁLAMO GRÁFICA</p>
                      </div>
                      <div class="description-container col-6">
                        <small class="descriptor title-loading">Planos Atual</small>
                        <p class="data-text subtitle-loading">Premium</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="last-contracts">
                  <div class="title-section ">
                    <h3>Últimos Contratos</h3>
                    <small class="subtitle-loading">Ver tudo</small>
                  </div>
                  <div class="lasts-list">
                    <div class="body-info" style="padding: 8px; background-color: rgba(0, 0, 0, 0.07);">
                      <div class="cicle-background" style="background-color: gray;">
                      </div>
                      <div class="info">
                        <p class="descriptor subtitle-loading">ALAMO GRÁFICA</p>
                        <p class="contract-status subtitle-loading">Contrato Pago - 27/10/2023</p>
                      </div>
                    </div>
                    <div class="body-info" style="background-color: rgba(0, 0, 0, 0.07); padding: 8px;">
                      <div class="cicle-background" style="background-color: gray;">
                      </div>
                      <div class="info">
                        <p class="descriptor subtitle-loading">ALAMO GRÁFICA</p>
                        <p class="contract-status subtitle-loading">Contrato Pendente  - 27/10/2023</p>
                      </div>
                    </div>
                    <div class="body-info" style="background-color: rgba(0, 0, 0, 0.07); padding: 8px;">
                      <div class="cicle-background" style="background-color: gray;">
                      </div>
                      <div class="info">
                        <p class="descriptor subtitle-loading">ALAMO GRÁFICA</p>
                        <p class="contract-status subtitle-loading">Contrato Cancelado - 27/10/2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="charts-container">
                <template v-if="chartBonus">
                  <div class="upper-section">
                    <h3>Bonificações</h3>
                    <div class="nav-button-pair">
                      <button class="updates-nav">
                        <svg data-v-7661b20e="" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="7.77815" y1="13.4351" x2="0.707078" y2="6.36407" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="7.77817" y1="0.707107" x2="0.707107" y2="7.77817" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                      <button class="updates-nav" @click="chartBonus = false">
                        <svg data-v-7661b20e="" width="35" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="0.707107" y1="1.29289" x2="7.77817" y2="8.36396" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="0.707078" y1="14.0209" x2="7.77814" y2="6.94985" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                    </div>
                  </div>
                  <apexchart class="chart-deals" height="85%" type="bar" :options="chartOptionsBonus" :series="seriesBonus"></apexchart>
                </template>
                <template v-else>
                  <div class="upper-section">
                    <h3>Metas</h3>
                    <div class="nav-button-pair">
                      <button class="updates-nav" @click="chartBonus = true">
                        <svg data-v-7661b20e="" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="7.77815" y1="13.4351" x2="0.707078" y2="6.36407" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="7.77817" y1="0.707107" x2="0.707107" y2="7.77817" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                      <button class="updates-nav">
                        <svg data-v-7661b20e="" width="35" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><line data-v-7661b20e="" x1="0.707107" y1="1.29289" x2="7.77817" y2="8.36396" stroke="#9496A1" stroke-width="2"></line><line data-v-7661b20e="" x1="0.707078" y1="14.0209" x2="7.77814" y2="6.94985" stroke="#9496A1" stroke-width="2"></line></svg>
                      </button>
                    </div>
                  </div>
                <apexchart class="chart-deals" height="85%" type="bar" :options="chartOptionsClosings" :series="seriesClosings"></apexchart>
                </template>
              </div>
            </div>
            <div v-if="!temporaryLoading" class="right-body-container">
              <div class="tasks-container" style="border-radius: 7px !important;">
                <div class="first-section">
                  <h3>Lista de Tarefa</h3>
                  <button class="btn-add">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4.25C8.41421 4.25 8.75 4.58579 8.75 5C8.75 5.3797 8.46785 5.69349 8.10177 5.74315L8 5.75H6C5.35279 5.75 4.82047 6.24187 4.75645 6.87219L4.75 7V19C4.75 19.6472 5.24187 20.1795 5.87219 20.2435L6 20.25H11C11.4142 20.25 11.75 20.5858 11.75 21C11.75 21.3797 11.4678 21.6935 11.1018 21.7432L11 21.75H6C4.53747 21.75 3.3416 20.6083 3.25502 19.1675L3.25 19V7C3.25 5.53747 4.3917 4.3416 5.83248 4.25502L6 4.25H8Z" fill="#fafafa"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.25H15C15.9665 2.25 16.75 3.0335 16.75 4V6C16.75 6.9665 15.9665 7.75 15 7.75H9C8.0335 7.75 7.25 6.9665 7.25 6V4C7.25 3.0335 8.0335 2.25 9 2.25ZM15 3.75H9C8.86193 3.75 8.75 3.86193 8.75 4V6C8.75 6.13807 8.86193 6.25 9 6.25H15C15.1381 6.25 15.25 6.13807 15.25 6V4C15.25 3.86193 15.1381 3.75 15 3.75Z" fill="#fafafa"/>
                      <path d="M18 4.25C19.4625 4.25 20.6584 5.3917 20.745 6.83248L20.75 7V10C20.75 10.4142 20.4142 10.75 20 10.75C19.6203 10.75 19.3065 10.4678 19.2568 10.1018L19.25 10V7C19.25 6.35279 18.7581 5.82047 18.1278 5.75645L18 5.75H16C15.5858 5.75 15.25 5.41421 15.25 5C15.25 4.6203 15.5322 4.30651 15.8982 4.25685L16 4.25H18Z" fill="#fafafa"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 17C12.25 14.3766 14.3766 12.25 17 12.25C19.6234 12.25 21.75 14.3766 21.75 17C21.75 19.6234 19.6234 21.75 17 21.75C14.3766 21.75 12.25 19.6234 12.25 17ZM20.25 17C20.25 15.2051 18.7949 13.75 17 13.75C15.2051 13.75 13.75 15.2051 13.75 17C13.75 18.7949 15.2051 20.25 17 20.25C18.7949 20.25 20.25 18.7949 20.25 17Z" fill="#fafafa"/>
                      <path d="M18.25 16.25C18.6642 16.25 19 16.5858 19 17C19 17.3797 18.7178 17.6935 18.3518 17.7432L18.25 17.75H15.75C15.3358 17.75 15 17.4142 15 17C15 16.6203 15.2822 16.3065 15.6482 16.2568L15.75 16.25H18.25Z" fill="#fafafa"/>
                      <path d="M17 15C17.3797 15 17.6935 15.2822 17.7432 15.6482L17.75 15.75V18.25C17.75 18.6642 17.4142 19 17 19C16.6203 19 16.3065 18.7178 16.2568 18.3518L16.25 18.25V15.75C16.25 15.3358 16.5858 15 17 15Z" fill="#fafafa"/>
                    </svg>
                    <p>Criar</p>
                  </button>
                </div>
                <div class="tasks-list">
                  <div class="task">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 15.1899H9" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.541 14.8959C6.765 13.6409 5.7 11.4499 6.075 9.03795C6.481 6.43095 8.654 4.34995 11.275 4.04295C14.913 3.61595 18 6.44795 18 9.99995C18 12.0249 16.994 13.8119 15.457 14.8979C15.181 15.0929 15 15.3949 15 15.7329V18.4999C15 19.8809 13.881 20.9999 12.5 20.9999H11.5C10.119 20.9999 9 19.8809 9 18.4999V15.7369C9 15.3959 8.818 15.0919 8.541 14.8959Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20 5.00006L21.19 3.81006" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 15L2.81 16.19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5 4.00006L3.81 2.81006" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20 15L21.19 16.19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 10H22.69" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.31 10H3" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 18H14.87" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="task-description"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                    <div class="task-status info-status status-success">Concluído</div>
                    <button class="btn-edit-icon ml-2">
                      <svg data-v-7661b20e="" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-7661b20e="" fill-rule="evenodd" clip-rule="evenodd" d="M1.40775 11.619L11.7337 1.29299C12.1237 0.902988 12.7567 0.902988 13.1467 1.29299L14.8227 2.96899C15.2127 3.35899 15.2127 3.99199 14.8227 4.38199L4.49575 14.707C4.30875 14.895 4.05475 15 3.78975 15H1.11475V12.325C1.11475 12.06 1.21975 11.806 1.40775 11.619Z" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-7661b20e="" d="M9.86475 3.16003L12.9547 6.25003" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                  </div>
                  <div class="task">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 15.1899H9" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.541 14.8959C6.765 13.6409 5.7 11.4499 6.075 9.03795C6.481 6.43095 8.654 4.34995 11.275 4.04295C14.913 3.61595 18 6.44795 18 9.99995C18 12.0249 16.994 13.8119 15.457 14.8979C15.181 15.0929 15 15.3949 15 15.7329V18.4999C15 19.8809 13.881 20.9999 12.5 20.9999H11.5C10.119 20.9999 9 19.8809 9 18.4999V15.7369C9 15.3959 8.818 15.0919 8.541 14.8959Z" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20 5.00006L21.19 3.81006" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 15L2.81 16.19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5 4.00006L3.81 2.81006" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20 15L21.19 16.19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 10H22.69" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.31 10H3" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 18H14.87" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="task-description"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                    <div class="task-status info-status status-success">Concluído</div>
                    <button class="btn-edit-icon ml-2">
                      <svg data-v-7661b20e="" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-7661b20e="" fill-rule="evenodd" clip-rule="evenodd" d="M1.40775 11.619L11.7337 1.29299C12.1237 0.902988 12.7567 0.902988 13.1467 1.29299L14.8227 2.96899C15.2127 3.35899 15.2127 3.99199 14.8227 4.38199L4.49575 14.707C4.30875 14.895 4.05475 15 3.78975 15H1.11475V12.325C1.11475 12.06 1.21975 11.806 1.40775 11.619Z" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-7661b20e="" d="M9.86475 3.16003L12.9547 6.25003" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="favorites-list" style="border-radius: 7px !important;">
                <div class="first-section">
                  <h3>Clientes Favoritos</h3>
                  <button class="btn-favorite">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4692 3.02278C13.8329 4.38649 13.8329 6.5975 12.4692 7.96121C11.1055 9.32492 8.89447 9.32492 7.53076 7.96121C6.16705 6.5975 6.16705 4.38649 7.53076 3.02278C8.89447 1.65907 11.1055 1.65907 12.4692 3.02278" stroke="#fafafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.363 12.796C13.064 12.277 11.54 11.991 10 11.991C5.952 11.991 2 13.958 2 16.983V17.983C2 18.535 2.448 18.983 3 18.983H12.413" stroke="#fafafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 22C14.239 22 12 19.762 12 17C12 14.296 14.3 11.997 17.004 12C19.764 12.002 22 14.24 22 17C22 19.761 19.762 22 17 22" stroke="#fafafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.986 15.25C18.832 15.25 19.4 15.995 19.4 16.689C19.4 18.097 17.043 19.25 17 19.25C16.957 19.25 14.6 18.097 14.6 16.689C14.6 15.995 15.168 15.25 16.014 15.25C16.498 15.25 16.816 15.476 17 15.678C17.184 15.476 17.502 15.25 17.986 15.25V15.25Z" stroke="#fafafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Favoritar Clientes</p>
                  </button>
                </div>
                <div class="tasks-list">
                  <div class="task">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4692 3.02278C13.8329 4.38649 13.8329 6.5975 12.4692 7.96121C11.1055 9.32492 8.89447 9.32492 7.53076 7.96121C6.16705 6.5975 6.16705 4.38649 7.53076 3.02278C8.89447 1.65907 11.1055 1.65907 12.4692 3.02278" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.363 12.796C13.064 12.277 11.54 11.991 10 11.991C5.952 11.991 2 13.958 2 16.983V17.983C2 18.535 2.448 18.983 3 18.983H12.413" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 22C14.239 22 12 19.762 12 17C12 14.296 14.3 11.997 17.004 12C19.764 12.002 22 14.24 22 17C22 19.761 19.762 22 17 22" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.986 15.25C18.832 15.25 19.4 15.995 19.4 16.689C19.4 18.097 17.043 19.25 17 19.25C16.957 19.25 14.6 18.097 14.6 16.689C14.6 15.995 15.168 15.25 16.014 15.25C16.498 15.25 16.816 15.476 17 15.678C17.184 15.476 17.502 15.25 17.986 15.25V15.25Z" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="task-description"><p>ALAMO GRÁFICA SOCIEDADE</p></div>
                    <div class="task-status info-status status-success">Pago</div>
                    <button class="btn-edit-icon ml-2">
                      <svg data-v-7661b20e="" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-7661b20e="" fill-rule="evenodd" clip-rule="evenodd" d="M1.40775 11.619L11.7337 1.29299C12.1237 0.902988 12.7567 0.902988 13.1467 1.29299L14.8227 2.96899C15.2127 3.35899 15.2127 3.99199 14.8227 4.38199L4.49575 14.707C4.30875 14.895 4.05475 15 3.78975 15H1.11475V12.325C1.11475 12.06 1.21975 11.806 1.40775 11.619Z" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-7661b20e="" d="M9.86475 3.16003L12.9547 6.25003" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                  </div>
                  <div class="task">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4692 3.02278C13.8329 4.38649 13.8329 6.5975 12.4692 7.96121C11.1055 9.32492 8.89447 9.32492 7.53076 7.96121C6.16705 6.5975 6.16705 4.38649 7.53076 3.02278C8.89447 1.65907 11.1055 1.65907 12.4692 3.02278" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.363 12.796C13.064 12.277 11.54 11.991 10 11.991C5.952 11.991 2 13.958 2 16.983V17.983C2 18.535 2.448 18.983 3 18.983H12.413" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17 22C14.239 22 12 19.762 12 17C12 14.296 14.3 11.997 17.004 12C19.764 12.002 22 14.24 22 17C22 19.761 19.762 22 17 22" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.986 15.25C18.832 15.25 19.4 15.995 19.4 16.689C19.4 18.097 17.043 19.25 17 19.25C16.957 19.25 14.6 18.097 14.6 16.689C14.6 15.995 15.168 15.25 16.014 15.25C16.498 15.25 16.816 15.476 17 15.678C17.184 15.476 17.502 15.25 17.986 15.25V15.25Z" stroke="#282a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="task-description"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                    <div class="task-status info-status status-success">Pago</div>
                    <button class="btn-edit-icon ml-2">
                      <svg data-v-7661b20e="" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-7661b20e="" fill-rule="evenodd" clip-rule="evenodd" d="M1.40775 11.619L11.7337 1.29299C12.1237 0.902988 12.7567 0.902988 13.1467 1.29299L14.8227 2.96899C15.2127 3.35899 15.2127 3.99199 14.8227 4.38199L4.49575 14.707C4.30875 14.895 4.05475 15 3.78975 15H1.11475V12.325C1.11475 12.06 1.21975 11.806 1.40775 11.619Z" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-7661b20e="" d="M9.86475 3.16003L12.9547 6.25003" stroke="#9496A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="right-body-container">
              <div class="tasks-container" style="border-radius: 7px !important;">
                <div class="first-section">
                  <h3>Lista de Tarefa</h3>
                  <button class="btn-loading">
                  </button>
                </div>
                <div class="tasks-list">
                  <div v-for="(installment, i) in 9" :key="i" class="task" >
                    <div class="task-description subtitle-loading"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                    <div class="task-description subtitle-loading"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                  </div>
                </div>
              </div>
              <div class="favorites-list" style="border-radius: 7px !important;">
                <div class="first-section">
                  <h3>Clientes Favoritos</h3>
                  <button class="btn-loading">
                  </button>
                </div>
                <div class="tasks-list">
                  <div v-for="(installment, i) in 16" :key="i" class="task" >
                    <div class="task-description subtitle-loading"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                    <div class="task-description subtitle-loading"><p>Testar falar com clientes pelo telefone durante o ...</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" :class="{show: showTutorial}" :style="{display: showTutorial ? 'block' : 'none'}"></div>
  </div>
</template>

<script>
import LayoutNavigation from '../../components/layout/LayoutNavigation'
import moment from 'moment';

export default {
  name: 'Home',
  components: {
    LayoutNavigation
  },
  data: () => {
    return {
      seeSuggestion: false,
      loadingPage: true,
      temporaryLoading: true,
      plansLoading: false,
      currentSuggestion: {},
      chartBonus: true,
      showTutorial: false,
      subscription: null,
      loggedAffiliate: {},
      leads: [],
      todayLeads: [],
      plans: [],
      plansToSuggestions: [],
      newSubscriptions: [],
      subscriptionsArray: [],
      monthlyContracts: [],
      paidsContracts: 0,
      transations: [],
      userPlan: {},
      users: [],
      usersStatus: [],
      oldPlansUsers: [],
      OldUsersfiltered: [],
      subscriptions: [],
      profitablesUsers: {
        more: { name: '', price: ''},
        less: { name: '', price: ''}
      },
      bonusResult: '',
      salesAmount: 0,
      pendingAmount: 0,
      amountResult: 0,
      // chartOptions: null,
      chartOptionsBonus: {
        // colors: ['#2fb490', '#068373'],
        colors: [function({ value}) {
          if (value >= 2800) {
            return '#0dce9a'
          } else if (value >= 2000) {
            return '#068373'
          } else if (value >= 1000) {
            return '#d8a200'
          } else {
              return '#D9534F'
          }
        }],
        chart: {
          id: 'Bonus',
          type: 'bar',
          toolbar: {
          show: true,
            tools:{
              download: false // <== line to add
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 12,
            borderRadiusApplication: 'end',
            columnWidth: '60%',
            dataLabels: {
              position: 'center'
            }
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: ['#282a3a'],
              fontSize: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label'
            },
          }
        },
        yaxis: {
          show: false,
          max: 2800,
          min: 0,
          tickAmount: 4,
          labels: {
            style: {
              colors: ['#282a3a'],
              fontSize: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label'
            }
          }
        },
        tooltip: {
          style: {
            fontSize: '13.5px',
            fontFamily: 'Poppins'
          },
          y: {
              formatter: function (val) {
                let price = ''
                price = String(val)
                if (price.length >= 3) {
                  price = price + '00'
                  const firstPart = price.slice(0, price.length - 2)
                  const secondPart = price.slice(price.length - 2, price.length)
                  const result = 'R$ ' +firstPart+','+secondPart
                  return result
                }
                return ''
              },
              title: {
                  formatter: () => 'Comissão Conquistada: ',
              },
          },
          z: {
              formatter: function () {
                return '3'
              },
              title: 'Size: '
          },
        }
      },
      chartOptionsClosings: {
        colors: ['#2fb490', '#068373'],
        chart: {
          id: 'Metas',
          type: 'bar',
          toolbar: {
          show: true,
            tools:{
              download: false // <== line to add
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 12,
            borderRadiusApplication: 'end',
            columnWidth: '60%',
            dataLabels: {
              position: 'center'
            }
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: ['#282a3a'],
              fontSize: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label'
            },
          }
        },
        yaxis: {
          show: false,
          max: 14000,
          tickAmount: 4,
          type: 'string',
          labels: {
            style: {
              colors: ['#282a3a'],
              fontSize: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-label'
            }
          }
        },
        tooltip: {
          style: {
            fontSize: '13.5px',
            fontFamily: 'Poppins'
          },
          y: {
              formatter: function (val) {
                let price = ''
                price = String(val)
                if (price.length >= 3) {
                  price = price + '00'
                  const firstPart = price.slice(0, price.length - 2)
                  const secondPart = price.slice(price.length - 2, price.length)
                  const result = 'R$ ' +firstPart+','+secondPart
                  return result
                }
                return ''
              },
              title: {
                  formatter: () => 'Meta Alcançada: ',
              },
          },
          z: {
              formatter: function () {
                return '3'
              },
              title: 'Size: '
          },
        }
      },
      seriesBonus: [{
        name: 'Bonificaçãoes',
        data: [],
      }],
      seriesClosings: [{
        name: 'Meta',
        data: []
      }],
      today: moment(new Date()).format('DD/MM/YYYY'),
      metas: []
    }
  },
  async created () {
    this.chartOptionsBonus.xaxis.categories = this.generateLastTwelveMonths()
    this.chartOptionsClosings.xaxis.categories = this.generateLastTwelveMonths()
    await this.getOldPlans()
    await this.getAffiliate()
  },
  async mounted () {
    await this.getNewPlans()
    await this.getUsers()
    await setTimeout(() => {
      this.getMonthlyPayments()
      this.organizeChart()
      window.dispatchEvent(new Event('resize'))
      this.loadingPage = false
    }, 6000);

  },
  watch: {
    users () {
      const tempArray = []
      for (let index = 0; index < this.users.length; index++) {
        if (this.users[index].pagarmeSubscription) {
          tempArray.push(this.users[index])
        }
      }
      const sortedArray = tempArray.sort((a, b) => {
        return b.pagarmeSubscription.price - a.pagarmeSubscription.price;
      })
      if (sortedArray[0]&& sortedArray[sortedArray.length - 1]) {
        this.profitablesUsers.more.name = sortedArray[0].name
        this.profitablesUsers.more.price = this.formattedPrice(sortedArray[0].pagarmeSubscription.price)
        this.profitablesUsers.less.name = sortedArray[sortedArray.length - 1].name
        this.profitablesUsers.less.price = this.formattedPrice(sortedArray[sortedArray.length - 1].pagarmeSubscription.price)
      }
    },
    newSubscriptions (newSubs) {
      if (this.users.length > 0) {
        this.newSubscriptions = newSubs
        this.reprocessUsers()
        this.getMonthlyPayments()
        this.organizeChart()
        window.dispatchEvent(new Event('resize'))
      }
    }
  },
  methods: {
    // Fetch the loggedAffiliate and leads
    async getAffiliate () {
      await this.$firebase.database().ref(`affiliates/${window.uid}`).on('value', snapshot => {
        const values = snapshot.val()
        if (values) {
          this.loggedAffiliate = values
        }
      })
    },
    async getLeads () {
      await this.$firebase.database().ref('hotLeads').on('value', snapshot => {
        let values = snapshot.val()
        const tempArray = []
        for (const v in values) {
          values[v].key = v
          tempArray.push(values[v])
        }
        values = tempArray
        if (values) {
          this.allLeads = values
          this.leads = this.allLeads.filter(lead => lead.affiliateId && lead.affiliateId === this.loggedAffiliate.affiliateId && lead.status.info === 'Ligar')
          this.todayLeads = this.leads.filter(lead => moment(Date.now()).format('YYYY/MM/DD') === moment(lead.date).format('YYYY/MM/DD'))
        }
      })
    },

    // Get new planes and update each user object with its plan
    async getOldPlans () {
      await this.$firebase.database().ref('plans').on('value', snapshot => {
        this.plans = snapshot.val()
      })
    },
    async getNewPlans () {
      await this.$firebase.database().ref('subscriptions').on('value', snapshot => {
        const values = snapshot.val()
        this.subscriptionsArray = Object.keys(values.data).map(i => values.data[i])
        this.newSubscriptions = values.data
        this.transations = values.transations
        for (const i in this.newSubscriptions) {
          if (this.newSubscriptions[i].vendorId && this.newSubscriptions[i].vendorId !== window.uId) {
            delete this.newSubscriptions[i]
          }
          if (this.newSubscriptions[i] && this.transations && this.transations[i] ) {
            this.newSubscriptions[i].transations = Object.keys(this.transations[i]).map(j => this.transations[i][j])
          }
        }
      })
    },
    getNewPlan (user) {
      const emptyPlan = { name: 'Grátis' }
      if (this.newSubscriptions[user.uId]) {
        return { name: this.newSubscriptions[user.uId].name }
      } else {
        return emptyPlan
      }
    },
    getNewSubscription (user) {
      if (this.newSubscriptions[user.uId]) {
        if (this.newSubscriptions[user.uId].status === 'paid') {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Pago'
        } else if (this.newSubscriptions[user.uId].status === 'canceled') {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Cancelado'
        } else {
          user.pagarmeSubscription = this.newSubscriptions[user.uId]
          return 'Pendente'
        }
      } else {
        return 'Não Assinante'
      }
    },
    async getUsers () {
      // Testar quando essa função é chamada
      await this.$firebase.database().ref('users').on('value', snapshot => {
        let values = snapshot.val()
        values = Object.keys(values).map(i => values[i])
        this.users = []
        this.oldPlansUsers = []
        this.allUsers = values
        if (values.length) {
          for (let i = 0; i < values.length; i++) {
            if (values[i].affiliateId === '5RAuGOw5RWRvhQJKy7ANWcErSee2') {
              if (values[i].currentPlanId === '') {
                values[i].pagarmePlan = this.getNewPlan(values[i], values[i].currentPlanId)
                values[i].pagarmePaymentStatus = this.getNewSubscription(values[i])
                if (this.usersStatus[values[i].uId]) {
                  values[i].status = this.usersStatus[values[i].uId]
                }
                this.users.push(values[i])
              } else {
                this.oldPlansUsers.push(values[i])
              }
            }
          }
        }
      })
    },
    async reprocessUsers () {
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].pagarmeSubscription = this.newSubscriptions[this.users[i].uId]
      }
    },
    getMonthlyPayments () {
      this.monthlyContracts = []
      const tempArray = []
      const pedingArray = []
      // Apura as transições pagas mensais
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].pagarmeSubscription && this.users[i].pagarmeSubscription.transations) {
          const result = this.users[i].pagarmeSubscription.transations.find(tr => tr.status === 'paid')
          if (result !== undefined && String(moment(Date.now()).month() + 1) === result.period.slice(0, 2) && String(moment(Date.now()).year()) === result.period.slice(3, result.period.length)) {
            tempArray.push(this.users[i].pagarmeSubscription.price)
          }

          const date = moment(this.users[i].pagarmeSubscription.createdAt).format('MM/YYYY')
          if (String(moment(Date.now()).month() + 1) === date.slice(0, 2) && String(moment(Date.now()).year()) === date.slice(3, date.length) && this.users[i].pagarmeSubscription.status === 'pending') {
            pedingArray.push(this.users[i])
          }

          if (String(moment(Date.now()).month() + 1) === date.slice(0, 2) && String(moment(Date.now()).year()) === date.slice(3, date.length)) {
            this.monthlyContracts.push(this.users[i])
          }
        }
      }
      this.monthlyContracts = this.monthlyContracts.sort((a, b) => new Date(b.pagarmeSubscription.createdAt) - new Date(a.pagarmeSubscription.createdAt))
      // Cálculo da comissão
      const initialValue = 0;
      let bonusResult = 0
      this.paidsContracts = tempArray.length
      const bonusValue = tempArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )
      if (bonusValue > 1400000) {
        const multiplication = bonusValue * 20
        bonusResult = Math.round(multiplication / 100)
      } else if (bonusValue > 1000000) {
        const multiplication = bonusValue * 15
        bonusResult = Math.round(multiplication / 100)
      } else if (bonusValue > 750000) {
        const multiplication = bonusValue * 10
        bonusResult = Math.round(multiplication / 100)
      } else if (bonusValue > 500000) {
        const multiplication = bonusValue * 5
        bonusResult = Math.round(multiplication / 100)
      }

      // Preenchar as variáveis
      this.pendingAmount = pedingArray.length
      this.salesAmount = tempArray.length
      this.bonusResult = bonusResult !== 0 ? this.formattedPrice(bonusResult) : 0

    },
    getPagarmePlan (user, currentPlanId) {
      const emptyPlan = { name: 'Grátis' }
      for (let i = 0; i < this.plans.length; i++) {
        if (this.plans[i].pagarmeId === currentPlanId) {
          return this.plans[i]
        }
      }
      user.pagarmePlan = emptyPlan
      return emptyPlan
    },
    getPagarmeSubscription (user, currentSubscriptionId) {
      if (currentSubscriptionId !== '') {
        for (let i = 0; i < this.subscriptions.length; i++) {
          if (this.subscriptions[i].id === currentSubscriptionId) {
            if (this.subscriptions[i].status === 'paid') {
              return 'Pago'
            } else if (this.subscriptions[i].status === 'canceled') {
              return 'Cancelado'
            } else {
              return 'Pendente'
            }
          }
        }
        return 'Não Assinante'
      } else {
        return 'Não Assinante'
      }
    },
    async processPlans () {
      try {
        // Requisição dos palnos do pagarme
        // let allPlanIds = []
        // for (let i = 1; i < 3; i++) {
        //   allPlanIds = [...allPlanIds, ...await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 1000, page: i }))]
        // }
        // const subscriptionsQueries = []
        // for (let i = 1; i < allPlanIds.length / 3 + 1; i++) {
        //   subscriptionsQueries.push(this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 10, page: i })).then(subscription => subscription))
        //   await this.sleep(500)
        // }
        // var allSubscriptions = []
        // const subscriptionsQueriesResponses = await Promise.all(subscriptionsQueries)
        // for (const subscriptionArray of subscriptionsQueriesResponses) {
        //   for (const subscription of subscriptionArray) {
        //     allSubscriptions.push(subscription)
        //   }
        // }
        let allPlanIds = []
        for (let i = 1; i < 3; i++) {
          await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.subscriptions.all({ count: 1000, page: i })).then(subscription => {
            allPlanIds.push(...subscription)
            this.sleep(100)
          })
        }
        this.subscriptions = allPlanIds
      } catch (error) {
        await this.sleep(100)
        this.processPlans()
      }
    },
    async processOldUsers () {
      try {
        this.loading = true
        await this.processPlans()
        const tempArray = []
        for (let i = 0; i < this.oldPlansUsers.length; i++) {
          this.oldPlansUsers[i].pagarmePlan = this.getPagarmePlan(this.oldPlansUsers[i], this.oldPlansUsers[i].currentPlanId)
          this.oldPlansUsers[i].pagarmePaymentStatus = this.getPagarmeSubscription(this.oldPlansUsers[i], this.oldPlansUsers[i].currentSubscriptionId)
          if (this.usersStatus[this.oldPlansUsers[i].uId]) {
            this.oldPlansUsers[i].status = this.usersStatus[this.oldPlansUsers[i].uId]
          }
          tempArray.push(this.oldPlansUsers[i])
        }
        this.OldUsersfiltered = tempArray.filter(user => user.pagarmePaymentStatus === 'Pago' || user.pagarmePaymentStatus === 'Pendente')
      } catch (error) {
        console.log(error)
      }
    },
    getMoreProfitable () {
      for (let i = 0; i < this.oldPlansUsers.length; i++) {
       this.oldPlansUsers[i].planPrice = this.oldPlansUsers[i].pagarmePlan ? Number(this.oldPlansUsers[i].pagarmePlan.price.replace(',', '')) : 0
      }
      const tempArray = this.oldPlansUsers.filter(user => user.pagarmePaymentStatus === 'Pago')
      const sortedArray = tempArray.sort((a, b) => {
        return b.planPrice - a.planPrice
      })
      this.plansToSuggestions = sortedArray
    },
    async getSuggestion () {
      this.seeSuggestion = true
      this.plansLoading = true
      await this.processOldUsers()
      this.getMoreProfitable()
      this.currentSuggestion = this.plansToSuggestions[0]
      this.plansLoading = false
    },
    getMoreSuggestions (direction) {
      const index = this.plansToSuggestions.indexOf(this.currentSuggestion)
      if (direction === 'back') {
        if (this.plansToSuggestions[index - 1]) {
          this.currentSuggestion = this.plansToSuggestions[index - 1]
        }
      } else {
        if (this.plansToSuggestions[index + 1]) {
          this.currentSuggestion = this.plansToSuggestions[index + 1]
        } else {
          this.currentSuggestion = this.plansToSuggestions[0]
        }
      }
    },
    async organizeChart () {
      this.seriesBonus[0].data = []
      this.seriesClosings[0].data = []
      const monthsArray = this.chartOptionsBonus.xaxis.categories
      const bonusMonths = []
      const metasArray = []

      for (let j = 0; j < monthsArray.length; j++) {
        const tempArray = []

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].pagarmeSubscription && this.users[i].pagarmeSubscription.transations) {
            const result = this.users[i].pagarmeSubscription.transations.find(tr => tr.status === 'paid')
            if (result !== undefined && monthsArray[j].slice(0, 2) === result.period.slice(0, 2) && monthsArray[j].slice(3, result.period.length) === result.period.slice(3, result.period.length)) {
              tempArray.push(this.users[i].pagarmeSubscription.price)
            }
          }
        }

        const initialValue = 0;
        let bonusResult;
        let meta = 0
        const bonusValue = tempArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue,
        )
        if (bonusValue > 1400000) {
          const multiplication = bonusValue * 20
          bonusResult = Math.round(multiplication / 100)
          const stringResult = String(bonusResult)
          bonusResult = stringResult.slice(0, stringResult.length - 2)
          meta = 14000
          metasArray.push(meta)
        } else if (bonusValue > 1000000) {
          const multiplication = bonusValue * 15
          bonusResult = Math.round(multiplication / 100)
          const stringResult = String(bonusResult)
          bonusResult = stringResult.slice(0, stringResult.length - 2)
          meta = 10000
          metasArray.push(meta)
        } else if (bonusValue > 750000) {
          const multiplication = bonusValue * 10
          bonusResult = Math.round(multiplication / 100)
          const stringResult = String(bonusResult)
          bonusResult = stringResult.slice(0, stringResult.length - 2)
          meta = 7500
          metasArray.push(meta)
        } else if (bonusValue > 500000) {
          const multiplication = bonusValue * 5
          bonusResult = Math.round(multiplication / 100)
          const stringResult = String(bonusResult)
          bonusResult = stringResult.slice(0, stringResult.length - 2)
          meta = 5000
          metasArray.push(meta)
        } else {
          metasArray.push(meta)
          bonusResult = '0'
        }
        bonusMonths.push(bonusResult === undefined ? 0 : bonusResult)
      }
      for (let i = 0; i < bonusMonths.length; i++) {
        this.seriesBonus[0].data.push(bonusMonths[i])
      }
      console.log(this.seriesBonus[0].data)
      for (let i = 0; i < metasArray.length; i++) {
        this.seriesClosings[0].data.push(metasArray[i])
      }

      const el2 = document.getElementById('back')

      if (el2 !== null) {
        el2.click()
      }

    },
    generateLastTwelveMonths () {
      const today = new Date()
      const monthsArray = []

      for (let i = 0; i < 12; i++) {
        let month = today.getMonth() - i
        let year = today.getFullYear()

        if (month <= 0) {
          month += 12
          year -= 1
        }

        const formattedDate = `${String(month + 1).padStart(2, '0')}/${year}`;
        monthsArray.push(formattedDate)
      }
      return monthsArray.reverse()
    },
    capitalize (data) {
      var capitalized = []
      var dataTemp = data + ''
      dataTemp.split(' ').forEach(word => {
        capitalized.push(
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
      })
      return capitalized.join(' ')
    },
    convertTimeStamp (ts) {
      if (typeof(ts) === 'number') {
        const timestamp = ts * 1000; // Convert to milliseconds
        const date = new Date(timestamp);
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate
      } else {
        return ts
      }
    },
    formattedPrice(value) {
      let price = '';
      price = String(value);
      if (price.length >= 3) {
        const firstPart = price.slice(0, price.length - 2);
        const secondPart = price.slice(price.length - 2, price.length);

        // Check if the first element of firstPart is 4
        if (firstPart.length === 4) {
          const updatedFirstPart = firstPart.charAt(0) + '.' + firstPart.slice(1);
          const result = updatedFirstPart + ',' + secondPart;
          return result;
        } else {
          const result = firstPart + ',' + secondPart;
          return result;
        }
      }
      return '';
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    timeHumanize () {
      let date = ''
      try {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        const dayAndMonth = months[moment(new Date()).month()]
        // const day = moment(new Date()).format('DD')
        date = dayAndMonth

      } catch (msg) {
        console.log(msg)
      }
      return date
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 9px !important;
}
.main-container {
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 5px;
  box-shadow: none;
  .header {
    .info-container {
    padding: 10px 20px 40px 20px !important;
    }
    .header-page-container {
      border-radius: 9px;
      display: flex;
      flex-direction: row;
      border: 1px solid #D2D4DA !important;
      color: #fafafa;
      box-shadow: none;
      .left-container {
        align-self: start;
        padding-top: 10px;

        .title {
          font-size: 24px;
          font-weight: 700;
        }
        .subtitle {

        }
        .btn-white-border {
          border: 2px solid #FFFFFF !important;
          border-radius: 9px !important;
          transition: all .4s !important;
          padding: 10px 20px !important;
          font-weight: 400 !important;
          font-size: .875rem !important;
          line-height: 1.5 !important;
          &:hover {
            transform: translate(0, -2px) !important;
          }
        }
      }
    }
  }
  .container-body {
    display: flex;
    gap: 2px;
    width: 100%;
    height: 816px;
    border-radius: 7px;
    margin-top: 0px;
    .left-body-container {
      width: 65%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-radius: 7px;

      .clients-info-container{
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 15%;
        margin-right: 6px;
        box-shadow: none;
        padding: 16px 24px;
        border-radius: 9px;
        background-color: white;

        h3 {
          font-weight: 700;
          color: #404252;
          font-size: 20px;

        }
        .general-info {
          display: flex;
          gap: 60px;
          height: 50px;
          .client-info {
            display: flex;
            flex-direction: row;
            gap: 10px;
            width: 210px;
            .cicle-background {
              width: 50px;
              height: 50px;
              border-radius: 10px;
            }
            .first {
              background-color: #FAEECC;
              padding: 11px 13px;
              cursor: pointer;
              &:hover {
                background-color: rgb(230, 172, 0, 0.3);
              }
            }
            .info {
              margin-top: 5px;
              .descriptor {
                color: #9496a1;
                font-weight: 400;
                font-size: 13px;
                margin: 0;
              }
              .text-container {
                display: flex;
                align-items: center;
                gap: 5px;
                .data-text {
                  color: #404252;
                  font-weight: 600;
                  font-size: 16px;
                  margin-bottom: 0;
                }

                sup {
                  color: #2FB490;
                  font-size: 11px;
                  font-weight: 600;
                }
              }
            }

          }
        }

      }
      .contracts-container {
        display: flex;
        gap: 8px;
        width: calc(100% - 7px);
        height: 40%;
        .contracts-info {
          display: flex;
          flex-direction: column;
          background-color: white;
          border-radius: 9px;
          width: 60%;

          .contract-info-container {
            display: flex;
            flex-direction: column;
            padding: 16px 24px 10px 24px;
            border-bottom: 1px solid rgb(0, 0, 0, 0.1) ;

            h3 {
              font-weight: 700;
              color: #404252;
              font-size: 16px;
            }
            .inner-info {
              .descriptor {
                color: #9496a1;
                font-weight: 400;
                font-size: 13px;
                margin: 0;
                margin-bottom: 2px;
              }
              .data-text {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
                margin-bottom: 0;
              }
              .data-name {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
                margin-bottom: 0;
              }
              .description-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
              }
            }
          }
          .plan-info-container {
            display: flex;
            flex-direction: column;
            padding: 12px 24px 0px 24px;
            h3 {
              font-weight: 700;
              color: #404252;
              font-size: 16px;
            }
            .inner-info {
              margin-bottom: 0px;
              .descriptor {
                color: #9496a1;
                font-weight: 400;
                font-size: 13px;
                margin: 0;
              }
              .data-text {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
              }
              .data-name {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
              }
              .description-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
              }
              .text-container {
                display: flex;
                align-items: center;
                gap: 10px;
                .data-text {
                  color: #404252;
                  font-weight: 600;
                  font-size: 16px;
                  margin-bottom: 0;
                }

                sup {
                  color: #2FB490;
                  font-size: 12px;
                  font-weight: 600;
                }
              }
            }
          }
          .suggestion-container {
            display: flex;
            flex-direction: column;
            padding: 12px 24px 11px 24px;
            border-top: 1px solid rgb(47, 180, 144, 0.3) ;
            height: 110px;
            border-radius: 0px 0px 9px 9px;
            background-color: #E6FBF5;
            h3 {
              font-weight: 700;
              color: #404252;
              font-size: 16px;
            }
            .upper-section {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              h3 {
                font-weight: 700;
                color: #404252;
                font-size: 16px;
              }
              .nav-button-pair {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: 4px;
                .updates-nav {
                  width: 32px;
                  height: 32px;
                  background-color: #eaeaea;
                  transition: background-color .2s;
                  border-radius: 16px;
                  border: none;

                  &:hover {
                    background-color: #d2d4da;
                    transition: background-color .2s;
                  }
                }
              }
            }
            .inner-info {
              .descriptor {
                color: #9496a1;
                font-weight: 400;
                font-size: 13px;
                margin: 0;
              }
              .data-text {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
              }
              .data-name {
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                font-size: 15px;
              }
              .description-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
              }
              .cicle-background {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                margin-left: -50px;
              }
            }
            .inner-initial {
              display: flex;
              flex-direction: row;
              gap: 60px;
              .btn-suggestion {
                display: flex;
                gap: 10px;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                border-radius: 9px;
                background-color: rgba(27, 163, 142, 0.15) !important;
                width: 200px !important;
                height: 50px;
                margin-left: 12px;
                cursor: pointer;
                transition: all .4s !important;

                svg {
                  margin-left: -15px;
                }

                p {
                  margin-top: 15px;
                  color: var(--success);
                  font-weight: 600;
                  font-size: 15px;
                }

                &:hover {
                  transform: translate(0, -2px);
                }
              }
              .container-explanation {
                margin-top: -5px;
                width: 300px;
                font-size: 12px;
                font-weight: 500;
                color: #282a3a;
                opacity: 0.8;
              }
            }
          }
        }
        .last-contracts {
          width: 40%;
          background-color: white;
          padding: 16px 24px 12px 24px;
          border-radius: 9px;
          overflow-y: auto;

          .title-section {
            display: flex;
            justify-content: space-between;
            h3 {
              font-weight: 700;
              color: #404252;
              font-size: 16px;
              margin-bottom: 15px;
            }
            small {
              color: #9496a1;
              font-weight: 400;
              font-size: 13px;
              transition: color .2s;
              cursor: pointer;
            }
          }
          .lasts-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding-bottom: 12px;
            .body-info {
              display: flex;
              gap: 15px;
              align-items: center;
              padding: 8px;
              background-color: #BEF1E3;
              border-radius: 12px;
              .cicle-background {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                background-color: #1DB59D;
                .name-initials {
                  display: flex;
                  flex-direction: row;
                  width: 100%;
                  p {
                    font-size: 26px;
                    color: #FFFFFF;
                    font-weight: 500;
                  }
                }
              }

              .info {
                .descriptor {
                  color: #1DB59D;
                  font-weight: 500;
                  font-size: 15px;
                  margin: 0;
                            }
                .contract-status {
                  color: #1DB59D;
                  font-weight: 400;
                  font-size: 16px;
                  margin-bottom: 0;
                }
              }
            }
            .paid {
              cursor: pointer;
              .cicle-background {
                padding: 8px;
              }
              &:hover {
                background-color: rgb(26, 162, 142, 0.3);
              }
            }
            .pending {
              background-color: #faeecc;
              cursor: pointer;

              .cicle-background {
                padding: 8px;
              }

              &:hover {
                background-color: rgb(230, 172, 0, 0.3);
              }
            }
            .canceled {
              background-color: #fae4e4;
              cursor: pointer;

              .cicle-background {
                padding: 9px;
              }

              &:hover {
                background-color: rgb(232, 120, 120, 0.3);
              }
            }

            .empty-container {
              text-align: center;

              .counter-container {
                margin: 0 auto;
                border-radius: 7px;
                width: 350px;
                height: 150px;
              }
              p {
                color: #282a3a ;
                font-size: 14px;
                font-weight: 500;
                margin: 10px 0px 15px 0px;
              }

              svg {
                margin-left: 20px;
                opacity: 0.7;
              }
            }
          }
        }
      }
      .charts-container {
        width: calc(100% - 7px);
        height: 45%;
        background-color: white;
        border-radius: 9px;
        padding-right: 24px;

        .upper-section {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          h3 {
            font-weight: 700;
            color: #404252;
            font-size: 20px;
            margin-bottom: 0px;
            padding: 24px 0px 0px 24px;

          }
          .nav-button-pair {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 4px;
            padding: 24px 24px 0px 0px;
            .updates-nav {
              width: 32px;
              height: 32px;
              background-color: #eaeaea;
              transition: background-color .2s;
              border-radius: 16px;
              border: none;

              &:hover {
                background-color: #d2d4da;
                transition: background-color .2s;
              }
            }
          }
        }
        .chart-deals {
          margin-top: -10px;
        }
      }
    }
    .right-body-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 35%;
      .tasks-container {
        padding: 16px 24px !important;
        background-color: white;
        height: 40%;
        .first-section {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          h3 {
          font-weight: 700;
          color: #404252;
          font-size: 20px;
          margin-bottom: 15px;
          }

          .btn-add {
            display: flex;
            gap: 5px;
            padding: 2px;
            height: 36px;
            color: white !important;
            border: 3px solid var(--featured-light) !important;
            border-radius: 9px;
            background-color: var(--featured-light) !important;
            transition: all .3s !important;
            margin-top: -5px;
            p {
              margin-top: 1px;
              font-size: 16px;
              font-weight: 500;
            }
            &:hover {
              transform: translate(0, -3px);
              border: 3px solid #2fb490 !important;
              background-color: #2fb490 !important;
            }
          }
        }
        .tasks-list {
          .task {
            display: flex;
            margin-top: 5px;
            .task-description {
              width: 420px;
              color: #9496A1;
              font-size: 13px;
              align-self: center;
              margin-top: 2px;
              margin-left: 5px;

            }
            .task-status {
              font-size: 13px;
              width: 50px;
              align-self: center;
              margin-top: -10px;
              margin-left: 20px;
            }
            .btn-edit-icon {
              box-sizing: border-box;
              width: 32px;
              height: 32px;
              border: 1px solid #9496a1;
              border-radius: 5px;
              transition: all .2s;
              background: none;
              margin-top: -5px;

            }
          }
        }
      }
      .favorites-list {
        padding: 15px 20px !important;
        background-color: white;
        height: 60%;
        .first-section {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;

          h3 {
          font-weight: 700;
          color: #404252;
          font-size: 20px;
          margin-bottom: 15px;
          }
          .btn-favorite {
            display: flex;
            gap: 5px;
            padding: 2px;
            height: 36px;
            color: white !important;
            border: 3px solid var(--featured-light) !important;
            border-radius: 9px;
            background-color: var(--featured-light) !important;
            transition: all .3s !important;
            margin-top: -5px;
            p {
              margin-top: 1px;
              font-size: 16px;
              font-weight: 500;
            }
            &:hover {
              transform: translate(0, -3px);
              border: 3px solid #2fb490 !important;
              background-color: #2fb490 !important;
            }
          }
        }
         .tasks-list {
          .task {
            display: flex;
            margin-top: 5px;
            .task-description {
              width: 420px;
              color: #9496A1;
              font-size: 13px;
              align-self: center;
              margin-top: 2px;
              margin-left: 5px;

            }
            .task-status {
              font-size: 13px;
              width: 50px;
              align-self: center;
              margin-top: -10px;
              margin-left: 20px;
            }
            .btn-edit-icon {
              box-sizing: border-box;
              width: 32px;
              height: 32px;
              border: 1px solid #9496a1;
              border-radius: 5px;
              transition: all .2s;
              background: none;
              margin-top: -5px;

            }
          }
        }
      }
    }
  }
}
.card-info{
  padding: 20px 17px;
  box-shadow: 0px 0px 6px 4px rgba(0,0,0,0.1) !important;
  height: 128px;
  .text-header{
    font-weight: 800;
    // padding: 12px 0 0;
    border-radius: 7px;
    font-size: 14.5px;
    float: left;
  }

  i{
    color: var(--featured);
    font-size: 25px;
    height: 25px;
    width: 25px !important;
    vertical-align: middle;
    line-height: 40px;
  }

  .btn{
    padding: .55rem 1.1rem !important;
    font-size: 13px;
  }

  .emissions{
    font-weight: 800;
    font-size: 17px;
  }

  .price{
    font-weight: 500;
    font-size: 14px;
    color: var(--featured);
  }

  .subtitle{
    font-weight: 500;
    font-size: 13px;
    color: var(--featured);
    margin-bottom: 10px;
  }
}
.progress-bar{
  background: var(--featured);
}
.table-card{
  height: 63vh !important;
  overflow: hidden auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
  h4{
    font-weight: 800;
  }
}
.table{
    background-color: white;
    width: 100%;
    margin-top: 5px;
    border-radius: 7px;
    padding: 5px;
    box-shadow: none;
    th{
        border-top: none !important;
        padding-top: 15px !important;
        border-bottom: none;
        font-weight: 700;
        font-size: 12px;
    }
    td{
        font-size: 14px;
        vertical-align: middle;
        padding: 12px 14px !important;
    }
    .status{
        position: relative;
        margin: 0 auto;
        width: 10px;
        height: 10px;
        border-radius: 7px;
    }
    .status-info{
        margin-top: 5px;
        margin-bottom: 0;
        font-weight: 500;
        font-size: 10px;
        text-align: center;
    }
    .type{
        font-size: 14px;
        color: var(--featured);
        font-weight: 500;
    }
    .btn-secondary{
        padding: 0px !important;
    }
}
.title-loading{
  background: rgba(0, 0, 0, 0.07);
  color: rgba(0, 0, 0, 0.0) !important;
  height: 19px;
  width: 135px;
  border-radius: 3px;
}
.subtitle-loading{
  background: rgba(0, 0, 0, 0.07);
  color: rgba(0, 0, 0, 0.0) !important;
  height: 18px;
  width: 100px;
  border-radius: 3px;
  margin-top: 3px;
}
.btn-loading{
  display: flex;
  gap: 5px;
  padding: 2px;
  height: 36px;
  width: 56px;
  color: gray !important;
  border: 3px solid rgba(0, 0, 0, 0.07) !important;
  border-radius: 9px;
  background-color: rgba(0, 0, 0, 0.07) !important;
  transition: all .3s !important;
  margin-top: -5px;
  p {
    margin-top: 1px;
    margin-right: 3px;
    font-size: 16px;
    font-weight: 500;
  }
  &:hover {
    transform: translate(0, -3px);
    border: 3px solid #2fb490 !important;
    background-color: #2fb490 !important;
  }
}
.loading-sm{
  height: 17px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-md{
  height: 27px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-lg{
  height: 37px;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 9px;
}
.loading-btn{
  height: 37px;
  background: gray;
  border-radius: 9px;
}

</style>
