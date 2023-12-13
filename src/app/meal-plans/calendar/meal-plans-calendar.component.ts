import {Component} from "@angular/core";
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";


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
  /* dates_: Day[] = [
    { date: new Date(2023, 0, 1), clicked: false },
    { date: new Date(2023, 0, 2), clicked: true },
    { date: new Date(2023, 0, 3), clicked: true },
    { date: new Date(2023, 0, 4), clicked: false },
    { date: new Date(2023, 0, 5), clicked: false },
    { date: new Date(2023, 0, 6), clicked: false },
    { date: new Date(2023, 0, 7), clicked: true },
    { date: new Date(2023, 0, 8), clicked: false },
  ]; */
  dates: Day[] = [];
  attendanceDates: Day[] = [];
  family_id: String = "";

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
    this.router.navigate(['/mealplanshome']); // Replace with the actual route
  }

  getDay(date: Day): number {
    const dateObject = new Date(date.date);
    return dateObject.getDate();
  }

  private getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  async ngOnInit(): Promise<void> {
    const user = await this.supabaseService.getUserId();
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    this.dates = Array.from({length: lastDayOfMonth}, (_, index) => {
      const day = index + 1;
      const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${day}`;
      const date = new Date(dateStr);

      return {
        date: dateStr,
        clicked: false,
        past: date < today, // Check if the date is in the past
      };
    });
    console.log("check:", this.dates);


    await this.supabaseService.getAttendanceMonth(this.getCurrentDate(), this.family_id, user.id).then((data) => {
      this.attendanceDates = data[0] as Day[];
      console.log("days:", this.dates);
    });

    for (const attendanceDate of this.attendanceDates) {
      const date = attendanceDate.date;
      const dayIndex = +date.split('-')[2] - 1; // Extract day and convert to number
      this.dates[dayIndex].clicked = attendanceDate.clicked;
    }
    for (const date of this.dates) {
      date.past = new Date(date.date) < today;
    }
    console.log("days final:", this.dates);

  }
}