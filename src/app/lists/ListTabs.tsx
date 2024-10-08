"use client"
import { Tab, Tabs } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { Key } from '@react-types/shared';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react'
import MemberCard from '../members/MemberCard';
import LoadingComponent from '@/components/LoadingComponent';

type Props = {
    members: Member[];
    likeIds: string[]
}

const ListTabs = ({ members, likeIds }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const [isPending, startTransition] = useTransition()

    const tabs = [
        { id: "source", label: "People I have liked" },
        { id: "target", label: "People that liked me" },
        { id: "mutual", label: "Mutual Likes" },
    ]

    function handleTabChange(key: Key): void {
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            params.set('type', key.toString())
            router.replace(`${pathName}?${params.toString()}`)
        })
    }

    return (
        <div className='flex w-full flex-col mt-10 gap-5'>
            <Tabs
                aria-label='Like tab'
                items={tabs}
                color='secondary'
                onSelectionChange={key => handleTabChange(key)}>
                {item => (
                    <Tab key={item.id} title={item.label}>
                        {
                            isPending ? (
                                <div>
                                    <LoadingComponent />
                                </div>
                            ) : (
                                <>
                                    {
                                        members.length > 0 ? (
                                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
                                                {
                                                    members.map(member => (
                                                        <MemberCard
                                                            key={member.id}
                                                            member={member}
                                                            likeIds={likeIds} />
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                No People for this filter
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }

                    </Tab>
                )}
            </Tabs>
        </div>
    )
}

export default ListTabs