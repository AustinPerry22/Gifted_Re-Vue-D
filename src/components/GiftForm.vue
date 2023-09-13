<template>
    <form @submit.prevent class="row justify-content-center">
        <div class="col-10 card bg-dark">
            <label for="giftUrl">Search for Giphy Gif</label>
            <input v-model="searchGif" name="searchGif" type="text">
            <button @click="getGifs" v-if="searchGif" class="btn btn-success my-2">Search for Gif</button>
            <section class="row">
                <div @click="newGift.url = gif.url" v-for="gif in   gifs  " :key="gif.id"
                    class="col-3 card img-fluid text-center g-2" :class="{ 'bg-success': newGift.url == gif.url }">
                    <img :src="gif.url" />
                </div>
            </section>
            <label for="giftTag">Gift text</label>
            <input v-model="newGift.tag" name="giftTag" type="text">
            <button @click="createGift" v-if="newGift.url" class="btn btn-success">Post Gift</button>
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
            async createGift(url) {
                try {
                    const create = await Pop.confirm('Do you want to submit your gif?')
                    if (create) {
                        await giftsService.createGift(this.newGift)
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },

            async getGifs() {
                try {
                    this.newGift.url = null
                    await gifsService.getGifs(this.searchGif)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style scoped lang="scss">
img {
    height: 20vh;
    width: fit-content;
}
</style>