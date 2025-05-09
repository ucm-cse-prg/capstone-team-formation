import { Component } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-skill-meter',
  imports: [MatProgressBarModule,
            MatTooltipModule],
  templateUrl: './skill-meter.component.html',
  styleUrl: './skill-meter.component.scss'
})
export class SkillMeterComponent {

}
