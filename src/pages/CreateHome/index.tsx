import React, { useState } from 'react';
import Header from '../../components/CreateHome/Step/Header';
import Step1CHome from '../../components/CreateHome/Step/Step1CHome';
import Step2CHome from '../../components/CreateHome/Step/Step2CHome';
import Step3CHome from '../../components/CreateHome/Step/Step3CHome';
import Step5CHome from '../../components/CreateHome/Step/Step5CHome';
import Step6CHome from '../../components/CreateHome/Step/Step6CHome';
import Step7CHome from '../../components/CreateHome/Step/Step7CHome';
import Step8CHome from '../../components/CreateHome/Step/Step8CHome';
import Step9Home from '../../components/CreateHome/Step/Step9Home';
import ProcessBar from '../../components/CreateHome/ProcessBar/ProccessBar';
import Step10CHome from '@/components/CreateHome/Step/Step10CHome';
import Step11CHome from '@/components/CreateHome/Step/Step11CHome';
import Step12CHome from '@/components/CreateHome/Step/Step12CHome';
import Step13CHome from '@/components/CreateHome/Step/Step13CHome';
import Step14CHome from '@/components/CreateHome/Step/Step14CHome';
import Step15CHome from '@/components/CreateHome/Step/Step15CHome';
import Step16CHome from '@/components/CreateHome/Step/Step16CHome';
import Step4CHome from '@/components/CreateHome/Step/Step4CHome';

function CreateHome(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, component: <Step1CHome /> },
    { number: 2, component: <Step2CHome /> },
    { number: 3, component: <Step3CHome /> },
    { number: 4, component: <Step4CHome /> },
    { number: 5, component: <Step5CHome /> },
    { number: 6, component: <Step6CHome /> },
    { number: 7, component: <Step7CHome /> },
    { number: 8, component: <Step8CHome /> },
    { number: 9, component: <Step9Home /> },
    { number: 10, component: <Step10CHome /> },
    { number: 11, component: <Step11CHome /> },
    { number: 12, component: <Step12CHome /> },
    { number: 13, component: <Step13CHome /> },
    { number: 14, component: <Step14CHome /> },
    { number: 15, component: <Step15CHome /> },
    { number: 16, component: <Step16CHome /> },
  ];

  return (
    <div className="">
      <Header />
      {steps[currentStep - 1].component}
      <ProcessBar steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}

export default CreateHome;
