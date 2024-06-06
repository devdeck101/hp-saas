"use client";
import React, { startTransition, useContext, useState } from 'react'
import MultiStepWrapper from './multi-step-wrapper'


import { useMultiStepForm } from '@/hooks/multi-step-form/useMultiStepForm'

import OrgForm from './org-form';
import { OnboardingFormContext, OnboardingFormProvider } from '@/lib/context/onboarding/store';
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
    Form,

} from "@/components/ui/form"
import { OnboardingSchema } from '@/schemas/onboarding';
import type { z } from 'zod';
import { createOrg } from '@/actions/onboarding';
import MultiStepNavbar from './multi-step-navbar';
import MultiStepNavButtons from './multi-step-nav-buttons';


const initialData = {
    name: "",
    image: "",
    owner: ""
}
const formSteps = [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }]
const OnboardingForm = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const { name, image, owner } = useContext(OnboardingFormContext)
    const [currentStep,
        steps,
        goToStep,
        nextStep,
        previousStep,
        isFirstStep,
        isLastStep] = useMultiStepForm(formSteps.length)

    const form = useForm<z.infer<typeof OnboardingSchema>>({
        resolver: zodResolver(OnboardingSchema),
        defaultValues: {
            name: name || "",
            image: image || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
        startTransition(async () => {
            try {
                const { success, error } = await createOrg(values);
                if (error) setError(error);
                setSuccess(success || "");
                form.reset();
            } catch (error) {
                setSuccess("");
                setError("Algo deu errado.");
                form.reset();
            }
        });
    }
    return (
        <OnboardingFormProvider value={initialData}>
            <MultiStepWrapper title="Onboardinging" description="Entre com as informações para começar a usar o produto">
                <MultiStepNavbar items={formSteps} />
                <FormProvider {...form}>
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Dados da Org</CardTitle>
                            <CardDescription>Preencha as informações referentes a sua organização.</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <OrgForm />
                            </form>
                        </Form>
                        <CardFooter>

                            <MultiStepNavButtons
                                previousLabel='Anterior'
                                nextLabel='Próximo'
                                nextStep={nextStep}
                                previousStep={previousStep}
                                isLastStep={isLastStep}
                                isFirstStep={isFirstStep}
                                debug
                                currentStep={currentStep}
                            />

                        </CardFooter>
                    </Card >
                </FormProvider>
            </MultiStepWrapper>
        </OnboardingFormProvider>
    )
}

export default OnboardingForm;