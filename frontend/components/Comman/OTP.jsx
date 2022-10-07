import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"

import { otp } from "@/provider/provider.Inputs"
import { resend, next } from "@/provider/provider.Buttons"
import { Otp } from "@/provider/provider.Validations"
import { OtpProvider, otpVerfication } from "@/redux/api/redux.user"

import { message, UPDATE } from "@/redux/reducers/appSlice"

import TextInput from "@/components/Comman/TextInput"
import Button from "@/components/Comman/Button"
import { ArrowLeftIcon } from "@heroicons/react/outline"

export default function OTP(props) {
  const dispatch = useDispatch()
  const router = useRouter()

  const hasMessage = useSelector(message) ?? ''

  const [timer, settimer] = useState({ count: 10, status: true })
  const [reSend, setreSend] = useState({ status: false, count: 0 })

  const form = useFormik({
    initialValues: { otp: '' },
    validationSchema: Otp,
    onSubmit: async (values) => {
      const status = await otpVerfication(props.values.username, values.otp)
      switch (status) {
        case 200:
          dispatch(props.api(props.values))
          break;
        case 403:
          form.setFieldError('otp', 'Invalid OTP')
          break;
        case 400:
        case 500:
          router.push(`/${status}`)
          break;
      }
    }
  })

  const handleResendOTP = () => {
    if (reSend.count < 3) {
      dispatch(UPDATE('Resending otp'))
      dispatch(OtpProvider(props.values.username))
      setreSend({ ...reSend, status: false })
      settimer({ count: 10, status: true })
    }
    else {
      dispatch(UPDATE('Limit excedes Redirecting...'))
      setTimeout(() => {
        router.push('/')
      }, 5000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (timer.count === 0) {
        settimer({ count: null, status: false })
        setreSend({ status: true, count: reSend.count + 1 })
      } else if (timer.count > 0) settimer({ ...timer, count: timer.count - 1 })
    }, 1000);
  }, [timer, reSend, dispatch])

  return (
    <div className="h-[90%] w-full bg-white dark:bg-[#14181B] absolute top-4 left-0 space-y-8 py-8 px-3 lg:px-8">

      <h1 className="text-2xl text-black dark:text-white flex items-center space-x-1">
        <ArrowLeftIcon className="w-7 h-7 p-1 hover:scale-105 cursor-p rounded-full active:bg-black/10 
        dark:active:bg-white/10 backdrop-blur backdrop-filter" onClick={() => props.handleback()} />
        <span className="font-bold">OTP Verification</span>
      </h1>
      <form onSubmit={form.handleSubmit} className='space-y-8'>
        <legend className="text-base font-medium text-black dark:text-white">
          We have send OTP code for verification at
          <span className="text-[#2DAC9D] mx-2">
            {hasMessage}
          </span>
        </legend>
        <TextInput {...otp} value={form.values.otp}
          change={form.handleChange} blur={form.handleBlur}
          error={form.touched.otp && form.errors.otp}
        />
        <Button {...next} />
      </form>
      <div className="w-auto h-auto flex items-center justify-between">
        <p className="text-[#2DAC9D] text-sm">Problem in receving OTP ?</p>
        {timer.status && <p className="text-sm text-[#2DAC9D] p-2 rounded-md font-medium">{timer.count}</p>}
        {reSend.status && <button className="text-[#2DAC9D] hover:bg-[#2DAC9D]/10  p-2 rounded-md text-sm" type={resend.type} onClick={handleResendOTP} >{resend.name}</button>}
      </div>
    </div>
  )
}
