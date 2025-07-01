import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class FaceDetectorService {
  private apiUrl = `${environment.baseHref}`;

  constructor(private http: HttpClient) {
  }


  compareFaces(selfie: File, idFace: File) {
    console.log('sending files to server');
    const formData = new FormData();
    formData.append('selfie', selfie);
    formData.append('idface', idFace);
    return this.http.post(`${this.apiUrl}/compare-faces`, formData);
  }

  getHello() {
    return this.http.get(`${this.apiUrl}`);
  }

}
