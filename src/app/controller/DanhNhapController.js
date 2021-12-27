class DangNhapController{
    dangnhap (req,res){
        if(req.body.account =="binh" && req.body.password == "123"){
            res.render('chatbox');
          }else{
            console.log("Lỗi ");
            res.render('layouts/login');
          }
    }
}
module.exports =new DangNhapController;