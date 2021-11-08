import { object, string } from 'yup';

const payload = {
    body: object({
        name: string().required('Category name is require!'),
        status: string().required('Category status is require!')
    })
};

export const createCategorySchema = object({
    ...payload
});

export const updateCategorySchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    ...payload
});

export const destroyCategorySchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    })
});
