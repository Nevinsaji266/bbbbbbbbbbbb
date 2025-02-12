const express=require('express')
const userController=require('./controllers/userController')

const blogController=require('./controllers/blogController')
const jwtmiddleware=require('./middleware/jwtmiddleware')
const multerConfig = require('./middleware/multermiddleware')

// instance router
const router=new express.Router()
// Register
router.post('/register',userController.register)

router.post('/login',userController.login)


router.put('/update-userprofile',jwtmiddleware,multerConfig.single('profile'),userController.updateprofile)


// Blog Routes
router.post('/add-blog', jwtmiddleware, multerConfig.single('blogImage'), blogController.uploadBlog);
router.get('/all-blogs', jwtmiddleware, blogController.getAllBlogs);
router.get('/home-blogs', blogController.getHomeBlogs);
router.get('/user-blogs', jwtmiddleware, blogController.getUserBlogs);

router.delete('/remove-userblog/:id',jwtmiddleware,blogController.removeUserBlog);

router.put('/update-userblog/:id',jwtmiddleware,multerConfig.single('blogImage'),blogController.updateUserBlog);










module.exports=router