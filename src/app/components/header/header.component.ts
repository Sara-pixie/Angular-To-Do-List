import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscribtion: Subscription;

  constructor(private uiService: UiService) {
    this.subscribtion = this.uiService.onToggle().subscribe((value) =>{
      this.showAddTask = value;
    });
   }

  ngOnInit(): void {
  }
  
  toggleAddTask(){
    this.uiService.toggleAddTask();
  }
}
