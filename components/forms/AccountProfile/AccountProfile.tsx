'use client'
import { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { UserValidation, type UserValidationType } from '@/lib/validations/user'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'

import styles from './accountProfile.module.css';
import { updateUser } from '@/lib/actions/user.actions'

interface AccountProfileProps {
  user: {
    id: string | undefined
    objectId: string
    username: string | null | undefined
    name: string
    bio: string
    image: string | undefined
  }
  btnTitle: string
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [files, setFiles] = useState<File[] | null>(null);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ?? '',
      name: user?.name ?? '',
      username: user?.username ?? '',
      bio: user?.bio ?? '',
    },
  })

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const target = e.target as HTMLInputElement;

    if (target?.files && target.files.length > 0) {
      const file = target.files[0];

      setFiles(Array.from(target.files));

      if(!file.type.includes('image')) {
        return;
      }
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }

  }

  async function onSubmit(values: UserValidationType) {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged && files) {
      const imgRes = await startUpload(files);
      if(imgRes && imgRes[0]?.url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    try {
      await updateUser({
        userId: String(user.id),
        username: values?.username,
        name: values?.name,
        bio: values?.bio,
        image: user?.image ?? '',
        path: pathname
      })

      if (pathname === '/profile/edit') {
        router.back()
      } else {
        router.push('/')
      }
    } catch {}

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.form}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className={styles.formImgField}>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={styles.formInputField}>
              <FormLabel className="text-base-semibold text-gray-200">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="Name"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={styles.formInputField}>
              <FormLabel className="text-base-semibold text-gray-200">
                User Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  placeholder="User Name"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className={styles.formInputField}>
              <FormLabel className="text-base-semibold text-gray-200">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  placeholder="Bio"
                  className="account-form_input no-focus"
                  rows={10}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-primary-500'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
