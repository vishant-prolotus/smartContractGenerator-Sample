import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute}  from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as config from '../../../../../../config/config';
import {NgForm} from '@angular/forms';

declare var $;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
    contract;
    addTemplate;
    User_data;
    dashboard;
    templatestatus;
    message;
    Category;
    constructor(public router: Router,public http: Http,public route: ActivatedRoute) { 
      this.contract = {};
      this.route.queryParams.subscribe(params => {
        this.contract.id = params["idTemplates"];
        this.contract.Name=params["TemplateName"];
        this.contract.categoryName= params["Category_Name"];
        this.contract.Description = params["Description"];
        this.contract.status=params["Status"];
    });
    }
  
    ngOnInit() {
      var $radios = $('input:radio[name=statustemplate]');
      if($radios.is(':checked') === false) {
          $radios.filter('[value=1]').prop('checked', true);
          this.contract.status = '1';
      }
      this.User_data = JSON.parse(localStorage.getItem('User'));
      if(this.User_data) {

        this.http.post('//'+config.global_ip+'/ApI/retrieveCategory',{id:this.User_data.idUsers}).subscribe((res:any)=>{
          let abc = JSON.parse(res._body).res;
          this.Category = [];
          for(var i=0;i<abc.length;i++) {
            if(abc[i].Status==1) {
              this.Category.push(abc[i]);
            }
          }
         },(err)=>{
          this.message='Data Not Found';
          $('#message').modal('toggle');
          setTimeout(function(){ 
            $('#message').modal('toggle');
          }, 1000);
         });
    }else{
        console.log('ll');
    }
    }
  
    CreateTemplate() {
      let self = this;

      this.http.post('//'+config.global_ip+'/pdf/UpdateTemplate',this.contract).subscribe((res:any)=>{
        this.contract={};  
        var result = JSON.parse(res._body);
      
        if(result.status==200) {
          this.message='Template Created';
          $('#message').modal('toggle');
          setTimeout(function(){ 
            $('#message').modal('toggle');
            self.router.navigate(['/admin/manageTemplate']);
          }, 1000);
        }
        },(err)=>{
          this.message = 'Table Not Found';
        $('#message').modal('toggle');
        setTimeout(function(){ 
          $('#message').modal('toggle');
        }, 1000);
        });
    }
  
  
  }