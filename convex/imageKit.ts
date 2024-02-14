'use node'

import { internalAction } from '~/convex/_generated/server'
import { v } from 'convex/values'
import ImageKit from 'imagekit'

export const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string
})

export const upload = internalAction({
  args: { logo: v.string(), name: v.string() },
  handler: async (_, args) => {
    const response = await imageKit.upload({
      file: args.logo,
      fileName: args.name,
      folder: '/hack_stack/suggestions'
    })
    return response.url
  }
})
