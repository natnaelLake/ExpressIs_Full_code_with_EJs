let role ;
module.exports  = function roleChecking(permit) {
        if (permit.role != 1)  {
            role = permit.role;
            checkUP;
        };

}

function checkUP(req,res,next){
     if(req.isAuthenticated()) {
        console.log(role);
        if(role == 0){
            res.redirect('/can')
        } 

        next();
     }
}