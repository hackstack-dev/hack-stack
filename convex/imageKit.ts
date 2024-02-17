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
  handler: async (_, { name, logo }) => {
    const fileName = name.replaceAll(' ', '').toLowerCase()
    const defaultLogo = await imageKit.upload({
      file: logo,
      fileName: `${fileName}.svg`,
      useUniqueFileName: true,
      folder: '/hack_stack/logos'
    })

    const darkLogo = await imageKit.upload({
      file: logo,
      fileName: `${fileName}.dark.svg`,
      useUniqueFileName: true,
      folder: '/hack_stack/logos'
    })

    return {
      logo: defaultLogo.url,
      darkLogo: darkLogo.url,
      logoIds: [defaultLogo.fileId, darkLogo.fileId]
    }
  }
})

export const deleteSuggestionLogo = internalAction({
  args: { logoIds: v.array(v.string()) },
  handler: async (_, { logoIds }) => {
    return imageKit.bulkDeleteFiles(logoIds)
  }
})
export const approveSuggestionLogo = internalAction({
  args: { logo: v.string(), darkLogo: v.string(), newName: v.string() },
  handler: async (_, { logo, darkLogo, newName }) => {
    const logoName = logo.split('/').pop() as string
    const darkLogoName = darkLogo.split('/').pop() as string

    await imageKit.renameFile({
      filePath: `/hack_stack/logos/${logoName}`,
      newFileName: `${newName}.svg`,
      purgeCache: true
    })

    await imageKit.renameFile({
      filePath: `/hack_stack/logos/${darkLogoName}`,
      newFileName: `${newName}.dark.svg`,
      purgeCache: true
    })
  }
})
