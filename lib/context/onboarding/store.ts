import type { OnboardingSchema } from "@/schemas/onboarding";
import React from "react";
import type { z } from "zod";

export const OnboardingFormContext = React.createContext<z.infer<typeof OnboardingSchema>>({
	name: "",
	image: "",
	owner: "",
});

export const OnboardingFormProvider = OnboardingFormContext.Provider;
