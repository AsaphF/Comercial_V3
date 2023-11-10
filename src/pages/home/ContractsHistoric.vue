<template>
  <div class="modal-main">
    <div class="modal-body">
      <div class="timeline">
        <div class="box">
          <div class="container">
            <template v-if="origin === 'whats'">
              <div class="lines">
              <!-- <div class="dot"></div>
              <div class="line"></div> -->
              <div v-for="(i) in historic" :key="i">
                <div class="dot"></div>
                <div class="line"></div>
              </div>
              </div>
              <div class="cards">
                <div v-for="(data, index) in historic" :key="index" class="card">
                  <h4>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.291C21 15.83 16.952 19.473 12 19.473C11.359 19.473 10.735 19.41 10.131 19.294" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.599 17.826C4.42 16.336 3 13.974 3 11.291" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.59901 17.826C6.59801 18.68 6.60001 19.832 6.60001 21.041" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 11.291C3 6.75199 7.048 3.10999 12 3.10999C16.952 3.10999 21 6.75299 21 11.292" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.13 19.29L6.60001 21.04" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12.1768 11.3232C12.2744 11.4208 12.2744 11.5791 12.1768 11.6767C12.0792 11.7744 11.9209 11.7744 11.8233 11.6767C11.7256 11.5791 11.7256 11.4208 11.8233 11.3232C11.9209 11.2256 12.0792 11.2256 12.1768 11.3232" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.1768 11.3232C16.2744 11.4208 16.2744 11.5791 16.1768 11.6767C16.0792 11.7744 15.9209 11.7744 15.8233 11.6767C15.7256 11.5791 15.7256 11.4208 15.8233 11.3232C15.9209 11.2256 16.0792 11.2256 16.1768 11.3232" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.17678 11.3232C8.27441 11.4208 8.27441 11.5791 8.17678 11.6767C8.07915 11.7744 7.92085 11.7744 7.82322 11.6767C7.72559 11.5791 7.72559 11.4208 7.82322 11.3232C7.92085 11.2256 8.07915 11.2256 8.17678 11.3232" stroke="#13cf9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  <span>{{ data.userName}}</span></h4>
                  <p><strong>Enviado para:</strong> {{ data.userPhone }}</p>
                  <p><strong>Título do modelo enviado:</strong> {{ data.modelTitle.slice(0, 81) }}...</p>
                  <p class="time">{{moment(data.date).format('DD/MM/YYYY HH:mm:ss')}}</p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="lines">
              <!-- <div class="dot"></div>
              <div class="line"></div> -->
              <div v-for="(i) in historic" :key="i">
                <div class="dot"></div>
                <div class="line" style="height:145px;"></div>
              </div>
              </div>
              <div class="cards">
                <div v-for="(saved, index) in historic" :key="index" class="card-mail">
                  <h4>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.001 7H18.646C19.946 7 21 8.054 21 9.355V9.355C21 10.136 20.613 10.866 19.967 11.304C18.628 12.212 16.229 13.838 14.243 15.184C12.888 16.103 11.111 16.102 9.756 15.184C7.83 13.879 5.388 12.223 4.03 11.303C3.384 10.864 3 10.136 3 9.355V9.355C3 8.054 4.054 7 5.355 7H7" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 9.355V18C3 19.657 4.343 21 6 21H18C19.657 21 21 19.657 21 18V9.355" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.555 6.222L11.61 8.167L10.443 7" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.274 7.813L7.938 8.682L8.082 9.763C8.162 10.363 8.633 10.835 9.233 10.915L10.317 11.06L11.185 11.724C11.665 12.091 12.332 12.091 12.812 11.724L13.681 11.06H13.68L14.762 10.916C15.362 10.836 15.834 10.365 15.914 9.765L16.059 8.681C16.059 8.682 16.395 8.242 16.723 7.813C17.09 7.333 17.09 6.666 16.723 6.186L16.059 5.317L15.915 4.236C15.835 3.636 15.364 3.164 14.764 3.084L13.68 2.939L12.812 2.275C12.332 1.908 11.665 1.908 11.185 2.275L10.316 2.939H10.317L9.234 3.083C8.634 3.163 8.162 3.634 8.082 4.234L7.938 5.318C7.938 5.317 7.602 5.757 7.274 6.186C6.907 6.667 6.907 7.333 7.274 7.813Z" stroke="#13CF9A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ saved.userName}}</span>
                  </h4>
                  <p><strong>Template do e-mail:</strong> {{ saved.template }}</p>
                  <p><strong>Título do template:</strong> {{ saved.templateTitle }}</p>
                  <p><strong>Conteúdo</strong> {{ saved.mailBody.slice(0, 90) }}...</p>
                  <p class="time">{{moment(saved.date).format('DD/MM/YYYY HH:mm:ss')}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['historic', 'origin'],
  data: () => ({
    tab: 'see',
    selectedCustomer: {},
    inbox: {},
    showModal: false,
    loading: false,
    status: {
      info: '',
      color: ''
    }
  }),
  methods: {
    closeModal () {
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
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c1c1c1;
}

.modal-main{
  width: 100% !important;

  .modal-body {
    height: 100%;
    padding: 10px !important;
    background-color: #E9F4F2;

    .timeline{
      background-color: #E9F4F2;
      width:100%;
      min-height:570px;
      border-radius: 10px;
      h5{
        font-size: 14px;
      }
      h4{
        font-weight: 700;
        font-size: 19px;
      }
      h3{
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        color: #FFFFFF;
        margin-left:66px;
        margin-top:40px;
      }
      label{
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */
        margin-left:66px;
        margin-top:10px;
        color: #FFFFFF;
      }
      .box{
        width:100%;
        background-color: #E9F4F2;
        margin-top:80px;
        .container{
          width:100%;
          height:357px;
          display:flex;

          .lines{
            margin-left: 25px;
            margin-right: 30px;
            margin-top:6px;
            .dot{
              width:14px;
              height:14px;
              background: rgba(19, 207, 154, .7);
              border-radius:7px;
            }
            .line{
              height:115px;
              width:2px;
              background: rgba(19, 207, 154, .18);
              margin-left:6px;
            }
          }
          .cards{
            margin-left:12px;
            transform:translateY(-50px);
            .card{
              width:800px;
              height:120px;
              padding-top:15px;
              background: #FFFFFF;
              box-shadow:0 2px 2px 0  #eeeeee40;
              border-radius: 10px;
              box-shadow: 5px 5px 5px 1px #DDF1EE;
              margin-bottom:10px;
              &.mid{
                height:71px;
              }
              h4{
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                line-height: 19px;
                margin-left:25px;
                margin-bottom:5px;
                color: #2B2862;
                span{
                  font-size: 13px;
                  background: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  color: white;
                  padding: 3px 9px;
                  margin-bottom: 5px;
                }
                i{
                  font-size: 22px;
                  color: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  margin-right: 6px;
                  transform: translate(0, 3px);
                }
                svg{
                  font-size: 22px;
                  border-radius: 4px;
                  margin-right: 6px;
                  // transform: translate(0, 3px);
                }
              }
              p{
                font-weight: 300;
                font-size: 12.8px;
                line-height: 22px;
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                margin-left:25px;
                margin-bottom: 0;
              }
              .time{
                font-weight: 400;
                color: #9496a1;
                font-size: 12px;
                margin-bottom: 0;
              }
            }
            .card-mail {
              width:800px;
              height:145px;
              padding-top:15px;
              background: #FFFFFF;
              box-shadow:0 2px 2px 0  #eeeeee40;
              border-radius: 10px;
              box-shadow: 5px 5px 5px 1px #DDF1EE;
              margin-bottom:10px;
              &.mid{
                height:71px;
              }
              h4{
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                line-height: 19px;
                margin-left:25px;
                margin-bottom:5px;
                color: #2B2862;
                span{
                  font-size: 13px;
                  background: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  color: white;
                  padding: 3px 9px;
                  margin-bottom: 5px;
                }
                i{
                  font-size: 22px;
                  color: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  margin-right: 6px;
                  transform: translate(0, 3px);
                }
                svg{
                  font-size: 22px;
                  border-radius: 4px;
                  margin-right: 6px;
                  // transform: translate(0, 3px);
                }
              }
              p{
                font-weight: 300;
                font-size: 12.8px;
                line-height: 22px;
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                margin-left:25px;
                margin-bottom: 0;
              }
              .time{
                font-weight: 400;
                color: #9496a1;
                font-size: 12px;
                margin-bottom: 0;
              }
            }
          }
          .lines-proposal {
            margin-left: 25px;
            margin-right: 30px;
            margin-top:6px;
            .dot{
              width:14px;
              height:14px;
              background: rgba(19, 207, 154, .7);
              border-radius:7px;
            }
            .line{
              height:115px;
              width:2px;
              background: rgba(19, 207, 154, .18);
              margin-left:6px;
            }
          }
          .cards-proposal {
            margin-left:12px;
            transform:translateY(-50px);
            .card-proposal {
              width:800px;
              height:145px;
              padding-top:15px;
              background: #FFFFFF;
              box-shadow:0 2px 2px 0  #eeeeee40;
              border-radius: 10px;
              box-shadow: 5px 5px 5px 1px #DDF1EE;
              margin-bottom:10px;
              &.mid{
                height:71px;
              }
              h4{
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                line-height: 19px;
                margin-left:25px;
                margin-bottom:5px;
                color: #2B2862;
                span{
                  font-size: 13px;
                  background: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  color: white;
                  padding: 3px 9px;
                  margin-bottom: 5px;
                }
                i{
                  font-size: 22px;
                  color: rgba(19, 207, 154, .7);
                  border-radius: 4px;
                  margin-right: 6px;
                  transform: translate(0, 3px);
                }
                svg{
                  font-size: 22px;
                  border-radius: 4px;
                  margin-right: 6px;
                  // transform: translate(0, 3px);
                }
              }
              p{
                font-weight: 300;
                font-size: 12.8px;
                line-height: 22px;
                color: rgb(64, 66, 82, 0.9);
                font-weight: 500;
                margin-left:25px;
                margin-bottom: 0;
              }
              .time{
                font-weight: 400;
                color: #9496a1;
                font-size: 12px;
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}

</style>
