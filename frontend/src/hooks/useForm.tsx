
import { useState } from 'react'
import {z} from 'zod'

type FormErrors<T> = Partial<Record<keyof T, string>>
type FormTouched<T> = Partial<Record<keyof T, boolean>>

type UseFormParams<T extends Record<string, unknown>> = {
    intialValues: T
    schema?: z.ZodType<T>
    onSubmit: (values: T) => void | Promise<void>
    validateOnBlur?: boolean
    validateOnChange?: boolean
}

type useFormReturn<T> = {
    values: T
    errors: FormErrors<T>
    touched: FormTouched<T>
    isSubmitting: boolean
    isValid: boolean
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void
    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => Promise<void>
    resetForm: () => void
    setValues: React.Dispatch<React.SetStateAction<T>>
    setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>
}

export function useForm<T extends Record<string, unknown>> ({
    intialValues, 
    schema, 
    onSubmit, 
    validateOnBlur = true,
    validateOnChange = false
}: UseFormParams<T>) : useFormReturn<T> {

    const [ values, setValues ] = useState<T>(intialValues); 
    const [ errors, setErrors ] = useState<FormErrors<T>>({}); 
    const [ touched, setTouched ] = useState<FormTouched<T>>({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    
    const validateForm = (formValues: T): FormErrors<T> => {
        if(!schema) return {} 

        const result = schema.safeParse(formValues); 

        if(result.success) return {} 

        const formErrors: FormErrors<T> = {} 

        for(const issue of result.error.issues) {
            const fieldName = issue.path[0] as keyof T

            if(fieldName) {
                formErrors[fieldName] = issue.message
            }
        }

        return formErrors
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name , value } = event.target

        const nextValues = {
            ...values, 
            [name]: value,
        }

        setValues(nextValues); 

        if(validateOnChange) {
            setErrors(validateForm(nextValues))
        }
    }

    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name } = event.target

        setTouched((prev) => ({
            ...prev, 
            [name]: true
        }))

        if(validateOnBlur) {
            setErrors(validateForm(values))
        }
    }

    const handleSubmit = async(
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault(); 

        const validationErrors = validateForm(values); 
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0) return 

        try {
            setIsSubmitting(true)
            await onSubmit(values)
        }finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setValues(intialValues);
        setErrors({})
        setTouched({})
        setIsSubmitting(false); 
    }

    const isValid = Object.keys(errors).length === 0

    return {
        values, 
        errors, 
        touched, 
        isSubmitting, 
        isValid,
        handleChange,
        handleBlur, 
        handleSubmit, 
        resetForm, 
        setValues, 
        setErrors
    }
}