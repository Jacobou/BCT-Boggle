import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordListService {
  private wordList: Set<string> = new Set<string>();

  constructor(private http: HttpClient) { }

  loadWordList(): Observable<void> {
    return this.http.get('assets/word-list-library/english.txt', { responseType: 'text' })
      .pipe(
        map(data => {
          const words: string[] = data.split('\n').map(word => word.trim().toUpperCase());
          this.wordList = new Set(words);
        })
      );
  }

  isValidWord(word: string): boolean {
    return this.wordList.has(word.toUpperCase());
  }
}
