var express = require('express');
var router = express.Router();
var crypto=require('crypto');
var path = require('path');
var crypto=require('crypto');
var fs = require('fs');
var Mailgun = require('mailgun').Mailgun;
var PDFDocument = require('pdfkit');
var mg = new Mailgun('key-001902229d1f3c9beb6653254fa477e2');
var Model = require('../model');
// model configuration
// var Model = require('../model');

router.post('/AdminManageSubscription', function(req, res) {
    var sql = "INSERT INTO Subscriptions (packageName, packagePrice, numberOfContract, renewalFrequency, status) VALUES ?";
    var values = [[req.body.packageName, req.body.packagePrice, req.body.numberOfContract, req.body.renewalFrequency, req.body.subscriptionstatus],];

    global.con.query(sql,[values],function(err,result) {
      if(err) return res.status(500).send();

      if(result.affectedRows==1) {
        return res.json({status:200,res:result});
      }else{
        return res.json({status:300,res:result});
      }

    });
});


router.post('/AdminviewSubscription', function(req, res) {
  var sql = 'SELECT * FROM Subscriptions ;'
  
  global.con.query(sql, function(err,result) {
    if(err) return res.send(err);
    
      if(result.length>0) {
        return res.json({status:200,res:result});
      }else{
        return res.json({status:300,res:result});
      }
  });
});


router.post('/AdminDeleteSubscription', function(req, res) {
  var sql = 'UPDATE Subscriptions SET status = ? WHERE id = ?';
  var values = [['0',req.body.id],];

  global.con.query(sql,[values],function(err,result) {
    if(err) return res.send(err);
    
    if(result.affectedRows==1) {
      return res.json({status:200,res:result});
    }else{
      return res.json({status:300,res:result});
    }
    
  });
});

router.post('/AdminUpdateSubscription', function(req, res) {
  var sql = 'UPDATE Subscriptions SET packageName = ?, packagePrice = ?, numberOfContract = ?, renewalFrequency = ? WHERE id = ?';
  global.con.query(sql,[req.body.packageName, req.body.packagePrice ,req.body.numberOfContract ,req.body.renewalFrequency, req.body.id],function(err,result) {
    if(err) return res.status(500).send();
    
    if(result.affectedRows==1) {
      return res.json({status:200,res:result});
    }else{
      return res.json({status:300,res:result});
    }

  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Manage Ctegory /////////////////////////////////////////////////////////

router.post('/addCategory', function(req, res) {
  var parentcategory;
  var createdat = new Date();
  if(req.body.parentcategory==null) {
    parentcategory = 0;
  }else{
    parentcategory = req.body.parentcategory;
  }
  var sql = "INSERT INTO template_category (name, parent_category, created_at, updated_at, Status, deleted, blockchain_id) VALUES ?";
  var values = [[req.body.name,parentcategory,createdat, ,req.body.status,0,req.body.BlockChainID],];


  global.con.query(sql,[values],function(err,result) {
    if(err) return res.send(err);

    if(result.affectedRows==1) {
      return res.json({status:200,res:result});
    }else{
      return res.json({status:300,res:result});
    }

  });
});


router.post('/editCategory', function(req, res) {
  var updatedat = new Date();
  var parentcategory;
  var createdat = new Date();
  if(req.body.parentcategory==null) {
    parentcategory = 0;
  }else{
    parentcategory = req.body.parentcategory;
  }
  var sql = "UPDATE template_category SET  name = ?, parent_category = ? , updated_at = ?, Status = ?, deleted = ? WHERE id = ?";
  
  global.con.query(sql,[req.body.name,parentcategory,updatedat ,req.body.status,false,req.body.ID],function(err,result) {
    if(err) return res.status(500).send();

    if(result.affectedRows==1) {
      return res.json({status:200,res:result});
    }else{
      return res.json({status:300,res:result});
    }
  });
});

router.post('/DeleteCategory', function(req, res) {
  var sql = "UPDATE template_category SET deleted = ? WHERE id = ? ";

  global.con.query(sql,[true,req.body.id],function(err,result) {
    if(err) return res.status(500).send();
    
    if(result.affectedRows==1) {
      return res.json({status:200,res:result});
    }else{
      return res.json({status:300,res:result});
    }
  });
});

router.post('/retrieveCategory', function(req, res) {
  var sql = 'SELECT * FROM template_category'

  global.con.query(sql,[],function(err,result) {
    if(err) return res.status(500).send();

    return res.json({status:200,res:result});

  });
});

router.post('/retrieveCategoryById', function(req, res) {
  var sql = 'SELECT blockchain_id FROM template_category WHERE id = ?'
  var values = [[req.body.id],];

  global.con.query(sql,[values],function(err,result) {
    if(err) return res.status(500).send();

    return res.json({status:200,res:result});

  });
});

router.post('/getTemplateToUpdate', function(req, res) {
    console.log(req.body.id);
    TemplatePromise = new Model.Template().where({idTemplate: req.body.id }).fetchAll();
    TemplatePromise.then(function(template_details) {
        
        if(template_details==null) {
            console.log("ok failed");
            return res.json({status:300,res:'', error:'No template found'});
        }else {            
            
            return res.json({status:200,res:template_details});
        }
    }).catch(function(err) {
        console.log(err);
        return res.json({status:300,res:'', error:'No template found'});
    });	
});



module.exports = router;
