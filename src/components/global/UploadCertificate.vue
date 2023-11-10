<template>
  <div>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <form @submit.prevent="uploadCertificate()" class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="dialog">
          <div class="modal-content">
            <div class="modal-header pb-0">
              <h4 class="modal-title">Certificado Digital</h4>
              <button type="button" class="close" @click="closeModal()" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <p>Insira o certificado digital em formato .pfx do contador responsável pelas procurações dos clientes</p>
              <div class="dropzone">
                <input type="file" multiple class="dropzone-file" id="dropzone-file" @change="onChange" ref="file" accept=".pfx" required/>
                <div class="dropzone-wrapper" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                  <label for="dropzone-file" class="dropzone-label w-100 h-100 pt-10 pb-3 pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="#c2c2c2" class="bi bi-cloud-arrow-up-fill dropzone-label-icons" viewBox="0 0 16 16">
                      <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
                    </svg>
                    <div class="dropzone-label-text">
                      <p>
                        <strong>Arraste e solte o certificado</strong>
                      </p>
                      <p>
                        Seu arquivo será adicionado automaticamente
                      </p>
                      <div type="button" class="btn btn-sm btn-secondary">ou selecione o arquivo</div>
                      <p class="pt-4 pb-0" v-if="filelist[0]">
                        <small class="secondary-text" style="color: var(--featured)">{{filelist[0].name}}</small>
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <h5 class="ml-2 mt-3">Senha do certificado</h5>
              <p class="ml-2 mb-3 mt-2">Insira a senha do certificado para que os nosso sistema possa utilizar</p>
              <div class="relative flex-grow pl-2 pr-2 bi bi-lock-fill">
                <svg
                  class="text-gray-600 position-absolute"
                  style="margin-left: 14px; margin-top: 6px;"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 16 16"
                  stroke="#065247"
                  width="1.2em" height="2.0em"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
                <input
                    type="password"
                    v-model="password"
                    class="form-control flex-grow pl-5 pr-0 w-100"
                    placeholder="Senha do certificado"
                    required
                  >
              </div>
              <!--<div class="form-group pl-2 pr-2">
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Senha do certificado"
                  required
                >
              </div>-->
              <h5 class="ml-2 mt-3">Data de vencimento</h5>
              <p class="ml-2 mb-3 mt-2">Insira a data de vencimento do certificado digital para que possamos lhe informar assim que for vencer</p>
              <div class="mb-4">
                <v-date-picker v-model="date" mode="date" color="green" required is24hr>
                  <template v-slot="{ inputValue, inputEvents }">
                  <div class="flex flex-col sm:flex-row justify-start items-center pr-2 pl-2">
                      <div class="relative flex-grow">
                        <svg
                          class="text-gray-600 position-absolute"
                          style="margin-left: 12px"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.7"
                          viewBox="0 0 24 24"
                          stroke="#065247"
                          width="1.5em" height="2.8em"
                        >
                          <path
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <input
                          class="flex-grow pl-5 pr-0 w-100"
                          style="border-radius: 10px; cursor: pointer;"
                          placeholder="Data de vencimento"
                          :value="inputValue"
                          v-on="inputEvents"
                          required
                        />
                      </div>
                    </div>
                  </template>
                </v-date-picker>
              </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-sm btn-primary" :disabled="loading">
                  <template v-if="loading" style="transition: all .3s !important">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </template>
                  <template v-else>
                    Enviar Certificado Digital
                  </template>
                </button>
            </div>
        </div>
      </form>
      <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
        {{status.info}}
      </div>
      <div class="modal-backdrop fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
    loading: false,
    filelist: [],
    password: '',
    status: {
      info: '',
      color: ''
    },
    date: '',
    masks: {
      input: 'YYYY-MM-DD'
    }
  }),

  created () {
    this.$root.$on('UploadCertificate::show', () => { this.showModal = true })

    this.$root.$on('UploadCertificate::hide', () => { this.showModal = false })
  },

  methods: {
    onChange () {
      this.filelist = [...this.$refs.file.files]
      if (this.filelist.length > 1) {
        this.filelist = []
      }
      if (this.filelist.length && this.filelist[0].name.slice(this.filelist[0].name.length - 4) !== '.pfx') {
        this.filelist = []
      }
    },
    remove (i) {
      this.filelist.splice(i, 1)
    },
    dragover (event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100')
        event.currentTarget.classList.add('bg-green-300')
      }
    },
    dragleave (event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    drop (event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    closeModal () {
      this.showModal = false
    },
    async uploadCertificate () {
      this.loading = true

      const snapshot = await this.$firebase.storage().ref(`digitalCertificates/${window.uid}`).child(Date.now() + '.pfx').put(this.filelist[0])

      const url = await snapshot.ref.getDownloadURL()

      this.$firebase.database().ref('users').child(window.uid).child('certificate').update({ digitalCertificateUrl: url, expirationDate: this.date, password: this.password })

      setTimeout(() => {
        this.loading = false
      }, 500)

      setTimeout(() => {
        this.status = {
          info: '',
          color: ''
        }
      }, 1000)

      setTimeout(() => {
        this.closeModal()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content{
  .modal-header, .modal-footer{
    border: none !important;
  }

  h4, h5{
    font-weight: 700;
  }
  .form-group{
    margin: 7px 0;
  }
}
.dropzone {
  max-width: calc(100vw - 0.5rem);
  max-height: calc(100vh - 0.5rem);
  padding: 0.5rem;
  cursor: pointer !important;
  strong {
    font-size: 17px;
    font-weight: 800;
  }
  p {
    font-size: 13px;
    font-weight: 400;
  }
  .dropzone-file {
    overflow: hidden;
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    cursor: pointer !important;
  }

  .dropzone-wrapper {
    text-align: center;
    border-radius: 10px;
    box-shadow: -1px 5px 25px -9px rgba(0, 0, 0, 0.2);
    border: 2px dashed var(--featured);
    cursor: pointer !important;
  }

  .dropzone-label-text {
    text-align: center;
  }

  .dropzone-label-icon {
    @apply pointer-events-none text-current;
  }

  .dropzone-label-text p,
  .dropzone-label-text span {
    @apply m-0;
  }

  .dropzone-label .button {
    @apply bg-transparent inline-block font-normal text-center align-middle select-none;
    @apply text-current pointer-events-none border-2 border-solid border-current py-1.5 px-3 text-base mt-5;
    user-select: none;
    pointer-events: none;
    border-radius: 0.35rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
}
</style>
