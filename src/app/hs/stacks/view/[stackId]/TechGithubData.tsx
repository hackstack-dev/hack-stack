import { Divider } from '@nextui-org/react'
import React from 'react'
import { formatNumber, timeAgo } from '@/app/lib/utils'
import { Button } from '@nextui-org/button'
import { LucideGithub, LucideStar } from 'lucide-react'

type RepoData = {
  html_url: string
  created_at: string
  pushed_at: string
  stargazers_count: number
  open_issues_count: number
  language: string
}
interface TechGithubDataProps {
  repoData: RepoData
}
export default function TechGithubData({ repoData }: TechGithubDataProps) {
  const {
    html_url,
    created_at,
    open_issues_count,
    stargazers_count,
    pushed_at
  } = repoData
  return (
    <div className="flex flex-col space-y-4 border-b-1 dark:border-default-50 pb-4">
      <p className="text-xs px-4">
        <span className="text-default-500 mr-2">Created:</span>
        <span>{timeAgo(created_at)} ago</span>
      </p>
      <p className="text-xs px-4">
        <span className="text-default-500 mr-2">Updated:</span>
        <span>{timeAgo(pushed_at, true)} ago</span>
      </p>
      <div className="flex h-5 items-center space-x-4 text-small px-4">
        <Button
          as={'a'}
          href={html_url}
          target={'_blank'}
          variant="light"
          radius="full"
          size="sm"
          isIconOnly
        >
          <LucideGithub size={20} />
        </Button>
        <Divider orientation="vertical" />
        <div className="flex items-center gap-2">
          <LucideStar size={14} />
          {formatNumber(stargazers_count)}
        </div>
        <Divider orientation="vertical" />
        <div>
          {open_issues_count}{' '}
          <span className="text-sm text-default-500 ml-1">issues</span>
        </div>
      </div>
    </div>
  )
}