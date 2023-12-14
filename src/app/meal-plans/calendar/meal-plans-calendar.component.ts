import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { SupabaseService } from "../../services/supabase.service";

interface Day {
  date: string;
  clicked: boolean;
  past: boolean;
}

@Component({
  selector: 'app-meal-plans-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-plans-calendar.component.html',
  styleUrls: ['./meal-plans-calendar.component.scss']
})
export class MealPlansCalendarComponent {
  dates: Day[] = [];
  attendanceDates: Day[] = [];
  family_id: string = "";
  nextMonthDates: Day[] = [];
  nextMonthAttendance: Day[] = [];

  constructor(private router: Router, private supabaseService: SupabaseService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.family_id = state?.['family_id'];
    console.log('family_id:', this.family_id);
  }

  isDateClicked(date: Day): boolean {
    return date.clicked;
  }

  async onDateClick(date: Day): Promise<void> {
    const user = await this.supabaseService.getUserId();
    if (date.clicked) {
      await this.supabaseService.removeAttendance(date.date, this.family_id, user.id);
      console.log("attendance removed");
    } else {
      await this.supabaseService.addAttendance(date.date, this.family_id, user.id);
      console.log("attendance added");
    }
    date.clicked = !date.clicked;
  }

  goBack(): void {
    this.router.navigate(['/mealplanshome']);
  }

  getDay(date: Day): number {
    const dateObject = new Date(date.date);
    return dateObject.getDate();
  }

  private getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  private generateDates(monthOffset: number): Day[] {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const lastDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();

    return Array.from({ length: lastDayOfMonth }, (_, index) => {
      const day = index + 1;
      const dateStr = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${day}`;
      const date = new Date(dateStr);

      return {
        date: dateStr,
        clicked: false,
        past: date < today,
      };
    });
  }

  async ngOnInit(): Promise<void> {
    const user = await this.supabaseService.getUserId();

    // Generate current month's dates
    this.dates = this.generateDates(0);

    // Fetch attendance for the current month
    await this.supabaseService.getAttendanceMonth(this.getCurrentDate(), this.family_id, user.id).then((data) => {
      this.attendanceDates = data[0] as Day[];
    });

    // Update clicked status and past status for the current month
    for (const attendanceDate of this.attendanceDates) {
      const dayIndex = +attendanceDate.date.split('-')[2] - 1;
      this.dates[dayIndex].clicked = attendanceDate.clicked;
    }
    for (const date of this.dates) {
      date.past = new Date(date.date) < new Date();
    }

    console.log("Current month's dates:", this.dates);

    // Generate next month's dates
     this.nextMonthDates = this.generateDates(1);
    console.log("Next month's dates (before fetching attendance):", this.nextMonthDates);

    await this.supabaseService.getAttendanceMonth(this.getNextMonthDate(), this.family_id, user.id).then((data) => {
      this.nextMonthAttendance = data[0] as Day[];
    });

    // Update clicked status for the next month
    for (const attendanceDate of this.nextMonthAttendance) {
      const dayIndex = +attendanceDate.date.split('-')[2] - 1;
      this.nextMonthDates[dayIndex].clicked = attendanceDate.clicked;
    }
    for (const date of this.nextMonthDates) {
      date.past = new Date(date.date) < new Date();
    }
    console.log("Next month's dates (after fetching attendance):", this.nextMonthDates);
  }

  private getNextMonthDate(): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    return nextMonth.toISOString().split('T')[0];
  }

}
