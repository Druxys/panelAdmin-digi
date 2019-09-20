import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleAddComponent} from './article-add/article-add.component';
import {ArticleEditComponent} from './article-edit/article-edit.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { title: 'List of Articles' }
  },
  {
    path: 'article-details/:_id',
    component: ArticleDetailComponent,
    data: { title: 'Article Details' }
  },
  {
    path: 'article-add',
    component: ArticleAddComponent,
    data: { title: 'Add Article' }
  },
  {
    path: 'article-edit/:_id',
    component: ArticleEditComponent,
    data: { title: 'Edit Article' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'SignUp' }
  },
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [ArticlesComponent, ArticleDetailComponent, ArticleAddComponent, ArticleEditComponent,
  LoginComponent, SignupComponent, ];
