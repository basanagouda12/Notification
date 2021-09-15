const pool =require('../utils/db-config');
const parser =require('body-parser');
console.log('inside date');
var nodemailer = require('nodemailer');
let cron = require('node-cron');


module.exports.taskdate = async function(
    id,
    firstdate,
    lastdate
){
    try {
        let rowInserted = await pool.query(
            "insert into task1(id,firstdate,lastdate) values($1,$2,$3) returning *",
            [
                id,
                firstdate,
                lastdate
            ]
        );

		console.log('Row Inserted are  : ', rowInserted.rowCount);
		//	console.log(rowsInserted);
		//console.log('\n\n');
		if (rowInserted.rowCount === 0) {
			return 0;
		}else{
			return 1;
		}

	} catch (err) {
		console.log(err, 'inside datemodel');
	}

	}


module.exports.getdata=async function() {
	let expdate = await pool.query('select lastdate from task1 where id=4');
	//let result = await pool.query('select lastdate-current_date as diff from task1 where id=1');
	let result = await pool.query('select email from task1 where lastdate-firstdate=2');
	//let diff = result.rows[0].diff;


	if (expdate.rowCount === 0){
		return 'No data found';

	}

	else {
			cron.schedule('* * * * *',() => {
			console.log('result here...............................');
			for(i=0;i<result.rowCount;i++)
			{
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
					user: '************@gmail.com',
					pass: '*****'
					}
				});

				var mailOptions = {
					from: 'basanagoudap9141@gmail.com',
					to: result.rows[i].email,
					subject: 'Remainder❗❗❗',
					html: `<h4>This is to inform u that only 2 days remaining for your task completion, Do it as soon as possible</h4>`
				};
				console.log('Email sent To: ' + result.rows[i].email);
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
					console.log(error);
					} else {
						console.log('Email Response: ' + info.response );


					}
				});
			}
			})
		console.log(result.rowCount);
	

        console.log(expdate);
		return expdate.rows;
    }

}
