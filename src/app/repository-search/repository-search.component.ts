import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { groupBy, distinct } from '../../utils/utils';
import { searchItems } from 'src/interface/resultado';

@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.css'],
})
export class RepositorySearchComponent implements OnInit {
  searchString = '';
  modality = '';

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
        (resultado) => console.log(groupBy(resultado.items, this.modality))
      );
  }
}