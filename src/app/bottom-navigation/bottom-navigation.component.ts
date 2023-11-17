import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      iconInactive: '../../assets/icons/home_black_24dp.svg',
      iconActive: '../../assets/icons/home_white_24dp.svg' 
    },
    { 
      path: '/mealplanshome', 
      label: 'MealPlan', 
      iconInactive: '../../assets/icons/calendar_today_black_24dp.svg',
      iconActive: '../../assets/icons/calendar_today_white_24dp.svg'
    },
    { 
      path: '/recipe', 
      label: 'Recipes', 
      iconInactive: '../../assets/icons/restaurant_menu_black_24dp.svg',
      iconActive: '../../assets/icons/restaurant_menu_white_24dp.svg' 
    },
    { 
      path: '/families', 
      label: 'Families', 
      iconInactive: '../../assets/icons/group_black_24dp.svg',
      iconActive: '../../assets/icons/group_white_24dp.svg' 
    },
  ];

  constructor(private router: Router) {}

  isActiveLink(link: any): boolean {
    return this.router.isActive(link.path, true);
  }
}