import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function AppUser() {
  return (
    <div className="flex gap-4 items-center">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  )
}
