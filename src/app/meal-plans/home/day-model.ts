// day.model.ts

export interface Day {
    image: string;
    weekday: string;
    willAttend: boolean;
    attendees: string[];
}
export interface MealPlan {
    days: Day[];
}