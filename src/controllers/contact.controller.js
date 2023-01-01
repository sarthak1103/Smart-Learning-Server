const contactReq = require('../models/contact');

module.exports= class contact{
   static  async addContact(req,res){
     const newContact=req.body;
     try{
      await contactReq.create(newContact);
      res.status(201).json({
         message:'query added successfully'
      });

     }catch (error) {
        res.status(400).json({message:'something went wrong'});

    }
   }

}