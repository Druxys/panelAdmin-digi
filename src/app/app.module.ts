import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatDialogModule, MatProgressBarModule, MatListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {FileSelectDirective} from 'ng2-file-upload';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadComponent } from './file-upload/file-upload.component';


const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { title: 'List of Articles' }
  },
  {
    path: 'article-details/:id',
    component: ArticleDetailComponent,
    data: { title: 'Article Details' }
  },
  {
    path: 'article-add',
    component: ArticleAddComponent,
    data: { title: 'Add Article' }
  },
  {
    path: 'article-edit/:id',
    component: ArticleEditComponent,
    data: { title: 'Edit Article' }
  },
  { path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FileSelectDirective,
    LoginComponent,
    SignupComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    MatFormFieldModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot(),
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: function  tokenGetter() {
    //       return     localStorage.getItem('token'); },
    //     whitelistedDomains: ['localhost:3000'],
    //     blacklistedRoutes: ['http://localhost:3000/users/login']
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
