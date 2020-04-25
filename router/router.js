const express =require('express');
const router =express.Router();
const Rdate =require('../modules/datemodel')

router.post('/post',async (req,res) => {
	try{
		console.log('inside the insert router');
        let { id,
            firstdate,
            lastdate
			 }=req.body;
			console.log('database properly extracted');
		let num=await Rdate.taskdate(
			id,
            firstdate,
            lastdate);

        res.json(num);

	}catch(error){
		console.log(error)
	}

});


router.get('/get', async (req, res) => {
    try
    {
		console.log(' inside task route - user type is  : ', req.body);
        let expdate=await Rdate.getdata();
        res.json(expdate);

	}catch(error){
		console.log('error',error);
	}

});


module.exports=router;

