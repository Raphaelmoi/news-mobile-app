<template>
    <a @click="openLink(news.link)" class="card-item-link">
        <ion-card>
            <div class="image-link">
                <img :src="news.image" alt="" class="blur-image" v-if="news.image">
                <img :src="news.image" alt="" v-if="news.image">

                <img :src="logo" :alt="newspaper" v-if="logo" class="news-logo" />
            </div>
            <ion-card-content>
                <div class="bookmark-container">
                    <ion-icon :icon="bookmarkOutline" class="bookmark" @click.stop="setAsAsRead" v-if="!news.toReadLater" />
                    <ion-icon :icon="bookmark" class="bookmark is-bookmarked" @click.stop="setAsAsRead" v-else />
                </div>

                <ion-card-title v-html="news.title"></ion-card-title>
                <p v-html="news.description" class="card-description"></p>
                <div class="ion-text-start">
                    <span>{{ newspaper ? newspaper : news.source.slice(0, 30) }}</span><br />
                    <span>{{ new Date(news.creationDate).toLocaleDateString() }} {{ new
                        Date(news.creationDate).toLocaleTimeString() }}</span>
                </div>
            </ion-card-content>
        </ion-card>
    </a>
</template>
  
<script setup lang="ts">
import { NewsItem, useStore } from '@/store/store';
import { IonCard, IonCardContent, IonCardTitle, IonIcon } from '@ionic/vue';
import { bookmark, bookmarkOutline } from 'ionicons/icons';
import { toggleNewsToReadLater, getStoredNews, newsOutlets } from '@/utils';
import { ref } from 'vue';

const store = useStore()

const props = defineProps({
    news: {
        type: Object as () => NewsItem,
        required: true
    },
});

function setAsAsRead(e: Event) {
    e.preventDefault()

    props.news.toReadLater = !props.news.toReadLater

    toggleNewsToReadLater(props.news)
    // Sync store with localStorage
    store.localStoredNews = getStoredNews()
}

const logo = ref('')
const newspaper = ref('')

function getNewsNewspaper() {
    const np = newsOutlets.find(out => props.news.source.toLowerCase().includes(out.match))
    if (np) {
        logo.value = np.logo
        newspaper.value = np.name
    }
}
getNewsNewspaper()


function openLink(link: string) {
    window.open(link, '_blank', 'hardwareback=yes');
    // window.open(link, '_system');
}


</script>
  
<style>
.card-item-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #111;
    position: relative;
}

.card-item-link ion-card {
    margin: 0;
}

.card-item-link .image-link {
    height: 200px;
    position: relative;
    overflow: hidden;
}

.card-item-link .image-link img {
    object-fit: contain;
    z-index: 1;
    position: relative;
    width: 100%;
    height: 200px;
}

.card-item-link .image-link .blur-image {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    filter: blur(12px);
    object-fit: cover;
    height: 100%;
    width: 100%;
    transform: scale(-1.2);
}

.card-item-link .content-link {
    height: 50%;
    overflow: hidden;
    padding: .5rem;
}


.card-item-link .ion-text-start {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.card-item-link .bookmark-container {
    margin-bottom: .5rem;
}

.card-item-link .bookmark {
    width: 15px;
    display: block;
    margin-left: auto;
}

.card-item-link ion-card-content {
    height: 200px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
}

.card-item-link ion-card-title,
.card-item-link .card-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.2em;
    max-height: calc(3 * 1.2em);
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.card-item-link .image-link img.news-logo {
    position: absolute;
    top: 10px;
    right: 10px;
    width: auto;
    height: auto;
    max-width: 120px;
    max-height: 30px;
    z-index: 10;
}

.is-bookmarked {
    color: rgb(57, 126, 153);
}
</style>