/*
        targetUserName: targetUser.name,
          targetUserEmail: targetUser.email,
          sourceUserName: sourceUser.name,
          sourceUserImage: sourceUser.profileImage,
          feedback,
          unsubscribeToken
 */

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
import { getEmailLogo, getHackStackFigure } from '@/app/lib/utils'

interface FeedbackReceivedEmailProps {
  targetUserName: string
  targetUserEmail: string
  sourceUserName: string
  sourceUserImage: string
  stackName: string
  stackId: string
  feedback: string
  unsubscribeToken: string
}

export const FeedbackReceivedEmail = ({
  targetUserEmail,
  sourceUserName,
  sourceUserImage,
  stackId,
  stackName,
  feedback,
  unsubscribeToken
}: FeedbackReceivedEmailProps) => {
  const previewText = 'You have received a feedback'

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
                src={getHackStackFigure('feedback')}
                width="150"
                alt="HackStack Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Section className="bg-gray-100 border border-solid border-gray-200 rounded-b px-8">
              <Text className="text-black py-4 leading-[24px] block">
                <strong className="text-[#d946ef]">{sourceUserName}</strong> has
                left you feedback about your stack{' '}
                <strong className="text-[#d946ef]">{stackName}</strong>
              </Text>
              <Section className="bg-white mt-24 rounded border border-solid border-gray-100 px-8">
                <Img
                  src={sourceUserImage}
                  width="100"
                  alt="HackStack Logo"
                  className="-mt-[58px] mx-auto rounded-full border-4 border-solid border-gray-200"
                />
                <Text className="italic font-light text-lg">
                  " {feedback} "
                </Text>
              </Section>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#d946ef] rounded text-white text-[12px] px-5 py-3 font-semibold no-underline text-center"
                  href={`https://stacks.hackazen.com/hs/stacks/view/${stackId}?feedback=open`}
                >
                  View feedback on HackStack
                </Button>
              </Section>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="!text-[12px] leading-[24px]">
                <Link
                  target={'_blank'}
                  className="mr-5 text-[#999]"
                  href={`https://stacks.hackazen.com/unsubscribe?email=${encodeURIComponent(
                    targetUserEmail
                  )}&token=${encodeURIComponent(
                    unsubscribeToken
                  )}&type=fedbackReceivedEmail`}
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

FeedbackReceivedEmail.PreviewProps = {
  targetUserEmail: 'ofer.webdev@gmail.com',
  sourceUserName: 'Gearldine Bednarik',
  sourceUserImage:
    'https://xsgames.co/randomusers/assets/avatars/female/32.jpg',
  stackName: 'The best Galactic Stack',
  stackId: '123456',
  feedback:
    'This is a great Stack! going to use it in my next project! Well done! What a great job! You are the best!',
  unsubscribeToken: '123456'
} as FeedbackReceivedEmailProps

export default FeedbackReceivedEmail
