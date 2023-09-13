import { AppState } from "../AppState"
import { Gif } from "../models/Gif"
import { logger } from "../utils/Logger"
import { giphyApi } from "./AxiosService"

class GifsService {
    async getGifs(searchTerm) {
        const res = await giphyApi.get(`/search/?q=${searchTerm}`)
        AppState.gifs = res.data.data.map(g => new Gif(g))
        logger.log(AppState.gifs)
    }
}

export const gifsService = new GifsService()