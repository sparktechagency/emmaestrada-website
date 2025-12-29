
import React from 'react'
import { DataProvider } from './DataContext'
import { ProfileProvider, useProfile } from './ProfileContext'


const ContextProviders = async({ children }: { children: React.ReactNode }) => {
       
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