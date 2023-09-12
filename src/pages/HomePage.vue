<template>
  <div class="container-fluid my-3">
    <GiftForm />
    <section class="row">
      <div v-for="g in gifts" :key="g.id" class="col-3 g-2">
        <Gift :gift="g" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { giftsService } from '../services/GiftsService'
import { AppState } from '../AppState'

export default {
  setup() {
    onMounted(getGifts)

    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      gifts: computed(() => AppState.gifts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
