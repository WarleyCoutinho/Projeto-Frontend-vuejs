<template>
  <div>
    <b-row>
      <b-col md="12" class="mt-4">
        <PageTitle icon="fa fa-bar-chart" main="Caixa" />
      </b-col>
    </b-row>
    <hr class="hr" />
    <b-row>
      <b-col md="6" sm="12">
        <b-form-input
          v-model="text"
          placeholder="item já confirmado"
        ></b-form-input>
      </b-col>

      <b-card class="box" md="6" sm="12">
        <b-row>
          <div class="input-Buscar-cliente">
            <b-form-input
              v-model="text"
              placeholder="Buscar cliente"
            ></b-form-input>
          </div>
        </b-row>
        <b-row>
          <div class="input-quantidade">
            <b-form-input
              v-model="text"
              placeholder="quantidade"
            ></b-form-input>
          </div>
        </b-row>
        <b-row>
          <div class="button-confirmar">
            <b-col xs="12">
              <b-button variant="success">Confirmar</b-button>
            </b-col>
          </div>
        </b-row>
      </b-card>
    </b-row>
    <hr />
  </div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle';
export default {
  name: 'Caixa',
  components: {
    PageTitle,
  },
};
</script>

<style scoped>
.box {
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  width: 245px;
  height: 315px;
  border-width: 2px;
  border-style: solid;
  background: #ffffff;
  border-radius: 5px;
  border-color: grey;
}
.input-Buscar-cliente {
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

.input-quantidade {
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

.button-confirmar {
  padding: 50px;
}
</style>
