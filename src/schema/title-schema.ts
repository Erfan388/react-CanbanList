import {z} from 'zod';

export const TitleSchema = z
    .string("Title must be string. ").
trim().nonempty("title can't be empty").
min(5, "at least 5 characters").
trim();