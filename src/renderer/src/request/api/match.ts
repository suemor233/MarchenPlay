import type { MatchResponseV2, MatchVideoRequestModel } from '../models/match'
import { Post } from '../ofetch'

export enum Matchkeys {
  postVideoEpisodeId = 'postVideoEpisodeId',
}

function postVideoEpisodeId(data: MatchVideoRequestModel) {
  return Post<MatchResponseV2>('/match', data)
}

export const match = {
  postVideoEpisodeId,
  Matchkeys,
}
