<template>
  <div class="form-register">
    <div class="container-fluid">
      <div class="row">
        <div class="card col-lg-4 col-md-12 col-sm-12">
          <div class="card-body">
            <form @submit.prevent="doRegister()">
              <h4 class="mt-4"><span>Contador,</span><br>você está quase lá...</h4>
              <h5 class="mb-2">Informações da Empresa</h5>
              <div class="form-group">
                <div class="input-group">
                  <input
                    type="cnpj"
                    v-model="user.cnpj"
                    class="form-control"
                    placeholder="CNPJ da Empresa"
                    v-mask="cnpjMask"
                    @setter="cnpjValue"
                    required
                  >
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2" @click="autoInfoRequest()">
                      <template v-if="infoLoading">
                        <i class="fas fa-circle-notch fa-spin"></i>
                      </template>
                      <template v-else>
                        <i class="fa fa-search"></i>
                      </template>
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="name"
                  v-model="user.name"
                  class="form-control"
                  placeholder="Razão Social"
                  required
                  style="text-transform:uppercase"
                >
              </div>
              <div class="form-group">
                <input
                  type="phone"
                  v-model="user.phone"
                  class="form-control"
                  placeholder="Celular do Responsável"
                  v-mask="user.phone.length >= 15 ? '(##) #####-####' : '(##) ####-####'"
                  minlength="14"
                  required
                >
              </div>
              <div class="container-flex">
                <div class="row">
                  <div class="form-group col-4">
                    <input
                      type="uf"
                      v-model="user.uf"
                      class="form-control"
                      placeholder="UF"
                      v-mask="'AA'"
                      style="text-transform:uppercase"
                      required
                    >
                  </div>
                  <div class="form-group col-8 pl-0">
                    <input
                      autocomplete="false"
                      type=""
                      v-model="user.city"
                      class="form-control"
                      placeholder="Município"
                      required
                    >
                  </div>
                </div>
              </div>
              <h5 class="mt-3 mb-2">Informações de Login</h5>
              <div class="form-group">
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="E-mail de Login"
                  required
                >
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Defina sua Senha"
                  minlength="8"
                  required
                >
              </div>
              <div class="row mb-2 check-terms">
                <label class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" value="" id="flexCheckDefault" required>
                  <span class="custom-control-label"></span>
                </label>
                <p class="form-check-inline">Concordo com os<a @click="showTerm = true">Termos de Uso</a></p>
              </div>
              <button class="btn btn-primary w-100" :disabled="loading">
                <template v-if="loading">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </template>
                <template v-else>
                  Solicitar Minha Conta
                </template>
              </button>
              <div><router-link class="btn-link mb-4" to="/login">Já tenho minha conta Emissão Simples</router-link></div>
            </form>
          </div>
        </div>
        <div class="right-side col-0 col-lg-8">
          <img class="img-fluid" src="../../assets/images/logo-white-1x.png">
          <div>
            <h5 class="title">Não perca mais tempo com a emissão de guias</h5>
            <h5 class="subtitle">O Emissão Simples veio pra automatizar ainda mais a sua contabilidade, abra já a sua conta em nosso novo sistema.</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-centered" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Sua conta foi solicitada</h4>
          </div>
          <div class="modal-body">
            <p>Em breve nossa equipe entrará em contato com você para finalizar o cadastro da sua conta Emissão Simples, assim sua empresa fará parte da nova era digital da contabilidade.</p>
            <h5>Muito Obrigado!</h5>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="$router.push({ name: 'index' })">Voltar para página principal</button>
            </div>
        </div>
      </div>
    </div>
    <div class="modal fade" :class="{show: showTerm}" :style="{display: showTerm ? 'block' : 'none'}">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Termos de uso</h4>
            <button type="button" class="close" @click="showTerm = false" data-bs-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p style='font-size:12px;margin:10px 15px;'>
              1. ACEITAÇÃO <br>
              Este é um contrato firmado entre você, de agora em diante denominado como usuário, e a Lucas de Oliveira Marques,
              empresa cadastrada no CNPJ sob nº 34.182.565/0001-59 Este "Termo de Uso de Aplicativo" rege o uso do software<br>
              Emissão Simples. Se você não concordar com estes termos não use este software.<br>
              Você reconhece que analisou e aceitou as condições de uso. Leia-as atentamente pois o uso deste software significa que
              você aceitou todos os termos e concorda em cumpri-los.<br><br>

              2. LICENÇA LIMITADA <br>
              Você recebeu uma licença limitada, não exclusiva, livre de royalties e revogável para utilizar
              em seu dispositivo. Você reconhece e concorda que a Lucas de Oliveira Marques concede ao usuário uma licença exclusiva para
              uso e desta forma não lhe transfere os direitos sobre o produto. O software deverá ser utilizado por você, usuário, sendo que
              a licença pode ser usada em no máximo uma empresa. A licença adquirida deve ser utilizada somente pelo usuário
              adquirente e, portanto, a venda, empréstimo, compartilhamento, transferência, modificação, engenharia reversa ou distribuição
              bem como a cópia de textos, imagens ou quaisquer partes nele contido é expressamente proibida.<br><br>

              3. PAGAMENTO E DESISTÊNCIA <br>
              O usuário deve pagar à Lucas de Oliveira Marques o valor do respectivo plano escolhido de acordo com a quantia de emissões que
              deseja adquirir definida entre as opções de pagamento disponibilizadas ao usuário no ato da compra.<br>
              O usuário pode a qualquer momento optar pela aquisição de um plano com mais emissões, sendo que as transações realizadas, isto é, as
              emissões já adquiridas não terão opção de devolução.<br>
              Os valores relativos aos planos poderão ser alterados a qualquer tempo pela Lucas de Oliveira Marques.<br>
              O pagamento referente a aquisição das emissões para o software é feito exclusivamente pela plataforma pagar.me, empresa cadastrada
              sob a inscrição 16.501.555/0001-57, sem que haja negociação fora da mesma.<br>
              O reembolso pode ser solicitado em até 7 dias após a compra conforme prevê o artigo 49 do CDC. Contudo, caso o cliente utilize parte
              do produto, isto é, utilize alguma das emissões compradas, o reembolso não será efetuado.<br><br>

              4. ALTERAÇÕES, MODIFICAÇÕES E RESCISÃO <br>
              A Lucas de Oliveira Marques reserva-se no direito de, a qualquer tempo, modificar estes termos seja incluindo, removendo ou
              alterando quaisquer de suas cláusulas. Tais modificações terão efeito imediato. Após publicadas tais alterações, ao continuar com
              o uso do programa você terá aceitado e concordado em cumprir os termos modificados. A Lucas de Oliveira Marques pode, de tempos em
              tempos, atualizar este software. O usuário não poderá responsabilizar a Lucas de Oliveira Marque nem seus diretores, executivos,
              funcionários, afiliados, agentes, contratados ou licenciadores por quaisquer modificações, suspensões ou descontinuidade do aplicativo.<br><br>

              5. CONSENTIMENTO PARA USO DO SISTEMA, COLETA E USO DE DADOS <br>
              Você concorda que a Lucas de Oliveira Marques pode coletar e usar dados cadastrais de seus clientes registrado no sistema, tais como cnpj,
              cpf do representante da empresa, razão social, acessos ao ecac, e entre outras informações.<br><br>

              6. ISENÇÃO DE GARANTIAS E LIMITAÇÕES DE RESPONSABILIDADE <br>
              Este aplicativo estará em contínuo desenvolvimento e pode conter erros e, por isso, o uso é fornecido "no estado em que se encontra" e sob
              risco do usuário final. A Lucas de Oliveira Marques fornecerá suporte em caso de erro, na medida do possível e disponibilidade da empresa.
              Na extensão máxima permitida pela legislação aplicável a Lucas de Oliveira Marques e seus fornecedores isentam-se de quaisquer garantias e
              condições expressas ou implícitas incluindo, sem limitação, garantias de comercialização, adequação a um propósito específico, titularidade
              e não violação no que diz respeito ao aplicativo e qualquer um de seus componentes ou ainda à prestação ou não de serviços de suporte.
              A Lucas de Oliveira Marques não garante que a operação deste aplicativo seja contínua e sem defeitos. Exceto pelo estabelecido neste documento
              não há outras garantias, condições ou promessas aos aplicativos, expressas ou implícitas, e todas essas garantias, condições e promessas podem
              ser excluídas de acordo com o que é permitido por lei sem prejuízo à Lucas de Oliveira Marques e seus colaboradores.<br>
              <br>I. A Lucas de Oliveira Marques não garante, declara ou assegura que o uso deste aplicativo será ininterrupto ou livre de erros e você concorda
              que a Lucas de Oliveira Marques poderá remover por períodos indefinidos ou cancelar este aplicativo a qualquer momento. <br>
              <br>II. A Lucas de Oliveira Marques não garante, declara nem assegura que este aplicativo esteja livre de perda, interrupção, ataque, vírus,
              interferência, pirataria ou outra invasão de segurança e isenta-se de qualquer responsabilidade em relação à essas questões.<br>
              <br>III. Em hipótese alguma a Lucas de Oliveira Marques, bem como seus diretores, executivos, funcionários, afiliadas, agentes, contratados ou
              licenciadores responsabilizar-se-ão por perdas ou danos causados pelo uso do aplicativo. <br>
              <br>IV. A Lucas de Oliveira Marques não se responsabiliza caso os e-mails não cheguem ao usuário por erros do site da fazenda, internet e outros.<br>
            </p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showTerm = false">Fechar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{show: showModal}" :style="{display: showModal || showTerm ? 'block' : 'none'}"></div>
    <div v-if="status.info" class="alert text-center" :class="status.color" role="alert">
      {{status.info}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => {
    return {
      loading: false,
      infoLoading: false,
      showModal: false,
      showTerm: false,
      status: {
        info: '',
        color: ''
      },
      user: {
        actived: false,
        email: '',
        password: '',
        cnpj: '',
        currentSubscriptionId: '',
        currentPlanId: '',
        lastUploadEmissions: '',
        lastBoletoUrl: '',
        totalGuides: 0,
        emissions: 0,
        name: '',
        phone: '',
        uf: '',
        city: '',
        zipcode: '',
        street: '',
        streetNumber: '',
        neighborhood: '',
        fantasia: '',
        emailToSend: '',
        passwordToSend: '',
        uid: '',
        pagarmeId: ''
      },
      customer: {}
    }
  },

  computed: {
    cnpjMask () {
      if (this.user.cnpj.length === 16) {
        return '##.##.##/####-##'
      } else if (this.user.cnpj.length === 17) {
        return '##.##.###/####-##'
      } else {
        return '##.###.###/####-##'
      }
    },
    cnpjValue () {
      if (this.user.cnpj.substring(2, 3) !== '.' && this.user.cnpj.length >= 9) {
        this.verifyMaskCnpj()
      }
      return this.user.cnpj
    }
  },

  methods: {
    verifyMaskCnpj () {
      this.user.cnpj = this.user.cnpj.substring(0, 3) + '.' + this.user.cnpj.substring(3)
    },
    async autoInfoRequest () {
      this.infoLoading = true
      const headers = {
        // 'Content-Type': 'application/json;charset=utf-8',
        // 'Access-Control-Allow-Methods': 'GET',
        // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        // 'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        Authorization: process.env.VUE_APP_RECEITA_WS_TOKEN
      }
      const url = `https://www.receitaws.com.br/v1/cnpj/${this.user.cnpj.replace(/[^a-zA-Z0-9]/g, '')}`
      if (this.user.cnpj.length > 16) {
        // await this.$http.get(`https://thingproxy.freeboard.io/fetch/${url}`, headers).then(res => {
        // await this.$http.get(url, headers).then(res => {
        await this.$http.get(`https://emissaosimples.herokuapp.com/${url}`, headers).then(res => {
        // await this.$http.get(`http://www.whateverorigin.org/get?url=${url}`, headers).then(res => {
          console.log(res)
          if (res.data.nome.length) {
            this.user.name = res.data.nome
            this.user.uf = res.data.uf
            this.user.city = res.data.municipio
            this.user.fantasia = res.data.fantasia
            this.user.phone = res.data.telefone.substring(0, 15)
            this.user.zipcode = res.data.cep
            this.user.street = res.data.logradouro
            this.user.streetNumber = res.data.numero
            this.user.neighborhood = res.data.bairro
          } else {
            this.user.name = ''
            this.user.uf = ''
            this.user.city = ''
            this.user.fantasia = ''
            this.user.phone = ''
            this.user.zipcode = ''
            this.user.street = ''
            this.user.streetNumber = ''
            this.user.neighborhood = ''
            this.status = {
              info: 'CNPJ não encontrado',
              color: 'alert-danger'
            }
            setTimeout(() => {
              this.infoLoading = false
            }, 2000)

            setTimeout(() => {
              this.status = {
                info: '',
                color: ''
              }
            }, 3000)
            return null
          }
        }).catch(err => {
          console.log(err)
          this.user.name = ''
          this.user.uf = ''
          this.user.city = ''
          this.user.fantasia = ''
          this.user.phone = ''
          this.user.zipcode = ''
          this.user.street = ''
          this.user.streetNumber = ''
          this.user.neighborhood = ''
          this.status = {
            info: 'CNPJ não encontrado',
            color: 'alert-danger'
          }
          setTimeout(() => {
            this.infoLoading = false
          }, 2000)

          setTimeout(() => {
            this.status = {
              info: '',
              color: ''
            }
          }, 3000)
          return err
        })
      }
      this.infoLoading = false
    },
    async doRegister () {
      if (this.user.cnpj.length < 16) {
        this.status = {
          info: 'CNPJ Inválido',
          color: 'alert-warning'
        }
        setTimeout(() => {
          this.status = {
            info: '',
            color: ''
          }
        }, 3000)
        return null
      }
      this.loading = true
      try {
        const res = await this.$firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        this.user.uid = res.user.uid
        this.$firebase.database().ref('users').child(res.user.uid).set(this.user).then(() => {
          window.uid = null
          this.$firebase.auth().signOut()
          this.$gtag.event('event', 'conversion', { send_to: 'AW-722129369/Ou0dCOep1_gCENmjq9gC' })
        })
      } catch (err) {
        console.log(err)
        if (err.message === 'The email address is already in use by another account.') {
          this.status = {
            info: 'Este e-mail já está sendo usado em outra conta!',
            color: 'alert-danger'
          }
        }

        setTimeout(() => {
          this.loading = false
        }, 2000)

        setTimeout(() => {
          this.status = {
            info: '',
            color: ''
          }
        }, 3000)
        this.loading = false
        return null
      }
      // try {
      //   await this.$pagarme.client.connect({ api_key: process.env.VUE_APP_PAGARME_API_KEY }).then(client => client.customers.create({
      //     external_id: this.user.uid,
      //     name: this.user.name,
      //     type: 'corporation',
      //     country: 'br',
      //     email: this.user.email,
      //     documents: [
      //       {
      //         type: 'cnpj',
      //         number: this.user.cnpj.replace(/[^a-zA-Z0-9]/g, '')
      //       }
      //     ],
      //     phone_numbers: ['+55' + this.user.phone.replace(/[^a-zA-Z0-9]/g, '')]
      //   })).then(customer => {
      //     this.$firebase.database().ref('users').child(this.user.uid).update({ pagarmeId: customer.id })
      //   })
      // } catch (err) {
      //   console.log(err.response)
      // }
      setTimeout(() => {
        this.loading = false
        this.showModal = true
        this.user = { actived: false, email: '', password: '', cnpj: '', name: '', phone: '', uf: '', city: '', fantasia: '', uid: '' }
      }, 1000)
      setTimeout(() => {
        this.loading = false
        this.showModal = true
        this.user = { actived: false, email: '', password: '', cnpj: '', name: '', phone: '', uf: '', city: '', fantasia: '', uid: '' }
      }, 1000)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.card{
  overflow: hidden auto;
}
.form-register {
  background: url('../../assets/images/login-bg.jpg')no-repeat center right / cover;
  height: 100vh;
  display: block;
  justify-content: left;
  align-items: center;
  .right-side{
    display: flex;
    padding: 50px 0 90px;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    color: white;
    text-align: center;
    .title{
      font-size: 1.6rem;
      font-weight: 700;
    }
    .subtitle{
      font-weight: 300;
      margin: 20px 80px;
      font-size: 20px;
    }
    img{
      margin: 0 auto;
      width: 213px;
      height: 100px;
    }
  }
  .card {
    height: 100vh;
    border: none;
    padding-top: 0;
    // -webkit-box-shadow: 0px 0px 18px 8px rgba(0,0,0,0.1);
    // box-shadow: 0px 0px 18px 8px rgba(0,0,0,0.1);
    // border-bottom-left-radius: 0 !important;
    // border-top-left-radius: 0 !important;
    border-radius: 0px !important;
    .card-header {
      background-color: white;
      border: none;
      border-radius: 15px;
    }
    h3{
      margin: 20px 0 30px;
      text-align: left;
      font-weight: 700 !important;
    }
    h4{
      font-weight: 700 !important;
      font-size: 24px;
      margin-bottom: 32px;
      span{
        font-size: 26px;
        font-weight: 800 !important;
      }
    }
    h5{
      font-weight: 700;
    }
    p {
      font-weight: 500;
      margin-bottom: 0;
    }
    .btn-link {
      margin: 30px 3px 0;
      display: inline-block;
    }
    .input-group-text{
      position: absolute;
      background-color: var(--featured) !important;
      color: white;
      right: 2px;
      bottom: 3px;
      top: 3px;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      z-index: 999;
    }
  }
}
.modal-dialog{
  max-width: 550px !important;
}

.modal-content{
  box-shadow: 0px 0px 8px 6px rgba(0,0,0,0.1);

  .modal-header, .modal-footer{
    border: none !important;
  }

  .modal-body{
    padding-top: 0;
  }

  .nav-tabs {
      border-bottom: none !important;
      cursor: pointer;
  }

  .nav-tabs .nav-item {
    width: 50%;
    margin-bottom: 0px;
    border: none !important;
    text-align: center;
    color: var(--featured);
    font-weight: 500;

    &.active{
      border-bottom: var(--featured) solid 5px !important;
    }
  }
  h4, h5{
    font-weight: 700;
  }
  h5{
    font-size: 15px;
  }
  .form-group{
    margin: 7px 0;
  }
}
.check-terms{
  p{
    font-size: 14px;
    font-weight: 400 !important;
    a{
      margin-left: 4px;
      color: #2687e9 !important;
      font-weight: 400;
      cursor: pointer !important;
      &:hover{
          text-decoration: underline !important;
      }
    }
  }
}
.custom-checkbox{
  margin: 7px 3px 8px 17px;
}
.custom-control-label::before{
  height: 1.2rem !important;
  width: 1.2rem !important;
  top: .15rem;
  left: -1.60rem;
  box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.15) !important;
  border-color: white !important;
  border-radius: 5px;
}
.custom-control-label::after{
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
/* width */
::-webkit-scrollbar {
width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
background: #f1f1f1;
border-radius: 3px;
}

/* Handle */
::-webkit-scrollbar-thumb {
background: var(--featured);
border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
background: var(--featured-dark);
}
</style>
