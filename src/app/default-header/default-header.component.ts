import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-default-header',
  //templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  template: `<h1> {{title}}</h1>
  <p class="flush-text">{{subtitle}}</p>
  `
})
export class DefaultHeaderComponent {
    @Input() title="No title set yet";
    @Input() subtitle="No subtitle";
    
}
