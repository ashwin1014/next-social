"use client"

interface AccountProfileProps {
    user: {
        id: string | undefined;
        objectId: string;
        username: string | null | undefined;
        name: string;
        bio: string;
        image: string | undefined;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  return (
    <div>AccountProfile</div>
  )
}

export default AccountProfile