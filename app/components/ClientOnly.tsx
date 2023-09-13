'use client'
import {useState, useEffect} from 'react'

const ClientOnly = ({children}: {children: React.ReactNode}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <>
            {children}
        </>
    )
 
}

export default ClientOnly