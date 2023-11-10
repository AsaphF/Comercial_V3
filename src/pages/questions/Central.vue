<template>
    <div class="container-fluid">
      <div class="row">
        <layout-navigation/>
        <div class="col-lg-12 col-content">
         <div class="content">
            <div class="container-fluid">
              <div class="row info-container header-page-container">
                <div>
                  <h4 class="title">
                    Perguntas Frequentes
                  </h4>
                </div>
              </div>
            </div>
            <div class="card card-container">
              <div class="container-fluid text-center">
                <div class="row p-2 content-container">
                  <div class="col-5 questions-container">
                    <div class="header-container">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9997 6.998H3.99675C3.44432 6.99781 2.99654 6.55002 2.99634 5.99759V3.99675C2.99654 3.44432 3.44432 2.99654 3.99675 2.99634H10.9997" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24728 14.5013H3.74665C3.33233 14.5011 2.99649 14.1653 2.99634 13.7509V12.2503C2.99649 11.836 3.33233 11.5001 3.74665 11.5H5.24728C5.6616 11.5001 5.99744 11.836 5.99759 12.2503V13.7509C5.99744 14.1653 5.6616 14.5011 5.24728 14.5013Z" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.22095 13.0005H21.0039" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24728 21.0039H3.74665C3.33233 21.0038 2.99649 20.6679 2.99634 20.2536V18.753C2.99649 18.3387 3.33233 18.0028 3.74665 18.0027H5.24728C5.6616 18.0028 5.99744 18.3387 5.99759 18.753V20.2536C5.99744 20.6679 5.6616 21.0038 5.24728 21.0039Z" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.22095 19.5031H21.0039" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="17.0022" cy="4.9971" r="3.00125" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.0038 8.99888L19.1238 7.1189" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <h5 class="header-title">Perguntas</h5>
                    </div>
                    <div class="search-questions-container">
                      <button class="btn-search">
                        <i class="fas fa-search" style="color: #777986;"></i>
                        <input v-model="filterSearchBar" type="text" class="input-search" placeholder="Digite uma palavra-chave da pergunta...">
                      </button>
                    </div>
                    <div class="filter-container">
                      <h6>Filtrar por Tags</h6>
                      <div class="buttons-container">
                        <div :key="i" v-for="(tag, i) in question.tags" @click="activateFilterTag(tag)" :class="[!tag.marked ? 'inner-tag' : 'inner-tag activated']">
                          <div v-if="!tag.marked" v-html="tag.icon"></div>
                          <div v-else v-html="tag.icon.replaceAll('#1BA38E', '#ffffff')"></div>
                          <small>{{tag.title}}</small>
                        </div>
                      </div>
                    </div>
                    <div v-if="emptyList" class="list-container">
                      <template v-if="filterOn">
                        <div v-for="question in this.listOfQuestionsFiltered" :key="question.filteredId">
                          <div  @click="editQuestion(question)" :class="[question.edited ? 'question-container-activated' : 'question-container']">
                            <div class="question-header">
                              <div :key="i" v-for="(tag, key, i) in question.tags" class="inner-tag">
                                <template v-if="tag">
                                  <div v-html="tag.icon" class="svg"></div>
                                  <small>{{tag.title}}</small>
                                </template>
                              </div>
                            </div>
                            <div class="question-main">
                              <p class="question-title">{{ question.questionTitle }}</p>
                            </div>
                            <div class="question-footer">
                              <small>Ultima Modificação: {{ moment(question.updatedDate).format('DD/MM/YYYY') }}</small>
                              <div class="container-icons">
                                <div class="icon-visualization">
                                  <img src="../../assets/images/Eye_Show_Visible.svg" alt="visualization">
                                  <small v-if="question.views.value" >{{ question.views.value }}</small>
                                  <small v-else >0</small>
                                </div>
                                <div class="icon-like">
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 14.25H3.792C3.35475 14.25 3 13.8953 3 13.458V7.917C3 7.47975 3.35475 7.125 3.792 7.125H5.208C5.64525 7.125 6 7.47975 6 7.917V13.458C6 13.8953 5.64525 14.25 5.208 14.25V14.25Z" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 7.92917L8.73675 4.36592C9.246 3.70217 10.2405 3.68567 10.7722 4.33142V4.33142C10.971 4.57217 11.079 4.87517 11.079 5.18717V7.64042H13.401C13.8518 7.64042 14.2725 7.86542 14.523 8.23967L14.7697 8.60792C14.991 8.93867 15.0555 9.35042 14.9453 9.73217L13.926 13.2737C13.7595 13.8519 13.2307 14.2502 12.6292 14.2502H7.9125C7.5375 14.2502 7.179 14.0942 6.924 13.8197L6 12.8252" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <small v-if="question.positiveFeedback" >{{ question.positiveFeedback.total }}</small>
                                  <small v-else >0</small>
                                </div>
                                <div class="icon-deslike">
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 3.75L3.792 3.75C3.35475 3.75 3 4.10475 3 4.542L3 10.083C3 10.5203 3.35475 10.875 3.792 10.875L5.208 10.875C5.64525 10.875 6 10.5203 6 10.083L6 4.542C6 4.10475 5.64525 3.75 5.208 3.75V3.75Z" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 10.0711L8.73675 13.6343C9.246 14.2981 10.2405 14.3146 10.7722 13.6688V13.6688C10.971 13.4281 11.079 13.1251 11.079 12.8131L11.079 10.3598L13.401 10.3598C13.8518 10.3598 14.2725 10.1348 14.523 9.76057L14.7698 9.39232C14.991 9.06157 15.0555 8.64982 14.9453 8.26807L13.926 4.72657C13.7595 4.14832 13.2308 3.75007 12.6293 3.75007L7.9125 3.75007C7.5375 3.75007 7.179 3.90607 6.924 4.18057L6 5.17507" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <small v-if="question.negativeFeedback">{{ question.negativeFeedback.total }}</small>
                                  <small v-else>0</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div v-for="question in this.listOfQuestions" :key="question.id">
                          <div  @click="editQuestion(question)" :class="[question.edited ? 'question-container-activated' : 'question-container']">
                            <div class="question-header">
                              <div :key="i" v-for="(tag, key, i) in question.tags" class="inner-tag">
                                <template v-if="tag">
                                  <div v-html="tag.icon" class="svg"></div>
                                  <small>{{tag.title}}</small>
                                </template>
                              </div>
                            </div>
                            <div class="question-main">
                              <p class="question-title">{{ question.questionTitle }}</p>
                            </div>
                            <div class="question-footer">
                              <small>Ultima Modificação: {{ moment(question.updatedDate).format('DD/MM/YYYY') }}</small>
                              <div class="container-icons">
                                <div class="icon-visualization">
                                  <img src="../../assets/images/Eye_Show_Visible.svg" alt="visualization">
                                  <small v-if="question.views.value" >{{ question.views.value }}</small>
                                  <small v-else >0</small>
                                </div>
                                <div class="icon-like">
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 14.25H3.792C3.35475 14.25 3 13.8953 3 13.458V7.917C3 7.47975 3.35475 7.125 3.792 7.125H5.208C5.64525 7.125 6 7.47975 6 7.917V13.458C6 13.8953 5.64525 14.25 5.208 14.25V14.25Z" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 7.92917L8.73675 4.36592C9.246 3.70217 10.2405 3.68567 10.7722 4.33142V4.33142C10.971 4.57217 11.079 4.87517 11.079 5.18717V7.64042H13.401C13.8518 7.64042 14.2725 7.86542 14.523 8.23967L14.7697 8.60792C14.991 8.93867 15.0555 9.35042 14.9453 9.73217L13.926 13.2737C13.7595 13.8519 13.2307 14.2502 12.6292 14.2502H7.9125C7.5375 14.2502 7.179 14.0942 6.924 13.8197L6 12.8252" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <small v-if="question.positiveFeedback" >{{ question.positiveFeedback.total }}</small>
                                  <small v-else >0</small>
                                </div>
                                <div class="icon-deslike">
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 3.75L3.792 3.75C3.35475 3.75 3 4.10475 3 4.542L3 10.083C3 10.5203 3.35475 10.875 3.792 10.875L5.208 10.875C5.64525 10.875 6 10.5203 6 10.083L6 4.542C6 4.10475 5.64525 3.75 5.208 3.75V3.75Z" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 10.0711L8.73675 13.6343C9.246 14.2981 10.2405 14.3146 10.7722 13.6688V13.6688C10.971 13.4281 11.079 13.1251 11.079 12.8131L11.079 10.3598L13.401 10.3598C13.8518 10.3598 14.2725 10.1348 14.523 9.76057L14.7698 9.39232C14.991 9.06157 15.0555 8.64982 14.9453 8.26807L13.926 4.72657C13.7595 4.14832 13.2308 3.75007 12.6293 3.75007L7.9125 3.75007C7.5375 3.75007 7.179 3.90607 6.924 4.18057L6 5.17507" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <small v-if="question.negativeFeedback">{{ question.negativeFeedback.total }}</small>
                                  <small v-else>0</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div v-else class="list-content-alternative">
                      <img class="img-alternative" src="../../assets/images/empty-list2.png" alt="">
                    </div>
                    <div class="search-results">
                      <small v-if="filterOn">{{ this.listOfQuestionsFiltered.length }} resultados</small>
                      <small v-else>{{ this.listOfQuestions.length }} resultados</small>
                    </div>
                  </div>
                  <div class="col-7 editor-container">
                    <div class="header-container">
                      <div class="header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 13.067V18.972C21 20.092 20.099 21 18.987 21H5.013C3.901 21 3 20.092 3 18.972V6.028C3 4.908 3.901 4 5.013 4H12" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.828 17.172L11.559 16.239C11.735 16.195 11.895 16.104 12.024 15.976L20.414 7.58599C21.195 6.80499 21.195 5.53899 20.414 4.75799L20.242 4.58599C19.461 3.80499 18.195 3.80499 17.414 4.58599L9.024 12.976C8.896 13.104 8.805 13.265 8.761 13.441L7.828 17.172" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.83 6.16992L18.83 9.16992" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.546 16.2419C11.56 16.1359 11.578 16.0309 11.578 15.9209C11.578 14.5399 10.459 13.4209 9.07796 13.4209C8.96796 13.4209 8.86296 13.4399 8.75696 13.4529" stroke="#404252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h5 class="header-title">Editor</h5>
                      </div>
                    </div>
                    <div v-if="initialEditor" class="editor">
                      <div class="editor-content">
                        <p>Selecione uma pergunta</p>
                        <small>ou</small>
                        <button @click="openEditor" class="btn btn-confirm"> + Nova Pergunta</button>
                      </div>
                    </div>
                    <template v-else>
                      <div class="editor-activate">
                      <form>
                        <div class="editor-content">
                          <div class="editor-header">
                              <p class="title-name">Título</p>
                              <div class="title-container">
                                <i v-if="requireTitle" class="fas fa-exclamation-triangle warning-alert"></i>
                                <input @click="requireTitle = false" type="text" maxlength="90" v-model="question.questionTitle" class="input-title" placeholder="Crie um título para a pergunta" >
                                <small>{{question.questionTitle.length}}/90</small>
                              </div>
                              <p class="awnser-name">Resposta</p>
                              <div class="awnser-container">
                                <textarea type="text" v-model="question.questionAwnser" class="input-awnser" placeholder="Crie uma resposta para a pergunta"></textarea>
                                <small>{{question.questionAwnser.length}} Caracteres</small>
                              </div>
                            <p class="categories-name">Categorias</p>
                            <div class="categories-container">
                                <div :key="i" v-for="(tag, i) in question.tags" @click="chooseCategorie(tag)" :class="[!tag.activated ? 'categorie' : 'categorie activated']">
                                  <template v-if="tag.icon">
                                    <div v-if="!tag.activated" v-html="tag.icon"></div>
                                    <div v-else v-html="tag.icon.replaceAll('#1BA38E', '#ffffff')"></div>
                                    <small>{{tag.title}}</small>
                                  </template>
                                </div>
                            </div>
                            <i v-if="requireTag" class="fas fa-exclamation-triangle warning-alert-tag"></i>
                          </div>
                        </div>
                      </form>
                      <div class="buttons-footer">
                          <div class="btn-footer-container" style="display: flex; justify-content: center; align-items: center;">
                            <button v-if="changeButton && this.loggedAffiliate.adm" class="btn btn-sm btn-danger w-100" @click="removeQuestion" style="margin-right: 10px;">Remover</button>
                            <button class="btn btn-sm btn-close w-100" @click='closeEditor'>Fechar</button>
                            <button v-if="!changeButton" class="btn btn-sm btn-save w-100" @click="saveNewQuestion()">Salvar</button>
                            <div v-else>
                              <button class="btn btn-sm btn-save w-100" @click="updateQuestion">Atualizar</button>
                            </div>
                          </div>
                          <small v-if="showConfirmation" class="confirmation-alert">Pergunta salva com sucesso <i class="fas fa-check"></i></small>
                          <small v-if="requireTitle" class="warning-alert">É preciso inserir um título!</small>
                          <small v-if="requireTag" class="warning-alert">É preciso selecionar uma categoria!</small>
                          <small v-if="showUpdate" class="confirmation-alert">Pergunta atualizado com sucesso<i class="fas fa-check"></i></small>
                          <small v-if="showRemovedConfirmation" class="warning-alert">Pergunta removida com sucesso!</small>
                        </div>
                      </div>
                      <div class="editor-footer">
                        <div class="question-info-container">
                          <p class="title-info">Criado em:</p>
                          <p class="data">{{ createdDateFormat }}</p>
                        </div>
                        <div class="updated-info-container">
                          <p class="title-info">Atualizado em:</p>
                          <p class="data">{{ updatedDateFormat }}</p>
                        </div>
                        <div class="views-info-container">
                          <p class="title-info">Visualizações</p>
                          <small v-if="question.views.value" >{{ question.views.value }}</small>
                          <small v-else style="margin-left: 45px;">0</small>
                        </div>
                        <div class="evaluation-info-container">
                          <p class="title-info">Avaliação</p>
                          <div class="container-icons">
                              <div class="icon-like">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 14.25H3.792C3.35475 14.25 3 13.8953 3 13.458V7.917C3 7.47975 3.35475 7.125 3.792 7.125H5.208C5.64525 7.125 6 7.47975 6 7.917V13.458C6 13.8953 5.64525 14.25 5.208 14.25V14.25Z" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M6 7.92917L8.73675 4.36592C9.246 3.70217 10.2405 3.68567 10.7722 4.33142V4.33142C10.971 4.57217 11.079 4.87517 11.079 5.18717V7.64042H13.401C13.8518 7.64042 14.2725 7.86542 14.523 8.23967L14.7697 8.60792C14.991 8.93867 15.0555 9.35042 14.9453 9.73217L13.926 13.2737C13.7595 13.8519 13.2307 14.2502 12.6292 14.2502H7.9125C7.5375 14.2502 7.179 14.0942 6.924 13.8197L6 12.8252" stroke="#1BA38E" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <small v-if="question.positiveFeedback" >{{ question.positiveFeedback.total }}</small>
                                <small v-else >0</small>
                              </div>
                              <div class="icon-deslike">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.208 3.75L3.792 3.75C3.35475 3.75 3 4.10475 3 4.542L3 10.083C3 10.5203 3.35475 10.875 3.792 10.875L5.208 10.875C5.64525 10.875 6 10.5203 6 10.083L6 4.542C6 4.10475 5.64525 3.75 5.208 3.75V3.75Z" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M6 10.0711L8.73675 13.6343C9.246 14.2981 10.2405 14.3146 10.7722 13.6688V13.6688C10.971 13.4281 11.079 13.1251 11.079 12.8131L11.079 10.3598L13.401 10.3598C13.8518 10.3598 14.2725 10.1348 14.523 9.76057L14.7698 9.39232C14.991 9.06157 15.0555 8.64982 14.9453 8.26807L13.926 4.72657C13.7595 4.14832 13.2308 3.75007 12.6293 3.75007L7.9125 3.75007C7.5375 3.75007 7.179 3.90607 6.924 4.18057L6 5.17507" stroke="#FF9393" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <small v-if="question.negativeFeedback">{{ question.negativeFeedback.total }}</small>
                                <small v-else>0</small>
                              </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
         </div>
        </div>
      </div>
    </div>
</template>

<script>
import LayoutNavigation from '../../components/layout/LayoutNavigation'
import moment from 'moment'
// import BaseSpinner from '../../components/global/BaseSpinner'

export default {
  name: 'Home',
  components: {
    LayoutNavigation
    // BaseSpinner
  },
  data: () => ({
    // Inicialização das lista de feedbacks, perguntas e afiliados
    listOfFeedbacks: [],
    listOfQuestions: [],
    listOfQuestionsFiltered: [],
    initialEditor: true,
    loggedAffiliate: {},
    // Criação de uma nova pergunta
    question: {
      tags: [
        { title: 'Primeiros Passos', activated: false, marked: false, id: 0, icon: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.62666 7.37332L3.91333 12.0867" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.422 8.66599L2.11333 8.12066C1.85933 8.06066 1.77 7.74532 1.954 7.56066L3.79 5.72466C3.91333 5.60132 4.08067 5.53066 4.256 5.52932L6.326 5.51132" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2527 5.98334L13.7913 3.39134C13.938 2.68601 13.314 2.06201 12.6087 2.20867L10.0167 2.74734C9.25334 2.90601 8.55334 3.28401 8.00267 3.83534L5.87601 5.96134C5.06467 6.77267 4.53667 7.82467 4.37001 8.96001L4.36267 9.00867C4.25734 9.73334 4.50001 10.4647 5.01734 10.9827V10.9827C5.53467 11.5 6.26667 11.7427 6.99134 11.6367L7.04001 11.6293C8.17534 11.4633 9.22734 10.9347 10.0387 10.1233L12.1647 7.99734C12.716 7.44667 13.094 6.74667 13.2527 5.98334V5.98334Z" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.93332 3.14267C10.474 4.19334 11.8067 5.526 12.8573 7.06667" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.33334 11.578L7.87868 13.8866C7.93868 14.1406 8.25401 14.23 8.43868 14.046L10.2747 12.21C10.398 12.0866 10.4687 11.9193 10.47 11.744L10.488 9.67398" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
        { title: 'Perguntas Frequentes', activated: false, marked: false, id: 1, icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.45645 6.45645C6.61447 5.77541 7.23476 5.30321 7.93329 5.33221C8.71506 5.2889 9.38526 5.88463 9.43391 6.66609C9.43391 7.66912 7.99998 7.99998 7.99998 8.66693" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.08347 10.5012C8.08341 10.5472 8.04608 10.5844 8.00006 10.5844C7.95405 10.5844 7.91675 10.5471 7.91673 10.5011C7.91671 10.4551 7.95398 10.4177 7.99999 10.4177C8.02214 10.4176 8.04339 10.4264 8.05905 10.4421C8.07471 10.4578 8.08349 10.479 8.08347 10.5012" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.0856 11.4403C1.29686 8.88712 1.75654 5.39023 4.14434 3.3861C6.53214 1.38196 10.0558 1.53558 12.2601 3.73991C14.4644 5.94424 14.618 9.46786 12.6139 11.8557C10.6098 14.2435 7.11288 14.7031 4.55973 12.9144L2.66444 13.3356L3.0856 11.4403Z" stroke="#1BA38E" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
        { title: 'Guia de Das', activated: false, marked: false, id: 2, icon: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 0C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10C9.44687 5 9 4.55313 9 4V0H4ZM10 0V4H14L10 0ZM4 2.5C4 2.225 4.225 2 4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM8 6.75C8.275 6.75 8.5 6.975 8.5 7.25V7.79063C8.76562 7.82813 9.02188 7.8875 9.25313 7.95C9.51875 8.02187 9.67812 8.29375 9.60625 8.5625C9.53437 8.83125 9.2625 8.9875 8.99375 8.91562C8.64688 8.82187 8.30625 8.75313 7.99062 8.75C7.72812 8.74687 7.44688 8.80625 7.25313 8.92188C7.075 9.02813 7 9.15 7 9.32187C7 9.4375 7.04063 9.525 7.22813 9.6375C7.44375 9.76562 7.74687 9.85937 8.14062 9.97812L8.15625 9.98125C8.50938 10.0875 8.94688 10.2188 9.29063 10.4375C9.66875 10.675 9.99062 11.0531 10 11.6313C10.0094 12.2344 9.7 12.6719 9.28438 12.9312C9.04375 13.0812 8.77187 13.1687.5 13.2156V13.75C8.5 14.025 8.275 14.25 8 14.25C7.725 14.25 7.5 14.025 7.5 13.75V13.1938C7.15 13.1281 6.82188 13.0156 6.53438 12.9156C6.46875 12.8937 6.40312 12.8719 6.34062 12.85C6.07812 12.7625 5.9375 12.4781 6.025 12.2188C6.1125 11.9594 6.39687 11.8156 6.65625 11.9031C6.73438 11.9281 6.80625 11.9531 6.87813 11.9781C7.30313 12.1219 7.64687 12.2406 8.0125 12.25C8.29687 12.2594 8.57188 12.1969 8.75313 12.0844C8.9125 11.9844 9 11.8563 8.99687 11.6469C8.99375 11.5031 8.94062 11.4031 8.75625 11.2844C8.54375 11.15 8.24062 11.0531 7.85 10.9344L7.8 10.9187C7.45625 10.8156 7.04063 10.6906 6.7125 10.4906C6.3375 10.2656 6.00625 9.9 6.00313 9.325C6 8.71875 6.34062 8.3 6.74687 8.05937C6.98125 7.92187 7.24062 7.83437 7.5 7.7875V7.25C7.5 6.975 7.725 6.75 8 6.75Z" fill="#1BA38E"/></svg>' },
        { title: 'Parcelamentos', activated: false, marked: false, id: 3, icon: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0V4H14L10 0Z" fill="#1BA38E"/><path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM6.36906 12.4322C6.36906 12.8384 6.03969 13.1675 5.63375 13.1675H5.47281C5.06656 13.1675 4.7375 12.8381 4.7375 12.4322V8.22625C4.7375 7.82 5.06687 7.49094 5.47281 7.49094H5.63375C6.04 7.49094 6.36906 7.82031 6.36906 8.22625V12.4322ZM6.5 5H4.5C4.225 5 4 4.775 4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5ZM6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3ZM8.82969 12.4303C8.82969 12.8366 8.50031 13.1656 8.09438 13.1656H7.93344C7.52719 13.1656 7.19813 12.8362 7.19813 12.4303V8.22438C7.19813 7.81813 7.5275 7.48906 7.93344 7.48906H8.09438C8.50063 7.48906 8.82969 7.81844 8.82969 8.22438V12.4303ZM11.2903 12.4322C11.2903 12.8384 10.9609 13.1675 10.555 13.1675H10.3941C9.98781 13.1675 9.65875 12.8381 9.65875 12.4322V8.22625C9.65875 7.82 9.98813 7.49094 10.3941 7.49094H10.555C10.9613 7.49094 11.2903 7.82031 11.2903 8.22625V12.4322Z" fill="#1BA38E"/></svg>' },
        { title: 'Certidões e Rel.', activated: false, marked: false, id: 4, icon: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0V4H14L10 0Z" fill="#1BA38E"/><path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM10.9141 10.9638C10.9894 11.0378 11.0197 11.1459 10.9919 11.2481C10.9641 11.3503 10.8838 11.4303 10.7816 11.4559L10.0222 11.6478L10.2347 12.4009C10.2638 12.5031 10.2347 12.6122 10.1606 12.6866C10.0866 12.7606 9.97719 12.7897 9.875 12.7606L9.12187 12.5481L8.93 13.3075C8.90313 13.4097 8.82438 13.4897 8.72219 13.5178C8.62 13.5456 8.51187 13.5153 8.43781 13.44L7.89125 12.8788L7.34469 13.44C7.27063 13.5153 7.1625 13.5456 7.06031 13.5178C6.95812 13.49 6.87813 13.4097 6.8525 13.3075L6.66062 12.5481L5.9075 12.7606C5.80531 12.7897 5.69625 12.7606 5.62188 12.6866C5.54781 12.6125 5.51875 12.5031 5.54781 12.4009L5.76031 11.6478L5.00094 11.4559C4.89875 11.4291 4.8175 11.3503 4.79063 11.2481C4.76375 11.1459 4.79313 11.0369 4.86969 10.9638L5.43094 10.4172L4.86969 9.87062C4.79313 9.79781 4.76281 9.68969 4.79063 9.5875C4.81844 9.48531 4.89875 9.40531 5.00094 9.37969L5.76031 9.18656L5.54781 8.43344C5.51875 8.33125 5.54781 8.22219 5.62188 8.14781C5.69594 8.07375 5.80531 8.04469 5.9075 8.07375L6.66062 8.28625L6.8525 7.52688C6.87937 7.42469 6.95812 7.34344 7.06031 7.31656C7.1625 7.28969 7.27156 7.31906 7.34469 7.39563L7.89125 7.95688L8.43781 7.39563C8.51062 7.31906 8.61875 7.28875 8.72094 7.31656C8.82313 7.34438 8.90313 7.42469 8.92875 7.52688L9.12187 8.28625L9.875 8.07375C9.97719 8.04469 10.0863 8.07375 10.1606 8.14781C10.2347 8.22188 10.2638 8.33125 10.2347 8.43344L10.0222 9.18656L10.7816 9.37844C10.8838 9.40531 10.9637 9.48406 10.9919 9.58625C11.0197 9.68844 10.9894 9.79656 10.9141 9.87062L10.3528 10.4172L10.9141 10.9638Z" fill="#1BA38E"/></svg>' },
        { title: 'DCTFWEB', activated: false, marked: false, id: 5, icon: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0V4H14L10 0Z" fill="#1BA38E"/><path d="M8.49187 8.51344C8.24406 8.43719 7.94437 8.39906 7.59312 8.39906H6.83406V12.2531H7.70562C7.89656 12.2531 8.04656 12.2481 8.155 12.2375C8.26344 12.2272 8.37562 12.2013 8.49187 12.16C8.60812 12.1188 8.70875 12.0606 8.79406 11.9856C9.17875 11.6603 9.37125 11.1 9.37125 10.3044C9.37125 9.74406 9.28656 9.32438 9.1175 9.04563C8.94844 8.76688 8.73969 8.58938 8.49187 8.51344Z" fill="#1BA38E"/><path d="M10 5C9.44688 5 9 4.55313 9 4V0H4C2.89688 0 2 0.896875 2 2V14C2 15.1031 2.89688 16 4 16H12C13.1031 16 14 15.1031 14 14V5H10ZM4.5 2H6.5C6.775 2 7 2.225 7 2.5C7 2.775 6.775 3 6.5 3H4.5C4.225 3 4 2.775 4 2.5C4 2.225 4.225 2 4.5 2ZM4 4.5C4 4.225 4.225 4 4.5 4H6.5C6.775 4 7 4.225 7 4.5C7 4.775 6.775 5 6.5 5H4.5C4.225 5 4 4.775 4 4.5ZM10.4481 11.2463C10.3888 11.5278 10.2972 11.7816 10.1731 12.0075C10.0491 12.2334 9.89031 12.4356 9.69656 12.6138C9.54406 12.7506 9.3775 12.8603 9.19688 12.9431C9.01625 13.0259 8.82187 13.0838 8.61406 13.1175C8.40625 13.1513 8.17188 13.1678 7.91094 13.1678H6.41187C6.20281 13.1678 6.045 13.1362 5.93938 13.0728C5.83344 13.0097 5.76438 12.9206 5.73219 12.8056C5.7 12.6906 5.68375 12.5416 5.68375 12.3581V8.19406C5.68375 7.94625 5.73938 7.76656 5.85031 7.65563C5.96125 7.54469 6.14094 7.48906 6.38875 7.48906H7.88781C8.27781 7.48906 8.61219 7.52531 8.89094 7.5975C9.16969 7.66969 9.42281 7.80531 9.65 8.00438C10.2413 8.51063 10.5372 9.28 10.5372 10.3131C10.5372 10.6541 10.5075 10.965 10.4481 11.2463Z" fill="#1BA38E"/></svg>' },
        { title: 'Caixas Postais', activated: false, marked: false, id: 6, icon: '<svg width="16" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 2C0.671875 2 0 2.67188 0 3.5C0 3.97188 0.221875 4.41562 0.6 4.7L7.4 9.8C7.75625 10.0656 8.24375 10.0656 8.6 9.8L15.4 4.7C15.7781 4.41562 16 3.97188 16 3.5C16 2.67188 15.3281 2 14.5 2H1.5ZM0 5.5V12C0 13.1031 0.896875 14 2 14H14C15.1031 14 16 13.1031 16 12V5.5L9.2 10.6C8.4875 11.1344 7.5125 11.1344 6.8 10.6L0 5.5Z" fill="#1BA38E"/></svg>' },
        { title: 'SimplesConnect', activated: false, marked: false, id: 7, icon: '<svg width="16" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.50074 0C1.5 0 1 0.5 1 1.50074V11.5C1 12.5 1.5 13 2.49333 13H11L15 15.9999V9H4.99999V3.99999H11V7H15V3.99999L11 0H2.50074Z" fill="#1BA38E"/></svg>' },
        { title: 'Treinamento', activated: false, marked: false, id: 8, icon: '<svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.375C5.51172 2.375 1.875 6.01172 1.875 10.5V12.0625C1.875 12.582 1.45703 13 0.9375 13C0.417969 13 0 12.582 0 12.0625V10.5C0 4.97656 4.47656 0.5 10 0.5C15.5234 0.5 20 4.97656 20 10.5V16.1289C20 18.0273 18.4609 19.5664 16.5586 19.5664L12.25 19.5625C11.9258 20.1211 11.3203 20.5 10.625 20.5H9.375C8.33984 20.5 7.5 19.6602 7.5 18.625C7.5 17.5898 8.33984 16.75 9.375 16.75H10.625C11.3203 16.75 11.9258 17.1289 12.25 17.6875L16.5625 17.6914C17.4258 17.6914 18.125 16.9922 18.125 16.1289V10.5C18.125 6.01172 14.4883 2.375 10 2.375ZM5.625 8.625H6.25C6.94141 8.625 7.5 9.18359 7.5 9.875V14.25C7.5 14.9414 6.94141 15.5 6.25 15.5H5.625C4.24609 15.5 3.125 14.3789 3.125 13V11.125C3.125 9.74609 4.24609 8.625 5.625 8.625ZM14.375 8.625C15.7539 8.625 16.875 9.74609 16.875 11.125V13C16.875 14.3789 15.7539 15.5 14.375 15.5H13.75C13.0586 15.5 12.5 14.9414 12.5 14.25V9.875C12.5 9.18359 13.0586 8.625 13.75 8.625H14.375Z" fill="#1BA38E"/></svg>' }
      ],
      questionTitle: '',
      questionAwnser: '',
      creationDate: new Date(),
      updatedDate: new Date(),
      views: {
        lastUpdate: new Date(),
        value: 0
      },
      edited: false,
      positiveFeedback: 0,
      negativeFeedback: 0
    },
    requireTitle: false,
    requireTag: false,
    showConfirmation: false,
    // Atulizar uma pergunta
    showUpdate: false,
    showRemoveButton: false,
    // Remover uma pergunta
    showRemovedConfirmation: false,
    changeButton: false,
    // Filtro de perguntas
    emptyList: true,
    filterOn: false,
    filterTags: [],
    filterSearchBar: ''
  }),
  async created () {
    // Pega os a lista de afiliados
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
        console.log('err')
      }
    })
    // Pega os feedbacks das perguntas
    await this.$firebase.database().ref('support/feedback').on('value', snapshot => {
      const feedbacks = snapshot.val()
      if (feedbacks) {
        this.listOfFeedbacks = []
        this.listOfFeedbacks = Object.keys(feedbacks).map(i => feedbacks[i])
      } else {
        this.listOfFeedbacks = []
        this.listOfQuestions = []
        this.emptyList = false
      }
    })
    // Pegas as perguntas caso existam, adiciona os ícones e põe na lista
    await this.$firebase.database().ref('support/questions').on('value', snapshot => {
      const values = snapshot.val()
      if (values) {
        const tempArray = Object.keys(values).map(i => values[i])
        for (let i = 0; i < tempArray.length; i++) {
          if (this.listOfFeedbacks[i] && this.listOfFeedbacks[i].id === tempArray[i].id) {
            tempArray[i].negativeFeedback = this.listOfFeedbacks[i].negativeFeedback
            tempArray[i].positiveFeedback = this.listOfFeedbacks[i].positiveFeedback
          }
          for (let j = 0; j < this.question.tags.length; j++) {
            if (tempArray[i] && tempArray[i].tags[j] && this.question && this.question.tags[j] && tempArray[i].tags[j].id === this.question.tags[j].id) {
              tempArray[i].tags[j].icon = this.question.tags[j].icon
              tempArray[i].tags[j].title = this.question.tags[j].title
            }
          }
        }
        // Organizar das que mais possuem visualizações para a que menos possuem
        tempArray.sort((a, b) => { return b.views.value - a.views.value })
        // Conclusão:
        this.listOfQuestions = tempArray
        this.emptyList = true
      } else {
        this.listOfQuestions = []
        this.listOfQuestionsFiltered = [...this.listOfQuestions]
        this.initialEditor = true
        this.emptyList = false
      }
    })
  },
  computed: {
    createdDateFormat () {
      let date = ''
      try {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        const dayofWeek = weekdays[moment(this.question.creationDate).weekday()]
        const dayAndMonth = months[moment(this.question.creationDate).month()]
        const day = moment(this.question.creationDate).format('DD')
        if (this.question.creationDate === null) {
          return 'Selecione uma data'
        } else {
          date = `${dayofWeek}, ${day} de ${dayAndMonth}`
          return date
        }
      } catch (msg) {
        console.log(msg)
      }
      return date
    },
    updatedDateFormat () {
      let date = ''
      try {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augusto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        const dayofWeek = weekdays[moment(this.question.updatedDate).weekday()]
        const dayAndMonth = months[moment(this.question.updatedDate).month()]
        const day = moment(this.question.updatedDate).format('DD')
        if (this.question.updatedDate === null) {
          return 'Selecione uma data'
        } else {
          date = `${dayofWeek}, ${day} de ${dayAndMonth}`
          return date
        }
      } catch (msg) {
        console.log(msg)
      }
      return date
    }
  },
  // Observa a barra de pesquisa para renderizar uma lista filtrada
  watch: {
    filterSearchBar: {
      handler (newValue, oldValue) {
        if (!newValue) {
          this.filterOn = false
          this.listOfQuestionsFiltered = []
        } else {
          this.filterOn = true
          const tempArray = []
          for (let i = 0; i < this.listOfQuestions.length; i++) {
            var splitedArrayWords = this.listOfQuestions[i].questionTitle.toLowerCase().split(' ')
            // for (let i = 0; i < splitedArrayWords.length; i++) {
            //   splitedArrayWords[i] = splitedArrayWords[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/^a-zA-Z0-9 ]/g, '').replace(/\s/g, '-').replace(/,/g, '').replace(/\?/g, '')
            // }
            newValue = newValue.toLowerCase()
            var arr = splitedArrayWords.join('')
            if (arr.search(newValue) !== -1 && !tempArray.includes(this.listOfQuestions[i])) {
              tempArray.push(this.listOfQuestions[i])
              const tag = document.createElement('span')
              var text = document.createTextNode(newValue)
              tag.appendChild(text)
              tag.style.color = 'red'
            } else {
              newValue.split(' ').every(word => {
                if (splitedArrayWords.includes(word) && !tempArray.includes(this.listOfQuestions[i])) {
                  tempArray.push(this.listOfQuestions[i])
                }
              })
            }
          }
          if (tempArray.length === 0) {
            this.emptyList = false
          } else {
            this.emptyList = true
            this.listOfQuestionsFiltered = tempArray
          }
        }
      }
    }
  },
  methods: {
    // Funções de criações, edição e remoção de questões
    chooseCategorie (tag) {
      tag.activated = !tag.activated
    },
    async saveNewQuestion () {
      // Requere que haja um título
      if (this.question.questionTitle === '') {
        this.requireTitle = true
        setTimeout(() => {
          this.requireTitle = false
        }, 2000)
      } else if (this.question.tags.every((tag) => tag.activated === false)) {
        this.requireTag = true
        setTimeout(() => {
          this.requireTag = false
        }, 2000)
      } else {
        // Adciona os dados em um objeto e o salva
        const tempObj = {
          id: moment().unix(),
          edited: this.question.edited,
          questionTitle: this.question.questionTitle,
          questionAwnser: this.question.questionAwnser,
          creationDate: String(this.question.creationDate),
          updatedDate: String(this.question.updatedDate),
          views: {
            lastUpdate: new Date(),
            value: this.question.views.value
          },
          tags: []
        }
        const tempFeedback = {
          id: tempObj.id,
          negativeFeedback: { feedbackUids: '', total: 0 },
          positiveFeedback: { feedbackUids: '', total: 0 }
        }
        if (this.question.tags) {
          for (let j = 0; j < this.question.tags.length; j++) {
            if (this.question.tags[j].activated === true) {
              tempObj.tags[this.question.tags[j].id] = { id: this.question.tags[j].id, activated: this.question.tags[j].activated, marked: this.question.tags[j].marked }
            }
          }
        }
        this.showConfirmation = !this.showConfirmation
        // Salva esse objeto no Firebase
        await this.$firebase.database().ref('support').child('feedback').child(tempObj.id).set(tempFeedback)
        await this.$firebase.database().ref('support').child('questions').child(tempObj.id).set(tempObj)
        // Limpa o this.question
        this.question.questionTitle = ''
        this.question.questionAwnser = ''
        this.createdDate = new Date()
        this.updatedDate = new Date()
        this.question.positiveFeedback = 0
        this.question.negativeFeedback = 0
        this.question.views.value = 0
        this.question.edited = false
        for (const defaultTag in this.question.tags) {
          this.question.tags[defaultTag].activated = false
        }
        // Depois de 3 segundos apaga a mensagem
        this.filterOn = false
        setTimeout(() => {
          this.showConfirmation = !this.showConfirmation
        }, 2000)
      }
    },
    editQuestion (question) {
      // Limpa a seleção dos botões anteriores
      for (let i = 0; i < this.listOfQuestions.length; i++) {
        if (this.listOfQuestions[i].edited === true) {
          this.listOfQuestions[i].edited = false
        }
      }
      // Fecha a tela inicial caso ela esteja aberta
      this.initialEditor = !this.initialEditor ? this.initialEditor : !this.initialEditor
      // Atualiza as informações no this.question
      question.edited = !question.edited
      this.question.edited = question.edited
      this.question.id = question.id
      this.question.questionTitle = question.questionTitle
      this.question.questionAwnser = question.questionAwnser
      this.question.creationDate = String(question.creationDate)
      this.question.updatedDate = String(question.updatedDate)
      this.question.positiveFeedback = question.positiveFeedback
      this.question.negativeFeedback = question.negativeFeedback
      this.question.views.value = question.views.value
      const tagsArray = Object.keys(this.question.tags).map(i => this.question.tags[i])
      for (const defaultTag of tagsArray) {
        defaultTag.activated = false
      }
      for (const changedTag in question.tags) {
        for (const defaultTag of tagsArray) {
          if (question.tags[changedTag].id === defaultTag.id) {
            defaultTag.activated = true
          }
        }
      }
      // Possibilita o toogle entre a tela inicial e a final
      if (question.edited === false) {
        this.closeEditor()
      }
      // Atualiza os botões
      this.showRemoveButton = true
      this.showConfirmation = false
      this.changeButton = true
      this.showUpdate = false
    },
    async removeQuestion () {
      if (this.question.edited) {
        await this.$firebase.database().ref('support/feedback').child(this.question.id).remove()
        await this.$firebase.database().ref('support/questions').child(this.question.id).remove()
        this.question.questionTitle = ''
        this.question.questionAwnser = ''
        this.createdDate = new Date()
        this.updatedDate = new Date()
        this.question.positiveFeedback = 0
        this.question.negativeFeedback = 0
        this.question.views.value = 0
        this.question.edited = false
        for (const defaultTag in this.question.tags) {
          this.question.tags[defaultTag].activated = false
        }
        this.changeButton = false
        this.showRemovedConfirmation = true
        this.filterOn = false
        setTimeout(() => {
          this.showRemovedConfirmation = !this.showRemovedConfirmation
        }, 2000)
      }
    },
    async updateQuestion () {
      if (this.question.questionTitle === '') {
        this.requireTitle = true
      } else if (this.question.tags.every((tag) => tag.activated === false)) {
        this.requireTag = true
        setTimeout(() => {
          this.requireTag = false
        }, 2000)
      } else {
        const tags = []
        if (this.question.tags) {
          for (let j = 0; j < this.question.tags.length; j++) {
            if (this.question.tags[j].activated === true) {
              tags[this.question.tags[j].id] = { id: this.question.tags[j].id, activated: this.question.tags[j].activated, marked: this.question.tags[j].marked }
            }
          }
        }

        await this.$firebase.database().ref('support').child('questions').child(this.question.id).update({ questionTitle: this.question.questionTitle, questionAwnser: this.question.questionAwnser, updatedDate: new Date(), tags: tags })
        this.question.questionTitle = ''
        this.question.questionAwnser = ''
        this.createdDate = new Date()
        this.updatedDate = new Date()
        this.question.positiveFeedback = 0
        this.question.negativeFeedback = 0
        this.question.views.value = 0
        this.question.edited = false
        for (const defaultTag in this.question.tags) {
          this.question.tags[defaultTag].activated = false
        }
        this.showUpdate = !this.showUpdate
        this.showRemoveButton = false
        this.changeButton = false
        this.filterOn = false
        setTimeout(() => {
          this.showUpdate = !this.showUpdate
        }, 2000)
      }
    },
    openEditor () {
      // const tagsArray = Object.keys(this.question.tags).map(i => this.question.tags[i])
      this.question.questionTitle = ''
      this.question.questionAwnser = ''
      this.question.creationDate = new Date()
      this.question.updatedDate = new Date()
      this.question.positiveFeedback = 0
      this.question.negativeFeedback = 0
      this.question.views.value = 0
      this.question.edited = false
      for (const defaultTag in this.question.tags) {
        this.question.tags[defaultTag].activated = false
      }
      this.changeButton = false
      this.initialEditor = !this.initialEditor
    },
    closeEditor () {
      this.showConfirmation = false
      // Limpa a seleção dos botões anteriores
      for (let i = 0; i < this.listOfQuestions.length; i++) {
        if (this.listOfQuestions[i].edited === true) {
          this.listOfQuestions[i].edited = false
        }
      }
      this.initialEditor = !this.initialEditor
    },
    // Funções de filtro e manipulação da lista de questões
    activateFilterTag (tag) {
      this.listOfQuestionsFiltered = []
      tag.marked = !tag.marked
      if (tag.marked) {
        this.filterTags.push(tag)
      } else {
        this.filterTags.splice(this.filterTags.indexOf(tag), 1)
      }
      const tempArray = []
      if (this.filterTags.length === 0) {
        this.filterOn = false
        this.listOfQuestionsFiltered = []
      } else {
        this.filterOn = true
        /*
        Se UMA tag for escolhida, filtrar apenas com base nessa tag
        Se mais de uma tag for escolhida, filtrar APENAS aqueles que possuem as duas tgs
        */
        for (let i = 0; i < this.listOfQuestions.length; i++) {
          if (this.listOfQuestions[i].tags) {
            for (let k = 0; k < this.filterTags.length; k++) {
              if (this.listOfQuestions[i].tags[this.filterTags[k].id] && !tempArray.includes(this.listOfQuestions[i])) {
                tempArray.push(this.listOfQuestions[i])
              }
            }
          }
        }
        this.listOfQuestionsFiltered = tempArray
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
background: #D9D9D9;
border-radius: 3px;
}
/* Handle */
::-webkit-scrollbar-thumb {
background:  #777986 !important;
border-radius: 3px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
background: var(--featured-dark) !important;
}
.info-container {
  padding: 20px 10px 70px 15px !important;
}.header-page-container{
  margin-bottom: -65px;
}
.card-container{
  width: 100%;
  height: auto;
  min-height: 94.3%;
}
.content-container {
    height: calc(100vh - 115px);
  .questions-container {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
    height: 102.5%;
    .header-container {
      display: flex;
      flex-direction: row;
      gap: 5px;
      .header-title{
        color: #404252;
        text-align: center;
        margin: auto 0;
        font-size: 20px;
        font-weight: 600;
      }
    }
    .search-questions-container {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      width: 100%;
      .btn-search {
        cursor: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 1px solid #777986;
        border-radius: 5px;
        background-color: #FFFFFF;
        width: 100%;
        height: 60px;

        i {
            margin-left: 10px;
            margin-right: 10px;
        }
        .input-search {
          width: 100%;
          background-color: #ffff;
          box-shadow: none !important;
        }
      }
    }
    .filter-container{
      margin: 10px auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100px;

      h6 {
        color: #404252;
        font-size: 14px;
        font-weight: 600;
      }
      .buttons-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 5px;
        width: 100%;
        .inner-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #1BA38E;
          background-color: #ffff;
          padding: 5px;
          border-radius: 5px;
          height: 35px;
          width: auto;
          cursor: pointer;
          font-weight: 400 !important;
          transition: all .1s !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          img {
            margin-right: 5px;
            font-size: 14px;
          }
          small {
            font-size: 13px;
            font-weight: 500;
            color: #1BA38E;
          }
          &:hover {
            transform: translate(0, -2px);
          }
          &.activated {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #1BA38E;
          background-color: #1BA38E;
          padding: 5px;
          border-radius: 5px;
          height: 35px;
          width: auto;
          cursor: pointer;
          font-weight: 400 !important;
          transition: all .1s !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          svg{
            fill: white !important;
            color: white;
          }
          small {
            font-weight: 400;
            color: white;
          }
          &:hover {
            transform: translate(0, -2px);
          }
        }
        }
      }
    }
    .list-container {
      border-radius: 7px;
      padding: 10px;
      width: 100%;
      height: 1000px;
      background-color: #E9F4f2;
      overflow-y: scroll;
      .question-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: white;
        width: 100%;
        height: auto;
        margin-bottom: 10px;
        transition: box-shadow .3s;
        border-radius: 7px;
        .question-header {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: flex-start;
          width: 100%;
          padding: 6px 10px;
          .inner-tag {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -5px;
            svg {
              font-size: 14px;
              color: #9496A1;
            }
            small {
              font-size: 13px;
              font-weight: 500;
              color: #9496A1;
            }
          }
        }
        .question-main{
          padding: 2px 13px;
          .question-title{
            text-align: start;
            font-size: 14px;
            font-weight: 600;
            color: #282A3A;
          }
        }
        .question-footer{
          background-color: #ffff;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 13px;

          small {
              font-size: 12px;
              color: #777986;
              font-weight: 600;
          }
          .container-icons{
            display: flex;
            flex-direction: row;
            gap: 6px;
            .icon-visualization {
              img {
                widows: 18px;
                height: 18px;
                color: #777986;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #777986;
              }
            }
            .icon-like {
              img {
                widows: 18px;
                height: 18px;
                color: #1BA38E;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #1BA38E;
              }
            }
            .icon-deslike {
              img {
                widows: 18px;
                height: 18px;
                color: #FF9393;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #FF9393;
              }
            }
          }
        }

        &:hover {
          cursor: pointer;
          // outline: 2px solid #93cebe75;
          box-shadow: 0 0 11px rgba(33,33,33,.2);
        }
      }
      .question-container-activated {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: white;
        width: 100%;
        height: auto;
        margin-bottom: 10px;
        transition: box-shadow .3s;
        outline: 2px solid #09806e;
        border-radius: 7px;
        .question-header {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: flex-start;
          width: 100%;
          padding: 6px 10px;
          .inner-tag {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -5px;
            svg {
              font-size: 14px;
              color: #9496A1;
            }
            small {
              font-size: 13px;
              font-weight: 500;
              color: #9496A1;
            }
          }
        }
        .question-main{
          padding: 2px 13px;
          .question-title{
            text-align: start;
            font-size: 14px;
            font-weight: 600;
            color: #282A3A;
          }
        }
        .question-footer{
          background-color: #ffff;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 10px;

          small {
              font-size: 12px;
              color: #777986;
              font-weight: 600;
          }
          .container-icons{
            display: flex;
            flex-direction: row;
            gap: 6px;
            .icon-visualization {
              img {
                widows: 18px;
                height: 18px;
                color: #777986;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #777986;
              }
            }
            .icon-like {
              img {
                widows: 18px;
                height: 18px;
                color: #1BA38E;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #1BA38E;
              }
            }
            .icon-deslike {
              img {
                widows: 18px;
                height: 18px;
                color: #FF9393;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #FF9393;
              }
            }
          }
        }

        &:hover {
          cursor: pointer;
          // outline: 2px solid #93cebe75;
          box-shadow: 0 0 11px rgba(33,33,33,.2);
        }
      }
    }
    .list-content-alternative {
      border-radius: 7px;
      padding: 10px;
      width: 100%;
      height: 1000px;
      background-color: #E9F4f2;
    }
    .search-results{
      font-size: 14px;
      font-weight: 400;
      color: #9496A1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      small {
        padding-top: 2px;
        padding-right: 2px;
      }
    }
  }
  .editor-container {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
    height: calc(100vh - 105px);
    .header-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img {
        width: 26px;
        height: 26px;
        }
        .header-title{
          color: #404252;
          text-align: center;
          margin: auto 0;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    .editor {
      background-color: #EAEAEA;
      margin-top: 14px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      .editor-content {
        display: flex;
        flex-direction: column;
        margin-top: 300px;

        p {
          font-size: 20px;
          font-weight: 700;
          color: #5B5D6B;
        }
        small {
          margin-top: -5px;
          color: #5B5D6B;
          font-size: 14px;
          font-weight: 700;
        }
        .btn-confirm {
          margin: 15px auto;
          color: #ffff !important;
          width: 190px !important;
          background-color: #0DCE9A !important;
          padding: 10px 20px !important;
          font-weight: 600 !important;
          font-size: 15px;
          transition: all .3s !important;

          &:hover{
              background-color: var(--featured) !important;
              color:  white !important;
              transform: translate(0, -2px);
          }
          &:focus {
              background-color: white !important;
              color: var(--featured) !important;
              transform: translate(0, -2px);
              outline: none !important;
          }
        }
      }
    }
    .editor-activate {

      padding: 30px;
      background-color: #fff;
      border: 2px solid #B3B5BD;
      margin-top: 14px;
      width: 100%;
      height: 80%;
      border-radius: 5px;
      .editor-content {
        display: flex;
        flex-direction: row;
        .editor-header {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
            .title-name{
              align-self: flex-start;
              margin-bottom: 15;
              font-size: 14px;
              font-weight: 400;
              color: #9496A1;
              padding-left: 0 !important;
            }
            .title-container{
              width: 100%;
              display: flex;
              flex-direction: column;
              border-bottom: 2px solid #D2D4DA;
              margin-top: -15px;

              .warning-alert{
                position: absolute;
                right: 31px;
                top: 112px;
                color: red;
              }
              .input-title {
                padding-top: 10px;
                border: none !important;
                box-shadow: none !important;
                width: 870px !important;
                font-size: 20px;
                font-weight: 700;
                color: #282A3A;
              }
              small {
                align-self: flex-end;
              }
            }
            .awnser-name{
              align-self: flex-start;
              margin-top: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #9496A1;
            }
            .awnser-container {
              width: 100%;
              display: flex;
              flex-direction: column;
              border-bottom: 2px solid #D2D4DA;
              margin-top: -15px;

              .input-awnser {
                text-align: justify !important;
                margin-top: 10px;
                border: none !important;
                box-shadow: none !important;
                width: 870px !important;
                height: 310px !important;
                font-size: 16px;
                font-weight: 400;
                color: #404252;
                resize: none;
              }

              small {
                align-self: flex-end;
              }
            }
            .categories-name {
              margin-top: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #9496A1;
            }
            .categories-container {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: flex-start;
              gap: 5px;
              width: 70%;
              .categorie {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1BA38E;
                border: 1px solid #1BA38E;
                background-color: #ffff;
                padding: 5px;
                gap: 5px;
                margin: 0;
                border-radius: 5px;
                height: 35px;
                width: auto;
                cursor: pointer;
                font-weight: 400 !important;
                transition: all .1s !important;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                svg {
                  fill: white !important;
                }
                span {
                  font-size: 14px;
                  font-weight: 500;
                  color: #1BA38E;
                }
                &:hover{
                  transform: translate(0, -1px);

                  span {
                    color: #fff;
                  }
                  svg {
                    color: white;
                    fill: white !important;
                  }
                }

                &.activated {
                  background-color: #1BA38E;
                  svg{
                    fill: white !important;
                  }
                  small {
                    font-weight: 400;
                    color: white;
                  }
                  &:hover{
                    border: 1px solid  #0DCE9A;

                    span {
                      color: #fff;
                    }
                  }
                }
              }
            }
            .warning-alert-tag{
              position: absolute;
              top: 500px;
              right: 50px;
              color: red;
            }
        }
      }
      .buttons-footer {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin: 25px 40px 0;
        width: 99%;

        .btn-close {
          margin: 15px auto;
          border: 2px solid #0DCE9A !important;
          color: #0DCE9A !important;
          width: 190px !important;
          background-color: #ffff !important;
          padding: 9px 20px !important;
          font-weight: 600 !important;
          font-size: 15px;
          transition: all .3s !important;

          &:hover{
              background-color: var(--featured) !important;
              color:  white !important;
              transform: translate(0, -2px);
          }
          &:focus {
              background-color: white !important;
              color: var(--featured) !important;
              transform: translate(0, -2px);
              outline: none !important;
          }
        }
        .btn-save {
          margin-left: 10px;
          color: #ffff !important;
          width: 190px !important;
          background-color: #0DCE9A !important;
          padding: 10px 20px !important;
          font-weight: 600 !important;
          font-size: 15px;
          transition: all .3s !important;

          &:hover{
              background-color: var(--featured) !important;
              color:  white !important;
              transform: translate(0, -2px);
          }
          &:focus {
              background-color: white !important;
              color: var(--featured) !important;
              transform: translate(0, -2px);
              outline: none !important;
          }
        }
        .btn-danger {
          margin-left: 10px;
          color: #ffff !important;
          width: 190px !important;
          background-color: var(--danger);
          padding: 10px 20px !important;
          font-weight: 600 !important;
          font-size: 15px;
          transition: all .3s !important;

          &:hover{
              background-color: red !important;
              color:  white !important;
              transform: translate(0, -2px);
          }
          &:focus {
              background-color: white !important;
              color: var(--featured) !important;
              transform: translate(0, -2px);
              outline: none !important;
          }
        }
        .confirmation-alert {
          align-self: flex-end;
          color: #0DCE9A;
          font-size: 12px;
          font-weight: 700;

          i {
            margin-right: 1px;
          }
        }
        .warning-alert {
          align-self: flex-end;
          color: red;
          font-size: 12px;
          font-weight: 400;

          i {
            margin-right: 1px;
          }
        }
      }
    }
    .editor-footer {
      display: flex;
      flex-direction: row;
      text-align: start;
      justify-content: space-between;
      height: 10% !important;
      width: 100% !important;
      margin-top: 85px;
      .title-info {
        font-size: 14px;
        font-weight: 400;
        color: #9496A1;
        margin-bottom: 0;
      }
      data {
        font-size: 15px;
        font-weight: 500;
        color: #5B5D6B;
      }
      .evaluation-info-container {
        .container-icons{
            display: flex;
            flex-direction: row;
            gap: 6px;
            .icon-visualization {
              img {
                widows: 18px;
                height: 18px;
                color: #777986;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #777986;
              }
            }
            .icon-like {
              img {
                widows: 18px;
                height: 18px;
                color: #1BA38E;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #1BA38E;
              }
            }
            .icon-deslike {
              img {
                widows: 18px;
                height: 18px;
                color: #FF9393;
              }
              small {
                font-size: 12px;
                font-weight: 600;
                color: #FF9393;
              }
            }
          }
      }
    }
  }
}
</style>
