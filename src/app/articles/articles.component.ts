import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../api.service';
import {Article} from '../article';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})


export class ArticlesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'created_at', 'updated_at'];
  data;
  check;
  isLoadingResults = true;

  constructor(private api: ApiService, private auth: AuthService,  private router: Router) { }


  ngOnInit() {
    if (this.auth.isUserLoggedIn() == true) {
      this.api.getArticles()
        .subscribe((res: any) => {
          this.data = res.articles;
          console.log(this.data);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
