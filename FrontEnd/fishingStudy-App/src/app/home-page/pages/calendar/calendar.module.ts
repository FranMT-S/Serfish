import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReactiveFormsModule } from '@angular/forms';


import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MaterialModule } from 'src/app/material/material/material.module';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { EventsSettingComponent } from './pages/events-setting/events-setting.component';


FullCalendarModule.registerPlugins([ 
  dayGridPlugin
]);

@NgModule({
  declarations: [
    CalendarComponent,
    ViewCalendarComponent,
    EventsSettingComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CalendarModule { }
