import { array, boolean, object, string } from 'yup';

const payload = {
    body: object({
        title: string().required('Post name is require!'),
        description: string().required('Post description is require!'),
        tags: array().required('Tags is require!'),
        category: string().required('Post category is require!'),
        imgs: array().required('images is require!'),
        video: string(),
    })
};

export const createPostSchema = object({
    ...payload
});

export const updatePostSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    ...payload
});

export const activePostSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    body: object({
        active: boolean().required('active is require')
    })
});

export const changeStatusPostSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    body: object({
        status: string().required('status is require')
    })
});

export const destroyPostSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    })
});
