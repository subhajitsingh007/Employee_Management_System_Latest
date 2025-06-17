import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        trim:true
    },
    employees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    humanResources:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

   
},{
    timestamps: true
})

export const DepartmentModel = mongoose.model("Department", departmentSchema)