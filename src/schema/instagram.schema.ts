import { object, string, boolean } from 'yup';

export const activeInstagramSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    body: object({
        status: boolean()
            .required('status is require!'),
    })
})

export const destroyInstagramSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    })
});
