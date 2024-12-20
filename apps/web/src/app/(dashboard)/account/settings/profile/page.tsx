import { auth } from "@/auth";
import { DeleteAccount } from "@/components/(dashboard)/settings/profile/profile-delete";
import { ProfileForm } from "@/components/(dashboard)/settings/profile/profile-form";
import { UserSchema } from "@repo/drizzle/schema/type";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Profile",
}

export default async function ProfilePage() {
    const session = await auth();

    return (
        <>
            <ProfileForm className="mb-8 max-w-xl" user={session?.user as UserSchema} />
            <hr className="my-4 max-w-xl" />
            <DeleteAccount className="max-w-xl" user={session?.user as UserSchema}/>
        </>
    )

}