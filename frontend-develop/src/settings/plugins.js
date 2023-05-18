import Vue from 'vue';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueSimpleSVG from 'vue-simple-svg';
Vue.use(VueSimpleSVG);

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

import VueToastify from 'vue-toastify';
Vue.use(VueToastify);

import moment from 'moment';

moment.locale('ru');
import VueMoment from 'vue-moment';
Vue.use(VueMoment, {
  moment,
});

// import chat from "@/plugins/socketio";
import chat from '@/plugins/websocket';
// Vue.use(chat, { server: '212.22.94.79:80' });
Vue.use(chat, { server: '82.202.214.42:80' });

// import VueSocketIO from 'vue-socket.io';
// Vue.use(chat, { server: 'localhost:8088' });

// Vue.use(chat, { server: 'localhost:8099' });
