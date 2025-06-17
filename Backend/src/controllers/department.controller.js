import { UserModel } from "../models/user.model.js";
import { DepartmentModel } from "../models/department.model.js";

//create a department (admin only)

export const createDepartment = async (req, res) => {
    const {name,description} = req.body
        //check if department already exists
        if(!name || !description){
            return res.status(400).json({message:"Please provide all fields"})
        }
    try{
        const department = await DepartmentModel.create({
            name,
            description
        })
        await department.save()
        res.status(201).json({message:"Department created successfully", department})



    } catch(error){
        console.log("Error in create department controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// Get all departments (admin only)

export const getAllDepartments = async(req,res) =>{
    try{
        const departments = await DepartmentModel.find().sort({ createdAt: -1 });
        res.status(200).json({ departments });

    }catch(error){
        console.log("Error in getAllDepartments controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// Get department with employees and HRs
export const getDepartmentDetails = async (req, res) => {
    const deptId = req.params.id;
  
    try {
      const department = await DepartmentModel.findById(deptId);
      if (!department) return res.status(404).json({ message: "Department not found" });
  
      // Fetch users by role
      const employees = await UserModel.find({ department: deptId, role: "user" });
      const humanResources = await UserModel.find({ department: deptId, role: "admin" });
  
      res.status(200).json({ department, employees, humanResources });
  
    } catch (error) {
      console.error("Error getting department details:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

//delete department (admin only)

export const deleteDepartment = async (req, res) => { 
    const deptID = req.params.id

    try{
        //check if department exists
        const department = await DepartmentModel.findById(deptID)

        if(!department){
            return res.status(404).json({message:"Department not found"})
        }
        //delete department
        await DepartmentModel.findByIdAndDelete(deptID);

        res.status(200).json({message:"Department deleted successfully"})

    } catch(error){
        console.log("Error in delete department controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
} 

// Update department (admin only)
export const updateDepartment = async (req, res) => {
    const deptID = req.params.id;
    const { name, description } = req.body;
  
    try {
      const department = await DepartmentModel.findById(deptID);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      // Update fields if they are provided
      if (name) department.name = name;
      if (description) department.description = description;
  
      await department.save();
  
      res.status(200).json({ message: "Department updated successfully", department });
    } catch (error) {
      console.log("Error in update department controller", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  