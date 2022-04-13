        let fs= require('fs')
     


function check_exiting_email(email){
   let response=false
    let emails=[]
     
     const data = fs.readFileSync('auth.txt', 'UTF-8');
     const lines = data.split(/\r?\n/);
     lines.forEach((line) => {
         emails.push(line.split('%%')[0])
        
    });
    for(let i=0;i<emails.length;i++){
        if(emails[i]==email){
             response=true
            break
        }
    }
    return response

     
}
function save_data(email,pass,user_name){
   
    fs.appendFile('auth.txt', `\n${email}%%${pass}%%${user_name}`, (err) => {
        if (err) {
            throw err;
        }
        console.log("File is updated.");
    });
}
function validation(email,passwd){
  
   if( check_exiting_email(email)==true){
        if(check_passwd(email,passwd)==true){
            return 'valid info'
        }else{
            return 'wrong passwd'
        }

   }
   else{
       return 'email not found'
   }
}
function check_passwd(email,passwd){
     let response=false

    let records=[]
    
    const data = fs.readFileSync('auth.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
       records.push(`${line.split('%%')[0]}%%${line.split('%%')[1]}`)
       
   });
   for(let i=0;i<records.length;i++){
       if(records[i]==`${email}%%${passwd}`){
            response=true
           break
       }
   }
   return response
}
module.exports={
    
    check_exiting_email:check_exiting_email,
    save_data: save_data,
    validation:validation
}
