<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-segment v-model="selectedCategory" :scrollable="true">
                    <ion-segment-button v-for="(category, index) in pages" :key="index" :value="category.link"
                        :id="category.link" @click="navigateTo(category.link)">
                        {{ category.title }}
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div v-if="fetchingNews" class="flex-center " style="justify-content: center; margin: 50px 0;">
                <ion-spinner name="crescent"></ion-spinner>
            </div>
            <ion-grid class="ion-padding" v-else-if="currentPage">
                <ion-row>
                    <ion-col v-if="currentPage" size="12">
                        <h2>
                            {{ currentPage.title }}
                        </h2>
                    </ion-col>
                    <ion-col size="12" size-md="6" size-lg="4" v-for="item in currentPage.news" :key="item.link">
                        <news-card :news="item" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import NewsCard from '@/components/NewsCard.vue';
import { NewsItem, Pages, pages } from '@/store/store';
import { feedResults, getRSSFlux } from '@/utils/fetchRSS';
import { IonPage, IonHeader, IonToolbar, IonContent, IonGrid, IonCol, IonRow, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const selectedCategory = ref(pages[0].link)
const currentPage = ref(undefined as undefined | Pages)

const fetchingNews = ref(false)
async function fetchRSS() {
    if (!currentPage.value) return

    fetchingNews.value = true
    // Stop if news have already been fetched
    let results: NewsItem[] = []
    for await (const link of currentPage.value.flux) {
        const flux = await getRSSFlux(link)
        results = [...results, ...await feedResults(flux)]
    }
    currentPage.value.news = results.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())

    fetchingNews.value = false
}


async function initPage() {
    // selectedCategory.value = route.params.id as string
    currentPage.value = pages.find(p => p.link === selectedCategory.value)
    // Stop if news have already been fetched
    if (currentPage.value && currentPage.value.news.length) return
    await fetchRSS()
}

initPage()

function navigateTo(link: string) {
    selectedCategory.value = link
    initPage()
}

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