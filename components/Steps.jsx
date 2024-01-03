"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const Steps = ({ hyquery, onstepChange, step }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const uniqueStepCategories = hyquery.reduce((accumulator, vanType) => {
    vanType.stepCategories.forEach((stepCategory) => {
      const categoryExists = accumulator.some(
        (category) => category.name === stepCategory.name
      );
      if (!categoryExists) {
        accumulator.push({
          name: stepCategory.name,
          id: stepCategory.id,
        });
      }
    });
    return accumulator;
  }, []);

  function setStep(id) {
    const stepNumber = uniqueStepCategories.findIndex(
      (category) => category.id === id
    );
    setCurrentStep(stepNumber);
  }

  useEffect(() => {
    setStep(step);
  });

  return (
    <div className="stepper-top flex top-50 relative py-5 justify-center items-center">
      <Box sx={{ width: "50%" }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {uniqueStepCategories.map((item, index) => (
            <Step
              onClick={(e) => {
                onstepChange(item.id);
                setStep(item.id);
              }}
              key={item.id}
            >
              <StepLabel className={currentStep == index ? "activestep" : ""}>
                {item.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};
export default Steps;
