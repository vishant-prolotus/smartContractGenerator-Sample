import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router}  from '@angular/router';
import * as config from '../../../../../../config/config';
import {NgForm} from '@angular/forms';

declare var $;
@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
})
export class ManageCustomerComponent implements OnInit {
  User_data;
  dashboard;
  model;
  message;
  Customer;
  cnfrmDeleteID;
  constructor(public http: Http,public router: Router) { 
    this.model = {};
  }

  ngOnInit() {
    this.User_data = JSON.parse(localStorage.getItem('User'));
    if(this.User_data) {
      
      let obj = {
        id:this.User_data.idUsers
      }
      this.http.post('//'+config.global_ip+'/auth/customer',obj).subscribe((res:any)=>{
        this.Customer = JSON.parse(res._body).res;
      },(err)=>{
        this.message='Data Not Found';
        $('#message').modal('toggle');
      });
  }else{
      console.log('ll');
  }
  }

  changeModal(e) {
    this.model = e;
  }

  AddCustomer() {
    let self = this;
    $('#myModal1').modal('toggle');
    this.model.type='Customer';
    this.http.post('//'+config.global_ip+'/auth/signup',this.model).subscribe((res:any)=>{
      this.model = {};
      var result = JSON.parse(res._body);
      if(result.status==200) {
          self.ngOnInit();
      }
    },(err)=>{
      this.message='Registration UnSucessfull';
      $('#message').modal('toggle');
    });

  }

  EditCustomer() {
    let self = this;
    $('#myModal3').modal('toggle');
    this.http.post('//'+config.global_ip+'/auth/update',this.model).subscribe((res:any)=>{
      this.model = {};
      var result = JSON.parse(res._body);

      if(result.status==200) {
          self.ngOnInit();
      }
      },(err)=>{
        this.message='Table Not Found';
        $('#message').modal('toggle');
      });
  }

  ConfirmDelete(id) {
    $('#cnfrmDelete').modal('toggle');
    this.cnfrmDeleteID = id;
  }

  DeleteCustomer() {
    let self = this;
    let obj ={
      id:this.cnfrmDeleteID 
    }
    this.http.post('//'+config.global_ip+'/auth/delete',obj).subscribe((res:any)=>{
      var result = JSON.parse(res._body);
      
      if(result.status==200) {
          self.ngOnInit();
      }
      },(err)=>{
        this.message='Table Not Found';
        $('#message').modal('toggle');
      });
  }

  formreset(f:NgForm) {
    f.resetForm();
  }

}
