mongoose=require('mongoose')

const UserSchema =  mongoose.Schema({
    name: { type: String , required: true ,trim: true  },
    email: { type: String , required: true, unique: true   },
    phone: { type: Number , required: true } ,
    address: { type: String , required: true } ,
    user_type : { type: String , required: true,trim: true } ,
    password: { type: String , required: true , trim: true},
    blood_group: { type: String , required: true, trim: true }
});

/*const BloodSchema = mongoose.Schema({
    blood_group : {type:String,required:true},
    available_unit: {type: Number,required :true}
})
const Blood =mongoose.model("Blood",BloodSchema)

const create = new Blood({ 
/*    name: 'Nira',email:'bc@gmail.com', phone:'9876789098',
    address:'hkjfhkjhv', user_type:'khfdj', password:'ffffffgg',
    blood_group: 'A+'*/
   /* blood_group : 'A+',available_unit :'123'
},
{ blood_group: 'A-',available_unit:'45'},
{blood_group: 'B-',available_unit:'85'},
{blood_group: 'B+',available_unit:'35'},
{blood_group: 'O-',available_unit:'95'},
{blood_group: 'O+',available_unit:'25'},
{blood_group: 'AB+',available_unit:'55'},
{blood_group: 'AB-',available_unit:'65'})

create.save().then((res) => {
    resolve(res);
}).catch((error) => {
    
})
*/
const User = mongoose.model('User',UserSchema);
module.exports = User;