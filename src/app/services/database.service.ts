import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  posts = new BehaviorSubject([]);
  categories = new BehaviorSubject([])

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'database.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        })
    });
  }

  seedDatabase() {
    this.http.get('assets/categories.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadCategories();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });

    this.http.get('assets/posts.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadPosts();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  loadPosts() {
    return this.database.executeSql('Select * from posts', [])
      .then(data => {
        let posts: any[] = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            posts.push({
              id: data.rows.item(i).id,
              date: data.rows.item(i).date,
              title_rendered: data.rows.item(i).title_rendered,
              content_rendered: data.rows.item(i).content_rendered,
              author: data.rows.item(i).author,
              featured_media: data.rows.item(i).featured_media,
              categories: data.rows.item(i).categories,
              tags: data.rows.item(i).tags
            });
          }
        }
        this.posts.next(posts);
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getCategories(): Observable<any[]> {
    return this.categories.asObservable();
  }

  getPosts(): Observable<any[]> {
    return this.posts.asObservable();
  }
}
