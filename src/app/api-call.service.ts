import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  sp_URL =environment.sp_URL;
  digestValue = '';
  constructor(private http: HttpClient) { }


  getDigestValue() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;odata=verbose',
        'accept': 'application/json;odata=verbose',
      })
    };
    this.http.post(this.sp_URL + "_api/contextinfo", '', httpOptions).subscribe((res) => {
      if (res != null && res != '') {
        let resultSet = res as any;
        this.digestValue = resultSet.d.GetContextWebInformation.FormDigestValue;
      }
    });
  }
  getUserName() {
    return this.http.get(this.sp_URL + '_api/Web/CurrentUser', { headers: { Accept: 'application/json;odata=verbose' } })
  }

  /*getReportsListItems() {
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('Reports')/items?$select=Title,ShortDescriptio,PublicationDate,ID&$orderby=ID", { headers: { Accept: 'application/json;odata=verbose' } })
  }*/
  
  getAllExternalReportsListItem(){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('Reports')/items?$select=Title,ShortDescriptio,PublicationDate,ID,Authors,Industry,BusinessUnit,Market&$orderby=PublicationDate desc&$filter=(ReportType eq 'External')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getAllInternalReportsListItem(){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('Reports')/items?$select=Title,ShortDescriptio,PublicationDate,ID,Authors,Industry,BusinessUnit,Market&$orderby=PublicationDate desc&$filter=(ReportType eq 'Internal')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getAllFavourites(emailAddress: string){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('FavReports')/items?$select=Title,ShortDescriptio,PublicationDate,ID,Authors,Industry,BusinessUnit,Market,ReportID&$orderby=PublicationDate desc&$filter=(EmailAccount eq '"+emailAddress+"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getFavorites(emailAddress: string, id: number){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('FavReports')/items?$select=Title,ShortDescriptio,PublicationDate,ID,ReportID&$orderby=PublicationDate desc&$filter=(EmailAccount eq '"+emailAddress+"') and (ReportID eq'"+ id +"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getAllReportsListItem(){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('Reports')/items?$select=Title,ShortDescriptio,PublicationDate,ID,Authors,Industry,BusinessUnit,Market&$orderby=PublicationDate desc", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getReportDetails(id: number) {
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('Reports')/items?$select=*&$filter=(ID eq '"+ id +"')&$expand=AttachmentFiles", { headers: { Accept: 'application/json;odata=verbose' } })
  }
  getAllNewsListItem(){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('News')/items?$select=Title,Heading,Paragraph,FileName,ID", { headers: { Accept: 'application/json;odata=verbose' } })
  }
  getNewsDetails(id: number) {
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('News')/items?$select=*&$filter=(ID eq '"+ id +"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }
  getNewsAllFavorites(emailAddress: string){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('FavNews')/items?$select=Title,Heading,Paragraph,ID,NewsID&$filter=(EmailAccount eq '"+emailAddress+"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }
  getNewsFavorites(emailAddress: string, id: number){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('FavNews')/items?$select=Title,Heading,Paragraph,ID,NewsID&$filter=(EmailAccount eq '"+emailAddress+"') and (NewsID eq'"+ id +"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getComments(id: number,page:string) {
    if(page == 'Reports'){
      return this.http.get(this.sp_URL +"_api/web/lists/getbytitle('Reports')/items('"+id+"')/Comments", { headers: { Accept: 'application/json;odata=verbose' } })
    }
    else{
      return this.http.get(this.sp_URL +"_api/web/lists/getbytitle('News')/items('"+id+"')/Comments", { headers: { Accept: 'application/json;odata=verbose' } })
    }
    
  }

  getDownloadFile(relativeURLPath: string){
    const fileUrl = this.sp_URL +"/_api/web/getfilebyserverrelativeurl('"+relativeURLPath+"')/$value";
    const headers = new HttpHeaders({
      'Accept': 'application/json;odata=verbose'
    });
    return this.http.get(fileUrl, { headers: headers, responseType: 'blob' }).pipe(
      map((res: Blob) => res),
      catchError(error => throwError(error))
    );
    //return this.http.get(this.sp_URL +"_api/web/GetFileByServerRelativeUrl('"+relativeURLPath+"')", { headers: { Accept: 'application/json;odata=verbose' } })
  }

  getUsers(){
    return this.http.get(this.sp_URL +"_api/web/siteusers?$select=Title,Email", { headers: { Accept: 'application/json;odata=verbose' } });
  }

  getReportURL(name: string){
    return this.http.get(this.sp_URL + "_api/web/lists/getByTitle('ReportLinks')/items?$select=Title,URL&$filter=(Title eq '" + name +"')", { headers: { Accept: 'application/json;odata=verbose' } });
  }

  addComments(id: number, userEmailsToMention: any , comments: string,page:string) {
    let visitlink= (page == 'Reports')?"Visit https://majidalfuttaim.sharepoint.com/sites/SIBUReport/Report/index.aspx/detail-page?id="+ id:"Visit https://majidalfuttaim.sharepoint.com/sites/SIBUReport/News/index.aspx/detail-page?id="+ id;
    comments = comments + visitlink ;
    var commentProperties = {
      "__metadata": {
        "type": "Microsoft.SharePoint.Comments.comment"
      },
      "text": comments,
      "mentions": {
        "__metadata": {
          "type" : "Collection(Microsoft.SharePoint.Comments.Client.Identity)"
        },
        results: userEmailsToMention
      }
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;odata=verbose',
        'accept': 'application/json;odata=verbose',
        'X-RequestDigest': this.digestValue
      })
    };
    if(page == 'Reports'){

      return this.http.post(this.sp_URL +"_api/web/lists/getbytitle('Reports')/items('"+id+"')/Comments",  commentProperties, httpOptions)
    }
    else{
      return this.http.post(this.sp_URL +"_api/web/lists/getbytitle('News')/items('"+id+"')/Comments",  commentProperties, httpOptions)
    }
   
  }

  searchFreeText(queryText: string){
    return this.http.get(this.sp_URL + "_api/search/query?querytext='"+  queryText +" Path:https://majidalfuttaim.sharepoint.com/sites/SIBUReport/Lists/Reports'&selectproperties='ListItemID'", { headers: { Accept: 'application/json;odata=nometadata' } });
  }
  searchNewsFreeText(queryText: string){
    return this.http.get(this.sp_URL + "_api/search/query?querytext='"+  queryText +" Path:https://majidalfuttaim.sharepoint.com/sites/SIBUReport/Lists/News'&selectproperties='ListItemID'", { headers: { Accept: 'application/json;odata=nometadata' } });
  }

  addFavorites(item: any, email: string,page:string){
    if( page == 'Reports'){
      let parameter = {
        '__metadata': {
          'type': 'SP.Data.FavReportsListItem'
        },
        'Title': item.Title,
        'ShortDescriptio': item.ShortDescriptio,
        'PublicationDate': item.PublicationDate,
        'ReportID': item.ID,
        'Authors' : item.Authors,
        'Industry':item.Industry,
        'Market':item.Market,
        'BusinessUnit':item.BusinessUnit,
        'EmailAccount': email.toLowerCase()
      };
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;odata=verbose',
          'accept': 'application/json;odata=verbose',
          'X-RequestDigest': this.digestValue
        })
      };
      return this.http.post(this.sp_URL + "_api/web/lists/getByTitle('FavReports')/items", parameter, httpOptions);
    }
    else{
      let parameter = {
        '__metadata': {
          'type': 'SP.Data.FavNewsListItem'
        },
        'Title': item.Title,
        'Heading': item.Heading,
        'Paragraph': item.Paragraph,
        'NewsID': item.ID,
        'EmailAccount': email.toLowerCase()
      };
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;odata=verbose',
          'accept': 'application/json;odata=verbose',
          'X-RequestDigest': this.digestValue
        })
      };
      return this.http.post(this.sp_URL + "_api/web/lists/getByTitle('FavNews')/items", parameter, httpOptions);
    }
    
  }
}
