import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/bloglike.model.js";

export const doLike = async (req, res, next) => {
  try {
    const { user, blogid } = req.body;
    let like;
    like = await BlogLike.findOne({ user, blogid });
    if(!like){
        const savelike = new BlogLike({
            user, blogid
        })
        like = await savelike.save();
    }else{
        await BlogLike.findByIdAndDelete(like._id);
        like = null;
    }

    const likeCount = await BlogLike.countDocuments({ blogid});
    res.status(200).json({
        success: true,
        message: like ? 'Blog liked successfully.' : 'Blog unliked successfully.',
        likeCount
    });

  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;
    const likeCount = await BlogLike.countDocuments({ blogid});
    let isUserliked = false;
    if(userid){
        const getuserlike = await BlogLike.countDocuments({ blogid, user: userid });
        
        if(getuserlike > 0){
          isUserliked = true;
        }
    }

     res.status(200).json({
        success: true,
        message: like ? 'Blog liked successfully.' : 'Blog unliked successfully.',
        likeCount,
        isUserliked
    });
  } catch (error) {
    console.log("LIKE COUNT ERROR:", error);
    next(handleError(500, error.message));
  }
};
