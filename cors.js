function crosPermission(){
  this.permission=function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods','GET,POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
  }
}

module.exports= new crosPermission();