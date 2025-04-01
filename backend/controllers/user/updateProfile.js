const User = require("../../models/userModel").module;
const getDataUri = require("../../utils/DataUri").module;
const cloudinary = require("../../utils/Cloudinary").module;

const UpdateProfile = async (req, res) => {
  const { fullName, email, phoneNo, bio, skills } = req.body;
  console.log('req.body',req.body)
  console.log('files',req.files)

  const file1=req.files.file?( req.files?.file[0]):''
  const file2=req.files.file2?(req.files?.file2[0].path):''

//   const file = req.file;
//   console.log("file", file);
  try {
   
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    const skillsArray = skills?.split(",");

    user.fullName = fullName;
    if (email !== "") user.email = email;
    user.phoneNo = phoneNo;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    //resume comes here //
    if (file1) {
    
    const cloudinaryResponse = await cloudinary.uploader.upload(
       file1.path
    );
    if(cloudinaryResponse){
       user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalName = file1.originalname;
    }
    }

    
 //profile comes here /

 
    if (file2) {
        
      const cloudinaryResponse = await cloudinary.uploader.upload(
          file2
        );
        if(cloudinaryResponse){
           user.profile.profilePhoto = cloudinaryResponse.secure_url;
        }
        
        }

    await user.save();
    const newUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNo,
      role: user.role,
      profile: user.profile,
    };

    res.json({
      data: newUser,
      message: "profile updated successfully",
      sucess: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

exports.module = UpdateProfile;
