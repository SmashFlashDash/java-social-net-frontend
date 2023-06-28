<template>
  <div class="settings-security">
    <div class="settings-security__block">
      <div class="settings-security__mail">
        <h3 class="settings-security__title">E-mail:</h3>

        <input
          class="settings-security__value"
          v-model="changeEmail"
          autocomplete="off"
        />

        <button
          class="settings-security__btn"
          @click.prevent="openModal('email')"
        >
          {{ translations.settingBtnChange }}
        </button>
      </div>

      <h3 class="settings-security__title">{{ translations.settingPasswordLabel }}</h3>
      <input
        class="settings-security__value not-first"
        type="password"
        v-model="password"
        :placeholder="translations.settingPasswordPlaceholder"
        autocomplete="new-password"
      />
      <input
        class="settings-security__value"
        type="password"
        v-model="passwordTwo"
        :placeholder="translations.settingPasswordPlaceholder2"
        autocomplete="new-password"
      />
      <button
        class="settings-security__btn"
        @click.prevent="openModal('password')"
      >
        {{ translations.settingBtnChange }}
      </button>
    </div>

    <modal v-model="modalShow">
      <p v-if="modalText">{{ modalText }}</p>

      <template slot="actions">
        <button-hover @click.native="closeModal">{{ translations.yes }}</button-hover>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
import auth from '@/requests/auth';
import translations from '@/utils/lang.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SettingsSecurity',
  components: { Modal },

  data: () => ({
    modalShow: false,
    modalText: '',
    changeEmail: '',
    password: '',
    passwordTwo: '',
  }),

  computed: {
    ...mapGetters('profile/info', ['getInfo']),

    translations() {
      const lang = this.$store.state.auth.languages.language.name;
      if (lang === 'Русский') {
        return translations.rus;
      } else {
        return translations.eng;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      this.changeEmail = this.getInfo?.email;
      this.password = '';
      this.passwordTwo = '';
    }, 300);
  },

  methods: {
    ...mapActions('auth/api', ['logout']),

    closeModal() {
      this.modalShow = false;
    },

    async openModal(id) {
      if (id === 'email') {
        await auth.requestChangeEmailLink({ email: this.changeEmail }).then(() => {
          this.modalText = `${this.translations.settingModalEmailChange} ${this.changeEmail}`;
          this.modalShow = true;
          setTimeout(() => {
            this.logout().finally(() => {
              this.$router.push('/login');
            });
          }, 3000);
        });
      }

      if (id === 'password') {
        if (this.password === this.passwordTwo) {
          await auth.requestChangePasswordLink({ password: this.passwordTwo }).then(() => {
            this.modalText = `${this.translations.settingModalPasswordChange}`;
            this.modalShow = true;
          });
        }
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'


.settings-security__block
  background ui-cl-color-white-theme
  box-shadow box-shadow-main
  display flex
  flex-direction column
  width 100%
  padding 30px
  font-size font-size-downdefault
  border-radius border-big-radius

  &+&
    margin-top 20px

.settings-security__mail
  margin-bottom 30px

.settings-security__btn
  display block
  min-width 180px
  max-width 180px
  color ui-cl-color-eucalypt
  border-radius border-small
  text-align center
  background ui-cl-color-white-theme
  border 1px solid ui-cl-color-eucalypt
  font-size font-size-small-medium
  padding 10px
  @media (any-hover: hover)
    &:hover
      background ui-cl-color-eucalypt
      color ui-cl-color-white-theme

.settings-security__title
  color ui-cl-color-full-black
  margin-bottom 15px
  font-family 'Exo', Arial, sans-serif
  font-size 24px
  font-weight font-weight-bold

.form__input_stylus
  color ui-cl-color-full-black

.settings-security__value
  display block
  width 100%
  color ui-cl-color-767676
  border-radius border-small
  background ui-cl-color-white-theme
  border 1px solid ui-cl-color-ababab
  font-size font-size-small-medium
  padding 10px 15px
  margin-bottom 15px
</style>
