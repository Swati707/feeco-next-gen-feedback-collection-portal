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
import { MatNativeDateModule, MatSnackBarModule, MatSlideToggleModule, MatTableModule, MatGridListModule, MatSliderModule, MatStepperModule, MatExpansionModule, MatTabsModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSelectModule, MatProgressSpinnerModule, } from '@angular/material';
import { CopyFormComponent } from './components/copy-form/copy-form.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormCreatorService } from "./services/form-creator.service"
import { FormService } from "./services/form.service"
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ResponseComponent } from './components/response/response.component';
import { ResponseViewComponent } from './components/response-view/response-view.component';
import { FormSettingsComponent } from './components/form-settings/form-settings.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    EditformComponent,
    CreateFormComponent,
    CopyFormComponent,
    SigninComponent,
    ResponseComponent,
    ResponseViewComponent,
    FormSettingsComponent,
    VerifyOtpComponent,
  ],
  imports: [
    NgbModule,
    AngularWebStorageModule,
    MatSlideToggleModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule, MatTableModule,
    MatButtonModule, MatGridListModule,
    MatRadioModule, MatSelectModule, MatListModule, MatSnackBarModule,
    MatCardModule, MatExpansionModule, MatCheckboxModule, MatStepperModule, MatSliderModule,
    MatProgressSpinnerModule, MatCheckboxModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatIconModule,
    MatCheckboxModule, MatToolbarModule,
    RouterModule.forRoot([
      { path: '', component: SigninComponent },
      { path: 'creator', component: MainPageComponent },
      { path: 'form/:_id', component: EditformComponent },
      { path: 'response/:_id', component: ResponseComponent },
      { path: 'response_view/:_id', component: ResponseViewComponent},
      { path: 'form_settings/:_id', component: FormSettingsComponent}
    ])
  ],
  providers: [FormCreatorService, FormService],
  bootstrap: [AppComponent],
  entryComponents: [CreateFormComponent, CopyFormComponent, VerifyOtpComponent]
})
export class AppModule { }
