export enum MOOD_EMOTICON_COLORS {
  GEMBIRA = '#3CB403',
  SENANG = '#B4CC4E',
  NETRAL = '#FFD300',
  SEDIH = '#FFC30B',
  BURUK = '#D0312D'
}

export interface TotalMoodGroupByType {
  veryHappy: number;
  happy: number;
  netral: number;
  sad: number;
  verySad: number;
}

export interface MoodsGrowthByYear {
  month: string;
  moodCount: number;
  moodAverage: number;
}
