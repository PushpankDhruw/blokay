"use client";
import { forwardRef, useState, useImperativeHandle } from "react";
import { updateLead } from "../../services/lead";

const AppStepper = forwardRef(function StepperInside({ steps, onFinish }, ref) {
  const stepsArray = Object.keys(steps);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({});

  const save = (appendData = {}) => {
    let newVal = { ...data, ...appendData };
    setData(newVal);

    updateLead({
      leadToken: window.localStorage.getItem("leadToken") || null,
      ad: null,
      callToAction: null,
      keyword: null,
      referred: null,
      location: window.location.href,
      form: newVal,
    });
  };

  const next = (appendData = {}) => {
    save(appendData);

    onFinish && onFinish(data);
    if (stepsArray[stepIndex + 1]) {
      setStepIndex(stepIndex + 1);
    }
  };

  const back = () => {
    if (stepsArray[stepIndex - 1]) {
      setStepIndex(stepIndex - 1);
    }
  };

  const goTo = (k, appendData = {}) => {
    save(appendData);
    let index = stepsArray.findIndex((el) => el == k);
    if (steps[k] && index) {
      setStepIndex(index);
    }
  };

  useImperativeHandle(ref, () => ({
    next,
    back,
  }));

  const Step = steps[stepsArray[stepIndex]];

  return (
    <Step
      next={next}
      defaultForm={data}
      save={save}
      back={back}
      goTo={goTo}
      state={data}
    />
  );
});

export default AppStepper;
