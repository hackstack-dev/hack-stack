import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { UserSettingsWithoutUser } from '~/convex/types'
import { userSettingsConfig } from '@/app/hs/settings/UserSettings.config'
import SettingsToggle from '@/app/hs/settings/[userId]/SettingsToggle'

interface UserSettingsProps {
  userId: Id<'users'>
}
export default function UserSettings({ userId }: UserSettingsProps) {
  const settings = useQuery(
    api.userSettings.getUserSettings,
    userId ? { userId } : 'skip'
  )

  const updateUserSettings = useMutation(api.userSettings.updateUserSettings)

  const handleUpdateUserSettings = async (
    setting: Partial<UserSettingsWithoutUser>
  ) => {
    if (!settings) return
    await updateUserSettings({
      settingsId: settings._id,
      ...setting
    })
  }
  return (
    <div className="max-w-xl px-8 py-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg">Notification Settings</h2>
        <p className="text-sm text-default-400">
          Manage your notification preferences
        </p>
      </div>
      <div className="space-y-4 mt-4">
        <SettingsToggle
          value={
            settings?.suggestionApprovedInApp ??
            userSettingsConfig.suggestionApprovedInApp.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ suggestionApprovedInApp: value })
          }
          label={userSettingsConfig.suggestionApprovedInApp.label}
          description={userSettingsConfig.suggestionApprovedInApp.description}
        />
        <SettingsToggle
          value={
            settings?.suggestionApprovedEmail ??
            userSettingsConfig.suggestionApprovedEmail.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ suggestionApprovedEmail: value })
          }
          label={userSettingsConfig.suggestionApprovedEmail.label}
          description={userSettingsConfig.suggestionApprovedEmail.description}
        />
        <SettingsToggle
          value={
            settings?.suggestionRejectedInApp ??
            userSettingsConfig.suggestionRejectedInApp.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ suggestionRejectedInApp: value })
          }
          label={userSettingsConfig.suggestionRejectedInApp.label}
          description={userSettingsConfig.suggestionRejectedInApp.description}
        />
        <SettingsToggle
          value={
            settings?.suggestionRejectedEmail ??
            userSettingsConfig.suggestionRejectedEmail.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ suggestionRejectedEmail: value })
          }
          label={userSettingsConfig.suggestionRejectedEmail.label}
          description={userSettingsConfig.suggestionRejectedEmail.description}
        />
        <SettingsToggle
          value={
            settings?.feedbackReceivedInApp ??
            userSettingsConfig.feedbackReceivedInApp.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ feedbackReceivedInApp: value })
          }
          label={userSettingsConfig.feedbackReceivedInApp.label}
          description={userSettingsConfig.feedbackReceivedInApp.description}
        />
        {/*<SettingsToggle*/}
        {/*  value={*/}
        {/*    settings?.feedbackReceivedEmail ??*/}
        {/*    userSettingsConfig.feedbackReceivedEmail.defaultValue*/}
        {/*  }*/}
        {/*  onChange={(value) =>*/}
        {/*    handleUpdateUserSettings({ feedbackReceivedEmail: value })*/}
        {/*  }*/}
        {/*  label={userSettingsConfig.feedbackReceivedEmail.label}*/}
        {/*  description={userSettingsConfig.feedbackReceivedEmail.description}*/}
        {/*/>*/}
        <SettingsToggle
          value={
            settings?.feedbackReplyInApp ??
            userSettingsConfig.feedbackReplyInApp.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ feedbackReplyInApp: value })
          }
          label={userSettingsConfig.feedbackReplyInApp.label}
          description={userSettingsConfig.feedbackReplyInApp.description}
        />
        {/*<SettingsToggle*/}
        {/*  value={*/}
        {/*    settings?.feedbackReplyEmail ??*/}
        {/*    userSettingsConfig.feedbackReplyEmail.defaultValue*/}
        {/*  }*/}
        {/*  onChange={(value) =>*/}
        {/*    handleUpdateUserSettings({ feedbackReplyEmail: value })*/}
        {/*  }*/}
        {/*  label={userSettingsConfig.feedbackReplyEmail.label}*/}
        {/*  description={userSettingsConfig.feedbackReplyEmail.description}*/}
        {/*/>*/}
        <SettingsToggle
          value={
            settings?.promotionEmail ??
            userSettingsConfig.promotionEmail.defaultValue
          }
          onChange={(value) =>
            handleUpdateUserSettings({ promotionEmail: value })
          }
          label={userSettingsConfig.promotionEmail.label}
          description={userSettingsConfig.promotionEmail.description}
        />
      </div>
    </div>
  )
}
