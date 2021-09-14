import React from 'react'

export const FirstLoading = ({ loading }) => {

    console.log("EN FIRST LOADING");
    return (
        <>
            {
                loading &&
                <div className="first-loading">

                </div>
            }
        </>
    )
}
