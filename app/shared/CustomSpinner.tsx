"use client"

import { ConfigProvider, Spin, SpinProps } from "antd"

interface CustomSpinnerProps extends SpinProps{
    color?:string
}

export default function CustomSpinner({color,...props}:CustomSpinnerProps){
    return (
        <ConfigProvider
          theme={{
            components:{
                Spin:{ colorPrimary:color}
            }
          }}
        >
            <Spin {...props} />
        </ConfigProvider>
    )
}