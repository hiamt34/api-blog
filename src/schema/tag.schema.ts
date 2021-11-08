import { object, string } from 'yup';

const payload = {
    body: object({
        name: string().required('Tag name is require!')
    })
};

export const createTagSchema = object({
    ...payload
});

export const updateTagSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    ...payload
});

export const destroyTagSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    })
});
