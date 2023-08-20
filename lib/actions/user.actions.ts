'use server'

import { revalidatePath } from 'next/cache'

import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'

interface UpdateUser {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}

async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUser): Promise<void> {
  connectToDatabase()

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username?.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      },
    )

    if (path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('=> error while updating user:', error?.message)
    }
  }
}

export { updateUser }
