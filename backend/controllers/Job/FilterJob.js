const Job = require("../../models/jobModel").module;

const SearchJob = async (req, res) => {
  const keywords = req.query.keyword || "";
  console.log("keyword", keywords);
  let splits = "";
  if (keywords.includes("lakhs")) {
    let split2 = keywords.split("lakhs");
    splits = split2[0].split("-");
  }
  let minsalary = splits ? splits[0] : "";
  let maxsalary = splits ? splits[1] : "";
        

    try {
      

      const result = await Job.find({
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { description: { $regex: keywords, $options: "i" } },
          { location: { $regex: keywords, $options: "i" } },
          { salary: { $gte: minsalary, $lte: maxsalary } },
        ],
      })
        .populate({
          path: "company",
        })
        .sort({ createdAt: -1 });

      res.json({
        data: result,
        success: true,
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

exports.module = SearchJob;
