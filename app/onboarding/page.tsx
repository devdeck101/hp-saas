import { auth } from '@/auth'
import OnboardingForm from '@/components/onboarding/onboarding-form'

const Onboarding = async () => {

    return (
        <div className="flex flex-col w-full min-h-full items-center justify-center">
            <OnboardingForm />
        </div >
    )
}

export default Onboarding