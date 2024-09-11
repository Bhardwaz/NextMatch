import React from 'react'
import ListTabs from './ListTabs'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions'

const Lists = async ({ searchParams }: { searchParams: { type: string } }) => {
  const likeIds = await fetchCurrentUserLikeIds ()
  const members = await fetchLikedMembers()
  return (
    <div>
      <ListTabs members={members} likeIds={likeIds} />
    </div>
  )
}

export default Lists