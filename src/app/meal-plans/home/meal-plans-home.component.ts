import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Day {
  image: string;
  weekday: string;
  willAttend: boolean;
  attendees: string[];
}
@Component({
  selector: 'MealPlansHome',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: any[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const url: string = "assets/data.json";
    this.http.get<{ days: Day[] }>(url).subscribe((response: any) => {
      this.days = response.days;
    });
    console.log(this.days)
  }

}
