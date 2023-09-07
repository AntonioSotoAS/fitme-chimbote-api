import MembershipType from "../models/MembershipType.js";

export const registerMembershipType = async (req, res) => {
    const {typeMembership} = req.body;
  
    try {
      const newMembershipType = new MembershipType({typeMembership});
  
      await newMembershipType.save();
      res.send("register");
    } catch (error) {
      console.log(error);
    }
}