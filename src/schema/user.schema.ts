import { object, string, ref, boolean } from 'yup';
const payload = {
    body: object({
        // name: string()
        //     .required('Name is require!'),
        password: string()
            .required('password is require!')
            .min(6, 'password should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password is latin!'),
        email: string()
            .email('is not email')
            .required('email is require!'),
        // phone: string()
        //     .min(10)
        //     .max(10),
        confirmPassword: string()
            .oneOf([ref('password')], 'password must match!')
    })
}

export const createUserSchema = object({
    ...payload
})

export const updateUserSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    ...payload
})

export const activeUserSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    }),
    body: object({
        status: boolean()
            .required('status is require!'),
    })
})

export const loginUserSchema = object({
    ...payload
})

export const detailDestroyDeleteUserSchema = object({
    params: object({
        _id: string()
            .required('_id is require!')
    })
})