import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import { getEmailLogo, getRandomHackStackEmailBanner } from '@/app/lib/utils'

interface SuggestionApprovedEmailProps {
  username: string
  userEmail: string
  unsubscribeToken: string
  suggestion: string
  suggestionType: string
  points: number
}

export const SuggestionApprovedEmail = ({
  username,
  userEmail,
  unsubscribeToken,
  suggestion,
  suggestionType,
  points
}: SuggestionApprovedEmailProps) => {
  const previewText = 'Your suggestion has been approved'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white text-[#09092b] my-auto mx-auto font-sans !w-full !max-w-[720px]">
          <Container className="mt-4 mb-20 mx-auto !w-full !max-w-[720px]">
            <Section className="bg-[#09092b] rounded-t border-b-4 border-solid border-[#d946ef] pb-10">
              <Section className="my-6 text-center">
                <Img
                  src={getEmailLogo()}
                  width="36"
                  alt="HackStack Logo"
                  className="inline-block align-middle mr-1"
                />
                <Heading
                  as="h1"
                  className="text-white font-semibold inline-block align-middle text-4xl m-0"
                >
                  HackStack
                </Heading>
              </Section>
              <Img
                src={getRandomHackStackEmailBanner()}
                width="320"
                alt="HackStack Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Section className="bg-gray-100 border border-solid border-gray-200 rounded-b px-8">
              <Heading className="text-black text-3xl font-bold text-center p-0 my-[30px] mx-0">
                Your suggestion has been approved
              </Heading>
              <Section className="text-black text-[14px] leading-[24px]">
                <Text>Hello {username},</Text>
                <Text>
                  Your suggestion to add a new {suggestionType}{' '}
                  <strong className="text-lg">{suggestion}</strong> has been
                  approved and is now live on HackStack.
                </Text>
                <Text>
                  We appreciate your contribution and have awarded you with
                </Text>
                <Text className="bg-white text-center mx-auto rounded py-2 border border-solid border-gray-200">
                  <strong className="text-7xl">{points}</strong>
                  points.
                </Text>
                <Text className="text-center mx-auto">
                  Keep up the good work!
                </Text>
              </Section>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#d946ef] rounded text-white text-[12px] px-5 py-3 font-semibold no-underline text-center"
                  href="https://stacks.hackazen.com/hs/discover"
                >
                  Let me see!
                </Button>
              </Section>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="!text-[12px] leading-[24px]">
                <Link
                  target={'_blank'}
                  className="mr-5 text-[#999]"
                  href={`https://stacks.hackazen.com/unsubscribe?email=${encodeURIComponent(
                    userEmail
                  )}&token=${encodeURIComponent(
                    unsubscribeToken
                  )}&type=suggestionApprovedEmail`}
                >
                  Unsubscribe
                </Link>
                <Link
                  className="mr-5 text-[#999]"
                  href="mailto:hackstack@hackazen.com"
                >
                  Contact us
                </Link>
                <Link
                  className="mr-5 text-[#999]"
                  target={'_blank'}
                  href="https://hackstack.hackazen.com/terms-of-service"
                >
                  Privacy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

SuggestionApprovedEmail.PreviewProps = {
  username: 'batman',
  userEmail: 'hackstack@hackazen.com',
  unsubscribeToken: '123',
  suggestion: 'RocksDB',
  suggestionType: 'tech',
  points: 10
} as SuggestionApprovedEmailProps

export default SuggestionApprovedEmail
