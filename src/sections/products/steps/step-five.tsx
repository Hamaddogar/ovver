import { RHFCheckbox } from 'src/components/hook-form';

export default function StepFive() {
  return (
    <>
      <RHFCheckbox name={`avalibleForMobile`} label="Avalible for Mobile" />
      <RHFCheckbox name={`avalibleForWebsite`} label="Avalible for Website" />
    </>
  );
}
