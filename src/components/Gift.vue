<template>
    <div @click="openGift()" class="bg-dark card justify-content-center img-fluid text-center">
        <p>{{ gift.tag }}</p>
        <img :src="gift.url">
    </div>
</template>

<script>
import { Gift } from '../models/Gift';
import { giftsService } from '../services/GiftsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: { gift: { type: Gift, required: true } },
    setup(props) {

        return {
            async openGift() {
                try {
                    const giftId = props.gift.id
                    await giftsService.openGift(giftId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style lang="scss" scoped>
img {
    height: 15rem;
    width: auto;
}
</style>