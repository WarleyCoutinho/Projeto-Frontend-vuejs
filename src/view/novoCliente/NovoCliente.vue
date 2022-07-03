<template>
  <div class="novo-cliente">
    <b-row>
      <b-col md="12" class="mt-4">
        <PageTitle icon="fa fa-bar-chart" main="Novo Cliente" />
      </b-col>
    </b-row>
    <hr class="hr" />
    <div v-show="displayForm">
      <b-form submit.stop.prevent="onSubmit">
        <input type="hidden" id="novoCliente" v-model="novoClienteId" />
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Nome" label-for="Nome-Cliente">
              <b-form-input
                id="nomeCliente"
                type="text"
                v-model="novoCliente.name"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe seu Nome"
              />
            </b-form-group>
          </b-col>

          <b-col md="4" sm="12">
            <b-form-group label="Telefone:" label-for="telefone">
              <b-form-input
                id="telefone"
                type="text"
                v-model="novoCliente.telefone"
                v-mask="'(##) # ####-####'"
                required
                placeholder="Informe o numero do telefone"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <label for=">CPF">CPF</label>
            <span style="color: red"> *</span>

            <b-form-input
              id="cpf"
              name="cpf"
              type="cpf"
              v-validate="{ required: true, min: 11 }"
              :state="validateState('cpf')"
              required
              v-model="novoCliente.cpf"
              v-mask="'###.###.###-##'"
              placeholder="Informe seu cpf"
            />
            <b-form-invalid-feedback id="cpf">{{
              veeErrors.first('cpf')
            }}</b-form-invalid-feedback>
          </b-col>
        </b-row>

        <hr />
        <b-row>
          <b-col xs="12">
            <b-button
              type="submit"
              variant="primary"
              v-if="mode === 'save'"
              @click="save"
            >
              Salvar
            </b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
              >Excluir</b-button
            >
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
            <!-- <b-button
              variant="warning"
              class="ml-2"
              @click="displayForm = false"   
            >                             
              Listar Clientes
             
            </b-button> -->

            <!-- não está pronto essa funçao de
               de trazer a lista com os nomes dos clientes -->
          </b-col>
        </b-row>
      </b-form>
      <hr />
      <div class="overflow" v-show="!displayForm">
        <b-row>
          <b-col md="12" lg="12" class="my-1">
            <b-form-group label-for="filterInput" class="mb-0">
              <b-input-group size="md">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Digite para pesquisar"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    class="mb-4"
                    :disabled="!filter"
                    @click="filter = ''"
                    >Limpar</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          hover
          striped
          small
          sort-icon-left
          head-variant="dark"
          :items="novoClientes"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          @filtered="onFiltered"
        >
          <template v-slot:cell(actions)="data">
            <b-button
              variant="warning"
              @click="loadNovoCliente(data.item)"
              class="mr-2"
            >
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button
              variant="danger"
              @click="loadNovoCliente(data.item, 'remove')"
            >
              <i class="fa fa-trash"></i>
            </b-button>
          </template>
        </b-table>
        <hr />
        <b-row>
          <b-col md="5" sm="12">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              first-text="Primeiro"
              prev-text="Anterior"
              next-text="Próximo"
              last-text="Último"
              size="md"
            ></b-pagination>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-group
              label="Qtd Linhas"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="md"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                :options="pageOptions"
                size="md"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12" class="text-right">
            <b-button
              variant="primary"
              class="ml-2"
              @click="displayForm = true"
            >
              Novo Cliente
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle';
import { baseApiUrl, showError } from '@/global';
import { mask } from 'vue-the-mask';
import axios from 'axios';

export default {
  name: 'NovoCliente',
  components: {
    PageTitle,
  },
  directives: { mask },
  data: function () {
    return {
      perPage: 5,
      currentPage: 1,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      mode: 'save',
      displayForm: true,
      novoCliente: {},
      novoClientes: [],
      fields: [
        { key: 'novoClienteId', label: '#' },
        { key: 'name', label: 'Nome do Cliente' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'cpf', label: 'CPF' },
        { key: 'actions', label: 'Ações' },
      ],
    };
  },
  methods: {
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        // alert('Formulário enviado!');
      });
    },

    loadNovoClientes() {
      const url = `${baseApiUrl}/novocliente`;
      axios.get(url).then((res) => {
        this.cliente = res.data;
      });
    },

    reset() {
      this.mode = 'save';
      this.cliente = {};
      this.loadNovoClientes();
    },
    save() {
      const method = this.novoCliente.novoClienteId ? 'put' : 'post';
      const id = this.novoCliente.novoClienteId
        ? `/${this.novoCliente.novoClienteId}`
        : '';
      axios[method](`${baseApiUrl}/novocliente${id}`, this.cliente)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.novoCliente.novoClienteId;
      axios
        .delete(`${baseApiUrl}/novocliente/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadNovoCliente(novoCliente, mode = 'save') {
      this.mode = mode;
      this.displayForm = true;
      this.novoCliente = { ...novoCliente };
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.loadNovoClientes();
  },
};
</script>

<style></style>
