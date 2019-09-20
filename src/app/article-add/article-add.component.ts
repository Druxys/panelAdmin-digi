import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ImgService } from '../img.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatDialogRef} from '@angular/material';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// export interface TypeArticle {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  selectedFile = null;
  matcher = new MyErrorStateMatcher();
  articleForm: FormGroup;
  title = '';
  art_type: '';
  subtitle = '';
  content = '';
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title : [null, Validators.required],
      subtitle : [null, Validators.required],
      art_type : [null, Validators.required],
      content : [null, Validators.required],
    });
  }

  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   this.http.post('localhost')
  // }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log(this.articleForm.value);
    this.api.addArticle(this.articleForm.value)
      .subscribe((res: any) => {
        console.log(res);
        const id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(['/articles']);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
