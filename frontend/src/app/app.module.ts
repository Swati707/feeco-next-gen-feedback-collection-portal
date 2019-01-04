import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { EditformComponent } from './components/editform/editform.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router'
import { MatDialogModule } from "@angular/material/dialog";
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatTableModule, MatGridListModule,MatSliderModule, MatStepperModule, MatExpansionModule, MatTabsModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSelectModule, MatProgressSpinnerModule, } from '@angular/material';
import { CopyFormComponent } from './components/copy-form/copy-form.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormCreatorService } from "./services/form-creator.service"
import { FormService } from "./services/form.service"
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    EditformComponent,
    CreateFormComponent,
    CopyFormComponent,
    SigninComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule, MatTableModule,
    MatButtonModule,MatGridListModule,
    MatRadioModule, MatSelectModule, MatListModule,
    MatCardModule, MatExpansionModule, MatStepperModule, MatSliderModule,
    MatProgressSpinnerModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatIconModule,
    MatCheckboxModule, MatToolbarModule,
    RouterModule.forRoot([
      { path: '', component: SigninComponent },
      { path: 'creator', component: MainPageComponent },
      { path: 'form/:id', component: EditformComponent },
      // {path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [FormCreatorService, FormService],
  bootstrap: [AppComponent],
  entryComponents: [CreateFormComponent, CopyFormComponent]
})
export class AppModule { }
