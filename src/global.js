import Vue from 'vue';

// se for usar login descomenta essa duas linhas de codigo e sua exportação abaixo.
// export const userKey = '__front';
// const hostname = window.location.hostname;

// usar o back end descomenta essa linha e coloca troca somente a porta caso for nescessario.
// export const baseApiUrl = `http://${hostname}:3000`;

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data });
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default {
  // baseApiUrl, // usar o back end
  showError,
  // userKey, // usar login
};
