import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-dhcp-pools',
  templateUrl: './manage-dhcp-pools.component.html',
  styleUrls: ['./manage-dhcp-pools.component.scss']
})
export class ManageDhcpPoolsComponent implements OnInit {
  pool;
  pools;
  errors;
  form: FormGroup;
  showPoolModalMode = "";

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      net_address: ['', [Validators.required]],
      netmask: ['', [Validators.required]],
      name: ['', [Validators.required]],
      start_address: ['', [Validators.required]],
      end_address: ['', [Validators.required]],
      gateway: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService.getPools().subscribe((data: any) => {
      this.pools = data;
    });
  }


  showPoolModal(mode, id = null) {
    this.showPoolModalMode = mode;
    if (mode === "edit") {
      this.pool = this.pools.find(pool => pool.id === id);
      this.form.patchValue({
        ...this.pool,
      });
    }
    if (mode === "add") {
      this.form.reset();
    }
  }


    @ViewChild('fileInput') fileInput!: ElementRef;
  
    triggerFileInput() {
      this.fileInput.nativeElement.click();
    }
  
    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        console.log('Selected file:', file.name);
        
        // Process the file (e.g., read content)
        this.readCSVFile(file);
      }
    }
  
    readCSVFile(file: File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target?.result;
        console.log('CSV Content:', csvContent);
        // Further processing of CSV content
      };
      reader.readAsText(file);
    }
  
  

  submit() {
    const data = {
      ...this.form.value,
      only_serve_reimage: true,
      lease_time: 7000,
    };

    this.apiService.addPool(data).subscribe((resp: any) => {
      if (resp.error) {
        this.errors = resp.error;
      }
      if (resp) {
        this.pools.push(resp);
        this.form.reset();
      }
    });

    this.showPoolModalMode = '';
  }

  remove(id) {
    this.apiService.deletePool(id).subscribe((data: any) => {
      this.pools = this.pools.filter(item => item.id !== id);
    }, (data: any) => {
      if (data.error) {
        this.errors = [data.error];
      }
    });
  }

  updatePool() {
    const data = {
      ...this.form.value,
      only_serve_reimage: true,
      lease_time: 7000,
    };

    this.apiService.updatePool(this.pool.id, data).subscribe((resp: any) => {
      if (resp.error) {
        this.errors = resp.error;
      }
      if (resp) {
        this.pools = this.pools.filter(item => item.id !== resp.id);
        this.pools.push(resp);
        this.showPoolModalMode = '';
      }
    });
  }
}
