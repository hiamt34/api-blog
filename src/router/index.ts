import { Express } from 'express'
import AuthRouter from './auth/auth.router';
import CategoryRouter from './category/category.router';
import TagRouter from './tag/tag.router';
import UserRouter from './user/user.router';
import uploadRouter from './upload/upload.router';
import InstagramRouter from './instagram/instagram.router';
import PostRouter from './post/post.router';
const router = (app: Express) => {
    UserRouter(app);

    AuthRouter(app);
    
    CategoryRouter(app);

    TagRouter(app);

    uploadRouter(app);

    InstagramRouter(app);

    PostRouter(app);
};

export default router;
