import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent {
  navLinks = [
    { 
      path: '/Home', 
      label: 'Home', 
      icon: 'home',
    },
    { 
      path: '/mealplanshome', 
      label: 'MealPlan', 
      icon: 'calendar_today',
    },
    { 
      path: '/recipe', 
      label: 'Recipes', 
      icon: 'restaurant_menu',
    },
    { 
      path: '/families', 
      label: 'Families', 
      icon: 'group'
    },
  ];

  getIcon(link: any): string {
    return link.icon;
  }
  
}