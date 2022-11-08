import React from 'react';
import { capitalize, isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

import Tittle from '../Tittle';
import { RootState } from 'app/store';
import { One, Two, Three, Four, Five } from './Steps';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { GetOpportunity } from '../postOpportunity/postOpportunitySlice';

const PostOpportunity = () => {
  const dispatch = useAppDispatch();
  const stepTwoRef = React.createRef<HTMLFormElement>();
  const stepThreeRef = React.createRef<HTMLFormElement>();
  const stepFourRef = React.createRef<HTMLFormElement>();
  const stepFiveRef = React.createRef<HTMLFormElement>();
  const [steps, setSteps] = React.useState<Record<string, boolean>>({ one: true });
  const { category, ID: opportunityID } = useParams<{ category: string; ID: string }>();
  const { opportunity, status } = useAppSelector((state: RootState) => state.postOpportunity);

  React.useEffect(() => {
    if (!isEmpty(opportunityID)) {
      dispatch(GetOpportunity(opportunityID));
    }
  }, [dispatch, opportunityID]);

  const scrollToStepTwo = () => stepTwoRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToStepThree = () => stepThreeRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToStepFour = () => stepFourRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToStepFive = () => stepFiveRef.current?.scrollIntoView({ behavior: 'smooth' });

  React.useEffect(() => {
    if (!isEmpty(opportunity)) {
      const { stepOne, stepTwo, stepThree, stepFour } = opportunity;
      setSteps({
        ...steps,
        two: !isEmpty(stepOne),
        three: !isEmpty(stepTwo),
        four: !isEmpty(stepThree),
        five: !isEmpty(stepFour),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity]);

  return (
    <div className='col-md-12 pt-4 pb-2'>
      <Tittle title={`Post a ${capitalize(category)}`} />
      {!isEmpty(opportunityID) && status === 'loading' && <div>Loading...</div>}
      <>
        {steps.one && (
          <One
            steps={steps}
            setSteps={setSteps}
            category={category}
            opportunity={opportunity}
            scrollTo={scrollToStepTwo}
            opportunityID={opportunityID}
          />
        )}
        {steps.two && (
          <Two
            steps={steps}
            ref={stepTwoRef}
            setSteps={setSteps}
            category={category}
            opportunity={opportunity}
            scrollTo={scrollToStepThree}
            opportunityID={opportunityID}
          />
        )}
        {steps.three && (
          <Three
            steps={steps}
            ref={stepThreeRef}
            setSteps={setSteps}
            category={category}
            opportunity={opportunity}
            scrollTo={scrollToStepFour}
            opportunityID={opportunityID}
          />
        )}
        {/* {steps.four && (
          <Four
            steps={steps}
            ref={stepFourRef}
            category={category}
            setSteps={setSteps}
            opportunity={opportunity}
            scrollTo={scrollToStepFive}
            opportunityID={opportunityID}
          />
        )} */}
        {/* {steps.five && (
          <Five
            ref={stepFiveRef}
            category={category}
            opportunity={opportunity}
            opportunityID={opportunityID}
          />
        )} */}
      </>
    </div>
  );
};

export default PostOpportunity;
