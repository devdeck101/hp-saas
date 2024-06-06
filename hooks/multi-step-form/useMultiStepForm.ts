import { useState } from "react";

/**
 * Custom hook to manage multi-step forms.
 *
 * @param {number} steps - The total number of steps in the form.
 * @returns {[number, number, function(number): void, function(): void, function(): void]}
 * - An array containing:
 *   - currentStep: The current step in the form (0-indexed).
 *   - totalSteps: The total number of steps.
 *   - goToStep: Function to go to a specific step.
 *   - nextStep: Function to go to the next step.
 *   - previousStep: Function to go to the previous step.
 *   - isFirstStep: Function to check if the current step is the first step.
 *   - isLastStep: Function to check if the current step is the last step.
 */
export const useMultiStepForm: (
	steps: number,
) => [number, number, (index: number) => void, () => void, () => void, boolean, boolean] = (steps: number) => {
	const [currentStep, setCurrentStep] = useState(0);

	/**
	 * Advances to the next step if not already at the last step.
	 */
	const nextStep = () => {
		if (currentStep < steps) setCurrentStep((step) => step + 1);
	};

	/**
	 * Goes back to the previous step if not already at the first step.
	 */
	const previousStep = () => {
		if (currentStep > 0) setCurrentStep((step) => step - 1);
	};

	/**
	 * Goes to a specific step.
	 *
	 * @param {number} index - The index of the step to go to.
	 */
	const goToStep = (index: number) => {
		setCurrentStep(index);
	};

	/**
	 * Checks if the current step is the first step.
	 *
	 * @returns {boolean} True if the current step is the first step, false otherwise.
	 */
	const isFirstStep = currentStep === 0;

	/**
	 * Checks if the current step is the last step.
	 *
	 * @returns {boolean} True if the current step is the last step, false otherwise.
	 */
	const isLastStep = currentStep === steps - 1;

	return [currentStep, steps, goToStep, nextStep, previousStep, isFirstStep, isLastStep];
};
