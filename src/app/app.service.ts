import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private http: HttpClient) { }

getPosts() {
  return this.http.get('http://localhost:3000/posts');
}

updatePost(post) {
  return this.http.put(`http://localhost:3000/posts/${post.id}`, post);
}

}
