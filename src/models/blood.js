mongoose=require('mongoose')

const BloodSchema = mongoose.Schema({
    blood_group : {type:String,required:true,unique:true},
    available_unit: {type: Number,required :true}
})
const Blood =mongoose.model("Blood",BloodSchema)
//const User = mongoose.model('User',UserSchema);
module.exports = Blood;