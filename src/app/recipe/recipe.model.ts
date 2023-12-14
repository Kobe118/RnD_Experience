export interface Recipe {
    id: any;
    name: any;
    made_by: any;
    manual: any;
    is_liked?: boolean; // Optional property
    image_url?:string;
}

export interface IngredientDetail {
    name: string;
    quantity: number;
    unit: string;
}

export interface RecipeNew {
    url: string;
    name: string;
    recipe: string;
}