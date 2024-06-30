import React from 'react';
import Input from './Input';
import OutputDetails from './OutputDetails';
import OutputWindow from './OutputWindow';

const OutputSection = ({
  customInput,
  setCustomInput,
  outputDetails,
  darkMode,
  style
}) => (
  <section className="flex flex-col w-full" style={style}>
    <article className="flex flex-col grow self-stretch pb-6 text-2xl font-bold leading-7 text-black dark:text-white mt-10 md:mt-0">
      <div className="flex flex-col whitespace-nowrap">
        <OutputWindow outputDetails={outputDetails} />
      </div>
      <div className="flex flex-col mt-5">
        <h2>Input</h2>
        <div className="flex flex-col items-end">
          <Input customInput={customInput} setCustomInput={setCustomInput} />
        </div>
      </div>
      <div className="flex flex-col justify-end self-start mt-5 whitespace-nowrap">
        {outputDetails && <OutputDetails outputDetails={outputDetails} darkMode={darkMode} />}
      </div>
    </article>
  </section>
);

export default OutputSection;
