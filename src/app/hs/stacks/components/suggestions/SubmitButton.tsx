import { Button } from '@nextui-org/button'
import React from 'react'

export default function SubmitButton() {
  return (
    <div className="flex justify-end mt-6">
      <Button type="submit" color="success" variant="solid" radius="full">
        Submit
      </Button>
    </div>
  )
}
