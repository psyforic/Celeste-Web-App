import { TopNavTitleService } from './../../shared/services/top-nav-title.service';
import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as Chartist from 'chartist';
import { CelesteDashboardServiceProxy, ModeStatsDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  providers: [CelesteDashboardServiceProxy]
})
export class HomeComponent extends AppComponentBase implements OnInit {
  modeNames = [];
  modeCount = new Array<number>(5).fill(0, 0, 5);
  modes: ModeStatsDto[] = [];
  isLoading = false;
  constructor(
    injector: Injector,
    private dashBoardService: CelesteDashboardServiceProxy,
    private _topNavTitleService: TopNavTitleService,
  ) {
    super(injector);
    this._topNavTitleService.setTitle('Dashboard');
  }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.isLoading = true;
    this.dashBoardService.getWeeklyModes()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((res) => {
        this.modes = res.items;
        if (this.modes.length > 0) {
          this.modes.forEach((mode, index) => {
            this.modeNames[index] = mode.name;
            this.modeCount[index] = mode.count;
          });
        }
      });
  }

}
