<template>
  <header class="header">
    <!-- <div id="user-dropdown" v-if="!hideUserDropdown"> -->
    <div>
      <nav class="nav">
        <!-- <router-link to="/caixa"
          ><img id="logo" alt=" Logo" src="../../assets/Logo.svg"
        /></router-link> -->

        <!-- <img
          v-on:click="openMenu"
          alt="Abrir menu "
          id="menu-button"
          src="../../assets/menu.svg"
        /> -->

        <div v-on:click="closeMenu" id="menu-overlay" v-if="menuActive"></div>
        <div id="menu-items" :class="{ active: menuActive }">
          <!-- <img id="menu-logo" alt="Logo" src="../../assets/Logo.svg" /> -->

          <ul id="topBar">
            <li v-on:click="closeMenu" id="Caixa">
              <router-link to="/caixa">Caixa</router-link>
            </li>
            <li v-on:click="closeMenu" id="novoCliente">
              <router-link to="/novo-cliente">Novo Cliente</router-link>
            </li>
            <li v-on:click="closeMenu" id="Clientes">
              <router-link to="/clientes">Clientes</router-link>
            </li>

            <!-- <li id="userFoto">
              <UserDropdown v-if="!hideUserDropdown" />
            </li> -->
          </ul>
        </div>
        <hr class="hr" />
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Header',

  data() {
    return {
      menuActive: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  // methods: {
  //   openMenu: function () {
  //     this.menuActive = true;
  //   },
  //   closeMenu: function () {
  //     this.menuActive = false;
  //   },
  // },
};
</script>

<style scoped>
header {
  background-color: var(--color-background-nav);
  width: 100%;
  height: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}
/* #logo {
  left: 12.5%;
  top: 25%;
  bottom: 26%;
  margin-left: -500px;
  font-family: 'Product Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;
  color: #263238;
} */
/* #menu-button {
  width: 30px;
  margin-left: 50px;
  left: 12.5%;
  right: 78.91%;
  top: 25%;
  bottom: 26%;
  background-color: #263238;
} */

#menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.8;
}
/* #menu-logo {
  width: 110px;
  margin-top: 30px;
  margin-bottom: 10px;
  margin-right: 100px;
} */
/* #menu-items {
  position: fixed;
  display: none;
  flex-direction: column;
  top: 0;
  right: 0;
  background-color: var(--color-background);
  width: 60%;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
} */
/* #menu-items.active {
  display: flex;
} */
ul {
  list-style: none;
  text-align: center;
  max-width: 1000px;
  list-style: none;
}
ul li {
  margin: 20px 0px;
  display: inline;
}
ul li a {
  color: var(--color-text-header);
  padding: 20px;
  display: inline-block;
  text-decoration: none;
  transition: background 0.4s;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
}
ul li a:hover {
  background-color: hsl(177, 60%, 32%);
}

/* ul li:last-child a {
  float: right;
  background-color: rgb(24, 139, 233);
} */
/* #userFoto {
  margin-left: 145px;
} */
#Caixa {
  margin-left: -200px;
  right: 60%;
  top: 38%;
  bottom: 38%;
  justify-content: space-between;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: var(--color-text-title);
}
#Clientes {
  left: 43.33%;
  right: 49.48%;
  top: 38%;
  bottom: 38%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #263238;
}
#novoCliente {
  left: 43.33%;
  right: 49.48%;
  top: 38%;
  bottom: 38%;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #263238;
}

@media (min-width: 700px) {
  #menu-button,
  #menu-logo,
  #menu-overlay {
    display: none;
  }
  #menu-items {
    display: flex;
    position: static;
    height: 60px;
    width: auto;
  }
  ul {
    display: flex;
    height: 60px;
    align-items: center;
  }
  ul li {
    margin: 20;
    margin-left: 20px;
  }
}
</style>
