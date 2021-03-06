import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as config from '../../../../../../config/config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var $;
declare var window;
@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['../../../../assets/css/contract_detail.css'],
})
export class ViewCustomerContractDetailComponent implements OnInit {
  ContractID;
  ContractDetails;
  CancelData;
  Etherium;
  milestoneid;
  User_data;

  constructor(public route: ActivatedRoute, public router: Router, public http: Http, private zone: NgZone) {
    this.CancelData = {};
    var ABI = [{"constant":true,"inputs":[],"name":"getcustomer_info","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cate_id","type":"uint256"}],"name":"gettemplate","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_description","type":"bytes32"},{"name":"_status","type":"bool"},{"name":"_category_id","type":"uint256"}],"name":"set_Template","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"m_id","type":"uint256"}],"name":"check_status","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cate_type","type":"bytes32"},{"name":"maincate_id","type":"uint256"},{"name":"_status","type":"bool"}],"name":"setcategory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_idMilestone","type":"uint256"}],"name":"ApproveByCustomer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"m_id","type":"uint256"},{"name":"_start_date","type":"uint256"},{"name":"_end_date","type":"uint256"},{"name":"price","type":"uint256"}],"name":"update_milestone","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"cont_id","type":"uint256"}],"name":"getcontractBycont_id","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_idMilestone","type":"uint256"},{"name":"graseTime","type":"uint256"}],"name":"checkFailure","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_mId","type":"uint256"}],"name":"getMilestonesBymile_id","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"m_id","type":"uint256"}],"name":"paymentToContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"cateId","type":"uint256"}],"name":"getcategoryBycateId","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fname","type":"bytes32"},{"name":"_lname","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"_password","type":"bytes32"},{"name":"_phone_no","type":"uint256"},{"name":"wallet","type":"address"}],"name":"setcustomer_info","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"temp","type":"uint256"}],"name":"gettemplateBytemp_id","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getcategory","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32[]"},{"name":"cont_id","type":"uint256"},{"name":"_fees","type":"uint256[]"},{"name":"_penalty","type":"uint256[]"},{"name":"_start_date","type":"uint256[]"},{"name":"_end_date","type":"uint256[]"},{"name":"_price","type":"uint256[]"}],"name":"setMilestones","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"servID","type":"uint256"}],"name":"getServiveProvider","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"temp","type":"uint256"}],"name":"getcontractBytemp_id","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"cont_id","type":"uint256"}],"name":"getMilestonesByCon_id","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_idMilestone","type":"uint256"}],"name":"DissAproveByCustomer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"custId","type":"uint256"}],"name":"getcustomer","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fname","type":"bytes32"},{"name":"_lname","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"_password","type":"bytes32"},{"name":"_phone_no","type":"uint256"},{"name":"wallet","type":"address"}],"name":"setServiceProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_idMilestone","type":"uint256"}],"name":"markMilestoneComplete","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"m_id","type":"uint256"}],"name":"disApproveByCustomer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getserviceprovider","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_start_time","type":"uint256"},{"name":"end_time","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"temp","type":"uint256"},{"name":"cust","type":"uint256"},{"name":"serv","type":"uint256"},{"name":"typee","type":"bytes32[]"},{"name":"valuee","type":"bytes32[]"}],"name":"set_contract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"c","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"address"}],"name":"d","type":"event"}];    
    console.log(window.web3.isConnected());
    window.web3.eth.getAccounts((err, acc) => {
      this.Etherium = window.web3.eth.contract(ABI).at('0xe11c1a5613353111a96ab5ad17cd8c4a291cd7ed');
    });
    this.route.queryParams.subscribe(params => {
      this.ContractID = params["contractID"];
    });
  }

  ngOnInit() {
    this.User_data = JSON.parse(localStorage.getItem('User'));
    this.http.post('//' + config.global_ip + '/pdf/getContractById', { id: this.ContractID }).subscribe((res: any) => {
      var contract_details = JSON.parse(res._body).res;
      this.ContractDetails = contract_details[0];
      console.log(this.ContractDetails);
    }, (err) => {
      console.log(err);
    });
  }

  viewMilestoneHistory(id) {
    let navigationExtras = {
      queryParams: {
        "milestone_id": id
      }
    };
    this.router.navigate(["/viewMilestoneHistory"], navigationExtras);
  }

  ApproveMilestone(id, status, blockchainid, fees) {
    let self = this;
    self.Etherium.paymentToContract(blockchainid, { from: self.User_data.wallet_address, to: "0xe11c1a5613353111a96ab5ad17cd8c4a291cd7ed", value: window.web3.toWei(fees, "ether") }, function (err, res) {
      if (err) {
        return $.notify(err, 'error');
      } else {
        $.blockUI({ message: '<h1>Waiting for transaction to be mined...</h1>' });
        var Interval = setInterval(function () {
          window.web3.eth.getTransactionReceipt(res, function (err1, res1) {
            if (res1 != null || res1 != undefined) {
              self.Etherium.check_status(blockchainid, function (errstatus, resstatus) {
                if (errstatus) {
                  $.unblockUI({ fadeOut: 200 });
                  return clearInterval(Interval);
                }
                clearInterval(Interval);
                console.log(resstatus);
                if(resstatus.c[0]==6){
                self.http.post('//' + config.global_ip + '/pdf/UpdateMilestoneStatus', { Mid: id, MStatus: status }).subscribe((res: any) => {
                  $.unblockUI({ fadeOut: 200 });
                  self.zone.run(() => {
                    self.ngOnInit();
                  });
                }, (err) => {
                  $.unblockUI({ fadeOut: 200 });
                  $.notify(err, 'error');
                });
              }else{
                $.notify('Please Try Again', 'error'); 
                $.unblockUI({ fadeOut: 200 }); 
              }
              })
            }
          });
        }, 8000);
      }
    });
  }

  SetWorkDone(id, status,blockchainid) {
    let self = this;
    self.Etherium.ApproveByCustomer(blockchainid, function (err, res) {
      if (err) {
        return $.notify(err, 'error');
      } else {
        $.blockUI({ message: '<h1>Waiting for transaction to be mined...</h1>' });
        var Interval = setInterval(function () {
          window.web3.eth.getTransactionReceipt(res, function (err1, res1) {
            if (res1 != null || res1 != undefined) {
              clearInterval(Interval);
              self.Etherium.check_status(blockchainid, function (errstatus, resstatus) {
                if (errstatus) {
                  $.unblockUI({ fadeOut: 200 });
                  return clearInterval(Interval);
                }
                console.log(resstatus);
                if(resstatus.c[0]==4){
              self.http.post('//' + config.global_ip + '/pdf/UpdateMilestoneStatus', { Mid: id, MStatus: status }).subscribe((res: any) => {
                $.unblockUI({ fadeOut: 200 });
                self.zone.run(() => {
                  self.ngOnInit();
                });
              }, (err) => {
                $.unblockUI({ fadeOut: 200 });
                $.notify(err, 'error');
              });
            }else{
              $.notify('Please Try Again', 'error'); 
              $.unblockUI({ fadeOut: 200 });
            }
            });
            }
          });
        }, 8000);
      }
    });
  }

  Cancel(id, status,blockchainid) {
    this.CancelData.CancelID = id;
    this.CancelData.CancelStatus = status;
    this.milestoneid = blockchainid;
    $('#reasoncancel').modal('toggle');
  }

  ReasonUpdate() {
    let self = this;
    $('#reasoncancel').modal('toggle');
    if(this.CancelData.CancelStatus==5) {
      console.log('finaldisaprove');
      self.Etherium.DissAproveByCustomer(self.milestoneid, function (err, res) {
        if (err) {
          return $.notify(err, 'error');
        } else {
          $.blockUI({ message: '<h1>Waiting for transaction to be mined...</h1>' });
          var Interval = setInterval(function () {
            window.web3.eth.getTransactionReceipt(res, function (err1, res1) {
              if (res1 != null || res1 != undefined) {
                clearInterval(Interval);
                self.Etherium.check_status(self.milestoneid, function (errstatus, resstatus) {
                  if (errstatus) {
                    $.unblockUI({ fadeOut: 200 });
                    return clearInterval(Interval);
                }
                console.log(resstatus);
                  if(resstatus.c[0]==5){
                  self.http.post('//' + config.global_ip + '/pdf/UpdateMilestoneStatus', { Mid: self.CancelData.CancelID, MStatus: self.CancelData.CancelStatus, reason: self.CancelData.ReasonCancel }).subscribe((res: any) => {
                    self.CancelData = {};
                    self.zone.run(() => {
                      $.unblockUI({ fadeOut: 200 });
                      self.ngOnInit();
                    });
                  }, (err) => {
                    $.unblockUI({ fadeOut: 200 });
                    $.notify(err, 'error');
                  });
                }else{
                  $.notify('Please Try Again', 'error'); 
                  $.unblockUI({ fadeOut: 200 });
                }
                });
              }
            });
          }, 8000);
        }
      });
    } else{
      self.Etherium.disApproveByCustomer(self.milestoneid, function (err, res) {
        if (err) {
          return $.notify(err, 'error');
        } else {
          $.blockUI({ message: '<h1>Waiting for transaction to be mined...</h1>' });
          var Interval = setInterval(function () {
            window.web3.eth.getTransactionReceipt(res, function (err1, res1) {
              if (res1 != null || res1 != undefined) {
                clearInterval(Interval);
                self.Etherium.check_status(self.milestoneid, function (errstatus, resstatus) {
                  if (errstatus) {
                    $.unblockUI({ fadeOut: 200 });
                    return clearInterval(Interval);
                  }
                  console.log(resstatus);
                  if(resstatus.c[0]==7){
                  self.http.post('//' + config.global_ip + '/pdf/UpdateMilestoneStatus', { Mid: self.CancelData.CancelID, MStatus: self.CancelData.CancelStatus, reason: self.CancelData.ReasonCancel }).subscribe((res: any) => {
                    self.CancelData = {};
                    self.zone.run(() => {
                      $.unblockUI({ fadeOut: 200 });
                      self.ngOnInit();
                    });
                  }, (err) => {
                    $.unblockUI({ fadeOut: 200 });
                    $.notify(err, 'error');
                  });
                }else{
                  $.notify('Please Try Again', 'error'); 
                  $.unblockUI({ fadeOut: 200 });
                }
                });
              }
            });
          }, 8000);
        }
      });
    }
  }

  Formreset() {
    $('#reasoncancel').modal('toggle');
    this.CancelData = {};
  }

}
