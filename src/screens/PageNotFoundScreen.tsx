import React from 'react';

interface Page404Interface {
    redirectTo: string;
    textButton: string;
}

export const PageNotFoundScreen = (props: Page404Interface) => {
    return (
        <div style={{marginTop:"100px"}}>
            <h1>La pagina que busca no existe :(</h1>
        </div>
    )
}
