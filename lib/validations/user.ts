import * as z from 'zod';

const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(50).nonempty(),
    username: z.string().min(3).max(50).nonempty(),
    bio: z.string().min(3).max(500).nonempty(),
});

type UserValidationType = z.infer<typeof UserValidation>;

export { UserValidation };
export type { UserValidationType };