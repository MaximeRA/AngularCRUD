import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from "./user";
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class UserService {

  //private host = localhost;
  private usersURL = `http://localhost:8000/api/clients`;
  private headers = new Headers({'Accept': 'application/json'});

  constructor(private http: Http) {
  };

  /**
   * Return all users
   * @returns {Promise<User[]>}
   */


  getUsers(): Promise<User[]> {
    let options = new RequestOptions({ headers: this.headers});
      return this.http.get(this.usersURL, options)
      .toPromise()
      .then(response => {
        return response.json() as User[];
      })
      .catch(this.handleError);
  }


  /**
   * Returns user based on id
   * @param id:string
   * @returns {Promise<User>}
   */
  getUser(id: string): Promise<User> {
    const url = `${this.usersURL}/${id}`+'.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  /**
   * Adds new user
   * @param user:User
   * @returns {Promise<User>}
   */
  add(user: User): Promise<User>{
    return this.http.post(this.usersURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError)
  }

  /**
   * Updates user that matches to id
   * @param user:User
   * @returns {Promise<User>}
   */
  update(user: User): Promise<User>{
    return this.http.put(`${this.usersURL}/${user._id}`, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError)
  }

  /**
   * Removes user
   * @param id:string
   * @returns {Promise<User>}
   */
  remove(id: string): Promise<any>{
    return this.http.delete(`${this.usersURL}/${id}`)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError)
  }

  /**
   * Handles error thrown during HTTP call
   * @param error:any
   * @returns {Promise<never>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
