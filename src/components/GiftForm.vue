<template>
    <form @submit.prevent="createGift" class="row justify-content-center">
        <div class="col-10 card bg-dark">
            <label for="giftTag">Gift text</label>
            <input v-model="newGift.tag" name="giftTag" type="text">
            <label for="giftUrl">Gift Img Url</label>
            <input v-model="newGift.url" name="giftUrl" type="text">
            <button class="btn btn-success">Post Gift</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { giftsService } from '../services/GiftsService';
import Pop from '../utils/Pop';

export default {

    setup() {
        const newGift = ref({})
        return {
            newGift,
            async createGift() {
                try {
                    await giftsService.createGift(this.newGift)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>