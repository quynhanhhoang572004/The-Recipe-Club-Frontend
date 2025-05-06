export interface Category {
    id:number;
    name: string;
}

export interface Ingredient {
    id: number;
    name: string;
    image_url?: string;
    category_id?: number;
    category?: {
      id: number;
    };
    selected?: boolean;
  }
  

