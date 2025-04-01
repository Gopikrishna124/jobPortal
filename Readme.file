Features:
1.user authentication(signup/login)
2.job application creation and management
3.Restful Api for handling job applications
4.implemented features like adding resume,changing profile photo and filtering jobs
5.status tracking (like applied jobs,rejected jobs)
6.used multer and cloudinary for handling profile images and resumes 
7.you can see uplaoded files seperately in respected resumes folder and uplaoded folders

Admin:
6.created new jobs by instructor and can filter jobs and can edit created jobs
7.created new company by instructor and can edit created jobs 
8.can see number of applicants for particular job
9.can update status of job applicants



Technologies used :
1.frontend:reactjs,React Router,tailwind css ,shadcn ui,redux
2.backend:mogodb,nodejs,expressjs
3.database:mongodb with mongoose
4.authentication:JWT(json web token)

Setup Instructions:

1.start backend server:
npm run dev
2.start frotend server:
npm run dev
3.backend port:5001
4.frontend url:http://localhost:5173
5.you can register as student or instructor ,setup will let you understand


Api End Points:
 
1.user End points:

 base Url:app.use('/api/v1/user',userRouter)

 userRouter is router module exported from routes/userRoutes

router.post('/register')

router.post('/login')

router.post('/profile/update')

router.get('/logOut')

2.job End points:

 base Url:app.use('/api/v1/job',jobRouter)

 jobRouter is router module exported from routes/jobRoutes

router.post('/createJob')
router.get('/alljobs')
router.get('/singleJob/:id')
router.get('/allAdminJobs')
router.get('/filterJobs')


3.company End points:

 base Url:app.use('/api/v1/company',companyRouter)

 companyRouter is router module exported from routes/companyRoutes

router.post('/registerCompany')
router.get('/allCompanies')
router.get('/SingleCompany/:id')
router.put('/update/:id')



4.application End points:

 base Url:app.use('/api/v1/application',applicationRouter)

 applicationRouter is router module exported from routes/applicationRoutes

router.get('/applyJob/:id')
router.get('/allApplications')
router.get('/noOfUsersApplied/:id')
router.post('/updateStatus/:id')
