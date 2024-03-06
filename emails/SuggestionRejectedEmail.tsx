import {
  Body,
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
import { getEmailLogo, getHackStackFigure } from '@/app/lib/utils'

interface SuggestionRejectedEmailProps {
  username: string
  userEmail: string
  userId: string
  suggestion: string
  suggestionType: string
  reason: string
  points?: number
  unsubscribeToken: string
}

export const SuggestionRejectedEmail = ({
  username,
  userEmail,
  suggestion,
  suggestionType,
  reason,
  unsubscribeToken
}: SuggestionRejectedEmailProps) => {
  const previewText = 'Your suggestion has been rejected'

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
                src={getHackStackFigure('sad')}
                width="320"
                alt="HackStack Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Section className="bg-gray-100 border border-solid border-gray-200 rounded-b px-8">
              <Heading className="text-black text-3xl font-bold text-center p-0 my-[30px] mx-0">
                Your suggestion has been rejected...
              </Heading>
              <Section className="text-black text-[14px] leading-[24px]">
                <Text>Hello {username},</Text>
                <Text>
                  Your suggestion to add a new {suggestionType}{' '}
                  <strong className="text-lg">{suggestion}</strong> has been
                  rejected due to the following reason:{' '}
                  <strong>{reason}</strong>
                </Text>
                <Text>
                  Don't worry, you can always suggest something else and earn
                  some points!
                </Text>
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
                  )}&type=suggestionRejectedEmail`}
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

SuggestionRejectedEmail.PreviewProps = {
  username: 'batman',
  userEmail: 'batman@email.com',
  suggestion: 'RocksDB',
  suggestionType: 'tech',
  reason: 'Already exists in the app.',
  unsubscribeToken: '123456'
} as SuggestionRejectedEmailProps

export default SuggestionRejectedEmail
