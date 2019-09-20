import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: any = [];
  matcher = new MyErrorStateMatcher();
  articleForm: FormGroup;
  _id = '';
  title = '';
  subtitle = '';
  art_type = '';
  content = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getArticle(this.route.snapshot.params._id);
    this.articleForm = this.formBuilder.group({
      title : ['', Validators.required],
      content : ['', Validators.required],
      subtitle : ['', Validators.required],
      art_type : ['', Validators.required],
    });
  }

  getArticle(_id: any) {
    this.api.getArticle(_id)
      .subscribe((data: any) => {
        // this.article = data.article;
        this.article.push(data.article);
        console.log('data:', this.article);
        this.isLoadingResults = false;
        this.articleForm.setValue({
          title: data.article.title,
          content: data.article.content,
          subtitle: data.article.subtitle,
          art_type: data.article.art_type,
        });
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log(this.articleForm.value);
    this.api.updateArticle(this.route.snapshot.params._id, this.articleForm.value)
      .subscribe((res: any) => {
          const id = this.route.snapshot.params._id;
          this.isLoadingResults = false;
          this.router.navigate(['/article-details', this.route.snapshot.params._id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  articleDetails() {
    this.router.navigate(['/article-details', this.route.snapshot.params._id]);
  }
}
