<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>News to read later</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <ion-grid class="ion-padding">
                <ion-row>
                    <ion-col size="12" size-md="6" size-lg="4" v-for="item in store.localStoredNews" :key="item.link">
                        <news-card :news="item" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import NewsCard from '@/components/NewsCard.vue';
import { useStore } from '@/store/store';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/vue';

const store = useStore()

</script>

<style>
@media all and (max-width: 1024px) {
    .segment-scroll {
        overflow-x: auto;
        justify-content: flex-start;
    }

    ion-segment-button {
        min-width: 200px;
    }
}

@media all and (max-width: 768px) {
    .ion-padding {
        padding: 0;
    }
}
</style>