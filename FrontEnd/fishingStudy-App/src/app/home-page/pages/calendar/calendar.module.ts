import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { PrimengModule } from '../../../primeng/primeng.module';
import { MaterialModule } from 'src/app/material/material/material.module';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { CalendarComponent } from './calendar/calendar.component';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { EventsSettingComponent } from './pages/events-setting/events-setting.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    CalendarComponent,
    ViewCalendarComponent,
    EventsSettingComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    PrimengModule,
    FullCalendarModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule
  ]
})
export class CalendarModule { }
