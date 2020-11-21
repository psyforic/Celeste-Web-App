import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  animations: [appModuleAnimation()]
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
