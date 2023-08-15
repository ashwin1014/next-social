import { currentUser } from "@clerk/nextjs";

import AccountProfile from "@/components/forms/AccountProfile/AccountProfile";

// import classes from './onboarding.module.css';

async function OnboardingPage() {
    const user = await currentUser();

    const userInfo: Record<string, string> = {};

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || '',
        bio: userInfo?.bio || '',
        image: userInfo?.image || user?.imageUrl,
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start pz-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Next Social</p>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
       </main>
    )
}

export default OnboardingPage;