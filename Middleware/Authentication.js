const jwt=require('jsonwebtoken');
function auth(req,res,next){
    try{
    const token=req.headers.authorization.split(' ')[1];
    console.log("22")
    console.log(token);


    let data = jwt.decode(token);
            console.log(data)
            if(data && data.email ){
                next()
            }else{
                res.status(403).send({
                    auth: "failed"
                })
            }
        }
         catch (err) {
            console.log(err);
            res.status(403).send({
                auth: "failed"
            })
         }

}
module.exports={auth};