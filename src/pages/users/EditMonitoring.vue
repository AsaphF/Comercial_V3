<template>
  <div>
    <button class="btn btn-sm btn-edit" @click="initialChanges()"><i class="fas fa-user-edit"></i>Monitorar</button>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-scrollable" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Monitoramento</h5>
            <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="EditCustomer()">
            <div class="modal-body">
              <h6 class="modal-body-title">Cliente: <strong>{{ userData.name }}</strong></h6>
              <div class="modal-body-content" v-if="userData">
                <div class="inner-container">
                  <div class="label-container">
                    <svg width="20" height="20" viewBox="0 0 16 16" :fill="monitoringInfos.dctfWebStatus.style" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0V4H14L10 0Z" :fill="monitoringInfos.dctfWebStatus.style"/>
                      <path d="M8.49187 8.51344C8.24406 8.43719 7.94437 8.39906 7.59312 8.39906H6.83406V12.2531H7.70562C7.89656 12.2531 8.04656 12.2481 8.155 12.2375C8.26344 12.2272 8.37562 12.2013 8.49187 12.16C8.60812 12.1188 8.70875 12.0606 8.79406 11.9856C9.17875 11.6603 9.37125 11.1 9.37125 10.3044C9.37125 9.74406 9.28656 9.32438 9.1175 9.04563C8.94844 8.76688 8.73969 8.58938 8.49187 8.51344Z" :fill="monitoringInfos.dctfWebStatus.style"/>
                      <path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM10.4481 11.2463C10.3888 11.5278 10.2972 11.7816 10.1731 12.0075C10.0491 12.2334 9.89031 12.4356 9.69656 12.6138C9.54406 12.7506 9.3775 12.8603 9.19688 12.9431C9.01625 13.0259 8.82187 13.0838 8.61406 13.1175C8.40625 13.1513 8.17188 13.1678 7.91094 13.1678H6.41187C6.20281 13.1678 6.045 13.1362 5.93938 13.0728C5.83344 13.0097 5.76438 12.9206 5.73219 12.8056C5.7 12.6906 5.68375 12.5416 5.68375 12.3581V8.19406C5.68375 7.94625 5.73938 7.76656 5.85031 7.65563C5.96125 7.54469 6.14094 7.48906 6.38875 7.48906H7.88781C8.27781 7.48906 8.61219 7.52531 8.89094 7.5975C9.16969 7.66969 9.42281 7.80531 9.65 8.00438C10.2413 8.51063 10.5372 9.28 10.5372 10.3131C10.5372 10.6541 10.5075 10.965 10.4481 11.2463Z" :fill="monitoringInfos.dctfWebStatus.style"/>
                    </svg>
                    <label for="dctfwebM">DCTFWeb:</label>
                  </div>
                  <select v-model="monitoringInfos.dctfWebStatus.status" id="dctfwebM" class="form-control">
                    <option disabled>Selecione</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Não enviado">Não enviado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
                <div class="inner-container">
                  <div class="label-container">
                    <svg width="20" height="20" viewBox="0 0 16 16" :fill="monitoringInfos.dasStatus.style" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10C9.44687 5 9 4.55313 9 4V0H4ZM10 0V4H14L10 0ZM4 2.5C4 2.225 4.225 2 4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM8 6.75C8.275 6.75 8.5 6.975 8.5 7.25V7.79063C8.76562 7.82813 9.02188 7.8875 9.25313 7.95C9.51875 8.02187 9.67812 8.29375 9.60625 8.5625C9.53437 8.83125 9.2625 8.9875 8.99375 8.91562C8.64688 8.82187 8.30625 8.75313 7.99062 8.75C7.72812 8.74687 7.44688 8.80625 7.25313 8.92188C7.075 9.02813 7 9.15 7 9.32187C7 9.4375 7.04063 9.525 7.22813 9.6375C7.44375 9.76562 7.74687 9.85937 8.14062 9.97812L8.15625 9.98125C8.50938 10.0875 8.94688 10.2188 9.29063 10.4375C9.66875 10.675 9.99062 11.0531 10 11.6313C10.0094 12.2344 9.7 12.6719 9.28438 12.9312C9.04375 13.0812 8.77187 13.1687 8.5 13.2156V13.75C8.5 14.025 8.275 14.25 8 14.25C7.725 14.25 7.5 14.025 7.5 13.75V13.1938C7.15 13.1281 6.82188 13.0156 6.53438 12.9156C6.46875 12.8937 6.40312 12.8719 6.34062 12.85C6.07812 12.7625 5.9375 12.4781 6.025 12.2188C6.1125 11.9594 6.39687 11.8156 6.65625 11.9031C6.73438 11.9281 6.80625 11.9531 6.87813 11.9781C7.30313 12.1219 7.64687 12.2406 8.0125 12.25C8.29687 12.2594 8.57188 12.1969 8.75313 12.0844C8.9125 11.9844 9 11.8563 8.99687 11.6469C8.99375 11.5031 8.94062 11.4031 8.75625 11.2844C8.54375 11.15 8.24062 11.0531 7.85 10.9344L7.8 10.9187C7.45625 10.8156 7.04063 10.6906 6.7125 10.4906C6.3375 10.2656 6.00625 9.9 6.00313 9.325C6 8.71875 6.34062 8.3 6.74687 8.05937C6.98125 7.92187 7.24062 7.83437 7.5 7.7875V7.25C7.5 6.975 7.725 6.75 8 6.75Z" :fill="monitoringInfos.dasStatus.style"/>
                    </svg>
                    <label for="dasM">Guia de DAS:</label>
                  </div>
                  <select v-model="monitoringInfos.dasStatus.status" id="dasM" class="form-control" >
                    <option disabled selected>Selecione</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Não enviado">Não enviado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
                <div class="inner-container">
                  <div class="label-container">
                    <svg width="20" height="20" viewBox="0 0 16 16" :fill="monitoringInfos.parcelamentosStatus.style" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0V4H14L10 0Z" :fill="monitoringInfos.parcelamentosStatus.style"/>
                      <path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM6.36906 12.4322C6.36906 12.8384 6.03969 13.1675 5.63375 13.1675H5.47281C5.06656 13.1675 4.7375 12.8381 4.7375 12.4322V8.22625C4.7375 7.82 5.06687 7.49094 5.47281 7.49094H5.63375C6.04 7.49094 6.36906 7.82031 6.36906 8.22625V12.4322ZM6.5 5H4.5C4.225 5 4 4.775 4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5ZM6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3ZM8.82969 12.4303C8.82969 12.8366 8.50031 13.1656 8.09438 13.1656H7.93344C7.52719 13.1656 7.19813 12.8362 7.19813 12.4303V8.22438C7.19813 7.81813 7.5275 7.48906 7.93344 7.48906H8.09438C8.50063 7.48906 8.82969 7.81844 8.82969 8.22438V12.4303ZM11.2903 12.4322C11.2903 12.8384 10.9609 13.1675 10.555 13.1675H10.3941C9.98781 13.1675 9.65875 12.8381 9.65875 12.4322V8.22625C9.65875 7.82 9.98813 7.49094 10.3941 7.49094H10.555C10.9613 7.49094 11.2903 7.82031 11.2903 8.22625V12.4322Z" :fill="monitoringInfos.parcelamentosStatus.style"/>
                    </svg>
                    <label for="parcelamentosM">Parcelamentos:</label>
                  </div>
                  <select v-model="monitoringInfos.parcelamentosStatus.status" id="parcelamentosM" class="form-control">
                    <option disabled selected>Selecione</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Não enviado">Não enviado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
                <div class="inner-container">
                  <div class="label-container">
                    <svg width="20" height="20" viewBox="0 0 16 16" :fill="monitoringInfos.certidoesStatus.style" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0V4H14L10 0Z" :fill="monitoringInfos.certidoesStatus.style"/>
                      <path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM10.9141 10.9638C10.9894 11.0378 11.0197 11.1459 10.9919 11.2481C10.9641 11.3503 10.8838 11.4303 10.7816 11.4559L10.0222 11.6478L10.2347 12.4009C10.2638 12.5031 10.2347 12.6122 10.1606 12.6866C10.0866 12.7606 9.97719 12.7897 9.875 12.7606L9.12187 12.5481L8.93 13.3075C8.90313 13.4097 8.82438 13.4897 8.72219 13.5178C8.62 13.5456 8.51187 13.5153 8.43781 13.44L7.89125 12.8788L7.34469 13.44C7.27063 13.5153 7.1625 13.5456 7.06031 13.5178C6.95812 13.49 6.87813 13.4097 6.8525 13.3075L6.66062 12.5481L5.9075 12.7606C5.80531 12.7897 5.69625 12.7606 5.62188 12.6866C5.54781 12.6125 5.51875 12.5031 5.54781 12.4009L5.76031 11.6478L5.00094 11.4559C4.89875 11.4291 4.8175 11.3503 4.79063 11.2481C4.76375 11.1459 4.79313 11.0369 4.86969 10.9638L5.43094 10.4172L4.86969 9.87062C4.79313 9.79781 4.76281 9.68969 4.79063 9.5875C4.81844 9.48531 4.89875 9.40531 5.00094 9.37969L5.76031 9.18656L5.54781 8.43344C5.51875 8.33125 5.54781 8.22219 5.62188 8.14781C5.69594 8.07375 5.80531 8.04469 5.9075 8.07375L6.66062 8.28625L6.8525 7.52688C6.87937 7.42469 6.95812 7.34344 7.06031 7.31656C7.1625 7.28969 7.27156 7.31906 7.34469 7.39563L7.89125 7.95688L8.43781 7.39563C8.51062 7.31906 8.61875 7.28875 8.72094 7.31656C8.82313 7.34438 8.90313 7.42469 8.92875 7.52688L9.12187 8.28625L9.875 8.07375C9.97719 8.04469 10.0863 8.07375 10.1606 8.14781C10.2347 8.22188 10.2638 8.33125 10.2347 8.43344L10.0222 9.18656L10.7816 9.37844C10.8838 9.40531 10.9637 9.48406 10.9919 9.58625C11.0197 9.68844 10.9894 9.79656 10.9141 9.87062L10.3528 10.4172L10.9141 10.9638Z" :fill="monitoringInfos.certidoesStatus.style"/>
                    </svg>
                    <label for="certidoesM">Certidões Negativas:</label>
                  </div>
                  <select v-model="monitoringInfos.certidoesStatus.status" id="certidoesM" class="form-control">
                    <option disabled selected>Selecione</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Não enviado">Não enviado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
                <div class="inner-container">
                  <div class="label-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512" :style="{ fill: monitoringInfos.monitoringStatus.style }"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/></svg>
                    <label for="selectM">Situação do Monitoramento:</label>
                  </div>
                  <select v-model="monitoringInfos.monitoringStatus.status" id="selectM" class="form-control">
                    <option disabled selected>Selecione</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div class="inner-container">
                  <div class="label-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" style="fill: #404252;"><path d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"/></svg>
                    <label for="selectObsM" style="color:#404252">Observações:</label>
                  </div>
                  <div class="form-group">
                    <div class="grid-container">
                      <div class="grid-item" v-for="(status, index) in monitoringObservations" :key="index">
                        <div :for="status.status">
                          <label class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" v-model="status.checked">
                            <span v-if="statuslength > 5" class="custom-control-label" style="font-size: 14px !important;">{{status.status}}</span>
                            <span v-else class="custom-control-label" style="font-size: 14px !important;">{{status.status}}</span>
                          </label>
                        </div>
                    </div>
                    </div>
                  </div>
                  <!-- <select v-model="monitoringInfos.monitoringObservations.status" id="selectObsM" class="form-control">
                    <option disabled selected>Selecione</option>
                    <option>Informar faturamento</option>
                    <option>Não utilizar e-mail de disparo</option>
                    <option>E-mail de disparo bloqueado</option>
                    <option>Certificado vencido</option>
                    <option>Boleto próximo do vencimento</option>
                    <option>Sem e-mail de disparo</option>
                  </select> -->
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <span v-if="conclude">Monitoramento salvo!</span>
              <button class="btn btn-primary" :disabled="loading">
                <template v-if="loading" style="transition: all .3s !important">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>
                <template v-else-if="conclude" style="transition: all .3s !important">
                  <i class="fas fa-check-square"></i>Salvo
                </template>
                <template v-else>
                  <i class="fas fa-pen"></i>Salvar
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" @click="closeModal()" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userData'],
  data: () => ({
    showModal: false,
    monitoringInfos: {
      dctfWebStatus: {
        status: 'Selecione',
        style: ''
      },
      dasStatus: {
        status: 'Selecione',
        style: ''
      },
      parcelamentosStatus: {
        status: 'Selecione',
        style: ''
      },
      certidoesStatus: {
        status: 'Selecione',
        style: ''
      },
      monitoringStatus: {
        status: 'Selecione',
        style: ''
      }
    },
    monitoringObservations: [
      { status: 'Informar faturamento', checked: false, id: 0 },
      { status: 'Sem e-mail de disparo', checked: false, id: 1 },
      { status: 'Cliente sensível', checked: false, id: 2 },
      { status: 'Senha trocada', checked: false, id: 3 },
      { status: 'E. de disparo bloqueado', checked: false, id: 4 },
      { status: 'Certificado vencido', checked: false, id: 5 },
      { status: 'Boleto próximo do vencimento', checked: false, id: 6 },
      { status: 'Não utilizar email de disparo', checked: false, id: 7 }
    ],
    loading: false,
    conclude: false,
    hasCpf: false,
    infoLoading: false
  }),

  methods: {
    initialChanges () {
      console.log(this.userData)
      this.showModal = true
      if (this.userData.monitoringInfos) {
        this.monitoringInfos.dctfWebStatus.status = this.userData.monitoringInfos.dctfWebStatus ? this.userData.monitoringInfos.dctfWebStatus : 'Selecione'
        this.monitoringInfos.dasStatus.status = this.userData.monitoringInfos.dasStatus ? this.userData.monitoringInfos.dasStatus : 'Selecione'
        this.monitoringInfos.parcelamentosStatus.status = this.userData.monitoringInfos.parcelamentosStatus ? this.userData.monitoringInfos.parcelamentosStatus : 'Selecione'
        this.monitoringInfos.certidoesStatus.status = this.userData.monitoringInfos.certidoesStatus ? this.userData.monitoringInfos.certidoesStatus : 'Selecione'
        this.monitoringInfos.monitoringStatus.status = this.userData.monitoringInfos.monitoringStatus ? this.userData.monitoringInfos.monitoringStatus : 'Selecione'
      } else {
        this.monitoringInfos.dctfWebStatus.status = 'Selecione'
        this.monitoringInfos.dasStatus.status = 'Selecione'
        this.monitoringInfos.parcelamentosStatus.status = 'Selecione'
        this.monitoringInfos.certidoesStatus.status = 'Selecione'
        this.monitoringInfos.monitoringStatus.status = 'Selecione'
      }
      for (const info in this.monitoringInfos) {
        if (this.monitoringInfos[info].status === 'Selecione') {
          this.monitoringInfos[info].style = '#404252'
        } else if (this.monitoringInfos[info].status === 'Enviado') {
          this.monitoringInfos[info].style = '#068373'
        } else if (this.monitoringInfos[info].status === 'Não enviado') {
          this.monitoringInfos[info].style = '#E56B5B'
        } else if (this.monitoringInfos[info].status === 'Finalizado') {
          this.monitoringInfos[info].style = '#e6ac00'
        } else if (this.monitoringInfos[info].status === 'Concluído') {
          this.monitoringInfos[info].style = '#068373'
        } else if (this.monitoringInfos[info].status === 'Pendente') {
          this.monitoringInfos[info].style = '#e6ac00'
        }
      }
      if (this.userData.monitoringInfos) {
        if (this.userData.monitoringInfos.monitoringObservations) {
          for (let i = 0; i < this.monitoringObservations.length; i++) {
            for (let j = 0; j < this.userData.monitoringInfos.monitoringObservations.length; j++) {
              if (this.userData.monitoringInfos.monitoringObservations[j] && this.monitoringObservations[i].id && this.userData.monitoringInfos.monitoringObservations[j].id === this.monitoringObservations[i].id) {
                this.monitoringObservations[i] = this.userData.monitoringInfos.monitoringObservations[j]
              }
            }
          }
        }
      }
    },
    async EditCustomer () {
      this.loading = true
      console.log(this.monitoringInfos)
      if (this.monitoringInfos.dctfWebStatus.status !== 'Selecione') {
        this.userData.monitoringInfos.dctfWebStatus = this.monitoringInfos.dctfWebStatus.status
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ dctfWebStatus: this.monitoringInfos.dctfWebStatus.status })
      }
      if (this.monitoringInfos.dasStatus.status !== 'Selecione') {
        this.userData.monitoringInfos.dasStatus = this.monitoringInfos.dasStatus.status
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ dasStatus: this.monitoringInfos.dasStatus.status })
      }
      if (this.monitoringInfos.parcelamentosStatus.status !== 'Selecione') {
        this.userData.monitoringInfos.parcelamentosStatus = this.monitoringInfos.parcelamentosStatus.status
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ parcelamentosStatus: this.monitoringInfos.parcelamentosStatus.status })
      }
      if (this.monitoringInfos.certidoesStatus.status !== 'Selecione') {
        this.userData.monitoringInfos.certidoesStatus = this.monitoringInfos.certidoesStatus.status
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ certidoesStatus: this.monitoringInfos.certidoesStatus.status })
      }
      if (this.monitoringInfos.monitoringStatus.status !== 'Selecione') {
        this.userData.monitoringInfos.monitoringStatus = this.monitoringInfos.monitoringStatus.status
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ monitoringStatus: this.monitoringInfos.monitoringStatus.status })
      }
      const tempArray = []
      for (let i = 0; i < this.monitoringObservations.length; i++) {
        if (this.monitoringObservations[i].checked) {
          tempArray.push(this.monitoringObservations[i])
        }
      }
      if (tempArray.length > 0) {
        this.userData.monitoringInfos.monitoringObservations = tempArray
        this.$firebase.database().ref('support/monitoringInfos').child(this.userData.uId).update({ monitoringObservations: tempArray })
      } else {
        delete this.userData.monitoringInfos.monitoringObservations
        this.$firebase.database().ref(`support/monitoringInfos/${this.userData.uId}/monitoringObservations`).remove()
      }
      for (const info in this.monitoringInfos) {
        if (this.monitoringInfos[info].status === 'Selecione') {
          this.monitoringInfos[info].style = '#404252'
        } else if (this.monitoringInfos[info].status === 'Enviado') {
          this.monitoringInfos[info].style = '#068373'
        } else if (this.monitoringInfos[info].status === 'Não enviado') {
          this.monitoringInfos[info].style = '#E56B5B'
        } else if (this.monitoringInfos[info].status === 'Finalizado') {
          this.monitoringInfos[info].style = '#e6ac00'
        } else if (this.monitoringInfos[info].status === 'Concluído') {
          this.monitoringInfos[info].style = '#068373'
        } else if (this.monitoringInfos[info].status === 'Pendente') {
          this.monitoringInfos[info].style = '#e6ac00'
        }
      }
      setTimeout(() => {
        this.loading = false
        this.conclude = true
      }, 500)
      this.conclude = false
    },
    closeModal () {
      this.showModal = false
      this.conclude = false
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
.btn-edit {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #1BA38E;
  border: 2px solid #1BA38E !important;
  padding: 13px 30px !important;
  font-size: 12.8px;
  transition: all .3s !important;

  &:hover{
    background: #068373;
    border: 1px solid #068373;
    color: white;
    transform: translate(0, -3px);
  }
  &.active {
    background: #068373;
    border: 1px solid #068373;
    color: white;
    transform: translate(0, -3px);
  }
}
.modal-content{
  .modal-header {
    padding: 1.2rem 1rem !important;
    .modal-title {
      color: #101223;
    }
    .close {
      padding-top: 22px;
    }
  }
  .modal-body{
    display: flex;
    flex-direction: column;
    height: 64vh;
    .modal-body-title {
      margin-top: -1px;
      margin-bottom: 20px;
      font-size: 17px;
      font-weight: 500;
      // color: #282a3a;
    }
    .modal-body-content {

      .inner-container {
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 12px;
        margin-bottom: 12px;
        .label-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 5px;
          label {
            font-size: 16px;
            font-weight: 600;
            color: #404252;
          }
        }
        .form-control {
          font-size: 15px;
          font-weight: 500;
          // font-style :italic;
          border: 1px solid #d2d4da !important;
          box-shadow: none;
        }
        .form-group{
          margin: 5px 0;
          .grid-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            .grid-item {
              padding-right: 30px;
              text-align: start !important;
              label {
                padding-left: 25px;
                span {
                  padding-top: 1.3px;
                }
              }
              .custom-control-input:checked ~ .custom-control-label::before {
                background-color: #068373;
                border-color: #068373;
              }
            }
          }
          // .grid-container{
          //   display: flex;
          //   flex-direction: row;
          //   flex-wrap: wrap;
          //   .grid-item {
          //     margin-left: 8px;
          //     label {
          //       padding-left: 25px;
          //       span {
          //         padding-top: 1.3px;
          //       }
          //     }
          //   }
          // }
        }
        &:last-child {
          padding-bottom: 0px !important;
          margin-bottom: 0px !important;
          border-bottom: none !important;
        }
      }
    }
  }
  .modal-footer {
    display: flex !important;
    flex-direction: row !important;

    span {
      font-weight: 500;
      color: #0dce9a;
    }
  }
  .modal-header, .modal-footer{
    border: none !important;
  }
  h4, h5{
    font-weight: 700;
  }
}

</style>
