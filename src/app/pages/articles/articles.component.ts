import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articleForm: FormGroup;
  public editorContent: string;

  constructor(private titleService: Title, private formBuilder: FormBuilder) {
    this.titleService.setTitle('Kelola Artikel');
    this.articleForm= this.formBuilder.group({
      title: [''],
      shortSummary: [''],
      author: [''],
      postedAt: [''],
      reviewedBy: [''],
      headImg: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
  }

  editorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.editorContent= event.editor.root.innerHTML;
  }

  onSubmit() {
    console.log(this.articleForm.value);
  }
}
