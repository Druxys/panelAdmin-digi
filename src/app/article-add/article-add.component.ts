import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {faUpload} from '@fortawesome/free-solid-svg-icons/faUpload';
import {AuthService} from '../auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  upload = faUpload;
  articleImage: File = null;
  matcher = new MyErrorStateMatcher();
  articleForm: FormGroup;
  title = [''];
  art_type: [''];
  subtitle = [''];
  content = [''];
  // articleImage = [''];
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isUserLoggedIn() == true) {
      this.articleForm = this.formBuilder.group({
        title : [null, Validators.required],
        subtitle : [null, Validators.required],
        art_type : [null, Validators.required],
        content : [null, Validators.required],
        // articleImage : [null]
      });
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.articleImage = event.target.files[0];
    }
  }

  onFormSubmit() {

    const formData = new FormData();
    formData.append('title', this.articleForm.get('title').value);
    formData.append('art_type', this.articleForm.get('art_type').value);
    formData.append('subtitle', this.articleForm.get('subtitle').value);
    formData.append('content', this.articleForm.get('content').value);
    formData.append('articleImage', this.articleImage);
    this.isLoadingResults = true;
    console.dir(this.articleForm.value);
    console.dir(formData);
    this.api.addArticle(formData)
      .subscribe((res) => {
        console.log(res);
        // const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/articles']);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
