import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { EventsSettingComponent } from './pages/events-setting/events-setting.component';
import { EventListComponent } from './pages/event-list/event-list.component';

const routes: Routes = [
  {
    path:"",
    component:CalendarComponent,
    children:[
      {
        path:"",
        component:ViewCalendarComponent,
        
      },
      {
        path:"view-calendar",
        component:ViewCalendarComponent,
        
      },
      {
        path:"event-setting",
        component:EventsSettingComponent
      },
      {
        path:"event-list",
        component:EventListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
