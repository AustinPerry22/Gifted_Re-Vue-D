import { AppState } from "../AppState"
import { Gift } from "../models/Gift"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GiftsService {
    async getGifts() {
        const res = await api.get('api/gifts')
        AppState.gifts = res.data.map(gift => new Gift(gift))
    }

    async openGift(giftId) {
        let foundGift = AppState.gifts.find(g => g.id == giftId)
        foundGift.opened = true
        const res = await api.put(`api/gifts/${giftId}`, foundGift)
        AppState.gifts.splice(AppState.gifts.indexOf(foundGift), 1, new Gift(res.data))
    }

    async createGift(newGift) {
        const res = await api.post('api/gifts', newGift)
        const appGift = new Gift(res.data)
        AppState.gifts.push(appGift)
    }
}

export const giftsService = new GiftsService()