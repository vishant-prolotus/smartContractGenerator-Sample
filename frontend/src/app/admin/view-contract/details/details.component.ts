import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute}  from '@angular/router';
import * as config from '../../../../../../config/config';
import {Location} from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
})
export class ViewContractDetailComponent implements OnInit {
  ContractID;
  ContractDetails;

  constructor(public route: ActivatedRoute,public router: Router,public http: Http,private _location: Location) {
    this.route.queryParams.subscribe(params => {
      this.ContractID = params["contractID"];
    });
   }

  ngOnInit() {
    this.http.post('//'+config.global_ip+'/pdf/getContractById',{id:this.ContractID}).subscribe((res:any)=>{
      var contract_details = JSON.parse(res._body).res;
      this.ContractDetails = contract_details[0];
      console.log(this.ContractDetails);
     },(err)=>{
      console.log(err);
     });
  }

  backClicked() {
    this._location.back();
  }


}
