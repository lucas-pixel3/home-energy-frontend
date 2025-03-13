import { createApp } from 'vue';  // Import Vue 3's createApp
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';
import directives from './directives';  // Import custom directives

const app = createApp(App);  // Create the Vue app

// Register custom directives
for (const [key, value] of Object.entries(directives)) {
  app.directive(key, value);
}

// Use Vuex and Vue Router
app.use(store);  // Use the store
app.use(router);  // Use the router

// Mount the app to the DOM
app.mount('#app');
