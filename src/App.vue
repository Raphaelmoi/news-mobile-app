<template>
  <ion-app>

    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="home" href="/actus">
          <ion-icon :icon="home" />
          <ion-label>Actus</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/to-read-later">
          <ion-icon :icon="bookmark" />
          <ion-label>A lire</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href='/manage-rss-categories'>
          <ion-icon :icon="logoRss" />
          <ion-label>Manage</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>


  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, } from '@ionic/vue';
import { search, bookmark, home, logoRss } from 'ionicons/icons';
import { fillPageWithStorage, useStore } from './store/store';
import { getStoredMenu, getStoredNews } from './utils';


const store = useStore()
// Get news marked to be read later
store.localStoredNews = getStoredNews()

// Get menu if stored -> case if user store his own page / flux
const storedMenu = getStoredMenu()
if (storedMenu.length) fillPageWithStorage(storedMenu)


// const currentPage = ref(useRoute().fullPath)


</script>
