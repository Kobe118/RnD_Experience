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

export interface Family  {
    family_id: string;
    family_name: string;
    is_admin: boolean;
    users: User[];
}

export interface User {
    user_id: string;
    last_name: string;
    first_name: string;
    picture_url: string | null;
}

