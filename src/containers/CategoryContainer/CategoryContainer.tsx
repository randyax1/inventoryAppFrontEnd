import React from 'react';
import { CssBaseline } from '@material-ui/core'
import { AddCategoryForm } from './AddCategoryForm'

export const CategoryContainer = () => {
    return (
        <div>
            <CssBaseline />
            <AddCategoryForm />
        </div>
    )
}