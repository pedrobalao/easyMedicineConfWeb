<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">easyPed BO</b-navbar-brand>
    <no-ssr>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/diseases">Doenças</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/vias">Vias</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/unities">Unidades</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/variables">Variáveis</b-nav-item>
        </b-navbar-nav>
         <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/medicalcalculations">Cálculos Médicos</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$auth.$state.user">
          <b-nav-item to="/categories">Medicamentos</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right v-if="$auth.$state.user">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{$auth.$state.user.username}}</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </no-ssr>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
