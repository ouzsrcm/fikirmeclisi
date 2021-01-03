import { Component, OnInit } from '@angular/core';
import { ConnectionStatus, NetworkService } from 'src/app/services/network.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private posts:PostsService, private networkService:NetworkService) { }

  ngOnInit() {
    debugger;
    var res = this.posts.get(false);
    console.log(res);
  }

}
