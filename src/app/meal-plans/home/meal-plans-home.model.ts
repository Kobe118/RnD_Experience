export  interface Day {
    date: string;
    recipe: string;
    name: string;
    day_of_week: string;
    will_attend: boolean;
    users: User[];
    url: string;
}
  
export  interface User {
    user_id: string;
    user_name: string;
}
  
export  interface Family {
    is_admin: boolean;
    family_id: string;
    family_name: string;
    mealplans: Day[]
}
  
export  interface MealPlan {
    mealplan: string;
}