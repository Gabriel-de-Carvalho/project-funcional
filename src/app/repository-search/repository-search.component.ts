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
  repositoryId = '';
  items: any[] = [];

  constructor(private http: HttpClient) {}

  onInputSearchString(event: KeyboardEvent) {
    this.searchString = (event.target as HTMLInputElement).value;
  }

  onInputRepositoryId(event: KeyboardEvent) {
    this.repositoryId = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {}

  disableButton() {
    return this.modality == 'labels'
      ? this.repositoryId == ''
        ? true
        : false
      : false;
  }

  getCollectionsGitHubApi() {
    this.http
      .get<searchItems>(
        'https://api.github.com/search/' +
          this.modality +
          '?q=' +
          this.searchString +
          (this.modality == 'labels'
            ? 'a&repository_id=' + this.repositoryId
            : '')
      )
      .subscribe((resultado) => {
        // (this.items = Object.values(groupBy(resultado.items, this.modality))),
        this.items = (distinct(resultado.items, this.modality));
        console.log(this.items);
      });
  }
}
