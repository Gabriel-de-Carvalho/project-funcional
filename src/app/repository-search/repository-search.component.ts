import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';

import { searchItems } from 'src/interface/resultado';
import { compose, distinct, groupBy } from 'src/utils/utils';


@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.css'],
})
export class RepositorySearchComponent implements OnInit {
  searchString = '';
  modality = '';
  items: any[] = [];

  constructor(private http: HttpClient) {}

  onKeyInput(event: KeyboardEvent) {
    this.searchString = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {}

  showJavaRepository() {
    console.log('teste');
    console.log("oi")
    this.http
      .get<searchItems>(
        'https://api.github.com/search/' +
          this.modality +
          '?q=' +
          this.searchString
      )
      .subscribe(
        (resultado) =>
        this.items = Object.values(groupBy(resultado.items, this.modality)),

      );
  }
}
