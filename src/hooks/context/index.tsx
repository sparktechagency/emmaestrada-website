import React from 'react'
import { DataProvider } from './DataContext'
import { ProfileProvider } from './ProfileContext'

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <DataProvider>
                <ProfileProvider>
                    {children}
                </ProfileProvider>
            </DataProvider>
        </>
    )
}

export default ContextProviders