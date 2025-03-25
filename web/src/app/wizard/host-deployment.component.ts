import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrWizard, ClrWizardModule, ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-host-deployment',
  templateUrl: './host-deployment.component.html',
  styleUrls: ['./host-deployment.component.scss'],
  standalone: true,
  imports: [CommonModule, ClrWizardModule, ClrFormsModule, FormsModule,ClarityModule],
})
export class HostDeploymentComponent implements OnInit {
  @ViewChild('wizard', { static: true }) wizard: ClrWizard | undefined;

  open = false;
  model: any;

  ngOnInit() {
    this.model = {
      forceReset: true,
      useSameCreds: false,
      favoriteColor: '',
      luckyNumber: '',
      flavorOfIceCream: '',
      iloIpAddr: '',
    };
  }

  selectVendor(vendor: string): void {
    this.model.selectedVendor = vendor;
  }

  doFinish(): void {
    this.doReset();
  }

  doReset(): void {
    if (this.model.forceReset) {
      this.wizard?.reset();
      this.model.forceReset = true;
      this.model.favoriteColor = '';
      this.model.luckyNumber = '';
      this.model.flavorOfIceCream = '';
    }
  }
}
