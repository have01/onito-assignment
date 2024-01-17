import { useState } from "react";
import Form1 from "./form1";
import Form2 from "./Form2";

const MultiStageFrom = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="flex items-center justify-center my-10">
        <div className="bg-white rounded-lg shadow-md w-[500px] lg:max-w-xl transition">
          <div className="flex mb-4">
            <div
              className={`w-1/2 border-r border-gray-400 rounded-tl-lg  ${
                step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center `}
            >
              Step 1
            </div>
            <div
              className={`w-1/2 rounded-tr-lg ${
                step === 2 ? "bg-blue-500 text- " : "bg-gray-200"
              } p-2 text-center `}
            >
              Step 2
            </div>
          </div>
          {step === 1 ? (
            <Form1 setStep={setStep} />
          ) : (
            <Form2 setStep={setStep} />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiStageFrom;
