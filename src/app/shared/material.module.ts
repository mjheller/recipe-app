import { NgModule } from "@angular/core";

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
    exports: [
        MatCardModule, 
        MatToolbarModule, 
        MatDividerModule, 
        MatIconModule, 
        MatButtonModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule,
        MatSliderModule,
    ]
})

export class MaterialModule {}