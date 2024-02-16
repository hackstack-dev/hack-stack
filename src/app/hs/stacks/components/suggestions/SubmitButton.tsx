import { Button } from '@nextui-org/button'
import React from 'react'

export default function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <div className="flex justify-end mt-6">
      <Button
        type="submit"
        color="success"
        variant="solid"
        radius="full"
        isLoading={submitting}
      >
        Submit
      </Button>
    </div>
  )
}
