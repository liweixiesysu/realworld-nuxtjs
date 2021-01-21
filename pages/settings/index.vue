<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="onUpdateUser()">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr/>
        <button class="btn btn-outline-danger" @click="logout()">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { updateUser } from '@/api/user';

const Cookie = process.client ? require('js-cookie') : undefined;

export default {
    name: "SettingsIndex",
    middleware: 'authenticated',
    computed: {
      user() {
        let user = this.$store.state.user;
        return {
          image: user.image,
          username: user.username,
          bio: user.bio,
          password: user.password
        }
      }
    },
    methods: {
      async onUpdateUser() {
        const { data } = await updateUser(this.user);
        
        this.$store.commit('setUser', data.user);
        Cookie.set('user', data.user);
      },
      async logout() {
        this.$store.commit('setUser', null);
        Cookie.set('user', null);

        this.$router.push('/login');
      }
    }
}
</script>

<style>

</style>