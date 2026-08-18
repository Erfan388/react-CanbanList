import {z} from 'zod';
import {TitleSchema} from "@/schema/title-schema.ts";
import {DescriptionSchema} from "@/schema/decription-schema.ts";
import {ColorSchema} from "@/schema/color-schema.ts";

export const BoardSchema = z.object({
    title: TitleSchema,
    description: DescriptionSchema,
    color : ColorSchema,
});