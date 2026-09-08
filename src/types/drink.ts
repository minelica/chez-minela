export type DrinkCategory =
  | "cocktail"
  | "beer"
  | "wine"
  | "spirit"
  | "soft"

export type Drink = {
  name: string
  category: DrinkCategory
  description: string
  tags: string[]
  strength: number
  ingredients: string[]
  facts: string[]
  image: string
  available: boolean
}