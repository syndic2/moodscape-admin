import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public editorContent: string;

  constructor(private titleService: Title, private snackBar: MatSnackBar) {
    this.titleService.setTitle('Kelola Artikel');
  }

  ngOnInit(): void {
    this.snackBar.open('Snackbar is working!');
  }

  editorChanged(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor got changed', event);

    this.editorContent= event.editor.root.innerHTML;
  }
}
