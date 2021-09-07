import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { AddProductForm } from './AddProductForm'

export const HomeContainer = () => {
    return (
        <div>
            <CssBaseline />
            <AddProductForm />
        </div>
    )
}
