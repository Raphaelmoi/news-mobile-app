<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Manage RSS categories</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-list v-if="!openCategorie">
                <ion-item @click="addPage = !addPage">
                    <span class="btn-add-page left">Add page</span>
                </ion-item>
                <ion-item v-if="addPage">
                    <ion-input placeholder="Enter text" v-model="newPageName"></ion-input>
                    <ion-button expand="block" @click="createNewPage()">Add</ion-button>
                </ion-item>
                <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
                    <ion-item v-for="page in pages" :key="page.link">
                        <ion-label @click="openCategorie = page" class="space-between">
                            <span>
                                {{ page.title }}
                            </span>
                            <ion-icon :icon="createOutline" />
                        </ion-label>
                        <ion-reorder slot="end"></ion-reorder>
                    </ion-item>
                </ion-reorder-group>

                <div style="padding: 2rem;">
                    - ordonner des resultats : on clic sur une actu et on dit voir plus : ca nous propose 2 - 3 mots
                    extraits du
                    titre / descritipitons et on propose den choisir un ou plus -> ca influencera le tri des prochaines actu
                </div>

            </ion-list>

            <ion-list v-else>
                <ion-item>
                    <div class="space-between">
                        <span class="btn-add-page">
                            <ion-icon :icon="chevronBack" @click="openCategorie = null" />
                            Back
                        </span>
                        <div class="flex-center">
                            <b>
                                {{ openCategorie.title }}
                            </b>
                            <ion-icon :icon="pencilOutline" class="mh-1" @click="displayEditPage = !displayEditPage" />
                            <ion-icon :icon="trashOutline" @click="confirmDelete = !confirmDelete" />
                        </div>
                    </div>
                </ion-item>
                <ion-item v-if="confirmDelete">
                    <div class="space-between">
                        <span>Delete category ?</span>
                        <div>
                            <span class="mh-1" @click="deletePage()">Yes</span>
                            <span @click="confirmDelete = false">Cancel</span>
                        </div>
                    </div>
                </ion-item>
                <ion-item v-if="displayEditPage">
                    <ion-input placeholder="Enter text" v-model="openCategorie.title"></ion-input>
                    <ion-button expand="block" @click="editPage()">Add</ion-button>
                </ion-item>
                <ion-item></ion-item>
                <ion-item>
                    <div class="space-between">
                        <span>Manage flux</span>
                        <div>
                            <ion-icon :icon="addCircleOutline" @click="displayAddFlux = !displayAddFlux" />
                        </div>
                    </div>
                </ion-item>

                <ion-item v-if="displayAddFlux">
                    <ion-input placeholder="Enter flux link" v-model="newFluxLink"></ion-input>
                    <ion-button expand="block" @click="addFlux()">Add</ion-button>
                </ion-item>

                <ion-item v-for="flux in openCategorie.flux" :key="flux">
                    <ion-icon :icon="trashOutline" class="mr-1" @click="deleteFlux(flux)" />
                    {{ flux }}
                </ion-item>
            </ion-list>

        </ion-content>

        <ion-toast :is-open="showToastMessage" :message="toastMessage" :duration="5000"
            @didDismiss="showToastMessage = false"></ion-toast>


    </ion-page>
</template>

<script setup lang="ts">
import { Pages, pages, useStore } from '@/store/store';
import { storeMenu, stringForUrl } from '@/utils';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonReorderGroup, IonReorder, IonItem, IonLabel, IonIcon, IonInput, IonButton, IonToast } from '@ionic/vue';
import { chevronBack, createOutline, trashOutline, pencilOutline, addCircleOutline } from 'ionicons/icons';

import { ref } from 'vue';

const openCategorie = ref(null as null | Pages)

const showToastMessage = ref(false)
const toastMessage = ref('')

// Order menu
const handleReorder = (event: CustomEvent) => {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    const itemMove = pages[event.detail.from];
    pages.splice(event.detail.from, 1);
    pages.splice(event.detail.to, 0, itemMove);

    storeMenu(pages)
    event.detail.complete();

};

// Page Create
const addPage = ref(false)
const newPageName = ref('')
function createNewPage() {
    if (newPageName.value.length < 1 || newPageName.value.length > 30) {
        // To do add error message
        toastMessage.value = "Name is too short or too long"
        showToastMessage.value = true
        return;
    }

    pages.push({
        title: newPageName.value,
        link: stringForUrl(newPageName.value),
        flux: [],
        news: []
    })

    addPage.value = false
    newPageName.value = ""
    // Success message
    toastMessage.value = "New page successfully added"
    showToastMessage.value = true

    storeMenu(pages)

}

// Page delete
const confirmDelete = ref(false)
function deletePage() {
    const pagePosition = pages.findIndex(p => p.title === openCategorie.value?.title)
    if (pagePosition !== -1) {

        pages.splice(pagePosition, 1)
        // Success message
        toastMessage.value = "Page successfully deleted"
        showToastMessage.value = true

        openCategorie.value = null
        confirmDelete.value = false

        storeMenu(pages)
    }
}

// Page edition
const displayEditPage = ref(false)
function editPage() {
    toastMessage.value = "Page successfully edited"
    showToastMessage.value = true

    displayEditPage.value = false

    storeMenu(pages)
}

// Add flux
const displayAddFlux = ref(false)
const newFluxLink = ref('')

function addFlux() {
    if (!openCategorie.value) return

    const fluxExist = openCategorie.value.flux.find(f => f === newFluxLink.value)
    if (!fluxExist) {
        openCategorie.value.flux.push(newFluxLink.value)
        toastMessage.value = "New flux added"
        showToastMessage.value = true
        newFluxLink.value = ""

        storeMenu(pages)
    }
}

// Delete flux from page
function deleteFlux(flux: string) {
    if (!openCategorie.value) return

    const fluxIndex = openCategorie.value.flux.findIndex(f => f === flux)
    if (fluxIndex !== -1) {
        openCategorie.value.flux.splice(fluxIndex, 1)
        toastMessage.value = "Flux deleted"
        showToastMessage.value = true

        storeMenu(pages)
    }
}
</script>

<style>
.btn-add-page {
    display: flex;
    align-items: center;
    opacity: .7;
    font-size: .75rem;
    text-decoration: underline;
}

.btn-add-page.left {
    margin-left: auto;
}

.btn-add-page ion-icon {
    width: 15px;
}

.space-between {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>