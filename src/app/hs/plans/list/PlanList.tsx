'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import EmptyData from "@/app/hs/components/ui/EmptyData";

export default function PlanList() {
  const { isAuthenticated } = useConvexAuth()
  const plans = useQuery(
    api.plan.getMyUserPlans,
    !isAuthenticated ? 'skip' : {}
  )

  return (
    <>
      {!plans && <PageDataLoading />}
      {plans && plans.length === 0 && <EmptyData />}
      {/*{plans && (*/}
      {/*  <TemplateItems*/}
      {/*    items={plans}*/}
      {/*    isPressable*/}
      {/*    withAvatar*/}
      {/*    withPublicPrivateIndication*/}
      {/*  />*/}
      {/*)}*/}
    </>
  )
}
