<template>
  <div class="clientes">
    <b-row>
      <b-col md="12" class="mt-4">
        <PageTitle icon="fa fa-bar-chart" main="Clientes" />
      </b-col>
    </b-row>
    <hr class="hr" />
    <b-row>
      <b-col md="10" sm="12">
        <div>
          <b-row>
            <b-col md="12" lg="12" class="my-1">
              <b-form-group label-for="filterInput" class="mr-2">
                <b-input-group size="md">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Buscar cliente"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      class="mr -4"
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
            :items="clientes"
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
                @click="loadCliente(data.item)"
                class="mr-2"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button
                variant="danger"
                @click="loadCliente(data.item, 'remove')"
              >
                <i class="fa fa-trash"></i>
              </b-button>
            </template>
          </b-table>
          <hr />
        </div>
      </b-col>

      <b-col md="2" sm="12">
        <b-button variant="success">Export PDF</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12" class="mt-4">
        <b-button variant="primary" @click="save">Editar</b-button>

        <b-button class="ml-2" @click="reset">Export Excel</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl } from '@/global';

import PageTitle from '../../components/template/PageTitle';

export default {
  name: 'Clientes',
  components: {
    PageTitle,
  },
  data() {
    return {
      filter: null,
      filterOn: [],
      novoCliente: {},
      novoClientes: [],
      fields: [
        // { key: 'ClienteId', label: '#' },
        { key: 'name', label: 'Cliente' },
        // { key: 'telefone', label: 'Telefone' },
        // { key: 'cpf', label: 'CPF' },
        // { key: 'actions', label: 'Ações' },
      ],
    };
  },
  methods: {
    getClientes() {
      const url = `${baseApiUrl}/clientes`;
      axios.get(url).then((res) => {
        this.linhasProdutivas = res.data.map((clientes) => {
          return {
            value: clientes.clientesId,
            text: clientes.nome,
          };
        });
      });
    },
  },
  reset() {
    this.mode = 'save';
    this.clientes = {};
  },
  onFiltered(filteredItems) {
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  },
  mounted() {
    this.getClientes();
  },
};
</script>

<style scoped></style>
