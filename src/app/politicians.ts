export interface Politicians {
  id: number;
  name: string;
  description: string;
  image: string;
  votes: number;
  corrupt: number;
  not_corrupt: number;
}

export const politicians=[
	{
		id: 1,
		name: 'Tony Blair 2',
		description:'Former British Prime Minister',
		image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tony_Blair_2010_%28cropped%29.jpg',
		votes: 0,
		corrupt: 0,
		not_corrupt: 0
	},
	{
		id: 2,
		name: 'David Cameron',
		description:'Former British Prime Minister 2',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Prime_Minister_David_Cameron_-_official_photograph_%288947770804%29_%28cropped%29.jpg/440px-Prime_Minister_David_Cameron_-_official_photograph_%288947770804%29_%28cropped%29.jpg',
		votes: 0,
		corrupt: 0,
		not_corrupt: 0
	},
	{
		id: 3,
		name: 'Boris Johnson',
		description:'British Prime Minister',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/440px-Boris_Johnson_official_portrait_%28cropped%29.jpg',
		votes: 0,
		corrupt: 0,
		not_corrupt: 0	
	}	
]
