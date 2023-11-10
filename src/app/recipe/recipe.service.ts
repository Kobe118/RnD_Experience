// recipe.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private supabaseUrl = 'https://ztcqcptzuazkqtmcpsxw.supabase.co';
    private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Y3Fj' +
        'cHR6dWF6a3F0bWNwc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5OTk3NjMsImV4cCI6MjAxMTU3NTc2M30.5cif3sm' +
        'YXD88DMcwjimkQ0LDlmDGmKa6-A7smgjdPP4';
    private supabase = createClient(this.supabaseUrl, this.supabaseKey);

    async getImageUrl(id: string) {
        const { data } = this.supabase
            .storage
            .from('recipes_thumbnail_and_picture')
            .getPublicUrl(id+'.png')

        return data.publicUrl;
    }

    async getRecipes(){
        let { data: recipe, error } = await this.supabase
            .from('recipe')
            .select('id,name,made_by,manual')
        if (error) throw error;
        console.log(recipe)
        return recipe;
    }
}
