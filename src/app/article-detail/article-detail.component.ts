import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Article } from '../article';
import {AuthService} from '../auth.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  // article: Article = { id: '', title: '', content: '', subtitle: '', art_type: '', created_at: null, updated_at: null };
  article: any = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private auth: AuthService) { }


  getArticleDetails(_id: any) {
    this.api.getArticle(_id)
      .subscribe((data: any) => {
        // this.article = data.article;
        this.article.push(data.article);
        console.log('data:', this.article);
        this.isLoadingResults = false;
      });
  }

  deleteArticle(_id) {
    this.isLoadingResults = true;
    this.api.deleteArticle(_id)
      .subscribe(res => {
          console.log(res);
          this.isLoadingResults = false;
          this.router.navigate(['/articles']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnInit() {
    if (this.auth.isUserLoggedIn() == true) {
      this.getArticleDetails(this.route.snapshot.params._id);
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
