import {z} from 'zod';
import {TitleSchema} from "@/schema/title-schema.ts";
import {DescriptionSchema} from "@/schema/decription-schema.ts";

export const ListItemSchema = z.object({
    title: TitleSchema,
    description: DescriptionSchema,
    duaDate : z.string(),
});