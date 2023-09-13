<template>
    <form @submit.prevent="getGifs" class="row justify-content-center">
        <div class="col-10 card bg-dark">
            <label for="giftTag">Gift text</label>
            <input v-model="newGift.tag" name="giftTag" type="text">
            <label for="giftUrl">Search for Giphy Gif</label>
            <input v-model="searchGif" name="searchGif" type="text">
            <section class="row">
                <div v-for="gif in gifs" :key="gif.id" class="col-3 card">
                    <img :src="gif.url" />
                </div>
            </section>
            <button v-if="searchGif" class="btn btn-success">Search for Gif</button>
            <button v-if="newGift.url" class="btn btn-success">Post Gift</button>
        </div>
    </form>
</template>

<script>
import { computed, ref } from 'vue';
import { giftsService } from '../services/GiftsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { gifsService } from '../services/GifsService';

export default {

    setup() {
        const newGift = ref({})
        const searchGif = ref('')
        return {
            gifs: computed(() => AppState.gifs),
            newGift,
            searchGif,
            async createGift() {
                try {
                    await giftsService.createGift(this.newGift)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async getGifs() {
                try {
                    await gifsService.getGifs(this.searchGif)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>