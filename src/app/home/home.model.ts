export interface Recipe {
    date: string;
    family: string;
    recipe: string;
    day_of_week: number;
    recipe_name: string;
}

export interface PreferredRecipe {
    name: string;
    recipe: string;
    made_by: string;
}

export interface Family {
    is_admin: boolean;
    family_id: string;
    family_name: string;
}


