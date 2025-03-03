  const mongoose= require('mongoose');

  const businessSchema = new mongoose.Schema({
      name:{type:String, required:true},
      address:{type:String,required:true},
      userEmail: { 
          type: String,
          required: true,
        },
      
      openHours:{
          start:{type:String, required:true},
          end:{type:String, required:true},
        

      },
      contact:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      
  
      category:{type:String,enum:['Restaurant','Retail','Service','Healthcare','Other'], required: true},
    
      description:{type:String,required:true},
      website:{type:String},
      availableSlots: [
          {
            time: { type: String }, 
            status: { type: String, enum: ['available', 'booked'], default: 'available' },
          },
        ],
        
        imageUrl: { type: String },
        googleMapsUrl:{type:String, required: true},
      



  });

  module.exports= mongoose.model('Business',businessSchema);