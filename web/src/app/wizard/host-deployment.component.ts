import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrWizard, ClrWizardModule, ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-host-deployment',
  templateUrl: './host-deployment.component.html',
  styleUrls: ['./host-deployment.component.scss'],
  standalone: true,
  imports: [CommonModule, ClrWizardModule, ClrFormsModule, FormsModule, ClarityModule], // Ensure FormsModule is included
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
      hosts: [],
    };
    console.log('HODOR');
    console.log(this.model.hosts);
  }

  selectVendor(vendor: string): void {
    this.model.selectedVendor = vendor;
  }

  doFinish(): void {
    this.doReset();
  }

  newHostInput: any = { iloIpAddr: '', username: '', password: '' };
  addHost(): void {
    // Ensure the hosts array exists
    if (!Array.isArray(this.model.hosts)) {
      this.model.hosts = [];
    }


    console.log(this.newHostInput);

    // Add the new host to the hosts array
    this.model.hosts.push({
      iloIpAddr: this.newHostInput.iloIpAddr,
      username: this.newHostInput.username,
      password: this.newHostInput.password,
    });

    // Reset the input fields for the next host
    this.newHostInput = { iloIpAddr: '', username: '', password: '' };

    console.log(this.model.hosts);
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


  // import funcs to handle bulk import of hosts

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  importHostsFromCSVToGroup() {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      console.log('Selected file:', file.name);

      // Call readCSVFile and handle the Promise
      this.readCSVFile(file).then((parsedData) => {
        console.log('Parsed Host Data:', parsedData);


        parsedData.forEach((host) => {

          // Add the new host to the hosts array
          this.model.hosts.push({
            iloIpAddr: host.iloIpAddr,
            username: host.username,
            password: host.password,
          });

                   
        });


      }).catch((error) => {
        console.error('Error:', error);
        // Handle error, such as showing a notification to the user
      });
    }
  }

  readCSVFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvContent = e.target?.result as string;

        try {
          const parsedData = this.parseCSV(csvContent);
          resolve(parsedData); // Resolve with parsed data
        } catch (error) {
          reject('Error parsing CSV: ' + error); // Reject if there's an error parsing
        }
      };

      reader.onerror = (error) => {
        reject('Error reading file: ' + error); // Reject if there's an error reading the file
      };

      reader.readAsText(file);
    });
  }
  // Parses CSV string into an array of objects matching the form structure
  parseCSV(csv: string): any[] {
    const lines = csv.split('\n').map(line => line.trim()).filter(line => line);
    const headers = lines[0].split(',').map(h => h.trim()); // Extract headers

    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const formGroup = {};

        // Dynamically map values to the formGroup based on the header fields
        headers.forEach((header, index) => {
          let value = values[index] || ''; // Default to empty string if no value
          formGroup[header] = value;

        });

        // Push the formGroup into the data array
        data.push(formGroup);
      }
    }
    return data;
  }


}
