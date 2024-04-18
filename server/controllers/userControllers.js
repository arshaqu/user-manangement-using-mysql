const mysql = require('mysql')


// Connection Pool 
const pool = mysql.createPool({
    connectionLimit :100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME
});


//view Users
const view = (req,res) => {

pool.getConnection((err,connection)=>{
    if(err) throw err; 
    console.log('Connect as ID ' +connection.threadId);
    
    // User the Conncetion
    connection.query('SELECT * FROM user WHERE status = "active"',(err ,rows) =>{
    //   When done with the connection release it     
        connection.release();
        
        if(!err){
            res.render('home' , { rows})
        } else{
        console.log(err);
        }
        console.log(('The data from user table : \n' ,rows));
    })
});
}


// FIND user by search
 const find = (req,res) =>{

    pool.getConnection((err,connection)=>{
        if(err) throw err; 
        console.log('Connect as ID ' +connection.threadId);
        
        let searchTerm = req.body.search;

        // User the Conncetion
        connection.query('SELECT * FROM user WHERE first_name LIKE ?', ['%' +searchTerm +'%'] ,(err ,rows) =>{
        //   When done with the connection release it     
            connection.release();
            
            if(!err){
                res.render('home' , { rows})
            } else{
            console.log(err);
            }
            console.log(('The data from user table : \n' ,rows));
        })
    });

}

const form = (req,res)=>{
    res.render('adduser')
}

const create = (req, res) => {
    const { first_name, last_name, email, phone, comment } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).send('Internal Server Error');
        }

        const sql = 'INSERT INTO user SET ?';
        const values = { first_name, last_name, email, phone, comment };

        connection.query(sql, values, (err, result) => {
            connection.release(); 

            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).send('Error saving user data');
            }

            console.log('User data inserted successfully:', result);
            res.redirect('/'); 
        });
    });
};


const edit = (req,res)=>{
    // res.render('edituser')
    pool.getConnection((err,connection)=>{
        if(err) throw err; 
        console.log('Connect as ID ' +connection.threadId);
        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err ,rows) =>{
            connection.release();
            if(!err){
                res.render('edituser' , { rows})
            } else{
            console.log(err);
            }
            console.log(('The data from user table : \n' ,rows));
        })
    });
}

const updateuser = (req,res)=>{
    const { first_name, last_name, email, phone, comment } = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err; 
        console.log('Connect as ID ' +connection.threadId);
        connection.query('UPDATE user SET first_name = ? , last_name = ?,email = ? ,phone = ?, comment=? WHERE id = ?',[first_name,last_name,email,phone,comment,req.params.id],(err ,rows) =>{
            connection.release();
            if(!err){
                res.render('edituser' , { rows})
                res.redirect('/'); 
            } else{
            console.log(err);
            }
            console.log(('The data from user table : \n' ,rows));
        })
    });
}


const deleting = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err; 
        console.log('Connect as ID ' +connection.threadId);
        connection.query('DELETE FROM user WHERE id = ?',[req.params.id],(err ,rows) =>{
            connection.release();
            if(!err){
                res.redirect('/')
            } else{
            console.log(err);
            }
            console.log(('The data from user table : \n' ,rows));
        })
    });
}




module.exports = {
    view,
    find,
    form,
    create,
    edit,
    updateuser,
    deleting
}